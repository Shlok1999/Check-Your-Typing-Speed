const testWrapper=document.querySelector(".test-wrapper");
const testArea=document.querySelector("#test-area");
const originalText=document.querySelector("#original-text p").innerHTML;
const resetButton=document.querySelector("#reset");
const theTimer=document.querySelector(".timer");
const winTable=document.querySelector("#win-table h2");

var timer=[0,0,0,0];
var interval;
var timerRunning=false;

//Add leading zero to numbers 9 or below
function leadingZero(time){
    if(time<=9){
        time="0"+time;
    }
    return time;
}





//Run a standard minute/second/100th of second

function runTimer(){
    let currentTime=leadingZero(timer[0])+":"+leadingZero(timer[1])+":"+leadingZero(timer[2]);

    theTimer.innerHTML=currentTime;
    timer[3]++

    timer[0]=Math.floor((timer[3]/100)/60);
    timer[1]=Math.floor((timer[3]/100)-(timer[0]*60));
    timer[2]=Math.floor(timer[3]-(timer[1]*100)-(timer[0]*6000))
}



//Match the text with the provided text given
function spellCheck(){
    let textEntered=testArea.value;
    let originalTextMatch=originalText.substring(0,textEntered.length);

    if(textEntered==originalText){
        clearInterval(interval);
        testWrapper.style.borderColor="green";
    }else{
        if(textEntered==originalTextMatch){
            testWrapper.style.borderColor="orange";
        }else{
            testWrapper.style.borderColor="red";
        }
    }

}    




//Start the timer
function start(){
    let textEnteredlength=testArea.value.length;
    if(textEnteredlength===0 && !timerRunning){
        timerRunning=true;
        interval=setInterval(runTimer,10);
    }
    console.log(textEnteredlength);
}



//Reset everything
function reset(){
    clearInterval(interval);
    interval=null;
    timer=[0,0,0,0];
    timerRunning=false;

    testArea.value="";
    theTimer.innerHTML="00:00:00";
    testWrapper.style.borderColor="grey";

}
//Win Table



//Event listeners for keyboard
testArea.addEventListener("keypress",start,false);
testArea.addEventListener("keyup",spellCheck,false);
resetButton.addEventListener("click",reset,false);