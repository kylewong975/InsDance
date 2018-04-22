import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Particles from 'react-particles-js';

export default class App extends Component {
  render() {
    return (
      <Particles
        params={{
          particles: {
            number: {
              value: 80,
            },
            line_linked: {
            	shadow: {
            		enable: true,
            		color: "#70c1d0",
            		blur: 10
            	},
              color: "#70c1d0",
              opacity: 0.4,
              width: 2,
            },
          }
        }}
        style={{
          width: '100%',
          height: "100%",
          backgroundColor: "#1c222b"
        }}
      />
    );
  }
}
