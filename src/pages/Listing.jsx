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
import {FaMapMarkerAlt} from 'react-icons/fa'
import {GiBed} from 'react-icons/gi'
import {FaBath} from 'react-icons/fa'
import {FaParking,FaChair} from 'react-icons/fa'
import {getAuth} from 'firebase/auth'
import Contact from '../components/Contact';
import {MapContainer,Marker,Popup,TileLayer} from 'react-leaflet'
export default function Listing() {
    const params=useParams() //get parameter from url
    const auth=getAuth()
    const [listing,setListing]=useState(null)
    const [loading,setLoading]=useState(true)
    const [shareLinkCopy,setshareLinkCopy]=useState(false)
    const [contactLandLord,setcontactLandLord]=useState(false)
    SwiperCore.use([Autoplay,Navigation,Pagination])
    useEffect(() => {
        async function fetchListing() {
          const docRef = doc(db, "listings", params.listingId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setListing(docSnap.data());
            setLoading(false);
            
          }
        }
        fetchListing();
      }, [params.listingId]);
    
      if (loading) {
        return <Spinner />;
      }
    console.log(listing)
 
  return (  
  
  <main> 
    <Swiper   slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}>
         {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
             
              style={{
                background: `url(${listing.imgUrls[index]})  no-repeat`,
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
        <div className='w-full'>
          <p className='text-2xl font-bold mb-3 text-blue-900 '>
            {listing.name} - Rs{listing.offer?listing.discountedPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ","):listing.regularPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                   {listing.type === "rent" ? " / month" : ""}
          </p>
          <div className='flex'>
          <p className='flex items-center mt-6 mb-3 font-semibold'><FaMapMarkerAlt className='text-green-700 mr-1'/>{listing.locality}</p>
          <p className='flex items-center mt-6 mb-3 font-semibold'>, {listing.city}</p>
          <p className='flex items-center mt-6 mb-3 font-semibold'>, {listing.state }</p>
          </div>
         
        <div className='flex justify-start items-center space-x-4 w-[75%]'>
          <p className='bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md'>{listing.type==="rent"?"Rent":"Sale"}</p>
          {listing.offer &&(
            <p className='w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md'> ${+listing.regularPrice- +listing.discountedPrice}discount</p>
          )}
        </div>
        <p className='mt-3 mb-3'>
          <span className='font-semibold '>Description - </span>{listing.description}</p>
          <ul className='flex mb-6 items-center space-x-2 lg:space-x-10 text-sm font-semibold'>
            <li className='flex items-center whitespace-nowrap'>
              <GiBed className='text-lg mr-1'/>
              {+listing.bedrooms>1?`${listing.bedrooms}Beds`:"1 Bed"}
            </li>
            <li className='flex items-center whitespace-nowrap'>
              <FaBath className='text-lg mr-1'/>
              {+listing.bathrooms>1?`${listing.bathrooms}Baths`:"1 Bath"}
            </li>
            <li className='flex items-center whitespace-nowrap'>
              <FaParking className='text-lg mr-1'/>
              {+listing.parking?"Parking spot":"No parking spot"}
            </li>
            <li className='flex items-center whitespace-nowrap'>
              <FaChair className='text-lg mr-1'/>
              {+listing.furnished?"Furnished":"Not Furnished"}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactLandLord && (
            <div className="mt-6">
              <button
                onClick={() => setcontactLandLord(true)}
                className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandLord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>
       
        <div className="w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2">
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>
                {listing.locality}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
    )
  
}
