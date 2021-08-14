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
     
        <div className="main-container">
    
            <>
            <Form onSubmit={_handleRegistration}>
            
            <Form.Group className="mb-3" controlId="textfield1">
            <Form.Label>*TextField1</Form.Label>
            <Form.Control type="text" onChange={_handleChange} value={formValues.textfield1} placeholder="" required/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="textfield2">
            <Form.Label>*TextField2</Form.Label>
            <Form.Control type="text" onChange={_handleChange} value={formValues.textfield2} placeholder="" required/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="textfield3">
            <Form.Label>*TextField3</Form.Label>
            <Form.Control type="text" onChange={_handleChange} value={formValues.textfield3} placeholder="" required/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="textarea1">
            <Form.Label>Textarea1</Form.Label>
              <Form.Control
                as="textarea"
                name="textarea1"
                value={formValues.textarea1}
                onChange={_handleChange}
                placeholder=""
                style={{ height: '200px' }}
                required
              />
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

                     <div key='inline-checkbox' className="mb-3">
         <Form.Check inline label="1" name="checkboxgroup1" type='checkbox' id='inline-checkbox-1' />
         <Form.Check inline label="2" name="checkboxgroup2" type='checkbox' id='inline-checkbox-2' />
         <Form.Check inline label="3" name="checkboxgroup3" type='checkbox' id='inline-checkbox-3' />
         <Form.Check inline label="4" name="checkboxgroup4" type='checkbox' id='inline-checkbox-4' />
         </div>
         <div key='inline-radio' className="mb-3">
         <Form.Check inline label="1" name="radiogroup1" type='radio' id='inline-radio-1' />
         <Form.Check inline label="2" name="radiogroup2" type='radio' id='inline-radio-2' />
         <Form.Check inline label="3" name="radiogroup3" type='radio' id='inline-radio-3' />
         <Form.Check inline label="4" name="radiogroup4" type='radio' id='inline-radio-4' />
         <Form.Check inline label="5" name="radiogroup5" type='radio' id='inline-radio-5' />
         </div>
         <Form.Group as={Col} controlId="formGridState1">

                <Form.Label>State1</Form.Label>
                <Form.Select defaultValue="Choose...">
                    <option>Choose...</option>
                    <option value="IL">Illinois</option>
                    <option value="MI">Michigan</option>
                    <option value="NY">New York</option>
                </Form.Select>
                
                <Form.Label>State2</Form.Label>
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
    
    