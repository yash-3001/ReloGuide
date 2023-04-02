import { GiEvilWings } from 'react-icons/gi';
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

    
export default function CreateListingServices() {
    const auth=getAuth();
    const navigate=useNavigate(); 
    const [Loading,setLoading] = useState(false);
    const [formData, setFormData] = useState({
        service_type:"none",
        name:"",
        bhk:0,
        duration:1,
        locality:"",
        city:"",
        state:"",
        description:"", 
        regularPrice:0,
        discountedPrice:0,
        offer:true,
        images:{},
        cook_days:0,
        unit:0,     
    });
    const {name,service_type,duration,locality,city,state,description,regularPrice,discountedPrice,offer,bhk,images,unit,cook_days} = formData;
    function onChange(e) {
        let boolean = null;
        if(e.target.value === "true"){
            boolean = true;
        }
        if(e.target.value === "false"){
            boolean = false;
        }
        // Files
        if(e.target.files){
            setFormData((prevState)=>({
                ...prevState,
                images: e.target.files
            }))
        }
        // Text/Boolean/Number
        if(!e.target.files){
            setFormData((prevState)=>({  

                ...prevState,
                [e.target.id]: boolean ?? e.target.value, 
            }));
        }
    }
    async  function onSubmit(e){
        e.preventDefault();
        setLoading(true);
        if(+discountedPrice>= +regularPrice && offer){
          setLoading(false)
          toast.error("Discounted price needs to be less than regular price")
          return
        }
        if(images.length>6){ //more than 6 images are not aloowed in database
          setLoading(false)
          toast.error("Maximum 6 images are allowed")
          return
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
        locality,
        city,
        state,
        imgUrls,
        timestamp:serverTimestamp(),
        userRef: auth.currentUser.uid,
      };
      delete formDataCopy.images;
     !formDataCopy.offer && delete formDataCopy.discountedPrice;
     //Adding to collection in firestore 
     const docRef2 =await addDoc(collection(db,"servicelistings"),formDataCopy)
        setLoading(false);
        toast.success("Service Listing created");
        navigate(`/servicecategory/${formDataCopy.service_type}/${docRef2.id}`); 
      }
    if(Loading){
        return <Spinner/>;
    }
  return (
    <main className='max-w-md px-2 mx-auto'>
         <h1 className='text-3xl text-center mt-6 font-bold'>Create a Service</h1>
        <form onSubmit={onSubmit}> 
         <p className='text-lg font-semibold mt-6 text-lime-200'>Type of Service</p>
            <div>
                <label for="s_type">Type of Service</label>
                <select name="s_type" id="service_type" size={1} onChange={onChange} className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transi duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6">                        
                    <option id="service_type" value="none">None</option>
                    <option value="Home-Painting">Home Painting</option>
                    <option value="BK-Cleaning" >Bathroom & Kitchen Cleaning</option>
                    <option value="Home-Cleaning">Full Home Cleaning</option>
                    <option value="SC-Cleaning">Sofa/Carpet Cleaning</option>
                    <option value="Pest-Cleaning">Cockroach, Ant & General Pest Control</option>
                    <option value="AC-HService">AC Services</option>
                    <option value="M-HService">Microwave Services</option>
                    <option value="R-HService">Refrigerator Services</option>
                    <option value="WM-HService">Washing Machine Services</option>
                    <option value="Disinfection">Disinfection</option>
                    <option value="WP-HService">Water Purifier Services</option>
                    <option value="Cook-Service">Cooking Services</option>
                </select>
            </div>
         <p className='text-lg font-semibold mt-6 text-lime-200'>Name of Service</p>
            <input type="text" value={name} onChange={onChange} id="name" placeholder="Name" maxLength="64" minLength="10" required 
            className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transi duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"/>
            
            <p className='text-lg font-semibold mt-6 text-lime-200'>Address</p>
            <p className='text-sm font-semibold  mt-1 text-lime-500'>Located at?</p>
            <textarea type="text" id="locality" value={locality} onChange={onChange} placeholder="Locality" maxLength="32" required 
            className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transi duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"/>
            <div className='flex space-x-6  ' ></div>

            <p className='text-sm font-semibold  mt-1 text-lime-500'>Operational City/es</p>
            <textarea type="text" id="city" value={city} onChange={onChange} placeholder="City" maxLength="32"  required 
            className=" w-full px-4 py-2 text-xl text-lime-500 bg-white border border-gray-300 rounded transi duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"/>
            <div className='flex space-x-6  ' ></div>
            <p className='text-sm font-semibold text-lime-500  mt-1'>Operational State/s</p>
            <textarea type="text" id="state" value={state} onChange={onChange} placeholder="State" maxLength="32"  required 
            className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transi duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"/>
            <div className='flex space-x-6 ' ></div>
            
            <p className='text-lg font-semibold mt-6  text-lime-200'>Description</p>
            <textarea type="text" id="description" value={description} onChange={onChange} placeholder="Description"  required 
            className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transi duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"/>
            
            ${
                (service_type === "Home-Painting")  && 
                (
                <div>
                    <p className='w-full text-lg font-semibold text-lime-200'>BHK</p>
                    <input type="number" id="bhk" value={bhk} onChange={onChange} min="1" max="6" required
                    className=' w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                </div>
                )
            }
            ${
                (service_type === "BK-Cleaning" ) && 
                (
                <div>
                    <p className='w-full text-lg font-semibold text-lime-200'>BHK</p>
                    <input type="number" id="bhk" value={bhk} onChange={onChange} min="1" max="6" required
                    className=' w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                </div>
                )
            }   
            ${
                (service_type === "Home-Cleaning")  && 
                (
                <div>
                    <p className='w-full text-lg font-semibold text-lime-200'>BHK</p>
                    <input type="number" id="bhk" value={bhk} onChange={onChange} min="1" max="6" required
                    className=' w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                </div>
                )
            }   
            ${
                (service_type === "SC-Cleaning")  && 
                (
                <div>
                    <p className='w-full text-lg font-semibold text-lime-200'>Number of Sofa or Carpet</p>
                    <input type="number" id="unit" value={bhk} onChange={onChange} min="1" max="100" required
                    className=' w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                </div>
                )
            }   
            ${
                (service_type === "Pest-Cleaning")  && 
                (
                <div>
                    <p className='w-full text-lg font-semibold text-lime-200'>BHK</p>
                    <input type="number" id="bhk" value={bhk} onChange={onChange} min="1" max="6" required
                    className=' w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                </div>
                )
            }   
            ${
                (service_type === "AC-HService")  && 
                (
                <div>
                    <p className='w-full text-lg font-semibold text-lime-200'>Number of AC's</p>
                    <input type="number" id="unit" value={unit} onChange={onChange} min="1" max="100" required
                    className=' w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                </div>
                )
            }   
            ${
                (service_type === "M-HService")  && 
                (
                <div>
                    <p className='w-full text-lg font-semibold text-lime-200'>Number of Microwave's</p>
                    <input type="number" id="unit" value={unit} onChange={onChange} min="1" max="100" required
                    className=' w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                </div>
                )
            }   
            ${
                (service_type === "R-HService") && 
                (
                <div>
                    <p className='w-full text-lg font-semibold text-lime-200'>Number of Refrigerators</p>
                    <input type="number" id="unit" value={unit} onChange={onChange} min="1" max="100" required
                    className=' w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                </div>
                )
            }   
            ${
                (service_type === "WM-HService")  && 
                (
                <div>
                    <p className='w-full text-lg font-semibold text-lime-200'>Number of Washing Machines</p>
                    <input type="number" id="unit" value={unit} onChange={onChange} min="1" max="100" required
                    className=' w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                </div>
                )
            }   
            ${
                (service_type === "WP-HService") && 
                (
                <div>
                    <p className='w-full text-lg font-semibold text-lime-200'>Number of Water Purifier</p>
                    <input type="number" id="unit" value={unit} onChange={onChange} min="1" max="100" required
                    className=' w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                </div>
                )
            }   
            ${
                (service_type === "Cook-Service")  && 
                (
                <div>
                    <p className='w-full text-lg font-semibold text-lime-200'>Number of Days</p>
                    <input type="number" id="cook_days" value={cook_days} onChange={onChange} min="1" max="7" required
                    className=' w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                </div>
                )
            }   
            ${
                (service_type === "Disinfection")  && 
                (
                <div>
                    <p className='w-full text-lg font-semibold text-lime-200'>BHK</p>
                    <input type="number" id="bhk" value={bhk} onChange={onChange} min="1" max="6" required
                    className=' w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                </div>
                )
            }
            <div className='flex space-x-6 mb-6 ' >
                <div>
                    <p className='w-full text-lg font-semibold text-lime-200'>Duration of work</p>
                    <div className='flex w-full justify-center items-center space-x-6'>
                    <input type="number" id="duration" value={duration} onChange={onChange} min="1" max="24" required
                    className=' w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                    { service_type && (
                        <div className="">
                            <p className="text-white text-md w-full whitespace-nowrap">Hours</p>
                        </div>)
                    }
                    
                    </div>
                </div>
            </div>

            <p className='text-lg font-semibold mt-3  text-lime-200'>Offer</p>
            <div className='flex mb-6' >
                <button type="button" id="offer" value={true} onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${!offer?"bg-white text-black":"bg-slate-600 text-white"}`}>yes</button>
                <button type="button" id="offer" value={false} onClick={onChange} className={` ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${offer?"bg-white text-black":"bg-slate-600 text-white"}`}>no</button>
            </div>      

            <div className='flex items-center mb-6'>
                <div>
                <p className='text-lg font-semibold mt-6 text-lime-200'>Regular Price</p>  
                <div className='flex w-full justify-center items-center space-x-6'>
                    <input type="number" id="regularPrice" value={regularPrice}  onChange={onChange} min="50" max="999999" required className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'/>
                    { ( service_type === "Home-Painting" || service_type ==="BK-Cleaning" || service_type === "Home-Cleaning" || service_type ==="Disinfection" || service_type ==="Pest-Cleaning" ) && (
                    <div className="">
                        <p className="text-white text-md w-full whitespace-nowrap">₹/BHK</p>
                    </div>)
                    }
                    {
                        ( service_type === "AC-HService" || service_type ==="M-HService" || service_type === "WM-HService" || service_type === "WP-HService" || service_type ==="R-HService" || service_type ==="SC-Cleaning" ) && (
                            <div className="">
                                <p className="text-white text-md w-full whitespace-nowrap">₹/Units</p>
                            </div>)
                    }
                    {
                        service_type ==="Cook-Service" && 
                        (<div className="">
                                <p className="text-white text-md w-full whitespace-nowrap">₹/Month</p>
                            </div>
                        )
                    }
                </div>
                
            </div>
            </div>
            {offer &&(
                  <div className='flex items-center mb-6'>
                  <div>
                  <p className='text-lg font-semibold mt-6  text-lime-200'>Discounted Price</p>  
                  <div className='flex w-full justify-center items-center space-x-6'>
                      <input type="number" id="discountedPrice" value={discountedPrice}  onChange={onChange} min="50" max="400000000" required={offer} className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'/>
                      { ( service_type === "Home-Painting" || service_type ==="BK-Cleaning" || service_type === "Home-Cleaning" || service_type ==="Disinfection" || service_type ==="Pest-Cleaning" ) && (
                    <div className="">
                        <p className="text-white text-md w-full whitespace-nowrap">₹/BHK</p>
                    </div>)
                    }
                    {
                        ( service_type === "AC-HService" || service_type ==="M-HService" || service_type === "WM-HService" || service_type === "WP-HService" || service_type ==="R-HService" || service_type ==="SC-Cleaning" ) && (
                            <div className="">
                                <p className="text-white text-md w-full whitespace-nowrap">₹/Units</p>
                            </div>)
                    }
                    {
                        service_type ==="Cook-Service" && 
                        (<div className="">
                                <p className="text-white text-md w-full whitespace-nowrap">₹/Month</p>
                            </div>
                        )
                    }
                  </div>
                  
                  </div>
              </div>
            ) }
            <div className='mb-6'>
            <p className='text-lg font-semibold mt-6  text-lime-200'>Images</p>  
            <p className='text-gray-600'>The first image will be the cover (max 6)</p>
            <input type="file" id="images" onChange={onChange} accept=".jpg,.png,.jpeg"  multiple required className='w-full px-3 py-1.5 text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600'/>
            </div>
            <button type="submit" className='mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg tansition duration-150 ease-in-out'>Create Service Listing</button>
        </form>
    </main>
  )
}
