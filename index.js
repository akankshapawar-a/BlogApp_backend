import mongoose from "mongoose";
import  express  from "express";
import cors from 'cors';
import userRouter from "./Routes/User.js";
import blogRouter from "./Routes/Blogs.js"
import commentRouter from "./Routes/comment.js";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port =5000;



mongoose.connect('mongodb+srv://akankshapawar131202:root@cluster0.ef5kxxr.mongodb.net/?retryWrites=true').then(()=>{
    console.log("connected to mongoDb");
}).catch((error)=>{
    console.log("Mogodb is failed to connect",error);

})

app.use(cors())
app.use(express.json())
app.use('/api',userRouter)
app.use('/api',blogRouter)
app.use('/api/comment',commentRouter)


app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})

