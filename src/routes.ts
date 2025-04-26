import express from "express";
import { Request,Response } from "express";
import { UserModel } from "./models/user.model.js";
import { sendEmail } from "./config/mail.config.js";

export const router = express.Router();



router.get('/', (req, res) => {
  req.session
  res.render("index",{

  });
});

router.get("/login", (req, res)=>{
  res.render("login");
});

router.post("/signup", async (req, res)=>{
  //console.log(req.body);
  const { username, email, password } = req.body;
  const existingUser = await UserModel.findOne({email});
  if(existingUser){
    res.send("user already exists")
  };

  const user = new UserModel({username, email, password});
  await user.save();
  console.log(user.email);
  console.log(user._id.toString());
  sendEmail(user.email,user._id.toString());
  res.redirect("/");

})

router.get("/signup", (req, res)=>{
  res.render("signup");
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

    console.log("User verified:", user);
    res.redirect("/");
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).send("Internal Server Error");
  }
});
