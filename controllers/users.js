
const User = require("../models/user.js");


module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
 };


module.exports.signUp = async (req, res) => {
    try{
    let {username , email , password} = req.body;
    const newUser = new User({email, username});
   const registeredUser = await User.register(newUser, password);
   console.log(registeredUser);
   req.login(registeredUser, (err) => {
    if(err) {
        return next(err);
    }
    req.flash("success" , "Successfully registered , Welcome to WanderLust!");
   res.redirect("/listings");
   });
    } catch(err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

 module.exports.renderLoginForm =  (req, res) => {
    res.render("users/login.ejs");
};


module.exports.login =  async (req, res) => {
   //   let {username, password} = req.body;
    req.flash("success", "Successfully Logged in, Welcome Back to WanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl); 

}; 

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
       return   next(err);
        }
        req.flash("success" , "Successfully Logged Out!");
        res.redirect("/listings");
    });
};









