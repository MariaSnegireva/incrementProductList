import React from 'react';
import { QuantityControl } from "./QuantityControl";

export const ProductCart = React.memo(({product, quantity, increment, decrement, remove}) => {
  return (
    <li>
      <h2 className="productList">{product.name}</h2>
      <p className="item">price: ${product.price}</p>
      <div className="container">
        <QuantityControl
          productId = {product.id}
          quantity = {quantity}
          increment = {increment}
          decrement = {decrement}
          remove = {remove}
        />
      </div>
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
