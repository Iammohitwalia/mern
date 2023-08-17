const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Authenticate = require('../middleware/authenticate');


require('../db/conn');
const User = require('../model/userSchema');
//call get request 
router.get('/',(req, res) => {
    res.send('hello world from mohit walia auth.js');
});

// //call post request with promise without async
// router.post('/register',  (req, res) => {
//     const {name, email, work, phone, password, cpassword} = req.body;
//     // console.log(name);
//     // console.log(email);
//     // console.log(work);
//     // console.log(phone);
// if(!name || !email || !phone || !work || !password || !cpassword){
//     return res.status(422).json({error: "Plz fill the fileds properly"});
//     }

    
//     User.findOne({email:email})
//     .then((userExist) =>{
//         if(userExist){
//             return res.status(422).json({error: "email are existed already"});
//         }
//     const user = new User({name, email, work, phone, password, cpassword})

// user.save().then(() => {
//     res.status(201).json({message:"user registerred successfully"});
// }).catch((err)=>{
//     res.status(500).json({error:'Failed to registered'});
// })

//     }).catch(err => {
//         console.log(err);
//     });
// // res.send('ha ye runn hai')
// //postman api
// // res.json({message:req.body})
// });

//call post request   with async user registration signup function
router.post('/register', async (req, res) => {
    const {name, email, work, phone, password, cpassword} = req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
            return res.status(422).json({error: "Plz fill the fileds properly"});
            }

            try{
                const userExist = await User.findOneAndDelete({email:email});
                if(userExist){
                    return res.status(422).json({error: "email are existed already"});
                }else if(password != cpassword){
                    return res.status(422).json({error: "password does not matched"});
                }else{
                const user = new User({name, email, work, phone, password, cpassword});

                await user.save();
                res.status(422).json({message: "user is registred succses"});
            }
            }catch(err){
                console.log(err);
            }
});




//login code backend portion
router.post('/signin', async (req, res) => {
//   console.log(req.body);
//disstruct data into multiple ways and easy to use for others
try{
    let token;
const {email, password} = req.body;
if(!email || !password){
    return res.status(400).json({error:"Please fill the data"})
}
//read db data mongoose methods
const userLogin = await User.findOne({email:email});


if(userLogin){
    const isMatch = await bcrypt.compare(password, userLogin.password);

//jwt json web token genration code 
 token = await userLogin.generateAuthToken();
 //console.log(token);
res.cookie("jwtoken", token, {
    expires:new Date(Date.now() + 256707900000),
    httpOnly: true
});

    if(!isMatch){
        res.json({error:'user is not signed'});
    
    }else{
    res.json({message:'user is sign in successfully'});
    }
}else {
    res.status(422).json({error: "invalid creds password"});
}





}catch(err){
console.log(err)
}
});


router.get('/about', Authenticate, (req, res) => {
    console.log('gg');
        res.send(req.rootUser);
    });

module.exports = router;