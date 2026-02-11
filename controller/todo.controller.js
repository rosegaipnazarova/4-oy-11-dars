const {read_file, write_file} = require("../api/file-system");

const uuid = require("uuid")

const getAllToDos = async(req, res) =>{
    try{
        const toDo = read_file("todo.json")

        if (req.user.role === "admin" || req.user.role === "superadmin") {
            return res.status(200).json(toDo)
            
        }
        const myToDo = toDo.filter(item => item.userId === req.user.id);
        res.status(200).json(myToDo)
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }


}

const getOneTodo = async (req, res) =>{
    try{
        const {id} = req.params
        const toDo = read_file("toDo.json")

        const foundedToDo = toDo.find((item) => item.id ===id)

        if (!foundedToDo) {
            return res.json({
                message : "Not found"
            })
            
        }

        res.status(500).json(foundedToDo)
    }catch(error){
        res.status(500).json({
            message: error.message
        })

    }
}


const addToDo = async (req, res) =>{
    try{
        const {title,desc} = req.body

        const toDo = read_file("todo.json")

        toDo.push({
            id: uuid.v4(),
            title,
            desc,
            userId:req.user.id,
            ownerName: req.user.username,
            isCompleted: false,
            createdAt: new Date().toLocaleString()
        })
        write_file("todo.json", toDo)
        res.status(200).json({
            message: "Added new todo"
        })


    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}



const updateTodo = async (req, res) =>{
try{
    const {id} = req.params

    const {title, desc} = req.body

    const toDo = read_file("todo.json")

    const foundedToDo= toDo.find((item) => item.id ===id)

    if (!foundedToDo) {
        return res.json({
            message: "Not found"
        })
        
    }

toDo.forEach((item) =>{
    if (item.id) {
        if(req.user.role==="admin" || req.user.role=== "superadmin" || item.userId === req.user.id){
            item.title = title ? title : item.title
             item.desc = desc ? desc : item.desc
    }
}
})
write_file("todo.json",toDo)
  res.status(200).json({
            message: "Updated todo"
        })
    } catch (error){
    res.status(500).json({
            message: error.message
        })
}
}


const deleteToDo = async (req, res) =>{
    try{
        const {id} = req.params
         const toDo = read_file("todo.json")

    const foundedToDo = toDo.findIndex((item) => item.id ===id)

    if(foundedToDo === -1){
         return res.json({
            message: "not found"
        })
    }

    toDo.forEach((item,idx) =>{
        if (item.id === id) {
            toDo.splice(idx,1)
            
        }
    })

    write_file("todo.json",toDo)
      res.status(200).json({
            message: "Delete todo"
        })

    }catch(error){
       res.status(500).json({
            message: error.message
        }) 
    }
}
module.exports = {
    getAllToDos,
    getOneTodo,
    addToDo,
    updateTodo,
    deleteToDo
}