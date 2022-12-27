import React from 'react';
// import data
import { hero } from '../data';
// import icons
import { FaStream } from 'react-icons/fa';

const Hero = () => {
  // destructure hero data
  const { title1, title2,title3,title4,subtitle} = hero;
  return (
    <section className='min-h-[600px]  py-12 bg-hero1 bg-cover bg-no-repeat bg-left'>
      <div className='container mx-auto min-h-[600px] flex justify-left items-center '>
        <div className='items-left justify-left text-left lg:text-left'>
          {/* text */}
          <div className='content relative text-6xl lg:text-6xl space-x-12'>
            
            <h10
              className='title mb-2 lg:mb-5'
              data-aos='fade-down'
            >
              {title1}
              
            </h10> 
            
            <h10
              className='title mb-2 lg:mb-5'
              data-aos='fade-down'
            >
              {title2}
              
            </h10> 
            
            <h10
              className='title mb-2 lg:mb-5'
              data-aos='fade-down'
            >
              {title3}
            </h10> 
            <div className='flex  space-x-0 mt-2'>
            <FaStream className='h-[24px] justify-startabsolute left-2 mt-1 text-pink-300 ' data-aos='fade-right'/>
            <p
              className='lead mb-5 lg:mb-10  text-3xl text-pink-300 '
              data-aos='fade-down'
              // data-aos-delay='600'
              
            >
              
              {subtitle} 
              
            </p>
            </div>
            
            {/* btn & comp text */}
            {/* <div
              className='flex items-center max-w-sm lg:max-w-full mx-auto lg:mx-0 gap-x-2 lg:gap-x-6'
              data-aos='fade-down'
              // data-aos-delay='700'
            >
              <button className='btn btn-md lg:btn-lg btn-accent flex justify-center items-center lg:gap-x-4'>
                {btnText}
                <HiOutlineChevronDown />
              </button>
              <span className='text-light lg:lead lg:mb-0'>{compText}</span>
            </div> */}
          </div>
        </div>
        {/* image */}
      </div>
      {/* <img className='object-cover h-50 w-full opacity-40' src={image} alt='' /> */}
    </section>
  );
};

export default Hero;
