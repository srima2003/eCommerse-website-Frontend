import React, { useState, useEffect } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import { GoogleLogin } from '@react-oauth/google';

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Row, Col, Button, Form } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { login, googleLogin } from "../actions/userActions";

function LoginScreen({ location, history }) {
  /* STATE */
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [capVal, setCapVal]=useState(null)

  const dispatch = useDispatch();

  /* SETTING UP REDIRECT */
  const redirect = location.search ? location.search.split("=")[1] : "/";

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo, loading, error } = userLogin;

  /* REDIRECTING AN ALREADY LOGGED IN USER, AS WE DON'T WANT THEM TO SEE THE LOGIN PAGE */
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  /* HANDLERS */

  const submitHandler = (e) => {
    e.preventDefault();

    /* FIRING OFF THE ACTION CREATORS USING DISPATCH FOR LOGIN */
    dispatch(login(email, password));
  };

  const responseGoogle = (response) => {
    console.log("Google Response:", response); // Log the whole response to inspect
    const accessToken = response.credential; // Get the correct token
    console.log("Access Token:", accessToken);
    dispatch(googleLogin(accessToken));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </Form.Group>

        <ReCAPTCHA
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        onChange={(val)=>{setCapVal(val)}}
        />


        <Button disabled={!capVal} type="submit" variant="primary" className="mt-3">
          Sign up
        </Button>

        <p className="mt-3"><Link to="/forgot-password" className="text-danger">Forgot Password?</Link></p>
        
        <GoogleLogin
          clientId="845512665517-sqrndab2vlttb0o4lba1nivu6civ38h4.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
          onFailure={(error) => console.log("Google Sign In was unsuccessful. Try again later", error)}
        />
      </Form>

      <Row className="py-3">
        <Col>
          New Customer ?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;