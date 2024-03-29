import { getAuth, updateProfile } from 'firebase/auth'
import { updateDoc, doc, collection, query, where, orderBy, getDocs, deleteDoc} from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase'
import {FcHome, FcServices} from 'react-icons/fc'
import { useEffect } from 'react'
import ListingItem from '../components/ListingItem'
import ServicelistingItem from '../components/ServicelistingItem'

export default function Profile() {
  const auth=getAuth()
  const navigate=useNavigate()
  const [changeDetail,setchangeDetail]=useState(false); //edit
  const [listings,setListings]=useState(null)
  const [servicelistings,setServiceListings] = useState(null);
  const [serviceloading,setServiceloading] = useState(true);
  const [loading,setLoading]=useState(true)
  const [formData,setformData]=useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  })
  const {name,email}=formData
  function onLogout(){
    auth.signOut()
    navigate("/")
  }
  function onChange(e){
    setformData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value

    }))
  }
  async function onsubmit(){
      try {
        if(auth.currentUser.displayName!==name){
          //update display name in firebase auth
          await updateProfile(auth.currentUser,{
            displayName:name,
          });
          //update name in firestore
          const docRef=doc(db,"users",auth.currentUser.uid)
          await updateDoc(docRef,{name:name})
        }
        toast.success("Profile details updated")
      } catch (error) {
        toast.error("Could not update profile detail")
      }
  }
  //fetch data from database and view under profile section
  useEffect(()=>{
      async function fetchUserListings(){
      
        const listingRef=collection(db,"listings");
        //fetch all listings created by the user
        const q=query(listingRef,where("userRef","==",auth.currentUser.uid),orderBy("timestamp","desc"));
        const querySnap=await getDocs(q); //get snapshot including all the listing
        let listings=[];
        querySnap.forEach((doc)=>{
          return listings.push({
            id:doc.id,
            data:doc.data()
          })
        })
        setListings(listings);
        setLoading(false)
      }
      fetchUserListings();

  },[auth.currentUser.uid])  //each time the user changes the useEffect will be triggered and new data will be fetched
  useEffect(()=>{
    async function fetchUserServicelistings(){
      const serviceListingRef = collection(db,"servicelistings");
      const q = query(
        serviceListingRef, 
        where("userRef", "==",auth.currentUser.uid), 
        orderBy("timestamp","desc")
      );
      const querySnap = await getDocs(q);
      let servicelistings = [];
      querySnap.forEach((doc)=>{
        return servicelistings.push({
          id:doc.id,
          data:doc.data(),
        });
      } );
      setServiceListings(servicelistings);
      setServiceloading(false);
    }
    fetchUserServicelistings();
  },[auth.currentUser.uid]);

  async function onDelete(listingID) {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingID));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updatedListings);
      toast.success("Successfully deleted the listing");
    }
  }
  function onEdit(listingID){
    navigate(`/edit-listing/${listingID}`)
  }
  async function onDeleteService(servicelistingID) {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "servicelistings", servicelistingID));
      const updatedServicelistings = servicelistings.filter(
        (servicelisting) => servicelisting.id !== servicelistingID
      );
      setServiceListings(updatedServicelistings);
      toast.success("Successfully deleted the service listing");
    }
  }
  function onEditService(servicelistingID){
    navigate(`/edit-listing-services/${servicelistingID}`)
  }
  return (
    <>
    <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
      <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
      <div className='w-full md:w-[50%] mt-6 px-3'>
        <form>
          <input type="text" id="name" value={name} disabled={!changeDetail} onChange={onChange} className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${changeDetail &&" bg-red-200 focus:bg-red-200"}`}/>
          <input type="email" id="email" value={email} disabled className=' mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out'/>
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
            <p className='flex items-center mb-6 '> Do you want to change your name?
              <span 
              className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'
              onClick={()=>
             { changeDetail && onsubmit();  //edit==true and submit==true
              setchangeDetail((prevState)=>!prevState)}
             } >
               {changeDetail?"Apply changes":"Edit"}
              </span>
            </p>
            <p onClick={onLogout} className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer'> Sign Out</p>
          </div>
        </form>
        <button type="submit" className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 '>
          <Link to="/create-listing" className="flex justify-center items-center">
          <FcHome className='mr-2 text-3xl bg-red-200 rounded-full p-1 border-2'/>
          Sell or rent your home
          </Link>
          
        </button>
        <button type="submit" className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 mt-5 '>
          <Link to="/create-listing-services" className="flex justify-center items-center">
          <FcServices className='mr-2 text-3xl bg-red-200 rounded-full p-1 border-2'/>
          Offer your services
          </Link>
          
        </button>
      </div>
    </section>
    <div className='max-w-6xl px-3 mt-6 mx-auto'> 
      {/* view this section only when page is loaded and number of listings is greater than 0 */}
      {!loading && listings.length>0 &&(
        <>
        <h2 className='text-2xl text-center font-semibold mb-6 mt-6'> My Listings</h2>
        <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mx-auto space-x-6 items-center justify-center'>
          {listings.map((listing)=>(
            <ListingItem key={listing.id} id={listing.id} listing={listing.data} onDelete={()=>onDelete(listing.id)}  onEdit={()=>onEdit(listing.id)} />
          ))}
        </ul>
        </>
      )}
    </div>
    <div className='max-w-6xl px-3 mt-6 mx-auto'> 
      {/* view this section only when page is loaded and number of listings is greater than 0 */}
      {!serviceloading && servicelistings.length>0 &&(
        <>
        <h2 className='text-2xl text-center font-semibold mb-6 mt-6'> My Services Listings</h2>
        <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mx-auto space-x-6 items-center justify-center'>
          {servicelistings.map((servicelisting)=>(
            <ServicelistingItem 
              key={servicelisting.id}
              id={servicelisting.id} 
              servicelisting={servicelisting.data}
              onDeleteService={()=>onDeleteService(servicelisting.id)}
              onEditService={()=>onEditService(servicelisting.id)}
            />
          ))}
        </ul>
        </>
      )}
    </div>
    </>
  )
}
