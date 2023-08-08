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
import PostHotel from './components/Agent/posthotel';
import Restaurent from './components/Agent/postrestaurent';
import Spot from './components/Agent/postspot';
import AgentNav from './components/Agent/agentnav';
import AdminNav from './components/Admin/adminnav';
import ImageGalleryPost from './components/Admin/gallerypost';
import Viewagent from './components/Admin/viewagent';
import BookingProtected from './components/Protected Routing/bookingProtected';
import GalleryProtected from './components/Protected Routing/galleryProtected';
import ManageProtected from './components/Protected Routing/manageProtected';
import SearchpageProtected from './components/Protected Routing/searchpageProtected';
import SidenavProtected from './components/Protected Routing/sidenavProtected';
import PostspotProtected from './components/Protected Routing/postspotProtected';
import PostpackageProtected from './components/Protected Routing/postpackageProtected';
import ImagepostProtected from './components/Protected Routing/imagepostProtected';
import ViewpageProtected from './components/Protected Routing/viewpageProtected';
import ViewagentProtected from './components/Protected Routing/viewagentProtected';
import AdminnavProtected from './components/Protected Routing/adminnavProtected';
import AgentnavProtected from './components/Protected Routing/agentnavProtected';
import PosthotelProtected from './components/Protected Routing/posthotelProtected';
import PostrestProtected from './components/Protected Routing/postrestProtected';

function App() {
  var token;
  return (
    <div>


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />



          <Route path='/booking' element=
            {
              <BookingProtected token={token}>
                <Booking />
              </BookingProtected>
            } />

          <Route path='/gallery' element=
            {
              <GalleryProtected token={token}>
                <Gallery />
              </GalleryProtected>
            } />

          <Route path='/manage' element=
            {
              <ManageProtected token={token}>
                <Manage />
              </ManageProtected>
            } />

          <Route path='/searchpage' element=
            {
              <SearchpageProtected token={token}>
                <Searchpage />
              </SearchpageProtected>
            } />

          <Route path='/sidenav' element=
            {
              <SidenavProtected token={token}>
                <MiniDrawer />
              </SidenavProtected>
            } />
          <Route path='/postspot' element=
            {
              <PostspotProtected token={token}>
                <Spot />
              </PostspotProtected>
            } />
          <Route path='/package' element=
            {
              <PostpackageProtected token={token}>
                <Package />
              </PostpackageProtected>
            } />

          <Route path='/gallerypost' element=
            {
              <ImagepostProtected token={token}>
                <ImageGalleryPost />
              </ImagepostProtected>
            } />

          <Route path='/viewpage' element=
            {
              <ViewpageProtected token={token}>
                <Viewpage />
              </ViewpageProtected>
            } />
          <Route path='/viewagent' element=
            {
              <ViewagentProtected token={token}>
                <Viewagent />
              </ViewagentProtected>
            } />
          <Route path='/viewusers' element=
            {
              <ViewpageProtected token={token}>
                <Viewpage />
              </ViewpageProtected>
            } />
          <Route path='/adminnav' element=
            {
              <AdminnavProtected token={token}>
                <AdminNav />
              </AdminnavProtected>
            } />

          <Route path='/agentnav' element=
            {
              <AgentnavProtected token={token}>
                <AgentNav />
              </AgentnavProtected>
            } />

          <Route path='/posthotel' element=
            {
              <PosthotelProtected token={token}>
                <PostHotel />
              </PosthotelProtected>
            } />

          <Route path='/postrestaurent' element=
            {
              <PostrestProtected token={token}>
                <Restaurent />
              </PostrestProtected>
            } />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
