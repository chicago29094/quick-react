import React from 'react';
    import { Container, Row, Col } from 'react-bootstrap';
import { Children } from './components/Children';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import './App.css';

/*==========================================================================================*/

export const App = (props) => {


  return (
 
    <div className="App">
Here::::::::::
4
======Starting=====
<Children />
<Header />
<Main />
<Footer />
::::::::::Here

    </div>
  );

}

export default App;

