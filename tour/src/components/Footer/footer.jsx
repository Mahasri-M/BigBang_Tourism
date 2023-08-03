import React from "react";
import { Container } from "reactstrap";

function Footer() {
    return (
        <footer className="footer" data-background-color="black">
            <Container>
                <nav>
                    <ul>
                        <li>
                            <a href="#">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="https://kanini.com/">
                                Blog
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="copyright" id="copyright">
                    © {new Date().getFullYear()},
                    Designed and Coded by{" "}
                    <img
                        alt="..."
                        className="invision-logo"
                        src={require("../../assets/asset/img/maha.png")}
                    ></img>
                    {" "}.
                    .
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
