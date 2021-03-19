const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User =require("./models/user");

require("dotenv/config")
app.use(express.json());
port = process.env.PORT || 3000;
app.get("/",(req,res) =>{
    res.send("First Request");
});

app.get("/users",(req,res) =>{
    let us =["A","B","C"];
    res.send({
        users: us,
    });
});
 
app.post("/create_user", async(req,res) =>{
    //console.log(req.body);

    try {
        const myuser = new User(req.body);
        const check = await myuser.save();
        res.send(`Created New User ${req.body.name}`);
    } catch (error) {
        res.send(error);
    }


    res.send(`created user ${req.body.name}`);
});


app.patch("/user/:id",async(req,res) =>{
    try {
        const _id= req.params.id;
       const updateUser = await User.findByIdAndUpdate(_id,req.body,{
           new:true
       });
       res.send(updateUser);
        
    } catch (e) {
        res.status(400).send(e);
    }
})


mongoose.connect(process.env.DB_Connection,
{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false}).then(() =>{
    console.log("Connected to Database");
}).catch((e) =>{
    console.log(e);
})
    

app.listen(port,() =>{
    console.log(`Running on port ${port}`);
});