import React from "react";
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import { NavLink } from 'react-router-dom';
import { Facebook,
    Twitter,
    Instagram,
  } from "@mui/icons-material";
  import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Download() {
  return (
    <>
      <div
        className="section section-download"
        data-background-color="black"
        id="download-section"
      >
        <Container>
          <Row className="justify-content-md-center">
            <Col className="text-center" lg="8" md="12">
              <h3 className="title">Do you love tourism?</h3>
              <h5 className="description">
                Cause if you do, you are FREE to travel. Hit the button below
                to navigate to Kanini Tourism where you can find the
                best options to explore the world. Start your trip with us!
               
              </h5>
            </Col>
            <Col className="text-center" lg="8" md="12">
              
              <Button>
              <NavLink to="/login"> Explore !</NavLink>
               
              </Button>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <br></br>
         
          <br></br>
          <br></br>
          <Row className="justify-content-md-center sharing-area text-center">
            <Col className="text-center" lg="8" md="12">
              <h3>Thank you for supporting us!</h3>
            </Col>
            <Col className="text-center" lg="8" md="12">
              <Button
                className="btn-neutral btn-icon btn-round"
                color="twitter"
                href="https://www.twitter.com/"
                id="tooltip86114138"
                size="lg"
                
              >
               <Twitter style={{marginLeft:4,marginTop:7,width:30,height:40}}></Twitter>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip86114138">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-neutral btn-icon btn-round"
                color="facebook"
                href="https://www.facebook.com/"
                id="tooltip735272548"
                size="lg"
                
              >
               <Facebook style={{marginLeft:4,marginTop:7,width:30,height:40}}></Facebook>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip735272548">
                Like us
              </UncontrolledTooltip>
              <Button
                className="btn-neutral btn-icon btn-round"
                color="linkedin"
                href="https://www.linkedin.com/"
                id="tooltip647117716"
                size="lg"
                
              >
              <LinkedInIcon style={{marginLeft:4,marginTop:7,width:30,height:40}}></LinkedInIcon>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip647117716">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-neutral btn-icon btn-round"
                color="github"
                href="https://github.com/"
                id="tooltip331904895"
                size="lg"
             
              >
              <Instagram style={{marginLeft:4,marginTop:7,width:30,height:40}}></Instagram>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip331904895">
                On Instagram
              </UncontrolledTooltip>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Download;
