
var prompt = require('prompt');
var Word = require('./word.js').Word;
var getWord = require('./game.js').Game;

prompt.message = "Question? ";

prompt.start();

game = {
	wordsWon : 0,
	wordsLoss : 0,
	guessesRemaining : 10, //per word
	currentWrd : null, //the word object
	startGame : function (wrd){
		//make sure the user has 10 guesses
		this.resetGuessesRemaining();

		//get a random word (getWord.selectRandomWord) from the file game.js
		//and runs the constructor from the file word.js and places the new Word object into currentWrd
		this.currentWrd = new Word(getWord.selectRandomWord());

		//populate currentWrd (made from Word constructor function) object with letters
		this.currentWrd.getLets();
		process.stdout.write('\033c');
		console.log('  The Word to be guessed: ');
		console.log('  ',this.currentWrd.wordRender());
		console.log('');
		this.keepPromptingUser();

	}, 
	resetGuessesRemaining : function(){
		this.guessesRemaining = 10;
	},
	playAgain : function(){
		prompt.get(['playAgain'],function(err, result){
		    if(result.playAgain.toUpperCase() === "Y"){
		    	game.startGame();
		    }
		});
	},
	keepPromptingUser : function(){
		var self = this;

		prompt.get(['guessLetter'], function(err, result) {
		    // result is an object like this: { guessLetter: 'f' }
		    //console.log(result);
		    var upperLetter = result.guessLetter.toUpperCase();
		    
		    process.stdout.write('\033c');

		    console.log('  The letter you guessed is: ', upperLetter);

		    //this checks if the letter was found and if it is then it sets that specific letter in the word to be found
		    var findHowManyOfUserGuess = self.currentWrd.checkIfLetterFound(upperLetter);

		    //if the user guessed incorrectly minus the number of guesses they have left
		    if (findHowManyOfUserGuess == 0){
		    	console.log('  You guessed wrong!');
		    	self.guessesRemaining--;
		    }else{
		    	console.log('  You guessed right!');

		    	//check if you win only when you are right
	    		if(self.currentWrd.didWeFindTheWord()){
	    			console.log('  The word is : ',self.currentWrd.word);
			    	console.log('  You Won!!!');
			    	self.wordsWon++;
			    	console.log('  Total of wins: ', self.wordsWon);
			    	console.log('  Total of loss: ', self.wordsLoss);
			    	console.log('');
			    	self.playAgain();
			    	return; //end game
			    }
		    }
		    
		    console.log('  Guesses remaining: ', self.guessesRemaining);
		    console.log('  here are the letters you guessed already: ');
		    console.log('  ',self.currentWrd.wordRender());
		    console.log('');

		    if ((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
		    	self.keepPromptingUser();
		    }
		    else if(self.guessesRemaining == 0){
		    	console.log('  Game over bro, the word was: ', self.currentWrd.word);
		    	self.wordsLoss++;
		    	console.log('  Total of wins: ', self.wordsWon);
			    console.log('  Total of loss: ',self.wordsLoss);
		    	console.log('');
		    	self.playAgain();
		    }else{
		    	console.log('  ',self.currentWrd.wordRender());
		    }
		});
	}


};

game.startGame();