import React from 'react'
// import aos
import Aos from 'aos';
// import aos css
import 'aos/dist/aos.css';
// import components
import HeroS from '../components/Service/HeroS';
import ProductS from '../components/Service/ProductS';

export default function ServicesHome() {
    // initialize aos
    Aos.init({
    duration: 1800,
    offset: 100,
    });
    return (
        <div className='overflow-hidden'>
        <HeroS />
        <ProductS/>
      </div>
  )
}
