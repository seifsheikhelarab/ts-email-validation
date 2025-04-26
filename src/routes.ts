import express from "express";
import { Request,Response } from "express";
import { UserModel } from "./models/user.model.js";
import { sendEmail } from "./config/mail.config.js";

export const router = express.Router();



router.get('/',async (req, res) => {
  if (req.session.user !== undefined) {
    const user = await UserModel.findById(req.session.user._id);
    res.render("index_loggedin",{user})
  }else{
    res.render("index_nouser")
  }
});

router.get("/login", (req, res)=>{
  res.render("login");
});

router.post("/signup", async (req, res)=>{
  const { username, email, password } = req.body;
  const existingUser = await UserModel.findOne({email});
  if(existingUser){
    res.send("user already exists")
  };

  const user = new UserModel({username, email, password});
  await user.save();
  req.session.user = user;
  sendEmail(user.email,user._id.toString());
  res.redirect("/");

})

router.get("/signup", (req, res)=>{
  res.render("signup");
});

router.post("/login", async (req, res)=>{
  const { username, password } = req.body; 
  const user = await UserModel.findOne({username,password}).lean();
  if(user){
    req.session.user = user;
    res.redirect("/");
  }else{
    res.status(404).send("no user found");
  }
});

router.get("/verify/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      res.status(404).send("User not found");
    }

    res.redirect("/");
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/logout",(req,res)=>{
  req.session.destroy((err)=>console.error(err));
  res.redirect("/");
})