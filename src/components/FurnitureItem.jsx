import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import {MdLocationPin} from 'react-icons/md'
import {AiFillEdit} from 'react-icons/ai'
import {FaTrashAlt} from 'react-icons/fa'
export default function FurnitureItem({furniture,id,onEdit,onDelete}) {
  return (
    <li className=' relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]'>
        <Link className='contents' to={`/FurnitureDetail/${furniture.type}/${id}`}>
        <img className='h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in' loading="lazy" src={furniture.imgUrls[0]}/>
        <Moment fromNow className=" absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold roundd-md px-2 py-1 shadow-lg ">
          {furniture.timestamp?.toDate()}
        </Moment>
        <div className='w-full p-[10px]'>
          {/* <div className='flex items-center space-x-1'>
            <MdLocationPin className='h-4 w-4 text-green-600'/>
            <p className='font-semibold text-sm mb-[2px] text-gray-600 truncate'> {furniture.locality}</p>
            <p className='font-semibold text-sm mb-[2px] text-gray-600 truncate'>, {furniture.city}</p>
            <p className='font-semibold text-sm mb-[2px] text-gray-600 truncate'>, {furniture.state}</p>
          </div> */}
          <p className='font-semibold text-xl m-0 truncate'>{furniture.name}</p>
          <p className='text-slate-500 text-xl m-0 truncate'>{furniture.category}</p>
          <p className='font-semibold text-xl m-0 truncate'>{furniture.price .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
          {furniture.type === "rent" && " Rs/month"}
          {furniture.type === "sale" && " Rs"}
          </p>

          {/* <p className="text-[#457b9d] mt-2 font-semibold">
            $
            {furniture.offer
              ? furniture.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : furniture.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {furniture.type === "rent" && " / month"}
          </p> */}
          {/* <div className='flex items-center mt-[10px] space-x-3'>
            <div className= 'flex items-center space-x-1'>
            <p className="font-bold text-xs">
                {furniture.bedrooms > 1 ? `${furniture.bedrooms} Beds` : "1 Bed"}
              </p>
            </div>
            <div className= 'flex items-center space-x-1'>
            <p className="font-bold text-xs">{furniture.bathrooms>1?`${furniture.bathrooms} Beds`:"1 Bath"}</p>
            </div>

        </div>*/}
        </div> 
        </Link>
        {onDelete && (
        <FaTrashAlt
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
          onClick={() => onDelete(furniture.id)}
        />
      )}
      {onEdit && (
        <AiFillEdit
          className="absolute bottom-2 right-7 h-4 cursor-pointer "
          onClick={() => onEdit(furniture.id)}
        />
      )}
    </li>
  )
}
