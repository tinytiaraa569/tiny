import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../Styles/styles'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';
import { MdOutlineVerified } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import { RiExchangeFundsLine } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";
import { AiOutlineGold } from "react-icons/ai";
import { IoDiamondOutline } from "react-icons/io5";
import { RxDimensions } from "react-icons/rx";
import { MdFeaturedPlayList } from "react-icons/md";
import { MdHealthAndSafety } from "react-icons/md";
import { FaChild } from "react-icons/fa";
import { TbBrandMinecraft } from "react-icons/tb";
import { TbCertificate } from "react-icons/tb";
import { MdOutlineAppRegistration } from "react-icons/md";
import { GiHeartNecklace } from "react-icons/gi";
import { GiMaterialsScience } from "react-icons/gi";


import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { backend_url, server } from '@/server';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/actions/cart';
import { toast } from 'react-toastify';
import { addToWishlist, removeFromWishlist } from '@/redux/actions/wishlist';
import Ratings from './Ratings';
import review1img from './reviewsimages/review1.jpg'
import review2img from './reviewsimages/review2.jpg'
import axios from 'axios';

function ProductDetails({ data }) {

    const { wishlist } = useSelector((state) => state.wishlist)
    const { cart } = useSelector((state) => state.cart)
    const { user, isAuthenticated } = useSelector((state) => state.user)




    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [count, setCount] = useState(1)
    const [click, setClick] = useState(false)
    const [select, setSelect] = useState(0)


    const [selectedColorIndex, setSelectedColorIndex] = useState(null);
    const [validationError, setValidationError] = useState('');


    // // console.log(data.withchainimages)
    // const addToCartHandler = (id) => {

    //     const isItemExists = cart && cart.find((i) => i._id === id)

    //     if (isItemExists) {
    //         toast.error("Item Already in cart")
    //     } else {
    //         if (data.stock < count) {
    //             toast.error("Product Stock limited")

    //         } else {
    //             const cartData = { ...data, qty: count }
    //             dispatch(addToCart(cartData))
    //             toast.success("Product Added to cart")
    //         }
    //     }

    // }
    const addToCartHandler = (id) => {
        console.log("Selected Color:", selectedColor);
        console.log("Show With Chain:", showWithChain);

        if (validateForm()) {
            const isItemExists = cart && cart.find((i) => i._id === id);

            if (isItemExists) {
                toast.error("Item Already in cart");
            } else {
                if (data.stock < count) {
                    toast.error("Product Stock limited");
                } else {
                    const cartData = {
                        ...data,
                        qty: count,
                        selectedColor: selectedColor,
                        showWithChain: showWithChain
                    };
                    dispatch(addToCart(cartData));
                    toast.success("Product Added to cart");

                    // Console log the updated cart value
                    console.log("Updated Cart:", cart); // Assuming `cart` is from useSelector

                    // Optionally, you can also console log the `cartData` if needed
                    console.log("Added to Cart:", cartData);
                }
            }
        } else {
            toast.error("Please select color and chain options.");
        }
    };

    useEffect(() => {

        if (wishlist && wishlist.find((i) => i._id === data._id)) {
            setClick(true)

        } else {
            setClick(false)
        }

    }, [wishlist])

    const removeFromWishlistHandler = (data) => {
        setClick(!click)
        dispatch(removeFromWishlist(data))


    }
    const addToWishlistHandler = (data) => {
        setClick(!click)
        dispatch(addToWishlist(data))


    }



    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const incrementCount = () => {
        setCount(count + 1);
    };



    const [selectedColor, setSelectedColor] = useState(null);
    const handleColorChange = (colorIndex) => {
        setSelectedColor(colorIndex); // Update selectedColor state with the index of the color
        setSelect(0); // Reset selected image index to 0 when color changes

        setShowWithChain(null);
    };
    const [showWithChain, setShowWithChain] = useState(null);

    const toggleChainOption = (option) => {
        setShowWithChain(option === 'with'); // Set showWithChain based on the selected option ('with' or 'without')
        setSelect(0); // Reset selected image index when toggling chain option
        setSelectedColorIndex(null);
    };


    const renderImages = () => {
        // Determine which array of images to render based on selectedColor
        const imagesArray =
            selectedColor === 0
                ? data.MetalColor.YellowGoldclr
                : selectedColor === 1
                    ? data.MetalColor.RoseGoldclr
                    : selectedColor === 2
                        ? data.MetalColor.WhiteGoldclr

                        : showWithChain === true
                            ? data.withchainimages
                            : showWithChain === false
                                ? data.withchainoutimages


                                : data.images;


        return (
            <div className='w-full flex'>
                {imagesArray &&
                    imagesArray.map((image, index) => (
                        <div
                            key={index}
                            className={`${select === index ? 'border' : 'null'} cursor-pointer`}
                            onClick={() => setSelect(index)}
                        >
                            <img
                                src={`${backend_url}${image}`}
                                alt=""
                                className='h-[200px]'
                            />
                        </div>
                    ))}
            </div>
        );
    };

    const handleMessageSubmit = async () => {

        console.log(data, "checking")

        if (isAuthenticated) {
            const groupTitle = data._id + user._id
            const userId = user._id
            const sellerId = data.shopId
            await axios.post(`${server}/conversation/create-new-conversation`, {
                groupTitle, userId, sellerId
            }).then((res) => {
                navigate(`/conversation/${res.data.conversation._id}`)

            }).catch((error) => {
                toast.error(error.response.data.message)
            })
        } else {
            toast.error("Please Login to create a conversation")
        }

    }

    const validateForm = () => {
        return selectedColor !== null && showWithChain !== null;
    };
    useEffect(() => {
        // Reset validation error on color or chain change
        setValidationError('');
    }, [selectedColorIndex, showWithChain]);


    return (
        <div className='bg-white'>
            {
                data ?
                    <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
                        <div className='w-full py-5'>
                            <div className='flex w-full 800px:flex flex-col sm:flex-row'>
                                <div className="w-full 800px:w-[50%]">
                                    {select !== null && (
                                        selectedColor === 0 && data.MetalColor.YellowGoldclr ? (
                                            <img
                                                src={`${backend_url}${data.MetalColor.YellowGoldclr[select]}`}
                                                alt=""
                                                className='w-[90%] h-[60vh] object-contain'
                                            />
                                        ) : selectedColor === 1 && data.MetalColor.RoseGoldclr ? (
                                            <img
                                                src={`${backend_url}${data.MetalColor.RoseGoldclr[select]}`}
                                                alt=""
                                                className='w-[90%] h-[60vh] object-contain'
                                            />
                                        ) : selectedColor === 2 && data.MetalColor.WhiteGoldclr ? (
                                            <img
                                                src={`${backend_url}${data.MetalColor.WhiteGoldclr[select]}`}
                                                alt=""
                                                className='w-[90%] h-[60vh] object-contain'
                                            />
                                        ) : (
                                            data.images && data.images[select] ? (
                                                <img
                                                    src={`${backend_url}${data.images[select]}`}
                                                    alt=""
                                                    className='w-[90%] h-[60vh] object-contain'
                                                />
                                            ) : (
                                                <img
                                                    src={`${backend_url}${data.images && data.images[0]}`} // Default to the first image if select is null or out of range
                                                    alt=""
                                                    className='w-[90%] h-[60vh] object-contain'
                                                />
                                            )
                                        )
                                    )
                                    }


                                    <div className='w-full flex'>
                                        {renderImages()}
                                    </div>



                                </div>


                                <div className='w-full 800px:w-[50%] pt-5'>

                                    <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                                    <h3 className={`text-[#727386] text-left  text-[16px] font-Poppins pt-2`}>{data.skuid}</h3>
                                    <p className="font-Poppins pt-3">{data.description}</p>

                                    <div className="flex pt-3">
                                        <h5 className={`${styles.productDiscountPrice}`}>
                                            ₹
                                            {data.originalPrice === 0
                                                ? data.originalPrice
                                                : data.discountPrice}
                                        </h5>
                                        <h4 className={`${styles.price} line-through`}>
                                            {data.originalPrice ? " ₹" + data.originalPrice : null}
                                        </h4>

                                    </div>

                                    {/* metal options */}

                                    <div>
                                        {Object.keys(data.MetalColor).length > 0 && (
                                            <div className="metal-color-options">
                                                <h3 className='text-[20px] font-[600] font-Poppins'>Metal Color</h3>
                                                {Object.keys(data.MetalColor).map((key, index) => {
                                                    // Remove "clr" from the end of color name
                                                    const label = key.replace(/clr$/i, '');

                                                    return (
                                                        <div key={index} className='flex items-center text-[16px] font-Poppins py-1'>
                                                            <input
                                                                type="radio"
                                                                name='colorcode'
                                                                id={`color-${key}`}
                                                                value={key}
                                                                checked={selectedColor === index}
                                                                onChange={() => handleColorChange(index) || setSelectedColor(index)}
                                                            />
                                                            <label
                                                                className='pl-2 cursor-pointer'
                                                                htmlFor={`color-${key}`}
                                                            >
                                                                {label}
                                                            </label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>


                                    {/* chain options */}

                                    <div className='pt-3'>
                                        <h3 className='text-[20px] font-[600] font-Poppins'>Chain</h3>
                                        <div className='radio-option  text-[16px] font-Poppins py-1'>
                                            <input
                                                type='radio'
                                                id='withChain'
                                                name='chainOption'
                                                value='with'
                                                onChange={() => toggleChainOption('with')}
                                                checked={showWithChain}
                                            />
                                            <label htmlFor='withChain' className='pl-2 cursor-pointer'>
                                                With 1 gm Chain ( 13 inches) (+₹ 7,200)
                                            </label>
                                        </div>
                                        <div className='radio-option text-[16px] font-Poppins py-1'>
                                            <input
                                                type='radio'
                                                id='withoutChain'
                                                name='chainOption'
                                                value='without'
                                                onChange={() => toggleChainOption('without')}
                                                checked={!showWithChain}
                                            />
                                            <label htmlFor='withoutChain' className='pl-2 cursor-pointer'>
                                                Without Chain
                                            </label>
                                        </div>
                                    </div>

                                    {/* Validation Error */}
                                    {validationError && (
                                        <p className='text-red-500 text-sm mt-2'>{validationError}</p>
                                    )}








                                    {/* <div>
                                        {
                                            data.Enamelcolor.length ?
                                                <div className='mt-4'>
                                                    <h3 className='text-[20px] font-[600] font-Poppins'>Enamel Color</h3>
                                                    <select className='border text-[16px] font-Poppins py-0.5 '>
                                                        <option value="" selected disabled>Select Enamel Color</option>
                                                        {
                                                            data.metalcolor.map((val) => {
                                                                return (
                                                                    <option value="">{val.colorname}</option>
                                                                )

                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                :
                                                null
                                        }
                                    </div> */}

                                    {/* <div className='mt-4'>
                                        <h3 className='text-[20px] font-[600] font-Poppins'>Chain</h3>
                                        {
                                            data.chain.length ?
                                                (
                                                    <>
                                                        {

                                                            data.chain.map((val) => {
                                                                return (
                                                                    <div className='flex text-[16px] font-Poppins py-0.5'>
                                                                        <input type="radio" name='chainoption' id={val.yes || val.no} />
                                                                        <div className='pl-2'>
                                                                            <label htmlFor={val.yes}><p>{val.yes}</p></label>
                                                                            <label htmlFor={val.no}><p>{val.no}</p></label>

                                                                        </div>

                                                                    </div>

                                                                )

                                                            })
                                                        }

                                                    </>
                                                )
                                                :
                                                null
                                        }


                                    </div> */}

                                    <div className='flex items-center mt-5 justify-between pr-3'>
                                        <div className='overflow-hidden'>
                                            <button onClick={decrementCount} className="bg-gradient-to-r font-Poppins from-[#1BB8E5] to-[#1fa3c7] text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out">-</button>
                                            <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[9.1px] font-Poppins overflow-hidden">
                                                {count}
                                            </span>
                                            <button onClick={incrementCount}
                                                className="bg-gradient-to-r from-[#1BB8E5] font-Poppins to-[#1fa3c7] text-white font-bold rounded-br rounded-tr px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                            >+ </button>
                                        </div>
                                        <div>
                                            {
                                                click ?
                                                    <AiFillHeart
                                                        size={30}
                                                        className='cursor-pointer '
                                                        color={click ? "red" : "#333"}
                                                        onClick={() => removeFromWishlistHandler(data)}
                                                        title='Remove from wishlist'
                                                    />
                                                    :
                                                    <AiOutlineHeart
                                                        size={30}
                                                        className='cursor-pointer '
                                                        color={click ? "red" : "#333"}
                                                        onClick={() => addToWishlistHandler(data)}
                                                        title='Add to wishlist'


                                                    />
                                            }
                                        </div>

                                    </div>

                                    <div
                                        className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                                        onClick={() => addToCartHandler(data._id)}
                                    >
                                        <span className="text-[#fff] flex items-center font-Poppins">
                                            Add to cart <AiOutlineShoppingCart className="ml-1" />
                                        </span>
                                    </div>


                                    <div className={`${styles.button} mt-6 !w-[190px] p-4 !rounded !h-[40px]`} onClick={handleMessageSubmit}>
                                        <span className='text-white flex items-center'> Send Message <AiOutlineMessage className='ml-2' /></span>
                                    </div>



                                </div>

                            </div>

                        </div>

                        <ProductDetailsInfo data={data} />


                    </div>
                    :
                    null
            }


        </div>
    )
}


const ProductDetailsInfo = ({ data }) => {
    const [active, setActive] = useState(1)
    console.log(data, "see the data")


    return (
        <div className='bg-[#fafafa] mb-5 px-10 800px:px-2 py-2 rounded pb-5'>
            <div className="w-full flex justify-between border-b pt-10 pb-2">
                <div className="relative">
                    <h5 className={`${active === 1 ? "text-[#1BB8E5] font-[700]" : "text-[#000]"} text-[18px]  px-1 leading-5 cursor-pointer 800px:text-[20px] font-Poppins `} onClick={() => setActive(1)} >Product Details</h5>
                    {/* {
                    active === 1 ?
                     (
                        <div className={`${styles.active_indicator}`} />
                    ) : null} */}
                </div>
                <div className="relative">
                    <h5 className={`${active === 2 ? "text-[#1BB8E5] font-[700]" : "text-[#000]"} text-[18px] px-1 leading-5 cursor-pointer 800px:text-[20px] font-Poppins`} onClick={() => setActive(2)}>Product Reviews</h5>

                </div>

            </div>
            {
                active === 1 ?
                    <>
                        <div className='mb-3'>
                            <h1 className={`text-[20px] font-[600] font-Poppins text-[#333] pt-1`}>{data.name}</h1>
                            <h3 className={`text-[#727386] text-left  text-[16px] font-Poppins pt-1`}>{data.skuid}</h3>

                        </div>

                        {/* table section */}

                        <div className='flex flex-wrap  gap-5'>

                            <div className="bg-[#fff3e9] w-[320px] font-Poppins mb-3">
                                <div className="t1sec px-[12.5px] py-[16px] gap-2 flex items-center">
                                    <span><AiOutlineGold /></span>
                                    <span className='font-[500]'>Gold</span>
                                </div>
                                <div className="tsec2 flex font-Poppins">
                                    <div className='w-[200px] bg-[#fff9f5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Weight</div>
                                        <p className='text-[#4f3267] text-[14px]'> {data?.goldWeight ? data.goldWeight.weight : "0.80 gm"} </p>
                                    </div>
                                    <div className='w-[200px] bg-[#fff9f5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Purity</div>
                                        <p className='text-[#4f3267] text-[14px]'>{data?.goldWeight ? data.goldWeight.purity : "18 kt"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#fff3e9] w-[320px] font-Poppins mb-3">
                                <div className="t1sec px-[12.5px] py-[16px] gap-2 flex items-center">
                                    <span><IoDiamondOutline /></span>
                                    <span className='font-[500]'>Diamond</span>
                                </div>
                                <div className="tsec2 flex font-Poppins">
                                    <div className='w-[200px] bg-[#fff9f5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Weight</div>
                                        <p className='text-[#4f3267] text-[14px]'>{data?.diamondWeight ? data.diamondWeight.weight : "0.02 Ct"} </p>
                                    </div>
                                    <div className='w-[200px] bg-[#fff9f5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Quality</div>
                                        <p className='text-[#4f3267] text-[14px]'>{data?.diamondWeight ? data.diamondWeight.quality : " GH-VS"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#fff3e9] w-[320px] font-Poppins mb-3">
                                <div className="t1sec px-[12.5px] py-[16px] gap-2 flex items-center">
                                    <span><RxDimensions /></span>
                                    <span className='font-[500]'>Dimension</span>
                                </div>
                                <div className="tsec2 flex font-Poppins">
                                    <div className='w-[200px] bg-[#fff9f5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Height</div>
                                        <p className='text-[#4f3267] text-[14px]'> {data?.dimension ? data.dimension.height : "15.80 mm"}</p>
                                    </div>
                                    <div className='w-[200px] bg-[#fff9f5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Width</div>
                                        <p className='text-[#4f3267] text-[14px]'>{data?.dimension ? data.dimension.width : "1.70 mm"} </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#fff3e9] w-[320px] font-Poppins mb-3">
                                <div className="t1sec px-[12.5px] py-[16px] gap-2 flex items-center">
                                    <span><GiHeartNecklace /></span>
                                    <span className='font-[500]'>Chain </span>
                                </div>
                                <div className="tsec2 flex font-Poppins">
                                    <div className='w-[200px] bg-[#fff9f5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Length</div>
                                        <p className='text-[#4f3267] text-[14px]'>13 inch</p>
                                    </div>
                                    <div className='w-[200px] bg-[#fff9f5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Weight</div>
                                        <p className='text-[#4f3267] text-[14px]'> 1gm </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* table section */}




                        <div className="bg-[#fff3e9] w-full font-Poppins mb-3">
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <div className="t1sec px-[12.5px] py-[16px] gap-2 flex items-center">
                                        <span><MdFeaturedPlayList /></span>
                                        <span className='font-[500]'>Features</span>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails className="bg-[#fff9f5]">
                                    <div className="tsec2 flex flex-col font-Poppins">
                                        <div className='w-[320px] bg-[#fff9f5] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center '>
                                            <div className='font-[500] '><GiMaterialsScience /></div>
                                            <p className='text-[#4f3267] text-[15px]'> Hypoallergenic Material</p>
                                        </div>
                                        <div className='w-[320px] bg-[#fff9f5] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center'>
                                            <div className='font-[500] '><MdHealthAndSafety /></div>
                                            <p className='text-[#4f3267] text-[15px]'>Quality and Safety First</p>
                                        </div>
                                        <div className='w-[320px] bg-[#fff9f5] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center'>
                                            <div className='font-[500] '><FaChild /></div>
                                            <p className='text-[#4f3267] text-[15px]'>Age-Appropriate Styles</p>
                                        </div>
                                        <div className='w-[320px] bg-[#fff9f5] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center'>
                                            <div className='font-[500] '><GiHeartNecklace /></div>
                                            <p className='text-[#4f3267] text-[15px]'>Everyday Use Jewellery</p>
                                        </div>
                                        <div className='w-[320px] bg-[#fff9f5] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center'>
                                            <div className='font-[500] '><TbBrandMinecraft /></div>
                                            <p className='text-[#4f3267] text-[15px]'>Crafted with Love</p>
                                        </div>
                                        <div className='w-[320px] bg-[#fff9f5] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center'>
                                            <div className='font-[500] '><TbCertificate /></div>
                                            <p className='text-[#4f3267] text-[14px]'>Natural Diamonds with SGL Certificate</p>
                                        </div>
                                        <div className='w-[320px] bg-[#fff9f5] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center'>
                                            <div className='font-[500] '><MdOutlineAppRegistration /></div>
                                            <p className='text-[#4f3267] text-[15px]'>Design Registration No. 417519-003</p>
                                        </div>




                                    </div>
                                </AccordionDetails>
                            </Accordion>


                        </div>



                        <div className=" w-full mt-3 moreinfoproduct bg-white rounded-lg shadow-sm ">
                            <div className="moreinfosec py-[20px] flex justify-center gap-10 800px:gap-2">
                                <div className='flex flex-col justify-center text-center'>
                                    <span className='flex justify-center '>
                                        <span className='w-[50px] h-[50px] flex justify-center items-center' style={{ backgroundColor: "#e8ffda", borderRadius: "50%" }}>
                                            <MdOutlineVerified size={25} />
                                        </span>
                                    </span>
                                    <span className='font-Poppins text-[1rem] '>
                                        100% Certified
                                    </span>
                                </div>

                                <div className='text-center'>
                                    <span className='flex justify-center '>
                                        <span className='w-[50px] h-[50px] flex justify-center items-center' style={{ backgroundColor: "#dbecff", borderRadius: "50%" }}>

                                            <RiRefund2Line size={25} />
                                        </span>

                                    </span>
                                    <span className='font-Poppins text-[1rem] 800px:text-center'>
                                        7 Days Money-Back
                                    </span>
                                </div>



                                <div className='text-center'>
                                    <span className='flex justify-center '>
                                        <span className='w-[50px] h-[50px] flex justify-center items-center' style={{ backgroundColor: "#fff9ca", borderRadius: "50%" }}>

                                            <RiExchangeFundsLine size={25} />
                                        </span>

                                    </span>
                                    <span className=' font-Poppins text-[1rem] '>
                                        Lifetime Exchange
                                    </span>
                                </div>



                                <div className='text-center'>
                                    <span className='flex justify-center items-center'>
                                        <span className='w-[50px] h-[50px] flex justify-center items-center' style={{ backgroundColor: "#ffe1e3", borderRadius: "50%" }}>

                                            <CiCalendarDate size={25} />
                                        </span>
                                    </span>
                                    <span className='font-Poppins text-[1rem] '>
                                        One Year Warranty
                                    </span>
                                </div>


                            </div>
                            <p className='text-center text-[15px] font-[300] pb-4 font-Poppins text-[#333] mt-3'>Learn more on about our <Link className='text-[#4d9dbd]' to="/terms-and-conditions">TERMS & POLICIES</Link></p>
                        </div>

                    </>
                    : null
            }


            {
                active === 2
                    ?
                    <div className='w-full  min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll'>
                        {
                            data && data.reviews.map((item, index) => (
                                <div key={index} className='w-full flex my-2'>
                                    <img src={`${backend_url}/${item.user.avatar}`} className='w-[60px] h-[60px] rounded-full' alt="" />

                                    <div className='pl-3'>
                                        <h1 className='font-[500] capitalize'>{item.user.name}</h1>
                                        <Ratings rating={data?.ratings} />
                                        <div className='w-full flex mt-2 gap-4'>

                                            <img src={review1img} alt="" className='w-[200px] h-[200px] border object-fill shadow rounded-[5px]' />
                                            <img src={review2img} alt="" className='w-[200px] h-[200px] border object-fill shadow rounded-[5px]' />
                                        </div>
                                        <p className='w-[60%] mt-3'>{item.comment}</p>

                                    </div>


                                </div>
                            ))
                        }

                        <div className="w-full flex  justify-center">
                            {
                                data && data.reviews.length === 0 && (
                                    <h5>No Reviews have for this product</h5>
                                )
                            }


                        </div>
                    </div>
                    :
                    null
            }




        </div>
    )
}
export default ProductDetails
