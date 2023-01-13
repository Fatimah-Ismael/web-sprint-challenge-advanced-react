import React from 'react'
import axios from 'axios';

const URL =  'http://localhost:9000/api/result'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}
export default class AppClass extends React.Component {
    URL = 'http://localhost:9000/api/result'
    initialGrid = [
      [1,1], [2,1], [3,1],
      [1,2], [2,2], [3,2],
      [1,3], [2,3], [3,3],
    ]
    initialState = {steps: 0, grid: this.initialGrid, index: 4, message: null, email: ''}
    constructor(props) {
      super(props)
      this.state= this.initialState
    }
  coordinates = grid => {
    return grid[this.state.index]
  }
  getMessage = (grid) => {
    return `(${this.coordinates(grid)[0]}, ${this.coordinates(grid)[1]})`
  }
  reset = () =>{
    //const coordinates = (x,y)
   // console.log('reset clicked');
    this.setState(
      this.initialState
    ) 
    // Use this helper to reset all states to their initial values.
  }
  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if(direction === 'left' && this.state.index !==0 && this.state.index !==3 && this.state.index !==6) {
      this.setState({
        ...this.state,
        index: this.state.index - 1,
        steps: this.state.steps + 1
      });
    } else if (direction === 'right' && this.state.index !==2 && this.state.index !==5 && this.state.index !==8) {
      this.setState({
        ...this.state,
        index: this.state.index + 1,
        steps: this.state.steps +1,
      })
    } else if (direction === 'down' && this.state.index !==6 && this.state.index !==7 && this.state.index !==8) {
      this.setState({
        ...this.state,
        index: this.state.index + 3,
        steps: this.state.steps + 1,
      })
    } else if(direction === 'up' && this.state.index !==0 && this.state.index !== 1 && this.state.index !== 2) {
      this.setState({
        ...this.state,
        index: this.state.index - 3,
        steps: this.state.steps +1,
      })
    } 
    else {
      this.setState({
        ...this.state,
        message:`You can't go ${direction}`
      });
    }
    }
  onChange = (evt)=> {
    const { value } = evt.target
    //console.log(event.target.value)
    // You will need this to update the value of the input.
    this.setState({
      ...this.state, email: value
    })
  }
  
  
  onSubmit = (evt) => {
    evt.preventDefault();
    const payload = {
      'x': this.coordinates(this.state.grid)[0],
      'y': this.coordinates(this.state.grid)[1],
      'steps':this.state.steps,
      'email': this.state.email
    }
    axios.post(this.URL, payload)
      .then(response => 
        this.setState({
          ...this.state, message: response.data.message
      }))
      .catch(error => 
        this.setState({
          ...this.state, message: error.response.data.message
      }))
      this.setState({ ...this.state, email: ''})
    
    // Use a POST request to send a payload to the server.
  }
  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>          
        <div className="info">
          <h3 id="coordinates">Coordinates {this.getMessage(this.state.grid)}</h3>
          <h3 id="steps">You moved {this.state.steps} time{this.state.steps ===1? null:'s'}</h3>
        </div>
        <div id="grid">
        {
          [0,1,2,3,4,5,6,7,8].map(idx => (
            <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
              {idx ===this.state.index ? 'B' : null}
            </div>
          ))
        }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick= {()=>this.getNextIndex('left')} id="left">LEFT</button>
          <button onClick= {()=>this.getNextIndex('up')} id="up">UP</button>
          <button onClick= {()=>this.getNextIndex('right')}id="right">RIGHT</button>
          <button onClick= {()=>this.getNextIndex('down')} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input value={this.state.email} onChange={this.onChange}id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}

