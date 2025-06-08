import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-2">
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-200 border-t-current`} 
             style={{borderTopColor: '#BFD741'}}></div>
        {text && <span className="text-sm text-gray-500">{text}</span>}
      </div>
    </div>
  );
};

export const CardLoadingSkeleton = () => (
  <div className="p-4 bg-white rounded-lg border border-gray-200 animate-pulse">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-2 h-2 rounded-full bg-gray-200"></div>
      <div className="h-3 bg-gray-200 rounded w-20"></div>
    </div>
    <div className="h-8 bg-gray-200 rounded w-12 mb-1"></div>
    <div className="h-3 bg-gray-200 rounded w-16"></div>
  </div>
);

export const TableLoadingSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8 animate-pulse">
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="h-4 bg-gray-200 rounded w-24"></div>
    </div>
    <div className="p-6">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center space-x-4 py-3">
          <div className="h-4 bg-gray-200 rounded flex-1"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      ))}
    </div>
  </div>
);

export default LoadingSpinner; 