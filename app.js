/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added. 
- A round ends when the user either holds or gets a score of 30 or more 
- For every role of dice the user must select min 1 dice to freeze. 
- If the user gets less than 30 - the difference to 30 will be subtracted from the players total score, which starts at 30
- If the user gets more than 30 - the user gets another roll of dices in which he will target the number he was above 30 (fx if he gets 32, he will try to get as many 2's he can). The sum of the fx 2's will then be subtracted from the score of the other player
- Every time a player holds, reaches 30 or have rolled the dices to try to penalize the other player - the turn is switched and it is now the other player in action
- The first player to reach 0 points on GLOBAL score looses the game

*/
// Initial Situation
init();

 // Variable Definition 
var scores, roundScore, activePlayer, gamePlaying, non_activePlayer; 
var dice1_num;
var dice2_num; 
var dice3_num; 
var dice4_num; 
var dice5_num; 
var dice6_num;
var dice_numsum = dice1_num + dice2_num + dice3_num + dice4_num + dice5_num + dice6_num 
var dice1_last;
var dice2_last; 
var dice3_last; 
var dice4_last; 
var dice5_last; 
var dice6_last; 
var dices_active_last = 6;
var dices_active = (dice1_active + dice2_active + dice3_active + dice4_active + dice5_active + dice6_active); 
var dice1_active_last;
var dice2_active_last;
var dice3_active_last;
var dice4_active_last;
var dice5_active_last;
var dice6_active_last;
var max_dices_active_perclick = 7;
var dices_active_click_last = 6;

// Roll Dice

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying && max_dices_active_perclick > (dice1_active + dice2_active + dice3_active + dice4_active + dice5_active + dice6_active) && dices_active_click <= dices_active_click_last) {// && dices_active_click > (dice1_active + dice2_active + dice3_active + dice4_active + dice5_active + dice6_active))   
        if((dices_active_last > 1))
        {
        // Dices 
        document.querySelector('#penalty').style.display = 'none';
        if (dice1_active) {var dice1 = Math.floor(Math.random()*6)+1;} else {dice1_last;}
        if (dice2_active) {var dice2 = Math.floor(Math.random()*6)+1;} else {dice2_last;}
        if (dice3_active) {var dice3 = Math.floor(Math.random()*6)+1;} else {dice3_last;}
        if (dice4_active) {var dice4 = Math.floor(Math.random()*6)+1;} else {dice4_last;}
        if (dice5_active) {var dice5 = Math.floor(Math.random()*6)+1;} else {dice5_last;}
        if (dice6_active) {var dice6 = Math.floor(Math.random()*6)+1;} else {dice6_last;}

        document.getElementById('dice-1').style.display = 'block'; 
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-3').style.display = 'block'; 
        document.getElementById('dice-4').style.display = 'block'; 
        document.getElementById('dice-5').style.display = 'block'; 
        document.getElementById('dice-6').style.display = 'block'; 

        if (dice1_active) {
            document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        }
        if (dice2_active) {
            document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        }
        if (dice3_active) {
            document.getElementById('dice-3').src = 'dice-' + dice3 + '.png';
        }
        if (dice4_active) {
            document.getElementById('dice-4').src = 'dice-' + dice4 + '.png';
        }
        if (dice5_active) {
            document.getElementById('dice-5').src = 'dice-' + dice5 + '.png';
        }
        if (dice6_active) {
            document.getElementById('dice-6').src = 'dice-' + dice6 + '.png';    
        }
        // 

        if (dice1_active) {dice1sum = dice1;} else {dice1sum = dice1_value};
        if (dice2_active) {dice2sum = dice2;} else {dice2sum = dice2_value};
        if (dice3_active) {dice3sum = dice3;} else {dice3sum = dice3_value};
        if (dice4_active) {dice4sum = dice4;} else {dice4sum = dice4_value};
        if (dice5_active) {dice5sum = dice5;} else {dice5sum = dice5_value};
        if (dice6_active) {dice6sum = dice6;} else {dice6sum = dice6_value};


        roundScore = dice1sum + dice2sum + dice3sum + dice4sum + dice5sum + dice6sum;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        dice1_last = dice1;
        dice2_last = dice2; 
        dice3_last = dice3; 
        dice4_last = dice4; 
        dice5_last = dice5; 
        dice6_last = dice6; 
        dice1_num = dice1_value;
        dice2_num = dice2_value; 
        dice3_num = dice3_value; 
        dice4_num = dice4_value; 
        dice5_num = dice5_value; 
        dice6_num = dice6_value; 
        dices_active_last = (dice1_active + dice2_active + dice3_active + dice4_active + dice5_active + dice6_active);
        dices_active_click_last = dices_active_click -1;
        
        max_dices_active_perclick -= 1;
        console.log(dices_active, dices_active_last, max_dices_active_perclick, dices_active_click, dices_active_click_last)
        
    } else {evaluate_score()}} 
})



// STOP - ROUND: 2 options for stop - i.e. only 1 active dice or hold-button clicked 
function evaluate_score() {if ((roundScore)<=30) {
        // subtract difference from total score 
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        scores[activePlayer] -= (30 - roundScore);
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        dice_visual_extra() ;
        // next player
        // next player
        if(scores[activePlayer]<=0) {
            document.querySelector('#name-' + non_activePlayer).textContent = 'Winner!';
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            document.querySelector('#dice-3').style.display = 'none';
            document.querySelector('#dice-4').style.display = 'none';
            document.querySelector('#dice-5').style.display = 'none';
            document.querySelector('#dice-6').style.display = 'none';
            document.querySelector('.player-' + non_activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + non_activePlayer + '-panel').classList.add('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.getElementById('endgame').style.display = 'block'; 
            gamePlaying = false;
        } else{
            nextPlayer();
            max_dices_active_perclick = 7
            dices_active_last = 6;
            dices_active_click_last = 6;
            dices_active_click = 6;
        } 
    } else {
        scores[activePlayer] = scores[activePlayer];
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        extra_roll = true;
        extra_rolls()
        scores[non_activePlayer] -= penaltypoints; 
        document.querySelector('#score-' + non_activePlayer).textContent = scores[non_activePlayer];
        document.getElementById('penalty').style.display = 'block';
        document.getElementById('penalty').textContent = "-"+penaltypoints;
        // next player
        if(scores[non_activePlayer]<=0) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            document.querySelector('#dice-3').style.display = 'none';
            document.querySelector('#dice-4').style.display = 'none';
            document.querySelector('#dice-5').style.display = 'none';
            document.querySelector('#dice-6').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
            document.querySelector('.player-' + non_activePlayer + '-panel').classList.remove('active');
            document.getElementById('endgame').style.display = 'block'; 
            gamePlaying = false;
        } else{
            nextPlayer();
            max_dices_active_perclick = 7
            dices_active_last = 6;
            dices_active_click_last = 6;
            dices_active_click = 6;
        }   
     }
}















function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    non_activePlayer  === 1 ? non_activePlayer  = 0 : non_activePlayer  = 1;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('dice-3').style.display = 'none';
    document.getElementById('dice-4').style.display = 'none';
    document.getElementById('dice-5').style.display = 'none';
    document.getElementById('dice-6').style.display = 'none';

    document.getElementById('dice-1').style.opacity = '100%';
    document.getElementById('dice-2').style.opacity = '100%';
    document.getElementById('dice-3').style.opacity = '100%';
    document.getElementById('dice-4').style.opacity = '100%';
    document.getElementById('dice-5').style.opacity = '100%';
    document.getElementById('dice-6').style.opacity = '100%';

    document.getElementById('dice-1').style.borderStyle = 'none';
    document.getElementById('dice-2').style.borderStyle = 'none';
    document.getElementById('dice-3').style.borderStyle = 'none';
    document.getElementById('dice-4').style.borderStyle = 'none';
    document.getElementById('dice-5').style.borderStyle = 'none';
    document.getElementById('dice-6').style.borderStyle = 'none';
}


var extra_dices_active;
var dice1iskeynumber = 0;
var dice2iskeynumber = 0;
var dice3iskeynumber = 0;
var dice4iskeynumber = 0;
var dice5iskeynumber = 0;
var dice6iskeynumber = 0;
var diceiskeynumber = 0;
var diceiskeynumber1 = 0;
var diceiskeynumber2 = 0;
var diceiskeynumber3 = 0;
var diceiskeynumber4 = 0;
var diceiskeynumber5 = 0;
var diceiskeynumber6 = 0;
var keynumber;
var penaltypoints = 0;


function extra_rolls() {
    keynumber = roundScore - 30;
    diceiskeynumber = 0;
    dice_visual_extra();
    // roll dices 1st 
    extra_rolls_dices_1st();
    
    check_extra_roll_keynumbers();
    // deactivate keynumber dices - if more than last dice roll continue if not end 
    // add up number of penalty points and subtract from opposite player score 
    


}

function wait(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}


var number_of_extra_rolls = 1;
function check_extra_roll_keynumbers() {
    if(number_of_extra_rolls <= diceiskeynumber && diceiskeynumber !== 0) {
    do { 
        extra_rolls_dices();   
    } while (number_of_extra_rolls <= diceiskeynumber);}  
}

var diceiskeynumberfirst; 
var dice1_active_extra = true;
var dice2_active_extra = true;
var dice3_active_extra = true;
var dice4_active_extra = true;
var dice5_active_extra = true;
var dice6_active_extra = true;

function extra_rolls_dices_1st() {   
    
    number_of_extra_rolls = 0;
    dice1iskeynumber = 0;
    dice2iskeynumber = 0;
    dice3iskeynumber = 0;
    dice4iskeynumber = 0;
    dice5iskeynumber = 0;
    dice6iskeynumber = 0;
    
    if((dice1iskeynumber + dice2iskeynumber + dice3iskeynumber + dice4iskeynumber + dice5iskeynumber + dice6iskeynumber) == 0) {
    if(dice1_active = true) {
        dice1 = Math.floor(Math.random()*6)+1;
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        if(dice1 == keynumber) {
            dice1iskeynumber = 1;
            dice1_active = false;
    } else {dice1iskyenumber = 0 }
    }
    if(dice2_active = true) {
        dice2 = Math.floor(Math.random()*6)+1;
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        if(dice2 == keynumber) {
            dice2iskeynumber = 1;
            dice2_active = false;
    } else {dice2iskyenumber = 0 }
    }
    if(dice3_active = true) {
        dice3 = Math.floor(Math.random()*6)+1;
        document.getElementById('dice-3').src = 'dice-' + dice3 + '.png';
        if(dice3 == keynumber) {
            dice3iskeynumber = 1;
            dice3_active = false;
    }   else {dice3iskyenumber = 0 }
    }
    if(dice4_active = true) {
        dice4 = Math.floor(Math.random()*6)+1;
        document.getElementById('dice-4').src = 'dice-' + dice4 + '.png';
        if(dice4 == keynumber) {
            dice4iskeynumber = 1;
            dice4_active = false;
    }   else {dice4iskyenumber = 0 }
    }
    if(dice5_active = true) {
        dice5 = Math.floor(Math.random()*6)+1;
        document.getElementById('dice-5').src = 'dice-' + dice5 + '.png';
        if(dice5 == keynumber) {
            dice5iskeynumber = 1;
            dice5_active = false;
    }  else {dice5iskyenumber = 0 }
    }
    if(dice6_active = true) {
        dice6 = Math.floor(Math.random()*6)+1;
        document.getElementById('dice-6').src = 'dice-' + dice6 + '.png';
        if(dice6 == keynumber) {
            dice6iskeynumber = 1;
            dice6_active = false;
    }  else {dice6iskyenumber = 0 }
    }
    diceiskeynumber = (dice1iskeynumber + dice2iskeynumber + dice3iskeynumber + dice4iskeynumber + dice5iskeynumber + dice6iskeynumber);
    diceiskeynumberfirst = (dice1iskeynumber + dice2iskeynumber + dice3iskeynumber + dice4iskeynumber + dice5iskeynumber + dice6iskeynumber);
    penaltypoints = (diceiskeynumber*keynumber);
    dice1_active_extra = dice1_active;
    dice2_active_extra = dice2_active;
    dice3_active_extra = dice3_active;
    dice4_active_extra = dice4_active;
    dice5_active_extra = dice5_active;
    dice6_active_extra = dice6_active;

    console.log(diceiskeynumber, number_of_extra_rolls, dice1iskeynumber, dice2iskeynumber, dice3iskeynumber, dice4iskeynumber, dice5iskeynumber, dice6iskeynumber, (diceiskeynumber*keynumber));        
}
}


function extra_rolls_dices() {
    number_of_extra_rolls = (dice1iskeynumber + dice2iskeynumber + dice3iskeynumber + dice4iskeynumber + dice5iskeynumber + dice6iskeynumber)+1; 
    if(dice1_active = true) {
        dice1 = Math.floor(Math.random()*6)+1;
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        if(dice1 == keynumber) {
            dice1iskeynumber = 1;
            dice1_active = false;
    } }
    if(dice2_active = true) {
        dice2 = Math.floor(Math.random()*6)+1;
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        if(dice2 == keynumber) {
            dice2iskeynumber = 1;
            dice2_active = false;
    } }
    if(dice3_active = true) {
        dice3 = Math.floor(Math.random()*6)+1;
        document.getElementById('dice-3').src = 'dice-' + dice3 + '.png';
        if(dice3 == keynumber) {
            dice3iskeynumber = 1;
            dice3_active = false;
    } } 
    if(dice4_active = true) {
        dice4 = Math.floor(Math.random()*6)+1;
        document.getElementById('dice-4').src = 'dice-' + dice4 + '.png';
        if(dice4 == keynumber) {
            dice4iskeynumber = 1;
            dice4_active = false;
    }}  
    if(dice5_active = true) {
        dice5 = Math.floor(Math.random()*6)+1;
        document.getElementById('dice-5').src = 'dice-' + dice5 + '.png';
        if(dice5 == keynumber) {
            dice5iskeynumber = 1;
            dice5_active = false;
    }} 
    if(dice6_active = true) {
        dice6 = Math.floor(Math.random()*6)+1;
        document.getElementById('dice-6').src = 'dice-' + dice6 + '.png';
        if(dice6 == keynumber) {
            dice6iskeynumber = 1;
            dice6_active = false;
    }}
    diceiskeynumber = (dice1iskeynumber + dice2iskeynumber + dice3iskeynumber + dice4iskeynumber + dice5iskeynumber + dice6iskeynumber);
    penaltypoints = (diceiskeynumber*keynumber);
    console.log(diceiskeynumber, number_of_extra_rolls, dice1iskeynumber, dice2iskeynumber, dice3iskeynumber, dice4iskeynumber, dice5iskeynumber, dice6iskeynumber, (diceiskeynumber*keynumber));        
}





document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        nonhold = false
        evaluate_score()
    }
})


// Freeze Dices
var dices_active_click  = 6;

var dice1_value; 
document.getElementById('dice-1').addEventListener('click', function() {
    if(dice1_active = true) {
    document.getElementById('dice-1').style.opacity = '50%'; 
    document.getElementById('dice-1').style.borderStyle = 'solid';
    dice1_active = false;
    dice1_value = dice1_last;
    dices_active_click = (dice1_active+dice2_active+dice3_active+dice4_active+dice5_active+dice6_active);
}})

var dice2_value; 
document.getElementById('dice-2').addEventListener('click', function() {
    document.getElementById('dice-2').style.opacity = '50%'; 
    document.getElementById('dice-2').style.borderStyle = 'solid';
    dice2_active = false;
    dice2_value = dice2_last;
    dices_active_click = (dice1_active+dice2_active+dice3_active+dice4_active+dice5_active+dice6_active);
})

var dice3_value; 
document.getElementById('dice-3').addEventListener('click', function() {
    document.getElementById('dice-3').style.opacity = '50%'; 
    document.getElementById('dice-3').style.borderStyle = 'solid';
    dice3_active = false;
    dice3_value = dice3_last;
    dices_active_click = (dice1_active+dice2_active+dice3_active+dice4_active+dice5_active+dice6_active);
})

var dice4_value; 
document.getElementById('dice-4').addEventListener('click', function() {
    document.getElementById('dice-4').style.opacity = '50%'; 
    document.getElementById('dice-4').style.borderStyle = 'solid';
    dice4_active = false;
    dice4_value = dice4_last;
    dices_active_click = (dice1_active+dice2_active+dice3_active+dice4_active+dice5_active+dice6_active);
})

var dice5_value; 
document.getElementById('dice-5').addEventListener('click', function() {
    document.getElementById('dice-5').style.opacity = '50%'; 
    document.getElementById('dice-5').style.borderStyle = 'solid';
    dice5_active = false;
    dice5_value = dice5_last;
    dices_active_click = (dice1_active+dice2_active+dice3_active+dice4_active+dice5_active+dice6_active);
})

var dice6_value; 
document.getElementById('dice-6').addEventListener('click', function() {
    document.getElementById('dice-6').style.opacity = '50%'; 
    document.getElementById('dice-6').style.borderStyle = 'solid';
    dice6_active = false;
    dice6_value = dice6_last;
    dices_active_click = (dice1_active+dice2_active+dice3_active+dice4_active+dice5_active+dice6_active);
})



// Freeze Dices when Extra-Roll


function dice_visual_extra() {
    document.getElementById('dice-1').style.opacity = '100%'; 
    document.getElementById('dice-1').style.borderStyle = 'none';
    document.getElementById('dice-2').style.opacity = '100%'; 
    document.getElementById('dice-2').style.borderStyle = 'none';
    document.getElementById('dice-3').style.opacity = '100%'; 
    document.getElementById('dice-3').style.borderStyle = 'none';
    document.getElementById('dice-4').style.opacity = '100%'; 
    document.getElementById('dice-4').style.borderStyle = 'none';
    document.getElementById('dice-5').style.opacity = '100%'; 
    document.getElementById('dice-5').style.borderStyle = 'none';
    document.getElementById('dice-6').style.opacity = '100%'; 
    document.getElementById('dice-6').style.borderStyle = 'none';
    dice1_active = true;
    dice2_active = true;
    dice3_active = true;
    dice4_active = true;
    dice5_active = true;
    dice6_active = true;

}


// New Game 
document.querySelector('.btn-new').addEventListener('click', init);











function init() {
    scores = [30, 30];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    dice1_active = true;
    dice2_active = true;
    dice3_active = true;
    dice4_active = true;
    dice5_active = true;
    dice6_active = true;
    nonhold = true;
    round_over = false;
    extra_roll = false;
    non_activePlayer = 1;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('dice-3').style.display = 'none';
    document.getElementById('dice-4').style.display = 'none';
    document.getElementById('dice-5').style.display = 'none';
    document.getElementById('dice-6').style.display = 'none';

    document.getElementById('score-0').textContent = '30';
    document.getElementById('score-1').textContent = '30';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.getElementById('penalty').style.display = 'none';
    document.getElementById('endgame').style.display = 'none'; 

    max_dices_active_perclick = 7
    dices_active_last = 6
    dices_active_click_last = 6;
    dices_active_click = 6;
    dice1_active = true;
    dice2_active = true;
    dice3_active = true;
    dice4_active = true;
    dice5_active = true;
    dice6_active = true;
    dice1_last = Math.floor(Math.random()*6)+1;
    dice2_last = Math.floor(Math.random()*6)+1;
    dice3_last = Math.floor(Math.random()*6)+1;
    dice4_last = Math.floor(Math.random()*6)+1; 
    dice5_last = Math.floor(Math.random()*6)+1;
    dice6_last = Math.floor(Math.random()*6)+1;
    dice1_active_last = true;
    dice2_active_last = true;
    dice3_active_last = true;
    dice4_active_last = true;
    dice5_active_last = true;
    dice6_active_last = true;
    document.getElementById('dice-1').style.opacity = '100%'; 
    document.getElementById('dice-1').style.borderStyle = 'none';
    document.getElementById('dice-2').style.opacity = '100%'; 
    document.getElementById('dice-2').style.borderStyle = 'none';
    document.getElementById('dice-3').style.opacity = '100%'; 
    document.getElementById('dice-3').style.borderStyle = 'none';
    document.getElementById('dice-4').style.opacity = '100%'; 
    document.getElementById('dice-4').style.borderStyle = 'none';
    document.getElementById('dice-5').style.opacity = '100%'; 
    document.getElementById('dice-5').style.borderStyle = 'none';
    document.getElementById('dice-6').style.opacity = '100%'; 
    document.getElementById('dice-6').style.borderStyle = 'none';
}