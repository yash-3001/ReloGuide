import React from 'react'
import Spinner from '../components/Spinner'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { useEffect ,useState} from 'react'
import {Swiper,SwiperSlide} from "swiper/react"
import SwiperCore,{EffectFade,Autoplay,Navigation,Pagination} from 'swiper'
import "swiper/css/bundle"
import {useNavigate} from 'react-router-dom'
export default function Slider()  {
const [servicelistings,setservicelistings]=useState(null)
const [loading,setLoading]=useState(true)
SwiperCore.use([Autoplay,Navigation,Pagination])
const navigate=useNavigate()
useEffect(()=>{
  async function fetchServicelistings(){
    const servicelistingsRef = collection(db, "servicelistings");
    const q=query(servicelistingsRef,orderBy("timestamp","desc"),limit(5))
    const querySnap=await getDocs(q)
    let servicelistings=[];
    querySnap.forEach((doc)=>{
      return servicelistings.push({
        id:doc.id,
        data:doc.data()
      })
    })
    setservicelistings(servicelistings);
    setLoading(false)
  }
  fetchServicelistings()
},[])
if(loading){
  return <Spinner/>
}
if(servicelistings.length===0){
  return <></>
}

  return (
    servicelistings && 
    <>
    <Swiper
    
    slidesPerView={1}
    navigation
    pagination={{type:"progressbar"}}
    effect="fade"
    modules={[EffectFade]}
    autoplay={{delay:3000}}
    >
    {servicelistings.map(({data,id})=>(
      <SwiperSlide key={id} onClick={()=>navigate(`/servicecategory/${data.service_type}/${id}`)}>
        <div
                style={{
                  background: `url(${data.imgUrls[0]}) center, no-repeat`,
                  backgroundSize: "cover",
                }}
                className="relative w-full h-[300px] overflow-hidden"
              ></div>
          <p className='text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl'>
            {data.name}
          </p>
          <p className='text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl'>
            ${data.discountedPrice??data.regularPrice}
            {( data.service_type === "Home-Painting" || data.service_type ==="BK-Cleaning" || data.service_type === "Home-Cleaning" || data.service_type ==="Disinfection" || data.service_type ==="Pest-Cleaning" ) && "/BHK"}
            {( data.service_type === "AC-HService" || data.service_type ==="M-HService" || data.service_type === "WM-HService" || data.service_type === "WP-HService" || data.service_type ==="R-HService" || data.service_type ==="SC-Cleaning" ) && "/Unit"}
            {(data.service_type === "Cooking-Services") && "/day"}
          </p>
      </SwiperSlide>
    ))}
    </Swiper></>
  )
}
