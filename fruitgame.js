var playing =false;
var score=0;
var lives;
var fruitArray= ['apple','banana','pineapple','orange','pear','mango','grape','strawberry','chilli'];
var step;
var action;
var stopcount = false;
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
            startAction();
        }
    });
    
    $("#fruit1").mouseover(function(){
        if( stopcount== false){
            score = score+1;
            $("#scoreValue").html(score);
            stopcount = true;
            $("#slicesound")[0].play();
        };
        stopFruit();
        setTimeout(startAction,300);
        
    });
    $("#fruit1").click(function(){
        if( stopcount== false){
            score = score+1;
            $("#scoreValue").html(score);
            stopcount = true;
            $("#slicesound")[0].play();
        };
        stopFruit();
        setTimeout(startAction,300);
        
    });
    
function refreshHearts(){
    $("#life").empty();
    for(i=0; i<lives; i++){
                $("#life").append("<img src='images/heart.png' class='heart'>");
            };
};
function startAction(){
   
    $("#fruit1").show();
    chooseFruit();
    $("#fruit1").css({
       left: Math.round(Math.random()*500)+80,
        top: -50
    });
    step = 1+ Math.round(Math.random()*5);
    action= setInterval( function(){
        $("#fruit1").css('top',$("#fruit1").position().top + step);
        if($('#fruit1').position().top > $("#fruitBox").height()+80){
            if(lives> 1){
                $("#fruit1").show();
                chooseFruit();
            $("#fruit1").css({
                left: Math.round(Math.random()*500)+80,
                top: -50
                });
        step = 1+ Math.round(Math.random()*5);
                lives--;
                refreshHearts();
            }
            else{
                gameOver();
            }
        }
    }, 10)
    
};

function chooseFruit(){
     stopcount= false;
   $("#fruit1").attr("src","images/"+fruitArray[Math.round(Math.random()*8)]+".png") ;
};

function gameOver(){
    playing = false;
    $("#startReset").html("Play Again");
    $("#gameover").show();
    $("#gameover").html('<p>GAME OVER</p><p>YOUR SCORE IS '+score+'</p>');
    stopFruit();
};

function stopFruit(){
    clearInterval(action);
    $("#fruit1").hide('explode',200);
}
    
    });