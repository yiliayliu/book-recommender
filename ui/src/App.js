import React, {Component} from "react";
import './App.css';
import { Container } from "semantic-ui-react";
import { BookEntry } from "./components/BookEntry";
import { GrabBook } from "./components/GrabBook";
import Home from "./Home";

// Want to build this App?
//    $ npm start
// Inside the directory with the src/ directory
function App() {
  return (
    // <div className="App">
    //   <Container style={{marginTop: 400}}>
    //     <BookEntry/>
    //     <GrabBook/>
    //   </Container>
    // </div>
    <div className="app">
          <Home />
    </div>
  );
}
export default App;
