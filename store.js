function addProductCard(product) {
    const productList = document.getElementById('productList');
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <h2>Size: ${product.size}</h2>
        <h3>${product.name}</h3>
        <img src="${product.imageUrl}" width="90%" >
        <p>Price: $${product.price}</p>
    `;
    productList.appendChild(productCard);
}

// Retrieve products from localStorage and display them
function initializeProductList(size) {
    fetch('http://localhost:3000/data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            document.getElementById('productList').innerHTML = '';
            products.forEach((product, index) => {
                if (product.size === size||size==0) {
                    addProductCard(product, index);
                }
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


// Call initializeProductList on page load
window.addEventListener('load', initializeProductList(document.getElementById('sizeSelector').value));
function clear(){
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
}
document.getElementById('searchSize').addEventListener('click', function() {
    clear();
    initializeProductList(document.getElementById('sizeSelector').value)
});
document.getElementById('sizeNeeded').addEventListener('click', function(event) {
    event.preventDefault()
});
function openBar(){
    const bar=document.getElementById('sidebar');
    bar.style.width="300px";
    document.getElementById('half-circle').style.display="none";
    document.getElementById('expand').style.display="none";
    document.getElementById('close').style.display="block";
    document.getElementById('close-circle').style.display="block";
    document.getElementById('xmark').style.display="block";
}
function closeBar(){
    const bar=document.getElementById('sidebar');
    bar.style.width="0";
    document.getElementById('half-circle').style.display="block";
    document.getElementById('expand').style.display="block";
    document.getElementById('close').style.display="none";
    document.getElementById('close-circle').style.display="none";
    document.getElementById('xmark').style.display="none";
}