import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Row } from "reactstrap";

function Examples() {
  return (
    <>
      <div className="section section-examples" data-background-color="black">
        <div className="space-50"></div>
        <Container className="text-center">
          <Row>
            <div className="col">
            
                <img
                  alt="..."
                  className="img-raised"
                  src={require("../../assets/asset/img/manali.jpg")}
                ></img>
           
              <Button className="btn-round bg-transparent border border-white">
               <NavLink to="/login">Explore Manali</NavLink> 
              </Button>
            </div>
            <div className="col">
              
                <img
                  alt="..."
                  className="img-raised"
                  src={require("../../assets/asset/img/kerala.jpg")}
                ></img>
           
           <Button className="btn-round bg-transparent border border-white">
               <NavLink to="/login"> Explore Kerala</NavLink>
              </Button>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Examples;
