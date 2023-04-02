import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect ,} from 'react'
import { useState } from 'react'
import {toast} from "react-toastify"
import { db } from '../firebase'

export default function ServiceContact({userRef,servicelistings}) {
    const [contactOwner,setcontactOwner]=useState(false)
    const [message,setMessage]=useState("")
    useEffect(()=>{
            async function getcontactOwner(){
                const docRef=doc(db,"users",userRef)
                const docSnap=await getDoc(docRef);
                if(docSnap.exists()){
                        setcontactOwner(docSnap.data())
                }
                else{
                    toast.error("Could not get owner data")
                }
            }
            getcontactOwner()
    },[userRef])
    function onChange(e){
        setMessage(e.target.value)
    }
  return (
    <>{contactOwner!==null && (
        <div className='flex flex-col w-full '>
            <p className=''>Contact {contactOwner.name} for the {servicelistings.name.toLowerCase()}</p>
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
            <a href={`mailto:${contactOwner.email}?Subject=${servicelistings.name}&body=${message}`}>
                <button className=' mb-6 px-7 py-3 bg-blue-600 tetx-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 transition duration-150 ease-in-out w-full text-center ' type="button">Send Message</button>
            </a>
        </div>
    )}</>
  )
}
