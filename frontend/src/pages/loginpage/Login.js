import React from "react";
// import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DefaultScreen from "../../component/defaultscreen/DefaultScreen";
import "./style.css";
import Loader from "../../component/Loader";
import ErrorMessage from "../../component/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userAction";

function Login() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // const [error, setError] = useState(false)
  // const [isloading, setIsLoading] = useState(false)
  // const API_URL = '/api/users'

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(login(email, password));

    // try {
    //     setIsLoading(true)
    //     const config = {
    //         headers: {
    //             "Content-type": "application/json"
    //         }
    //     }

    //     const response = await axios.post(API_URL + "/login", {
    //         email, password
    //     }, config)

    //     if (response?.data) {
    //         setIsLoading(false)
    //         localStorage.setItem("userInfo", JSON.stringify(response?.data))
    //     }

    // } catch (error) {
    //     setIsLoading(false)

    //     setError(error.response?.data?.message)

    // }
  };
  useEffect(() => {
    if (userInfo) {
      Navigate("/mynotes");
    }
  }, [userInfo]);

  return (
    <DefaultScreen title="Login">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ?{" "}
            <span className="register  " onClick={() => Navigate("/register")}>
              Register Here
            </span>
          </Col>
        </Row>
      </div>
    </DefaultScreen>
  );
}

export default Login;
