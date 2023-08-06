import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import SignUp from './components/signup';
import Login from './components/login';
import Homepage from './components/homepage';
import Gallery from './components/User/gallery';
import Manage from './components/Admin/manage';
import Package from './components/Agent/postpackage';
import Searchpage from './components/User/searchpage';
import Viewpage from './components/User/viewpage';
import Booking from './components/User/booking';
import MiniDrawer from './components/User/sidenav';
import Viewpackage from './components/Agent/viewpackage';
import PostHotel from './components/Agent/posthotel';
import Viewhotel from './components/Agent/viewhotel';
import Restaurent from './components/Agent/postrestaurent';
import Viewrestaurent from './components/Agent/viewrestaurent';
import Spot from './components/Agent/postspot';
import Viewspot from './components/Agent/viewspot';
import AgentNav from './components/Agent/agentnav';
import AdminNav from './components/Admin/adminnav';
import ImageGalleryPost from './components/Admin/gallerypost';
import Viewusers from './components/Admin/viewusers';
import Viewagent from './components/Admin/viewagent';
import EmailSender from './components/User/dummy';
import OTP from './components/User/otp';
import VerifyOTP from './components/User/dummy';

function App() {
  return (
    <div>
      {/* <BrowserRouter>
     <ImageGalleryPost/>
       
      </BrowserRouter> */}

      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>}/>
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/gallerypost" element={<ImageGalleryPost/>}/>
      <Route path='/manage' element={<Manage/>}/>
        <Route path='/homepage' element={<Homepage/>}/>
         <Route path="/signup" element={<SignUp />} />
         <Route path="/login" element={<Login/>}/>
         <Route path="/searchpage" element={<Searchpage/>}/>
         <Route path="/viewpage" element={<Viewpage/>}/>
         <Route path="/booking" element={<Booking/>}/>
         <Route path="/package" element={<Package/>}/>
         <Route path="/viewpackage" element={<Viewpackage/>}/>
         <Route path="/sidenav" element={<MiniDrawer/>}/>
         <Route path="/posthotel" element={<PostHotel/>}/>
         <Route path="/viewhotel" element={<Viewhotel/>}/>
         <Route path="/postrestaurent" element={<Restaurent/>}/>
         <Route path="/viewrestaurent" element={<Viewrestaurent/>}/>
         <Route path="/postspot" element={<Spot/>}/>
         <Route path="/viewspot" element={<Viewspot/>}/>
         <Route path="/agentnav" element={<AgentNav/>}/>
         <Route path="/adminnav" element={<AdminNav/>}/>
         <Route path="/viewusers" element={<Viewusers/>}/>
         <Route path="/viewagent" element={<Viewagent/>}/>
         <Route path="/email" element={<EmailSender/>}/>
         <Route path="/otp" element={<VerifyOTP/>}/>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
