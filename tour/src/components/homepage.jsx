import React from "react";  
import "../assets/asset/css/bootstrap.min.css";
import "../assets/asset/scss/now-ui-kit.scss?v=1.5.0";
import "../assets/asset/demo/demo.css?v=1.5.0";
import "../assets/asset/demo/nucleo-icons-page-styles.css?v=1.5.0";

import IndexNavbar from "./Nav/homenav";
import Header from "./Header/header";
import Footer from "./Footer/footer";

import Images from "./Homepage/images";
import Tabs from "./Homepage/tabs";
import Carousel from "./Homepage/carousel";
import NucleoIcons from "./Homepage/nucleoicons";
import Feedback from "./Homepage/feedback";
import Examples from "./Homepage/examples";
import Download from "./Homepage/download";

function Index() {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <Header />
        <div className="main">
          <Images />
          <Tabs />
          <Carousel />
          <NucleoIcons />
          <Feedback />
          <Examples />
          <Download />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Index;
