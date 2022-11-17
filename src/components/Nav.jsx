import React from 'react';
// import data
import { useLocation ,useNavigate} from 'react-router';
import { nav } from '../data';
const Nav = () => {
  const navigate=useNavigate();
  return (
    <nav>
      <ul className='flex gap-x-10'>
        {nav.map((item, index) => {
          // destructure item
          const { href, name } = item;
          return (
            <li key={index}>
              <a className='hover:text-accent' transition  href={href}>
                {name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
