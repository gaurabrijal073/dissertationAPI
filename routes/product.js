const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const auth = require('../middleware/auth');
const upload = require('../middleware/uploads');

router.post('/product/insert',
    auth.verifyUser, auth.verifyAdmin,
    upload.single('productImage'), function (req, res) {
        console.log(req.file)

        if (req.file == undefined) {
            return res.status(400).json({
                message: "Invalid File Format"
            })
        }
        const productName = req.body.productName;
        const productPrice = req.body.productPrice;
        const productDescription = req.body.productDescription;
        const productQuantity = req.body.productQuantity;
        const productComment = req.body.productComment;
        const path = req.file.path;

        const productAdd = new Product({
            productName: productName,
            productImage: path,
            productPrice: productPrice,
            productDescription: productDescription,
            productQuantity: productQuantity,
            productComment: productComment
        })
        productAdd.save()
            .then(function (result) {
                res.status(201).json({ message: result })
            })
            .catch(function (err) {
                res.status(500).json({ error: err })
            })
    })

// update
router.put('/product/update/:id',
    upload.single('productImage'),
    auth.verifyUser, auth.verifyAdmin,
    function (req, res) {
        console.log(req.body)
        const productName = req.body.productName;
        const productPrice = req.body.productPrice;
        const productDescription = req.body.productDescription;
        const productQuantity = req.body.productQuantity;
        const productid = req.params.id;
        Product.updateOne({ _id: productid },
            {
                productName: productName,
                productPrice: productPrice,
                productDescription: productDescription,
                productQuantity: productQuantity,
                productImage: req.file.path
            })
            .then(function (d) {
                res.status(200).json({ message: "Updated" })
            })
            .catch(function (e) {
                res.status(500).json({ error: e })
            })


        // Product.updateOne({_id:req.body}, req.body)
        // .then()
        // .catch()


    })

router.delete("/product/delete/:id",
    auth.verifyUser, auth.verifyAdmin,
    function (req, res) {
        const productid = req.params.id
        Product.deleteOne({ _id: productid })
            .then(res.send({ message: "Delete success", status: true }))
    })

router.get("/product/show", function (req, res) {
    Product.find().then(function (ff) {
        console.log(ff)
        res.status(200).json({
            success: true,
            data: ff
        })
        // console.log(data)
    }).catch(function (e) {
        console.log(e)
        res.status(500).json({ error: e.message })
    })
})

router.get("/product/show/:id", function (req, res) {

    // for single product display
    const productid = req.params.id
    Product.findOne({ _id: productid }).then(function (ff) {
        res.status(200).json({success:true,data:[ff]})
    }).catch(function (e) {
        res.status(500).json({ error: e })
    })

})

module.exports = router