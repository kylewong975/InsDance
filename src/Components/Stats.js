import React, { Component } from 'react';

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      maxScore: 0,
      dance: "Undetermined Dance"
    }
  }

  render() {
    return(
      <div style={styles.container}>
        <p style={styles.desc}><i>{this.state.dance}</i></p>
        <br/><br/>
        <p style={styles.score}>Score: {this.state.score}</p>
        <p style={styles.highScore}>High Score: {this.state.maxScore}</p>
      </div>
    )
  }
}

let styles = {
  container: {
    padding: 20,
  },
  desc: {
    color: "#ffffff",
    fontSize: 36,
    margin: 0,
  },
  highScore: {
    color: "#ffffff",
    fontSize: 28,
    margin: 0,
  },
  score: {
    color: "#ffffff",
    fontSize: 48,
    margin: 0,
  }
}
