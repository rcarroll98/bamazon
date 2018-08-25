var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
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
       

        isInStock()
        if (isInStock == true){

        }
        
        else{
            console.log("not in stock")
        },
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

var isInStock 
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
    connection.query("UPDATE stock_quantity SET ? WHERE ?", function(err, res) {
        [{
           stock_quantity: answer.quantity 
        },
        {
            id:answer.id
        }]
    })
};

purchaseQuery()

updateServer()

purchace();