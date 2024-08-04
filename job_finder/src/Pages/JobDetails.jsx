import React from 'react'

const JobDetails = () => {
    const {id}= useParams();
  return (
    <div>
      JobDetails:{id}
    </div>
  )
}

export default JobDetails
