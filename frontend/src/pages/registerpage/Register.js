import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DefaultScreen from "../../component/defaultscreen/DefaultScreen";
import ErrorMessage from "../../component/ErrorMessage";
import Loader from "../../component/Loader";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";

function Register() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      Navigate("/mynotes");
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      return setMessage("Password do not match");
    } else {
      setMessage(null);
    }

    dispatch(register(name, email, password, pic));
  };

  const postDetail = (pics) => {
    // console.log(pics.type);
    if (!pics) {
      return setPicMessage("Please Select an Image");
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "mynote");
      data.append("cloud_name", "dyxdnmoy5");
      fetch("https://api.cloudinary.com/v1_1/dyxdnmoy5/image/upload", {
        method: "post",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.url);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }

    setPicMessage(null);
  };

  // if (isLoading) {
  //   return <Loader />
  // }

  return (
    <>
      <DefaultScreen title="REGISTER">
        <div className="loginContainer">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                style={{ marginBottom: "15px" }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                style={{ marginBottom: "15px" }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{ marginBottom: "15px" }}
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                style={{ marginBottom: "15px" }}
              />
            </Form.Group>

            {/* {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )} */}
            <Form.Group controlId="pic">
              <Form.Label>Profile Picture</Form.Label>

              <Form.Control
                type="file"
                onChange={(e) => postDetail(e.target.files[0])}
                label="Upload Profile Picture"
                style={{ marginBottom: "15px" }}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              Have an Account ?{" "}
              <span onClick={() => Navigate("/login")}>Login here</span>
            </Col>
          </Row>
        </div>
      </DefaultScreen>
    </>
  );
}

export default Register;
