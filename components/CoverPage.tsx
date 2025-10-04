import React from 'react';
import { Meeting } from '../types';
import { 
    LogoUMMetro, 
    LogoFikom,
    BookOpenIcon,
    FlagIcon,
    LightBulbIcon,
    SparklesIcon
} from './IconComponents';

interface CoverPageProps {
  onStart: () => void;
  meetings: Meeting[];
  onSelectMeeting: (id: number) => void;
}

const CoverPage: React.FC<CoverPageProps> = ({ onStart, meetings, onSelectMeeting }) => {

  const getIcon = (meeting: Meeting) => {
    let iconClass = "h-5 w-5 ";
    if (meeting.isExam) iconClass += "text-red-400";
    else if (meeting.isProject) iconClass += "text-purple-400";
    else if (meeting.isReview) iconClass += "text-yellow-400";
    else iconClass += "text-avalanche-red";
    
    // Default to BookOpenIcon if others don't match
    const IconComponent = meeting.isExam ? FlagIcon : 
                          meeting.isProject ? SparklesIcon :
                          meeting.isReview ? LightBulbIcon : 
                          BookOpenIcon;
    return <IconComponent className={iconClass} />;
  };

  const getTopicSummary = (meeting: Meeting): string => {
    if (meeting.summary) return meeting.summary;
    if (meeting.projectInfo?.description) return meeting.projectInfo.description.substring(0, 117) + (meeting.projectInfo.description.length > 120 ? '...' : '');
    if (meeting.theory && meeting.theory.length > 0) {
      const firstParagraph = meeting.theory.find(line => !line.startsWith('**') && !line.trim().startsWith('-') && line.length > 50);
      if (firstParagraph) {
        let summaryText = firstParagraph.replace(/\*\*/g, '');
        return summaryText.substring(0, 117) + (summaryText.length > 120 ? '...' : '');
      }
    }
    return '';
  };

  return (
    <div className="relative flex flex-col lg:flex-row h-screen w-screen animate-fade-in overflow-hidden bg-avalanche-dark-bg">
      {/* Animated Aurora Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-avalanche-red/70 via-red-900/40 to-avalanche-dark-bg bg-[length:400%_400%] animate-aurora-bg z-0" />
      
      {/* Left Column: Main Info */}
      <div className="relative z-10 flex flex-col items-center lg:items-start justify-center text-center lg:text-left p-8 lg:p-12 w-full lg:w-1/2 flex-shrink-0">
        <div className="flex items-center gap-4 md:gap-5 mb-6 opacity-0 animate-scale-in" style={{ animationDelay: '200ms' }}>
          <LogoUMMetro className="h-14 w-14 md:h-16 md:w-16 text-slate-300" />
          <LogoFikom className="h-14 w-14 md:h-16 md:w-16 text-slate-300" />
        </div>

        <h1 className="text-xl md:text-2xl font-medium text-slate-400 tracking-widest uppercase opacity-0 animate-fade-in-down" style={{ animationDelay: '400ms' }}>
          Modul Praktikum
        </h1>
        <h2 className="mt-1 text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-avalanche-red to-red-400 bg-[length:200%_200%] animate-aurora-bg opacity-0 animate-fade-in" style={{ animationDelay: '600ms' }}>
          Pemrosesan Data Terdistribusi
        </h2>
        
        <div className="my-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
          <p className="font-semibold text-slate-100 text-xl">Dedi Irawan, S.Kom., M.T.I</p>
          <p className="text-base text-slate-400">Dosen Pengampu</p>
        </div>

        <button
          onClick={onStart}
          className="group relative mt-8 inline-flex items-center gap-3 px-8 py-3 bg-slate-100/10 text-white font-bold text-xl rounded-lg shadow-lg border border-slate-100/20 hover:border-avalanche-red/80 transition-all duration-300 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '1000ms' }}
        >
          <span className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-avalanche-red to-red-500 opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur"></span>
          <span className="relative">Mulai Belajar</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="relative w-6 h-6 group-hover:translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </button>

        <div className="mt-auto pt-8 text-sm text-slate-500 text-center lg:text-left opacity-0 animate-fade-in-up" style={{ animationDelay: '1200ms' }}>
          <p className="font-semibold">S1 Ilmu Komputer - Fakultas Ilmu Komputer</p>
          <p>Universitas Muhammadiyah Metro</p>
        </div>
      </div>
      
      {/* Glowing Divider */}
      <div className="hidden lg:block relative z-10 w-px bg-gradient-to-b from-avalanche-red/0 via-avalanche-red/50 to-avalanche-red/0 opacity-0 animate-draw-line" style={{ animationDelay: '300ms' }}></div>

      {/* Right Column: Topics */}
      <div className="relative z-10 w-full lg:w-1/2 bg-black/20 backdrop-blur-md border-t lg:border-t-0 border-white/10 flex flex-col">
        <h3 className="text-2xl font-bold text-slate-200 p-4 border-b border-white/10 sticky top-0 bg-black/30 backdrop-blur-sm flex-shrink-0">
          Topik Pembahasan
        </h3>
        <ul className="overflow-y-auto p-4 space-y-2 flex-1 custom-scrollbar">
          {meetings.map((meeting, index) => (
            <li
              key={meeting.id}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${500 + index * 50}ms`, animationFillMode: 'forwards' }}
            >
              <button
                onClick={() => onSelectMeeting(meeting.id)}
                className="w-full text-left p-3 flex items-start gap-4 rounded-lg transition-all duration-300 ease-in-out group hover:bg-white/10 border border-transparent hover:border-avalanche-red/30 hover:shadow-[0_0_15px_rgba(232,65,66,0.2)]"
              >
                <div className="flex-shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity">
                  {getIcon(meeting)}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {`Pertemuan ${meeting.id}: ${meeting.title}`}
                  </p>
                  <p className="text-base text-slate-400 group-hover:text-slate-300 mt-1 leading-snug transition-colors">
                    {getTopicSummary(meeting)}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoverPage;