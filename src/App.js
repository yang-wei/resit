import React, { Component } from 'react';
import Container from './Container';
import Knight from './Knight';

export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <h1>Resit</h1>  
        <Container />
      </div>
    );
  }
}
