let productNumber=localStorage.getItem('cart');
productNumber=parseInt(productNumber);
let carts=document.querySelectorAll('#shopcar');
let redpoint=document.querySelector('#lblCartCount');
let products=[
    {
        name:"1111",
        price:300
    },
    {
        name:"2222",
        price:500
    },
    {
        name:"3333",
        price:600
    }
]

function cartsNumber(){
    let productNumber=localStorage.getItem('cart');
    productNumber=parseInt(productNumber);
    if(productNumber){
        localStorage.setItem('cart',productNumber+1);
        redpoint.style.display='inline';
        redpoint.textContent=productNumber+1;
    }else{
        localStorage.setItem('cart',productNumber);
        redpoint.style.display='inline';
        redpoint.textContent=1;
    }
   
}
function onloadCart(){
    var productNumber=localStorage.getItem('cart');
    productNumber=parseInt(productNumber);
    if(productNumber==1){
        redpoint.style.display='inline';
        redpoint.textContent=productNumber;
    }else if(productNumber>1){
        redpoint.style.display='inline';
        redpoint.textContent=productNumber++;
    }
}
onloadCart();
