let carts=document.querySelectorAll('#shopcar');
let redpoint=document.querySelector('#lblCartCount');
let products=[
    {
        name:"陳韻文百救援紀念T",
        tag:"100savet",
        price:980,
        incart:0
    },
    {
        name:"胡智為背號T",
        tag:"hut",
        price:950,
        incart:0,
    },
    {
        name:"超人氣力霸王球員背號T",
        tag:"chen24cartoon",
        price:1280,
        incart:0
    },
    {
        name:"球員背號T",
        tag:"pan18t",
        price:1080,
        incart:0
    },
    {
        name:"超人力霸王聯名T",
        tag:"cartoont",
        price:950,
        incart:0
    },
    {
        name:"主場假日球衣",
        tag:"clothesholiday",
        price:1280,
        incart:0
    },
    {
        name:"休閒運動T",
        tag:"freeclothes",
        price:980,
        incart:0
    },
    {
        name:"客場球衣",
        tag:"clothesnotinhome",
        price:950,
        incart:0
    },
    {
        name:"胡智為加盟紀念短T",
        tag:"shortclothes",
        price:1280,
        incart:0
    }
]
for(let i=0;i<=carts.length-1;i++){
    carts[i].addEventListener('click',()=>{
        cartsNumber(products[i]);
        totalCost(products[i]);
    })
}
function onloadCart(){  //購物車顯示紅字
    var productNumber=localStorage.getItem('cart');
    if(productNumber){
        redpoint.style.display='inline';
        redpoint.textContent=productNumber;
    }
}
function setItem(product){  //放置localStorage總共幾項商品
    let cartItem=localStorage.getItem('productsInCart');
    cartItem=JSON.parse(cartItem);
    if(cartItem!=null){
        if(cartItem[product.tag]==undefined){
            cartItem={
                ...cartItem,
                [product.tag]:product
            }
        }
        cartItem[product.tag].incart+=1;
    }else{
        product.incart= 1;
        cartItem={
            [product.tag]:product
        }
    }
    localStorage.setItem('productsInCart',JSON.stringify(cartItem));
    history.go();
}
function cartsNumber(product){ //計算購買了幾項商品
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
function totalCost(product){  //計算總價
    let cartCost=localStorage.getItem("totalCost");
    if(cartCost!==null){
        cartCost=parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost+product.price);
    }else{
        localStorage.setItem("totalCost",product.price);
    }
   
}
function displayCart(){  //繪製購物車內部的html
    let cartItem=localStorage.getItem("productsInCart");
    cartItem=JSON.parse(cartItem);
    let productContainer=document.querySelector('.products');
    let cartCost=localStorage.getItem("totalCost");
    if(cartItem&&productContainer){
        productContainer.innerHTML='';
        Object.values(cartItem).map(item=>{
            productContainer.innerHTML+=`
            <div class="product">
                    <i class="fa-solid fa-xmark">
                    </i>
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
                    <span>${item.incart}</span>
                    <i class="fa-solid fa-angle-right"></i>
                </div>
                <div class="total1">
                    $${item.incart*item.price}
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