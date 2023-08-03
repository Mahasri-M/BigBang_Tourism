import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import SignUp from './components/signup';
import Login from './components/login';
import Homepage from './components/homepage';
import ImageUpload from './components/imagegallery';
import Image from './components/imagegal';
import Manage from './components/Admin/manage';
import Package from './components/Agent/package';
import Searchpage from './components/User/searchpage';
import Viewpage from './components/User/viewpage';
import Booking from './components/User/booking';
import MiniDrawer from './components/User/sidenav';
import ImageGalleryPost from './components/Admin/gallerypost';
import Viewpackage from './components/Agent/viewpackage';
import PostHotel from './components/Agent/posthotel';
import Viewhotel from './components/Agent/viewhotel';
function App() {
  return (
    <div>
      {/* <BrowserRouter>
     <ImageGalleryPost/>
       
      </BrowserRouter> */}

      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>}/>
        <Route path="/imagegallerypost" element={<ImageGalleryPost/>}/>
      <Route path='/img' element={<ImageUpload/>}/>
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
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
