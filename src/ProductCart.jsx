import React from 'react';
import { QuantityControl } from "./QuantityControl";

export const ProductCart = React.memo(({product, quantity, increment, decrement, remove}) => {
  return (
    <li>
      <h2>{product.name}</h2>
      <p>price: ${product.price}</p>
      <QuantityControl
        productId = {product.id}
        quantity = {quantity}
        increment = {increment}
        decrement = {decrement}
        remove = {remove}
      />
      {/* <button 
        type="button" 
        className="button"
        onClick ={() => remove(product.id)}
      >
        x
      </button> */}
    </li>
  );
});
