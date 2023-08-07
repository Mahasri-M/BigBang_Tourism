import React,{useState} from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input, 
  InputGroup,
  Container,
  Row, 
  Col
} from "reactstrap";

import { Facebook,
    Twitter,
    Instagram,
  } from "@mui/icons-material";
  
function Feedback() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  
const nameid = localStorage.getItem('nameid');
  const handleSubmit = (e) => {
    e.preventDefault();
    const feedbackData = {
      Name: name,
      Email: email,
      Description: description,
      Rating: parseInt(rating),
      userId:nameid
    };


    axios.post("https://localhost:7046/api/Feedback", feedbackData)
      .then((response) => {

        console.log("Feedback submitted successfully.");
      })
      .catch((error) => {

        console.error("Error submitting feedback:", error);
      });
  };

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
  };

  const generateStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const filled = i <= rating;
      stars.push(
        <span
          key={i}
          role="img"
          aria-label={`star-${i}`}
          style={{ cursor: "pointer", fontSize: "24px" }}
          onClick={() => handleStarClick(i)}
        >
          {filled ? "⭐️" : "☆"}
        </span>
      );
    }
    return stars;
  };

  return (
    <>
    <div className="section">
        <Container className="text-center">
          <Row className="justify-content-md-center">
            <Col lg="8" md="12">
              <h2 className="title">Completed with your Feedback</h2>
              <h5 className="description">
               Feedback is an essential tool for growth and improvement. 
               It provides valuable insights, fosters learning, and boosts motivation. 
               Constructive and timely feedback enhances performance, strengthens relationships, and drives success. 
               Being specific, respectful, and open-minded in giving and receiving feedback ensures its effectiveness.
                </h5>
            </Col>
          </Row>
        </Container>
      </div>
      <div
        className="section section-signup"
        style={{
          backgroundImage: "url(" + require("../../assets/asset/img/bg11.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          minHeight: "700px"
        }}
      >
        <Container>
          <Row>
            <Card className="card-signup" data-background-color="blue">
              <Form action="" className="form" method="">
                <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3">
                    Feedback
                  </CardTitle>
                  <div className="social-line d-flex justify-content-center">
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="facebook"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                     <Facebook style={{marginRight:1,marginTop:7}}></Facebook>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="twitter"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="lg"
                    >
                    <Twitter style={{marginRight:1,marginTop:15,width:60,height:30}}></Twitter> 
                    </Button>
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="google"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                    <Instagram style={{marginRight:1,marginTop:7}}></Instagram> 
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <InputGroup style={{borderRadius:20, backgroundColor: "#039AF4"}}
                    className={
                      "no-border" + (firstFocus ? " input-group-focus" : "")
                    }
                  >
                 
                    <Input
                    
                      placeholder="Name..."
                      type="text"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    ></Input>
                  </InputGroup>
                  <InputGroup style={{borderRadius:20, backgroundColor: "#039AF4"}}
                    className={
                      "no-border" + (lastFocus ? " input-group-focus" : "")
                    }
                  >
                    <Input
                      placeholder="Email..."
                      type="text"
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    ></Input>
                  </InputGroup>
                  <InputGroup style={{borderRadius:20, backgroundColor: "#039AF4"}}
                    className={
                      "no-border" + (emailFocus ? " input-group-focus" : "")
                    }
                  >
                    <Input
                      placeholder="Message..."
                      type="text"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    ></Input>
                  </InputGroup>
                  
                  <InputGroup style={{borderRadius:20, backgroundColor: "#039AF4"}}
                    className={
                      "no-border" + (emailFocus ? " input-group-focus" : "")
                    }
                  >
                    

      <div style={{ display: "flex", justifyContent: "center" }}>
        &nbsp;&nbsp;{generateStars(rating)}
      </div>
   
                  </InputGroup>
                </CardBody>
                <CardFooter className="text-center">
                  <Button
                    className="btn-neutral btn-round"
                    color="info"
                    href="#pablo"
                    onClick={handleSubmit}
                    size="lg"
                  >
                  Hit me !
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Row>
          
        </Container>
      </div>
    </>
  );
}

export default Feedback;
