import React from 'react'
import FurnitureItem from '../components/FurnitureItem'
import { getAuth, updateProfile } from 'firebase/auth'
import { updateDoc,doc, collection, query, where, orderBy, getDocs, deleteDoc } from 'firebase/firestore'
import { useState ,useEffect} from 'react'
import { useNavigate ,Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase'
export default function RentFurniture() {
  const auth=getAuth()
  const navigate=useNavigate()
  const [furnitures,setFurnitures]=useState(null)
  const [loading,setLoading]=useState(true)
  //fetch data from database and view under profile section
  useEffect(()=>{
      async function fetchUserListedFurnitures(){
      
        const listingRef=collection(db,"furniture");
        //fetch all listings created by the user
        const q=query(listingRef,where("type","==","rent"),orderBy("timestamp","desc"));
        const querySnap=await getDocs(q); //get snapshot including all the listing
        let furnitures=[];
        querySnap.forEach((doc)=>{
          return furnitures.push({
            id:doc.id,
            data:doc.data()
          })
        })
        setFurnitures(furnitures);
        setLoading(false)
      }
      fetchUserListedFurnitures();
  },[]) 

  return (
    <>

    <div className='max-w-6xl px-3 mt-6 mx-auto'> 
      {/* view this section only when page is loaded and number of listings is greater than 0 */}
      {!loading && furnitures.length>0 &&(
        <>
        <h2 className='text-2xl text-center font-semibold mb-6 mt-6'> Rent Furnitures</h2>
        <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mx-auto space-x-6 items-center justify-center'>
          {furnitures.map((furniture)=>(
            <FurnitureItem key={furniture.id} id={furniture.id} furniture={furniture.data}  />
          ))}
        </ul>
        </>
      )}
    </div>
    </>
  )
}