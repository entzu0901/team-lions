function change(){
    var main=document.getElementById('mainImg');
    var small=document.getElementsByClassName('smallimg');
    if(small[0].onclick.arguments!==null){
        main.src=small[0].src;
    }
    if(small[1].onclick.arguments!==null){
        main.src=small[1].src;
    }
    if(small[2].onclick.arguments!==null){
        main.src=small[2].src;
    }
    if(small[3].onclick.arguments!==null){
        main.src=small[3].src;
    }
    if(small[4].onclick.arguments!==null){
        main.src=small[4].src;
    }
}
function increaseValue(){
    let num=document.querySelector('.item-quantity');
    let realNum=parseInt(num.value);
    if(realNum==10){
        num=10;
    }else if(realNum<10){
        num.value=realNum+1;
    }
}
function decreaseValue(){
    let num=document.querySelector('.item-quantity');
    let realNum=parseInt(num.value);
    if(realNum==1){
        num=1
    }else{
        num.value=realNum-1
    }
}
function changePic(){
    let detail=document.querySelector('.detail3');
    let detail1=document.querySelector('.detail2');
    let detail2=document.getElementsByClassName('detail');
    if(detail.onclick.arguments!==null){ //點擊運送方式
        detail2[0].src="./detail1.jpeg";
    }
    if(detail1.onclick.arguments!==null){
        detail2[0].src="./detail2.png";
    }
}