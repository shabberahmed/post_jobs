import  Express from "express";
import cors from "cors"
import route from "./routes/route.js";
import dotenv from "dotenv";
import conn from "./database/conn.js";
import http from 'http'
import { Server } from "socket.io";
// import { middleware } from "./middleware/middleware.js";
// import conn from "../server/database/conn.js"
const app=Express()
const server=http.createServer(app)
dotenv.config()
app.use(cors())
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:['GET','POST','PUT','DELETE']
    }
})
io.on('connection',(socket)=>{
    console.log("connected",socket.id)
    socket.on('disconnect',()=>{
        console.log('disconnected');
    })
})
app.use(Express.json())
app.use("/api",route)
conn().then(()=>{
    server.listen(1000, ()=>{
        
        console.log("listening on the PORT 1000")
    })
}).catch(err =>{
    console.log(err)
})
export default io