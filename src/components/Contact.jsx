import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect ,} from 'react'
import { useState } from 'react'
import {toast} from "react-toastify"
import { db } from '../firebase'

export default function Contact({userRef,listing,servicelisting}) {
    const [landLord,setLandLord]=useState(null)
    const [message,setMessage]=useState("")
    useEffect(()=>{
            async function getLandLord(){
                const docRef=doc(db,"users",userRef)
                const docSnap=await getDoc(docRef);
                if(docSnap.exists()){
                        setLandLord(docSnap.data())
                }
                else{
                    toast.error("Could not get landlord data")
                }
            }
            getLandLord()
    },[userRef])
    function onChange(e){
        setMessage(e.target.value)
    }
  return (
    <>{landLord!==null && (
        <div className='flex flex-col w-full '>
            <p className=''>Contact {landLord.name} for the {listing.name.toLowerCase()}</p>
            <div className='mt-3 mb-6'>
                <textarea 
                name="message"
                 id="message"
                  rows="2" 
                  value={message}
                onChange={onChange}
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition  duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                />
            </div>
            <a href={`mailto:${landLord.email}?Subject=${listing.name}&body=${message}`}>
                <button className=' mb-6 px-7 py-3 bg-blue-600 tetx-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 transition duration-150 ease-in-out w-full text-center ' type="button">Send Message</button>
            </a>
        </div>
    )}</>
  )
}
