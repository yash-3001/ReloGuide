import React, { useEffect, useState } from 'react'
import ServicelistingItem from '../components/ServicelistingItem';
import { collection, getDoc, getDocs, limit, limitToLast, orderBy, query, startAfter, where } from 'firebase/firestore';
import {toast} from "react-toastify"
import Spinner from '../components/Spinner';
import { db } from '../firebase';
export default function Soffers() {
    const [servicelistings,setServicelistings]=useState(null);
    const [loading,setLoading]=useState(true)
    const [lastFetchedServicelisting,setlastFetchedServicelisting]=useState(null)
    useEffect(()=>{
        async function fetchServicelistings(){
            try {
                const servicelistingRef =collection(db,"servicelistings")
                const q=query(servicelistingRef,where("offer","==",true),orderBy("timestamp","desc"),limit(8));
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
    },[])
    async function onFetchMoreServicelistings(){
        try {
          const servicelistingRef =collection(db,"servicelistings")
          const q=query(servicelistingRef,where("offer","==",true),orderBy("timestamp","desc"),startAfter(lastFetchedServicelisting), limit(4));
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
          setServicelistings((prevState)=>[
            ...prevState,...servicelistings
          ])
            setLoading(false)
        } catch (error) {
          toast.error("could not fetch")
        }
       }
    return (
    <div>
        <h1 className='text-3xl text-center mt-6 font-bold mb-6'>Offers</h1>
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
          {lastFetchedServicelisting && (
            <div className='flex justify-center items-center'>
              <button onClick={onFetchMoreServicelistings}
              className='bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out'>Load more</button>
            </div>
          )}
        </>
          
      ):(
        <p> There are no current offers </p>
      )}
    </div>
    )
}
