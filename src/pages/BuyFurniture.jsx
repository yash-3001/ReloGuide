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
        const q=query(listingRef,where("type","==","sale"),orderBy("timestamp","desc"));
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
      <div className='max-w-6xl px-3 mt-6 mx-auto bg-cover' style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557618159-7d6fe547ae20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmxhY2slMjBmdXJuaXR1cmV8ZW58MHx8MHx8&w=1000&q=80')" }}>
        <div className='bg-white bg-opacity-75 sm:py-8 py-4'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center'>
              <h2 className='text-3xl font-bold text-gray-900'>Buy Furniture</h2>
              <p className='mt-4 text-lg text-gray-500'>
                Check out our selection of high-quality furniture available for rent.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-6xl px-3 mt-6 mx-auto'> 
        {/* view this section only when page is loaded and number of listings is greater than 0 */}
        {!loading && furnitures.length>0 &&(
          <>
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
