let carts=document.querySelectorAll('#shopcar');
let redpoint=document.querySelector('#lblCartCount');
let products=[
    {
        name:"陳韻文百救援紀念T",
        tag:"100savet",
        price:980,
        inCart:0
    },
    {
        name:"胡智為背號T",
        tag:"hut",
        price:950,
        inCart:0,
    },
    {
        name:"超人氣力霸王球員背號T",
        tag:"chen24cartoon",
        price:1280,
        inCart:0
    },
    {
        name:"球員背號T",
        tag:"pan18t",
        price:1080,
        inCart:0,
    },
    {
        name:"超人力霸王聯名T",
        tag:"cartoont",
        price:950,
        inCart:0
    },
    {
        name:"主場假日球衣",
        tag:"clothesholiday",
        price:1280,
        inCart:0
    },
    {
        name:"休閒運動T",
        tag:"freeclothes",
        price:980,
        inCart:0
    },
    {
        name:"客場球衣",
        tag:"clothesnotinhome",
        price:950,
        inCart:0
    },
    {
        name:"胡智為加盟紀念短T",
        tag:"shortclothes",
        price:1280,
        inCart:0
    }
]
for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click',()=>{
        cartsNumber(products[i]);
        totalCost(products[i]);
    })
}
function onloadCart(){
    var productNumber=localStorage.getItem('cart');
    if(productNumber){
        redpoint.style.display='inline';
        redpoint.textContent=productNumber;
    }
}
function cartsNumber(product){
    let productNumber=localStorage.getItem('cart');
    productNumber=parseInt(productNumber);
    if(productNumber){
        localStorage.setItem('cart',productNumber+1);
        redpoint.style.display='inline';
        redpoint.textContent=productNumber+1;
    }else{
        localStorage.setItem('cart',1);
        redpoint.style.display='inline';
        redpoint.textContent=productNumber;
    }
   setItem(product);
}

function setItem(product){
    let cartItem=localStorage.getItem('productsInCart');
    cartItem=JSON.parse(cartItem);
    if(cartItem!=null){
        if(cartItem[product.tag]==undefined){
            cartItem={
                ...cartItem,
                [product.tag]:product
            }
        }
        cartItem[product.tag].inCart+=1;
    }else{
        product.inCart=1;
        cartItem={
            [product.tag]:product
        }
    }
    localStorage.setItem('productsInCart',JSON.stringify(cartItem));
    history.go();
}
function totalCost(product){
    let cartCost=localStorage.getItem("totalCost");
    if(cartCost!==null){
        cartCost=parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost+product.price);
    }else{
        localStorage.setItem("totalCost",product.price);
    }
   
}
function displayCart(){
    let cartItem=localStorage.getItem("productsInCart");
    cartItem=JSON.parse(cartItem);
    let productContainer=document.querySelector('.products');
    let cartCost=localStorage.getItem("totalCost");
    if(cartItem&&productContainer){
        productContainer.innerHTML='';
        Object.values(cartItem).map(item=>{
            productContainer.innerHTML+=`
            <div class="product">
                <i class="fa-solid fa-xmark"></i>
                <img class="picture" src="./${item.tag}.jpg">
                <br>
                <span class="name">
                    ${item.name}
                </span>
                <div class="price1">
                    ${item.price}
                </div>
                <div class="quatity1">
                    <i class="fa-solid fa-angle-left"></i>
                    <span>${item.inCart}</span>
                    <i class="fa-solid fa-angle-right"></i>
                </div>
                <div class="total1">
                    $${item.inCart*item.price}
                </div>
            </div>
            `
        });
        productContainer.innerHTML+=`
            <div class="basketTotalContainer">
                <div class="basketTotal">
                    <h4>總計</h4>
                    $${cartCost}
                </div>
            </div>
        `
    }
}
onloadCart();
displayCart();