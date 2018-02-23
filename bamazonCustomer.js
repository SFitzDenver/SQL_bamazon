var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 8889,

	// username
	user: "root",

	password: "root",
	database: "bamazon_DB"
});

// var res = [];
// var inquirerResponse = {};

connection.connect(function(err) {
	if (err) throw err;
	// console.log("\nconnected as id " + connection.threadId + "\n");
	readProducts();
});


function readProducts() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		console.log("\nProducts for Sale:");
		for (var i = 0; i < res.length; i++) {
			console.log("Item ID: " + res[i].id + " | " + res[i].product_name + " |  Price: $" + res[i].price);
		}

		askQuestions();
	});
}


function askQuestions() {
	connection.query("SELECT * FROM products", function(err, res) {
		// console.log(res);
	inquirer
	.prompt([
	{
		type: "input",
		name: "id",
		message: "\nWhich Item ID would you like to purchase?",
	},
	{
		type: "input",
		name: "units",
		message: "\nHow many units would you like to purchase?",
	}
	])
	.then(function(inquirerResponse) {
		// console.log(inquirerResponse);

	if (inquirerResponse.units <= res[inquirerResponse.id - 1].stock_quantity) {
		// console.log(parseInt(inquirerResponse.units));
		// console.log(parseInt(res[inquirerResponse.id - 1].stock_quantity));
		console.log("\nIt's yours!");

		var query = connection.query(
		"UPDATE products SET ? WHERE ?",
			[
			{
				stock_quantity: res[inquirerResponse.id - 1].stock_quantity - inquirerResponse.units
			},
			{
				id: inquirerResponse.id
			}
			],

		);
		console.log("\nYour total charge is: $" + res[inquirerResponse.id - 1].price * inquirerResponse.units);
		// console.log(res[inquirerResponse.id - 1].stock_quantity - inquirerResponse.units);
		// console.log(res[inquirerResponse.id - 1].stock_quantity);

	} else if (res[inquirerResponse.id - 1].stock_quantity === 0) {
		console.log("\nSorry, that item is currently out of stock.");
		inquirer
		.prompt([
		{
			type: "confirm",
			name: "differentProduct",
			message: "\nWould you like to purchase a different item?",
			default: false
		}
		])
		.then(function(confirmDifferent) {
			if (confirmDifferent.differentProduct === true) {
				askQuestions();
			} else {
				console.log("\nThank you for shopping. Please come again soon.");
			};
		})

	} else {
		console.log("\nSorry, we only have " + res[inquirerResponse.id-1].stock_quantity + " in stock.");
		inquirer
		.prompt([
		{
			type: "confirm",
			name: "orderFewer",
			message: "\nWould you like to purchase " + res[inquirerResponse.id - 1].stock_quantity + "?",
			default: false
		}
		])
		.then(function(confirmResponse) {
			// console.log(confirmResponse);
			if (confirmResponse.orderFewer == true) {
			console.log("\nGreat!");
			var query2 = connection.query(
				"UPDATE products SET ? WHERE ?",
				[
				{
					stock_quantity: 0
				},
				{
					id: inquirerResponse.id
				}
				],
				);
			console.log("\nYour total charge is: $" + res[inquirerResponse.id - 1].price * res[inquirerResponse.id - 1].stock_quantity);
			} else {
				console.log("\nThank you for shopping. Please come again soon.");
			}
		})

		};
	});
});
}


