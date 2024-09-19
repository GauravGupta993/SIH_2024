import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [resume, setResume] = useState(null);
  // const [jobDescription, setJobDescription] = useState('');
  const [similarityScore, setSimilarityScore] = useState(null);
  const [error, setError] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');

  const jobDescription = `
    Bachelor's degree or equivalent practical experience.
    8 years of experience with software development in one or more programming languages (e.g., Python, C, C++, Java, JavaScript).
    3 years of experience in a technical leadership role; overseeing strategic projects, with 2 years of experience in a people management, supervision/team leadership role.
    Experience in Generative AI (Large Language Models, Multi-Modal, Large Vision Models).
    Experience with machine learning algorithms and tools (e.g., TensorFlow), artificial intelligence, deep learning, natural language processing or other ML discipline.
  `;

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
    setUploadMessage(''); // Reset upload message when a new file is selected
  };

  const handleDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('job_description', jobDescription);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          
        },
      });
      const score = response.data.similarity_score;
      setSimilarityScore(score);
      localStorage.setItem('similarityScore', score);
      setError('');
      setUploadMessage('Uploaded!');
    } catch (err) {
      setError('Error uploading file or calculating similarity.');
      setSimilarityScore(null);
      setUploadMessage('');
    }
  };

  return (
    <div>
      <h1>Resume Similarity Checker</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="resume">Upload Resume (PDF):</label>
          <input type="file" name="resume" id="resume" accept=".pdf" onChange={handleFileChange} required />
        </div>
        {/* <div>
          <label htmlFor="job_description">Job Description:</label>
          <textarea name="job_description" id="job_description" rows="10" cols="50" onChange={handleDescriptionChange} required></textarea>
        </div> */}
        <button type="submit">Check Similarity</button>
      </form>
      {uploadMessage && (
        <div>
          <h2>{uploadMessage}</h2>
        </div>
      )}
      {/* {similarityScore !== null && (
        <div>
          <h2>Similarity Score: {similarityScore}</h2>
        </div>
      )}
      {error && (
        <div>
          <h2>{error}</h2>
        </div>
      )} */}
    </div>
  );
};

export default UploadForm;