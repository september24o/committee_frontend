import React from 'react';
import { Clock, Building2, Users } from 'lucide-react';
import { AgendaItem } from '../types/agenda';
import { AttendeeTag } from './AttendeeTag';

interface AgendaCardProps {
  item: AgendaItem;
  isCurrent?: boolean;
  onCheckIn?: (deptName: string) => void;
  onPresenterCheckIn?: () => void;
}

export function AgendaCard({ 
  item, 
  isCurrent = false, 
  onCheckIn,
  onPresenterCheckIn 
}: AgendaCardProps) {
  const totalAttendees = item.attendees.length + 1; // +1 for presenting department
  const totalCheckedIn = (item.checkedInDepts?.length || 0) + (item.presenterCheckedIn ? 1 : 0);

  return (
    <div className={`rounded-lg p-4 ${isCurrent ? 'bg-white shadow-lg border-l-4 border-blue-500' : 'bg-gray-50'}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
        {isCurrent && item.startTime && (
          <div className="flex items-center text-blue-600">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">开始时间: {item.startTime}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Building2 className="w-4 h-4 mr-2" />
          <span>提出部门：</span>
          <AttendeeTag
            name={item.department}
            isCheckedIn={item.presenterCheckedIn || false}
            onCheckIn={onPresenterCheckIn ? () => onPresenterCheckIn() : undefined}
            isPresenter
          />
        </div>
        
        <div className="flex items-center text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          <div className="flex items-center flex-wrap gap-1">
            <span>列席部门：</span>
            {item.attendees.map((attendee) => (
              <AttendeeTag
                key={attendee}
                name={attendee}
                isCheckedIn={item.checkedInDepts?.includes(attendee) || false}
                onCheckIn={onCheckIn}
              />
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          已签到: {totalCheckedIn}/{totalAttendees}
        </div>
      </div>
    </div>
  );
}