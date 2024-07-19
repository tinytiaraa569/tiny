import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { categoriesData } from '../static/data'
import { AiOutlinePlusCircle } from 'react-icons/ai'

import { toast } from 'react-toastify'
import { createevent } from '@/redux/actions/event'

function CreateEvent() {
    const { seller } = useSelector((state) => state.seller)
    const { success ,error } = useSelector((state) => state.events)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [images, setImages] = useState([])
    const [name, setName] = useState("")
    const [skuid, setSkuid] = useState("")

    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("");

    const [tags, setTags] = useState("")
    const [originalPrice, setOriginalPrice] = useState()
    const [discountPrice, setDiscountPrice] = useState()
    const [stock, setStock] = useState()
    const [startDate,setStartDate ] = useState(null)
    const [endDate, setEndDate] = useState(null)


    const handleStartDateChange = (e) =>{
        const startDate = new Date(e.target.value)

        const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        setStartDate(startDate)
        setEndDate(null)
        document.getElementById("end-date").min = minEndDate.toISOString().slice(0,10)

    }

    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value)
        setEndDate(endDate)

    }

    const today = new Date().toISOString().slice(0,10)
    const minEndDate = startDate ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) : ""


    useEffect(()=>{

      if(error){
        toast.error(error)
      }
      if(success){
        toast.success("Event Created successfully")
        navigate("/dashboard")
        window.location.reload()
      }

    },[dispatch,error,success])

    const handleSubmit = (e) => {
        e.preventDefault()


        const newForm = new FormData()

        images.forEach((image)=>{
            newForm.append("images",image)
        })
        newForm.append("name",name)
        newForm.append("skuid",skuid)
        newForm.append("description",description)
        newForm.append("category",category)
        newForm.append("subcategory",subcategory)
        newForm.append("tags",tags)
        newForm.append("originalPrice",originalPrice)
        newForm.append("discountPrice",discountPrice)
        newForm.append("stock",stock)
        newForm.append("shopId",seller._id)
        newForm.append("start_Date",startDate.toISOString())
        newForm.append("finish_Date",endDate.toISOString())



        dispatch(createevent(newForm))








    }
    const handleImageChange = (e) => {
        e.preventDefault()

        let files = Array.from(e.target.files)
        setImages((prevImages)=>[...prevImages ,...files])

    }

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
    



    return (
        <div className='w-[50%] bg-white shadow px-8 overflow-y-scroll h-[80vh] rounded-[4px] p-3'>
            <h4 className='text-[30px] font-Poppins text-center'>Create Event</h4>


            {/* cproduct form  */}

            <form action="" onSubmit={handleSubmit}>

                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2'>Name <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        name='name'
                        placeholder='Enter Product Event Name'
                        className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                        value={name}
                        onChange={(e) => { setName(e.target.value) }} />
                </div>

                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2'>Sku Id <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        name='skuid'
                        placeholder='Enter Product Event Sku'
                        className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                        value={skuid}
                        onChange={(e) => { setSkuid(e.target.value) }} />
                </div>

                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2'>Description <span className='text-red-500'>*</span></label>
                    <textarea 
                    
                     name='description'
                     placeholder='Enter Product Event Description'
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

                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2'>Tags</label>
                    <input type="text"
                        name='tags'
                        placeholder='Enter Product Event Tags'
                        className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                        value={tags}
                        onChange={(e) => { setTags(e.target.value) }} />
                </div>

                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2'>Original Price <span className='text-red-500'>*</span></label>
                    <input type="number"
                        name='oprice'
                        placeholder='Enter Product Event Original Price'
                        className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                        value={originalPrice}
                        onChange={(e) => { setOriginalPrice(e.target.value) }} />
                </div>
                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2'>Price (With Discount) <span className='text-red-500'>*</span></label>
                    <input type="number"
                        name='disprice'
                        placeholder='Enter Product Event Discount Price'
                        className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                        value={discountPrice}
                        onChange={(e) => { setDiscountPrice(e.target.value) }} />
                </div>

                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2'>Product Stocks <span className='text-red-500'>*</span></label>
                    <input type="number"
                        name='disprice'
                        placeholder='Enter Product Event Stocks Availability'
                        className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                        value={stock}
                        onChange={(e) => { setStock(e.target.value) }} />
                </div>

                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2'>Event Start Date <span className='text-red-500'>*</span></label>
                    <input type="date"
                        name='adte'
                        placeholder='Enter Product Event Stocks Availability'
                        className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                        value={startDate ? startDate.toISOString().slice(0,10) : ""}
                        onChange={handleStartDateChange} 
                        min={today}
                        id='start-date'/>
                </div>
                <div className='font-Poppins mt-4'>
                    <label htmlFor="" className='pb-2'>Event End Date <span className='text-red-500'>*</span></label>
                    <input type="date"
                        name='adte'
                        placeholder='Enter Product Event Stocks Availability'
                        className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                        value={endDate ? endDate.toISOString().slice(0,10) : ""}
                        onChange={handleEndDateChange} 
                        min={minEndDate}
                        id='end-date'/>
                </div>


                <div className='font-Poppins mt-4 cursor-pointer'>
                    <label htmlFor="" className='pb-2'>Upload Images <span className='text-red-500'>*</span></label>
                    <div className='w-full flex items-center flex-wrap'>
                    <input type="file" className='hidden' id='upload' multiple onChange={handleImageChange}/>
                    <label htmlFor="upload">
                        <AiOutlinePlusCircle size={30} className='mt-3' color='#555' />
                    </label>

                    {
                        images && images.map((val)=> 
                            (
                            <img src={URL.createObjectURL(val)} key={val} alt="" className='h-[-120px] w-[120px] object-cover m-2' />

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

export default CreateEvent
