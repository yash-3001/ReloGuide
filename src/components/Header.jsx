import React from 'react'
import { useState,useEffect } from 'react';
import { useLocation ,useNavigate} from 'react-router'
import {getAuth,onAuthStateChanged, signOut} from "firebase/auth"
import MoVens from "../assests/img/header/MoVens.png"
// import data
import { header } from '../data';
// import icons
import { HiMenuAlt4, HiOutlineX } from 'react-icons/hi';
// import components
import MobileNav from './MobileNav';
import Nav from './Nav';


export default function Header() {
  
  // mobile nav state
  const [mobileNav, setMobileNav] = useState(false);
  // header state
  const [isActive, setIsActive] = useState(false);
  // destructure header data
  const { logo, btnText } = header;
  // scroll event
  useEffect(() => {
    // window.addEventListener('scroll', () => {
    //   window.scrollY > 0 ? setIsActive(true) : setIsActive(false);
    // });
  });
  const [currentUrl,setCurrentUrl]=useState(null)
  const [pageState,setpageState]=useState("Sign-in")
  const [pageSignoutState,setpageSignoutState]=useState(null)
  const [loginState,setloginState]=useState(false)
  const location=useLocation();
  const navigate=useNavigate();
  const auth=getAuth();
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setloginState(true)
        setpageSignoutState("LogOut")
        setpageState("Profile") 
      
      }
      else{
        setpageState("Sign-in")
      }
    })
  },[auth])

  console.log(loginState)
  function onLogout(){
    auth.signOut()
    setloginState(false)
    navigate("/")
  }

  function pathMathRoute(route){
    if(route===location.pathname){
      setCurrentUrl(route)
      return true
    }
  };
  //TO-DO
  //dynamic header components
   function renderHeaderComponents(){
    if(location.pathname==='/'){
      return(<ul className='flex space-x-10'>
         
      <li 
      className={` cursor-pointer py-3 text-lg font-semibold text-[#89CFF0] border-b-[3px] border-b-transparent ${pathMathRoute("/listingsHome") && "text-black border-b-red-500"}`}
      onClick={()=>navigate("/listingsHome")}>Listings</li>
      <li 
      className={` cursor-pointer py-3 text-lg  font-semibold text-[#89CFF0] border-b-[3px] border-b-transparent ${pathMathRoute("/services") && "text-black border-b-red-500"}`}
      onClick={()=>navigate("/services")}>Services</li>
      <li 
      className={` cursor-pointer py-3 text-lg  font-semibold text-[#89CFF0] border-b-[3px] border-b-transparent ${pathMathRoute("/furniture") && "text-black border-b-red-500"}`}
      onClick={()=>navigate("/furniture")}>Furniture</li>
    
          {loginState ?  <li
         className={` cursor-pointer py-3  text-lg  font-semibold text-red-300 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}
         onClick={onLogout}> Logout</li> : <li
         className={` cursor-pointer py-3 text-lg  font-semibold text-red-300 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}
         onClick={()=>navigate("/sign-in")}> Sign-in</li>} 
      </ul> )
    }
     if(location.pathname==='/listingsHome' ){
      return (<ul className='flex space-x-10'>
      <li
         className={` cursor-pointer py-3 text-lg  font-semibold text-[#89CFF0] border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}
         onClick={()=>navigate("/offers")}> Offers</li>
          {loginState ?  <li
         className={` cursor-pointer py-3  text-lg  font-semibold text-[#89CFF0] border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}
         onClick={()=>navigate("/profile")}> Profile</li> : <li
         className={` cursor-pointer py-3 text-lg  font-semibold text-red-300 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}
         onClick={()=>navigate("/sign-in")}> Sign-in</li>} 
        {/* <li
         
         className={` cursor-pointer py-3 text-lg  font-semibold  text-red-300 border-b-[3px] border-b-transparent 
         ${(pathMathRoute("/sign-in") || pathMathRoute("/profile"))  && "text-black border-b-red-500"}`}
         onClick={()=>navigate("/profile")}
         >{pageState}</li> */}
         {loginState ?  <li
         className={` cursor-pointer py-3 text-lg  font-semibold text-red-300 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}
         onClick={onLogout}> Logout</li> :""} 
       
      </ul>)
     }

     if(location.pathname==='/offers' ){
      return (<ul className='flex space-x-10'>
        <li 
      className={` cursor-pointer py-3 text-lg  font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/listingsHome") && "text-black border-b-red-500"}`}
      onClick={()=>navigate("/listingsHome")}>Home</li>
        <li
         className={` cursor-pointer py-3 text-lg  font-semibold text-gray-400 border-b-[3px] border-b-transparent 
         ${(pathMathRoute("/sign-in") || pathMathRoute("/profile")) && "text-black border-b-red-500"}`}
         onClick={()=>navigate("/profile")}
         >{pageState}</li>
      </ul>)
     }

     if(location.pathname==='/services' ){
      return (<ul className='flex space-x-10'>
        <li 
      className={` cursor-pointer py-3 text-lg  font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/listingsHome") && "text-black border-b-red-500"}`}
      onClick={()=>navigate("/soffers")}>Offers</li>
        <li
      className={` cursor-pointer py-3 text-lg  font-semibold text-gray-400 border-b-[3px] border-b-transparent 
        ${(pathMathRoute("/sign-in") || pathMathRoute("/profile")) && "text-black border-b-red-500"}`}
        onClick={()=>navigate("/profile")}
        >{pageState}</li>
        {loginState ?  <li
      className={` cursor-pointer py-3  text-lg  font-semibold text-red-300 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}
        onClick={onLogout}> Logout</li> : <li
      className={` cursor-pointer py-3 text-lg  font-semibold text-red-300 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}
        onClick={()=>navigate("/sign-in")}> Sign-in</li>} 
      </ul>)
     }

     if(location.pathname==='/soffers' ){
      return (<ul className='flex space-x-10'>
        <li 
      className={` cursor-pointer py-3 text-lg  font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/listingsHome") && "text-black border-b-red-500"}`}
      onClick={()=>navigate("/ServicesHome")}>Home</li>
        <li
         className={` cursor-pointer py-3 text-lg  font-semibold text-gray-400 border-b-[3px] border-b-transparent 
         ${(pathMathRoute("/sign-in") || pathMathRoute("/profile")) && "text-black border-b-red-500"}`}
         onClick={()=>navigate("/profile")}
         >{pageState}</li>
      </ul>)
     }

     if(location.pathname==='/furniture'){
      return(<ul className='flex space-x-10'>
      <li 
      className={` cursor-pointer py-3 text-lg font-semibold text-[#89CFF0] border-b-[3px] border-b-transparent ${pathMathRoute("/listingsHome") && "text-black border-b-red-500"}`}
      onClick={()=>navigate("/BuyFurniture")}>Buy</li>
      <li 
      className={` cursor-pointer py-3 text-lg font-semibold text-[#89CFF0] border-b-[3px] border-b-transparent ${pathMathRoute("/listingsHome") && "text-black border-b-red-500"}`}
      onClick={()=>navigate("/RentFurniture")}>Rent</li>
      <li 
      className={` cursor-pointer py-3 text-lg  font-semibold text-[#89CFF0] border-b-[3px] border-b-transparent ${pathMathRoute("/services") && "text-black border-b-red-500"}`}
      onClick={()=>navigate("/SaleFurniture")}>Sale</li>
     
    
          {loginState ?  <li
         className={` cursor-pointer py-3  text-lg  font-semibold text-red-300 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}
         onClick={onLogout}> Logout</li> : <li
         className={` cursor-pointer py-3 text-lg  font-semibold text-red-300 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}
         onClick={()=>navigate("/sign-in")}> Sign-in</li>} 
      </ul> )
    }
    if(location.pathname==='/SaleFurniture'){
      return(<ul className='flex space-x-10'>
       <li 
      className={` cursor-pointer py-3 text-lg font-semibold text-[#89CFF0] border-b-[3px] border-b-transparent ${pathMathRoute("/listingsHome") && "text-black border-b-red-500"}`}
      onClick={()=>navigate("/furniture")}>Home</li>
      <li 
      className={` cursor-pointer py-3 text-lg font-semibold text-[#89CFF0] border-b-[3px] border-b-transparent ${pathMathRoute("/listingsHome") && "text-black border-b-red-500"}`}
      onClick={()=>navigate("/FurnitureProfile")}>Profile</li>
          {loginState ?  <li
         className={` cursor-pointer py-3  text-lg  font-semibold text-red-300 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}
         onClick={onLogout}> Logout</li> : <li
         className={` cursor-pointer py-3 text-lg  font-semibold text-red-300 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}
         onClick={()=>navigate("/sign-in")}> Sign-in</li>} 
      </ul> )
    }

    if(location.pathname==='/BuyFurniture' ){
      return(<ul className='flex space-x-10'>
       <li 
      className={` cursor-pointer py-3 text-lg font-semibold text-[#89CFF0] border-b-[3px] border-b-transparent ${pathMathRoute("/listingsHome") && "text-black border-b-red-500"}`}
      onClick={()=>navigate("/furniture")}>Home</li>
       <li 
      className={` cursor-pointer py-3 text-lg font-semibold text-[#89CFF0] border-b-[3px] border-b-transparent ${pathMathRoute("/listingsHome") && "text-black border-b-red-500"}`}
      onClick={()=>navigate("/RentFurniture")}>Rent</li>
      <li 
      className={` cursor-pointer py-3 text-lg font-semibold text-[#89CFF0] border-b-[3px] border-b-transparent ${pathMathRoute("/listingsHome") && "text-black border-b-red-500"}`}
      onClick={()=>navigate("/FurnitureProfile")}>Profile</li>
          {loginState ?  <li
         className={` cursor-pointer py-3  text-lg  font-semibold text-red-300 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}
         onClick={onLogout}> Logout</li> : <li
         className={` cursor-pointer py-3 text-lg  font-semibold text-red-300 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}
         onClick={()=>navigate("/sign-in")}> Sign-in</li>} 
      </ul> )
    }
    if(location.pathname==='/RentFurniture' ){
      return(<ul className='flex space-x-10'>
       <li 
      className={` cursor-pointer py-3 text-lg font-semibold text-[#89CFF0] border-b-[3px] border-b-transparent ${pathMathRoute("/listingsHome") && "text-black border-b-red-500"}`}
      onClick={()=>navigate("/furniture")}>Home</li>
       <li 
      className={` cursor-pointer py-3 text-lg font-semibold text-[#89CFF0] border-b-[3px] border-b-transparent ${pathMathRoute("/listingsHome") && "text-black border-b-red-500"}`}
      onClick={()=>navigate("/BuyFurniture")}>Buy</li>
      <li 
      className={` cursor-pointer py-3 text-lg font-semibold text-[#89CFF0] border-b-[3px] border-b-transparent ${pathMathRoute("/listingsHome") && "text-black border-b-red-500"}`}
      onClick={()=>navigate("/FurnitureProfile")}>Profile</li>
          {loginState ?  <li
         className={` cursor-pointer py-3  text-lg  font-semibold text-red-300 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}
         onClick={onLogout}> Logout</li> : <li
         className={` cursor-pointer py-3 text-lg  font-semibold text-red-300 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}
         onClick={()=>navigate("/sign-in")}> Sign-in</li>} 
      </ul> )
    }
    
   }
  return (
  
    <div className='bg-[#000000]  h-full  sticky top-0 z-40'>
    
    <div className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
      <div>
           {/* <img src="https://d3ds86a50t7cic.cloudfront.net/assets/6.4/public/default/frontend/mathrubhumi/images/popup-logo.webp" alt="logo" 
           className='h-14 cursor-pointer'
           onClick={()=>navigate("/")}
           /> */}
           <img src={MoVens}  className='h-14 cursor-pointer'  onClick={()=>navigate("/")}/>
      </div>
      <div>
     {renderHeaderComponents()}
      </div>
      
    </div>
    </div>
  )
}
