import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { signInWithEmailAndPassword,getAuth, EmailAuthCredential } from 'firebase/auth'
import {toast} from "react-toastify"
import Spinner from '../components/Spinner'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {v4 as uuidv4} from "uuid"
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
// import { Calendar } from 'react-date-picker';
export default function SaleFurniture() {
  const navigate=useNavigate();
  const auth=getAuth();
  
  const [geolocationEnabled,setgeolocationEnabled]=useState(true);
  const [loading,setLoading] =useState(false)
  const [formData,setformData]=useState({
        type:"sale",
        name:"",
        description:"",
        price:0,
        images:{},
        latitude:0,
        longitude:0,
        locality:"",
        city:"",
        state:"",
        category:"",
        material:"",
        year:0
        
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
     
      if(images.length>6){ //more than 6 images are not allowed in database
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
        const address=locality+","+city+","+state
        console.log(address)
    //geocoding  
  fetch(`https://opencage-geocoder.p.rapidapi.com/geocode/v1/json?q=${address}&key=a0ee04a337ce4d1f8164fcc65db3c42f&language=en`, options)
          .then(response =>response.json())
          .then(response =>{
            console.log(response)
            // const data =response
           
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
       
        // let date = new Date(datepicker.value);
        // let dateString = date.toISOString();
    const formDataCopy={
      ...formData,
      locality,
      city,
      state,
      imgUrls,
      geolocation,
      timestamp:serverTimestamp(),
      category,
      material,
      year,
      price,
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
   !formDataCopy.offer && delete formDataCopy.discountedPrice;
   //Adding to collection in firestore 
   const docRef =await addDoc(collection(db,"furniture"),formDataCopy)
   setLoading(false)
   toast.success("Listing created")
   navigate('/')
    }
 //destructring 
    const {type,name,description,price,year,category,images,latitude,longitude,locality,city,state,material}=formData;
    const years = [];
    for (let i = 1970; i <= new Date().getFullYear(); i++) {
      years.push(i);
    }
    if(loading){
    return <Spinner/>
  }
  return (
    

  <section>
    
    <h1 className='text-3xl text-center mt-6 font-bold'>Post AD</h1>
    <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
      {/* <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
        <img src=" https://plus.unsplash.com/premium_photo-1661423729611-2ad9b64b98f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60" 
        alt="key"
        className='w-full rounded-2xl' />
      </div> */}
      <div className='w-full md:w-[67%] lg:w-[50%]  lg:ml-20'>
      <form onSubmit={onSubmit} >
        <p className='text-lg font-semibold mt-6 text-lime-200'>Sell/Rent</p>
        
            <div className='flex' >
                <button type="button" id="type" value="sale" onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type==="rent"?"bg-white text-black":"bg-slate-600 text-white"}`}>Sell</button>
                <button type="button" id="type" value="rent" onClick={onChange} className={` ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type==="sale"?"bg-white text-black":"bg-slate-600 text-white"}`}>Rent</button>
            </div>
            <div >
            <p className='text-lg font-semibold mt-6 text-lime-200'>Category</p>
            <select  id="category" value={category} onChange={onChange} className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6">
  <option >Select</option>
  <option value="Sofa & Dining">Sofa & Dining</option>
  <option value="Beds & Wardrobes ">Beds & Wardrobes </option>
  <option value="Home Decor and Garden">Home Decor and Garden</option>
  <option value="Kids Furniture ">Kids Furniture </option>
  <option value="Other household items ">Other household items </option>
</select>
            </div>
            <div >
            <p className='text-lg font-semibold mt-6 text-lime-200'>Material</p>
            <select  id="material" value={material}  onChange={onChange} className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6">
  <option >Select</option>
  <option value="wood">Wood</option>
  <option value="glass ">Glass </option>
  <option value="stainless_steel">Stainless steel</option>
  <option value="leather ">Leather </option>
  <option value="acrylic ">Acrylic </option>
</select>
            </div>
            <p className='text-lg font-semibold mt-6 text-lime-200'>Ad title </p>
            <input type="text" id="name" value={name} onChange={onChange} placeholder="Mention the key features of your item (e.g. brand, model)"  required 
            className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"/>
           
            <p className='text-lg font-semibold mt-6 text-lime-200'>Year of purchase </p>
            <select
            id="year"  value={year} onChange={onChange}
      
    >
      {years.map(year => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
            
            
          
            <div className='flex space-x-6 mb-6 ' >

        </div>
            <p className='text-lg font-semibold mt-6 text-lime-200'>Address</p>
            <p className='text-sm font-semibold  mt-1 text-lime-500'>Locality</p>
            <input type="text" id="locality" value={locality} onChange={onChange} placeholder="Locality" maxLength="32" required 
            className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"/>
            <div className='flex space-x-6  ' ></div>

            <p className='text-sm font-semibold  mt-1 text-lime-500'>City</p>
            <input type="text" id="city" value={city} onChange={onChange} placeholder="City" maxLength="32"  required 
            className=" w-full px-4 py-2 text-xl text-lime-500 bg-white border border-gray-300 rounded transi duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"/>
            <div className='flex space-x-6  ' ></div>
            <p className='text-sm font-semibold text-lime-500  mt-1'>State</p>
            <input type="text" id="state" value={state} onChange={onChange} placeholder="State" maxLength="32"  required 
            className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transi duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"/>
            <div className='flex space-x-6 ' ></div>
            

           
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
            <p className='text-lg font-semibold mt-6  text-lime-200'>Description</p>
            <textarea type="text" id="description" value={description} onChange={onChange} placeholder="Description"  required 
            className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transi duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"/>
           
                <div>
                <p className='text-lg font-semibold mt-6 text-lime-200'> Price</p>  
                <div className='flex w-full justify-center items-center space-x-6'>
                    <input type="number" id="price" value={price}  onChange={onChange} min="100" max="400000000" required className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'/>
                    {type==="rent" && (
                    <div> 
                        <p className='text-md w-full whitespace-nowrap text-slate-300'>Rs/Month</p>
                        
                    </div>

                )}
                </div>
                
                </div>
            
  
            <div className='mb-6'>
            <p className='text-lg font-semibold mt-6  text-lime-200'>Images</p>  
            <p className='text-gray-600'>(max 6)</p>
            <input type="file" id="images" onChange={onChange} accept=".jpg,.png,.jpeg"  multiple required className='w-full px-3 py-1.5 text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600'/>
            </div>
            <button type="submit" className='mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg tansition duration-150 ease-in-out'>Post</button>
        </form>
        
      </div>
    </div>
    
    </section>
  )
}


// form includes : 1. type of furniture  ..material ...plastic ,wood,fibre etc   ....
//                 2. Date of purchase of furniture
//                 3. photos
//                 4.dimensions xxxxxxxxxxx
//                 5.cost :rent/month  selling price
//                 6.address(no change)
//                 7.contact information  :EmailId(preferrable)
//                 8.suitable for ... study ,dining , living room decode, kitchen essential
                   