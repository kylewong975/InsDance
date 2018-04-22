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
  constructor(props) {
    super(props);
    this.state = {
      videoType: ["Moonwalk", "Cha Cha", "Dougie", "Salsa", "Tango", "Flamenco", "Hustle", "Tap Dance", "Charleston", "Samba"],
      videoLink: ["https://www.youtube.com/watch?v=tjaT1bZ78Qs",
        "https://www.youtube.com/watch?v=kmakB53NFow",
        "https://www.youtube.com/watch?v=OvQ2jpVi07E",
        "https://www.youtube.com/watch?v=G0g6pq8wK5k",
        "https://www.youtube.com/watch?v=veiDkbYhZnY",
        "https://www.youtube.com/watch?v=0VLMyr7MFTA",
        "https://www.youtube.com/watch?v=EqwFL_0Y_Zk",
        "https://www.youtube.com/watch?v=5xxTkB5bGy4",
        "https://www.youtube.com/watch?v=fQSY-2VtBvg",
        "https://www.youtube.com/watch?v=UCzOuCis9SU"
      ],
      chosenVideoType: "",
      chosenVideoLink: "",
      loadedVideo: false,
    }

    setInterval(() => {
      if(this.state.loadedVideo == true) {
        let ind = Math.floor(Math.random() * this.state.videoLink.length);
        //console.log(ind);
        this.setState({
          loadedVideo: false,
          chosenVideoType: this.state.videoType[ind],
          chosenVideoLink: this.state.videoLink[ind],
        })
      }
      //console.log(this.state.chosenVideoLink);
      //console.log(this.state.chosenVideoType);
    }, 5000);

    this.getData = this.getData.bind(this);
  }

  getData(data) {
    this.setState({
      loadedVideo: data
    })
    console.log(data);
  }

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
              <WebcamRecorder storeData={this.getData}/>
              <p style={styles.desc}>Related Youtube video: {this.state.chosenVideoLink}</p>
            </Col>
            <Col xs="4">
              <Stats danceType={this.state.chosenVideoType}/>
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
