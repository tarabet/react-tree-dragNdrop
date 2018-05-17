import React, { Component } from 'react';
import {
  Grid,
} from "react-bootstrap";

import { AppWrapper } from "./modules/AppWrapper";

import './App.css';

class App extends Component {
  render() {
    return (
      <Grid>
          <AppWrapper />
      </Grid>
    );
  }
}

export default App;
