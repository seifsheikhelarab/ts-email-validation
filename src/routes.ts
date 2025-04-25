import express from "express";
import ejs from "ejs";
import { UserModel } from "./models/user.model.js";

export const router = express.Router();


const user = {
  username: 'john_doe',
  email: 'john.doe@example.com',
  isVerified: true
};


router.get('/', (req, res) => {
  res.render("index",{user});
});

router.get("/login", (req, res)=>{
  res.render("login");
});

router.post("/signup", async (req, res)=>{
  console.log(req.body);
  const { username, email, password } = req.body;
  const existingUser = await UserModel.findOne({email});
  if(existingUser){
    res.send("user already exists")
  };

  const user = new UserModel({username, email, password});
  await user.save();
  console.log(user._id.toString());
  res.redirect("/");

})

router.get("/signup", (req, res)=>{
  res.render("signup");
});

router.get("/email",(req, res)=>{
  res.render("email",{user, verificationUrl: "balls"})
})