const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const {Login , Signup}= require("./model/loginuser");


const bodyParser =require("body-parser");
const app =express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost:27017/aboutinformation")
.then(()=>{
    console.log("connected to mongodb");
})
.catch(err =>{
    console.log("not connected to mongodb");
});
const port = 2000;
app.get("/",(req,res)=>{
    res.send("hello world");
});

app.post("/loginuser",(req,res)=>{
    const newLoginuser = new (Login);
    newLoginuser.email = req.body.email;
    newLoginuser.password = req.body.password;
    newLoginuser
    .save()
    .then(empObj =>{
        res.send({
            status: true,
            message:"user login succesfully",
            data: empObj,
        });
    })
    .catch(err =>{
        res.send({status:false,message:"error",arror:err
 });
    })
})
//////////////////////////////////////////////////////////Signup/////////////////////////////////////////////////////////////////////////////
app.post("/signup", (req, res) => {
    const newSignupuser = new Signup({
        Name: req.body.Name,
        LastName: req.body.LastName,
        email: req.body.email,
        password: req.body.password
    });

    newSignupuser
        .save()
        .then(empObj => {
            res.send({
                status: true,
                message: "User signed up successfully",
                data: empObj,
            });
        })
        .catch(err => {
            res.send({
                status: false,
                message: "All fields (Name, LastName, email, password) are required",
                error: err
            });
        });
});
///////////////////////////////////////////////////////////////////////update////////////////////////////////////////////////////////////////
app.put("/update/:id", async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }

    const id = req.params.id;

    try {
        const data = await Signup.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!data) {
            return res.status(404).send({
                message: `User not found.`
            });
        }

        res.send({ 
            status: true,
            message: "User updated successfully",
            data: data 
        });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: "An error occurred while updating the user.",
            error: err
        });
    }
});
///////////////////////////////////////////////////////////////////Deleting///////////////////////////////////////////////////////////////////////////
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id; 

    try {
        const deletedUser = await Signup.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).send({
                message: "User not found."
            });
        }
        res.send({
            message: "User deleted successfully.",
            data: deletedUser
        });
    } catch (err) {
        res.status(500).send({
            message: "An error occurred while deleting the user.",
            error: err
        });
    }
});


app.listen(port,()=>console.log(`This app is listening on http://localhost:${port}`));

