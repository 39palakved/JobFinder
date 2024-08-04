import React, { useEffect } from 'react'
import Banner from '../Components/Banner'
import { useState } from 'react';
import Job from './Job';

import Cards from '../Components/Cards';
import Sidebar from '../sidebar/Sidebar';
import Newsletter from '../Components/Newsletter';
function Home() {
    const [selectedCategory,setSelectedCategory]=useState(null);
    const[jobs,setJobs]=useState([]);
   const [isLoading ,setisLoading]=useState(true);
   const [currentPage,setCurrentPage]=useState(1);
   const itemPerPage=6;


    useEffect(()=>{
        setisLoading(true);
        fetch("jobs.json").then(res=>res.json()).then(data=>{
            console.log(data);
            setJobs(data);
            setisLoading(false);
        })
    },[])
    const[query,setQuery] =useState("");
    const handleInputChange=(event)=>{
        setQuery(event.target.value)
        
    }
//filter jobs by title
const filteredItems=jobs.filter((job)=>job.jobTitle.toLowerCase().indexOf(query.toLowerCase())!==-1);
console.log(filteredItems);
const handleChange=(event)=>{
    setSelectedCategory(event.target.value);

}
//button based filtering 
const handleClick =(event)=>{
    setSelectedCategory(event.target.value);
}
//calculate the index range 
const calculatePageRange=()=>{
    const startIndex=(currentPage-1)*itemPerPage;
    const endIndex=startIndex+itemPerPage;
    return {startIndex,endIndex}
}
//function for the next page
const nextPage=()=>{
    if(currentPage <Math.ceil(filteredItems.length/itemPerPage)){
        setCurrentPage(currentPage+1);
    }
}

//function for the previous age
const prevpage=()=>{
    if(currentPage>1){
        setCurrentPage(currentPage-1)}
}


const filteredData =(jobs,selected,query)=>
{
    let filteredJobs = jobs;
    if(query){
        filteredJobs = filteredItems;
    }
    if(selected){
        filteredJobs = filteredJobs.filter(({jobLocation,maxPrice,experienceLevel,salaryType,employmentType,postingDate})=>
            jobLocation.toLowerCase() === selected .toLowerCase()||
        experienceLevel.toLowerCase()===selected.toLowerCase()||
        parseInt(maxPrice) <= parseInt(selected)  || 
        postingDate>=selected ||salaryType.toLowerCase()===selected.toLowerCase() ||
        employmentType.toLowerCase()===selected.toLowerCase()
        );
    }
    //slice the data based on current page
    const {startIndex,endIndex}=calculatePageRange();
    filteredJobs=filteredJobs.slice(startIndex,endIndex)
    return filteredJobs.map((data,i)=><Cards key={i} data={data}/>)

}
const result = filteredData(jobs,selectedCategory,query);
 return (
    <div >
      <Banner query={query} handleInputChange={handleInputChange} handleClick={handleClick}/>
      <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
        {/* left side*/}
      <div className='bg-white p-4 rounded'><Sidebar handleChange={handleChange}/></div>
      <div className='col-span-2 bg-white p-4 rounded-sm'>
        {
            isLoading ? (<p className='font-medium'>Loading...</p> ) : result.length >0 ? (<Job result={result}/>) :<>
            <h3 className='text-lg font-bold mb-2'>{result.length} jobs</h3>
            <p>No Data Found</p></>
          }
          
          {/* pagination here */}
          {
          result.length > 0 ? (

            <div className='flex justify-center mt-4 space-x-8'>
                <button onClick={prevpage} disabled={currentPage===1}>Previous</button>
                <span className='mx-2'>Page {currentPage} of {Math.ceil(filteredItems.length/itemPerPage)}</span>
                <button onClick={nextPage} disabled={currentPage===Math.ceil(filteredItems.length/ itemPerPage)}>Next</button>
            </div>
          ) : ""
          
        }</div>
      <div className='bg-white p-4 rounded'><Newsletter/></div>
      </div>
    </div>
  )
}

export default Home
