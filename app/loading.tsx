import React from 'react';

const Loading = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      <div 
        className="w-20 h-20 border-8 border-gray-100 rounded-full animate-spin"
        style={{
          borderTopColor: '#a7c957'
        }}
      />
      
    </div>
  );
};

export default Loading;