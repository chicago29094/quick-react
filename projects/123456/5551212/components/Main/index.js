import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Resume } from '../Resume';
import './App.css';

/*==========================================================================================*/

    export const Main = (props) => {
    
    
        // A typical _handleChange controlled form field handler
        const _handleChange = (event) => {
            setFormValues((prevState) => {
              // console.log(prevState)
              return {
                ...prevState,
                [event.target.id]: event.target.value,
              };
            });
          };

          // A typical onBlur form field change validation handler
          const _handleVerifyForm = (event) => {
              if (formValues.password !== formValues.confirm_password) {
                  setFormError(true);
              } else {
                  setFormError(false);
              }     
          }

          // example handle user registration request via API post
          
          const _handleRegistration = async (event) => {

              event.preventDefault();          
              const API_URI='http://localhost:4000/register';
          
              try {
                  const response = await fetch(API_URI, {
                      "method": 'POST',
                      "body": JSON.stringify(formValues),
                      "headers": {
                          "Content-Type": 'application/json'
                      }
                  });
          
                  const data = await response.json();                  
                  if ( (response.status===200) || (response.status===201) ) {
                      setFormValues(initialFormValues);
                  }
                  else {
                    console.error('Registration Failed');
                  }                  
              } catch(error) {
                console.error(error);
              }
          
            } 
                    
    
      return (
     
        <div className="App">
    <Resume />

        <>
        <Form onSubmit={_handleRegistration}>

        <Form.Group className="mb-3" controlId="email">
        <Form.Label>*Email address</Form.Label>
        <Form.Control type="email" onChange={_handleChange} value={formValues.email} placeholder="name@example.com" required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="first_name">
        <Form.Label>*First Name</Form.Label>
        <Form.Control type="text" onChange={_handleChange} value={formValues.first_name} placeholder="First Name Required" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="last_name">
        <Form.Label>*Last Name</Form.Label>
        <Form.Control type="last_name" onChange={_handleChange} value={formValues.last_name} placeholder="Last Name Required" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
        <Form.Label>*Select Password</Form.Label>
        <Form.Control type="password" onChange={_handleChange} value={formValues.password} placeholder="Password Required" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirm_password">
        <Form.Label>*Confirm Password</Form.Label>
        <Form.Control type="password" onChange={_handleChange} onBlur={_handleVerifyForm} value={formValues.confirm_password} placeholder="Confirm Password Required" required />
        </Form.Group>
        {formError && <Alert variant='danger'>Passwords must match!</Alert>}

        <Button variant="primary" type="submit" disabled={formError}>
        Submit Registration Form
        </Button>

        </Form>

        </>

        
        </div>
      );
      
    }
    
    export default Main;
    
    