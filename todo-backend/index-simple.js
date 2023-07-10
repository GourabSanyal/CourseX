const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

let todos = [];

app.get("/", (req, res) => {
  res.send("home route");
});

// function to find an index

function findIndex(arr, id) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id === id) 
      return i;
    
  }
  return -1;
}

// delete a certain todo

function removeAtIndex(arr, index) {
  let newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (i !== index) newArr.push(arr[i]);
  }
  return newArr;
}

// get all todo item
app.get("/todos", (req, res) => {
  res.send(todos);
});

// create a new todo item
app.post("/todos", (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 100000),
    title: req.body.title,
    description: req.body.description,
  };

  todos.push(newTodo);
  res.status(200).json(newTodo);
});

// delete an todo with id

app.delete("/todos/:id", (req, res) => {
  const todoIndex = findIndex(todos, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos = removeAtIndex(todos, todoIndex);
    res.status(200).send();
  }
});

// get a certain todo item by id

// app.get('/todos/:id', (req, res) => {
//     const todoId = findIndex(todos, parseInt(req.params.id))

//     if ( todoId === -1){
//         res.status(404).send();
//     } else {
//         return res.json(todos[todoId])
//     }
// })

app.listen(3000, () => console.log("server is listening... "));
