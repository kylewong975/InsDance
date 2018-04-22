import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Particles from 'react-particles-js';
import Webcam from 'react-webcam'
import { Container, Row, Col } from 'reactstrap'
import { Grid } from 'react-bootstrap';
import Stats from './Components/Stats';
import WebcamRecorder from './Components/WebcamRecorder';

export default class App extends Component {
  render() {
    return (
      <div>
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
            backgroundColor: "#1c222b",
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: -1,
            marginTop: -20,
          }}
        />
        <Container fluid style={styles.canvas}>
          <Row>
            <Col xs="8">
              <WebcamRecorder />
            </Col>
            <Col xs="4">
              <Stats />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

let styles = {
  canvas: {
    marginTop: 20,
    marginLeft: 25,
  },
  desc: {
    color: "#ffffff",
    fontSize: 24,
  }
}
// <Webcam style={{ marginTop: 50, marginBottom: -50 }} audio={false} height="90%" width="100%" />
