import { useCallback, useEffect, useState } from 'react';
import './ProductList.css';
import { ProductCart } from './ProductCart';
// import { getProducts } from './api/products';


export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
 
    // fetch('https://mate-academy.github.io/react_phone-catalog/_new/products.json') 
    fetch('https://MariaSnegireva.github.io/incrementProductList/api/products.json') //  or use getProducts
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

  // using async await
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch('BASE_URL');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setProducts(data);
  //     } catch (error) {
  //       setIsError(true);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

    const incrementQuantity = useCallback((productId) => {
      setCart(prevCart => ({
        ...prevCart,
        [productId]: (prevCart[productId] || 0) + 1
      }));
  }, []);

  const decrementQuantity = useCallback((productId) => {
    setCart(prevCart => {
      const newCart = {...prevCart};
      if (newCart[productId] > 0) {
        newCart[productId] -= 1;
      }
      return newCart;
    });
  }, []);

  const removeProduct = useCallback((productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    setCart(prevCart => {
      const newCart = {...prevCart};
      delete newCart[productId];
      return newCart;
    });
  }, []);

  const calculateTotal = useCallback(() => {
    return products.reduce((total, product) => {
     const quantity = cart[product.id] || 0;
     return total + (product.price * quantity);
    },0);
  }, [products, cart]);

  return (
    <div className='productList'>
      {isLoading && (
        <h1>Loading...</h1>
      )}

      {isError && (
        <h1>Error loading products</h1>
      )}

      <h1>Product List</h1>
      {products.length
        ? (
        <ul>
          {products.map(product => (
            <ProductCart
              key = {product.id}
              product = {product}
              quantity = {cart[product.id] || 0 }
              increment={incrementQuantity}
              decrement={decrementQuantity}
              remove={removeProduct}
            />
          ))}
        </ul>
        ) : (
             <h1>Your cart is empty</h1>
      )}   
       <h2>Total: ${calculateTotal()}</h2>
    </div>
  );
};

export default ProductList;


