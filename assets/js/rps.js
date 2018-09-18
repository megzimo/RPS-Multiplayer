$(function () {

// global variables to hold player/comp choice
let p1Choice = "";
let cChoice = "";
// variables to hold logic of player turn completion
let p1Complete = false;
let p2Complete = false;

// Firebase
let database = firebase.database();
let playerStats = database.ref("/players");

// Adjusting the DOM
$(".score-update").addClass("hide");
$(".player-console").addClass("hide");
 
// Name submission
$("#submit").on("click", function(e){
    e.preventDefault();
    $(".player-console").removeClass("hide");
    $(".user-input").addClass("hide");

    let name = $("#player-name").val().trim();
    $(".name-display").append(name);
    let wins = 0;
    let losses = 0;
    let ties = 0;
    console.log("p 1 complete? ", p1Complete);

    // submit player info to database
playerStats.push({
        name: name,
        wins: wins,
        losses: losses, 
        ties: ties
    })
}) // ENDS submit function


// stores player 1 choice on click event
$(".btn-p1").on("click", function(){
    let p1Choice = $(this).attr("data-choice");
    console.log("p1choice: ", p1Choice)
    database.ref("playerChoice").set(p1Choice);
    p1Complete = true;
    console.log("p1 complete? ", p1Complete)

    if(p1Complete === true){
        let computerChoices = ["rock", "paper", "scissors"];
        cChoice = computerChoices[Math.floor(Math.random() * computerChoices.length)];
        console.log("c choice: ", cChoice)
        database.ref("computerChoice").set(cChoice);
        p2Complete = true;
        console.log("p2 complete?", p2Complete)
    }

});






// // Check to see if both players have made a choice - if yes compare 
// playerList.on("value", function(snapshot){
//     let p1Data = snapshot.child("p1");
//     let p2Data = snapshot.child("p2");

//     if(p1Data.child("choice").exists() && p2Data.child("choice").exists()) {
//       compareChoices(p1Data, p2Data);
//       database.ref("/list").child("p1").child("choice").remove();
//       database.ref("/list").child("p2").child("chilce").remove();
//     }
// })
    
playerStats.on("child_added", function(snapshot){
    let pInfo = snapshot.val();

    let pName = pInfo.name;

})
  
    
    // variables to hold scores
    let p1Wins = 0;
    let p2Wins = 0;
    let p1Losses = 0;
    let p2Losses = 0;
    let p1Ties = 0;
    let p2Ties = 0;

    function p1Win(){
        $(".score-display").append("You Win!");
        p1Wins++;
        p2Losses++;
    };

    function cWin(){
        $(".score-display").append("You Lost!");
        p1Losses++;
        p2Wins++;
    };

    function p1Loss(){
        $(".score-display").append("You Lost!");
        p1Losses++;
        p2Wins++;
    };

    function cLoss(){
        $(".score-display").append("You Win!");
        p1Wins++;
        p2Losses++;
    };

    function tieGame(){
        $(".score-display").append("You tied!");
        p1Ties++;
        p2Ties++;
    }


    // function to score player choices
    function comparePChoice() {
           if (p1Choice === "rock" && cChoice === "rock") {
            tieGame();
        }
    
        else if (p1Choice === "rock" && cChoice === "paper") {
            p1Loss();
            cWin();
        }
    
        else if (p1Choice === "rock" && cChoice === "scissors") {
            p1Win();
            p2Loss();
        }
    
        else if (p1Choice === "paper" && cChoice === "rock") {
            p1Win();
            cLoss();
        }
    
        else if (p1Choice === "paper" && cChoice === "paper") {
            tieGame();    
        }
    
        else if (p1Choice === "paper" && cChoice === "scissors") {
            p1Loss();
            cWin();
        }
    
         else if (p1Choice === "scissors" && p2Choice === "rock") {
            p1Loss();
            p2Win();
        }
    
        else if (p1Choice === "scissors" && p2Choice === "paper") {
            p1Win();
            cLoss();
        }
    
        else if (p1Choice === "scissors" && p2Choice === "scissors") {
            tieGame();
        }
    }

    // playerOne.onDisconnect().remove();
}); // ENDS doc ready fn







// CHAT FUNCTION - they will automatically be put in chronological order so you do not need to specify this order
// function sendChatMessage(){
//     ref = firebase.databse().ref("/chat");
//     messageField = document.querySelector("#chat-message");

//     ref.push().set({
//         name: firebse.auth().currentUser.dispalyName,
//         message: messageField.value
//     })
//     ref.on("child_added", function(snapshot){
//     let message = snapshot.val()
// })
// }

