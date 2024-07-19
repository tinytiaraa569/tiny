import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { categoriesData } from '../static/data'
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { createProduct } from '../redux/actions/product'
import { IoIosAdd, IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify'
import { BsDash } from "react-icons/bs";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import EnamelColorsList from './EnamelColorsList'

function CreateProduct() {
    const { seller } = useSelector((state) => state.seller)
    const { success, error } = useSelector((state) => state.products)



    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [skuid, setSkuid] = useState("")

    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("");

    const [tags, setTags] = useState("")
    const [originalPrice, setOriginalPrice] = useState("")
    const [discountPrice, setDiscountPrice] = useState("")
    const [stock, setStock] = useState("")


    const [images, setImages] = useState([])

    const [showWithChainImages, setShowWithChainImages] = useState(false);
    const [showWithoutChainImages, setShowWithoutChainImages] = useState(false);


    const [withchainimages, setwithchainImages] = useState([])
    const [withchainoutimages, setwithchainoutImages] = useState([])


    const [showWithYellowclrImages, setShowWithYellowclrImages] = useState(false);

    const [YellowGoldclr, setYellowGoldclr] = useState([])


    const [showWithRoseclrImages, setShowWithRoseclrImages] = useState(false);

    const [RoseGoldclr, setRoseGoldclr] = useState([])


    // whitegold

    const [showWithWhiteclrImages, setShowWithWhiteclrImages] = useState(false);

    const [WhiteGoldclr, setWhiteGoldclr] = useState([])



    //weight states 

    const [goldWeight, setGoldWeight] = useState({ weight: '', purity: '' });
    const [diamondWeight, setDiamondWeight] = useState({ weight: '', quality: '' });
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');



    const handleAddChain = () => {
        // Logic to gather chain data and update state or perform actions
        console.log("Adding Chain Data:", {
            withchainimages,
            withchainoutimages,
            // Include other relevant data as needed
        });
    };





    useEffect(() => {

        if (error) {
            toast.error(error)
        }
        if (success) {
            toast.success("Product Created successfully")
            navigate("/dashboard")
            window.location.reload()
        }

    }, [dispatch, error, success])


    const handleImageChange = (e) => {
        e.preventDefault()

        let files = Array.from(e.target.files)
        setImages((prevImages) => [...prevImages, ...files])
    }

    const handlewithImageChange = (e) => {
        e.preventDefault()

        let files = Array.from(e.target.files)
        setwithchainImages((prevImages) => [...prevImages, ...files])
    }

    const handlewithoutImageChange = (e) => {
        e.preventDefault()

        let files = Array.from(e.target.files)
        setwithchainoutImages((prevImages) => [...prevImages, ...files])
    }


    const handleToggleWithChainImages = () => {
        setShowWithChainImages(!showWithChainImages);
    };

    const handleToggleWithoutChainImages = () => {
        setShowWithoutChainImages(!showWithoutChainImages);
    };


    const handleDeleteWithChainImage = (index) => {
        const updatedImages = [...withchainimages];
        updatedImages.splice(index, 1);
        setwithchainImages(updatedImages);
    };

    const handleDeleteWithoutChainImage = (index) => {
        const updatedImages = [...withchainoutimages];
        updatedImages.splice(index, 1);
        setwithchainoutImages(updatedImages);
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        const foundCategory = categoriesData.find((cat) => cat.title === selectedCategory);
        if (foundCategory) {
            setCategory(selectedCategory);
            // Clear subcategory when category changes
            setSubcategory("");
        } else {
            setCategory("");
            setSubcategory("");
        }
    };

    const handleSubcategoryChange = (e) => {
        setSubcategory(e.target.value);
    };


    const toggleShowImages = (type) => {
        if (type === 'withchain') {
            setShowWithChainImages(!showWithChainImages);
        } else if (type === 'withoutchain') {
            setShowWithoutChainImages(!showWithoutChainImages);
        }
    };

    // metal color
    // yellow color
    const handlewithYellowclr = (e) => {
        e.preventDefault()

        let files = Array.from(e.target.files)
        setYellowGoldclr((prevImages) => [...prevImages, ...files])
    }


    const handleToggleWithYellowclr = () => {
        setShowWithYellowclrImages(!showWithYellowclrImages);
    };

    const handleDeleteWithYellowclrImage = (index) => {
        const updatedImages = [...YellowGoldclr];
        updatedImages.splice(index, 1);
        setYellowGoldclr(updatedImages);
    };


    // Rose color
    const handlewithRoseclr = (e) => {
        e.preventDefault()

        let files = Array.from(e.target.files)
        setRoseGoldclr((prevImages) => [...prevImages, ...files])
    }

    const handleToggleWithRoseclr = () => {
        setShowWithRoseclrImages(!showWithRoseclrImages);
    };

    const handleDeleteWithRoseclrImage = (index) => {
        const updatedImages = [...RoseGoldclr];
        updatedImages.splice(index, 1);
        setRoseGoldclr(updatedImages);
    };

    // white color
    const handlewithWhiteclr = (e) => {
        e.preventDefault()

        let files = Array.from(e.target.files)
        setWhiteGoldclr((prevImages) => [...prevImages, ...files])
    }

    const handleToggleWithWhiteclr = () => {
        setShowWithWhiteclrImages(!showWithRoseclrImages);
    };

    const handleDeleteWithWhiteclrImage = (index) => {
        const updatedImages = [...WhiteGoldclr];
        updatedImages.splice(index, 1);
        setWhiteGoldclr(updatedImages);
    };


    const handleAddMetalColor = () => {
        console.log(YellowGoldclr, WhiteGoldclr, RoseGoldclr)
    }

    const toggleShowImagesColor = (type) => {
        if (type === 'yellowcolor') {
            setShowWithYellowclrImages(!showWithYellowclrImages);

        } else if (type === 'rosecolor') {
            setShowWithRoseclrImages(!showWithRoseclrImages);

        }
        else if (type === 'whitecolor') {
            setShowWithWhiteclrImages(!showWithWhiteclrImages);

        }
    };


    // enamel Color

    const [enamelColor, setEnamelColor] = useState('');
    const [enamelColorsList, setEnamelColorsList] = useState([]);
    const [enamelColorImages, setEnamelColorImages] = useState([]);


    const handleAddEnamelColor = () => {
        if (enamelColor.trim() !== '') {
            setEnamelColorsList([...enamelColorsList, enamelColor.trim()]);
            setEnamelColor(''); // Clear input field after adding
        }
    };

    const handleRemoveEnamelColor = (index) => {
        const updatedEnamelColorsList = [...enamelColorsList];
        updatedEnamelColorsList.splice(index, 1);
        setEnamelColorsList(updatedEnamelColorsList);

        // Remove corresponding images for the removed color
        const updatedEnamelColorImages = [...enamelColorImages];
        updatedEnamelColorImages.splice(index, 1);
        setEnamelColorImages(updatedEnamelColorImages);
    };

    console.log(enamelColorImages, "iamges ")



    const handleAddImage = (e, colorIndex) => {


        const files = Array.from(e.target.files);

        // Update enamelColorImages state
        setEnamelColorImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages[colorIndex] = [...(updatedImages[colorIndex] || []), ...files];
            return updatedImages;
        });

        // let files = Array.from(e.target.files)
        // console.log(files , "from handle Image")
        // setEnamelColorImages((prevImages) => [...prevImages, ...files])



        // const updatedEnamelColorImages = [...enamelColorImages];
        // console.log(updatedEnamelColorImages)

        // // Replace images array at colorIndex with new files
        // updatedEnamelColorImages[colorIndex] = files;
        // setEnamelColorImages(updatedEnamelColorImages);
    };





    const handleSubmit = (e) => {
        e.preventDefault()


        const newForm = new FormData()

        images.forEach((image) => {
            newForm.append("images", image);
        });

        withchainimages.forEach((image) => {
            newForm.append("withchainimages", image)
        })

        withchainoutimages.forEach((image) => {
            newForm.append("withchainoutimages", image)
        })


        YellowGoldclr.forEach((image) => {
            newForm.append("YellowGoldclr", image)
        })
        RoseGoldclr.forEach((image) => {
            newForm.append("RoseGoldclr", image)
        })
        WhiteGoldclr.forEach((image) => {
            newForm.append("WhiteGoldclr", image)
        })

        enamelColorsList.forEach((color, index) => {
            enamelColorImages[index].forEach((image) => {
                newForm.append(`enamelColors[${index}].enamelColorImages`, image);
            });
            newForm.append(`enamelColors[${index}].enamelColorName`, color);
        });




        newForm.append("name", name)
        newForm.append("skuid", skuid)
        newForm.append("description", description)
        newForm.append("category", category)
        newForm.append("subcategory", subcategory)
        newForm.append("tags", tags)
        newForm.append("originalPrice", originalPrice)
        newForm.append("discountPrice", discountPrice)
        newForm.append("stock", stock)
        newForm.append("shopId", seller._id)



        // weight

        newForm.append('goldWeight.weight', goldWeight.weight);
        newForm.append('goldWeight.purity', goldWeight.purity);
        newForm.append('diamondWeight.weight', diamondWeight.weight);
        newForm.append('diamondWeight.quality', diamondWeight.quality);
        newForm.append('dimension.height', height);
        newForm.append('dimension.width', width);


        dispatch(createProduct(newForm))

        // console.log(newForm)



    }



    return (
        <div className='w-[50%] bg-white shadow px-8 overflow-y-scroll h-[80vh] rounded-[4px] p-3'>
            <h4 className='text-[30px] font-Poppins text-center'>Create Product</h4>


            {/* cproduct form  */}

            <form action="" onSubmit={handleSubmit}>

                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2'>Name <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        name='name'
                        placeholder='Enter Product Name'
                        className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                        value={name}
                        onChange={(e) => { setName(e.target.value) }} />
                </div>

                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2'>Sku Id <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        name='skuid'
                        placeholder='Enter Product Sku'
                        className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                        value={skuid}
                        onChange={(e) => { setSkuid(e.target.value) }} />
                </div>

                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2'>Description <span className='text-red-500'>*</span></label>
                    <textarea

                        name='description'
                        placeholder='Enter Product Description'
                        className='mt-1 appearance-none block w-full px-3 h-[75px] border border-gray-300 rounded-[3px] pt-1 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    >

                    </textarea>

                </div>

                <div className='font-Poppins mt-4'>
                    <label htmlFor='category' className='pb-2'>Category <span className='text-red-500'>*</span></label>
                    <select
                        id='category'
                        className='w-full mt-1 border h-[35px] rounded-[5px]'
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        <option value=''>Choose a Category</option>
                        {categoriesData.map((cat) => (
                            <option key={cat.id} value={cat.title}>{cat.title}</option>
                        ))}
                    </select>
                </div>

                <div className='font-Poppins mt-4'>
                    <label htmlFor='subcategory' className='pb-2'>Subcategory <span className='text-red-500'>*</span></label>
                    <select
                        id='subcategory'
                        className='w-full mt-1 border h-[35px] rounded-[5px]'
                        value={subcategory}
                        onChange={handleSubcategoryChange}
                    >
                        <option value=''>Choose a Subcategory</option>
                        {category &&
                            categoriesData
                                .find((cat) => cat.title === category)
                                ?.subcategories.map((subcat, index) => (
                                    <option key={index} value={subcat.name}>{subcat.name}</option>
                                ))}
                    </select>
                </div>







                {/* chain without chain */}

                <div className='font-Poppins mt-4'>

                    <h2 className='mb-2'>Add Variants for the Product</h2>


                    <Popover className="">
                        <PopoverTrigger >
                            <div className='flex  items-center'>

                                <IoIosAdd size={20} />
                                <label variant="outline">Chain  <span className='text-red-500'>(Not Mandatory)</span></label>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-[80%] bg-white relative left-[65%] top-10">
                            <div className="grid gap-4 bg-white">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Chain Options</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Set the Chain with / without for the product.
                                    </p>
                                </div>
                                <div className="gap-2">
                                    {/* Option 1: With Chain */}
                                    <div className="mb-3">
                                        <div className='flex gap-2'>
                                            <input type="checkbox" id='withchain' onChange={handleToggleWithChainImages} />
                                            <label htmlFor="withchain">With Chain</label>
                                        </div>


                                        {showWithChainImages && (
                                            <div>
                                                <label htmlFor="withchains" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                </label>
                                                <input type="file" id='withchains' className='hidden' multiple onChange={handlewithImageChange} />
                                                <div className='flex flex-wrap justify-center gap-2'>
                                                    {withchainimages && withchainimages.map((file, index) => (
                                                        <div key={`withchain_${index}`} className='relative'>
                                                            <AiOutlineCloseCircle
                                                                size={22}
                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                onClick={() => handleDeleteWithChainImage(index)}
                                                            />
                                                            <img
                                                                key={`withchain_image_${index}`}
                                                                src={URL.createObjectURL(file)}
                                                                alt={`With Chain ${index}`}
                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>


                                    <div className="mb-3">
                                        <div className='flex gap-2'>
                                            <input type="checkbox" id='withoutchain' onChange={handleToggleWithoutChainImages} />
                                            <label htmlFor="withoutchain">Without Chain</label>
                                        </div>
                                        {showWithoutChainImages && (
                                            <div>
                                                <label htmlFor="withoutchains" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                </label>
                                                <input type="file" id='withoutchains' className='hidden' multiple onChange={handlewithoutImageChange} />
                                                <div className='flex flex-wrap justify-center gap-2'>
                                                    {withchainoutimages && withchainoutimages.map((file, index) => (
                                                        <div key={`withchainout_${index}`} className='relative'>
                                                            <AiOutlineCloseCircle
                                                                size={22}
                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                onClick={() => handleDeleteWithoutChainImage(index)}
                                                            />
                                                            <img
                                                                key={`withchainout_image_${index}`}
                                                                src={URL.createObjectURL(file)}
                                                                alt={`Without Chain ${index}`}
                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                            />
                                                        </div>
                                                    ))}

                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>


                            <div>
                                <div className=''>

                                    <button className='bg-slate-800 text-white w-[50%] px-2 py-2 rounded' onClick={handleAddChain}>Add Chain</button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>


                    {/* Display selected chain images */}
                    <div className='bg-white ml-5'>
                        <h3 className='cursor-pointer flex items-center' onClick={() => toggleShowImages('withchain')}> <BsDash /> With Chain</h3>
                        {showWithChainImages && (
                            <table className='w-full'>
                                <thead>
                                    <tr className='border-b'>
                                        <th className='px-4 py-2'>Name</th>
                                        <th className='px-4 py-2'>Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {withchainimages && withchainimages.map((val, i) => (
                                        <tr key={i} className='border-b'>
                                            <td className='px-4 py-2'>{val.name}</td>
                                            <td className='px-4 py-2'>
                                                <img className='h-[80px] w-[80px] object-cover' src={URL.createObjectURL(val)} alt="" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className='bg-white ml-5'>
                        <h3 className='cursor-pointer flex items-center' onClick={() => toggleShowImages('withoutchain')}><BsDash /> Without Chain</h3>
                        {showWithoutChainImages && (
                            <table className='w-full'>
                                <thead>
                                    <tr className='border-b'>
                                        <th className='px-4 py-2'>Name</th>
                                        <th className='px-4 py-2'>Image</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {withchainoutimages && withchainoutimages.map((val, i) => (
                                        <tr key={i} className='border-b'>
                                            <td className='px-4 py-2'>{val.name}</td>
                                            <td className='px-4 py-2'>
                                                <img className='h-[80px] w-[80px] object-cover' src={URL.createObjectURL(val)} alt="" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>







                </div>


                {/* // metal color */}


                <div className='font-Poppins mt-4'>

                    <h2 className='mb-2 p-2 border border-[#555]'>Add Color for the Product</h2>


                    <Popover className="">
                        <PopoverTrigger >
                            <div className='flex  items-center'>

                                <IoIosAdd size={20} />
                                <label variant="outline">Metal Color  <span className='text-red-500'>(Not Mandatory)</span></label>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] bg-white relative left-[65%] top-10">
                            <div className="w-[100%] grid gap-4 bg-white">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Metal Color</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Set the Color of the product.
                                    </p>
                                </div>
                                <div className="gap-2">
                                    {/* Option 1: With yellow gold */}
                                    <div className="mb-3">
                                        <div className='flex gap-2'>
                                            <input type="checkbox" id='yellowgold' onChange={handleToggleWithYellowclr} />
                                            <label htmlFor="yellowgold">Yellow Gold</label>
                                        </div>


                                        {showWithYellowclrImages && (
                                            <div>
                                                <label htmlFor="yellowclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                </label>
                                                <input type="file" id='yellowclr' className='hidden' multiple onChange={handlewithYellowclr} />
                                                <div className='flex flex-wrap justify-center gap-2'>
                                                    {YellowGoldclr && YellowGoldclr.map((file, index) => (
                                                        <div key={`withchain_${index}`} className='relative'>
                                                            <AiOutlineCloseCircle
                                                                size={22}
                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                onClick={() => handleDeleteWithYellowclrImage(index)}
                                                            />
                                                            <img
                                                                key={`withchain_image_${index}`}
                                                                src={URL.createObjectURL(file)}
                                                                alt={`With Chain ${index}`}
                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Option 2: With rose gold */}

                                    <div className="mb-3">
                                        <div className='flex gap-2'>
                                            <input type="checkbox" id='rosegold' onChange={handleToggleWithRoseclr} />
                                            <label htmlFor="rosegold">Rose Gold</label>
                                        </div>


                                        {showWithRoseclrImages && (
                                            <div>
                                                <label htmlFor="rosegoldclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                </label>
                                                <input type="file" id='rosegoldclr' className='hidden' multiple onChange={handlewithRoseclr} />
                                                <div className='flex flex-wrap justify-center gap-2'>
                                                    {RoseGoldclr && RoseGoldclr.map((file, index) => (
                                                        <div key={`withchain_${index}`} className='relative'>
                                                            <AiOutlineCloseCircle
                                                                size={22}
                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                onClick={() => handleDeleteWithRoseclrImage(index)}
                                                            />
                                                            <img
                                                                key={`withchain_image_${index}`}
                                                                src={URL.createObjectURL(file)}
                                                                alt={`With Chain ${index}`}
                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Option 3: With white gold */}


                                    <div className="mb-3">
                                        <div className='flex gap-2'>
                                            <input type="checkbox" id='whitegold' onChange={handleToggleWithWhiteclr} />
                                            <label htmlFor="whitegold">White Gold</label>
                                        </div>


                                        {showWithWhiteclrImages && (
                                            <div>
                                                <label htmlFor="whitegoldclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                </label>
                                                <input type="file" id='whitegoldclr' className='hidden' multiple onChange={handlewithWhiteclr} />
                                                <div className='flex flex-wrap justify-center gap-2'>
                                                    {WhiteGoldclr && WhiteGoldclr.map((file, index) => (
                                                        <div key={`withchain_${index}`} className='relative'>
                                                            <AiOutlineCloseCircle
                                                                size={22}
                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                onClick={() => handleDeleteWithWhiteclrImage(index)}
                                                            />
                                                            <img
                                                                key={`withchain_image_${index}`}
                                                                src={URL.createObjectURL(file)}
                                                                alt={`With Chain ${index}`}
                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>



                                </div>
                            </div>


                            <div>
                                <div className='m-auto w-[80%]'>

                                    <button className='bg-slate-800 text-white w-[80%] px-2 py-2 rounded' onClick={handleAddMetalColor}>Add Metal Color</button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>


                    {/* Display selected color images */}
                    <div className='bg-white ml-5'>
                        <h3 className='cursor-pointer flex items-center' onClick={() => toggleShowImagesColor('yellowcolor')}> <BsDash />Yellow Gold </h3>
                        {showWithYellowclrImages && (
                            <table className='w-full'>
                                <thead>
                                    <tr className='border-b'>
                                        <th className='px-4 py-2'>Name</th>
                                        <th className='px-4 py-2'>Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {YellowGoldclr && YellowGoldclr.map((val, i) => (
                                        <tr key={i} className='border-b'>
                                            <td className='px-4 py-2'>{val.name}</td>
                                            <td className='px-4 py-2'>
                                                <img className='h-[80px] w-[80px] object-cover' src={URL.createObjectURL(val)} alt="" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>


                    <div className='bg-white ml-5'>
                        <h3 className='cursor-pointer flex items-center' onClick={() => toggleShowImagesColor('rosecolor')}><BsDash /> Rose Gold</h3>
                        {showWithRoseclrImages && (
                            <table className='w-full'>
                                <thead>
                                    <tr className='border-b'>
                                        <th className='px-4 py-2'>Name</th>
                                        <th className='px-4 py-2'>Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {RoseGoldclr && RoseGoldclr.map((val, i) => (
                                        <tr key={i} className='border-b'>
                                            <td className='px-4 py-2'>{val.name}</td>
                                            <td className='px-4 py-2'>
                                                <img className='h-[80px] w-[80px] object-cover' src={URL.createObjectURL(val)} alt="" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>


                    <div className='bg-white ml-5'>
                        <h3 className='cursor-pointer flex items-center' onClick={() => toggleShowImagesColor('whitecolor')}><BsDash /> White Gold</h3>
                        {showWithWhiteclrImages && (
                            <table className='w-full'>
                                <thead>
                                    <tr className='border-b'>
                                        <th className='px-4 py-2'>Name</th>
                                        <th className='px-4 py-2'>Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {WhiteGoldclr && WhiteGoldclr.map((val, i) => (
                                        <tr key={i} className='border-b'>
                                            <td className='px-4 py-2'>{val.name}</td>
                                            <td className='px-4 py-2'>
                                                <img className='h-[80px] w-[80px] object-cover' src={URL.createObjectURL(val)} alt="" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>








                </div>


                {/* Enamelcolor */}


                <div className='font-Poppins mt-6'>
                    <h2 className='mb-2 p-2 border border-[#555]'>Add Enamel Color of the Product</h2>

                    <Popover className="">
                        <PopoverTrigger >
                            <div className='flex items-center'>

                                <IoIosAdd size={20} />
                                <label variant="outline">Enamel Color  <span className='text-red-500'>(Not Mandatory)</span></label>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-[380px] bg-white relative left-[65%] top-10">
                            <div className="w-[100%] grid gap-4 bg-white">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Enamel Color</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Add Enamel Color for the product.
                                    </p>
                                </div>

                                <div className="gap-2 w-[100%]">
                                    <div className='w-[100%] flex items-center'>
                                        <input type="text"
                                            placeholder='Enter Enamel Color'
                                            className='w-[70%] border border-[#555] px-2 py-1'
                                            value={enamelColor}
                                            onChange={(e) => setEnamelColor(e.target.value)} />
                                        <button className='ml-4 bg-slate-500 px-4 py-1 text-[white]  rounded-[5px]' onClick={handleAddEnamelColor}>Add</button>
                                    </div>


                                    <div className='mt-4'>
                                        {enamelColorsList.length > 0 && (
                                            <ul className='list-disc list-inside'>
                                                {enamelColorsList.map((color, index) => (
                                                    <li key={index} className='flex justify-between'>
                                                        <span> {color}</span>
                                                        <IoMdClose
                                                            className='ml-2 text-red-600 cursor-pointer'
                                                            onClick={() => handleRemoveEnamelColor(index)}
                                                        />
                                                    </li>

                                                ))}
                                            </ul>
                                        )}
                                    </div>



                                </div>



                            </div>


                        </PopoverContent>


                    </Popover>



                    <div className='mt-2'>
                        {enamelColorsList.length > 0 && (
                            <ul className='list-disc list-inside'>
                                {
                                    enamelColorsList.map((color, index) => {

                                        return (

                                            <div key={index}>
                                                <Popover className="">
                                                    <PopoverTrigger >
                                                        <li className='flex justify-between mt-2'>
                                                            <span> {color}</span>
                                                            <IoMdClose
                                                                className='ml-2 text-red-600 cursor-pointer'
                                                                onClick={() => handleRemoveEnamelColor(index)}
                                                            />
                                                        </li>
                                                    </PopoverTrigger>

                                                    <PopoverContent className="w-[380px] bg-white relative left-[65%] top-10">
                                                        <div className="space-y-2">
                                                            <h4 className="font-medium leading-none">Enamel Color :- <span className='capitalize'>{color}</span> </h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                Add Enamel Color for the product.
                                                            </p>
                                                        </div>
                                                        <div className='font-Poppins mt-4 cursor-pointer'>
                                                            <label htmlFor="" className='pb-2'>Upload Images for {color} color <span className='text-red-500'>*</span></label>
                                                            <div className='w-full flex items-center flex-wrap'>
                                                                <input type="file" className='hidden' id={`${color}`} multiple onChange={(e) => handleAddImage(e, index)} />
                                                                <label htmlFor={`${color}`}>
                                                                    <AiOutlinePlusCircle size={30} className='mt-3' color='#555' />
                                                                </label>

                                                                {/* Display uploaded images */}
                                                                {enamelColorImages[index] && enamelColorImages[index].map((image, i) => (
                                                                    <img
                                                                        src={URL.createObjectURL(image)}
                                                                        key={i}
                                                                        alt={`Enamel Color ${color.name} Image ${i}`}
                                                                        className='h-[100px] w-[100px] object-cover m-2'
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>



                                                    </PopoverContent>
                                                </Popover>

                                            </div>
                                        )
                                    }


                                    )}

                            </ul>
                        )}
                    </div>


                </div>













                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2'>Tags</label>
                    <input type="text"
                        name='tags'
                        placeholder='Enter Product Tags'
                        className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                        value={tags}
                        onChange={(e) => { setTags(e.target.value) }} />
                </div>

                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2'>Original Price <span className='text-red-500'>*</span></label>
                    <input type="number"
                        name='oprice'
                        placeholder='Enter Product Original Price'
                        className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                        value={originalPrice}
                        onChange={(e) => { setOriginalPrice(e.target.value) }} />
                </div>
                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2'>Price (With Discount) <span className='text-red-500'>*</span></label>
                    <input type="number"
                        name='disprice'
                        placeholder='Enter Product Discount Price'
                        className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                        value={discountPrice}
                        onChange={(e) => { setDiscountPrice(e.target.value) }} />
                </div>

                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2'>Product Stocks <span className='text-red-500'>*</span></label>
                    <input type="number"
                        name='disprice'
                        placeholder='Enter Product Stocks Availability'
                        className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                        value={stock}
                        onChange={(e) => { setStock(e.target.value) }} />
                </div>



                {/* weight section */}

                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2 font-[600]'>Gold Weight<span className='text-red-500'>*</span></label>
                    <div className='flex justify-between items-center'>

                        <div className='mt-1 w-[45%]'>

                            <label htmlFor="goldWeight">Weight</label>

                            <input type="text"
                                id='goldWeight'
                                placeholder='Enter Weight '
                                value={goldWeight.weight}
                                onChange={(e) => setGoldWeight({ ...goldWeight, weight: e.target.value })}
                                className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                            />
                        </div>
                        <div className='mt-1 w-[45%]'>

                            <label htmlFor="goldPurity">Purity</label>

                            <input type="text"
                                id='goldPurity'
                                placeholder='Enter Purity '
                                value={goldWeight.purity}
                                onChange={(e) => setGoldWeight({ ...goldWeight, purity: e.target.value })}

                                className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                            />
                        </div>

                    </div>

                </div>

                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2 font-[600]'>Diamond Weight<span className='text-red-500'>*</span></label>
                    <div className='flex justify-between items-center'>

                        <div className='mt-1 w-[45%]'>

                            <label htmlFor="diamondWeight">Weight</label>

                            <input type="text"
                                id='diamondWeight'
                                placeholder='Enter Weight '
                                value={diamondWeight.weight}
                                onChange={(e) => setDiamondWeight({ ...diamondWeight, weight: e.target.value })}
                                className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                            />
                        </div>
                        <div className='mt-1 w-[45%]'>

                            <label htmlFor="diamondQuality">Quality</label>

                            <input type="text"
                                id='diamondQuality'
                                placeholder='Enter Quality '
                                value={diamondWeight.quality}
                                onChange={(e) => setDiamondWeight({ ...diamondWeight, quality: e.target.value })}
                                className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                            />
                        </div>

                    </div>

                </div>


                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2 font-[600]'>Dimension <span className='text-red-500'>*</span></label>
                    <div className='flex justify-between items-center'>

                        <div className='mt-1 w-[45%]'>

                            <label htmlFor="height">Height</label>

                            <input type="text"
                                id='height'
                                placeholder='Enter Height '
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                            />
                        </div>
                        <div className='mt-1 w-[45%]'>

                            <label htmlFor="width">Width</label>

                            <input type="text"
                                name='width'
                                placeholder='Enter Width '
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                            />
                        </div>

                    </div>

                </div>




                {/* weight section */}

                <div className='font-Poppins mt-4 cursor-pointer'>
                    <label htmlFor="" className='pb-2'>Upload Images <span className='text-red-500'>*</span></label>
                    <div className='w-full flex items-center flex-wrap'>
                        <input type="file" className='hidden' id='upload' multiple onChange={handleImageChange} />
                        <label htmlFor="upload">
                            <AiOutlinePlusCircle size={30} className='mt-3' color='#555' />
                        </label>

                        {
                            images && images.map((val, i) =>
                            (
                                <img src={URL.createObjectURL(val)} key={i} alt="" className='h-[-120px] w-[120px] object-cover m-2' />

                            )

                            )
                        }

                    </div>

                </div>

                <div className='font-Poppins mt-4 cursor-pointer'>
                    <input
                        type="submit"
                        value="Create"
                        className=' cursor-pointer mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'

                    />
                </div>



            </form>
        </div>
    )
}

export default CreateProduct
