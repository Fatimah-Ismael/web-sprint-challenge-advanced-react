import React, { useState } from 'react';
import axios from 'axios';
// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
   const initialGrid= [
    [1,1], [2,1], [3,1],
    [1,2], [2,2], [3,2],
    [1,3], [2,3], [3,3],
  ]
  const url= 'http://localhost:9000/api/result'
  const [steps, setSteps]= useState(0) 
  const [grid, setGrid]= useState(initialGrid) 
  const [index, setIndex]= useState(4) 
  const [message, setMessage]= useState('')
  const [email, setEmail]= useState('')  
    
  function coordinates(grid) {
    return grid[index]
  }
  function getMessage (grid) {
    return `(${coordinates(grid)[0]}, ${coordinates(grid)[1]})`
  }
  function reset() {
    
   
    setSteps(0)
    setGrid(initialGrid) 
    setIndex(4) 
    setMessage() 
    setEmail('')
  
    // Use this helper to reset all states to their initial values.
  }
  const getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if(direction === 'left' && index !==0 && index !==3 && index !==6) {
        setIndex(index - 1)
        setSteps(steps + 1)
      
    } else if (direction === 'right' && index !==2 && index !==5 && index !==8) {
        setIndex(index + 1)
        setSteps(steps +1)
      
    } else if (direction === 'down' && index !==6 && index !==7 && index !==8) {
        setIndex(index + 3)
        setSteps(steps + 1)
    } else if(direction === 'up' && index !==0 && index !== 1 && index !== 2) {
        setIndex(index - 3)
        setSteps(steps +1)
    } 
    else {
        setMessage(`You can't go ${direction}`)
    }
    }
 function onChange (evt) {
    const { value } = evt.target
    //console.log(event.target.value)
    // You will need this to update the value of the input.
   
      setEmail(value)
  }
  function onSubmit (e) {
    e.preventDefault();
    const payload = {
      'x': coordinates(grid)[0],
      'y': coordinates(grid)[1],
      'steps': steps,
      'email': email
    }
    axios.post(url, payload)
      .then(response => 
        setMessage(response.data.message))
      .catch(error => setMessage(error.response.data.message))
    setEmail('')
    
    // Use a POST request to send a payload to the server.
  }

  
 

  return (
    <div id="wrapper" className={props.className}>
       <div className="info">
          <h3 id="coordinates">Coordinates {getMessage(grid)}</h3>
          <h3 id="steps">You moved {steps} time{steps ===1? null:'s'}</h3>
        </div>
        <div id="grid">
        {
          [0,1,2,3,4,5,6,7,8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx ===index ? 'B' : null}
            </div>
          ))
        }
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button onClick= {()=>getNextIndex('left')} id="left">LEFT</button>
          <button onClick= {()=>getNextIndex('up')} id="up">UP</button>
          <button onClick= {()=>getNextIndex('right')}id="right">RIGHT</button>
          <button onClick= {()=>getNextIndex('down')} id="down">DOWN</button>
          <button onClick={reset} id="reset">reset</button>
        </div>
        <form onSubmit={onSubmit}>
          <input value={email} onChange={onChange}id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
    </div>
  )
}
