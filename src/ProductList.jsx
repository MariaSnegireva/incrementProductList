import { useEffect, useState } from 'react';
// import { getProducts } from './api/products';

const QuantityControl = ({quantity, onIncrement, onDecrement}) => {
  return (
    <div>
      <button 
        type="button"
        disabled = {quantity === 1}
        onClick = {onDecrement}
      >
        -
      </button>
      <span>{quantity}</span>
      <button type="button" onClick = {onIncrement}>+</button>
    </div>
  );
};

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
 
    fetch(`https://github.com/MariaSnegireva/incrementProductList/blob/main/public/api/products.json`) //  or use getProducts
    .then(response => response.json())
    .then(productsFromServer => {
      setProducts(productsFromServer)
    })
    .catch(error => {
      setIsError(true);
    }) 
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

    const IncrementQuantity = (productId) => {
      setCart(prevCart => ({
        ...prevCart,
        [productId]: (prevCart[productId] || 0) + 1
      }));
  };

  const DecrementQuantity = (productId) => {
    setCart(prevCart => {
      const newCart = {...prevCart};
      if (newCart[productId] > 0) {
        newCart[productId] -= 1;
      }
      return newCart;
    });
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
     const quantity = cart[product.id] || 0;
     return total + (product.price * quantity);
    },0);
  };

  return (
    <div >
      {/* {isLoading && (
        <h1>Loading...</h1>
      )}

      {isError && (
        <h1>Error loading products</h1>
      )} */}

      <h1>Product List</h1>
      {/* {products.length
        ? (
        <> */}
          <ul>
            {products.map(product => (
              <li key={product.id}>
                {product.name} - ${product.price}
                <QuantityControl
                  quantity={cart[product.id] || 0}
                  onDecrement={()=> DecrementQuantity(product.id)}
                  onIncrement={()=> IncrementQuantity(product.id)}
                />
              </li>
            ))}
          </ul>
        {/* </>
        ) : (
             <h1>Your cart is empty</h1>
      )}    */}
       <h2>Total: ${calculateTotal()}</h2>
    </div>
  );
};

export default ProductList;


