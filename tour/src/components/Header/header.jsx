import React from "react";
import { Container } from "reactstrap";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

function Header() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("../../assets/asset/img/header.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="content-center brand">
            <marquee direction="right">
          <FlightTakeoffIcon
              style={{
                fontSize: "3rem",
                color: "#fff", 
              }}
            /></marquee>
            <h1 className="h1-seo">Make Your Trip</h1>
            <h3>A beautiful destination to explore the world. </h3>
          </div>
          <h6 className="category category-absolute">
            Designed and Coded by{" "}
              <img
                alt="..."
                className="invision-logo"
                src={require("../../assets/asset/img/maha.png")}
              ></img>
            {" "}. 
          </h6>
        </Container>
      </div>
    </>
  );
}

export default Header;
