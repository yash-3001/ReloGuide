import React, { useState } from 'react';
// import data
import { product } from '../data';
// import images
import ArrowImg from '../assests/img/product/cards/arrow.svg';

const Cards = () => {
  // index state
  const [index, setIndex] = useState(1);
  // destructure product data
  const { cards } = product;
  return (
    <>
      {/* cards */}
      <div className='flex flex-col gap-y-[30px] lg:flex-row lg:gap-x-[30px]'>
        {cards.map((card, cardIndex) => {
          // destructure card
          const { icon, title, subtitle, delay } = card;
          return (
            <div
              key={cardIndex}
              data-aos='zoom-out'
              data-aos-offset='300'
              data-aos-delay='delay'
            >
              <div
                onClick={() => setIndex(cardIndex)}
                className={`${
                  index === cardIndex && 'bg-white shadow-2xl'
                }  w-[350px] h-[350px] flex  flex-col justify-center items-center mx-auto p-[65px] text-center rounded-[12px] cursor-pointer transition-all`}
              >
                {/* card icon */}
                <div className='mb-6'>
                  <img src={icon} alt='' />
                </div>
                {/* card title */}
                <div className='mb-3 text-[30px] text-blue-500 font-medium'>{title}</div>
                {/* card subtitle */}
                <p className='mb-6 text-[#115E83]'>{subtitle}</p>
                {/* arrow img */}
                {index === cardIndex && <img src={ArrowImg} />}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cards;
