const {Router} = require("express")
const { getAllToDos, deleteToDo, updateTodo, addToDo, getOneTodo } = require("../controller/todo.controller")

const isAuth = require("../middleware/authorization")
const toDoRouter = Router()

toDoRouter.get("/get_all_todos",isAuth,getAllToDos)
toDoRouter.get("/get_one_todo/:id",isAuth,getOneTodo)
toDoRouter.post("/add_todo",isAuth,addToDo)
toDoRouter.put("/update_todo/:id",isAuth,updateTodo)
toDoRouter.delete("/delete_todo/:id",isAuth,deleteToDo)

module.exports = toDoRouter