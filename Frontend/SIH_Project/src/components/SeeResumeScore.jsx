import React, { useState } from 'react';

const SeeResumeScore = () => {
  const [similarityScore, setSimilarityScore] = useState(null);

  const handleClick = () => {
    const score = localStorage.getItem('similarityScore');
    setSimilarityScore(score);
  };

  return (
    <div>
      <button onClick={handleClick}>See Score of This Resume</button>
      {similarityScore !== null && (
        <div>
          <h2>Similarity Score: {similarityScore}</h2>
        </div>
      )}
    </div>
  );
};

export default SeeResumeScore;