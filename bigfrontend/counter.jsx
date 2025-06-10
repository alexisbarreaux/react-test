
import React from 'react';
import { useState } from 'react';

export function App() {
  const [count, setCount] = useState(0)

  function handleClick(isIncrement= true){
    if (isIncrement){
      setCount(count + 1)
      return
    }
    setCount(count - 1)
    return
  }
  return (
    <div>
      <button data-testid="decrement-button" onClick={() => handleClick(false)}>-</button>
      <button data-testid="increment-button" onClick={() => handleClick()}>+</button>
      <p>clicked: {count}</p>
    </div>
  )
}




