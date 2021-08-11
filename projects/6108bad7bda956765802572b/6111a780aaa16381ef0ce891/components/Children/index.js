import React from 'react';
import { useEffect, useContext } from 'react';
//If you are using context exported from another parent component
//import { SampleContext } from '../../App';
//import { SampleDispatchContext } from '../../App';
import {  } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

/*==========================================================================================*/

    export const Children = (props) => {
    
    //If you are using context exported from another parent component
//const session = useContext(SampleContext);
//const dispatch = useContext(SampleDispatchContext);


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
    
        </div>
      );
      
    }
    
    export default Children;
    
    