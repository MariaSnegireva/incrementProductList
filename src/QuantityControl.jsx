import React from 'react';

export const QuantityControl = React.memo(({productId, quantity, increment, decrement, remove}) => {
  return (
    <div className='container'>
      <button 
        type="button"
        className="button"
        // disabled = {quantity === 1}
        onClick = {() => decrement(productId)}
      >
        -
      </button>

      <span className="value">{quantity}</span>

      <button 
        type="button" 
        className="button"
        onClick = {() => increment(productId)}
      >
        +
      </button>

      <button 
        type="button" 
        className="remove"
        onClick ={() => remove(productId)}
      >
        x
      </button>
    </div>
  );
});