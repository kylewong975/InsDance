import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Particles from 'react-particles-js';
import Webcam from 'react-webcam'
import { Container, Row, Col } from 'reactstrap'
import { Grid } from 'react-bootstrap';
import Stats from './Components/Stats';
import ReactWebCamCapture from 'react-webcam-capture';

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

        <ReactWebCamCapture
          constraints={{ audio: true, video: true }}
          timeSlice={10}
          onGranted={this.handleGranted}
          onDenied={this.handleDenied}
          onStart={this.handleStart}
          onStop={this.handleStop}
          onPause={this.handlePause}
          onResume={this.handleResume}
          onError={this.handleError}
          render={({ start, stop, pause, resume }) =>
          <div>
            <p>Granted:</p>
            <p>Rejected Reason: </p>
            <p>Recording: </p>
            <p>Paused: </p>

            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>

            <p>Streaming test</p>
            <video autoPlay></video>
          </div>
      } />
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
