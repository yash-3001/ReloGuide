// import images
import LogoImg from '../src/assests/img/header/logo.svg';
// import HeroImg from '../src/assests/img/hero/image_hero.svg';
import OverviewProductImg from '../src/assests/img/overview/new.svg';
import FacebookImg from '../src/assests/img/overview/brands/facebook.svg';
import GoogleImg from '../src/assests/img/overview/brands/google.svg';
import CocaColaImg from '../src/assests/img/overview/brands/coca-cola.svg';
import LinkedInImg from '../src/assests/img/overview/brands/linkedin.svg';
import SamsungImg from '../src/assests/img/overview/brands/samsung.svg';
import Feature1Img from '../src/assests/img/features/udfeature1-img.svg';
import Feature2Img from '../src/assests/img/features/udfeature2-img.svg';
import Feature3Img from '../src/assests/img/features/udfeature3-img.svg';
import ArrowRightImg from '../src/assests/img/features/arrow-right.svg';
import CardIconImg1 from '../src/assests/img/product/cards/icon1.svg';
import CardIconImg2 from '../src/assests/img/product/cards/icon2.svg';
import CardIconImg3 from '../src/assests/img/product/cards/icon3.svg';
import PricingIcon1 from '../src/assests/img/pricing/icon1.svg';
import PricingIcon2 from '../src/assests/img/pricing/icon2.svg';
import PricingIcon3 from '../src/assests/img/pricing/icon3.svg';
import AvatarImg1 from '../src/assests/img/testimonial/avatar1.png';
import AvatarImg2 from '../src/assests/img/testimonial/avatar2.png';
import AvatarImg3 from '../src/assests/img/testimonial/avatar3.png';
import AvatarImg4 from '../src/assests/img/testimonial/avatar4.png';
import AvatarImg5 from '../src/assests/img/testimonial/avatar5.png';
import CtaImg1 from '../src/assests/img/cta/udimage1.svg';
import CtaImg2 from '../src/assests/img/cta/udimage2.svg';
import FacebookIcon from '../src/assests/img/copyright/facebook.svg';
import TwitterIcon from '../src/assests/img/copyright/twitter.svg';
import LinkedinIcon from '../src/assests/img/copyright/linkedin.svg';

export const header = {
  logo: LogoImg,
  btnText: 'Login/Signup',
};

export const nav = [
  { name: 'Home', href: '/listingsHome' },
  { name: 'Offers', href: '/offers' },
  // { name: 'About us', href: '/' },
  // { name: 'Pricing', href: '/' },
  // { name: 'Feedback', href: '/' },
];

export const hero = {
  title1: 'ReWork' ,
  title2:'ReMake',
  title3:'ReModel',
  subtitle: 'Making a move simple. Moving with Movens',
  btnText: 'Try free demo',
  compText: 'Web, iOS and Android',
  // image: HeroImg,
};

export const overview = {
  productImg: OverviewProductImg,
  brands: [
    {
      image: FacebookImg,
      delay: 300,
    },
    {
      image: GoogleImg,
      delay: 400,
    },
    {
      image: CocaColaImg,
      delay: 500,
    },
    {
      image: LinkedInImg,
      delay: 600,
    },
    {
      image: SamsungImg,
      delay: 700,
    },
  ],
};

export const features = {
  feature1: {
    pretitle: 'At your service',
    title: 'Searching for a place to call home?',
    subtitle:
      'Our aim is to give you a hassle free Re-Location experience by bringing all your needs at one place',
    btnLink: 'Learn more',
    btnIcon: ArrowRightImg,
    image: Feature1Img,
  },
  feature2: {
    pretitle: 'Need Healthy Food?',
    title: 'Cooking Help at your Doorstep',
    subtitle:
      'Professional chefs at your doorstep to get you the food you like from the chef you like',
    btnLink: 'Learn more',
    btnIcon: ArrowRightImg,
    image: Feature2Img,
  },
  feature3: {
    pretitle: 'No time to Maintain Home?',
    title: 'HouseMaid for your Aid',
    subtitle:
      'Professional House-Maid at your doorstep to Help you with daily chores!!!',
    btnLink: 'Learn more',
    btnIcon: ArrowRightImg,
    image: Feature3Img,
  },
};

export const product = {
  title: 'The Product you need.',
  subtitle:
    'Providing One for All in the most convenient and hassle-free way',
  cards: [
    {
      icon: CardIconImg1,
      title: 'Lorem',
      subtitle: 'Hey',
      delay: 200,
    },
    {
      icon: CardIconImg2,
      title: 'lorem ',
      subtitle: 'Elit esse cillum dolore eu fugiat nulla pariatur',
      delay: 400,
    },
    {
      icon: CardIconImg3,
      title: 'Lorem',
      subtitle: 'Elit esse cillum dolore eu fugiat nulla pariatur',
      delay: 600,
    },
  ],
};

export const pricing = {
  title: 'Choose your flexible plan.',
  cards: [
    {
      icon: PricingIcon1,
      title: 'Starter Plan',
      services: [
        { name: 'Store unlimited data' },
        { name: 'Export to pdf, xls, csv' },
        { name: 'Cloud server support' },
      ],
      price: '$9.99',
      userAmount: 'up to 3 user + 1.99 per user',
      btnText: 'Get this',
      delay: 300,
    },
    {
      icon: PricingIcon2,
      title: 'Silver Plan',
      services: [
        { name: 'Store unlimited data' },
        { name: 'Export to pdf, xls, csv' },
        { name: 'Cloud server support' },
      ],
      price: '$19.99',
      userAmount: 'up to 3 user + 1.99 per user',
      btnText: 'Get this',
      delay: 600,
    },
    {
      icon: PricingIcon3,
      title: 'Diamond Plan',
      services: [
        { name: 'Store unlimited data' },
        { name: 'Export to pdf, xls, csv' },
        { name: 'Cloud server support' },
      ],
      price: '$29.99',
      userAmount: 'up to 3 user + 1.99 per user',
      btnText: 'Get this',
      delay: 900,
    },
  ],
};

export const testimonials = {
  title: 'We have millions of best wishers',
  clients: [
    {
      message:
        'Eleifend fames amet, fames enim. Ullamcorper pellentesque ac volutpat nibh aliquet et, ut netus. Vel, fringilla sit eros pretium',
      image: AvatarImg1,
      name: 'Cameron Williamson',
      position: 'CEO',
      borderColor: '#FF7235',
    },
    {
      message:
        'Eleifend fames amet, fames enim. Ullamcorper pellentesque ac volutpat nibh aliquet et, ut netus. Vel, fringilla sit eros pretium',
      image: AvatarImg2,
      name: 'Shirley Hand',
      position: 'CEO',
      borderColor: '#FFBE21',
    },
    {
      message:
        'Eleifend fames amet, fames enim. Ullamcorper pellentesque ac volutpat nibh aliquet et, ut netus. Vel, fringilla sit eros pretium',
      image: AvatarImg3,
      name: 'Dr. Olivia Hansen',
      position: 'CEO',
      borderColor: '#4756DF',
    },
    {
      message:
        'Eleifend fames amet, fames enim. Ullamcorper pellentesque ac volutpat nibh aliquet et, ut netus. Vel, fringilla sit eros pretium',
      image: AvatarImg4,
      name: 'Aubrey Sanford',
      position: 'CEO',
      borderColor: '#3EC1F3',
    },
    {
      message:
        'Eleifend fames amet, fames enim. Ullamcorper pellentesque ac volutpat nibh aliquet et, ut netus. Vel, fringilla sit eros pretium',
      image: AvatarImg5,
      name: 'Terri Conroy',
      position: 'CEO',
      borderColor: '#BB7259',
    },
  ],
};

export const cta = {
  title: '20M+ downloaded from 32 different countries',
  subtitle: 'Try demo for 7 days with full features.',
  btnText: 'Try free demo',
  img1: CtaImg1,
  img2: CtaImg2,
};

export const footer = {
  logo: LogoImg,
  links: [
    { name: 'Home', href: '/' },
    { name: 'About us', href: '/' },
    { name: 'Careers', href: '/' },
    { name: 'Pricing', href: '/' },
    { name: 'Features', href: '/' },
    { name: 'Blog', href: '/' },
  ],
  legal: [
    { name: 'Terms of use', href: '/' },
    { name: 'Terms of conditions', href: '/' },
    { name: 'Privacy policy', href: '/' },
    { name: 'Cookie policy', href: '/' },
  ],
  newsletter: {
    title: 'Newsletter',
    subtitle: 'Over 25000 people have subscribed',
  },
  form: {
    placeholder: 'Enter your email',
    btnText: 'Subscribe',
    smallText: 'We don’t sell your email and spam',
  },
};

export const copyright = {
  link1: {
    name: 'Privacy & Terms',
    href: '/',
  },
  link2: {
    name: 'Contact us',
    href: '/',
  },
  copyText: 'Copyright @ 2022 xpence',
  social: [
    { icon: FacebookIcon, href: '/' },
    { icon: TwitterIcon, href: '/' },
    { icon: LinkedinIcon, href: '/' },
  ],
};
//Service Page data
export const heroservices = {
  title1: "Home",
  title2: "services,",
  title3: "on",
  title4: "demand.",
  subtitle: 'Home/"live location"',
}

// export const productservices = {
  
// }


