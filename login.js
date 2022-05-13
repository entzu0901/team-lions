var personalJson;
window.onload=function(){personalJson=JSON.parse(localStorage.getItem("_register"))|| [];}

function send(){ //註冊功能
    var newPassword=document.querySelector('#password1').value;
    var password2=document.querySelector('#confirmPassword').value;
    var newAccount=document.querySelector('#account1').value;
    var newName=document.querySelector('#name').value;
    var names=personalJson[0]? personalJson[0].newName:[];
    var account=personalJson[0]? personalJson[0].newAccount:[];
    var password3=personalJson[0]? personalJson[0].newPassword:[];
    if(newPassword!==password2){
        alert('確認密碼必須與設定的密碼相同');
        document.querySelector('#password1').value="";
        document.querySelector('#confirmPassword').value="";
        return;
    }
    if (personalJson.length !== 0) {
        var nameIndex = personalJson[0].newName.indexOf(newName);
        var accountIndex = personalJson[0].newAccount.indexOf(newAccount);
        var secretIndex = personalJson[0].newPassword.indexOf(newPassword);
        console.log(nameIndex, accountIndex, secretIndex);
        if (nameIndex !== -1 || accountIndex !== -1) {
            alert("此帳密或使用者名稱之前有人申請過了!!");
            document.querySelector('#password1').value="";
            document.querySelector('#confirmPassword').value="";
            document.querySelector('#account1').value="";
            document.querySelector('#name').value="";
            return false;
        }else{
            alert("恭喜註冊成功!");
            document.querySelector('#password1').value="";
            document.querySelector('#confirmPassword').value="";
            document.querySelector('#account1').value="";
            document.querySelector('#name').value="";
            history.go(-1);
        }

    }else{
        alert("恭喜註冊成功!");
        document.querySelector('#password1').value="";
        document.querySelector('#confirmPassword').value="";
        document.querySelector('#account1').value="";
        document.querySelector('#name').value="";
        history.go(1);
    }
    account.push(newAccount);
    names.push(newName);
    password3.push(newPassword);
    personalJson[0]={
        "newAccount":account,
        "newName":names,
        "newPassword":password3
    };
    localStorage.setItem("_register",JSON.stringify(personalJson));
 
}
function login(){
   var user=document.querySelector('#username').value;
   var passwords=document.querySelector('#password').value;
   for(let i=0; i<=personalJson.length+1;i++){      
    if(user==personalJson[0].newAccount[i]&&passwords==personalJson[0].newPassword[i]){
            alert("登入成功");
            location.href="https://entzu0901.github.io/team-lions/lion-item.html";
            return;
    }
    else{
        alert("帳號或密碼錯誤或尚未註冊請點下方註冊!!");
        document.querySelector('#username').value="";
        document.querySelector('#password').value="";
        return;
    }
 }
}