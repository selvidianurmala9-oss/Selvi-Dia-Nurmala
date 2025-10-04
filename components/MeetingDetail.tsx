
import React from 'react';
import ReactDOM from 'react-dom';
import { Meeting } from '../types';
import { 
  BookOpenIcon, 
  CodeBracketIcon, 
  ClipboardDocumentListIcon, 
  FlagIcon, 
  SparklesIcon, 
  LightBulbIcon,
  UserGroupIcon,
  PresentationChartBarIcon,
  DocumentTextIcon,
  KeyIcon,
  CommandLineIcon,
  ArrowsPointingOutIcon,
  XMarkIcon,
  ClipboardIcon,
  CheckIcon
} from './IconComponents';

interface MeetingDetailProps {
  meeting: Meeting;
}

interface DetailCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  colorClass: string;
}

// A component to parse inline markdown like **bold** text.
const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="font-semibold text-slate-900 dark:text-slate-100">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={index} className="bg-slate-200 dark:bg-gray-700 text-avalanche-red font-mono text-sm px-1.5 py-0.5 rounded-md">{part.slice(1, -1)}</code>;
        }
        return part;
      })}
    </>
  );
};

const CodeBlock: React.FC<{ language: string; code: string }> = ({ language, code }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  const codeLines = code.split('\n');

  return (
    <div className="my-3 bg-slate-800 dark:bg-black/50 text-white rounded-lg shadow-inner overflow-hidden">
      <div className="flex justify-between items-center bg-slate-700 dark:bg-black/50 text-xs font-sans text-slate-300 px-4 py-1.5">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 focus:outline-none focus:ring-1 focus:ring-avalanche-red rounded p-1 -m-1 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <CheckIcon className="h-4 w-4 text-green-400" />
              <span className="text-green-400">Tersalin!</span>
            </>
          ) : (
            <>
              <ClipboardIcon className="h-4 w-4" />
              <span>Salin</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto py-4">
        <table className="font-mono text-sm w-full">
          <tbody>
            {codeLines.map((line, lineIndex) => (
              <tr key={lineIndex}>
                <td className="py-px pl-4 pr-4 w-12 text-right text-slate-500 select-none">{lineIndex + 1}</td>
                <td className="py-px pr-4 whitespace-pre text-slate-50">{line || ' '}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


// Component to render a list of content with structure.
const StructuredContent: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="space-y-4">
    {items.map((item, index) => {
      // Console Output Block with Explanation
      if (item.startsWith('_CONSOLE_')) {
        const content = item.substring(9).trim();
        let output = content;
        let explanation: string | null = null;
        
        if (content.includes('|||')) {
            const parts = content.split('|||');
            explanation = parts[0].trim();
            output = parts[1].trim();
        }

        return (
          <div key={index} className="my-4 p-4 bg-slate-100 dark:bg-avalanche-dark-bg/50 rounded-lg border border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <CommandLineIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
              <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Contoh Hasil</h5>
            </div>
            <div className="bg-slate-800 dark:bg-black/50 text-white rounded-md overflow-hidden shadow-inner">
              <pre className="p-4 text-sm overflow-x-auto"><code className="text-slate-50 font-mono whitespace-pre-wrap">{output}</code></pre>
            </div>
            {explanation && (
              <div className="mt-3 flex items-start gap-3 p-3 bg-red-50 dark:bg-avalanche-red/10 rounded-md border border-red-200 dark:border-avalanche-red/20">
                <LightBulbIcon className="h-5 w-5 text-avalanche-red dark:text-avalanche-red flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 dark:text-red-100 leading-relaxed">
                  <FormattedText text={explanation} />
                </p>
              </div>
            )}
          </div>
        );
      }

      // Code Block
      if (item.startsWith('```') && item.endsWith('```')) {
        const lines = item.split('\n');
        const language = lines[0].replace('```', '').trim();
        const code = lines.slice(1, -1).join('\n');
        return <CodeBlock key={index} language={language} code={code} />;
      }
      
      // Heading (Entire line is bold)
      if (item.startsWith('**') && item.endsWith('**')) {
        return (
          <h4 key={index} className="text-lg font-semibold text-slate-800 dark:text-slate-100 pt-4 first:pt-0">
            {item.slice(2, -2)}
          </h4>
        );
      }

      // Indented List Item
      if (item.trim().startsWith('-')) {
        return (
          <div key={index} className="ml-5 flex items-start">
            <span className="text-slate-500 dark:text-slate-400 mr-3 mt-1">&#8226;</span>
            <p className="flex-1 text-slate-600 dark:text-slate-300 leading-relaxed">
              <FormattedText text={item.trim().substring(1).trim()} />
            </p>
          </div>
        );
      }
      
      // Default Paragraph
      return (
        <p key={index} className="text-slate-700 dark:text-slate-300 leading-relaxed">
          <FormattedText text={item} />
        </p>
      );
    })}
  </div>
);

// Component for simple bulleted or numbered lists.
const SimpleList: React.FC<{ items: string[]; numbered?: boolean }> = ({ items, numbered = false }) => {
  if (numbered) {
    // A specific, more readable layout for numbered lists
    return (
      <ol className="list-decimal list-outside space-y-2 pl-5">
        {items.map((item, index) => (
          <li key={index} className="pl-2 text-slate-700 dark:text-slate-300 leading-relaxed">
            <FormattedText text={item} />
          </li>
        ))}
      </ol>
    );
  }
  
  // Existing layout for bulleted lists
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="text-avalanche-red dark:text-avalanche-red mr-3 mt-1">&#8226;</span>
          <div className="flex-1 text-slate-700 dark:text-slate-300">
            <FormattedText text={item} />
          </div>
        </li>
      ))}
    </ul>
  );
};

const DetailCard: React.FC<DetailCardProps> = ({ title, icon, children, colorClass }) => (
  <div className="bg-white dark:bg-avalanche-surface rounded-lg shadow-md border border-slate-200 dark:border-white/10 overflow-hidden">
    <div className={`flex items-center gap-3 p-4 border-b border-slate-200 dark:border-white/10 ${colorClass} bg-opacity-10`}>
      <div className={`text-xl ${colorClass}`}>{icon}</div>
      <h3 className={`text-lg font-semibold ${colorClass}`}>{title}</h3>
    </div>
    <div className="p-5 text-sm md:text-base">
      {children}
    </div>
  </div>
);

const AssignmentAnswerSection: React.FC<{ answers: string[] }> = ({ answers }) => {
  const [isUnlocked, setIsUnlocked] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [showInput, setShowInput] = React.useState(false);
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'adinbima') {
      setIsUnlocked(true);
      setError('');
      setShowInput(false);
    } else {
      setError('Password salah! Coba lagi.');
      setPassword('');
    }
  };

  if (isUnlocked) {
    // Pre-process answers to handle newlines correctly, except in code blocks.
    const processedAnswers = answers.flatMap(answer => {
        if (answer.startsWith('```') && answer.endsWith('```')) {
            return [answer];
        }
        if (answer.startsWith('_CONSOLE_')) {
          return [answer];
        }
        return answer.split('\n');
    });

    return (
       <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <KeyIcon className="h-5 w-5 text-emerald-500" />
            <h4 className="text-md font-semibold text-emerald-700 dark:text-emerald-400">Kunci Jawaban</h4>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-black/20 rounded-md">
            <StructuredContent items={processedAnswers} />
          </div>
          <button
              onClick={() => setIsUnlocked(false)}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mt-3 transition-colors"
          >
            Sembunyikan Jawaban
          </button>
       </div>
    );
  }

  return (
    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
      {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          className="w-full text-center px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-avalanche-dark-bg dark:hover:bg-avalanche-surface text-sm font-semibold text-slate-700 dark:text-slate-200 rounded-md transition-colors flex items-center justify-center gap-2"
        >
          <KeyIcon className="h-4 w-4" />
          Lihat Kunci Jawaban
        </button>
      ) : (
        <div>
          <form onSubmit={handlePasswordSubmit} className="flex flex-col sm:flex-row items-stretch gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password..."
              className="flex-grow px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-avalanche-red focus:border-avalanche-red transition-all duration-200 dark:bg-avalanche-dark-bg dark:border-white/20 dark:text-slate-200 dark:placeholder-slate-400"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-avalanche-red hover:bg-red-700 text-white font-semibold rounded-md transition-colors text-sm"
            >
              Buka
            </button>
          </form>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
};

const FullscreenPractice: React.FC<{ items: string[]; answers?: string[]; onClose: () => void }> = ({ items, answers, onClose }) => {
  const title = items[0] || 'Sesi Latihan';
  const contentItems = items.slice(1);

  return (
    <div 
      className="fixed inset-0 bg-slate-900/80 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white dark:bg-avalanche-surface w-full max-w-5xl h-full max-h-[95vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-white/10">
        <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-full">
              <CodeBracketIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              <FormattedText text={title} />
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-avalanche-dark-bg transition-colors"
            aria-label="Tutup sesi latihan"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </header>
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <StructuredContent items={contentItems} />
          {answers && (
            <div className="mt-8">
              <AssignmentAnswerSection answers={answers} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};


const MeetingDetail: React.FC<MeetingDetailProps> = ({ meeting }) => {
  const [isPracticeFullscreen, setIsPracticeFullscreen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPracticeFullscreen(false);
      }
    };

    if (isPracticeFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isPracticeFullscreen]);
  
  if (!meeting) return null;

  const getHeader = () => {
    let icon = <BookOpenIcon className="h-8 w-8 text-avalanche-red" />;
    let bgColor = 'bg-red-50 dark:bg-avalanche-red/10';
    let textColor = 'text-avalanche-red dark:text-avalanche-red';

    if (meeting.isExam) {
      icon = <FlagIcon className="h-8 w-8 text-red-600 dark:text-red-400" />;
      bgColor = 'bg-red-100 dark:bg-red-900/50';
      textColor = 'text-red-800 dark:text-red-200';
    } else if (meeting.isProject) {
      icon = <SparklesIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />;
      bgColor = 'bg-purple-100 dark:bg-purple-900/50';
      textColor = 'text-purple-800 dark:text-purple-200';
    } else if (meeting.isReview) {
      icon = <LightBulbIcon className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />;
      bgColor = 'bg-yellow-100 dark:bg-yellow-900/50';
      textColor = 'text-yellow-800 dark:text-yellow-200';
    }

    return (
      <div className={`p-6 rounded-lg mb-8 ${bgColor}`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">{icon}</div>
          <div>
            <p className={`text-sm font-semibold uppercase tracking-wider ${textColor}`}>{`Pertemuan ${meeting.id}`}</p>
            <h2 className={`text-2xl md:text-3xl font-bold mt-1 ${textColor}`}>{meeting.title}</h2>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      {isPracticeFullscreen && meeting.id === 7 && meeting.practice && (
        <FullscreenPractice 
          items={meeting.practice} 
          answers={meeting.assignmentAnswers}
          onClose={() => setIsPracticeFullscreen(false)} 
        />
      )}

      {getHeader()}
      
      {(meeting.isExam || meeting.isProject || meeting.isReview) && meeting.summary && (
        <div className="mb-6">
          <DetailCard title="Ringkasan" icon={<DocumentTextIcon />} colorClass="text-slate-600 dark:text-slate-400">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{meeting.summary}</p>
          </DetailCard>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meeting.theory && (
          <DetailCard title="Materi & Teori" icon={<BookOpenIcon />} colorClass="text-avalanche-red dark:text-avalanche-red">
            <StructuredContent items={meeting.theory} />
          </DetailCard>
        )}

        {meeting.practice && meeting.id === 7 ? (
          <div className="md:col-span-2">
            <DetailCard title="Praktik" icon={<CodeBracketIcon />} colorClass="text-emerald-600 dark:text-emerald-400">
              <div className="text-center py-4">
                 <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                    Uji pemahaman Anda dengan mengerjakan serangkaian studi kasus praktis yang mencakup semua materi dari pertemuan 1 hingga 6.
                 </p>
                 <button
                    onClick={() => setIsPracticeFullscreen(true)}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                 >
                    <ArrowsPointingOutIcon className="h-6 w-6" />
                    Mulai Sesi Latihan Fullscreen
                 </button>
              </div>
            </DetailCard>
          </div>
        ) : meeting.practice && (
          <DetailCard title="Praktik" icon={<CodeBracketIcon />} colorClass="text-emerald-600 dark:text-emerald-400">
            <StructuredContent items={meeting.practice} />
          </DetailCard>
        )}
        
        {meeting.assignment && (
           <div className="md:col-span-2">
            <DetailCard title="Tugas & Pekerjaan Rumah" icon={<ClipboardDocumentListIcon />} colorClass="text-amber-600 dark:text-amber-400">
              <SimpleList items={meeting.assignment} numbered />
              {meeting.assignmentAnswers && <AssignmentAnswerSection answers={meeting.assignmentAnswers} />}
            </DetailCard>
          </div>
        )}

        {meeting.projectInfo && (
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <DetailCard title="Deskripsi Proyek" icon={<DocumentTextIcon />} colorClass="text-indigo-600 dark:text-indigo-400">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{meeting.projectInfo.description}</p>
            </DetailCard>
             <DetailCard title="Kelompok" icon={<UserGroupIcon />} colorClass="text-indigo-600 dark:text-indigo-400">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{meeting.projectInfo.groups}</p>
            </DetailCard>
             <DetailCard title="Penilaian" icon={<PresentationChartBarIcon />} colorClass="text-indigo-600 dark:text-indigo-400">
                <SimpleList items={meeting.projectInfo.grading} />
            </DetailCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingDetail;