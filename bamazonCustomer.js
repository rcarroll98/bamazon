var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",

  database: "bamazon"

});

var isInStock 

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    purchaseQuery();

  });

function displayAllProducts(){
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].product_id + " | " + res[i].product_name + " | " + res[i].price);
        }
        console.log("-----------------------------------");
      });
}

function purchaseQuery() {

    displayAllProducts();

    inquirer
    .prompt({
        name: "item_id",
        type: "input",
        message: "What is the id of the item you'd like to buy?",
    },
    {
        name: "product_quantity",
        type: "input",
        message: "What is the amount of the item you'd like to buy?",
        
      })
    .then(function(answer){
        selectedItem = answer.item_id
        answer.product_quantity
        isInStock()
        if (isInStock == true){
            purchase();
        }
        else{
            console.log("not in stock")
            purchaseQuery();
        }
    })
};

function updateServer(){

    connection.query("UPDATE stock_quantity SET ? WHERE ?", function(err, res) {
        [{
           stock_quantity: answer.quantity 
        },
        {
            id:answer.id
        }]
    })
};
//this function pulls from the server the item_quantity and then subtracts it from the item 
//quantity in the answer


function isInStock(){

    var selectedItem = item_id
    
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
          if (selectedItem > 0) {
            isInStock = true
          }
          else {
            isInStock = false
          }
        }
    })
};

function purchase() {
    //todo get the item quantity from server, minus it, and then run update server
    //pull the current quantity and set it as a var
    var newQuantity = answer.quantity 
    var currentID = answer.id
    connection.query("SELECT * FROM products", function(err, res){ 
        answer.id = currentID
        res[answer.id] = currentID
    })

    newQuantity = currentID - answer.id

    connection.query("UPDATE stock_quantity SET ? WHERE ?", function(err, res) {
        [{
           stock_quantity: newQuantity
        },
        {
            id:answer.id
        }]
    })
};

//todo: make function that creates the 
//error messages that print if they request too many of an item
//





