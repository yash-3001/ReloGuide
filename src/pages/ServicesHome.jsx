// import React from 'react'
// // import aos
// import Aos from 'aos';
// // import aos css
// import 'aos/dist/aos.css';
// // import components
// import HeroS from '../components/Service/HeroS';
// import ProductS from '../components/Service/ProductS';

// export default function ServicesHome() {
//     // initialize aos
//     Aos.init({
//     duration: 1800,
//     offset: 100,
//     });
//     return (
//         <div className='overflow-hidden'>
//         <HeroS />
//         <ProductS/>
//       </div>
//   )
// }
// // import aos
// import Aos from 'aos';
// // import aos css
// import 'aos/dist/aos.css';
// // import components
// import 'aos/dist/aos.css';
// import HeroS from '../components/Service/HeroS';
// import ProductS from '../components/Service/ProductS';
import { collection, getDoc, getDocs, limit, orderBy, query, QuerySnapshot, where } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
// import ListingItem from '../components/ListingItem'
import ServicelistingItem from '../components/ServicelistingItem';
// import Slider from '../components/ServiceSlider'
import Slider from '../components/ServiceSlider'
import { db } from '../firebase'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaParking} from 'react-icons/fa'
export default function Home() {
    // // initialize aos
    // Aos.init({
    // duration: 1800,
    // offset: 100,
    // });

//search bar
const [searchInput, setSearchInput] = useState("");
const [searchResult,setSearchResult]=useState(null)
  function handleChange(e) {
  e.preventDefault();
  setSearchInput(e.target.value);


}
async function fetchSearchResult(){
  if (searchInput.length > 0) {
    const servicelistingRef=collection(db,"servicelistings")
  //   listingRef.city.filter((city) => {
  //     return city.name.match(searchInput);
  // });
  console.log(searchInput)
  const q=query(servicelistingRef,where("city","==",searchInput))
  const querySnap=await getDocs(q)
  const servicelistings=[]
          querySnap.forEach((doc)=>{
            return servicelistings.push({
              id:doc.id,
              data:doc.data()
            })
          })
          setSearchResult(servicelistings)
  }
}



 //serviceOffers
 const [offerServicelistings,setofferServicelistings]=useState(null)
 useEffect(()=>{
    async function fetchServicelistings(){
      try {
        // get reference
        const servicelistingRef=collection(db,"servicelistings")
        //create query
        const q=query(servicelistingRef,where("offer","==",true),orderBy("timestamp","desc"),limit(4))
        //execute the query
        const querySnap=await getDocs(q)
        const ServiceListings=[]
        querySnap.forEach((doc)=>{
          return ServiceListings.push({
            id:doc.id,
            data:doc.data()
          })
        })
        setofferServicelistings(ServiceListings)
        

      } catch (error) {
        console.log(error)
      }
    }
    fetchServicelistings()
 },[])

 //Home Painting Services
 const [HPListings,setHPListings]=useState(null)
 useEffect(()=>{
    async function fetchServicelistings(){
      try {
        // get reference
        const servicelistingRef=collection(db,"servicelistings")
        //create query
        const q=query(servicelistingRef,where("service_type","==","Home-Painting"),orderBy("timestamp","desc"),limit(4))
        //execute the query
        const querySnap=await getDocs(q)
        const ServiceListings=[]
        querySnap.forEach((doc)=>{
          return ServiceListings.push({
            id:doc.id,
            data:doc.data()
          })
        })
        setHPListings(ServiceListings)
        console.log(ServiceListings)

      } catch (error) {
        console.log(error)
      }
    }
    fetchServicelistings()
 },[])

  //Bathroom & Kitchen Cleaning Services
  const [BKListings,setBKListings]=useState(null)
  useEffect(()=>{
     async function fetchServicelistings(){
       try {
         // get reference
         const servicelistingRef=collection(db,"servicelistings")
         //create query
         const q=query(servicelistingRef,where("service_type","==","BK-Cleaning"),orderBy("timestamp","desc"),limit(4))
         //execute the query
         const querySnap=await getDocs(q)
         const ServiceListings=[]
         querySnap.forEach((doc)=>{
           return ServiceListings.push({
             id:doc.id,
             data:doc.data()
           })
         })
         setBKListings(ServiceListings)
         
 
       } catch (error) {
         console.log(error)
       }
     }
     fetchServicelistings()
  },[])
   //Home Cleaning Services
   const [HCListings,setHCListings]=useState(null)
   useEffect(()=>{
      async function fetchServicelistings(){
        try {
          // get reference
          const servicelistingRef=collection(db,"servicelistings")
          //create query
          const q=query(servicelistingRef,where("service_type","==","Home-Cleaning"),orderBy("timestamp","desc"),limit(4))
          //execute the query
          const querySnap=await getDocs(q)
          const ServiceListings=[]
          querySnap.forEach((doc)=>{
            return ServiceListings.push({
              id:doc.id,
              data:doc.data()
            })
          })
          setHCListings(ServiceListings)
          
  
        } catch (error) {
          console.log(error)
        }
      }
      fetchServicelistings()
   },[])
   //Disinfection Services
   const [DListings,setDListings]=useState(null)
   useEffect(()=>{
      async function fetchServicelistings(){
        try {
          // get reference
          const servicelistingRef=collection(db,"servicelistings")
          //create query
          const q=query(servicelistingRef,where("service_type","==","Disinfection"),orderBy("timestamp","desc"),limit(4))
          //execute the query
          const querySnap=await getDocs(q)
          const ServiceListings=[]
          querySnap.forEach((doc)=>{
            return ServiceListings.push({
              id:doc.id,
              data:doc.data()
            })
          })
          setDListings(ServiceListings)
          
  
        } catch (error) {
          console.log(error)
        }
      }
      fetchServicelistings()
   },[])
   // Pest-Cleaning Services
   const [PCListings,setPCistings]=useState(null)
   useEffect(()=>{
      async function fetchServicelistings(){
        try {
          // get reference
          const servicelistingRef=collection(db,"servicelistings")
          //create query
          const q=query(servicelistingRef,where("service_type","==","Pest-Cleaning"),orderBy("timestamp","desc"),limit(4))
          //execute the query
          const querySnap=await getDocs(q)
          const ServiceListings=[]
          querySnap.forEach((doc)=>{
            return ServiceListings.push({
              id:doc.id,
              data:doc.data()
            })
          })
          setPCistings(ServiceListings)
          
  
        } catch (error) {
          console.log(error)
        }
      }
      fetchServicelistings()
   },[])
   // AC-HService Services
   const [ACHListings,setACHistings]=useState(null)
   useEffect(()=>{
      async function fetchServicelistings(){
        try {
          // get reference
          const servicelistingRef=collection(db,"servicelistings")
          //create query
          const q=query(servicelistingRef,where("service_type","==","AC-HService"),orderBy("timestamp","desc"),limit(4))
          //execute the query
          const querySnap=await getDocs(q)
          const ServiceListings=[]
          querySnap.forEach((doc)=>{
            return ServiceListings.push({
              id:doc.id,
              data:doc.data()
            })
          })
          setACHistings(ServiceListings)
          
  
        } catch (error) {
          console.log(error)
        }
      }
      fetchServicelistings()
   },[])
   // M-HService Services
   const [MHListings,setMHistings]=useState(null)
   useEffect(()=>{
      async function fetchServicelistings(){
        try {
          // get reference
          const servicelistingRef=collection(db,"servicelistings")
          //create query
          const q=query(servicelistingRef,where("service_type","==","M-HService"),orderBy("timestamp","desc"),limit(4))
          //execute the query
          const querySnap=await getDocs(q)
          const ServiceListings=[]
          querySnap.forEach((doc)=>{
            return ServiceListings.push({
              id:doc.id,
              data:doc.data()
            })
          })
          setMHistings(ServiceListings)
          
  
        } catch (error) {
          console.log(error)
        }
      }
      fetchServicelistings()
   },[])
   // WM-HService Services
   const [WMHListings,setWMHistings]=useState(null)
   useEffect(()=>{
      async function fetchServicelistings(){
        try {
          // get reference
          const servicelistingRef=collection(db,"servicelistings")
          //create query
          const q=query(servicelistingRef,where("service_type","==","WM-HService"),orderBy("timestamp","desc"),limit(4))
          //execute the query
          const querySnap=await getDocs(q)
          const ServiceListings=[]
          querySnap.forEach((doc)=>{
            return ServiceListings.push({
              id:doc.id,
              data:doc.data()
            })
          })
          setWMHistings(ServiceListings)
          
  
        } catch (error) {
          console.log(error)
        }
      }
      fetchServicelistings()
   },[])
   // WP-HService Services
   const [WPHListings,setWPHistings]=useState(null)
   useEffect(()=>{
      async function fetchServicelistings(){
        try {
          // get reference
          const servicelistingRef=collection(db,"servicelistings")
          //create query
          const q=query(servicelistingRef,where("service_type","==","WP-HService"),orderBy("timestamp","desc"),limit(4))
          //execute the query
          const querySnap=await getDocs(q)
          const ServiceListings=[]
          querySnap.forEach((doc)=>{
            return ServiceListings.push({
              id:doc.id,
              data:doc.data()
            })
          })
          setWPHistings(ServiceListings)
          
  
        } catch (error) {
          console.log(error)
        }
      }
      fetchServicelistings()
   },[])
   // R-HService Services
   const [RHListings,setRHistings]=useState(null)
   useEffect(()=>{
      async function fetchServicelistings(){
        try {
          // get reference
          const servicelistingRef=collection(db,"servicelistings")
          //create query
          const q=query(servicelistingRef,where("service_type","==","R-HService"),orderBy("timestamp","desc"),limit(4))
          //execute the query
          const querySnap=await getDocs(q)
          const ServiceListings=[]
          querySnap.forEach((doc)=>{
            return ServiceListings.push({
              id:doc.id,
              data:doc.data()
            })
          })
          setRHistings(ServiceListings)
          
  
        } catch (error) {
          console.log(error)
        }
      }
      fetchServicelistings()
   },[])
   // SC-Cleaning Services
   const [SCCListings,setSCCListings]=useState(null)
   useEffect(()=>{
      async function fetchServicelistings(){
        try {
          // get reference
          const servicelistingRef=collection(db,"servicelistings")
          //create query
          const q=query(servicelistingRef,where("service_type","==","SC-Cleaning"),orderBy("timestamp","desc"),limit(4))
          //execute the query
          const querySnap=await getDocs(q)
          const ServiceListings=[]
          querySnap.forEach((doc)=>{
            return ServiceListings.push({
              id:doc.id,
              data:doc.data()
            })
          })
          setSCCListings(ServiceListings)
          
  
        } catch (error) {
          console.log(error)
        }
      }
      fetchServicelistings()
   },[])
   // Cooking Services
   const [CSListings,setCSListings]=useState(null)
   useEffect(()=>{
      async function fetchServicelistings(){
        try {
          // get reference
          const servicelistingRef=collection(db,"servicelistings")
          //create query
          const q=query(servicelistingRef,where("service_type","==","Cooking-Services"),orderBy("timestamp","desc"),limit(4))
          //execute the query
          const querySnap=await getDocs(q)
          const ServiceListings=[]
          querySnap.forEach((doc)=>{
            return ServiceListings.push({
              id:doc.id,
              data:doc.data()
            })
          })
          setCSListings(ServiceListings)
          
  
        } catch (error) {
          console.log(error)
        }
      }
      fetchServicelistings()
   },[])
  return (
    <div>
    <Slider/>
    <div className='flex'>
    <input
   type="text"
   placeholder="Search by city name"
   onChange={handleChange}
   value={searchInput} />
   <AiOutlineSearch className='text-lg mr-1 mt-4'  onClick={fetchSearchResult}/>
    </div>
    
    <div className='max-w-6xl mx-auto pt-4 space-y-6'>
    {searchResult && searchResult.length>0 && (
        <div className='m-2 mb-6 ' >
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Search Results</h2>
          <Link to="/soffers"><p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition  duration-150 ease-in-out'>Show more offers</p></Link>
          <ul className='sm:grid sm:grid-cols lg:grid-cols-3 xl:grid-cols-4 space-x-4'>
            {searchResult.map((ServiceListings)=>(
              <ServicelistingItem key={ServiceListings.id} servicelisting={ServiceListings.data} id={ServiceListings.id}/>
            ))}
          </ul>
        </div>
      )}
      {offerServicelistings && offerServicelistings.length>0 && (
        <div className='m-2 mb-6 ' >
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Recent Offers</h2>
          <Link to="/soffers"><p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition  duration-150 ease-in-out'>Show more offers</p></Link>
          <ul className='sm:grid sm:grid-cols lg:grid-cols-3 xl:grid-cols-4 space-x-4'>
            {offerServicelistings.map((servicelisting)=>(
              <ServicelistingItem key={servicelisting.id} servicelisting={servicelisting.data} id={servicelisting.id}/>
            ))}
          </ul>
        </div>
      )}

{BKListings && BKListings.length>0 && (
        <div className='m-2 mb-6 ' >
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Bathroom & Kitchen Cleaning Services</h2>
          <Link to="/servicecategory/BK-Cleaning"><p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition  duration-150 ease-in-out'>Show more</p></Link>
          <ul className='sm:grid sm:grid-cols lg:grid-cols-3 xl:grid-cols-4 space-x-4'>
            {BKListings.map((servicelisting)=>(
              <ServicelistingItem key={servicelisting.id} servicelisting={servicelisting.data} id={servicelisting.id}/>
            ))}
          </ul>
        </div>
      )}
  {HPListings && HPListings.length>0 && (
        <div className='m-2 mb-6 ' >
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Home Painting Services</h2>
          <Link to="/servicecategory/Home-Painting"><p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition  duration-150 ease-in-out'>Show more</p></Link>
          <ul className='sm:grid sm:grid-cols lg:grid-cols-3 xl:grid-cols-4 space-x-4'>
            {HPListings.map((servicelisting)=>(
              <ServicelistingItem key={servicelisting.id} servicelisting={servicelisting.data} id={servicelisting.id}/>
            ))}
          </ul>
        </div>
      )}
      {HCListings && HCListings.length>0 && (
        <div className='m-2 mb-6 ' >
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Home Cleaning Services</h2>
          <Link to="/servicecategory/Home-Cleaning"><p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition  duration-150 ease-in-out'>Show more</p></Link>
          <ul className='sm:grid sm:grid-cols lg:grid-cols-3 xl:grid-cols-4 space-x-4'>
            {HCListings.map((servicelisting)=>(
              <ServicelistingItem key={servicelisting.id} servicelisting={servicelisting.data} id={servicelisting.id}/>
            ))}
          </ul>
        </div>
      )}
      {DListings && DListings.length>0 && (
        <div className='m-2 mb-6 ' >
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Disinfection Services</h2>
          <Link to="/servicecategory/Disinfection"><p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition  duration-150 ease-in-out'>Show more</p></Link>
          <ul className='sm:grid sm:grid-cols lg:grid-cols-3 xl:grid-cols-4 space-x-4'>
            {DListings.map((servicelisting)=>(
              <ServicelistingItem key={servicelisting.id} servicelisting={servicelisting.data} id={servicelisting.id}/>
            ))}
          </ul>
        </div>
      )}
      {PCListings && PCListings.length>0 && (
        <div className='m-2 mb-6 ' >
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Pest Cleaning Services</h2>
          <Link to="/servicecategory/Pest-Cleaning"><p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition  duration-150 ease-in-out'>Show more</p></Link>
          <ul className='sm:grid sm:grid-cols lg:grid-cols-3 xl:grid-cols-4 space-x-4'>
            {PCListings.map((servicelisting)=>(
              <ServicelistingItem key={servicelisting.id} servicelisting={servicelisting.data} id={servicelisting.id}/>
            ))}
          </ul>
        </div>
      )}
      {ACHListings && ACHListings.length>0 && (
        <div className='m-2 mb-6 ' >
          <h2 className='px-3 text-2xl mt-6 font-semibold'>AC Repair Services</h2>
          <Link to="/servicecategory/AC-HService"><p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition  duration-150 ease-in-out'>Show more</p></Link>
          <ul className='sm:grid sm:grid-cols lg:grid-cols-3 xl:grid-cols-4 space-x-4'>
            {ACHListings.map((servicelisting)=>(
              <ServicelistingItem key={servicelisting.id} servicelisting={servicelisting.data} id={servicelisting.id}/>
            ))}
          </ul>
        </div>
      )}
      {MHListings && MHListings.length>0 && (
        <div className='m-2 mb-6 ' >
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Microwave Repair Services</h2>
          <Link to="/servicecategory/M-HService"><p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition  duration-150 ease-in-out'>Show more</p></Link>
          <ul className='sm:grid sm:grid-cols lg:grid-cols-3 xl:grid-cols-4 space-x-4'>
            {MHListings.map((servicelisting)=>(
              <ServicelistingItem key={servicelisting.id} servicelisting={servicelisting.data} id={servicelisting.id}/>
            ))}
          </ul>
        </div>
      )}
      {WMHListings && WMHListings.length>0 && (
        <div className='m-2 mb-6 ' >
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Washing Machine Repair Services</h2>
          <Link to="/servicecategory/WM-HService"><p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition  duration-150 ease-in-out'>Show more</p></Link>
          <ul className='sm:grid sm:grid-cols lg:grid-cols-3 xl:grid-cols-4 space-x-4'>
            {WMHListings.map((servicelisting)=>(
              <ServicelistingItem key={servicelisting.id} servicelisting={servicelisting.data} id={servicelisting.id}/>
            ))}
          </ul>
        </div>
      )}
      {WPHListings && WPHListings.length>0 && (
        <div className='m-2 mb-6 ' >
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Water Purifier Repair Services</h2>
          <Link to="/servicecategory/WP-HService"><p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition  duration-150 ease-in-out'>Show more</p></Link>
          <ul className='sm:grid sm:grid-cols lg:grid-cols-3 xl:grid-cols-4 space-x-4'>
            {WPHListings.map((servicelisting)=>(
              <ServicelistingItem key={servicelisting.id} servicelisting={servicelisting.data} id={servicelisting.id}/>
            ))}
          </ul>
        </div>
      )}
      {RHListings && RHListings.length>0 && (
        <div className='m-2 mb-6 ' >
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Refrigerator Repair Services</h2>
          <Link to="/servicecategory/R-HService"><p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition  duration-150 ease-in-out'>Show more</p></Link>
          <ul className='sm:grid sm:grid-cols lg:grid-cols-3 xl:grid-cols-4 space-x-4'>
            {RHListings.map((servicelisting)=>(
              <ServicelistingItem key={servicelisting.id} servicelisting={servicelisting.data} id={servicelisting.id}/>
            ))}
          </ul>
        </div>
      )}
      {SCCListings && SCCListings.length>0 && (
        <div className='m-2 mb-6 ' >
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Sofa/Carpet Repair Services</h2>
          <Link to="/servicecategory/SC-Cleaning"><p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition  duration-150 ease-in-out'>Show more</p></Link>
          <ul className='sm:grid sm:grid-cols lg:grid-cols-3 xl:grid-cols-4 space-x-4'>
            {SCCListings.map((servicelisting)=>(
              <ServicelistingItem key={servicelisting.id} servicelisting={servicelisting.data} id={servicelisting.id}/>
            ))}
          </ul>
        </div>
      )}
      {CSListings && CSListings.length>0 && (
        <div className='m-2 mb-6 ' >
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Cooking Services</h2>
          <Link to="/servicecategory/Cooking-Services"><p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition  duration-150 ease-in-out'>Show more</p></Link>
          <ul className='sm:grid sm:grid-cols lg:grid-cols-3 xl:grid-cols-4 space-x-4'>
            {CSListings.map((servicelisting)=>(
              <ServicelistingItem key={servicelisting.id} servicelisting={servicelisting.data} id={servicelisting.id}/>
            ))}
          </ul>
        </div>
      )}

    </div>
    </div>
  )
}
