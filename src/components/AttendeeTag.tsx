import React from 'react';

interface AttendeeTagProps {
  name: string;
  isCheckedIn: boolean;
  onCheckIn?: (dept: string) => void;
  isPresenter?: boolean;
}

export function AttendeeTag({ 
  name, 
  isCheckedIn, 
  onCheckIn,
  isPresenter = false 
}: AttendeeTagProps) {
  return (
    <span 
      onClick={() => onCheckIn?.(name)}
      className={`
        px-2 py-0.5 rounded-full text-sm
        ${isCheckedIn 
          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
        ${isPresenter && !isCheckedIn
          ? 'border-2 border-yellow-400'
          : ''
        }
        ${onCheckIn ? 'cursor-pointer' : 'cursor-default'}
        transition-colors
      `}
    >
      {name}
      {isCheckedIn && (
        <span className="ml-1 text-xs">✓</span>
      )}
    </span>
  );
}