window.addEventListener("load",function(){

    let GoButton=document.querySelector("button");
    let nameTextBox=document.querySelector("input[name=Name]");
    
    function passValue(){
        let Name=document.querySelectorAll("input")[0].value;
        localStorage.setItem("Name",Name);
        return false;
    }
    
    //Adding validation to TextBox
    GoButton.onclick=function(event){
       
            if(nameTextBox.value==""){
                alert("please Enter Your Name");
                event.preventDefault();
            }
            else{
                passValue();
    
            }
    
    }

    nameTextBox.onkeypress=function(event){
        if(!isNaN(event.key)){
            event.preventDefault();
        }
    }

   


});