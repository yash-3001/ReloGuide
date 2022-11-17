import React from 'react'
import { useState } from 'react'
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import {v4 as uuidv4} from "uuid"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
export default function CreateListing() {
  const auth=getAuth();
  const navigate=useNavigate();
  const [geolocationEnabled,setgeolocationEnabled]=useState(true);
  const [loading,setLoading] =useState(false)
  const [formData,setformData]=useState({
        type:"sale",
        name:"",
        bedrooms:1,
        bathrooms:1,
        furnished:false,
        parking:false,
        address:"",
        description:"",
        offer:false,
        regularPrice:0,
        discountedPrice:0,
        images:{},
        latitude:0,
        longitude:0
    })
    function onChange(e){
        let boolean =null;
        if(e.target.value==="true"){
            boolean =true
        }
        if(e.target.value==="false"){
            boolean =false
        }
        if(e.target.files){
            setformData((prevState)=>({
                ...prevState,
                images:e.target.files
            }))
        }
        if(!e.target.files){
            setformData((prevState)=>({
                ...prevState,
                [e.target.id]:boolean?? e.target.value
            }))
        }
    }
  async  function onSubmit(e){
      e.preventDefault();
      setLoading(true);
      if(discountedPrice>=regularPrice){
        setLoading(false)
        toast.error("Discounted price needs to be less than regular price")
        return
      }
      if(images.length>6){ //more than 6 images are not aloowed in database
        setLoading(false)
        toast.error("Maximum 6 images are allowed")
        return
      }
      let geolocation={}
      let location;
      if(geolocationEnabled){
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'f80c8152cfmshbe8cb0f833ec082p11e8b0jsn2d4dba86ee33',
            'X-RapidAPI-Host': 'opencage-geocoder.p.rapidapi.com'
          }
        };
    //geocoding  
  fetch(`https://opencage-geocoder.p.rapidapi.com/geocode/v1/json?q=${address}&key=a0ee04a337ce4d1f8164fcc65db3c42f&language=en`, options)
          .then(response =>response.json())
          .then(response =>{
            console.log(response)
            const data =response
           
            geolocation.lat = response.results[0]?.geometry.lat ?? 0;
            geolocation.lng = response.results[0]?.geometry.lng ?? 0;
      
            location = response.status === "ZERO_RESULTS" && undefined;
      
            if (location === undefined) {
              setLoading(false);
              toast.error("please enter a correct address");
              return;
            }
          })
          .catch(err => console.error(err));
        
        }
        else{
        geolocation.lat=latitude;
        geolocation.lng=longitude
        }
        //store image to storage
         async function storeImage(image){
          return new Promise((resolve,reject)=>{
            const storage=getStorage();
            const filename=`${auth.currentUser.uid}-${image.name}-${uuidv4()}`
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on('state_changed', 
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            }, 
            (error) => {
              // Handle unsuccessful uploads
              reject(error)
            }, 
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               resolve( downloadURL); 
              });
            }
          );
          })
         }
        const imgUrls= await Promise.all(
          [...images].map((image)=>storeImage(image))).catch((error)=>{
            setLoading(false)
            toast.error("Images not uploaded")
            return
          }
        )
    const formDataCopy={
      ...formData,
      imgUrls,
      geolocation,
      timestamp:serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
   !formDataCopy.offer && delete formDataCopy.discountedPrice;
   //Adding to collection in firestore 
   const docRef =await addDoc(collection(db,"listings"),formDataCopy)
   setLoading(false)
   toast.success("Listing created")
   navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    }
 //destructring 
    const {type,name,bedrooms,bathrooms,parking,furnished,address,description,offer,regularPrice,discountedPrice,images,latitude,longitude}=formData;
  if(loading){
    return <Spinner/>
  }
    return (
    <main className='max-w-md px-2 mx-auto'>
        <h1 className='text-3xl text-center mt-6 font-bold'>Create a Listing</h1>
        <form onSubmit={onSubmit}>
        <p className='text-lg font-semibold mt-6'>Sell/Rent</p>
            <div className='flex' >
                <button type="button" id="type" value="sale" onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type==="rent"?"bg-white text-black":"bg-slate-600 text-white"}`}>Sell</button>
                <button type="button" id="type" value="rent" onClick={onChange} className={` ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type==="sale"?"bg-white text-black":"bg-slate-600 text-white"}`}>Rent</button>
            </div>
            <p className='text-lg font-semibold mt-6'>Name</p>
            <input type="text" id="name" value={name} onChange={onChange} placeholder="Name" maxLength="32" minLength="10" required 
            className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transi duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"/>
            <div className='flex space-x-6 mb-6 ' >
                <div>
                    <p className='text-lg font-semibold'> Beds</p>
                    <input type="number" id="bedrooms" value={bedrooms} onChange={onChange} min="1" max="50" required
                    className='px-4 py-2 text-xl text-gray-700 bg-white border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                </div>
                <div>
                    <p className='w-full text-lg font-semibold'>  Baths</p>
                    <input type="number" id="bathrooms" value={bathrooms} onChange={onChange} min="1" max="50" required
                    className=' w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                </div>
            </div>
            <p className='text-lg font-semibold mt-6'>Parking</p>
            <div className="flex">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            no
          </button>
        </div>
            <p className='text-lg font-semibold mt-6'>Furnished</p>
            <div className="flex">
          <button
            type="button"
            id="furnished"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            yes
          </button>
          <button
            type="button"
            id="furnished"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              furnished ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            no
          </button>
        </div>
            <p className='text-lg font-semibold mt-6'>Address</p>
            <textarea type="text" id="address" value={address} onChange={onChange} placeholder="Address"  required 
            className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transi duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"/>
            {!geolocationEnabled && (
              <div className='flex space-x-6 justify-start mb-6'>
                <div>
                  <p className='text-lg font-semibold'>Latitude</p>
                  <input type="number" id="latitude" value={latitude} onChange={onChange} required min="-90" max="90" className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center'/>

                </div>
                <div>
                  <p className='text-lg font-semibold'>Longitude</p>
                  <input type="number" id="longitude" value={longitude} onChange={onChange} required min="-180" max="180"className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center'/>

                </div>
              </div>
            )}
            <p className='text-lg font-semibold mt-6'>Description</p>
            <textarea type="text" id="description" value={description} onChange={onChange} placeholder="Description"  required 
            className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transi duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"/>
            <p className='text-lg font-semibold mt-3'>Offer</p>
            <div className='flex mb-6' >
                <button type="button" id="offer" value={true} onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${!offer?"bg-white text-black":"bg-slate-600 text-white"}`}>yes</button>
                <button type="button" id="offer" value={false} onClick={onChange} className={` ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${offer?"bg-white text-black":"bg-slate-600 text-white"}`}>no</button>
            </div>
            <div className='flex items-center mb-6'>
                <div>
                <p className='text-lg font-semibold mt-6'>Regular Price</p>  
                <div className='flex w-full justify-center items-center space-x-6'>
                    <input type="number" id="regularPrice" value={regularPrice}  onChange={onChange} min="50" max="400000000" required className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'/>
                    {type==="rent" && (
                    <div> 
                        <p className='text-md w-full whitespace-nowrap'>$/Month</p>
                        
                    </div>

                )}
                </div>
                
                </div>
            </div>
            {offer &&(
                  <div className='flex items-center mb-6'>
                  <div>
                  <p className='text-lg font-semibold mt-6'>Discounted Price</p>  
                  <div className='flex w-full justify-center items-center space-x-6'>
                      <input type="number" id="discountedPrice" value={discountedPrice}  onChange={onChange} min="50" max="400000000" required={offer} className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'/>
                      {type==="rent" && (
                      <div> 
                          <p className='text-md w-full whitespace-nowrap'>$/Month</p>
                          
                      </div>
  
                  )}
                  </div>
                  
                  </div>
              </div>
            ) }
            <div className='mb-6'>
            <p className='text-lg font-semibold mt-6'>Images</p>  
            <p className='text-gray-600'>The first image will be the cover (max 6)</p>
            <input type="file" id="images" onChange={onChange} accept=".jpg,.png,.jpeg"  multiple required className='w-full px-3 py-1.5 text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600'/>
            </div>
            <button type="submit" className='mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg tansition duration-150 ease-in-out'>Create Listing</button>
        </form>
    </main>
  )
}
