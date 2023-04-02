import React from 'react'
import FurnitureItem from '../components/FurnitureItem'
import { getAuth, updateProfile } from 'firebase/auth'
import { updateDoc,doc, collection, query, where, orderBy, getDocs, deleteDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase'
import {FcHome} from 'react-icons/fc'
import { useEffect } from 'react'
import ListingItem from '../components/ListingItem'
export default function FurnitureProfile() {
  const auth=getAuth()
  const navigate=useNavigate()
  const [furnitures,setFurnitures]=useState(null)
  const [loading,setLoading]=useState(true)
  //fetch data from database and view under profile section
  useEffect(()=>{
      async function fetchUserListedFurnitures(){
      
        const listingRef=collection(db,"furniture");
        //fetch all listings created by the user
        const q=query(listingRef,where("userRef","==",auth.currentUser.uid),orderBy("timestamp","desc"));
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
  },[auth.currentUser.uid])  //each time the user changes the useEffect will be triggered and new data will be fetched
  async function onDelete(furnitureID) {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "furniture", furnitureID));
      const updatedFurnitureItems = furnitures.filter(
        (furniture) => furniture.id !== furnitureID
      );
      setFurnitures(updatedFurnitureItems);
      toast.success("Successfully deleted the listing");
    }
  }
  function onEdit(furnitureID){
    navigate(`/edit-furnitureItem/${furnitureID}`)
  }
  return (
    <>

    <div className='max-w-6xl px-3 mt-6 mx-auto'> 
      {/* view this section only when page is loaded and number of listings is greater than 0 */}
      {!loading && furnitures.length>0 &&(
        <>
        <h2 className='text-2xl text-center font-semibold mb-6 mt-6'> My Furnitures</h2>
        <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mx-auto space-x-6 items-center justify-center'>
          {furnitures.map((furniture)=>(
            <FurnitureItem key={furniture.id} id={furniture.id} furniture={furniture.data} onDelete={()=>onDelete(furniture.id)}  onEdit={()=>onEdit(furniture.id)} />
          ))}
        </ul>
        </>
      )}
    </div>
    </>
  )
}
