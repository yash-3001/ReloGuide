import { getDoc ,doc} from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { db } from '../firebase';
import {Swiper,SwiperSlide} from "swiper/react"
import SwiperCore,{EffectFade,Autoplay,Navigation,Pagination} from "swiper"
import "swiper/css/bundle"
import {FaShare} from 'react-icons/fa'
import {BsFillHouseFill} from 'react-icons/bs' 
import {FaMapMarkerAlt} from 'react-icons/fa'
import { GiAutoRepair } from 'react-icons/gi';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import { GiCook } from 'react-icons/gi';
import {getAuth} from 'firebase/auth'
import ServiceContact from '../components/ServiceContact';
import {MapContainer,Marker,Popup,TileLayer} from 'react-leaflet'
export default function Servicelistings() {
    const params=useParams() //get parameter from url
    const auth=getAuth()
    const [servicelistings,setServicelistings]=useState(null)
    const [loading,setLoading]=useState(true)
    const [shareLinkCopy,setshareLinkCopy]=useState(false)
    const [contactOwner,setcontactOwner]=useState(false)
    SwiperCore.use([Autoplay,Navigation,Pagination])
    useEffect(() => {
        async function fetchServicelistings() {
          const docRef2 = doc(db, "servicelistings", params.servicelistingId);
          const docSnap = await getDoc(docRef2);
          if (docSnap.exists()) {
            setServicelistings(docSnap.data());
            setLoading(false);
            
          }
        }
        fetchServicelistings();
      }, [params.servicelistingId]);
      if (loading) {
        return <Spinner />;
      }
    console.log(servicelistings)
 
  return (  
  
  <main> 
    <Swiper   slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}>
         {servicelistings.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
             
              style={{
                background: `url(${servicelistings.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            >
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border- border-gray-400 rounded-full w-12 h-12 flex justify-center items-center'
      onClick={()=>{
        navigator.clipboard.writeText(window.location.href)
        setshareLinkCopy(true)
        setTimeout(()=>{
            setshareLinkCopy(false)
        },2000)
      }}>
              <FaShare className='text-lg text-slate-500'/>
      </div>
      {shareLinkCopy && (
        <p className=' fixed top-[23%] right[5%] font-semibold border-2 border-gray-400  rounded-md bg-white z-10 px-4'>Link copied</p>
      )}
      <div className='m-4  flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg  shadow-lg bg-white lg:space-x-5'>
        <div className=' w-full '>
          <p className='text-2xl font-bold mb-3 text-blue-900 '>
            {servicelistings.name} - ${servicelistings.offer?servicelistings.discountedPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ","):servicelistings.regularPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                   {( servicelistings.service_type === "Home-Painting" || servicelistings.service_type ==="BK-Cleaning" || servicelistings.service_type === "Home-Cleaning" || servicelistings.service_type ==="Disinfection" || servicelistings.service_type ==="Pest-Cleaning" ) ? " / BHK" : ( servicelistings.service_type === "AC-HService" || servicelistings.service_type ==="M-HService" || servicelistings.service_type === "WM-HService" || servicelistings.service_type === "WP-HService" || servicelistings.service_type ==="R-HService" || servicelistings.service_type ==="SC-Cleaning" ) ? " / Unit" : " /Days"}
          </p>
          <div className='flex'>
          <p className='flex items-center mt-6 mb-3 font-semibold'><FaMapMarkerAlt className='text-green-700 mr-1'/>{servicelistings.locality
          }</p>
          <p className='flex items-center mt-6 mb-3 font-semibold'>, {servicelistings.city 
          }</p>
          <p className='flex items-center mt-6 mb-3 font-semibold'>, {servicelistings.state 
          }</p>

          </div>
         
        <div className='flex justify-start items-center space-x-4 w-[75%]'>
          <p className='bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md'>
            {servicelistings.service_type==="Home-Painting"?"Home Painting":
            servicelistings.service_type==="BK-Cleaning"?"Bathroom/Kitchen Cleaning":
            servicelistings.service_type==="Home-Cleaning"?"Home Cleaning":
            servicelistings.service_type==="Disinfection"?"Disinfection":
            servicelistings.service_type==="Pest-Cleaning"?"Pest Cleaning":
            servicelistings.service_type==="AC-HService"?"AC Repair Service":
            servicelistings.service_type==="M-HService"?"Microwave Repair Service":
            servicelistings.service_type==="WM-HService"?"Washing Machine Repair Service":
            servicelistings.service_type==="WP-HService"?"Water Purifier Repair Service":
            servicelistings.service_type==="R-HService"?"Refrigerator Repair Service":
            servicelistings.service_type==="SC-Cleaning"?"Sofa/Carpet Cleaning Service":"Cooking-Services"}</p>
          {servicelistings.offer &&(
            <p className='w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md'> ${+servicelistings.regularPrice- +servicelistings.discountedPrice} Discount</p>
          )}
        </div>
        <p className='mt-3 mb-3 flex'>
          <span className='font-semibold '>Description - </span>{servicelistings.description}</p>
          <ul className='flex mb-6 items-center space-x-2 lg:space-x-10 text-sm font-semibold'>
            { ( servicelistings.service_type === "Home-Painting" || servicelistings.service_type ==="BK-Cleaning" || servicelistings.service_type === "Home-Cleaning" || servicelistings.service_type ==="Disinfection" || servicelistings.service_type ==="Pest-Cleaning" ) && 
            (
            <li className='flex items-center whitespace-nowrap'>
              <BsFillHouseFill className='text-lg mr-1'/>
              { +servicelistings.bhk>1?`${servicelistings.bhk} BHK`:"1 BHK"}
            </li>
            )
            }
            {
              ( servicelistings.service_type === "Home-Painting" || servicelistings.service_type ==="BK-Cleaning" || servicelistings.service_type === "Home-Cleaning" || servicelistings.service_type ==="Disinfection" || servicelistings.service_type ==="Pest-Cleaning" ) && 
            (<li className='flex items-center whitespace-nowrap'>
              <MdOutlineAccessTimeFilled className='text-lg mr-1'/>
              {+servicelistings.duration>1 ?`${servicelistings.duration} Rooms/Hour`:"1 Room/Hour"}
            </li>
            )
            }
            {
              ( servicelistings.service_type === "AC-HService" || servicelistings.service_type ==="M-HService" || servicelistings.service_type === "WM-HService" || servicelistings.service_type === "WP-HService" || servicelistings.service_type ==="R-HService" || servicelistings.service_type ==="SC-Cleaning" ) && (
            <li className='flex items-center whitespace-nowrap'>
              <GiAutoRepair className='text-lg mr-1'/>
              {+servicelistings.unit>1?`${servicelistings.unit} units`:"1 unit"}
            </li> 
            )}
            {
              ( servicelistings.service_type === "AC-HService" || servicelistings.service_type ==="M-HService" || servicelistings.service_type === "WM-HService" || servicelistings.service_type === "WP-HService" || servicelistings.service_type ==="R-HService" || servicelistings.service_type ==="SC-Cleaning" ) &&(
              <li className='flex items-center whitespace-nowrap'>
              <MdOutlineAccessTimeFilled className='text-lg mr-1'/>
              {+servicelistings.duration>1 ?`${servicelistings.duration} Units/Hour`:"1U/Hour"}
            </li>
            )
            }
            {
              (servicelistings.cook_days === "Cooking-Services") &&(
                <li className='flex items-center whitespace-nowrap'>
                  <GiCook className='text-lg mr-1'/>
                  {+servicelistings.cook_days>1?`${+servicelistings.cook_days} Days/Week`:"1 day/week"}
                </li>
              )
            }
            
          </ul>
          {servicelistings.userRef !== auth.currentUser?.uid && !contactOwner && (
            <div className="mt-6 w-1/4">
              <button
                onClick={() => setcontactOwner(true)}
                className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
              >
                Contact Service Owner
              </button>
            </div>
          )}
          {contactOwner && (
            <ServiceContact userRef={servicelistings.userRef} servicelistings={servicelistings} />
          )}
        </div>
      </div>
    </main>
    )
  
}
