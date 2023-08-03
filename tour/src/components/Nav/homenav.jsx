import React from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LoginIcon from '@mui/icons-material/Login';
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate" style={{ display: "flex", alignItems: "center" }}>
            <NavbarBrand id="navbar-brand" className="bg-transparent">
            <img
              alt="..."
              className="n-logo"
              src={require("../../assets/asset/img/logo.jpg")}
              style={{width:40}}
            ></img>  &nbsp; Kanini Tourism
            </NavbarBrand>
         
          
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar style={{ alignItems: "center" }}>
            <Button
              className="nav-link btn-neutral bg-light"
              color="info"
              id="upgrade-to-pro"
              href="/login"
            >
             <LoginIcon style={{color:"#039AF4"}}></LoginIcon> &nbsp;
              <p style={{color:"#039AF4",fontSize:13,letterSpacing:0.3}}>Login / SignUp</p>
            </Button>
              <NavItem>
                <NavLink
                  href="https://twitter.com/"
                  id="twitter-tooltip"
                >
                  <TwitterIcon/>
                </NavLink>
                <UncontrolledTooltip target="#twitter-tooltip">
                  Follow us on Twitter
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://www.facebook.com/"
                  id="facebook-tooltip"
                >
                  <FacebookIcon/>
                </NavLink>
                <UncontrolledTooltip target="#facebook-tooltip">
                  Like us on Facebook
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://www.instagram.com/"
                  id="instagram-tooltip"
                >
                  <InstagramIcon/>
                </NavLink>
                <UncontrolledTooltip target="#instagram-tooltip">
                  Follow us on Instagram
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
