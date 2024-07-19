const express=require("express");
const app=express();
const cors=require("cors");
const cookieParser=require("cookie-parser");
const bodyParser = require("body-parser");

require("dotenv").config();
const PORT=process.env.PORT ||4000;

app.use(cookieParser());
// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cors(
//     {
//         origin:"*",
//         credentials:true,
//         exposedHeaders: ['Authorization'],
        

//     }
// ))

app.use(cors({
    origin: 'http://localhost:8081',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Enable credentials (cookies, HTTP authentication)
}));

require("./Config/database").dbConnect();

const user=require("./Routes/user");
app.use("/api/auth",user);

app.listen(PORT,()=>{
    console.log(`App is listning on port ${PORT}`);
})