const express = require("express")
const cors = require("cors")
require("dotenv").config()
const todoRouter = require("./router/todo.routes")
const authRouter = require("./router/auth.routes")

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.json({
        message: "Server muvaffaqiyatli ishlayapti!",
        status: "Online"
    });
});


app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).json({ message: "Kutilmagan xatolik yuz berdi" });
});


app.use(todoRouter)
app.use(authRouter)

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server is running at", PORT);

})