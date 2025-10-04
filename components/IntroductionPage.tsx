import React from 'react';
import { Meeting } from '../types';
import { 
    RocketLaunchIcon,
    InformationCircleIcon,
    AcademicCapIcon,
    CalendarDaysIcon,
    BookOpenIcon,
    FlagIcon,
    LightBulbIcon,
    SparklesIcon,
    ClipboardDocumentListIcon
} from './IconComponents';

interface IntroductionPageProps {
  onContinue: () => void;
  meetings: Meeting[];
}

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, children }) => (
  <div className="bg-white dark:bg-avalanche-surface rounded-lg shadow-md border border-slate-200 dark:border-white/10 overflow-hidden">
    <div className="flex items-center gap-3 p-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-avalanche-dark-bg/50">
      {icon}
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
    </div>
    <div className="p-5 text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
      {children}
    </div>
  </div>
);

const IntroductionPage: React.FC<IntroductionPageProps> = ({ onContinue, meetings }) => {
  return (
    <div className="w-screen h-screen overflow-y-auto bg-slate-50 dark:bg-avalanche-dark-bg custom-scrollbar animate-fade-in">
      <div className="p-4 sm:p-6 md:p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 sm:text-5xl">
            Selamat Datang di Modul Praktikum
          </h1>
          <p className="mt-4 text-base text-slate-500 dark:text-slate-400">
            Panduan Lengkap Anda untuk Menguasai Pemrosesan Data Terdistribusi.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <InfoCard title="Narasi Pengantar" icon={<RocketLaunchIcon className="h-6 w-6 text-purple-500" />}>
              <p>
              Selamat datang, para calon ahli data! Anda akan memulai perjalanan menarik ke dunia Pemrosesan Data Terdistribusi (PDT), sebuah bidang yang menjadi tulang punggung teknologi modern, mulai dari mesin pencari hingga kecerdasan buatan. Modul ini dirancang tidak hanya untuk memberikan teori, tetapi untuk membawa Anda langsung ke dalam praktik—mensimulasikan bagaimana data raksasa diolah oleh ribuan komputer. Anggaplah ini sebagai bootcamp Anda untuk menjadi seorang arsitek data yang andal. Mari kita mulai!
              </p>
          </InfoCard>
          
          <InfoCard title="Petunjuk Penggunaan Modul" icon={<InformationCircleIcon className="h-6 w-6 text-avalanche-red" />}>
              <ul className="list-decimal list-outside pl-5 space-y-2">
                  <li><strong className="font-semibold text-slate-800 dark:text-slate-200">Navigasi Mudah:</strong> Gunakan menu dropdown di bagian atas untuk melompat antar pertemuan atau gunakan fitur pencarian untuk menemukan topik spesifik.</li>
                  <li><strong className="font-semibold text-slate-800 dark:text-slate-200">Fokus pada Praktik:</strong> Setiap pertemuan memiliki bagian "Praktik" dengan contoh kode yang bisa dijalankan. Coba pahami setiap barisnya!</li>
                  <li><strong className="font-semibold text-slate-800 dark:text-slate-200">Uji Pemahaman:</strong> Kerjakan tugas di setiap akhir pertemuan. Untuk melihat kunci jawaban, Anda memerlukan password dari dosen (hint: nama depan 2 asisten lab).</li>
                  <li><strong className="font-semibold text-slate-800 dark:text-slate-200">Review Berkala:</strong> Manfaatkan sesi review untuk mengkonsolidasikan pemahaman Anda sebelum ujian.</li>
              </ul>
          </InfoCard>

          <InfoCard title="Capaian Pembelajaran (Learning Outcomes)" icon={<AcademicCapIcon className="h-6 w-6 text-amber-500" />}>
            <p className="font-semibold text-slate-800 dark:text-slate-200">Capaian Pembelajaran Lulusan (CPL):</p>
            <p>Lulusan mampu merancang, mengimplementasikan, dan mengevaluasi solusi berbasis komputasi untuk menyelesaikan masalah kompleks dengan menggunakan tools dan teknologi modern.</p>
            <hr className="my-3 border-slate-200 dark:border-gray-700" />
            <p className="font-semibold text-slate-800 dark:text-slate-200">Capaian Pembelajaran Mata Kuliah (CPMK):</p>
            <ul className="list-disc list-outside pl-5 space-y-1">
              <li>Mahasiswa mampu menjelaskan konsep fundamental sistem terdistribusi, paralelisme, dan paradigma MapReduce.</li>
              <li>Mahasiswa mampu mengimplementasikan pemrosesan data batch sederhana menggunakan Dask dan PySpark.</li>
              <li>Mahasiswa mampu menganalisis dan memilih strategi optimasi dasar untuk meningkatkan performa pemrosesan data.</li>
            </ul>
          </InfoCard>

          <InfoCard title="Rencana Pembelajaran Semester (RPS)" icon={<CalendarDaysIcon className="h-6 w-6 text-emerald-500" />}>
            <div className="overflow-x-auto -mx-5 -my-5">
              <table className="min-w-full text-left text-base">
                <thead className="bg-slate-50 dark:bg-avalanche-dark-bg/50 border-b border-slate-200 dark:border-white/10">
                    <tr>
                        <th scope="col" className="p-4 font-semibold text-slate-600 dark:text-slate-300">Minggu Ke-</th>
                        <th scope="col" className="p-4 font-semibold text-slate-600 dark:text-slate-300">Kemampuan Akhir (Sub-CPMK)</th>
                        <th scope="col" className="p-4 font-semibold text-slate-600 dark:text-slate-300">Materi Pembelajaran</th>
                        <th scope="col" className="p-4 font-semibold text-slate-600 dark:text-slate-300">Bentuk & Metode Pembelajaran</th>
                        <th scope="col" className="p-4 font-semibold text-slate-600 dark:text-slate-300">Bobot Penilaian</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                    <tr className="hover:bg-slate-50 dark:hover:bg-avalanche-surface/40">
                        <td className="p-4 font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">1 - 6</td>
                        <td className="p-4">Mampu menjelaskan & mengimplementasikan konsep dasar sistem terdistribusi menggunakan Dask & Spark.</td>
                        <td className="p-4">Pengenalan Sistem Terdistribusi, Paralelisme & Partisi, MapReduce, DataFrame Terdistribusi (Dask & Spark), Visualisasi.</td>
                        <td className="p-4">Teori singkat, Praktikum Kode (hands-on), Studi Kasus Sederhana.</td>
                        <td className="p-4 whitespace-nowrap">Tugas (15%)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-avalanche-surface/40">
                        <td className="p-4 font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">7 - 8</td>
                        <td className="p-4">Dapat menunjukkan pemahaman komprehensif terhadap konsep dasar melalui evaluasi.</td>
                        <td className="p-4">Review Materi Pertemuan 1-6.</td>
                        <td className="p-4">Sesi Review Interaktif, Ujian Tengah Semester (UTS).</td>
                        <td className="p-4 whitespace-nowrap">UTS (25%)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-avalanche-surface/40">
                        <td className="p-4 font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">9 - 12</td>
                        <td className="p-4">Mampu menganalisis & menerapkan teknik lanjutan untuk optimasi dan integrasi data.</td>
                        <td className="p-4">Fault Tolerance, Komunikasi Antar Node (Shuffle), Optimasi Performa, Integrasi Data (Join & Union).</td>
                        <td className="p-4">Teori Konseptual, Praktikum Kode (Optimasi & Join), Analisis Performa.</td>
                        <td className="p-4 whitespace-nowrap">Tugas (15%)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-avalanche-surface/40">
                        <td className="p-4 font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">13 - 15</td>
                        <td className="p-4">Mampu merancang dan membangun solusi pemrosesan data terdistribusi untuk sebuah studi kasus nyata.</td>
                        <td className="p-4">Penerapan Konsep pada Dataset Publik.</td>
                        <td className="p-4">Pembelajaran Berbasis Proyek (PBL), Konsultasi Kelompok, Presentasi Hasil.</td>
                        <td className="p-4 whitespace-nowrap">Proyek Akhir (30%)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-avalanche-surface/40">
                        <td className="p-4 font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">16</td>
                        <td className="p-4">Dapat menunjukkan penguasaan menyeluruh terhadap semua materi yang telah diajarkan.</td>
                        <td className="p-4">Review Keseluruhan Materi.</td>
                        <td className="p-4">Ujian Akhir Semester (UAS).</td>
                        <td className="p-4 whitespace-nowrap">UAS (15%)</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </InfoCard>

        </div>

        <div className="mt-12 text-center">
          <button
              onClick={onContinue}
              className="group relative inline-flex items-center gap-3 px-8 py-3 bg-avalanche-red text-white font-bold text-base rounded-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105 duration-300"
          >
              Lanjutkan ke Pertemuan 1
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroductionPage;