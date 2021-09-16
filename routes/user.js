const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {check, validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { route } = require('./product');
const auth = require('../middleware/auth');
const cookieParser = require('cookie-parser');
const upload = require('../middleware/uploads');
const { single } = require('../middleware/uploads');

// --------- registration system ------------
router.post('/user/register', [
    check('fullName', 'Name is required!').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid email!').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('mobileNumber', 'Mobile Number is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty()


] , function(req, res){
    console.log(req.body)

    const errors = validationResult(req);
    console.log(errors)
    // res.send(errors.array());

    if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
    } 
    else {
        const fullName = req.body.fullName;
        const email = req.body.email;
        const password = req.body.password;
        const mobileNumber = req.body.mobileNumber;
        const address = req.body.address;

        bcryptjs.hash(password, 10 , function(err, hash){
            const register = new User({
                fullName : fullName,
                email : email,
                password : hash,
                mobileNumber : mobileNumber,
                address : address,
                role: req.body.role
            })
            register.save()
            .then(function(result){
                res.status(201).json({success : true, user: register})
            })
            .catch(function(err){
                console.log(err)
                res.status(500).json({success: false, error : err})
            })
        })
        }
})

// --------- login system ---------
router.post('/user/login', function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
    .then(function(userData){
        if(userData === null){
            // username xaina vane
            return res.status(401).json({message : "Invalid credentials!!"})
        }
        // if username exists
        bcryptjs.compare(password, userData.password, function(err, result){
            if(result === false){
                // password wrong xa vane
                return res.status(401).json({message : "Invalid credentials!!"})
            }
            // sabai thik xa vane
            // res.send('thik xaaaaaaaaaaaaaaaaaa');

            // then generate token -ticket
            const token = jwt.sign({userId : userData._id, email : userData.email}, 'anysecretkey');
            return res.status(200).json({success : true, token : token, user: userData}) // pass userdata for displaying username in nav

        })
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })
})

// -------- user update ----------
router.put('/user/update', auth.verifyUser, auth.verifyCustomer, function(req, res){
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    const mobileNumber = req.body.mobileNumber;
    const address = req.body.address;
    const userID = req.body.userID

    User.updateOne({_id:userID},
            {fullName : fullName,
            email : email,
            password : password,
            mobileNumber : mobileNumber,
            address : address        
    })
    .then(function(){
        res.status(200).json({message:"User details updated successfully"})
    })
    .catch(function(er){
        res.status(500).json({error:er})
    })
    
})

// ---------- user delete -----------
router.delete("/user/delete/:id", function(req, res){
    const userID = req.params.id
    User.deleteOne({_id:userID})
    .then(res.send({message:"User deleted successfully", status: true}))
})

// -------- display all the users ----------

// ----- display all users -------
router.get("/user/show", function(req, res){
    User.find().then(function(user){
        res.status(200).json(user)
    }).catch(function(err){
        res.status(500).json(err)
    })
})

// ----- display single specific user -------
router.get("/user/show/:id", function(req, res){
    const userID = req.params.id
    User.findOne({_id:userID}).then(function(user){
        res.status(200).json(user)
    }).catch(function(err){
        res.status(500).json(err)
    })
})

// router.put('/user/uploadProfile/:id', upload.single('image'), userController.uploadImage);
router.put("/user/:id/photo", upload.single('image'),async (req,res)=>{
    const id = req.params.id;

  if (!req.file) {
    return res.status(200).json(
      {
        success: false,
        message: "update failed",
      }
    );
  }

  var file = req.file.path;

  data = {
    userProfile: file
  };

  await User.findOne({ _id: id }).then(async data => {
    data.userProfile = file;
    await data.save();
    // .then((data) => {
    //   console.log(data)
    console.log(data)
    return res.status(200).json(
      {
        success: true,
        data: data.userProfile
      }
    );
  })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        message: "update failed",
      });
    });
})

module.exports = router;