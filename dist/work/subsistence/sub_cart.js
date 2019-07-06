"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 12
   Case Problem 2

   Author: Raymond Sotto 
   Date: 11/11/2018   

   Filename: sub_cart.js


   Functions List:
   setupCart() 
      Sets up the event handlers for the Add to Order buttons on the web page.
      
   addItem(e)
      Adds the food item associated with the Add to Order button to the shopping
      cart, keeping track of the number of items of each product ordered by 
      the customer.

*/

// Add an event listener that runs the setupCart() func- tion when the page is loaded
window.addEventListener("load", setupCart);

// Create the setupcart() function. The purpose of this function is to define the event handlers for the Add to Order buttons on the page. Add the following commands to the function

function setupCart() {
	
	// Create a variable named addbuttons, which contains the collection of elements belonging to the addButton class.
	
	var addButtons = document.getElementsByClassName("addButton");
	
	// Loop through the addButtons collection and for each button, add an event handler that runs the addItem() function when the button is clicked 
	
	for (let i = 0; i < addButtons.length; i++) {
		const e = addButtons[i];
		//Event listener for click of one of the addButtons
		e.addEventListener("click", function () {
			addItem(e);
		});
	}
}

//. Create the additem() function, which adds items to the shopping cart on the page. Add the fol- lowing commands to the function:

function addItem(e) {
	
	//The description of the food item is the next sibling element to the button that was clicked by the customer. Use the nextElementSibling	property to reference the next sibling element to the target of the event object. Store the sibling element in the variable fooditem
	
	//Create the foodiD variable, which contains the value of the id attribute for foodItem
    var foodItem = e.nextElementSibling;
    var foodID = foodItem.id;
	
	//. Use the cloneNode() method to create a copy of the foodItem element and all of its descen- dants. Store this node structure in the foodDescription variable
    var foodDescription = foodItem.cloneNode(true);
    var cartBox = document.getElementById("cart");
    console.log(cartBox.childElementCount);

    var duplicateOrder = false;
	  
	//Loop through the element child nodes of cartBox. For each node, determine whether the ID of the element node equals foodID. If it does, the customer has previously placed that menu item in the cart. Increase the value of the first element child of node by 1 to indicate an additional order and then break out of the for loop
	
    for(let e of cartBox.childNodes){
            console.log(e);
            console.log(e.id  + "vs" + foodID);
            if(e.id == foodID){
                console.log("Duplicated");
                e.firstChild.innerText  =parseInt(e.firstChild.innerText) + 1;
                duplicateOrder = true;
                break;
            }
      }
           
    //. After the for loop has completed, test whether duplicateOrder is still false. If it is, then cre- ate a variable named ordercount storing a span element node. Set the text content of the orderCount element to 1. Insert orderCount as the first child of the foodDescription node structure and append foodDescription to cartBox as a new product order
	
    if(!duplicateOrder){
        var orderCount = document.createElement("span");
        orderCount.innerText = 1;
        foodDescription.insertBefore(orderCount, foodDescription.firstChild);
        cartBox.append(foodDescription);
    }

}
