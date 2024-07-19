const express = require("express")
const router = express.Router()

const Product = require("../model/product")
const { upload } = require("../multer")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/Errorhandler")
const Shop = require("../model/shop")
const { isSeller, isAuthenticated } = require("../middleware/auth");

const fs = require('fs')
const Order = require("../model/order")

//create Product


router.post("/create-product", upload.fields([
    { name: 'images' },
    { name: 'withchainimages' },
    { name: 'withchainoutimages' },
    { name: 'YellowGoldclr' },
    { name: 'RoseGoldclr' },
    { name: 'WhiteGoldclr' },
    { name: 'enamelColors[0].enamelColorImages' },
    { name: 'enamelColors[0].enamelColorName' },
    { name: 'enamelColors[1].enamelColorImages' },
    { name: 'enamelColors[1].enamelColorName' },
    { name: 'enamelColors[2].enamelColorImages' },
    { name: 'enamelColors[2].enamelColorName' },




]), catchAsyncErrors(async (req, res, next) => {
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);

        if (!shop) {
            return next(new ErrorHandler("Shop ID is invalid", 400));
        }

        const files = req.files;
        const imageUrls = files.images.map((file) => file.filename);

        const withChainFiles = files.withchainimages ? files.withchainimages.map((file) => file.filename) : [];
        const withChainoutFiles = files.withchainoutimages ? files.withchainoutimages.map((file) => file.filename) : [];


        const YellowGoldclrFiles = files.YellowGoldclr ? files.YellowGoldclr.map((file) => file.filename) : [];
        const RoseGoldclrFiles = files.RoseGoldclr ? files.RoseGoldclr.map((file) => file.filename) : [];
        const WhiteGoldclrFiles = files.WhiteGoldclr ? files.WhiteGoldclr.map((file) => file.filename) : [];

        // Handle enamelColorImages


        const enamelColors = [];

        // Iterate through req.files.enamelColors
        if (files.enamelColors && Array.isArray(files.enamelColors)) {
            for (let i = 0; i < files.enamelColors.length; i++) {
                const enamelColorName = req.body.enamelColors[i].enamelColorName;

                // Assuming each enamel color can have its own set of images
                const enamelColorImagesUrls = files.enamelColors[i].enamelColorImages.map((file) => file.filename);

                enamelColors.push({
                    enamelColorName,
                    enamelColorImages: enamelColorImagesUrls,
                });
            }
        }



        const productData = req.body;
        productData.images = imageUrls;
        productData.withchainimages = withChainFiles;
        productData.withchainoutimages = withChainoutFiles;
        productData.shop = shop;
        productData.MetalColor = {
            YellowGoldclr: YellowGoldclrFiles,
            RoseGoldclr: RoseGoldclrFiles,
            WhiteGoldclr: WhiteGoldclrFiles,
        }
        productData.enamelColors = enamelColors


        const product = await Product.create(productData);

        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        return next(new ErrorHandler(error.message || "Internal Server Error", 400));
    }
}));


//get all Products of a shop

router.get("/get-all-products-shop/:id", catchAsyncErrors(async (req, res, next) => {
    try {
        const products = await Product.find({ shopId: req.params.id })

        res.status(201).json({
            success: true,
            products
        })

    } catch (error) {
        return next(new ErrorHandler(error, 400))

    }
}))


//delete product of a shop


router.delete("/delete-shop-product/:id", isSeller, catchAsyncErrors(async (req, res, next) => {
    try {
        const productId = req.params.id

        const productData = await Product.findById(productId)
        productData.images.forEach((imageUrl) => {
            const filename = imageUrl
            const filePath = `uploads/${filename}`

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        })

        const product = await Product.findByIdAndDelete(productId)


        if (!product) {
            return next(new ErrorHandler('product Not Found with this Id !', 500))
        }

        res.status(201).json({
            success: true,
            message: "Product Deleted Successfully"
        })



    } catch (error) {
        return next(new ErrorHandler(error, 400))

    }
}))

// get all products
router.get(
    "/get-all-products",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });

            res.status(201).json({
                success: true,
                products,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);


//review of a product

router.put("/create-new-review", isAuthenticated, catchAsyncErrors(async (req, res, next) => {

    try {
        const { user, rating, comment, productId, orderId } = req.body;



        const review = {
            user,
            rating,
            comment,
            productId,
        };
        // const files = req.files;
        // const reviewimages = files.reviewimages ? files.reviewimages.map((file) => file.filename) : [];
        // review.reviewimages = reviewimages

        const product = await Product.findById(productId)
        const isReviewed = product.reviews.find((rev) => rev.user._id === req.user._id)

        if (isReviewed) {
            product.reviews.forEach((rev) => {
                if (rev.user._id === req.user._id) {
                    (rev.rating = rating), (rev.comment = comment), (rev.user = user);
                }
            });
        } else {
            product.reviews.push(review);
        }

        let avg = 0;

        product.reviews.forEach((rev) => {
            avg += rev.rating;
        });

        product.ratings = avg / product.reviews.length;
        await product.save({ validateBeforeSave: false });

        await Order.findByIdAndUpdate(
            orderId,
            { $set: { "cart.$[elem].isReviewed": true } },
            { arrayFilters: [{ "elem._id": productId }], new: true }
        );


        res.status(200).json({
            success: true,
            message: "Reviwed succesfully Posted!",
        });



    } catch (error) {
        return next(new ErrorHandler(error, 400));

    }

}))










module.exports = router