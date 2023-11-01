const socket = io();
const form = document.getElementById('form-product');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newProduct = {
    id: e.target[0].value,
    title: e.target[1].value,
    category: e.target[2].value,
    description: e.target[3].value,
    price: e.target[4].value,
    code: e.target[5].value,
    stock: e.target[6].value,
  }

  socket.emit('newProduct', newProduct);
  console.log(newProduct);
});

socket.on('newProduct', ({ product }) => {
  const productList = document.getElementById('product-list');

  const li = document.createElement('li');
  li.innerHTML = `
        ID: ${product.id}
        Title: ${product.title}
        Category: ${product.category}
        Description: ${product.description}
        Price: ${product.price}
        Code: ${product.code}
        Stock: ${product.stock}
    `;
  productList.appendChild(li);
});
