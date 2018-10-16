var inquirer = require("inquirer");
const { Client, Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || '127.0.0.1.3456';
new Client(connectionString);

const pool = new Pool({
    user: process.env.USER,
    host: 'localhost',
    database: 'bamazon',
    password: null,
    port: 5432
})

const client = new Client({
    user: process.env.USER,
    host: 'localhost',
    database: 'bamazon',
    password: null,
    port: 5432
})
client.connect()

async function start() {
    await client.connect()

    await client.end()

    await client.connect()

    await client.end()
};

start();

var answer

var isInStock

var selectedItem

var selectedQuantity

var isInStockBool

var newQuantity

var itemQuantity

var resRows

function displayAllProducts() {
    const query = {
        text: "SELECT id, product_name, price FROM products",
        rowMode: 'array',
    }

    client.query(query, function (err, res) {
        resRows = res.rows
        for (var i = 0; i < resRows.length; i++) {
            console.log(resRows[i]);
        }

        askID()
    })
}

function askID() {

    inquirer
        .prompt({
            name: "item_id",
            type: "input",
            message: "What is the id of the item you'd like to buy?",
        })
        .then(function (answer) {
            selectedItem = answer.item_id
            askQuantity(selectedItem);
        })
};

function askQuantity(selectedItem) {
    console.log("You selected: " + selectedItem)
    inquirer
        .prompt({
            name: "product_quantity",
            type: "input",
            message: "What is the amount of the item you'd like to buy?",
        })
        .then(function (answer) {
            selectedQuantity = answer.product_quantity
            checkInventory(selectedItem, selectedQuantity);
        });
};

function checkInventory(selectedItem, selectedQuantity) {
    var query = {
        text: "SELECT stock_quantity FROM products where id = " + selectedItem,
        rowMode: 'array',
    }

    var resRow
    var itemQuantity 
    console.log("You selected: " + selectedQuantity)
    client.query(query, function (err, res) {
        resRow = res.rows
        itemQuantity = resRow
        console.log(resRow)
        if (resRow <= selectedQuantity){
            purchase(selectedItem, selectedQuantity, itemQuantity)
        }else{
            console.log("Item is out of stock.")
        }

    });
};

function start() {
    displayAllProducts();

}

function purchase(selectedItem, itemQuantity, selectedQuantity) {
    var newQuantity;
    newQuantity = itemQuantity - selectedQuantity

    var query = {
        text: "UPDATE stock_quantity SET ? WHERE ?",
        rowMode: 'array',
    }

    client.query(query, function (err, res) {
        if (err) throw (err);
        [{
            stock_quantity: newQuantity
        },
        {
            id: selectedItem
        }]
    })
    console.log('Your total is: ' + total + '. Thanks for shopping')
};
