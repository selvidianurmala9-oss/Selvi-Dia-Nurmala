import React from 'react';
import { Meeting } from '../types';
import { 
  BookOpenIcon, 
  FlagIcon, 
  LightBulbIcon, 
  SparklesIcon, 
  MagnifyingGlassIcon 
} from './IconComponents';

interface SearchResultsProps {
  meetings: Meeting[];
  query: string;
  onSelectMeeting: (id: number) => void;
}

// Component internal untuk menyorot teks yang cocok
const Highlight: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  // Membersihkan markdown sederhana untuk tampilan yang lebih baik
  const cleanedText = text.replace(/\*\*|```python\n|```json\n|```|`/g, '');
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = cleanedText.split(regex);
  
  return (
    <span className="truncate">
      ...
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200 dark:bg-yellow-400 text-yellow-800 dark:text-yellow-900 px-1 rounded-sm mx-0">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
      ...
    </span>
  );
};

const SearchResults: React.FC<SearchResultsProps> = ({ meetings, query, onSelectMeeting }) => {
  const getIcon = (meeting: Meeting) => {
    if (meeting.isExam) return <FlagIcon className="h-6 w-6 text-red-500" />;
    if (meeting.isProject) return <SparklesIcon className="h-6 w-6 text-purple-500" />;
    if (meeting.isReview) return <LightBulbIcon className="h-6 w-6 text-yellow-500" />;
    return <BookOpenIcon className="h-6 w-6 text-avalanche-red" />;
  };

  const searchResults = meetings
    .map(meeting => {
      const lowerCaseQuery = query.toLowerCase();
      if (!lowerCaseQuery) return null;

      const titleMatch = meeting.title.toLowerCase().includes(lowerCaseQuery);
      const idMatch = `pertemuan ${meeting.id}`.includes(lowerCaseQuery);
      const theoryMatchLine = meeting.theory?.find(t => t.toLowerCase().includes(lowerCaseQuery));
      const practiceMatchLine = meeting.practice?.find(p => p.toLowerCase().includes(lowerCaseQuery));
      const assignmentMatchLine = meeting.assignment?.find(a => a.toLowerCase().includes(lowerCaseQuery));
      
      let typeMatch = false;
      if (meeting.isExam && ('ujian uts uas'.includes(lowerCaseQuery))) typeMatch = true;
      if (meeting.isProject && ('proyek project'.includes(lowerCaseQuery))) typeMatch = true;
      if (meeting.isReview && 'review'.includes(lowerCaseQuery)) typeMatch = true;

      const isMatch = titleMatch || idMatch || typeMatch || !!theoryMatchLine || !!practiceMatchLine || !!assignmentMatchLine;

      if (!isMatch) {
        return null;
      }

      let snippet: { source: string; content: string } | null = null;
      if (titleMatch || idMatch || typeMatch) {
          snippet = { source: 'Judul', content: meeting.title };
      } else if (theoryMatchLine) {
          snippet = { source: 'Materi & Teori', content: theoryMatchLine };
      } else if (practiceMatchLine) {
          snippet = { source: 'Praktik', content: practiceMatchLine };
      } else if (assignmentMatchLine) {
        snippet = { source: 'Tugas', content: assignmentMatchLine };
      }

      return { ...meeting, snippet };
    })
    .filter((result): result is Meeting & { snippet: { source: string; content: string } | null } => result !== null);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-2">
        Hasil Pencarian untuk:
      </h2>
      <p className="text-lg text-avalanche-red dark:text-avalanche-red font-semibold mb-6 truncate">"{query}"</p>
      
      {searchResults.length > 0 ? (
        <div className="bg-white dark:bg-avalanche-surface rounded-lg shadow-md border border-slate-200 dark:border-white/10 divide-y divide-slate-200 dark:divide-white/10">
          {searchResults.map(meeting => (
            <button
              key={meeting.id}
              onClick={() => onSelectMeeting(meeting.id)}
              className="w-full text-left p-4 flex items-start gap-4 hover:bg-red-50 dark:hover:bg-avalanche-red/10 transition-colors duration-150 group"
            >
              <div className="flex-shrink-0 p-2 bg-slate-100 dark:bg-avalanche-dark-bg rounded-full group-hover:bg-red-100 dark:group-hover:bg-avalanche-red/20 transition-colors duration-150">
                {getIcon(meeting)}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-avalanche-red dark:group-hover:text-avalanche-red">
                  Pertemuan {meeting.id}: {meeting.title}
                </p>
                {meeting.snippet && (
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center">
                     <span className="font-semibold text-avalanche-red dark:text-avalanche-red bg-red-100 dark:bg-avalanche-red/20 py-0.5 px-1.5 rounded-md text-xs mr-2 flex-shrink-0">{meeting.snippet.source}</span>
                     <div className="truncate">
                        <Highlight text={meeting.snippet.content} highlight={query} />
                     </div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white dark:bg-avalanche-surface rounded-lg shadow-md border border-slate-200 dark:border-white/10">
          <MagnifyingGlassIcon className="h-12 w-12 text-slate-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Tidak Ditemukan</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Tidak ada pertemuan yang cocok dengan kata kunci <span className="font-medium text-slate-600 dark:text-slate-300">"{query}"</span>.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;