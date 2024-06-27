var playing =false;
var score=0;
var lives;
var fruitArray= ['apple','banana','pineapple','orange','pear','mango','grape','strawberry','chilli'];
var step=0;
var step2=0;
var stepb;
var action;
var action2;
var actionb;
var stopcount = false;
var stopcount2 = false;
var bstate = false;

$(function(){
    
    $("#startReset").click(function(){
        if(playing == true){
            location.reload();
        }
        else{
            $('#gameover').hide();
            playing= true;
            score = 0;
            $("#scoreValue").html(score);
            $("#life").show();
            lives = 3;
            $("#startReset").html("Reset");
            refreshHearts();
            startAction1();
            setTimeout(startAction2,200);
            setTimeout(runBomb,3000);
        }
    });
    
    $("#fruit1").mouseover(function(){
        if( stopcount== false && bstate == false){
            score = score+1;
            $("#scoreValue").html(score);
            stopcount = true;
            $("#slicesound")[0].play();
            stopFruit1();
        setTimeout(startAction1,800);
        };
        
        
    });
    
    $("#fruit2").mouseover(function(){
        if( stopcount2== false && bstate == false){
            score = score+1;
            $("#scoreValue").html(score);
            stopcount2 = true;
            $("#slicesound")[0].play();
            stopFruit2();
        setTimeout(startAction2,800);
        };
        
        
    });
    
    $("#bomb").mouseover(function(){
        
        bstate = true;
        stopBomb();
        stopFruit1();
        stopFruit2();
        $("#bombsound")[0].play();
        setTimeout(gameOver,1000);
    });
    
    
function refreshHearts(){
    $("#life").empty();
    for(i=0; i<lives; i++){
                $("#life").append("<img src='images/heart.png' class='heart'>");
            };
};
function startAction1(){
   
    $("#fruit1").show();
    chooseFruit1();
    $("#fruit1").css({
       left: Math.round(Math.random()*500)+50,
        top: -200
    });
    step = 2+ Math.round(Math.random()*4);
    // action stores timeout for moving the fruits
    action= setInterval( function(){
        $("#fruit1").css('top',$("#fruit1").position().top + step);
        if($('#fruit1').position().top > $("#fruitBox").height()+80){
            if(lives> 1 && bstate==false){
                $("#fruit1").show();
                chooseFruit1();
            $("#fruit1").css({
                left: Math.round(Math.random()*500)+80,
                top: -50
                });
        step = 2+ Math.round(Math.random()*4);
                lives--;
                refreshHearts();
            }
            else if(bstate==false){
                refreshHearts();
                gameOver();
            }
        }
    }, 10)
    
};

function startAction2(){
   
    $("#fruit2").show();
    chooseFruit2();
    $("#fruit2").css({
       left: Math.round(Math.random()*500)+50,
        top: -200
    });
    step2 = 2+ Math.round(Math.random()*4);
    // action stores timeout for moving the fruits
    action2= setInterval( function(){
        $("#fruit2").css('top',$("#fruit2").position().top + step2);
        if($('#fruit2').position().top > $("#fruitBox").height()+80){
            if(lives> 1 && bstate == false){
                $("#fruit2").show();
                chooseFruit2();
            $("#fruit2").css({
                left: Math.round(Math.random()*500)+80,
                top: -50
                });
        step2 = 2+ Math.round(Math.random()*4);
                lives--;
                refreshHearts();
            }
            else if(bstate==false){
                gameOver();
            }
            
        }
    }, 10)
    
};

function chooseFruit1(){
     stopcount= false;
   $("#fruit1").attr("src","images/"+fruitArray[Math.round(Math.random()*8)]+".png") ;
};
function chooseFruit2(){
     stopcount2= false;
   $("#fruit2").attr("src","images/"+fruitArray[Math.round(Math.random()*8)]+".png") ;
};

function gameOver(){
    $("#startReset").hide();
    playing = false;
    $("#startReset").html("Play Again");
    $("#gameover").show();
    if(bstate==true){
        $("#gameover").css("background-image","url(images/explosion.jpg)");
        $("#gameover").css("color","black");
    }
    $("#gameover").html('<p>GAME OVER</p><p>YOUR SCORE IS '+score+'</p>');
    stopFruit1();
    stopFruit2();
    setTimeout(function(){location.reload()},2000);
};

function stopFruit1(){
    clearInterval(action);
    $("#fruit1").hide('explode',500);
};
    
    
function stopFruit2(){
    clearInterval(action2);
    $("#fruit2").hide('explode',500);
};
    
    });

function spawnBomb(){
    $("#bomb").attr("src","images/bomb.png");
}

function stopBomb(){
    clearInterval(actionb);
    $("#bomb").hide('explode',1000);
};

function runBomb(){
    $("#bomb").show();
    spawnBomb();
    $("#bomb").css({
       left: Math.round(Math.random()*500)+50,
        top: -200
    });
    actionb = setInterval(function(){
        $("#bomb").css("top",$("#bomb").position().top + 1+Math.round(Math.random()*3));
        if($('#bomb').position().top > $("#fruitBox").height()+100){
            
            setTimeout(function(){
                $("#bomb").show();
    spawnBomb();
    $("#bomb").css({
       left: Math.round(Math.random()*500)+50,
        top: -200
    });},1000 + Math.round(Math.random()*2000));
            
        }
    },10)
}
