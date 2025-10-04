import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MeetingDetail from './components/MeetingDetail';
import SearchResults from './components/SearchResults';
import CoverPage from './components/CoverPage';
import IntroductionPage from './components/IntroductionPage';
import { MEETINGS_DATA } from './constants';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      if (storedTheme) return storedTheme;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSelectMeeting = (id: number | null) => {
    setSelectedMeetingId(id);
    setSearchQuery('');
  };

  const selectedMeeting = MEETINGS_DATA.find(m => m.id === selectedMeetingId) || null;

  // Render logic is now driven entirely by selectedMeetingId
  // null = Cover Page (fullscreen)
  if (selectedMeetingId === null) {
    return (
      <CoverPage
        onStart={() => handleSelectMeeting(0)} // Go to Introduction
        meetings={MEETINGS_DATA}
        onSelectMeeting={handleSelectMeeting} // Go to a specific meeting
      />
    );
  }

  // 0 = Introduction Page (fullscreen)
  if (selectedMeetingId === 0) {
    return (
      <IntroductionPage
        onContinue={() => handleSelectMeeting(1)} // Go to Meeting 1
        meetings={MEETINGS_DATA}
      />
    );
  }

  // 1-16 = Main app view with header
  return (
    <div className="flex flex-col h-screen bg-slate-100 dark:bg-avalanche-dark-bg font-sans">
      <Header
        meetings={MEETINGS_DATA}
        selectedMeetingId={selectedMeetingId}
        onSelectMeeting={handleSelectMeeting}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        {searchQuery ? (
           <SearchResults 
              meetings={MEETINGS_DATA} 
              query={searchQuery}
              onSelectMeeting={handleSelectMeeting}
            />
        ) : selectedMeeting ? (
          <MeetingDetail meeting={selectedMeeting} />
        ) : (
          // Fallback if an invalid ID is somehow selected, go to Intro.
          <IntroductionPage 
            onContinue={() => handleSelectMeeting(1)} 
            meetings={MEETINGS_DATA}
          />
        )}
      </main>
    </div>
  );
};

export default App;