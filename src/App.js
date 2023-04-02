import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./pages/ListingsHome";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Offers from "./pages/Offers";
import ForgotPassword from "./pages/ForgotPassword";
import Header from "./components/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import Servicelisting from "./pages/Servicelisting";
import Category from "./pages/Category";
import ServicesHome from "./pages/ServicesHome";
import CreateListingServices from "./pages/CreateListingServices";
import EditServicelisting from "./pages/EditServicelisting";
import FurnitureHome from "./pages/FurnitureHome";
import SaleFurniture from "./pages/SaleFurniture";
import BuyFurniture from "./pages/BuyFurniture";
import RentFurniture from "./pages/RentFurniture";
import FurnitureProfile from './pages/FurnitureProfile'
import FurnitureListed from "./pages/FurnitureListed"
function App() {
  return (
    <>
    <Router>
      <Header/> 
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/listingsHome" element={<Home/>}/>
        <Route path="/profile" element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route path="/sign-in" element={<Signin/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/category/:categoryName/:listingId" element={<Listing/>}/>
        <Route path="/servicecategory/:servicecategoryName/:servicelistingId" element={<Servicelisting />}/>
        
        <Route path="/offers" element={<Offers/>}/> 
        <Route path="/category/:categoryName" element={<Category/>}/> 
        <Route path="create-listing" element={<PrivateRoute/>}>
        <Route path="/create-listing" element={<CreateListing/>}/>
        </Route>
        <Route path="edit-listing" element={<PrivateRoute/>}>
        <Route path="/edit-listing/:listingId" element={<EditListing/>}/>
        </Route>
        <Route path="/services" element={<ServicesHome/>}></Route>
        <Route path="create-listing-services" element={<PrivateRoute/>}>
          <Route path="/create-listing-services" element={<CreateListingServices/>}/>
        </Route>
        <Route path="edit-listing-services" element={<PrivateRoute/>}>
          <Route path="/edit-listing-services/:servicelistingId" element={<EditServicelisting/>}/>
        </Route>
        <Route path="/furniture" element={<FurnitureHome/>}/>
        <Route path="SaleFurniture" element={<PrivateRoute/>}>
        <Route path="/SaleFurniture" element={<SaleFurniture/>}/>
        </Route>
        <Route path="/BuyFurniture" element={<BuyFurniture/>}/>
        <Route path="/RentFurniture" element={<RentFurniture/>}/>
        <Route path="/FurnitureProfile" element={<PrivateRoute/>}>
        <Route path="/FurnitureProfile" element={<FurnitureProfile/>}/>
        </Route>
        <Route path="/FurnitureDetail/:furnitureName/:furnitureId" element={<FurnitureListed/>}/>
        
      </Routes>
    </Router>
    
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </>
  );
}


export default App;
