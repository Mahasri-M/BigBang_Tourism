import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import {
  Send,
  ThumbUp,
  AirplanemodeActive,
  FormatBold,
  Headphones,
  SentimentSatisfied,
  ShoppingCart,
  Note,
  Favorite,
  Palette,
  Room,
  VpnKey,
} from "@mui/icons-material";

function NucleoIcons() {
  return (
    <>
      <style>
        {`
        .icon-container {
          display: flex;
          justify-content: center;
          position: relative;
          top: 60px;
          height: 300px;
          width: 100%;
          right:60px;
        }

        .icon {
          position: absolute;
          bottom: 50%;
          width: 60px;
          height: 60px;
        }

        .icon-1 {
          left: 20%;
          top:20%;
        }

        .icon-2 {
          left: 30%;
        }

        .icon-3 {
          left: 40%;
          top:20%;
        }

        .icon-4 {
          left: 50%;
          
        }

        .icon-5 {
          left: 60%;
          top:20%;
        }
        .icon-6 {
            left: 70%;
          }
          
          .icon-7{
            left:80%;
            top:20%;
          }
          .icon-8{
            left:90%;
          
          }
          .icon-9{
            left:100%;
            top:20%;
          }
          .icon-10{
            left:110%;
            
          }
          .icon-11{
            left:120%;
            top:20%;
          }
          .icon-12{
            left:130%;
           
          }
      `}
      </style>
      <div className="section section-nucleo-icons">
        <Container>
          <Row>
            <Col lg="6" md="12">
              <h2 className="title">Trip Plans</h2>
              <h5 className="description">
                Our Trip Planner will help you to plan your trips! You can make
                your trips with friends and family. Plan and go corporate
                trips, family trips, and honeymoon with us! Reach us to make
                your trip peaceful!!
              </h5>
              <Button
                className="btn-round mr-1"
                color="info"
                href="/nucleo-icons"
                size="lg"
                target="_blank"
              >
                Plan your Trip
              </Button>
            </Col>
            <Col lg="6" md="12">
              <div className="icons-container">
                <div className="icon-container">
                  <div className="icon icon-1">
                    <Send />
                  </div>
                  <div className="icon icon-2">
                    <ThumbUp />
                  </div>
                  <div className="icon icon-3">
                    <AirplanemodeActive />
                  </div>
                  <div className="icon icon-4">
                    <FormatBold />
                  </div>
                  <div className="icon icon-5">
                    <Headphones />
                  </div>
              
                  <div className="icon icon-6">
                    <SentimentSatisfied />
                  </div>
                  <div className="icon icon-7">
                    <ShoppingCart />
                  </div>
                  <div className="icon icon-8">
                    <Note />
                  </div>
                  <div className="icon icon-9">
                    <Favorite />
                  </div>
                  <div className="icon icon-10">
                    <Palette />
                  </div>
               
                  <div className="icon icon-11">
                    <Room />
                  </div>
                  <div className="icon icon-12">
                    <VpnKey />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default NucleoIcons;
