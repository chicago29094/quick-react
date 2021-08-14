import React from 'react';
import { useEffect, useState, useContext } from 'react';
//If you are using context exported from another parent component
//import { SampleContext } from '../../App';
//import { SampleDispatchContext } from '../../App';
import {  } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

/*==========================================================================================*/
export const SampleContext = React.createContext(); 
export const SampleDispatchContext = React.createContext();


    export const Children = (props) => {
    
    //If you are using context exported from another parent component
//const session = useContext(SampleContext);
//const dispatch = useContext(SampleDispatchContext);

 const [formValues, setFormValues] = useState(initialFormValues);
 const [formError, setFormError] = useState(false);
 

        /*==========================================================================================*/
    
      useEffect( () => {    
          async function _handleGenericAsync() {
            try {
    
            } catch(error) {
              console.error(error);
            }
          }
        _handleGenericAsync();
      }
      ,[]);
    
      /*==========================================================================================*/
    
      return (
     
        <div className="App">
        <SampleContext.Provider value={sampleState} > 
    <SampleDispatchContext.Provider value={dispatch} > 


    </SampleDispatchContext.Provider>
    </SampleContext.Provider>

        </div>
      );
      
    }
    
    export default Children;
    
    