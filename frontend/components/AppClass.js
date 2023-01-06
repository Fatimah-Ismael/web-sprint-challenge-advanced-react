import React from 'react'
import SubmitEmail from './SubmitEmail';

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
  state={
    message: '',
    email: '',
    index: 4,
    steps: 0,
   // board:['','','','','','','','',''],
    coordinates: ['(1,1)','(2,1)','(3,1)','(1,2)','(2,2)','(3,2)','(1,3)','(2,3)','(3,3)'],
  }
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getCoordinates(index) {
      if (index === 0){
        return '(1,1)'
      }else if(index=== 1){
        return '(2,1)'
      }else if(index ===2) {
        return '(3,1)'
      }else if(index === 3) {
        return '(1,2)'
      }else if(index === 4) {
        return '(2,2)'
      }else if(index=== 5) {
        return '(3,2)'
      }else if(index=== 6) {
        return '(1,3)'
      }else if(index=== 7) {
        return '(2,3)'
      }else if(index===8) {
        return '(3,3)'
      }
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }
  getMessage = (event) => {
    this.setState({
      ...this.state,
      message: 'You cannot go up'
    })
    //console.log(event.target.value);

   // this.setState({ message: 'You cannot go up'});
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  
  }
  
  reset = () =>{
    console.log('reset clicked');
    this.setState({
      message: '',
      email: '',
      index: 4,
      steps: 0,
    })
    // Use this helper to reset all states to their initial values.
  }
  
  getNextIndex = (idx) => {
    const newBoard = [...this.state.index];
    newBoard[idx] = this.state.index;
    
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }
  
  up = (e) => {
    console.log('up clicked')
    //e.preventDefault();
   // let getCoordinates = this.state.index;
      //coordinate = ['(1,1)','(2,1)','(3,1)','(1,2)','(2,2)','(3,2)','(1,3)','(2,3)','(3,3)']
    this.setState({
       ...this.state,
       index: this.state.index>2 ? this.state.index -3 : this.state.index,
       message: this.state.index<3? 'You can\'t go up': '',
       steps: this.state.steps + 1, 
       coordinates: this.getCoordinates(this.state.coordinates)
       
    })
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }
  
  down = () => {
    console.log('down clicked');
    this.setState({
      ...this.state,  
      index: this.state.index<6 ? this.state.index + 3 : this.state.index,
      message: this.state.index>5? 'You can\'t go down': '',
      steps: this.state.steps + 1,
    });
    
  }
  right = () => {
    console.log('right click');
   this.setState({
    ...this.state,
    index: this.state.index===2||this.state.index===5 || this.state.index===8 ? this.state.index : this.state.index + 1,
    message: this.state.index===2||this.state.index===5 || this.state.index===8? 'You can\'t go right' : '',
    steps: this.state.steps + 1,
   })
  }
  left = () => {
    console.log('left click');
    this.setState({ 
      ...this.state, 
      index:this.state.index===0|| this.state.index===3|| this.state.index===6 ? this.state.index : this.state.index - 1,
      message: this.state.index ===0|| this.state.index===3|| this.state.index===6? 'You can\'t go left': '',
      steps: this.state.steps + 1,
    });
  }
 
  onChange = (event) => {
    //evt.preventDefault();
    console.log(event.target.value)
    // You will need this to update the value of the input.
  }
  handleSubmit = () => {
    this.setState({

    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    // Use a POST request to send a payload to the server.
  }
  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>          
        <div className="info">
          <h3 id="coordinates">Coordinates {this.state.index}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
        {
          [0,1,2,3,4,5,6,7,8].map(idx => (
            <div onClick={() => this.getNextIndex(idx)} key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
              {idx ===this.state.index ? 'B' : null}
            </div>
          ))
        }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick= {this.left}id="left">LEFT</button>
          <button onClick={this.up} id="up">UP</button>
          <button onClick={this.right}id="right">RIGHT</button>
          <button onClick={this.down} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form>
          <input onChange={this.onChange}id="email" type="email" placeholder="type email"></input>
          <input onClick={this.onSubmit}id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}

