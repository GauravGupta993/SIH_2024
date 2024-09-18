import React from 'react';

const JobPost = ({ job }) => {
  return (
    <div className="job-post bg-white shadow-xl rounded-lg p-6 transition-transform hover:scale-105 duration-300">
      <h3 className="text-xl font-bold mb-2 text-gray-800">{job.title}</h3>
      <p className="text-gray-600 mb-2">{job.company}</p>
      <p className="text-gray-500 mb-4">{job.location}</p>
      <p className="text-gray-700 mb-4">{job.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span>Salary: {job.salary}</span>
        <span>Posted: {job.postedDate}</span>
      </div>
      <div className="flex justify-between">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
          View Student Responses
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg">
          Provide Referral
        </button>
      </div>
    </div>
  );
};

export default JobPost;

