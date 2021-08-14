import React from 'react';
import { useEffect, useContext } from 'react';
//If you are using context exported from another parent component
//import { SampleContext } from '../../App';
//import { SampleDispatchContext } from '../../App';
import {  } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

/*==========================================================================================*/
export const SampleContext1 = React.createContext(); 


    export const Children = (props) => {
    
    //If you are using context exported from another parent component
//const session = useContext(SampleContext);
//const dispatch = useContext(SampleDispatchContext);


          /*==========================================================================================*/
          // Preferred method formatting of placing async function calls inside the useEffect as an 
          // anonymous function
          useEffect( () => {    
              async function _handleGenericAsync1() {
                try {
        
                } catch(error) {
                  console.error(error);
                }
              }
            _handleGenericAsync1();
          }
          ,[]);
          /*==========================================================================================*/
        
      return (
     
        <div className="children-container">
        <SampleContext1.Provider value={sampleState1} > 
    </SampleContext1.Provider>

        </div>
      );
      
    }
    
    export default Children;
    
    