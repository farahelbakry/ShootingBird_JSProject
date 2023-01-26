window.addEventListener("load",function(){

    //Dealing with Local Storage
    document.querySelectorAll("span")[0].innerHTML=localStorage.getItem("Name");
    document.querySelectorAll("span")[4].innerHTML=localStorage.getItem("Name");

    //Getting last played Date 
    document.querySelectorAll("span")[5].innerHTML=localStorage.getItem("Date");

    //Getting last Score
    document.querySelectorAll("span")[6].innerHTML=localStorage.getItem("score");

   
    //Defining Elements
    let win=this.document.querySelector(".win");
    let Lose=this.document.querySelector(".lose");
    let StartButton=this.document.querySelectorAll("input")[0];
    let Try_again=this.document.querySelectorAll("input")[1];
    let Play_again=this.document.querySelectorAll("input")[2];
    let bodyElm=document.querySelector("body");


    //Defining Variables
    let score=0;
    let killed=0;
    let Seconds=60;

    //Making Lose and Win Div invisible
    win.classList.add("invisible");
    Lose.classList.add("invisible");

    //Start Game 
    StartButton.onclick=function(){
        //Defining Elements
        let Score=document.querySelectorAll("span")[1];
        let TimeLimit=document.querySelectorAll("span")[2];
        let BirdsKilled=document.querySelectorAll("span")[3];
        let Start_div=document.querySelector(".start");
        Start_div.classList.add("invisible"); 
        Score.innerHTML=score;
        BirdsKilled.innerHTML=killed;

        //function to handle time limit
        let makeIteration=function(){    
            Seconds --;
            if (Seconds >= -0) {
                TimeLimit.innerHTML=Seconds;
            }
          else{
            TimeLimit.innerHTML=0;
            clearInterval(makeIteration);
          }
        } 
        setInterval(makeIteration, 1000); // 1 second waiting

        //To Create Birds
        let createBirds=setInterval(function(){
            let Birds=["../Images/bird1.gif","../Images/bird2.gif","../Images/bird3.gif"]; 
            let imgElm=document.createElement("img");
            let randomBird=Math.random()*Birds.length;
            randomBird=Math.floor(randomBird);
            let chosenBird=Birds[randomBird];
            if(chosenBird=="../Images/bird1.gif"){
                imgElm.classList.add("blue");     
            }
            else if(chosenBird=="../Images/bird2.gif"){
                imgElm.classList.add("black");
            }
            else if(chosenBird=="../Images/bird3.gif"){
                imgElm.classList.add("white");
            }             
            bodyElm.append(imgElm);
            imgElm.src=chosenBird;
            
            moveright(imgElm);           

        },1000);

        // To make Birds Move Right
        moveright=function(imgElm){
            //Getting Top random for Birds
            let Top=Math.floor(Math.random()*(innerHeight-100-parseInt(imgElm.clientHeight)));
            imgElm.style.top=Top+"px";
            let left=0;
            let id=setInterval(function(){
                left+=10;
                if(left<(innerWidth-imgElm.width)){     
                    imgElm.style.left=left+"px";                     
                }  
                else{ 
                    imgElm.remove();    
                } 
                if(Seconds==0){
                    if(score>=50){
                        clearInterval(createBirds);
                        clearInterval(id);
                        TimeLimit.innerHTML=Seconds;
                        win.classList.remove("invisible");
                        imgElm.remove();
                    }
                    else{
                        clearInterval(createBirds);
                        clearInterval(id);
                        TimeLimit.innerHTML=0;
                        Lose.classList.remove("invisible");
                        imgElm.remove();
                    }
                   
                }
            },50);
        }

        //Creation of Bomb
        let createBomb=setInterval(function(){
            let BombElm=document.createElement("img");
            BombElm.classList.add("bomb");
            bodyElm.append(BombElm);
            BombElm.src="../Images/bomb.png";
         
            movedown(BombElm)
            Birdshoot(BombElm)

        },3000);

        //Movement of Bomb
        let movedown=function(BombElm){
            let down=0;
            let leftt=Math.floor(Math.random()*(innerWidth-100-parseInt(BombElm.clientWidth)));
            BombElm.style.left=leftt+"px";

            let id2=setInterval(function(){
                down+=5;  
            if(down<(innerHeight-BombElm.height)){     
                BombElm.style.top=down+"px";  
            }
            else{ 
                BombElm.remove(); 
            }
            if(Seconds==0){
                if(score>50){
                    clearInterval(createBomb);
                    clearInterval(id2);
                    TimeLimit.innerHTML=0;
                    win.classList.remove("invisible");
                    BombElm.remove();
                }
                else{
                    clearInterval(createBomb);
                    clearInterval(id2);
                    TimeLimit.innerHTML=0;
                    Lose.classList.remove("invisible");
                    BombElm.remove();
                }
                //Setting last Score
                localStorage.setItem("score",score);
            }
            },50);
        }
        //Shooting Bird
        let Birdshoot=function(BombElm){
            BombElm.onclick=function(){
                let whiteBird=document.querySelectorAll(".white");
                let blackBird=document.querySelectorAll(".black");
                let blueBird=document.querySelectorAll(".blue");

                // Setting offset for bomb
               let Bomb_left=this.offsetLeft-75;
               let Bomb_Right=this.offsetLeft + this.width +75;
               let Bomb_Top=this.offsetTop-75;
               let Bomb_Bottom=this.offsetTop+ this.height +75;

                whiteBird.forEach(function(imgElm){
                    if(
                        imgElm.offsetLeft + imgElm.width > Bomb_left &&
                        imgElm.offsetLeft < Bomb_Right && 
                        imgElm.offsetTop + imgElm.height > Bomb_Top &&
                        imgElm.offsetTop < Bomb_Bottom
                    ){
                        score+=5;
                        Score.innerHTML=score;
                        killed++;
                        BirdsKilled.innerHTML=killed;
                        imgElm.remove();
                        BombElm.src="../Images/explosion.png";
                        setTimeout(function(){
                         BombElm.remove();
                        },100)

                    }
                })

                blackBird.forEach(function(imgElm){
                    if(
                        imgElm.offsetLeft + imgElm.width > Bomb_left &&
                        imgElm.offsetLeft < Bomb_Right && 
                        imgElm.offsetTop + imgElm.height > Bomb_Top &&
                        imgElm.offsetTop < Bomb_Bottom
                    ){
                        score+=10;
                        Score.innerHTML=score;
                        killed++;
                        BirdsKilled.innerHTML=killed;
                        imgElm.remove();
                        BombElm.src="../Images/explosion.png";
                        setTimeout(function(){
                         BombElm.remove();
                        },100)
                    }
                })

                blueBird.forEach(function(imgElm){
                    if(
                        imgElm.offsetLeft + imgElm.width > Bomb_left &&
                        imgElm.offsetLeft < Bomb_Right && 
                        imgElm.offsetTop + imgElm.height > Bomb_Top &&
                        imgElm.offsetTop < Bomb_Bottom
                    ){
                        score-=10;
                        Score.innerHTML=score;
                        killed++;
                        BirdsKilled.innerHTML=killed;
                        imgElm.remove();
                        BombElm.src="../Images/explosion.png";
                        setTimeout(function(){
                         BombElm.remove();
                       },100)

                    }
                })

        
            }


        }


    } //start button ends

    // Handling Try Again Button
    Try_again.onclick=function(){
        Lose.classList.add("invisible");
        location.reload();
    }

    //Handling Play Again Button
    Play_again.onclick=function(ev){
        win.classList.add("invisible");
        location.reload();
    }

    //Setting Date of played Game
    const date=new Date();
    localStorage.setItem("Date",date.toLocaleString());

   
    


});