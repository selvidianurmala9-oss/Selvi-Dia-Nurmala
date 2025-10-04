
import React from 'react';
import { Meeting } from '../types';
import { BookOpenIcon, FlagIcon, LightBulbIcon, PencilSquareIcon, SparklesIcon } from './IconComponents';

interface SidebarProps {
  meetings: Meeting[];
  selectedMeetingId: number | null;
  onSelectMeeting: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ meetings, selectedMeetingId, onSelectMeeting }) => {
  const getIcon = (meeting: Meeting) => {
    if (meeting.isExam) return <FlagIcon className="h-5 w-5 text-red-400" />;
    if (meeting.isProject) return <SparklesIcon className="h-5 w-5 text-purple-400" />;
    if (meeting.isReview) return <LightBulbIcon className="h-5 w-5 text-yellow-400" />;
    return <BookOpenIcon className="h-5 w-5 text-sky-400" />;
  };

  return (
    <aside className="w-64 bg-slate-800 text-white flex flex-col shadow-lg">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <PencilSquareIcon className="h-6 w-6" />
          Daftar Pertemuan
        </h2>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul>
          {meetings.map((meeting) => (
            <li key={meeting.id}>
              <button
                onClick={() => onSelectMeeting(meeting.id)}
                className={`w-full text-left p-3 flex items-center gap-3 transition-colors duration-200 ease-in-out ${
                  selectedMeetingId === meeting.id
                    ? 'bg-sky-600'
                    : 'hover:bg-slate-700'
                }`}
              >
                <div className="flex-shrink-0">{getIcon(meeting)}</div>
                <span className="flex-1 text-sm font-medium">
                  Pertemuan {meeting.id}: {meeting.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-3 border-t border-slate-700 text-center text-xs text-slate-400">
        &copy; 2024 FTI
      </div>
    </aside>
  );
};

export default Sidebar;
