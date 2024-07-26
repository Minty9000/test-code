
document.getElementById('addProductButton').addEventListener('click', function() {
    const name = document.getElementById('productName').value;
    const size = document.getElementById('productSize').value;
    const price = document.getElementById('productPrice').value;
    const imageFile = document.getElementById('productImage').files[0];
    var indexnum;

    if (name && size && price && imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;

            const product = {
                name: name,
                size: size,
                price: parseFloat(price),
                imageUrl: imageUrl
            };

            addProductToLocalStorage(product);
        };
        reader.readAsDataURL(imageFile);
    }
});
function addProductCard(product) {
    const productList = document.getElementById('productList');
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <h2>Size: ${product.size}</h2>
        <h3>${product.name}</h3>
        <img src="${product.imageUrl}" width="90%" >
        <p>Price: ${product.price}</p>
        <button onclick="deleteindex(${product.indexnum})">delete</button>`;
    productList.appendChild(productCard);
}


function addProductToLocalStorage(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    clearInputFields();
    initializeProductList()
}

function clearInputFields() {
    document.getElementById('productName').value = '';
    document.getElementById('productSize').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('index').value='';
    const productList = document.getElementById('productList');
    productList.innerHTML="";
}
function deleteindex(index){
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    clearInputFields();
    initializeProductList();
}
document.getElementById('deleteButton').addEventListener('click', function() {
    const num=document.getElementById('index').value;
    deleteindex(num);
}
);
function closeModel(){
    const model = document.getElementById("passwordpage");
    model.style.display = "none";
    document.getElementById("error").textContent = "";
}
function checkPassword(){
    var correctPassword = "Gilbert@6737"
    const pass=document.getElementById("password").value;
    var errorMessage = document.getElementById("error");
    if(pass===correctPassword){
        closeModel();   
        clear();
    }else{
        errorMessage.textContent = "Incorrect password. Please try again.";
    }
}
function initializeProductList() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
        let counter=0;
        products.forEach(function(product){
                product.indexnum=counter;
                addProductCard(product);
                counter++;
        });
}
window.addEventListener('load', initializeProductList());
function clear(){
    const pass=document.getElementById("password").value;
    pass.value="";
    
}
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
