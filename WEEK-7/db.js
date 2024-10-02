const mongoose =require('mongoose')
const ObjectId = mongoose.ObjectId

mongoose.connect('mongodb+srv://hr731977:uQC3UZTgJwSeka54@cluster0.vu9hy.mongodb.net/todo-app-test')

// initializze the schema
const Schema =mongoose.Schema

const User = new Schema({
    email:String,
    password:String,
    name:String

})

const Todo = new Schema({
    title:String,
    done:Boolean,
    userId:ObjectId
})

const UserModel = mongoose.model('users',User)
const TodoModel = mongoose.model('todos',Todo)

//exporting this file

module.exports ={
    UserModel: UserModel,
    TodoModel:TodoModel
}