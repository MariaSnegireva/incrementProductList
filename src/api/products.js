export const getProducts = () => {
  return fetch('https://mate-academy.github.io/react_phone-catalog/_new/products.json')
    .then(response => response.json())
};
