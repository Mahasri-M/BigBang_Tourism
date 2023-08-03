import React from "react";

import {
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
} from "reactstrap";

function Tabs() {
    // const [iconPills, setIconPills] = React.useState("1");
    const [pills, setPills] = React.useState("1");
    return (
        <>
            <div className="section section-tabs">
                <Container>
                    <Row>
                        
                        <Col className="ml-auto mr-auto" md="10" xl="6">
              <p className="category">Make your Trip!!</p>
              <Card>
                <CardHeader>
                  <Nav
                    className="nav-tabs-neutral justify-content-center"
                    data-background-color="blue"
                    role="tablist"
                    tabs
                  >
                    <NavItem>
                      <NavLink
                        className={pills === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("1");
                        }}
                      >
                      Corporate Trip
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("2");
                        }}
                      >
                       Family 
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "3" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("3");
                        }}
                      >
                        Friends 
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "4" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("4");
                        }}
                      >
                        Honeymoon
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent
                    className="text-center"
                    activeTab={"pills" + pills}
                  >
                    <TabPane tabId="pills1">
                      <p>
                      Elevate your corporate trips with our travel website. Discover exceptional destinations, team-building activities, and seamless planning for a rewarding experience. Strengthen team bonds, boost productivity, and create lasting memories. Tailor-made packages and expert assistance ensure a smooth journey, allowing your company to focus on growth and success. Unlock the potential of your business travel with us today.
                      </p>
                    </TabPane>
                    <TabPane tabId="pills2">
                      <p>
                      
Create unforgettable family memories with our travel website. From thrilling adventures to relaxing getaways, we offer a wide range of family-friendly destinations and activities. Our expert team will craft the perfect itinerary to suit your family's interests and preferences. Enjoy quality time together, bond with loved ones, and explore the world hassle-free. Let us help you plan a magical family trip that everyone will cherish forever.
                      </p>
                    </TabPane>
                    <TabPane tabId="pills3">
                      <p>
                      Embark on an epic adventure with your friends through our travel website. Whether you're seeking a wild party destination or a serene retreat, we've got you covered. Discover exciting group activities, hidden gems, and vibrant nightlife to make your friends' trip truly unforgettable. Let our travel experts handle the planning, so you can focus on creating lasting memories with your best buddies. Get ready for the trip of a lifetime!
                      </p>
                    </TabPane>
                    <TabPane tabId="pills4">
                      <p>
                      Celebrate the beginning of your lifelong journey together with a dreamy and romantic honeymoon. Our travel website offers a handpicked selection of idyllic destinations, luxurious accommodations, and intimate experiences. From picturesque beach resorts to enchanting mountain hideaways, we'll help you create a honeymoon filled with love, passion, and cherished moments that will stay with you forever. Let us plan the perfect start to your new life together.
                      </p>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Tabs;
