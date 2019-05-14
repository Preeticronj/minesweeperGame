import React from "react"
import "./Layout/Layout.css";

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 0,
      start: 0,
    }
  }
  startTimer = () => {
    this.timer = setInterval(() => this.setState({
      time: this.state.time + 1
    }), 1000)
  }
  resetTimer = () => {
    clearInterval(this.timer)
    this.setState({
      time: 0
    })

  }
  render() {
    return (
      <div className="box1">
        <button type="button">No of flags</button>
        <button onClick={this.startTimer} >{this.state.time}</button>
        <button onClick={this.resetTimer} >Reset</button>
      </div>
    )
  }
}
export default Timer;