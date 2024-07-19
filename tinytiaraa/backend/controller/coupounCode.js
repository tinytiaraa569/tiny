const express = require("express")
const router = express.Router()
const Product = require("../model/product")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/Errorhandler")
const Shop = require("../model/shop")
const { isSeller } = require("../middleware/auth");
const CoupounCode = require("../model/coupounCode")


//create Coupoun code

// router.post("/create-coupon-code", isSeller, catchAsyncErrors(async (req, res, next) => {

//   try {

//     const isCoupounCodeExists = await CoupounCode.find({ name: req.body.name })

//     if (isCoupounCodeExists.length !== 0) {
//       return next(new ErrorHandler("Coupoun code Already Exists", 400))


//     }
//     const coupounCode = await CoupounCode.create(req.body)
//     res.status(201).json({
//       success: true,
//       coupounCode
//     })


//   } catch (error) {
//     return next(new ErrorHandler(error, 400))


//   }
// }))

router.post("/create-coupon-code", isSeller, catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, value, percentageDiscount, minAmount, maxAmount, selectedProducts, shop } = req.body;

    // Check if coupon code with the same name already exists
    const isCouponCodeExists = await CoupounCode.findOne({ name });
    if (isCouponCodeExists) {
      return next(new ErrorHandler("Coupon code already exists", 400));
    }

    // Create the coupon code based on the provided data
    const couponCodeData = {
      name,
      value: value || null, // Store value if provided
      percentageDiscount: percentageDiscount || null, // Store percentage discount if provided
      minAmount: minAmount || null,
      maxAmount: maxAmount || null,
      selectedProducts: selectedProducts || null,
      shop
    };

    const couponCode = await CoupounCode.create(couponCodeData);

    res.status(201).json({
      success: true,
      couponCode
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}));


//get all coupon codes

router.get("/get-coupon/:id", isSeller, catchAsyncErrors(async (req, res, next) => {
  try {

    const couponCodes = await CoupounCode.find({ shop: req.params.id });


    res.status(201).json({
      success: true,
      couponCodes
    })

  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
}))


// delete coupoun code

router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Coupon code dosen't exists!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Coupon code deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get couponcode value

router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findOne({ name: req.params.name });
      if (!couponCode) {
        return next(new ErrorHandler("Coupon code not found", 404));
      }

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router