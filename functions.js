//variables
let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let precioTotal = document.querySelector('.precio-total')
let cantidadProduct = document.querySelector('.count-product');


let buyThings = [];
let totalCard = 0;
let countProduct = 0;

//functions
loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct);

    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }
    
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let precioReduce = parseFloat(value.precio) * parseFloat(value.cantidad);
                totalCard =  totalCard - precioReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        
        countProduct--;
        document.getElementById('title').innerHTML='Carrito vacio'
        document.getElementById('actions').style.display="none";

    }
    loadHtml();
    
}



function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        precio: product.querySelector('div p span').textContent,
        id: product.querySelector('.btn-add-cart').getAttribute('data-id'),
        cantidad : product.querySelector('input').value
        // cantidad: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.precio * infoProduct.cantidad);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.cantidad++;
                
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml();
    //console.log(infoProduct);
}

function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, precio, cantidad, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-precio">${precio}$</h5>
                <h6>cantidad: ${cantidad}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        precioTotal.innerHTML = totalCard;
        

        cantidadProduct.innerHTML = countProduct;
        
     document.getElementById('title').innerHTML='Mi Carrito';
     document.getElementById('actions').style.display="block";
       
    });
}
 function clearHtml(){
    containerBuyCart.innerHTML = '';
  subtotal=  document.getElementById('total').innerHTML=0;
    cantProduct=document.getElementById('cad_product').innerHTML=0;
    
        
    
    // document.querySelector(InputEvent)
    
 }



 document.getElementById('limpiar_carrito').addEventListener("click",function(){
     document.getElementById('addProduct').innerHTML='';
     subtotal=  document.getElementById('total').innerHTML=0;
    cantProduct=document.getElementById('cad_product').innerHTML=0;
    document.getElementById('actions').style.display="none";

 })