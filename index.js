const express = require("express")
const cors = require("cors")
require("dotenv").config()
const todoRouter = require("./router/todo.routes")
const authRouter = require("./router/auth.routes")

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3000




app.use(todoRouter)
app.use(authRouter)

app.listen(PORT, () =>{
    console.log("Server is running at", PORT);
    
})