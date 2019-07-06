"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 14
   Case Problem 1

   Author: Raymond Sotto 
   Date: 11/30/2018   
   
   Filename: bu_bubbles.js

*/


//Create an object literal for the box object.
var box = {
	width: 1024,
	height: 500
};

//Create object constructor function for the bubble class of objects.
function bubble(size, img) {
	this.radius = size,
	this.imageURL = img,
	this.xVelocity = null,
	this.yVelocity = null,
	this.xPos = null,
	this.yPos = null,
	this.opacity = 1,
	this.hue = 0,
	this.rotate = 0,
	this.rotateDirection = 1;
};

// Create the following methods for the bubble prototype:

//fadebubble() method that causes the bubble to fade by reducing its opacity.
bubble.prototype.fadeBubble = function() {
	this.opacity -= 0.0005;
};

//changecolor() method that changes the hue of the bubble.
bubble.prototype.changeColor = function() {
	this.hue += 3;
	this.hue %= 360;
};

// rotatebubble() rotates the bubble. 
bubble.prototype.rotateBubble = function() {
	this.rotate += this.rotateDirection;
	this.rotate %= 360;
};

//. Create the movebubble() method for the bubble prototype that moves the bubble across the bubble box, bouncing the bubble off the box’s wall if necessary. The method has two arguments: height and width defining the height and width of the box.

bubble.prototype.moveBubble = function(height, width) {
	//Variables to define the extent of the bubble
	var bubbleTop = this.yPos;
	var bubbleBottom = (this.yPos + this.radius);
	var bubbleLeft = this.xPos;
	var bubbleRight = (this.xPos + this.radius);
	
	//Determines bubble has hit the top or bottom wall
	if (bubbleTop < 0 || bubbleBottom > height) {
		this.yVelocity = -this.yVelocity;
	}
	
	//Determines bubble has hit the left or right wall
	if (bubbleLeft < 0 || bubbleRight > width) {
		this.xVelocity = -this.xVelocity;
	}
	
	//Move the bubble to its new location by adding the value of the yVelocity property to yPos and adding the value of the xVelocity property to xPos
	this.yPos += this.yVelocity;
	this.xPos += this.xVelocity;
};


window.addEventListener("load", function() {
   // Reference to the bubble box
   var bubbleBox = document.getElementById("bubbleBox");
   
   // Create a new bubble every half-second
   setInterval(function() {
      
      // Do not create more than 20 bubbles at any one time
      if (bubbleBox.childElementCount <= 20) {
		  
		  
		  //Declare the newbubble variable using the new bubble() object constructor to create a bubble. Set the size of the bubble to a random size between 50 and 120 and the image file to “bu_bubbleint.png”, where int is a random integer from 1 to 10.
			var newBubble = new bubble(randInt(50, 120), "bu_bubble" +
				randInt(1, 10) + ".png");
			newBubble.xPos = box.width/2;
			newBubble.yPos = box.height/2;
			newBubble.xVelocity = randInt(-5,5);
			newBubble.yVelocity = randInt(-5,5);
			newBubble.rotate = randInt(0,360);
			newBubble.rotateDirection = randInt(-2,2);
			
			//Create an inline image displaying the bubble image within the bubble box. Add the following commands to create the bubble image:
			var bubbleImg = document.createElement("img");
			bubbleImg.style.position = "absolute";
			bubbleImg.setAttribute("src", newBubble.imageURL);
			bubbleImg.style.width = newBubble.radius + "px";
			bubbleImg.style.left = newBubble.xPos +"px";
			bubbleImg.style.top = newBubble.yPos + "px";
			//Appends the bubble to the bubbleBox
			bubbleBox.append(bubbleImg);
			
			//Insert commands to animate its appearance. Within the if statement, add a setInterval() method that repeats an anonymous function every 25 milliseconds, storing the ID of the setInterval() method in the bubbleInterval variable.
			var bubbleInterval = setInterval(function() {
				newBubble.fadeBubble();
				
				//Bubble disappears when opacity is less than 0
				if (newBubble.opacity < 0) {
					bubbleBox.removeChild(bubbleImg);
					clearInterval(bubbleInterval);
				} else {
					//Image is moved and rotated around the box while opacity and color change.
					bubbleImg.style.opacity = newBubble.opacity;
					newBubble.changeColor()
					bubbleImg.style.filter = "hue-rotate(" +newBubble.hue+ "deg)";
					newBubble.rotateBubble();
					bubbleImg.style.transform = "rotate(" +newBubble.rotate+ "deg)";
					newBubble.moveBubble(box.height, box.width)
					bubbleImg.style.left = newBubble.xPos + "px";
					bubbleImg.style.top = newBubble.yPos + "px";
				}
			}, 25)
      }
      
   }, 500);

   /* Function to return a random integer between minVal and maxValue inclusive */
   function randInt(minVal, maxVal) {
      var size = maxVal - minVal + 1;
      return Math.floor(minVal + size*Math.random());
   }  

});