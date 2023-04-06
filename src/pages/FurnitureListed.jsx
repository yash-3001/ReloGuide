import React from 'react'
import { getDoc ,doc} from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { db } from '../firebase';
import {Swiper,SwiperSlide} from "swiper/react"
import SwiperCore,{EffectFade,Autoplay,Navigation,Pagination} from "swiper"
import "swiper/css/bundle"
import {getAuth} from 'firebase/auth'
import CarouselItem from '../components/CarouselItem';
import Carousel from "react-elastic-carousel";
import {FaMapMarkerAlt} from 'react-icons/fa'
import {IoCalendarNumber} from "react-icons/io5"
import {MdCategory} from "react-icons/md"
import {BsTools} from 'react-icons/bs'
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import Contact from '../components/Contact';
import { Outlet } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';
import { useNavigate } from 'react-router-dom';
export default function FurnitureListed() {
  const params=useParams() //get parameter from url
  const auth=getAuth()
  const navigate=useNavigate()
  const [furniture,setfurniture]=useState(null)
  const [loading,setLoading]=useState(true)
  const [shareLinkCopy,setshareLinkCopy]=useState(false)
  const [contactOwner,setcontactOwner]=useState(false)
  const[wishList,setWishList]=useState(false)
  const {loggedIn,checkingStatus}=useAuthStatus();
  useEffect(() => {
    async function fetchFurnitureItem() {
      const docRef = doc(db, "furniture", params.furnitureId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setfurniture(docSnap.data());
        setLoading(false);
        
      }
    }
    fetchFurnitureItem();
  }, [params.furnitureId]);
  const wishList_list=[]
  // const [wishList, setWishList] = useState(false);
  const [wishListItems, setWishListItems] = useState(new Set());
  
  function wishlist() {
    if (!loggedIn) {
      navigate('/sign-in');
      return;
    }
  
    const itemId = furniture.id;
    const newWishListItems = new Set(wishListItems);
    
    if (wishListItems.has(itemId)) {
      newWishListItems.delete(itemId);
    } else {
      newWishListItems.add(itemId);
    }
  
    setWishListItems(newWishListItems);
    setWishList(newWishListItems.has(itemId));
  }

  if (loading) {  
    return <Spinner />;
  }
console.log(furniture)
const breakPoints = [
  { width: 1, itemsToShow:1 },
];
  return (
    <main> 
  {/* create a carousel for image sliding */}
  <div className='m-4  flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg  shadow-lg bg-white lg:space-x-5 mt-14 '>
    {/* Image */}
  <div className='w-1/2 h-1/2 mt-9 ml-10 '>
  <Carousel breakPoints={breakPoints}>
    {furniture.imgUrls.map((url,index)=>(
       <img src={furniture.imgUrls[index]} className="w-screen h-[350px] rounded "/>
    ))}
  </Carousel>
  </div>
  {/* Details */}
  <div className=' rounded-lg  text-2xl mt-9 p-4'>
  <p className='text-4xl font-bold mb-3  '> {furniture.name} - Rs {furniture.price.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
   {furniture.type==="rent"?"/month":""}
   </p>
   <div className='flex text-slate-700 text-base'>
          <p className='flex items-center  mb-3 font-semibold'><FaMapMarkerAlt className='text-green-700 mr-1'/>{furniture.locality}</p>
          <p className='flex items-center  mb-3 font-semibold'>, {furniture.city}</p>
          <p className='flex items-center  mb-3 font-semibold'>, {furniture.state }</p>
          </div>
    <div className='flex justify-start items-center space-x-4 w-[75%]'>
          <p className='bg-red-800 w-full max-w-[150px] rounded-md p-1 text-white text-center font-semibold shadow-md'>{furniture.type==="rent"?"Rent":"Sale"}</p>
        
         {furniture.userRef !== auth.currentUser?.uid &&
         (<div>
          {wishList? <AiFillHeart onClick={wishlist} className='text-red-600' /> :<AiOutlineHeart onClick={wishlist}/>}
          </div>)
         }
        
          {/* <AiFillHeart onClick={wishlist} className={wishList?'text-red-400 ':'text-slate-500 '} /> */}
          
          {furniture.offer &&(
            <p className='w-full max-w-[150px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md'> ${+furniture.regularPrice- +furniture.discountedPrice}discount</p>
          )}
    </div>
    <p className='mt-3 mb-5 '>
          {furniture.description}</p>
          <ul className='flex mb-6 items-center  space-x-12 text-sm font-semibold'>
            <li className='flex items-center whitespace-nowrap'>
              < IoCalendarNumber className='text-lg mr-1 '/>
              <p className=''>{furniture.year}</p>
              </li>
              <li className='flex items-center whitespace-nowrap'>
              < MdCategory className='text-lg mr-1 ' />
              <p className=''>{furniture.category}</p>
              </li>
              <li className='flex items-center whitespace-nowrap'>
              < BsTools className='text-lg mr-1 '/>
              <p className=''>{furniture.material}</p>
              </li>
              </ul>
              {furniture.userRef !== auth.currentUser?.uid && !contactOwner && (
            <div className="mt-6">
              <button
                onClick={() => setcontactOwner(true)}
                className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contactOwner && (
            <Contact userRef={furniture.userRef} furniture={furniture} />
          )}
          <p className='text-slate-400' >Add to list option</p>
  </div>
  </div>

    </main>
  )
}
