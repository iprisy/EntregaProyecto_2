const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require("cookie-parser");
const displayRoutes=require("express-routemap");
const passport=require("passport");

//Implementación interna
const authRoutes=require ('../src/routes/auth.routes')
const userRoutes=require ('../src/routes/user.routes')
const notesRoutes=require ('../src/routes/notes.routes')
const productRoutes=require ('../src/routes/product.routes')
const cartRoutes=require ('../src/routes/carts.routes');
const initializePassport = require('./config/pasport.config');


const app=express()

const PORT=5000;
const DB_HOST="127.0.0.1";
const DB_PORT=27017;
const DB_NAME="ProyectoFinal";

const MONGO_URL=`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//Añadir passwport function con estrategias


initializePassport();
app.use(passport.initialize());

//Base  Routes
app.use("/api/authentication", authRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/notes/", notesRoutes);
mongoose
.connect(MONGO_URL)
.then((con)=>{
    console.log("🚀 ~ file:23 ~ mongoose.connect - OK")
})
.catch((err)=>{
    console.log ("Error: ", err)
})

app.listen(PORT, ()=>{
    displayRoutes(app);
    console.log("🚀 ~ app.js 31 ~ PORT:", PORT);
    
})
    console.log("🚀 ~ app.listen ~ app:", app)
    console.log("🚀 ~ app.listen ~ displayRoutes:", displayRoutes)
