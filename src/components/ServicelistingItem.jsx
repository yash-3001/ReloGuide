import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import {MdLocationPin} from 'react-icons/md'
import {AiFillEdit} from 'react-icons/ai'
import {FaTrashAlt} from 'react-icons/fa'

export default function ServicelistingItem({servicelisting,id,onEditService,onDeleteService}) {
  return (
    <li className=' relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]'>
        <Link className='contents' to={`/servicecategory/${servicelisting.service_type}/${id}`}>
        <img className='h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in' loading="lazy" src={servicelisting.imgUrls[0]}/>
        <Moment fromNow className=" absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold roundd-md px-2 py-1 shadow-lg ">
          {servicelisting.timestamp?.toDate()}
        </Moment>
        <div className='w-full p-[10px'>
          <div className='flex items-center space-x-1'>
            <MdLocationPin className='h-4 w-4 text-green-600'/>
            <p className='font-semibold text-sm mb-[2px text-gray-600 truncate'> {servicelisting.locality}</p>
            <p className='font-semibold text-sm mb-[2px text-gray-600 truncate'>, {servicelisting.city}</p>
            <p className='font-semibold text-sm mb-[2px text-gray-600 truncate'>, {servicelisting.state}</p>
          </div>
          <p className='font-semibold text-xl m-0 truncate'>{servicelisting.name}</p>
          <p className='font-semibold text-sm m-0 truncate'>{servicelisting.service_type}</p>

          <p className="text-[#457b9d] mt-2 font-semibold">
            ₹
            {servicelisting.offer
              ? servicelisting.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : servicelisting.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {(servicelisting.service_type === "Home-Painting" || servicelisting.service_type === "BK-Cleaning" || servicelisting.service_type === "Home-Cleaning" || servicelisting.service_type ==="Disinfection" || servicelisting.service_type ==="Pest-Cleaning") && " /BHK"}
            {(servicelisting.service_type === "AC-HService" || servicelisting.service_type ==="M-HService" || servicelisting.service_type === "WM-HService" || servicelisting.service_type === "WP-HService" || servicelisting.service_type ==="R-HService" || servicelisting.service_type ==="SC-Cleaning") && " /Unit"}
            {servicelisting.service_type === "Cook-Service" && " /Day"}
          </p>
          <div className='flex items-center mt-[10px] space-x-3'>
            <div className= 'flex items-center space-x-1'>
            <p className="font-bold text-xs">
                { (servicelisting.bhk > 0) && `${servicelisting.bhk} BHK`}
              </p>
            </div>
            <div className= 'flex items-center space-x-1'>
              <p className="font-bold text-xs">
                { servicelisting.cook_days > 1 ? `${servicelisting.cook_days} days/week` : ` day/week`}
              </p>
            </div>
            <div className= 'flex items-center space-x-1'>
            <p className="font-bold text-xs">{servicelisting.duration>1?`${servicelisting.duration} Hours`:"1 Hour"}</p>
            </div>
          </div>
        </div>
        </Link>
        {onDeleteService && (
        <FaTrashAlt
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
          onClick={() => onDeleteService(servicelisting.id)}
        />
      )}
      {onEditService && (
        <AiFillEdit
          className="absolute bottom-2 right-7 h-4 cursor-pointer "
          onClick={() => onEditService(servicelisting.id)}
        />
      )}
    </li>
  )
}
