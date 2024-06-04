
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loader = ({ size = 50, color = "#00BFFF" }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <ClipLoader color={color} size={size} />
    </div>
  );
};

export default Loader;
