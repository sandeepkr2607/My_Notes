import React from "react";
import { Container, Row } from "react-bootstrap";
import "../landingpage/style.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Home() {
  const Navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // useEffect(() => {

  //     setUserInfo(localStorage.getItem('userInfo'))
  //     if (userInfo) {
  //         Navigate('/mynotes')
  //     }
  // }, [userInfo])
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to My Note</h1>
              <p className="subtitle">One Safe place for all your note's</p>
              {userInfo && userInfo ? (
                <div className="buttonContainer">
                  <Button
                    size="lg"
                    className="landingbutton"
                    onClick={() => Navigate("/createnote")}
                  >
                    Create Note
                  </Button>
                </div>
              ) : (
                <div className="buttonContainer">
                  <Button
                    size="lg"
                    className="landingbutton"
                    onClick={() => Navigate("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    size="lg"
                    className="landingbutton"
                    variant="outline-primary"
                    onClick={() => Navigate("/register")}
                  >
                    register
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
