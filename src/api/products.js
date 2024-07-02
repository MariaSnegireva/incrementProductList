export const getProducts = () => {
  return fetch(`https://mate.academy/students-api/todos`)
    .then(response => response.json())
};
