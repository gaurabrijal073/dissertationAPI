const jwt = require('jsonwebtoken');
const User = require('../models/user')

// Guard 1
module.exports.verifyUser = function(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1]
        const data = jwt.verify(token, 'anysecretkey');
        User.findOne({_id : data.userId})
        .then(function(userData){
            req.user = userData
            next();
        })
        .catch(function(er){
            res.status(401).json({error:er})
        })
    }
    catch(e){
        res.status(401).json({error: e})
    }   
}

// Guard 2
module.exports.verifyCustomer = function(req, res, next){
    if(!req.user){
        return res.status(401).json({message : "Unauthorized!"})
    }
    else if(req.user.role === 'customer') {
        next()
    } else {
        return res.status(400).json({message : "Unauthorized!"})

    }
}

module.exports.verifyAdmin = function(req, res, next){
    if(!req.user){
        return res.status(401).json({message : "Unauthorized!"})
    }
    else if(req.user.role === 'admin') {
        next()
    } else {
        return res.status(400).json({message : "Unauthorized!"})

    }
}