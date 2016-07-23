// This file store the words to be guessed and will randomly select a word for the player.
exports.Game = {
	wordBank : ["heart and soul", "relax", "burning up", "manic monday",
				"into the groove", "invisible touch", "rebel yell",
				"piece of cake", "break the ice", "last straw",
				"miss the boat", "whole nine yards", "cry wolf",
				"making a scene", "love birds", "down To earth"],
	selectRandomWord : function(){
		var selectedWord = this.wordBank[Math.floor(Math.random()*this.wordBank.length)];
		selectedWord = selectedWord.toUpperCase();
		return selectedWord;
	}
};