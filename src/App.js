import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Particles from 'react-particles-js';
import Webcam from 'react-webcam'
import { Container, Grid, Row, Col } from 'react-bootstrap';

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
            <Col xs="9">
              <p style={styles.desc}>Hello</p>
            </Col>
            <Col xs="3">
              <p style={styles.desc}>World</p>
            </Col>
          </Row>
        </Container>
        <Grid>
          <Row>
              <Col xsOffset={3} xs={6}>
                  <Webcam style={{ }} audio={false} height={360} width={480} />
              </Col>
          </Row>
        </Grid>
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
