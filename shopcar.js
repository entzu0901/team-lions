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
            <div class="product" id="list">
                    <button onclick="remove()">Delete</button>
                <img class="picture" src="./${item.tag}.jpg">
                <br>
                <span class="name">
                    ${item.name}
                </span>
                <div class="price1">
                    ${item.price}
                </div>
                <td class="cart-product-quantity" width="130px">
                    <div class="input-group quantity">
                        <div class="input-group-prepend" style="cursor: pointer" id=num onclick="decreaseValue()">
                            <span class="input-group-text">-</span>
                        </div>
                        <input type="text" class="form-control" id=count  maxlength="2" max="10" value=${item.incart}>
                        <div class="input-group-append" style="cursor: pointer" onclick="increaseValue()">
                            <span class="input-group-text">+</span>
                        </div>
                    </div>
                </td>
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
function remove(){
    var lists=document.querySelectorAll('#list');
    var productName=document.querySelectorAll('.name');
    var infor=localStorage.getItem('productsInCart');
    var inforObj=JSON.parse(infor);
    var buttons=document.getElementsByTagName('button');
    // 點擊delete按鈕
    for(b=0;b<=buttons.length-1;b++){
        if(buttons[b].onclick.arguments!==null){   
                if(Object.values(inforObj)[b].name===productName[b].innerText){    
                            var count2=localStorage.getItem('cart');
                            var counts1=parseInt(count2);
                            var quatity=document.getElementsByClassName('form-control');
                            var numberReal=parseInt(quatity[0].value);
                            var price=document.getElementsByClassName('price1');
                            var total=price[b].innerText*numberReal;
                            var totalReal=localStorage.getItem('totalCost');
                            localStorage.setItem('totalCost',totalReal-total);
                            lists[b].remove();
                            if(counts1>1){
                                count2=counts1-numberReal;
                                localStorage.setItem('cart',count2);
                                Object.values(inforObj)[b].incart=Object.values(inforObj)[b].incart-Object.values(inforObj)[b].incart;
                                JSON.stringify(Object.values(inforObj)[b]);
                                if(Object.values(inforObj)[b].incart==0&&infor!==[]){
                                    var newArray=Object.values(inforObj).filter(item=>item.incart!==0)
                                    var newObj=Object.assign(newArray);
                                    localStorage.setItem("productsInCart",JSON.stringify(newObj));
                                    if(count2==0){
                                        localStorage.removeItem('cart');
                                        localStorage.removeItem('productsInCart');
                                        localStorage.removeItem('totalCost');
                                    }
                                    history.go(0);  
                                  }
                                }
                            }else if(counts==1){
                                localStorage.removeItem('cart');
                                localStorage.removeItem('productsInCart');
                                localStorage.removeItem('totalCost');
                                history.go(0);  
                            }
                        
                }
            
        }
}
function decreaseValue(){
    var buttons=document.querySelectorAll('.input-group-prepend');
    var c=document.getElementsByClassName('input-group-prepend');
    var realN=document.querySelectorAll('.form-control');
    var infor=localStorage.getItem('productsInCart');
    var inforObj=JSON.parse(infor);
    for(b=0;b<=buttons.length-1;b++){
        if(c[b].onclick.arguments!==null){ 
        realN[b].classList.replace('form-control','form-control1');
        var num1=document.getElementsByClassName('form-control1');
        var real=parseInt(num1[0].value);
        num1[0].value=(real==1)?1:real-1;
        var realCount=localStorage.getItem('cart');
        localStorage.setItem('cart',realCount-1);
        Object.values(inforObj)[b].incart=Object.values(inforObj)[b].incart-1;
        localStorage.setItem('productsInCart',JSON.stringify(inforObj));
        history.go();
    }
    for(c=0;c<=buttons.length-1;c++){
        var totals=document.getElementsByClassName('total1');
        var aTotals=totals[c].innerText;
        var realTotal=localStorage.getItem('totalCost');
        realTotal=aTotals+aTotals;
        console.log(realTotal);
    }
  }   
}
function increaseValue(){
    var buttons=document.querySelectorAll('.input-group-append');
    var c=document.getElementsByClassName('input-group-append');
    var realN=document.querySelectorAll('.form-control');
    var infor=localStorage.getItem('productsInCart');
    var inforObj=JSON.parse(infor);
    for(b=0;b<=buttons.length-1;b++){
        if(c[b].onclick.arguments!==null){ 
        realN[b].classList.replace('form-control','form-control1');
        var num1=document.getElementsByClassName('form-control1');
        var real=parseInt(num1[0].value);
        num1[0].value=(real>10)?real:real+1;
        var realCount=localStorage.getItem('cart');
        realCount=parseInt(realCount);
        localStorage.setItem('cart',realCount+1);
        Object.values(inforObj)[b].incart=Object.values(inforObj)[b].incart+1;
        localStorage.setItem('productsInCart',JSON.stringify(inforObj));
        history.go();
    }
  }   
}
onloadCart();
displayCart();