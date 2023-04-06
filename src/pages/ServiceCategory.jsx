import { collection, getDoc, getDocs, limit, limitToLast, orderBy, query, startAfter, where } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router';
import {toast} from "react-toastify"
import ServicelistingItem from '../components/ServicelistingItem';
import Spinner from '../components/Spinner';
import { db } from '../firebase';
export default function ServiceCategory() {
  const [servicelistings,setServicelistings]=useState(null);
  const [loading,setLoading]=useState(true)
  const [lastFetchedServicelisting,setlastFetchedServicelisting]=useState(null)
  const params=useParams()
  useEffect(()=>{
      async function fetchServicelistings(){
  try {
    const servicelistingRef =collection(db,"servicelistings")
    const q=query(servicelistingRef,where("service_type","==",params.servicecategoryName),orderBy("timestamp","desc"),limit(8));
    const querySnap= await getDocs(q)
    const lastVisible=querySnap.docs[querySnap.docs.length-1]
    setlastFetchedServicelisting(lastVisible)
    const servicelistings=[]
    querySnap.forEach((doc)=>{
      return servicelistings.push({
        id:doc.id,
        data:doc.data()
      })
    }
    )
    setServicelistings(servicelistings)
      setLoading(false)
  } catch (error) {
    toast.error("could not fetch")
  }
      }
      fetchServicelistings()
  },[params.servicecategoryName])
//  async function onFetchMoreListings(){
//   try {
//     const listingRef =collection(db,"servicelistings")
//     const q=query(listingRef,where("service_type","==",params.categoryName),orderBy("timestamp","desc"),startAfter(lastFetchedListing), limit(4));
//     const querySnap= await getDocs(q)
//     const lastVisible=querySnap.docs[querySnap.docs.length-1]
//     setlastFetchedListing(lastVisible)
//     const listings=[]
//     querySnap.forEach((doc)=>{
//       return listings.push({
//         id:doc.id,
//         data:doc.data()
//       })
//     }
//     )
//     setListings((prevState)=>[
//       ...prevState,...listings
//     ])
//       setLoading(false)
//   } catch (error) {
//     toast.error("could not fetch")
//   }
//  }
  return (
    <div className='max-w-6xl mx-auto px-3'>
      <h1 className='text-3xl text-center mt-6 font-bold mb-6'>
        {params.categoryName==="Home-Painting" && "Home Painting Services"}
        {params.categoryName==="BK-Cleaning" && "Bathroom/Kitchen Cleaning Services"}
        {params.categoryName==="SC-Cleaning" && "Sofa/Carpet Cleaning Services"}
        {params.categoryName==="Pest-Cleaning" && "Pest Cleaning Services"}
        {params.categoryName==="AC-HService" && "AC Repair Services"}
        {params.categoryName==="M-HService" && "Microwave Repair Services"}
        {params.categoryName==="WM-HService" && "Washing Machine Repair Services"}
        {params.categoryName==="WP-HService" && "Water Purifier Repair Services"}
        {params.categoryName==="R-HService" && "Refrigerator Repair Services"}
        {params.categoryName==="Disinfection" && "Disinfection Services"}
        {params.categoryName==="Cooking Services" && "Cooking Services Services"}
      </h1>
      {loading? (
        <Spinner/>
      ):servicelistings && servicelistings.length>0 ?(
        <>
          <main>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
            {servicelistings.map((servicelisting)=>(
                <ServicelistingItem  key={servicelisting.id} id={servicelisting.id} servicelisting={servicelisting.data}/>
              ))}
            </ul>
          </main>
          {/* {lastFetchedListing && (
            <div className='flex justify-center items-center'>
              <button onClick={onFetchMoreListings}
              className='bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out'>Load more</button>
            </div>
          )} */}
          </>
          
      ):(
        <p> There are no current {params.categoryName==="rent"?"places for rent":"places for sell"} </p>
      )}
    </div>
  )
}
