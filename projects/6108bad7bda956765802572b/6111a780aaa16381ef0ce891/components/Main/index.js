import React from 'react';
import { useState } from 'react';
import {  } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Resume } from '../Resume';
import './App.css';

/*==========================================================================================*/

    export const Main = (props) => {
    
        
        // sample initialFormValues
        const initialFormValues1 = {
            first_name: "",
            last_name: "",
            email_address: "",
        }
        
    const [formValues1, setFormValues1] = useState(initialFormValues1);
    const [formError1, setFormError1] = useState(false);
 

        // A typical _handleChange controlled form field handler
        const _handleChange = (event) => {
            setFormValues1((prevState) => {
              // console.log(prevState)
              return {
                ...prevState,
                [event.target.id]: event.target.value,
              };
            });
          };

          // A typical onBlur form field change validation handler
          const _handleVerifyForm = (event) => {
              if (formValues1.password !== formValues1.confirm_password) {
                  setFormError1(true);
              } else {
                  setFormError1(false);
              }     
          }

          // example handle user registration request via API post
          
          const _handleRegistration = async (event) => {

              event.preventDefault();          
              const API_URI='http://localhost:4000/register';
          
              try {
                  const response = await fetch(API_URI, {
                      "method": 'POST',
                      "body": JSON.stringify(formValues1),
                      "headers": {
                          "Content-Type": 'application/json'
                      }
                  });
          
                  const data = await response.json();                  
                  if ( (response.status===200) || (response.status===201) ) {
                      setFormValues1(initialFormValues1);
                  }
                  else {
                    console.error('Registration Failed');
                  }                  
              } catch(error) {
                console.error(error);
              }
          
            } 
                    
    
      return (
     
        <div className="main-container">
    
            <>
            <Form onSubmit={_handleRegistration}>
            
            <Form.Group className="mb-3" controlId="name">
            <Form.Label>*Name</Form.Label>
            <Form.Control type="text" onChange={_handleChange} value={formValues1.name} placeholder="" required/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="fullname">
            <Form.Label>*Fullname</Form.Label>
            <Form.Control type="text" onChange={_handleChange} value={formValues1.fullname} placeholder="" required/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="email">
            <Form.Label>*Email</Form.Label>
            <Form.Control type="text" onChange={_handleChange} value={formValues1.email} placeholder="" required/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="textfield1">
            <Form.Label>*Textfield1</Form.Label>
            <Form.Control type="text" onChange={_handleChange} value={formValues1.textfield1} placeholder="" required/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="textfield2">
            <Form.Label>*Textfield2</Form.Label>
            <Form.Control type="text" onChange={_handleChange} value={formValues1.textfield2} placeholder="" required/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="textfield3">
            <Form.Label>*Textfield3</Form.Label>
            <Form.Control type="text" onChange={_handleChange} value={formValues1.textfield3} placeholder="" required/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="textareafield1">
            <Form.Label>Textareafield1</Form.Label>
              <Form.Control
                as="textarea"
                name="textareafield1"
                value={formValues1.ttextareafield1}
                onChange={_handleChange}
                placeholder=""
                style={{ height: '200px' }}
                required
              />
            </Form.Group>
                        
            <Form.Group className="mb-3" controlId="password">
            <Form.Label>*Select Password</Form.Label>
            <Form.Control type="password" onChange={_handleChange} value={formValues1.password} placeholder="Password Required" required />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="confirm_password">
            <Form.Label>*Confirm Password</Form.Label>
            <Form.Control type="password" onChange={_handleChange} onBlur={_handleVerifyForm} value={formValues1.confirm_password} placeholder="Confirm Password Required" required />
            </Form.Group>
            {formError && <Alert variant='danger'>Passwords must match!</Alert>}
            

         <div key='inline-checkbox' className="mb-3">
         <Form.Check inline label="Checkbox1" name="checkboxgroup-checkbox1" type='checkbox' id='inline-checkbox-checkbox1' />
         <Form.Check inline label="Checkbox2" name="checkboxgroup-checkbox2" type='checkbox' id='inline-checkbox-checkbox2' />
         <Form.Check inline label="Checkbox3" name="checkboxgroup-checkbox3" type='checkbox' id='inline-checkbox-checkbox3' />
         <Form.Check inline label="Checkbox4" name="checkboxgroup-checkbox4" type='checkbox' id='inline-checkbox-checkbox4' />
         </div>

         <div key='inline-radio' className="mb-3">
         <Form.Check inline label="Radio1" name="radiogroup-radio1" type='radio' id='inline-radio-radio1' />
         <Form.Check inline label="Radio2" name="radiogroup-radio2" type='radio' id='inline-radio-radio2' />
         <Form.Check inline label="Radio3" name="radiogroup-radio3" type='radio' id='inline-radio-radio3' />
         <Form.Check inline label="Radio4" name="radiogroup-radio4" type='radio' id='inline-radio-radio4' />
         <Form.Check inline label="Radio5" name="radiogroup-radio5" type='radio' id='inline-radio-radio5' />
         </div>

         <Form.Group as={Col} controlId="formGridState1">

                    <Form.Label>Select1</Form.Label>
                    <Form.Select defaultValue="Choose...">
                        <option>Choose...</option>
                        <option value="IL">Illinois</option>
                        <option value="MI">Michigan</option>
                        <option value="NY">New York</option>
                    </Form.Select>
                    

                    <Form.Label>Select2</Form.Label>
                    <Form.Select defaultValue="Choose...">
                        <option>Choose...</option>
                        <option value="IL">Illinois</option>
                        <option value="MI">Michigan</option>
                        <option value="NY">New York</option>
                    </Form.Select>
                    
         </Form.Group>

            <Button variant="primary" type="submit" disabled={formError}>
            Submit Form
            </Button>
    
            </Form>
    
            </>
    
            
        </div>
      );
      
    }
    
    export default Main;
    
    