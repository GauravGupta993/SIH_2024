import React, { useState } from 'react';
import axios from 'axios';

const JobPost = ({ job, onApply }) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [resume, setResume] = useState('');

  const handleApply = () => {
    if (resume) {
      onApply(job.id, resume);
      setIsApplyModalOpen(false);
    } else {
      alert('Please upload a resume.');
    }
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
      <p className="text-gray-700">{job.company}</p>
      <p className="text-gray-600">Location: {job.location}</p>
      <p className="text-gray-600">Job Type: {job.jobType}</p>
      <p className="text-gray-600">Stipend: {job.stipend}</p>
      <p className="text-gray-700">{job.description}</p>
      <button
        onClick={() => setIsApplyModalOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4"
      >
        Apply
      </button>

      {/* Job Apply Modal */}
      {isApplyModalOpen && (
        <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Apply for {job.title}</h3>
            <input
              type="file"
              className="w-full p-2 mb-4 bg-gray-100 rounded-lg"
              onChange={(e) => setResume(e.target.files[0])}
            />
            <button
              onClick={handleApply}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Submit Application
            </button>
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const JobPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobType, setJobType] = useState('');
  const [stipend, setStipend] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = 'api url'; // Replace with your backend api

  const handleAddJob = async () => {
    if (!jobTitle || !companyName || !jobType || !stipend || !description || !location) {
      setFeedback('All fields are required!');
      return;
    }

    setIsLoading(true);
    setFeedback('');

    const newJob = {
      title: jobTitle,
      company: companyName,
      jobType,
      stipend,
      description,
      location,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/jobs`, newJob);
      setJobs([...jobs, response.data]);
      setIsModalOpen(false);
      resetForm();
      setFeedback('Job posted successfully!');
    } catch (error) {
      console.error('Error adding job:', error);
      setFeedback('Failed to post job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setJobTitle('');
    setCompanyName('');
    setJobType('');
    setStipend('');
    setDescription('');
    setLocation('');
  };

  const handleApply = async (jobId, resume) => {
    setIsLoading(true);
    setFeedback('');

    const formData = new FormData();
    formData.append('resume', resume);

    try {
      await axios.post(`${API_BASE_URL}/api/jobs/${jobId}/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFeedback('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
      setFeedback('Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="job-portal bg-gray-100 p-6">
      {/* Header and Create Job Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Job Portal</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg"
        >
          Create Job
        </button>
      </div>

      {/* Job List */}
      <div className="job-list flex flex-col space-y-4 py-4">
        {jobs.map((job) => (
          <JobPost key={job.id} job={job} onApply={handleApply} />
        ))}
      </div>

      {/* Modal for Job Creation */}
      {isModalOpen && (
        <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Create a Job</h3>

            <input
              type="text"
              className="w-full p-2 mb-4 bg-gray-100 rounded-lg"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />

            <input
              type="text"
              className="w-full p-2 mb-4 bg-gray-100 rounded-lg"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <input
              type="text"
              className="w-full p-2 mb-4 bg-gray-100 rounded-lg"
              placeholder="Job Type (e.g., Full-time, Part-time)"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            />

            <input
              type="text"
              className="w-full p-2 mb-4 bg-gray-100 rounded-lg"
              placeholder="Stipend"
              value={stipend}
              onChange={(e) => setStipend(e.target.value)}
            />

            <input
              type="text"
              className="w-full p-2 mb-4 bg-gray-100 rounded-lg"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <textarea
              className="w-full p-2 mb-4 bg-gray-100 rounded-lg"
              placeholder="Job Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddJob}
                disabled={isLoading}
                className={`${
                  isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
                } text-white font-semibold py-2 px-4 rounded-lg`}
              >
                {isLoading ? 'Posting...' : 'Post Job'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Message */}
      {feedback && (
        <div className={`mt-4 font-semibold ${feedback.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
          {feedback}
        </div>
      )}
    </div>
  );
};

export default JobPortal;