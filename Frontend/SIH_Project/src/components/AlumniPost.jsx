import React, { useState } from 'react';

const AlumniPost = () => {
  const [postContent, setPostContent] = useState('');

  const handlePost = () => {
    console.log('Alumni Post:', postContent);
  };

  return (
    <div className="alumni-post bg-white shadow-xl rounded-lg p-6 mb-12">
      <h3 className="text-2xl font-bold mb-4 text-gray-900">Create a Post</h3>
      <textarea
        className="w-full h-32 p-4 mb-4 bg-gray-100 rounded-lg text-gray-800"
        placeholder="Write something here..."
        value={postContent}
        onChange={e => setPostContent(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default AlumniPost;
