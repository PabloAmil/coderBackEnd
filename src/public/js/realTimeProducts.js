const realTimeProducts = io();
let productToAdd;

let productTitle = document.getElementById('productToAddTitle');
let productPrice = document.getElementById('productToAddPrice');
let productCode = document.getElementById('productToAddCode');
let productStock = document.getElementById('productToAddStock');
let productStatus = document.getElementById('productToAddStatus');
let productCategory = document.getElementById('productToAddCategory');
let productThumbnails = document.getElementById('productToAddThumbnails');
let productDescription = document.getElementById('productToAddDescription');

let submitButton = document.getElementById('submitButton');

function handleSubmitButtonClick(e) {

  productToAdd = {
    title: productTitle.value,
    description: productDescription.value,
    code: productCode.value,
    price: productPrice.value,
    status: true,
    stock: productStock.value,
    category: productCategory.value,
    thumbnails: productThumbnails.value
  };
  realTimeProducts.emit('Product database update', productToAdd);
}
submitButton.addEventListener('click', handleSubmitButtonClick);

realTimeProducts.on('real time products update', data => {
  console.log(data);
  const productsContainer = document.getElementById('productsContainer');
  
  

})


