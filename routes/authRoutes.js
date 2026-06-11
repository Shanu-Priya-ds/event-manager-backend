const authRoutes = require("express").Router();
const passport = require("passport");
const {createUser, authenticateUser} = require("../controllers/authController");
const { generateToken } = require("../utils/auth");

authRoutes.post("/register",(req, res)=>{
   createUser(req, res);
});

authRoutes.post("/login",(req, res)=>{
   authenticateUser(req, res);
});

authRoutes.get("/google", 
   passport.authenticate('google', {scope:['profile', 'email']})
);

authRoutes.get("/google/callback",
   passport.authenticate('google', 
      {session:false, failureRedirect:"/login"}),
      (req, res)=>{
         const token = generateToken(req.user);
          const user =  {
                userId: req.user._id,
                username: req.user.username,
                email: req.user.email
            };
         res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}&user=${JSON.stringify(user)}`);//TODO: need to be updated once UI changes are done
      }
)

module.exports = authRoutes;