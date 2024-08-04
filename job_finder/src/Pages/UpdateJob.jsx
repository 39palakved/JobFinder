
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import CreatableSelect from "react-select/creatable"

import { useLoaderData, useParams } from 'react-router-dom'

function UpdateJob() {
    const {id}  =useParams();
    console.log(id);
const {_id,jobTitle,companyName,minPrice,maxPrice,salaryType,jobLocation,postingDate,experienceLevel,companyLogo,employmentType,description,postedBy,skills} = useLoaderData()
const [selectedoption, setSelectedOption] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    data.skills = selectedoption;
    console.log(data);
    fetch(`http://localhost:3000/edit-job/${id}`, {  // Updated endpoint to match server route
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json()).then((result) => {
      console.log(result);
      if(result.acknowledged===true){
        alert("Job Updated Successfully");
      }
      reset()
    }).catch((error) => {
      console.error('Error:', error);
    });
  };


  //console.log(watch("example")) // watch input value by passing the name of it

  const options = [
    { value: "javaScript", label: "javaScript" },
    { value: "C++", label: "C++" },
    { value: "React.js", label: "React.js" },
    { value: "CSS", label: "CSS" },
    { value: "HTML", label: "HTML" },
    { value: "MongoDB", label: "MongoDB" }
  ]

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
    <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
          <div className='lg:w-1/2 w-full '>
            <label className='block mb-2 text-lg'>Job Title</label>
            <input type="text" defaultValue={jobTitle} {...register("jobTitle")} className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm-text-sm sm:leading-6' />
          </div>
          <div className='lg:w-1/2 w-full'>
            <label className='block mb-2 text-lg'>Company Name</label>
            <input type="text" placeholder='Ex:Microsoft'  defaultValue={companyName} {...register("companyName")} className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm-text-sm sm:leading-6' />
          </div>
        </div>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
          <div className='lg:w-1/2 w-full '>
            <label className='block mb-2 text-lg'>Minimum Salary</label>
            <input type="text" placeholder='2300'  defaultValue={minPrice} {...register("minPrice")} className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm-text-sm sm:leading-6' />
          </div>
          <div className='lg:w-1/2 w-full '>
            <label className='block mb-2 text-lg'>Maximum Salary</label>
            <input type="text" placeholder='100000' defaultValue={maxPrice} {...register("maxPrice")} className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm-text-sm sm:leading-6' />
          </div>
        </div>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
          <div className='lg:w-1/2 w-full '>
            <label className='block mb-2 text-lg'>Salary Type</label>
            <select {...register("salaryType", { required: true })} className='create-job-input'>
              <option value={salaryType}>{salaryType}</option>
              <option value="Hourly">Hourly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
          <div className='lg:w-1/2 w-full '>
            <label className='block mb-2 text-lg'>Job Location</label>
            <input type="text" placeholder='Ex:Indore' defaultValue={jobLocation} {...register("jobLocation")} className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm-text-sm sm:leading-6' />
          </div>
        </div>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
          <div className='lg:w-1/2 w-full '>
            <label className='block mb-2 text-lg'>Job Posting Date</label>
            <input type="date" placeholder='Ex:11-06-2024' defaultValue={postingDate} {...register("postingDate")} className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm-text-sm sm:leading-6' />
          </div>
          <div className='lg:w-1/2 w-full '>
            <label className='block mb-2 text-lg'>Experience level</label>
            <select {...register("experienceLevel", { required: true })} className='create-job-input'>
                <option value={experienceLevel}>{experienceLevel}</option>
              <option value="Internship">Internship</option>
              <option value="Work remotely">Work Remotely</option>
              <option value="Any experience">Hybrid</option>
            </select>
          </div>
        </div>
        <div>
          <label className='block mb-2 text-lg'>Required Skills</label>
          <CreatableSelect defaultValue={skills} isMulti onChange={setSelectedOption} options={options} className='text-black' />
        </div>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-8 mt-4'>
          <div className='lg:w-1/2 w-full '>
            <label className='block mb-2 text-lg'>Company Logo</label>
            <input type="url" placeholder='Paste your Company URL' defaultValue={companyLogo} {...register("companyLogo")} className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm-text-sm sm:leading-6' />
          </div>
          <div className='lg:w-1/2 w-full '>
            <label className='block mb-2 text-lg '>Employment Type</label>
            <select {...register("employmentType", { required: true })} className='create-job-input'>
                <option value={employmentType}></option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>
        </div>
        <div className='mt-4'>
          <label className='w-full '>Job Description</label>
          <textarea  {...register("description")}  className='w-full pl-3 py-1.5 mt-4 focus:outline-none placeholder:text-gray-700' rows={6} placeholder='Job Description' defaultValue={description} ></textarea>
        </div>
        <div className='w-full'>
          <label className='block mb-2 text-lg'>Job Posted By</label>
          <input type="text" placeholder='your email' defaultValue={postedBy} {...register("postedBy")} className='block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm-text-sm sm:leading-6' />
        </div>
        <input type="submit" className='my-5 block mt-12 bg-blue-600 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer' />
      </form>
    </div>
  </div>
  )
}

export default UpdateJob
