import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import MediaCapturer from 'react-multimedia-capture';

export default class WebcamRecorder extends React.Component {
	constructor() {
		super();
		this.state = {
			granted: false,
			rejectedReason: '',
			recording: false,
			paused: false,
      alreadyRecorded: false,
      seconds: 5,
      blobURL: "",
		};

		this.handleGranted = this.handleGranted.bind(this);
		this.handleDenied = this.handleDenied.bind(this);
		this.handleStart = this.handleStart.bind(this);
		this.handleStop = this.handleStop.bind(this);
		this.handlePause = this.handlePause.bind(this);
		this.handleResume = this.handleResume.bind(this);
		this.setStreamToVideo = this.setStreamToVideo.bind(this);
		this.releaseStreamFromVideo = this.releaseStreamFromVideo.bind(this);
		this.downloadVideo = this.downloadVideo.bind(this);
    this.analyze = this.analyze.bind(this);
    this.countDown = this.countDown.bind(this);
    this.startTimer = this.startTimer.bind(this);

    setInterval(() => {
      if(this.state.alreadyRecorded == true && this.state.recording == false) {
        this.props.storeData(this.state.alreadyRecorded);
        this.setState({
          alreadyRecorded: false,
        });
        console.log("stored");
      }
    }, 5000);
	}
    startTimer() {
      if (this.timer == 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      this.setState({
        seconds: seconds,
      });

      // Check if we're at zero.
      if (seconds == 0) {
        clearInterval(this.timer);
      }
    }
	handleGranted() {
		this.setState({ granted: true });
		console.log('Permission Granted!');
	}
	handleDenied(err) {
		this.setState({ rejectedReason: err.name });
		console.log('Permission Denied!', err);
	}
	handleStart(stream) {
        // while (this.timer != 0)
        // this.startTimer();  // start recording while timer == 0

		this.setState({
			recording: true,
      alreadyRecorded: true,
		});

		this.setStreamToVideo(stream);
		console.log('Recording Started.');
	}
	handleStop(blob) {
		this.setState({
			recording: false
		});

		this.releaseStreamFromVideo();

		console.log('Recording Stopped.');
		this.downloadVideo(blob);
	}
	handlePause() {
		this.releaseStreamFromVideo();

		this.setState({
			paused: true
		});
	}
	handleResume(stream) {
		this.setStreamToVideo(stream);

		this.setState({
			paused: false
		});
	}
	handleError(err) {
		console.log(err);
	}
	setStreamToVideo(stream) {
		let video = this.refs.app.querySelector('video');

		if(window.URL) {
			video.src = window.URL.createObjectURL(stream);
		}
		else {
			video.src = stream;
		}
	}
	releaseStreamFromVideo() {
		this.refs.app.querySelector('video').src = '';
	}
	downloadVideo(blob) {
		let url = URL.createObjectURL(blob);
		let a = document.createElement('a');
		a.style.display = 'none';
		a.href = url;
		a.target = '_blank';
		document.body.appendChild(a);

    this.setState({
      blobURL: url.substring(27) + ".webm"
    });
    //console.log(url.substring(27) + ".webm")

		a.click();
	}
  analyze() {
    fetch("", {
      method: 'post',
      body: JSON.stringify({ link: this.state.blobURL })
    })
    console.log(this.state.blobURL)
  }
	render() {
		const granted = this.state.granted;
		const rejectedReason = this.state.rejectedReason;
		const recording = this.state.recording;
		const paused = this.state.paused;

		return (
			<div ref="app" style={styles.container}>
				<MediaCapturer
					constraints={{ audio: true, video: true }}
					timeSlice={10}
					onGranted={this.handleGranted}
					onDenied={this.handleDenied}
					onStart={this.handleStart}
					onStop={this.handleStop}
					onPause={this.handlePause}
					onResume={this.handleResume}
					onError={this.handleError}
          mimeType="video/mp4"
					render={({ start, stop, pause, resume }) =>
					<div style={{display: "flex", flexDirection: "column"}}>
						<p>Granted: {granted.toString()}</p>
						<p>Rejected Reason: {rejectedReason}</p>
						<p>Recording: {recording.toString()}</p>
						<p>Paused: {paused.toString()}</p>
            <Container>
              <Row>
    						<button onClick={start} style={styles.buttonControls}>Start Video</button>
    						<button onClick={stop} style={styles.buttonControls}>Stop Video</button>
              </Row>
              <Row>
                <button onClick={pause} style={styles.buttonControls}>Pause Video</button>
    						<button onClick={resume} style={styles.buttonControls}>Resume Video</button>
              </Row>
            </Container>
            <button onClick={this.analyze} style={styles.buttonControls}>Analyze Video</button>
						<video autoPlay style={{marginTop: 25}}></video>
					</div>
				} />
			</div>
		);
	}
}

let styles = {
  container: {
    marginTop: "-15%",
    marginBottom: "10%"
  },
  buttonControls: {
    borderRadius: 4,
    width: "50%",
    backgroundColor: "#18405c",
    border: "1px solid white",
    color: "#ffffff",
    padding: 5
  }
}

/*
<Row>
  <h2 style={{color: "#ffffff"}}> s: {this.state.seconds} </h2>
</Row>
*/
