//FOR ITEMS LISTED UNDER PROFILES SECTION
import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import {MdLocationPin} from 'react-icons/md'
import {AiFillEdit} from 'react-icons/ai'
import {FaTrashAlt} from 'react-icons/fa'
export default function ListingItem({listing,id,onEdit,onDelete}) {
  return (
    <li className=' relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]'>
        <Link className='contents' to={`/category/${listing.type}/${id}`}>
        <img className='h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in' loading="lazy" src={listing.imgUrls[0]}/>
        <Moment fromNow className=" absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold roundd-md px-2 py-1 shadow-lg ">
          {listing.timestamp?.toDate()}
        </Moment>
        <div className='w-full p-[10px'>
          <div className='flex items-center space-x-1'>
            <MdLocationPin className='h-4 w-4 text-green-600'/>
            <p className='font-semibold text-sm mb-[2px] text-gray-600 truncate'> {listing.locality}</p>
            <p className='font-semibold text-sm mb-[2px] text-gray-600 truncate'>, {listing.city}</p>
            <p className='font-semibold text-sm mb-[2px] text-gray-600 truncate'>, {listing.state}</p>
          </div>
          <p className='font-semibold text-xl m-0 truncate'>{listing.name}</p>
          <p className="text-[#457b9d] mt-2 font-semibold">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className='flex items-center mt-[10px] space-x-3'>
            <div className= 'flex items-center space-x-1'>
            <p className="font-bold text-xs">
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
              </p>
            </div>
            <div className= 'flex items-center space-x-1'>
            <p className="font-bold text-xs">{listing.bathrooms>1?`${listing.bathrooms} Beds`:"1 Bath"}</p>
            </div>

          </div>
        </div>
        </Link>
        {onDelete && (
        <FaTrashAlt
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
          onClick={() => onDelete(listing.id)}
        />
      )}
      {onEdit && (
        <AiFillEdit
          className="absolute bottom-2 right-7 h-4 cursor-pointer "
          onClick={() => onEdit(listing.id)}
        />
      )}
    </li>
  )
}
