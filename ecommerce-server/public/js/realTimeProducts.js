const socket = io(); // Establecer la conexión con el servidor WebSocket

// Evento para actualizar los productos en tiempo real
socket.on('updateProducts', (products) => {
  const productsContainer = document.getElementById('productsContainer');
  productsContainer.innerHTML = ''; // Limpiar el contenedor

  products.forEach((product) => {
    const productElement = document.createElement('div');
    productElement.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <img src="/images/${product.image}" alt="${product.name}" />
    `;
    productsContainer.appendChild(productElement);
  });
});
