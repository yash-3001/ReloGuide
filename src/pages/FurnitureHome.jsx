import React from 'react'

export default function FurnitureHome() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Welcome to our Furniture Store</h1>
      <p className='text-lg mb-8'>We offer both sell and rent options for our furniture. Browse our collection and find the perfect pieces for your home.</p>

      <div className='grid grid-cols-3 gap-8'>
        <div className='bg-white p-4 rounded-lg shadow-lg'>
          <h2 className='text-xl font-bold mb-2'>Sell</h2>
          <p className='mb-4'>Sell your furniture to us and earn extra cash. We buy furniture in good condition and offer fair prices.</p>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Learn More</button>
        </div>

        <div className='bg-white p-4 rounded-lg shadow-lg'>
          <h2 className='text-xl font-bold mb-2'>Rent</h2>
          <p className='mb-4'>Rent furniture for a fraction of the cost of buying. Our rental options include a variety of styles and colors.</p>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Learn More</button>
        </div>

        <div className='bg-white p-4 rounded-lg shadow-lg'>
          <h2 className='text-xl font-bold mb-2'>Shop</h2>
          <p className='mb-4'>Shop our collection of high-quality furniture for your home. We offer a variety of styles and colors to fit your taste.</p>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Shop Now</button>
        </div>
      </div>
    </div>
  )
}