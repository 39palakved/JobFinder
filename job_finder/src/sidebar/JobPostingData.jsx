import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../Components/InputField';

function JobPostingData({ handleChange }) {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  // Convert dates to strings
  const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);
  const sevenDaysAgoDate = sevenDaysAgo.toISOString().slice(0, 10);
  const thirtyDaysAgoDate = thirtyDaysAgo.toISOString().slice(0, 10);

  return (
    <div>
      <h4 className='text-lg font-medium mb-2'>Date of Posting</h4>
      <div>
        <label className='sidebar-label-container'>
          <input type='radio' name='postingDate' value='' onChange={handleChange} />
          <span className='checkmark'></span>All Time
        </label>
        <InputField handleChange={handleChange} value={twentyFourHoursAgoDate} title="Last 24 Hours" name='postingDate' />
        <InputField handleChange={handleChange} value={sevenDaysAgoDate} title="Last 7 Days" name='postingDate' />
        <InputField handleChange={handleChange} value={thirtyDaysAgoDate} title="Last Month" name='postingDate' />
      </div>
    </div>
  );
}

JobPostingData.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default JobPostingData;
