import React from 'react'

function ProductS() {
  return (
    <section className='BaseTemplateContainer min-h-[336px] py-12 my-0'>
      <div className='BasePreviewComponent__Container '>  
        <div className='Header__Container min-h-[48px] mx-[128px]'>
          <h1 className='text-white text-5xl text-center'>Services</h1>
        </div> 
          <div className="Grid__Container min-h-[336px] mx-[148px] my-[64px] p-[24] relative">
            <div className='Grid__row min-w-[768px] min-h-[112px] absolute top-2/4 left-2/4 -mt-[56px] -ml-[384px] bg-white rounded-lg grid
            grid-cols-5'> 
              <div className='Grid__item mx-[20px] my-[16px] hover:bg-gray-200 rounded-md cursor-pointer'  >
                <div className="Image__Container"></div>
                <span>Home Painting</span>
              </div>
              <div className='Grid__item mx-[20px] my-[16px] hover:bg-gray-200 rounded-md cursor-pointer'>
                <div className="Image__Container"></div>
                <span>Cleaning & Pest</span>
              </div>
              <div className='Grid__item mx-[20px] my-[16px] hover:bg-gray-200 rounded-md cursor-pointer'>
                <div className="Image__Container"></div>
                <span>Disinfection</span>
              </div>
              <div className='Grid__item mx-[20px] my-[16px] hover:bg-gray-200 rounded-md cursor-pointer'>
                <div className="Image__Container"></div>
                <span>Home Repairs</span>
              </div>
              <div className='Grid__item mx-[20px] my-[16px] hover:bg-gray-200 rounded-md cursor-pointer'>
                <div className="Image__Container"></div>
                <span>Cooking Services</span>
              </div>
              
            </div>
          </div>
        </div>
    </section>
  )
}

export default ProductS