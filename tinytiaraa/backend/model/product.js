const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Product Name']
    },
    skuid: {
        type: String,
        required: [true, 'Please Enter Product sku id']
    },
    description: {
        type: String,
        required: [true, 'Please Enter Product Description']
    },
    category: {
        type: String,
        required: [true, 'Please Enter Product category']
    },
    subcategory: {
        type: String,
        required: [true, 'Please Enter Product Subcategory']
    },
    tags: {
        type: String,
        required: [true, 'Please Enter Product tags']
    },
    originalPrice: {
        type: Number,

    },
    discountPrice: {
        type: Number,
        required: [true, 'Please Enter Product Price']
    },
    stock: {
        type: Number,
        required: [true, 'Please Enter Product Stocks']
    },
    images: [
        {
            type: String,
        },
    ],
    withchainimages: [
        {
            type: String,
        },
    ],


    withchainoutimages: [
        {
            type: String,
        },
    ],


    MetalColor: {
        YellowGoldclr: [
            {
                type: String,
            },
        ],
        RoseGoldclr: [
            {
                type: String,
            },
        ],
        WhiteGoldclr: [
            {
                type: String,
            },
        ],

    },



    // enamelColors: {

    //     enamelColorImages: [
    //         {
    //             type: String
    //         }
    //     ]
    // },

    enamelColors: [

        enamelColorName = {
            type: String,

        },
        enamelColorImages = [
            {
                type: String,
            },
        ],

    ],

    shopId: {
        type: String,
        required: true
    },
    reviews: [
        {
            user: {
                type: Object
            },
            rating: {
                type: Number
            },
            comment: {
                type: String
            },
            productId: {
                type: String
            },
            CreatedAt: {
                type: Date,
                default: Date.now()
            }

        },
    ],
    reviewImages: [
        {
            type: String,
        },
    ],

    goldWeight: {
        weight: {
            type: String,
        },
        purity: {
            type: String,
        },
    },
    diamondWeight: {
        weight: {
            type: String,
        },
        quality: {
            type: String,
        },
    },
    dimension: {
        height: {
            type: String,
        },
        width: {
            type: String,
        },
    },
    ratings: {
        type: Number
    },
    sold_out: {
        type: Number,
        default: 0,
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Product", productSchema)