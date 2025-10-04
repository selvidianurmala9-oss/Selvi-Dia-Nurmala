import React, { useState, useRef, useEffect } from 'react';
import { Meeting } from '../types';
import {
  BookOpenIcon,
  FlagIcon,
  LightBulbIcon,
  PencilSquareIcon,
  SparklesIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  LogoUMMetro,
  LogoFikom,
} from './IconComponents';

interface HeaderProps {
  meetings: Meeting[];
  selectedMeetingId: number | null;
  onSelectMeeting: (id: number | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ meetings, selectedMeetingId, onSelectMeeting, searchQuery, onSearchChange, theme, onToggleTheme }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedMeeting = meetings.find((m) => m.id === selectedMeetingId);

  const getIcon = (meeting: Meeting) => {
    if (meeting.isExam) return <FlagIcon className="h-5 w-5 text-red-400" />;
    if (meeting.isProject) return <SparklesIcon className="h-5 w-5 text-purple-400" />;
    if (meeting.isReview) return <LightBulbIcon className="h-5 w-5 text-yellow-400" />;
    return <BookOpenIcon className="h-5 w-5 text-avalanche-red" />;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredMeetings = meetings.filter(meeting => {
    const query = searchQuery.toLowerCase();
    if (!query) return true;
    
    const titleMatch = meeting.title.toLowerCase().includes(query);
    const idMatch = `pertemuan ${meeting.id}`.includes(query);
    let typeMatch = false;
    if (meeting.isExam && ('ujian uts uas'.includes(query))) typeMatch = true;
    if (meeting.isProject && ('proyek project'.includes(query))) typeMatch = true;
    if (meeting.isReview && 'review'.includes(query)) typeMatch = true;

    return titleMatch || idMatch || typeMatch;
  });


  return (
    <header className="bg-white dark:bg-avalanche-surface shadow-sm p-4 border-b border-slate-200 dark:border-white/10 z-20">
      <div className="flex justify-between items-center gap-4">
        <button
          onClick={() => onSelectMeeting(0)}
          className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-avalanche-surface focus-visible:ring-avalanche-red rounded-lg p-1 -m-1"
          aria-label="Kembali ke halaman pengantar"
        >
          <LogoUMMetro className="h-9 w-9 text-slate-700 dark:text-slate-300" />
          <LogoFikom className="h-9 w-9 text-slate-700 dark:text-slate-300" />
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 truncate">
            Modul Praktikum PDT
          </h1>
        </button>
        
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Cari pertemuan..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsDropdownOpen(true)}
              className="w-32 md:w-56 pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-avalanche-red focus:border-avalanche-red transition-all duration-200 dark:bg-avalanche-dark-bg dark:border-white/20 dark:text-slate-200 dark:placeholder-slate-400"
            />
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-left bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-lg transition-colors duration-200 border border-slate-200 dark:bg-avalanche-dark-bg dark:hover:bg-avalanche-surface dark:text-slate-200 dark:border-white/20"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <PencilSquareIcon className="h-5 w-5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
              <span className="hidden md:inline truncate max-w-xs">
                {selectedMeeting && !searchQuery ? `Pertemuan ${selectedMeeting.id}: ${selectedMeeting.title}` : 'Pilih Pertemuan'}
              </span>
              <span className="md:hidden">
                {selectedMeeting && !searchQuery ? `P-${selectedMeeting.id}` : 'Menu'}
              </span>
              <ChevronDownIcon className={`h-5 w-5 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-avalanche-surface rounded-lg shadow-xl border border-slate-200 dark:border-white/20 overflow-hidden animate-fade-in-down">
                <div className="p-3 bg-slate-50 dark:bg-black/50 border-b border-slate-200 dark:border-white/10">
                  <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300">Daftar Pertemuan</h3>
                </div>
                <ul className="max-h-96 overflow-y-auto">
                  {filteredMeetings.length > 0 ? (
                    filteredMeetings.map((meeting) => (
                    <li key={meeting.id}>
                      <button
                        onClick={() => {
                          onSelectMeeting(meeting.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left p-3 flex items-center gap-3 transition-colors duration-200 ease-in-out ${
                          selectedMeetingId === meeting.id && !searchQuery ? 'bg-avalanche-red/10 text-avalanche-red dark:bg-avalanche-red/10 dark:text-avalanche-red' : 'hover:bg-slate-100 dark:hover:bg-avalanche-dark-bg'
                        }`}
                      >
                        <div className="flex-shrink-0">{getIcon(meeting)}</div>
                        <span className="flex-1 text-sm font-medium">
                          Pertemuan {meeting.id}: {meeting.title}
                        </span>
                      </button>
                    </li>
                  ))
                  ) : (
                    <li className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                      Tidak ada hasil ditemukan.
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
           <button
            onClick={onToggleTheme}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-avalanche-dark-bg transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;