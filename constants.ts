import { Meeting } from './types';

export const MEETINGS_DATA: Meeting[] = [
  {
    id: 1,
    title: 'Pengenalan Sistem Terdistribusi',
    theory: [
      '**Apa itu Sistem Terdistribusi?**',
      'Bayangkan Anda harus membangun sebuah rumah sendirian. Pasti akan sangat lama. Tapi, bagaimana jika Anda mengajak 10 teman dan membagi tugas? Satu orang memasang bata, satu orang membuat atap, dan seterusnya. Rumah itu akan selesai jauh lebih cepat.',
      'Itulah ide dasar dari sistem terdistribusi: **memecah satu pekerjaan besar menjadi banyak pekerjaan kecil, lalu dikerjakan bersama-sama oleh banyak komputer (node) yang terhubung dalam sebuah jaringan.** Setiap komputer memiliki memori dan prosesornya sendiri, dan mereka berkomunikasi dengan mengirimkan pesan melalui jaringan.',

      '**Mengapa Sistem Terdistribusi Sangat Diperlukan?**',
      'Di era digital, kita dihadapkan pada tiga masalah besar yang tidak bisa diselesaikan oleh satu komputer, sekuat apa pun itu (dikenal sebagai 3V dari Big Data):',
      '  - **Ledakan Data (Volume):** Jumlah data yang dihasilkan setiap detik (dari media sosial, sensor, transaksi online) terlalu besar untuk disimpan atau diolah oleh satu mesin. Bayangkan mencoba menyimpan semua video YouTube atau data transaksi global Visa di satu hard disk!',
      '  - **Tuntutan Kecepatan (Velocity):** Pengguna mengharapkan respons instan. Satu komputer akan kewalahan jika harus melayani jutaan permintaan pengguna secara bersamaan, misalnya saat ada flash sale di Tokopedia atau saat jutaan orang streaming pertandingan Piala Dunia secara bersamaan.',
      '  - **Kebutuhan Ketersediaan (Availability):** Layanan penting seperti perbankan online, aplikasi chat, atau sistem navigasi tidak boleh mati. Jika hanya bergantung pada satu komputer, dan komputer itu rusak atau butuh perawatan, maka seluruh layanan akan berhenti. Ini tidak bisa diterima di dunia modern.',
      'Sistem terdistribusi adalah jawaban untuk ketiga masalah fundamental ini.',

      '**Manfaat Utama Sistem Terdistribusi**',
      '  - **Skalabilitas (Scalability):** Jika beban kerja meningkat, kita tidak perlu membeli superkomputer yang super mahal (vertical scaling). Cukup tambahkan lebih banyak komputer standar (yang lebih murah) ke dalam sistem (horizontal scaling). Ini jauh lebih fleksibel dan ekonomis.',
      '  - **Keandalan & Toleransi Kesalahan (Reliability & Fault Tolerance):** Jika satu komputer mati, sistem tidak akan berhenti. Komputer lain akan mengambil alih tugasnya secara otomatis. Inilah yang membuat layanan seperti Google, Netflix, dan WhatsApp bisa terus berjalan 24/7 tanpa henti.',
      '  - **Kinerja Tinggi (High Performance):** Dengan membagi pekerjaan dan mengerjakannya secara paralel di banyak mesin, tugas yang tadinya butuh berjam-jam (seperti menganalisis data genom) bisa diselesaikan dalam hitungan menit.',
      '  - **Efisiensi Biaya (Cost-Effectiveness):** Menggunakan puluhan atau ratusan komputer komoditas (commodity hardware) seringkali lebih hemat biaya daripada membeli dan merawat satu mesin mainframe raksasa yang harganya bisa mencapai jutaan dolar.',

      '**Contoh di Dunia Nyata**',
      'Anda menggunakan sistem terdistribusi setiap hari, mungkin tanpa menyadarinya:',
      '  - **Google Search:** Saat Anda mencari sesuatu, permintaan Anda tidak dikirim ke satu komputer, melainkan ke ribuan komputer yang bekerja sama mencari di miliaran halaman web dan memberikan jawaban dalam sepersekian detik.',
      '  - **Streaming Video (Netflix, YouTube):** Video yang Anda tonton tidak disimpan di satu tempat, melainkan disalin ke banyak server di seluruh dunia (Content Delivery Network/CDN). Saat Anda menekan "play", video dikirim dari server yang paling dekat dengan lokasi Anda, sehingga streaming berjalan lancar dan tanpa buffer.',
      '  - **Aplikasi Ojek Online (Go-Jek, Grab):** Ini adalah sistem terdistribusi raksasa yang secara real-time mengoordinasikan lokasi jutaan pengemudi, pesanan pelanggan, peta, dan proses pembayaran secara bersamaan.',
      '  - **E-commerce (Tokopedia, Shopee):** Mengelola katalog jutaan produk, stok, profil pengguna, dan memproses ribuan transaksi per detik adalah tugas yang mustahil tanpa sistem terdistribusi.',
      '  - **Blockchain & Cryptocurrency:** Setiap node dalam jaringan Bitcoin atau Ethereum adalah bagian dari sistem terdistribusi global yang bekerja sama untuk memvalidasi transaksi dan menjaga keamanan buku besar (ledger).',

      '**Tantangan Terbesar: Kompleksitas**',
      'Mengelola ribuan komputer agar bekerja selaras bukanlah hal mudah. Komunikasi antar mesin bisa gagal, data bisa tidak sinkron, dan menemukan sumber masalah (debugging) menjadi jauh lebih sulit daripada di satu mesin. Inilah mengapa kita memerlukan kerangka kerja (framework) seperti Dask dan Spark untuk membantu kita mengelola kompleksitas ini.'
    ],
    practice: [
      '**Praktik: Memecah Pekerjaan Sederhana**',
      'Sesuai analogi membangun rumah, kode ini menunjukkan cara **memecah pekerjaan**. Tugas kita sederhana: menyapa 3 nama. Daripada menyapa satu per satu, kita "bungkus" setiap tugas sapaan ke dalam sebuah "rencana" yang bisa dikerjakan nanti secara bersamaan.',
      'Pikirkan `dask.delayed` sebagai cara kita menulis "daftar tugas" untuk para pekerja. Ia tidak langsung menjalankan tugasnya, melainkan hanya mencatat rencananya. Perintah `.compute()` adalah aba-aba "Mulai Kerjakan Sekarang!" kepada semua pekerja secara serentak.',
      '**Contoh Kode:**',
      `\`\`\`python
# 1. Mengimpor library Dask.
import dask

# 2. Membuat fungsi sapaan yang sangat sederhana.
# Fungsi ini akan menerima satu argumen 'nama' dan mengembalikan string.
sapa = lambda nama: f"Hello, {nama}!"

# 3. Menyiapkan "daftar tugas" tanpa menjalankannya.
# Setiap sapaan dibungkus dengan dask.delayed untuk menunda eksekusi.
# Ini menciptakan 'objek malas' yang berisi rencana eksekusi.
tugas_satu = dask.delayed(sapa)("Alice")
tugas_dua = dask.delayed(sapa)("Bob")
tugas_tiga = dask.delayed(sapa)("Charlie")

# 4. Mengumpulkan semua hasil tugas menjadi satu list. Ini juga masih rencana.
semua_hasil = dask.delayed(list)([tugas_satu, tugas_dua, tugas_tiga])

# 5. Menjalankan semua tugas secara bersamaan dan mencetak hasilnya.
# .compute() akan melihat seluruh 'pohon' rencana dan mengeksekusinya seefisien mungkin.
hasil_akhir = semua_hasil.compute()
print(hasil_akhir)
\`\`\``,
      `_CONSOLE_Hasilnya adalah sebuah list yang berisi semua sapaan. Di balik layar, Dask dapat menjalankan ketiga tugas sapaan itu secara paralel (bersamaan) jika sumber daya memungkinkan, bukan satu per satu. Ini adalah dasar dari komputasi terdistribusi.|||['Hello, Alice!', 'Hello, Bob!', 'Hello, Charlie!']`
    ],
    assignment: ['Buat ringkasan tentang perbedaan komputer biasa (single-core) dan komputer dengan banyak "otak" (multi-core) dalam 1 paragraf, kaitkan dengan konsep sistem terdistribusi.', 'Jelaskan ulang kode praktik yang sudah disederhanakan menurut pemahaman Anda, fokus pada apa fungsi dari `dask.delayed` dan `.compute()`.'],
    assignmentAnswers: [
      '**Jawaban 1:** Komputer single-core hanya memiliki satu "otak" (CPU core) yang mengerjakan semua tugas secara bergantian, seperti satu orang yang menangani banyak pekerjaan satu per satu. Sebaliknya, komputer multi-core memiliki beberapa "otak" yang dapat bekerja secara bersamaan (paralel), mirip seperti tim kecil. Konsep ini bisa diperluas ke sistem terdistribusi, yang bisa dianggap sebagai "tim raksasa" yang terdiri dari banyak komputer, di mana setiap komputer (yang mungkin juga multi-core) bekerja sama untuk menyelesaikan masalah yang jauh lebih besar daripada yang bisa ditangani oleh satu mesin saja.',
      '**Jawaban 2:** Penjelasan kode:\n- `dask.delayed`: Ini adalah "pembungkus" ajaib dari Dask. Ia tidak menjalankan fungsi `sapa` secara langsung, melainkan mengubahnya menjadi sebuah "rencana" atau "objek malas". Rencana ini berisi semua informasi yang dibutuhkan untuk menjalankannya nanti, seperti fungsi apa yang harus dipanggil (`sapa`) dan dengan argumen apa (`"Alice"`).\n- `.compute()`: Ini adalah tombol "play". Saat kita memanggil `.compute()` pada objek hasil akhir, Dask akan melihat semua rencana yang telah kita buat, membangun sebuah grafik tugas, dan kemudian mengeksekusi semua tugas tersebut seefisien mungkin, seringkali secara paralel. Hasil akhirnya kemudian dikumpulkan dan dikembalikan.'
    ]
  },
  {
    id: 2,
    title: 'Konsep Paralelisme & Partisi Data',
    theory: [
      '**Membangun di Atas Konsep Dasar**',
      'Di pertemuan pertama, kita belajar bahwa sistem terdistribusi bekerja dengan **memecah pekerjaan besar menjadi pekerjaan kecil**. Pertemuan ini akan membahas DUA konsep inti yang memungkinkan hal tersebut terjadi: **Paralelisme** dan **Partisi Data**.',
      '**Paralelisme: Mengerjakan Banyak Hal di Waktu yang Sama**',
      'Bayangkan ada sekarung besar kentang yang harus dikupas. Tentu akan sangat lama jika dikerjakan sendiri. Cara tercepat adalah dengan memanggil 10 teman Anda dan meminta mereka mengupas bersama-sama. Masing-masing orang mengerjakan sebagian kecil kentang pada saat yang bersamaan. Inilah **paralelisme**: kemampuan untuk menjalankan beberapa proses secara simultan.',

      '**Partisi Data: Kunci Agar Bisa Paralel**',
      'Sebelum teman-teman Anda bisa mulai bekerja, Anda harus **membagi** kentang dari karung besar itu ke dalam beberapa ember kecil. Setiap ember kecil inilah yang disebut **partisi**. Satu teman akan mengerjakan satu ember. Dengan cara ini, 10 orang bisa mengupas kentang 10 kali lebih cepat daripada satu orang.',
      'Dalam dunia data, partisi adalah memecah dataset raksasa menjadi potongan-potongan yang lebih kecil dan dapat dikelola. Setiap potongan (partisi) dapat dikirim ke satu komputer (node) untuk diproses secara independen. Inilah inti dari pemrosesan data terdistribusi: **bagi datanya (partisi), lalu kerjakan bersamaan (paralel).**',
      
      '**Strategi Partisi Umum**',
      'Bagaimana cara kita membagi data? Ada beberapa strategi umum:',
      '  - **Round-Robin:** Seperti membagikan kartu. Data dibagikan satu per satu ke setiap partisi secara bergiliran. Cocok untuk pemerataan beban yang cepat.',
      '  - **Range Partitioning:** Membagi data berdasarkan rentang nilai. Misalnya, data pelanggan dengan nama A-E masuk ke partisi 1, F-J ke partisi 2, dst. Baik untuk query yang sering mengakses rentang tertentu.',
      '  - **Hash Partitioning:** Menghitung "hash" dari sebuah kolom (misal: ID Pengguna), lalu menempatkan data di partisi berdasarkan hasil hash tersebut. Ini memastikan semua data untuk ID yang sama selalu berada di partisi yang sama.',

      '**Aturan Emas: Data Locality**',
      'Lebih masuk akal menyuruh teman Anda datang ke tumpukan kentang, daripada Anda harus membawa sekarung kentang ke rumah setiap teman. Aturan dalam data besar adalah: **"Pindahkan program ke data, bukan data ke program."** Ini menghemat banyak waktu dan sumber daya jaringan, karena memindahkan kode (yang ukurannya kecil) jauh lebih cepat daripada memindahkan data berukuran gigabyte atau terabyte.'
    ],
    practice: [
      '**Praktik: Bukti Nyata Kecepatan Paralel**',
      'Di sini, kita akan membuktikan konsep "mengupas kentang" dari teori. Kita akan membuat data yang besar (10 juta angka), lalu membaginya menjadi 4 **partisi** (4 ember).',
      'Kita akan hitung waktu yang dibutuhkan untuk memprosesnya satu per satu (sekuensial/sendirian) versus memprosesnya secara bersamaan (paralel dengan Dask). Tugasnya sama untuk setiap partisi: menjumlahkan kuadrat dari setiap angka. Perhatikan perbedaan waktu yang signifikan.',
      '**Contoh Kode:**',
      `\`\`\`python
# Mengimpor library yang diperlukan.
import dask
import time

# Fungsi sederhana untuk memproses satu partisi (satu "ember" data).
# Fungsi ini akan menjumlahkan kuadrat dari setiap angka dalam list.
proses_partisi = lambda partisi: sum(x * x for x in partisi)

# Membuat data besar (sekarung kentang).
data = list(range(10_000_000))

# Membagi data menjadi 4 partisi (4 ember) dengan strategi slicing sederhana.
partisi_data = [data[i::4] for i in range(4)]

# --- Cara Biasa (Sekuensial / Sendirian) ---
start_time = time.time()
# Memproses setiap partisi satu per satu menggunakan loop biasa.
hasil_sekuensial = sum(proses_partisi(p) for p in partisi_data)
end_time = time.time()
print(f"Waktu Dikerjakan Sendiri (Sekuensial): {end_time - start_time:.4f} detik")

# --- Cara Paralel (Dikerjakan Bersama) ---
start_time = time.time()
# Membuat rencana tugas untuk setiap partisi menggunakan dask.delayed.
tugas_paralel = [dask.delayed(proses_partisi)(p) for p in partisi_data]
# Membuat rencana untuk menjumlahkan semua hasilnya.
total_paralel = dask.delayed(sum)(tugas_paralel)
# Menjalankan semua tugas bersamaan dengan .compute().
hasil_akhir_paralel = total_paralel.compute()
end_time = time.time()
print(f"Waktu Dikerjakan Bersama (Paralel): {end_time - start_time:.4f} detik")
\`\`\``,
      '_CONSOLE_Lihat perbedaannya! Mengerjakan tugas secara bersamaan (paralel) jauh lebih cepat. Ini membuktikan bahwa membagi data (partisi) adalah kunci untuk kecepatan dalam pemrosesan data skala besar. Semakin banyak "core" CPU yang Anda miliki, semakin besar perbedaan kecepatannya.|||Waktu Dikerjakan Sendiri (Sekuensial): 1.0234 detik\nWaktu Dikerjakan Bersama (Paralel): 0.3456 detik\n\n*(waktu akan berbeda di setiap komputer, tapi cara paralel PASTI lebih cepat)*',
    ],
    assignment: ['Dengan bahasa sendiri, jelaskan mengapa mempartisi data adalah langkah yang wajib dilakukan sebelum pemrosesan paralel bisa berjalan efektif!', 'Buat fungsi untuk membagi data secara manual dengan strategi "round-robin" (seperti membagikan kartu satu per satu). Fungsi harus menerima list data dan jumlah partisi yang diinginkan.'],
    assignmentAnswers: [
      '**Jawaban 1:** Mempartisi data adalah langkah wajib karena paralelisme bekerja dengan prinsip "bagi dan taklukkan". Tanpa partisi, tidak ada yang bisa "dibagi". Seluruh dataset akan dianggap sebagai satu unit besar, dan hanya satu "pekerja" (CPU core atau node) yang bisa mengerjakannya pada satu waktu. Dengan memecah data menjadi potongan-potongan kecil (partisi), kita bisa menugaskan setiap potongan ke pekerja yang berbeda untuk diproses secara bersamaan, sehingga memungkinkan puluhan atau ribuan pekerja berkolaborasi dan menyelesaikan tugas jauh lebih cepat.',
      '**Jawaban 2:** Berikut adalah fungsi untuk partisi round-robin:',
      `\`\`\`python
# Mendefinisikan fungsi untuk membagi data dengan strategi round-robin.
# Fungsi ini lebih kompleks, sehingga penggunaan 'def' lebih jelas daripada 'lambda'.
def partisi_round_robin(data, jumlah_partisi):
  # Menyiapkan list kosong sebanyak jumlah partisi yang diinginkan.
  # Contoh: jika jumlah_partisi=3, ini akan membuat [[], [], []]
  partisi = [[] for _ in range(jumlah_partisi)]
  
  # Melakukan iterasi pada setiap item data beserta indeksnya.
  for i, item in enumerate(data):
    # Memasukkan item ke partisi yang sesuai berdasarkan sisa bagi (modulo).
    # i % jumlah_partisi akan menghasilkan 0, 1, 2, 0, 1, 2, ...
    partisi[i % jumlah_partisi].append(item)
    
  # Mengembalikan list yang berisi partisi-partisi data.
  return partisi

# Contoh data untuk di partisi.
data_contoh = list(range(10))
# Memanggil fungsi partisi dengan 3 partisi.
partisi_hasil = partisi_round_robin(data_contoh, 3)
# Mencetak hasil partisi.
print(partisi_hasil)
\`\`\``,
      '_CONSOLE_Setiap angka dari 0 hingga 9 didistribusikan secara bergiliran ke dalam 3 list partisi.|||[[0, 3, 6, 9], [1, 4, 7], [2, 5, 8]]',
    ]
  },
  {
    id: 3,
    title: 'Pengenalan MapReduce Sederhana',
    theory: [
      '**Dari Paralel ke Pola yang Terstruktur**',
      'Kita sudah tahu dari pertemuan sebelumnya bahwa membagi data (partisi) dan mengerjakannya bersamaan (paralel) adalah kunci kecepatan. Sekarang, kita akan belajar tentang **MapReduce**, sebuah "resep" atau pola pikir yang sangat populer untuk menstrukturkan pekerjaan paralel tersebut, terutama untuk tugas agregasi data.',
      '**MapReduce: "Resep" Tiga Langkah Mengolah Data Raksasa**',
      'MapReduce adalah sebuah pola pikir atau "resep" yang sangat terkenal dan kuat untuk mengolah data besar secara paralel. Bayangkan kita ingin menghitung jumlah setiap jenis buah dari ribuan keranjang buah yang tersebar di banyak truk.',
      '**1. Langkah MAP (Memetakan/Mengubah):**',
      '   - **Tugas:** Setiap "pekerja" (node) mengambil satu keranjang (partisi). Untuk setiap buah di dalamnya, ia membuat catatan kecil dalam format `(kunci, nilai)`. Misalnya, jika menemukan apel, ia menulis `(apel, 1)`. Jika menemukan jeruk, ia menulis `(jeruk, 1)`.',
      '   - **Intinya:** Mengubah setiap item data menjadi pasangan `(kunci, nilai)`. Langkah ini sangat cepat dan bisa dilakukan secara paralel sempurna karena setiap pekerja bisa melakukannya sendiri tanpa perlu berkomunikasi dengan teman. *Dalam praktiknya, banyak framework modern seperti Dask menyediakan fungsi tingkat tinggi yang menyederhanakan ini. Alih-alih secara manual membuat `(kata, 1)`, kita cukup menyiapkan aliran kata, dan fungsi seperti `.frequencies()` akan menangani logika `(kunci, nilai)` ini di belakang layar.*',
      '**2. Langkah SHUFFLE (Mengocok/Mengelompokkan):**',
       '   - **Tugas:** Ini adalah langkah "ajaib" di belakang layar yang paling intensif. Sistem mengumpulkan semua catatan kecil `(kunci, nilai)` dari semua pekerja. Sistem kemudian mengocoknya sehingga semua catatan dengan kunci yang sama (misal: semua "apel") berkumpul menjadi satu kelompok besar, meskipun asalnya dari truk yang berbeda.',
       '   - **Intinya:** Mengelompokkan semua nilai yang memiliki kunci yang sama. Ini adalah bagian yang paling "mahal" karena melibatkan pengiriman data antar komputer melalui jaringan.',
      '**3. Langkah REDUCE (Meringkas/Agregasi):**',
      '   - **Tugas:** Setelah data terkelompok berdasarkan kunci, satu pekerja ditugaskan untuk setiap kelompok. Pekerja untuk kelompok "apel" akan mengambil daftar `[1, 1, 1, ...]` dan meringkasnya (misal: menjumlahkannya) menjadi satu hasil akhir. Hasilnya adalah `(apel, 25)`.',
      '   - **Intinya:** Meringkas sekelompok nilai yang memiliki kunci yang sama menjadi satu nilai akhir.',
      'Pola pikir **Map -> Shuffle -> Reduce** ini adalah fondasi dari hampir semua pekerjaan data besar, mulai dari menghitung kata hingga melatih model machine learning.'
    ],
    practice: [
      '**Praktik: Menghitung Kata dengan Pola MapReduce**',
      'Kita akan menerapkan resep MapReduce dari teori untuk kasus klasik: menghitung frekuensi setiap kata dalam beberapa kalimat. Perhatikan bagaimana setiap langkah di kode Dask Bag mencerminkan pola tersebut.',
      '**Contoh Kode:**',
      `\`\`\`python
# Mengimpor modul yang diperlukan
import dask.bag as db      # Untuk pemrosesan data paralel berbasis koleksi (bag)
import json                # Untuk memformat output sebagai JSON yang rapi
import string              # Untuk mengakses daftar tanda baca (seperti '.', ',', dll)

# Data teks berupa daftar tiga kalimat
# Kalimat mengandung campuran huruf besar/kecil dan tanda baca (titik di akhir)
artikel = [
    "Dask adalah library untuk komputasi paralel.",
    "dask memudahkan pemrosesan data besar.",
    "Data paralel diproses oleh dask."
]

# Membuat Dask Bag dari daftar 'artikel'
# npartitions=3 berarti setiap kalimat diproses sebagai partisi terpisah
bag = db.from_sequence(artikel, npartitions=3)

# Langkah MAP + FLATTEN dalam satu alur:
# 1. Ubah setiap kalimat ke huruf kecil (misal: "Dask" → "dask")
# 2. Hapus semua tanda baca menggunakan str.translate() dan string.punctuation
# 3. Pisahkan kalimat menjadi daftar kata dengan .split()
# 4. Ratakan (flatten) semua daftar kata menjadi satu aliran linear
kata = (
    bag
    .map(lambda s: s.lower().translate(str.maketrans('', '', string.punctuation)).split())
    .flatten()
)

# Hitung frekuensi kemunculan setiap kata
# Menggunakan scheduler='synchronous' untuk menghindari error multiprocessing
# (penting agar kode berjalan lancar di Windows, IDE, atau notebook)
frekuensi = kata.frequencies().compute(scheduler='synchronous')

# Cetak hasil akhir dalam format JSON:
# - indent=2: membuat output berjenjang (mudah dibaca)
# - sort_keys=True: mengurutkan kata secara alfabetis
print(json.dumps(frekuensi, indent=2, sort_keys=True))
\`\`\``,
      `_CONSOLE_Kode ini mencerminkan pola MapReduce:\n1. **Map:** \`.map()\` dan \`.flatten()\` bekerja sama untuk mengubah setiap kalimat (partisi) menjadi aliran kata-kata bersih. Ini adalah tahap persiapan data.\n2. **Shuffle & Reduce:** Fungsi \`.frequencies()\` adalah abstraksi Dask yang kuat. Di belakang layar, ia melakukan **Shuffle** (mengelompokkan semua kata yang identik) dan **Reduce** (menghitung jumlah untuk setiap kelompok kata) dalam satu langkah yang dioptimalkan.|||{\n  "adalah": 1,\n  "besar": 1,\n  "dask": 3,\n  "data": 2,\n  "diproses": 1,\n  "komputasi": 1,\n  "library": 1,\n  "memudahkan": 1,\n  "oleh": 1,\n  "paralel": 2,\n  "pemrosesan": 1,\n  "untuk": 1\n}`,
    ],
    assignment: ['Modifikasi kode hitung kata untuk mengabaikan kata-kata umum yang tidak penting (stop words) seperti \'untuk\', \'adalah\', \'oleh\' dan juga tanda baca.', 'Gunakan pola pikir MapReduce untuk menghitung suhu **maksimum** per kota dari data berikut: `[("Jakarta", 30), ("Bandung", 22), ("Jakarta", 32), ("Bandung", 25)]`. Jelaskan langkah Map, Shuffle, dan Reduce-nya.'],
    assignmentAnswers: [
      '**Jawaban 1:** Cukup definisikan stop words dan gunakan modul `string` untuk menghapus tanda baca, lalu filter kata-kata tersebut setelah memisahkan kalimat.',
      `\`\`\`python
# Mengimpor Dask Bag, JSON, dan string.
import dask.bag as db
import json
import string

# Mendefinisikan set kata-kata umum (stop words) yang akan diabaikan.
stop_words = {'untuk', 'adalah', 'oleh'} 

# Data teks contoh.
artikel = [
    "Dask adalah library untuk komputasi paralel.",
    "dask memudahkan pemrosesan data besar.",
    "Data paralel diproses oleh dask."
]

# Membuat Dask Bag dari data.
bag = db.from_sequence(artikel)

# Fungsi lambda untuk membersihkan teks (menghapus tanda baca) dan memfilter stop words.
pembersih = lambda teks: [
    kata for kata in teks.lower().translate(str.maketrans('', '', string.punctuation)).split() 
    if kata not in stop_words
]

# Rangkaian proses MapReduce.
word_counts = (
    bag.map(pembersih)      # MAP 1: Membersihkan dan memfilter setiap kalimat.
    .flatten()              # MAP 2: Meratakan menjadi satu aliran kata.
    .frequencies()          # SHUFFLE & REDUCE: Menghitung frekuensi.
    .compute()              # EKSEKUSIS
)

# Mencetak hasil akhir dalam format JSON yang rapi.
print(json.dumps(dict(word_counts), indent=2, sort_keys=True))
\`\`\``,
      `_CONSOLE_{
  "besar": 1,
  "dask": 3,
  "data": 2,
  "diproses": 1,
  "komputasi": 1,
  "library": 1,
  "memudahkan": 1,
  "paralel": 2,
  "pemrosesan": 1
}`,
      '**Jawaban 2:** Alur MapReduce untuk mencari suhu maksimum:',
      '- **MAP:** Data sudah dalam format `(kunci, nilai)`, yaitu `(kota, suhu)`. Jadi, langkah Map tidak perlu mengubah apa pun. Data mentah: `("Jakarta", 30)`, `("Bandung", 22)`, `("Jakarta", 32)`, `("Bandung", 25)`.',
      '- **SHUFFLE:** Kelompokkan semua nilai (suhu) berdasarkan kunci (kota). Hasilnya: `("Jakarta", [30, 32])` dan `("Bandung", [22, 25])`.',
      '- **REDUCE:** Untuk setiap kelompok, terapkan fungsi `max()` untuk mencari nilai tertinggi. Untuk Jakarta: `max([30, 32])` -> `32`. Untuk Bandung: `max([22, 25])` -> `25`.',
      '- **Finalisasi:** Hasil akhirnya adalah `("Jakarta", 32)` dan `("Bandung", 25)`.'
    ]
  },
  {
    id: 4,
    title: 'DataFrame Terdistribusi (Dask)',
    theory: [
      '**Dari Konsep ke Kode yang Lebih Mudah**',
      'Sejauh ini kita telah bekerja dengan konsep yang agak \'rendah\' seperti `delayed` dan `bag`. Ini bagus untuk memahami cara kerja Dask, tapi untuk analisis data sehari-hari, kita butuh sesuatu yang lebih familiar. Inilah gunanya **Dask DataFrame**, yang dirancang untuk terasa seperti library favorit semua orang, Pandas, tapi dengan kekuatan komputasi terdistribusi di baliknya.',
      '**Bekerja dengan Tabel Raksasa Secara Familiar**',
      'Anda pasti tahu Pandas DataFrame, cara standar bekerja dengan data tabel di Python. Sangat mudah, tapi ada masalah besar: seluruh data harus muat di memori (RAM) komputer Anda. Jika data Anda 50 GB tapi RAM Anda hanya 8 GB, program akan macet atau menjadi sangat lambat.',
      'Dask DataFrame menyelesaikan ini. Ia adalah kumpulan dari banyak Pandas DataFrame kecil (partisi) yang tersebar di banyak komputer atau core. Dask **meniru API Pandas**, sehingga kode yang Anda tulis hampir sama, tapi Dask menjalankannya secara paralel dan "malas" di belakang layar.',
      
      '**Konsep Kunci: Eksekusi Malas (Lazy Evaluation)**',
      'Ini adalah ide terpenting. Saat Anda memberi perintah ke Dask (misalnya, "filter data lalu hitung rata-rata"), Dask **tidak langsung mengerjakannya.** Sebaliknya, ia diam-diam membangun sebuah "peta rencana" atau **grafik komputasi**.',
      '**Analogi Blueprint Arsitek:**',
      'Bayangkan Anda seorang arsitek. Klien Anda berkata, "Saya mau rumah." Anda tidak langsung lari membeli batu bata. Anda membuat **gambar denah (blueprint)** dulu. Denah ini menunjukkan semua langkah: buat fondasi, pasang tembok, pasang atap, dll. Denah ini memungkinkan Anda untuk mengoptimalkan seluruh proses sebelum pekerjaan fisik dimulai.',
      'Dask melakukan hal yang sama. Setiap perintah Anda adalah satu langkah dalam "denah" tersebut. Baru setelah Anda berkata `.compute()`, Dask akan memberikan denah itu kepada para "pekerja" untuk dieksekusi. Ini sangat efisien karena Dask bisa melihat seluruh rencana dan mencari cara terpintar untuk menjalankannya, seperti menggabungkan beberapa langkah menjadi satu.',
      '**Manfaat Eksekusi Malas:**',
      '  - **Optimasi:** Dask bisa menganalisis seluruh grafik tugas dan menemukan cara paling efisien untuk menjalankannya.',
      '  - **Efisiensi Memori:** Data tidak dimuat ke memori sampai benar-benar dibutuhkan, memungkinkan pemrosesan data yang jauh lebih besar dari RAM.',
      '  - **Mengurangi Overhead:** Dask menghindari komputasi yang tidak perlu jika hasilnya tidak pernah diminta.'
    ],
    practice: [
      '**Praktik: Membuktikan Eksekusi Malas**',
      'Praktik ini akan membuktikan konsep **Eksekusi Malas**. Perhatikan bagaimana Dask tidak melakukan apa-apa saat kita mendefinisikan `rerata_suhu_per_kota`. Ia hanya membangun "blueprint" di belakang layar. Kita bisa melihat ini dari tipe objeknya, yang merupakan objek Dask, bukan hasil numerik.',
      'Perhitungan nyata baru terjadi saat `.compute()` dipanggil. Setelah itu, tipe objeknya berubah menjadi objek Pandas yang berisi hasil akhir.',
      '**Contoh Kode:**',
      `\`\`\`python
# Mengimpor Dask DataFrame dan Pandas.
import dask.dataframe as dd
import pandas as pd

# Membuat data contoh kecil dengan Pandas. Ini adalah data lokal.
df_pandas = pd.DataFrame({
    'kota': ['A', 'B', 'A', 'B', 'A', 'C'],
    'suhu': [30, 25, 32, 26, 29, 22]
})

# Mengubah tabel Pandas menjadi Dask DataFrame.
# npartitions=2 berarti kita membaginya menjadi 2 partisi.
# Operasi ini sendiri 'malas' dan tidak memindahkan data.
ddf = dd.from_pandas(df_pandas, npartitions=2)

# Membuat RENCANA untuk menghitung rata-rata suhu per kota.
# PENTING: Perhitungan BELUM terjadi di sini.
rerata_suhu_per_kota = ddf.groupby('kota').suhu.mean()

# Menampilkan tipe objek 'rencana' (ini adalah objek Dask, bukan hasil).
print("Tipe objek SEBELUM .compute():")
print(type(rerata_suhu_per_kota))
print("Ini hanyalah sebuah 'blueprint' atau 'rencana'.")

# BARU DI SINI perhitungan dijalankan dengan .compute()
hasil_nyata = rerata_suhu_per_kota.compute()

# Menampilkan tipe objek 'hasil' (ini adalah objek Pandas yang sudah jadi).
print("\\nTipe objek SETELAH .compute():")
print(type(hasil_nyata))
print("Ini adalah hasil akhir yang sesungguhnya.")
print("\\nHasil Akhir:\\n", hasil_nyata)
\`\`\``,
      `_CONSOLE_Output ini membuktikan konsep **Eksekusi Malas**. Objek \`rerata_suhu_per_kota\` hanyalah sebuah "rencana" (objek Dask Series), sedangkan \`hasil_nyata\` adalah tabel Pandas Series yang nyata setelah \`.compute()\` dieksekusi. Dask membangun grafik tugas terlebih dahulu, lalu menjalankannya saat diminta.|||Tipe objek SEBELUM .compute():\n<class 'dask.dataframe.core.Series'>\nIni hanyalah sebuah 'blueprint' atau 'rencana'.\n\nTipe objek SETELAH .compute():\n<class 'pandas.core.series.Series'>\nIni adalah hasil akhir yang sesungguhnya.\n\nHasil Akhir:\nkota\nA    30.333333\nB    25.500000\nC    22.000000\nName: suhu, dtype: float64`
    ],
    assignment: ['Gunakan Dask DataFrame untuk membaca file CSV besar (misalnya, data penerbangan dari internet), lalu buat "rencana" untuk menghitung jumlah penerbangan per maskapai. Jangan panggil `.compute()` sampai akhir.', 'Dari data `kota` dan `suhu` di praktik, cari suhu tertinggi dan terendah dalam satu kali `.compute()` menggunakan `dask.compute()`.'],
    assignmentAnswers: [
      '**Jawaban 1:** Berikut adalah cara membuat "rencana" dan mengeksekusinya di akhir.',
      `\`\`\`python
# Mengimpor Dask DataFrame sebagai dd.
import dask.dataframe as dd

# Ganti 'flights.csv' dengan nama file yang Anda unduh.
# URL contoh: 'https://storage.googleapis.com/dask-tutorial-data/nyc-flights/1990.csv'
# Dask akan membaca file ini secara 'malas'.
ddf = dd.read_csv('flights.csv', dtype={'CRSElapsedTime': 'float64', 'ArrDelay': 'float64', 'DepDelay': 'float64', 'Distance': 'float64'})

# Membuat 'rencana' untuk menghitung jumlah kemunculan setiap maskapai unik.
# .value_counts() adalah cara singkat untuk groupby dan count.
# Perhitungan belum terjadi di sini.
rencana_hitung = ddf['UniqueCarrier'].value_counts()

# Sekarang, jalankan rencana tersebut dengan .compute().
hasil_hitung = rencana_hitung.compute()

# Mencetak hasil perhitungan jumlah penerbangan per maskapai.
print(hasil_hitung)
\`\`\``,
      '**Jawaban 2:** Kita bisa membuat beberapa "rencana" dan mengeksekusinya bersamaan dengan `dask.compute` untuk efisiensi.',
      `\`\`\`python
# Mengimpor library yang diperlukan.
import dask.dataframe as dd
import pandas as pd
import dask

# Data awal.
df_pandas = pd.DataFrame({
    'kota': ['A', 'B', 'A', 'B', 'A', 'C'],
    'suhu': [30, 25, 32, 26, 29, 22]
})
ddf = dd.from_pandas(df_pandas, npartitions=2)

# Membuat DUA 'rencana' terpisah.
rencana_suhu_tertinggi = ddf['suhu'].max()
rencana_suhu_terendah = ddf['suhu'].min()

# Menjalankan KEDUA rencana secara bersamaan dalam satu panggilan .compute().
# Dask akan mengoptimalkan ini dan mungkin hanya melewati data sekali.
suhu_tertinggi, suhu_terendah = dask.compute(rencana_suhu_tertinggi, rencana_suhu_terendah)

# Mencetak hasil yang ditemukan.
print(f"Suhu tertinggi adalah: {suhu_tertinggi}")
print(f"Suhu terendah adalah: {suhu_terendah}")
\`\`\``,
      `_CONSOLE_Suhu tertinggi adalah: 32\nSuhu terendah adalah: 22`
    ]
  },
  {
    id: 5,
    title: 'Visualisasi Data Terdistribusi',
    theory: [
      '**Melihat Hasil Kerja Keras Kita**',
      'Setelah belajar cara memproses data tabel raksasa dengan Dask DataFrame di pertemuan sebelumnya, langkah selanjutnya yang logis adalah bagaimana cara **memvisualisasikan** hasilnya. Namun, membuat grafik dari data yang ukurannya lebih besar dari RAM kita memerlukan strategi khusus.',
      '**Membuat Grafik dari Data Raksasa**',
      '**Masalah:** Anda punya data 100 GB dan ingin membuat grafik di laptop Anda yang RAM-nya hanya 8 GB. Jika Anda mencoba memuat semua data itu, program akan macet. Ini seperti mencoba menampung air laut ke dalam satu gelas. Tidak mungkin!',
      '**Aturan Utama: Hitung Dulu, Gambar Kemudian**',
      'Jangan pernah mencoba memindahkan data 100 GB itu ke laptop Anda untuk visualisasi. Alur kerja yang benar adalah melakukan agregasi (perhitungan ringkasan) di sistem terdistribusi terlebih dahulu, baru memvisualisasikan hasil ringkasannya yang sudah kecil.',
      '  1. **Lakukan Perhitungan di Sistem Terdistribusi:** Suruh "tim komputer" Anda untuk menghitung ringkasan data, misalnya `jumlah total penjualan per bulan` atau `suhu rata-rata per kota`. Perhitungan ini terjadi di cluster, bukan di laptop Anda.',
      '  2. **Ambil Hasil Ringkasannya Saja:** Hasil dari perhitungan itu biasanya sangat kecil (misalnya, hanya 12 baris untuk penjualan per bulan). Pindahkan **hasil kecil** ini ke laptop Anda dengan `.compute()`. Hasilnya biasanya berupa Pandas DataFrame atau Series.',
      '  3. **Buat Grafik dari Hasil Kecil:** Sekarang Anda bisa dengan mudah membuat grafik dari data ringkasan yang kecil itu menggunakan library visualisasi standar seperti Matplotlib atau Seaborn.',
      '**Analogi Sup:** Untuk tahu apakah sup Anda sudah cukup asin, Anda tidak perlu meminum seluruh isi panci. Cukup cicipi satu sendok saja. Dalam data, kita tidak perlu melihat semua 100 GB data untuk membuat grafik, kita hanya butuh ringkasannya (agregatnya).',
      '**Teknik Lainnya:** Untuk melihat distribusi data mentah, kita bisa mengambil **sampel acak** (misal 0.1% dari data) yang cukup kecil untuk muat di memori, lalu membuat plot dari sampel tersebut.'
    ],
    practice: [
      '**Instalasi & Persiapan**',
      'Untuk mengubah data menjadi grafik, kita butuh `matplotlib`. Ini adalah library visualisasi paling populer di Python. Jalankan perintah ini di terminal Anda:',
      `\`\`\`bash
pip install matplotlib
\`\`\``,
      '**Praktik: Menerapkan Aturan "Hitung Dulu, Gambar Kemudian"**',
      'Praktik ini adalah implementasi langsung dari **Aturan Utama**. Kita akan membuat grafik batang dari rata-rata suhu per kota. Perhatikan alur kerjanya:',
      '1. Dask membuat "rencana" untuk menghitung rata-rata suhu (di "pabrik" data besar).',
      '2. Kita ambil hasil kecilnya (cuma 3 baris!) dengan `.compute()`. Hasilnya menjadi objek Pandas.',
      '3. Kita buat grafik dari 3 baris data Pandas tersebut menggunakan Matplotlib.',
      '**Contoh Kode:**',
      `\`\`\`python
# Mengimpor library yang diperlukan.
import dask.dataframe as dd
import pandas as pd
import matplotlib.pyplot as plt

# Membuat data contoh.
df_pandas = pd.DataFrame({'kota': ['A', 'B', 'A', 'B', 'A', 'C'], 'suhu': [30, 25, 32, 26, 29, 22]})
ddf = dd.from_pandas(df_pandas, npartitions=2)

# 1. Agregasi data di Dask: menghitung rata-rata suhu per kota (ini masih 'rencana').
rerata_suhu_per_kota = ddf.groupby('kota').suhu.mean()

# 2. Eksekusi: mengambil hasil agregasi yang KECIL ke memori menjadi objek Pandas.
hasil_pandas = rerata_suhu_per_kota.compute()

# 3. Visualisasi: membuat grafik dari objek Pandas yang sudah kecil.
plt.figure(figsize=(8, 5)) # Membuat kanvas gambar.
hasil_pandas.plot(kind='bar', color=['#E84142', '#4A90E2', '#50E3C2']) # Membuat plot batang.
plt.title('Rata-rata Suhu per Kota', fontsize=16)
plt.xlabel('Kota', fontsize=12)
plt.ylabel('Rata-rata Suhu (°C)', fontsize=12)
plt.xticks(rotation=0) # Agar label sumbu x tidak miring.
plt.grid(axis='y', linestyle='--', alpha=0.7)
plt.tight_layout() # Merapikan layout.
plt.savefig("suhu_per_kota.png") # Menyimpan gambar.

print("Data kecil (Pandas Series) yang digunakan untuk membuat grafik:")
print(hasil_pandas)
print("\\nGrafik telah disimpan sebagai suhu_per_kota.png")
\`\`\``,
      `_CONSOLE_Alur kerja yang benar telah dijalankan. Dask melakukan pekerjaan berat (agregasi), lalu hasilnya yang sudah ringan diserahkan ke Matplotlib untuk digambar. File \`suhu_per_kota.png\` akan muncul di folder Anda. Ini adalah cara kerja yang benar dan aman untuk data berukuran berapa pun.|||Data kecil (Pandas Series) yang digunakan untuk membuat grafik:\nkota\nA    30.333333\nB    25.500000\nC    22.000000\nName: suhu, dtype: float64\n\nGrafik telah disimpan sebagai suhu_per_kota.png`,
    ],
    assignment: ['Buat grafik garis (line chart) dari data deret waktu sederhana (misal: harga saham harian). Pastikan sumbu x adalah tanggal.', 'Ambil sampel acak (misalnya 10% dari data) menggunakan `.sample(frac=0.1)`, lalu buat grafik sebar (scatter plot) dari dua kolom angka.'],
    assignmentAnswers: [
      '**Jawaban 1:** Kode berikut membuat contoh data harga saham dan menggambarkannya dalam grafik garis.',
      `\`\`\`python
# Mengimpor library yang diperlukan.
import dask.dataframe as dd
import pandas as pd
import matplotlib.pyplot as plt

# Membuat DataFrame Pandas contoh untuk harga saham.
# pd.to_datetime sangat penting untuk memastikan kolom tanggal dikenali dengan benar.
df = pd.DataFrame({
    'tanggal': pd.to_datetime(['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05']),
    'harga': [100, 105, 102, 108, 110] # Data harga saham.
})
# Mengubah DataFrame Pandas menjadi Dask DataFrame.
ddf = dd.from_pandas(df, npartitions=1)

# Menjadikan 'tanggal' sebagai index dan mengambil hasilnya ke Pandas.
# Untuk plot garis, data harus terurut, jadi biasanya kita bekerja dengan data kecil di Pandas.
hasil_pandas = ddf.set_index('tanggal').compute()

# Membuat plot garis dari kolom 'harga'.
plt.figure(figsize=(10, 5))
hasil_pandas['harga'].plot(kind='line', marker='o', title='Harga Saham Harian')
plt.grid(True)
plt.savefig('grafik_saham.png')
print("Grafik saham telah disimpan sebagai grafik_saham.png.")
\`\`\``,
      `_CONSOLE_Grafik saham telah disimpan sebagai grafik_saham.png.`,
      '**Jawaban 2:** Berikut cara mengambil sampel acak dan membuat scatter plot.',
      `\`\`\`python
# Asumsikan 'ddf' adalah Dask DataFrame besar yang sudah ada.
# Untuk contoh ini, kita buat data dummy.
df_besar = pd.DataFrame({
    'kolom_A': range(1000),
    'kolom_B': [x * 2 + (x % 50) for x in range(1000)] # Membuat pola
})
ddf_besar = dd.from_pandas(df_besar, npartitions=4)

# Mengambil sampel acak sebesar 10% dari data.
# .compute() dipanggil karena hasilnya kecil dan siap untuk divisualisasikan.
sampel_df = ddf_besar.sample(frac=0.1).compute()

# Membuat figure baru untuk plot.
plt.figure(figsize=(8, 6))
# Membuat scatter plot dari dua kolom pada data sampel.
plt.scatter(sampel_df['kolom_A'], sampel_df['kolom_B'], alpha=0.6)
# Menambahkan judul pada plot.
plt.title('Scatter Plot dari 10% Sampel Data')
# Menambahkan label untuk sumbu X.
plt.xlabel('Kolom A')
# Menambahkan label untuk sumbu Y.
plt.ylabel('Kolom B')
# Menyimpan plot sebagai file gambar.
plt.savefig('scatter_plot.png')
# Memberikan pesan konfirmasi.
print(f"Scatter plot dari {len(sampel_df)} titik data telah disimpan sebagai scatter_plot.png.")
\`\`\``,
      `_CONSOLE_Scatter plot dari 100 titik data telah disimpan sebagai scatter_plot.png.`
    ]
  },
  {
    id: 6,
    title: 'Pengenalan Apache Spark (Lokal)',
    theory: [
      '**Melihat Alat Lain di Dunia Data Besar**',
      'Kita sudah cukup mahir menggunakan Dask untuk menerapkan konsep-konsep seperti partisi, eksekusi malas, dan DataFrame terdistribusi. Sekarang, saatnya melihat **Apache Spark**, "raksasa" lain di dunia data besar. Anda akan terkejut melihat betapa banyak konsep yang sudah kita pelajari di Dask berlaku juga di Spark, meskipun dengan sintaks yang sedikit berbeda.',
      '**Spark: Standar Industri untuk Data Besar**',
      'Apache Spark adalah teknologi lain yang sangat populer untuk data besar. Jika Dask itu seperti "upgrade" untuk ekosistem Python (Pandas, Numpy), Spark lebih mirip sebuah "pabrik" lengkap yang dirancang khusus dari awal untuk data besar dan berjalan di Java Virtual Machine (JVM). Ini memberinya beberapa keuntungan performa di skala sangat besar.',
      '**Perbedaan Kunci dengan Dask:**',
      '  - **Ekosistem:** Spark memiliki ekosistem yang sangat matang dan terintegrasi untuk berbagai tugas: Spark SQL (untuk query mirip SQL), MLlib (machine learning), Spark Streaming (data real-time), dan GraphX (pemrosesan graf). Dask lebih fokus pada integrasi dengan ekosistem Scientific Python (Pandas, Scikit-learn).',
      '  - **Bahasa:** Spark ditulis dalam Scala dan berjalan di JVM, tapi memiliki API untuk Python (PySpark), R, dan SQL. Dask adalah Python-native.',
      '  - **Cara Berpikir:** Secara konseptual, keduanya sangat mirip. Dengan belajar Dask, Anda sudah memahami 90% cara berpikir yang dibutuhkan untuk menggunakan Spark.',
      '**Transformasi vs. Aksi (Terminologi Spark)**',
      'Di Spark, ada dua jenis operasi, yang sangat mirip dengan konsep "malas" di Dask:',
      '  - **Transformasi:** Perintah yang membangun "blueprint" atau grafik komputasi (seperti `filter`, `groupBy`, `select`). Ini adalah operasi malas, sama seperti di Dask. Spark hanya mencatat rencana ini.',
      '  - **Aksi:** Perintah yang memicu eksekusi "blueprint" (seperti `.show()`, `.count()`, `.collect()`, `.write()`). Ini sama seperti `.compute()` di Dask. Ketika sebuah aksi dipanggil, Spark akan mengoptimalkan dan menjalankan seluruh grafik transformasi yang telah dibangun.'
    ],
    practice: [
      '**Instalasi & Persiapan**',
      'Untuk "berbicara" dengan Spark dari Python, kita perlu `pyspark`. Jalankan perintah ini di terminal:',
      `\`\`\`bash
pip install pyspark
\`\`\``,
      '**Praktik: Tugas yang Sama, Alat Berbeda (Spark)**',
      'Kita akan mengerjakan tugas yang sama persis seperti di pertemuan 4 (menghitung rata-rata suhu), tapi kali ini dengan Spark. Perhatikan betapa miripnya cara berpikirnya. Kita mendefinisikan transformasi (`groupBy`, `agg`) terlebih dahulu, dan perhitungan baru berjalan saat kita memanggil *aksi* `.show()`',
      '**Contoh Kode:**',
      `\`\`\`python
# Mengimpor library yang diperlukan dari pyspark.
from pyspark.sql import SparkSession
from pyspark.sql.functions import avg, col

# Membuat koneksi ke Spark (SparkSession). Ini adalah langkah wajib.
# .master("local[*]") berarti kita menjalankan Spark di semua core CPU lokal.
spark = SparkSession.builder.appName("ContohSpark").master("local[*]").getOrCreate()

# Membuat data contoh.
data = [("A", 30), ("B", 25), ("A", 32), ("B", 26), ("A", 29), ("C", 22)]
columns = ["kota", "suhu"]
df = spark.createDataFrame(data, columns)

# Menampilkan 20 baris pertama. .show() adalah sebuah 'aksi' yang memicu eksekusi.
print("--- Data Awal ---")
df.show()

# Membuat TRANSFORMASI (rencana) untuk menghitung rata-rata suhu.
# Perhatikan sintaksnya yang sedikit berbeda dari Pandas/Dask.
# .agg() adalah singkatan dari aggregate (agregasi).
rerata_suhu_per_kota = df.groupBy("kota").agg(avg("suhu").alias("rerata_suhu"))

# Menampilkan hasil. .show() di sini akan memicu eksekusi 'rencana' di atas.
print("\\n--- Hasil Akhir ---")
rerata_suhu_per_kota.show()

# Menghentikan koneksi Spark untuk melepaskan sumber daya.
spark.stop()
\`\`\``,
      `_CONSOLE_Caranya sangat mirip dengan Dask, kan? Kita membangun "rencana" dengan \`groupBy\` dan \`agg\` (transformasi), lalu memicu eksekusinya dengan "aksi" \`.show()\`. Spark akan menampilkan hasilnya dalam format tabel yang rapi di konsol.|||--- Data Awal ---\n+----+----+\n|kota|suhu|\n+----+----+\n|   A|  30|\n|   B|  25|\n|   A|  32|\n|   B|  26|\n|   A|  29|\n|   C|  22|\n+----+----+\n\n--- Hasil Akhir ---\n+----+------------------+\n|kota|       rerata_suhu|\n+----+------------------+\n|   B|              25.5|\n|   C|              22.0|\n|   A|30.333333333333332|\n+----+------------------+`,
    ],
    assignment: ['Ulangi tugas dari pertemuan 4 (menghitung jumlah penerbangan per maskapai) menggunakan PySpark DataFrame.', 'Bandingkan cara penulisan kode antara Dask dan PySpark untuk tugas tersebut. Apa perbedaan utama yang Anda lihat dalam hal sintaks dan cara pemanggilan fungsi?'],
    assignmentAnswers: [
      '**Jawaban 1:** Berikut adalah solusi menggunakan PySpark.',
      `\`\`\`python
# Mengimpor SparkSession dari library pyspark.sql.
from pyspark.sql import SparkSession

# Membuat atau mendapatkan SparkSession dengan nama aplikasi "HitungPenerbangan".
spark = SparkSession.builder.appName("HitungPenerbangan").getOrCreate()

# Membaca data penerbangan dari file CSV ke DataFrame.
# Ganti 'flights.csv' dengan nama file Anda.
# header=True: baris pertama adalah nama kolom. inferSchema=True: Spark menebak tipe data.
df = spark.read.csv('flights.csv', header=True, inferSchema=True)

# Mengelompokkan berdasarkan maskapai ('UniqueCarrier') dan menghitung jumlah baris di setiap grup.
flight_counts = df.groupBy('UniqueCarrier').count()

# Menampilkan judul sebelum output.
print("Jumlah penerbangan per maskapai:")
# Menampilkan hasil perhitungan (aksi .show() memicu eksekusi).
flight_counts.show()

# Menghentikan SparkSession.
spark.stop()
\`\`\``,
      '**Jawaban 2:** Perbedaan utama adalah:\n- **Dask:** Sintaksnya sangat mirip dengan Pandas. Kita menggunakan `ddf[\'kolom\'].value_counts()`, yang merupakan metode yang familiar bagi pengguna Pandas. Terasa sangat "Pythonic".\n- **PySpark:** Sintaksnya lebih mirip SQL dan lebih deklaratif. Kita menggunakan `df.groupBy(\'kolom\').count()`. Ini adalah pola umum di Spark, di mana kita secara eksplisit menyatakan operasi pengelompokan (`groupBy`) diikuti oleh operasi agregasi (`count`, `sum`, `avg`).\n- **Eksekusi:** Di Dask, kita memanggil `.compute()` untuk mendapatkan hasil akhir. Di PySpark, "aksi" seperti `.show()` (untuk menampilkan), `.collect()` (untuk membawa data ke driver), atau `.count()` (untuk menghitung baris) akan memicu komputasi.'
    ]
  },
  {
    id: 7,
    title: 'Review & Persiapan UTS',
    isReview: true,
    summary: 'Sesi ini adalah untuk mengulang kembali semua materi penting dari pertemuan 1 hingga 6. Kita akan mengerjakan serangkaian soal latihan praktis yang mencakup setiap topik utama untuk memastikan pemahaman sebelum Ujian Tengah Semester.',
    practice: [
      '**Soal Latihan Review (Pertemuan 1-6)**',
      'Kerjakan setiap soal berikut untuk menguji pemahaman Anda terhadap konsep-konsep yang telah dipelajari.',

      '**Soal 1: Konsep Sistem Terdistribusi (Pertemuan 1)**',
      'Gunakan `dask.delayed` untuk membuat rencana komputasi paralel yang menghitung pangkat dua dari angka 10, 20, dan 30, lalu jumlahkan ketiga hasilnya. *Tantangan: Jangan jalankan perhitungannya sebelum memanggil `.compute()`.*',
      `\`\`\`python
# Kerjakan di sini
import dask
import time

# Fungsi ini mensimulasikan tugas yang butuh waktu lama.
# Penggunaan 'def' dipertahankan karena lambda tidak bisa berisi 'time.sleep'.
def hitung_pangkat(x):
    time.sleep(1) # Jeda 1 detik untuk simulasi pekerjaan berat.
    return x * x  # Kembalikan hasil pangkat dua.

# 1. Buat rencana tugas (delayed) untuk setiap angka.
# ...

# 2. Buat rencana untuk menjumlahkan hasil dari ketiga tugas.
# ...

# 3. Eksekusi semua rencana dan cetak hasilnya.
# ...
\`\`\``,

      '**Soal 2: Paralelisme Data (Pertemuan 2)**',
      'Anda memiliki daftar string. Buatlah fungsi yang mengubah string menjadi huruf besar dan menghitung panjangnya. Kemudian, bagi data tersebut menjadi 2 partisi dan proses secara paralel menggunakan Dask untuk mendapatkan total panjang dari semua string.',
      `\`\`\`python
# Kerjakan di sini
import dask

data_teks = ["pemrosesan", "data", "terdistribusi", "dengan", "dask", "dan", "spark"]

# Fungsi ini menghitung total panjang semua string dalam sebuah partisi.
# Bisa disederhanakan menggunakan sum() dan generator expression.
proses_teks = lambda partisi: sum(len(teks) for teks in partisi)
    
# 1. Bagi data menjadi 2 partisi (misalnya ganjil dan genap).
# ...

# 2. Buat rencana Dask untuk memproses setiap partisi secara paralel.
# ...

# 3. Jumlahkan hasilnya dan eksekusi dengan .compute().
# ...
\`\`\``,

      '**Soal 3: Pola Pikir MapReduce (Pertemuan 3)**',
      'Dengan menggunakan `dask.bag`, hitung jumlah kemunculan setiap huruf pertama dari daftar nama berikut. Contoh: "Alice" -> "A", "Bob" -> "B".',
      `\`\`\`python
# Kerjakan di sini
import dask.bag as db

nama = ["Alice", "Bob", "Charlie", "Anna", "Ben", "Catherine"]

# 1. Buat Dask Bag dari data.
bag = db.from_sequence(nama)

# 2. Gunakan .map() untuk mengambil huruf pertama (fase Map).
# huruf_pertama = ...

# 3. Gunakan .frequencies() untuk menghitung (fase Shuffle & Reduce) dan .compute().
# hasil = ...
# print(dict(hasil))
\`\`\``,

      '**Soal 4: Dask DataFrame (Pertemuan 4)**',
      'Buat Dask DataFrame dari data di bawah. Kemudian, tanpa menggunakan `.compute()` hingga akhir, buat rencana untuk memfilter karyawan dengan gaji di atas 50000 dan hitung jumlah mereka.',
      `\`\`\`python
# Kerjakan di sini
import pandas as pd
import dask.dataframe as dd

data_karyawan = pd.DataFrame({
    'nama': ['Adi', 'Bima', 'Cici', 'Dedi'],
    'gaji': [60000, 45000, 75000, 48000]
})

# 1. Buat Dask DataFrame dari Pandas DataFrame.
# ddf = ...

# 2. Buat 'rencana' untuk memfilter gaji > 50000.
# ddf_gaji_tinggi = ...

# 3. Buat 'rencana' untuk menghitung jumlah barisnya.
# jumlah = ...

# 4. Eksekusi rencana dan cetak hasilnya.
# hasil = ...
# print(f"Jumlah karyawan dengan gaji > 50000: {hasil}")
\`\`\``,

      '**Soal 5: Visualisasi Data (Pertemuan 5)**',
      'Dari data karyawan di soal 4, agregasi data terlebih dahulu untuk menemukan gaji rata-rata. Kemudian, pindahkan **hanya hasil agregasi** tersebut ke Pandas dan buatlah plot batang sederhana (cukup cetak hasilnya).',
      `\`\`\`python
# Kerjakan di sini
# (Gunakan ddf dari soal sebelumnya)
import pandas as pd
import dask.dataframe as dd

data_karyawan = pd.DataFrame({
    'nama': ['Adi', 'Bima', 'Cici', 'Dedi'],
    'gaji': [60000, 45000, 75000, 48000]
})
ddf = dd.from_pandas(data_karyawan, npartitions=2)

# 1. Hitung gaji rata-rata dengan Dask (ini adalah 'rencana').
# gaji_rata_rata = ...

# 2. Pindahkan HANYA hasil kecil ini ke Pandas dengan .compute().
# hasil_pandas = ...

# 3. Tampilkan data yang akan di-plot.
print("Data yang siap untuk di-plot:")
# print(hasil_pandas)
\`\`\``,

      '**Soal 6: Pengenalan PySpark (Pertemuan 6)**',
      'Lakukan tugas yang sama seperti Soal 4, tetapi kali ini menggunakan PySpark. Buat Spark DataFrame, filter, dan hitung jumlah karyawan dengan gaji di atas 50000.',
      `\`\`\`python
# Kerjakan di sini
from pyspark.sql import SparkSession
import pandas as pd

# 1. Buat SparkSession.
# spark = ...

# Data Pandas untuk dikonversi.
data_karyawan = pd.DataFrame({
    'nama': ['Adi', 'Bima', 'Cici', 'Dedi'],
    'gaji': [60000, 45000, 75000, 48000]
})

# 2. Buat Spark DataFrame dari data pandas.
# sdf = ...

# 3. Filter dan hitung (count adalah 'aksi' di Spark).
# jumlah = ...

# 4. Tampilkan hasil dan hentikan Spark.
# print(f"Jumlah karyawan (Spark): {jumlah}")
# spark.stop()
\`\`\``,
    ],
    assignmentAnswers: [
      '**Jawaban Soal 1:** Cukup panggil `.compute()` pada objek `total` untuk memicu eksekusi paralel.',
      `\`\`\`python
# Mengimpor library Dask dan time.
import dask
import time

# Fungsi ini mensimulasikan tugas yang butuh waktu lama.
# Penggunaan 'def' dipertahankan karena lambda tidak bisa berisi 'time.sleep'.
def hitung_pangkat(x):
    time.sleep(1) # Jeda 1 detik untuk simulasi pekerjaan berat.
    return x * x  # Kembalikan hasil pangkat dua.

# 1. Buat rencana tugas (delayed) untuk setiap angka.
tugas_1 = dask.delayed(hitung_pangkat)(10)
tugas_2 = dask.delayed(hitung_pangkat)(20)
tugas_3 = dask.delayed(hitung_pangkat)(30)

# 2. Buat rencana untuk menjumlahkan hasil dari ketiga tugas.
total = dask.delayed(sum)([tugas_1, tugas_2, tugas_3])

# 3. Eksekusi semua rencana secara paralel dan cetak hasilnya.
hasil = total.compute()
print(hasil)
\`\`\``,
      '_CONSOLE_Meskipun setiap tugas disimulasikan butuh 1 detik, total waktu eksekusi akan mendekati 1 detik (bukan 3 detik) karena Dask menjalankannya secara paralel. Hasilnya adalah 100 + 400 + 900.|||1400',
      
      '**Jawaban Soal 2:** Data dibagi menjadi dua partisi, lalu diproses secara paralel.',
      `\`\`\`python
# Mengimpor library Dask.
import dask

# Data awal berupa list of strings.
data_teks = ["pemrosesan", "data", "terdistribusi", "dengan", "dask", "dan", "spark"]

# Fungsi lambda untuk menghitung total panjang string dalam sebuah partisi.
proses_teks = lambda partisi: sum(len(teks) for teks in partisi)
    
# 1. Bagi data menjadi 2 partisi (berdasarkan indeks ganjil dan genap).
partisi_1 = data_teks[::2]
partisi_2 = data_teks[1::2]

# 2. Buat rencana Dask untuk memproses setiap partisi.
tugas_1 = dask.delayed(proses_teks)(partisi_1)
tugas_2 = dask.delayed(proses_teks)(partisi_2)

# 3. Jumlahkan hasilnya dan eksekusi secara paralel.
total = dask.delayed(sum)([tugas_1, tugas_2])
hasil = total.compute()
print(f"Total panjang semua string: {hasil}")
\`\`\``,
      '_CONSOLE_Total panjang karakter dari semua string di dalam list.|||Total panjang semua string: 45',

      '**Jawaban Soal 3:** Pola MapReduce dapat diimplementasikan dengan `map` untuk mengambil huruf pertama dan `frequencies` untuk menghitungnya.',
      `\`\`\`python
# Mengimpor Dask Bag.
import dask.bag as db

# Data nama-nama.
nama = ["Alice", "Bob", "Charlie", "Anna", "Ben", "Catherine"]

# 1. Buat Dask Bag dari data.
bag = db.from_sequence(nama)

# 2. Gunakan .map() untuk mengambil huruf pertama (fase Map).
huruf_pertama = bag.map(lambda x: x[0])

# 3. Gunakan .frequencies() untuk menghitung (fase Shuffle & Reduce) dan .compute().
hasil = huruf_pertama.frequencies().compute(scheduler='single-threaded')
print(dict(hasil))
\`\`\``,
      '_CONSOLE_Hasilnya adalah kamus yang memetakan setiap huruf pertama ke jumlah kemunculannya.|||{\'A\': 2, \'B\': 2, \'C\': 2}',
      
      '**Jawaban Soal 4:** Kuncinya adalah membangun seluruh rantai operasi Dask DataFrame dan hanya memanggil `.compute()` di akhir.',
      `\`\`\`python
# Mengimpor library Pandas dan Dask DataFrame.
import pandas as pd
import dask.dataframe as dd

# Data karyawan dalam bentuk Pandas DataFrame.
data_karyawan = pd.DataFrame({
    'nama': ['Adi', 'Bima', 'Cici', 'Dedi'],
    'gaji': [60000, 45000, 75000, 48000]
})

# 1. Buat Dask DataFrame dari Pandas DataFrame dengan 2 partisi.
ddf = dd.from_pandas(data_karyawan, npartitions=2)

# 2. Buat 'rencana' untuk memfilter baris dengan gaji > 50000.
ddf_gaji_tinggi = ddf[ddf.gaji > 50000]

# 3. Buat 'rencana' untuk menghitung jumlah baris (ini operasi malas).
jumlah = len(ddf_gaji_tinggi)

# 4. Eksekusi semua 'rencana' di atas dan cetak hasilnya.
hasil = jumlah.compute()
print(f"Jumlah karyawan dengan gaji > 50000: {hasil}")
\`\`\``,
       '_CONSOLE_Hanya karyawan dengan gaji di atas 50000 (Adi dan Cici) yang dihitung.|||Jumlah karyawan dengan gaji > 50000: 2',
      
      '**Jawaban Soal 5:** Lakukan agregasi `.mean()` dulu, baru panggil `.compute()` pada hasilnya yang sudah kecil.',
      `\`\`\`python
# Mengimpor library Pandas dan Dask DataFrame.
import pandas as pd
import dask.dataframe as dd

# Data karyawan dalam bentuk Pandas DataFrame.
data_karyawan = pd.DataFrame({
    'nama': ['Adi', 'Bima', 'Cici', 'Dedi'],
    'gaji': [60000, 45000, 75000, 48000]
})
# Membuat Dask DataFrame.
ddf = dd.from_pandas(data_karyawan, npartitions=2)

# 1. Buat 'rencana' untuk menghitung gaji rata-rata.
gaji_rata_rata = ddf['gaji'].mean()

# 2. Eksekusi 'rencana' untuk mendapatkan hasil kecilnya ke Pandas.
hasil_pandas = gaji_rata_rata.compute()

# 3. Tampilkan data yang akan di-plot.
print("Data yang siap untuk di-plot:")
print(hasil_pandas)
\`\`\``,
      '_CONSOLE_Hasilnya adalah satu angka (rata-rata), yang sangat kecil dan aman untuk dipindahkan ke mesin lokal untuk visualisasi.|||Data yang siap untuk di-plot:\n57000.0',

      '**Jawaban Soal 6:** Sintaks PySpark mirip SQL, menggunakan `.filter()` dan aksi `.count()`.',
      `\`\`\`python
# Mengimpor library yang dibutuhkan.
from pyspark.sql import SparkSession
import pandas as pd

# 1. Membuat atau mendapatkan SparkSession.
spark = SparkSession.builder.appName("ReviewSoal6").getOrCreate()

# Data karyawan dalam bentuk Pandas DataFrame.
data_karyawan = pd.DataFrame({
    'nama': ['Adi', 'Bima', 'Cici', 'Dedi'],
    'gaji': [60000, 45000, 75000, 48000]
})

# 2. Membuat Spark DataFrame dari data Pandas.
sdf = spark.createDataFrame(data_karyawan)

# 3. Melakukan filter dan langsung menghitung jumlahnya (count adalah 'aksi').
jumlah = sdf.filter(sdf.gaji > 50000).count()

# 4. Menampilkan hasil.
print(f"Jumlah karyawan dengan gaji > 50000 (Spark): {jumlah}")
# Menghentikan SparkSession.
spark.stop()
\`\`\``,
      '_CONSOLE_Hasilnya sama dengan Dask, menunjukkan bahwa kedua framework dapat menyelesaikan tugas yang sama dengan sintaks yang sedikit berbeda.|||Jumlah karyawan dengan gaji > 50000 (Spark): 2',
    ]
  },
  {
    id: 8,
    title: 'UJIAN TENGAH SEMESTER (UTS)',
    isExam: true,
    summary: 'Ujian akan menguji pemahaman konsep-konsep dasar pemrosesan data terdistribusi (Paralelisme, Partisi, MapReduce, Eksekusi Malas) dan kemampuan untuk menulis kode sederhana menggunakan Dask atau PySpark untuk menyelesaikan masalah analisis data kecil.',
  },
  {
    id: 9,
    title: 'Fault Tolerance & Rekomputasi',
    theory: [
      '**Ketika Sesuatu Berjalan Salah**',
      'Di paruh pertama semester ini, kita berasumsi semua komputer bekerja dengan sempurna. Namun, di dunia nyata dengan ratusan atau ribuan mesin, kegagalan adalah hal yang biasa. Pertemuan ini membahas salah satu keunggulan terbesar sistem terdistribusi: **Fault Tolerance**, atau bagaimana sistem bisa tetap menyelesaikan pekerjaannya bahkan jika beberapa "pekerja"-nya gagal di tengah jalan.',
      '**Bagaimana Jika Ada Komputer yang Gagal?**',
      'Dalam sistem yang terdiri dari ribuan komputer, kegagalan itu bukan "jika", tapi "kapan". Salah satu komputer bisa mati kapan saja karena kerusakan hardware, masalah jaringan, atau pembaruan perangkat lunak. Sistem yang baik harus bisa menangani kegagalan ini tanpa menghentikan seluruh pekerjaan. Kemampuan ini disebut **Fault Tolerance** (Tahan Banting).',
      
      '**Mekanisme Inti: Mengingat "Resep" (Lineage)**',
      'Dask dan Spark tidak menyimpan hasil pekerjaan di setiap langkah (itu akan sangat lambat dan memakan banyak ruang). Sebaliknya, mereka **mengingat "resep"** atau grafik komputasi (juga disebut **Lineage**) yang Anda berikan.',
      '**Analogi Resep Kue:**',
      'Bayangkan "blueprint" dari pertemuan 4 sebagai resep kue. Resep itu adalah serangkaian instruksi: (1) Ambil data dari file, (2) Filter baris X, (3) Kelompokkan berdasarkan kolom Y. Dask dan Spark **mengingat resep** ini, bukan menyimpan "foto" adonan di setiap langkah.',
      
      '**Cara Kerja Pemulihan:**',
      'Anda sedang mengaduk adonan (langkah 2), lalu mangkuknya jatuh dan tumpah (satu komputer yang memproses partisi gagal). Apa yang Anda lakukan? Anda tidak perlu panik. Anda cukup melihat resepnya, mengambil bahan-bahan baru dari awal, dan mengulangi langkah 1 dan 2. Proses ini disebut **Rekomputasi** (menghitung ulang).',
      'Jika satu komputer mati, scheduler (pengelola tugas) akan melihat "resep" (lineage) dari partisi yang hilang, lalu menyuruh komputer lain yang masih hidup untuk mengerjakan ulang tugas yang hilang itu dari data asli. Inilah yang membuat sistem ini sangat tangguh.',

      '**Trade-off: Checkpointing**',
      'Untuk "resep" yang sangat panjang dan mahal, mengulang dari awal bisa jadi tidak efisien. Alternatifnya adalah **checkpointing**: secara sengaja menyimpan hasil antara (misalnya, "foto adonan setelah diaduk") ke penyimpanan yang andal. Jika kegagalan terjadi setelah titik ini, sistem bisa memulai ulang dari checkpoint, bukan dari awal. Namun, checkpointing sendiri adalah operasi yang lambat, jadi ini adalah sebuah trade-off antara kecepatan pemulihan dan overhead selama operasi normal.'
    ],
    practice: [
      '**Praktik: Mensimulasikan Tugas yang Gagal**',
      'Kita tidak bisa benar-benar mematikan komputer, tapi kita bisa mensimulasikan sebuah tugas yang gagal di tengah jalan. Kita akan membuat fungsi yang sengaja gagal jika diberi input ganjil. Dask, saat menjalankan komputasi, akan mencoba memproses semua data. Ketika menemukan input yang menyebabkan error, ia akan berhenti dan melaporkan error dengan jelas, menunjukkan tugas mana yang gagal.',
      '**Contoh Kode:**',
      `\`\`\`python
# Mengimpor library Dask.
import dask

# Fungsi ini sengaja dibuat untuk gagal pada input ganjil.
def proses_data(x):
    print(f"Memproses angka: {x}")
    # Periksa apakah angka adalah ganjil.
    if x % 2 != 0:
        # Jika ganjil, lemparkan error untuk mensimulasikan kegagalan.
        raise ValueError(f"Saya tidak suka angka ganjil: {x}")
    # Jika genap, kembalikan angka dikali dua.
    return x * 2

# Data input, sengaja menyertakan angka 5 yang akan menyebabkan error.
data = [2, 4, 5, 6, 8]

# Membuat 'resep' tugas untuk setiap item data.
tugas = [dask.delayed(proses_data)(i) for i in data]

# Mencoba menjalankan komputasi. Kita gunakan try...except untuk menangani error.
try:
    # Menjalankan semua tugas. Dask akan mencoba mengeksekusi secara paralel.
    print("Mulai komputasi...")
    hasil = dask.compute(*tugas)
    print("Hasil:", hasil)
# Jika terjadi error (ValueError dari fungsi kita), tangkap dan cetak pesannya.
except Exception as e:
    print(f"\\nOops, ada tugas yang gagal!")
    print(f"Pesan Error menunjukkan akar masalah: {e}")
\`\`\``,
      `_CONSOLE_Dask melaporkan error dengan jelas tanpa membuat seluruh program berhenti. Di lingkungan cluster sungguhan, sistem akan menggunakan informasi ini (dari "resep") untuk mencoba menjalankan ulang tugas yang gagal itu di komputer lain secara otomatis. Jika kegagalan terus terjadi (misalnya karena bug di kode), ia akan menyerah dan melaporkan error kepada pengguna.|||Mulai komputasi...\nMemproses angka: 2\nMemproses angka: 4\nMemproses angka: 5\n\nOops, ada tugas yang gagal!\nPesan Error menunjukkan akar masalah: Saya tidak suka angka ganjil: 5`,
    ],
    assignment: ['Jelaskan dengan bahasa sendiri, mengapa "mengingat resep" (Lineage) lebih efisien untuk toleransi kesalahan daripada "menyimpan foto adonan" (menyimpan data sementara ke disk) di setiap langkah?', 'Apa yang akan terjadi jika dalam sebuah cluster Spark/Dask, node "master" (scheduler) yang gagal, bukan node "pekerja"? Jelaskan dampaknya.'],
    assignmentAnswers: [
      '**Jawaban 1:** "Mengingat resep" (Lineage) jauh lebih efisien karena hanya menyimpan serangkaian instruksi (grafik tugas) yang sangat ringan dan tidak memakan banyak memori atau disk. Jika terjadi kegagalan, sistem hanya perlu menjalankan ulang instruksi tersebut pada data asli. Sebaliknya, "menyimpan foto adonan" (checkpointing di setiap langkah) akan memakan ruang penyimpanan yang sangat besar dan waktu I/O yang lama untuk menulis data sementara ke disk setelah setiap transformasi. Hal ini membuat keseluruhan proses menjadi sangat lambat dan tidak praktis untuk data berskala besar, sementara lineage menyediakan cara pemulihan yang hemat sumber daya.',
      '**Jawaban 2:** Jika node "master" (scheduler) yang gagal, dampaknya jauh lebih parah daripada kegagalan node pekerja. Master adalah "otak" dari operasi; ia menyimpan "resep" (lineage), melacak tugas mana yang sedang berjalan dan di mana, serta mengatur pemulihan jika pekerja gagal. Jika master itu sendiri gagal, seluruh pekerjaan akan berhenti. Informasi tentang keadaan pekerjaan akan hilang, dan tidak ada yang bisa memberikan instruksi baru. Oleh karena itu, dalam sistem produksi yang serius, node master seringkali dibuat memiliki ketersediaan tinggi (High Availability) dengan memiliki master cadangan (standby master) yang siap mengambil alih jika master utama gagal.'
    ]
  },
  {
    id: 10,
    title: 'Komunikasi Antar Node (Shuffle)',
    theory: [
      '**Di Balik Layar Operasi Agregasi**',
      'Kita sering menggunakan operasi seperti `groupBy` di Dask dan Spark untuk mengagregasi data. Operasi ini terasa ajaib—ia bisa menemukan semua data dengan kunci yang sama, meskipun tersebar di banyak komputer. "Keajaiban" ini memiliki nama: **Shuffle**. Pertemuan ini akan membongkar apa itu shuffle dan mengapa ia adalah operasi yang paling penting untuk dipahami demi performa.',
      '**Shuffle: Operasi Paling "Mahal" dalam Sistem Terdistribusi**',
      'Shuffle adalah proses pengiriman data besar-besaran antar komputer melalui jaringan untuk mengelompokkan ulang data. Ini adalah operasi yang paling lambat dan paling memakan sumber daya (jaringan, disk I/O, CPU) dalam hampir semua pekerjaan data besar.',
      '**Analogi Kelas:**',
      '**1. Tanpa Shuffle (Operasi Sempit / Cepat):**',
      '  - **Tugas:** Guru meminta setiap murid untuk menggarisbawahi kata benda di halaman 5 buku mereka. Setiap murid bisa bekerja sendiri di mejanya pada partisinya sendiri (bukunya) tanpa perlu berbicara atau bertukar buku dengan teman lain. Ini sangat cepat dan efisien.',
      '  - **Contoh di Kode:** `map`, `filter`, `map_partitions`. Operasi ini tidak butuh data dari partisi lain.',
      '**2. Dengan Shuffle (Operasi Lebar / Lambat):**',
      '  - **Tugas:** Guru meminta murid untuk mengelompokkan diri berdasarkan bulan lahir. Semua murid harus berdiri, bergerak keliling kelas, bertanya kepada teman, dan berkomunikasi untuk membentuk kelompok. Proses "bergerak dan berkomunikasi" inilah yang disebut **Shuffle**.',
      '  - **Intinya:** Data dari berbagai partisi/komputer harus dikumpulkan, disortir, dan dikelompokkan ulang di tempat lain. Ini butuh transfer data besar-besaran lewat jaringan, yang membuatnya lambat.',
      '  - **Contoh di Kode:** `groupBy()`, `join()`, `set_index()`, `sort_values()`.',
      '**Visualisasi Shuffle:**',
      '`Partisi Awal:`',
      '`  - Node 1: [("Apel", 1), ("Jeruk", 1)]`',
      '`  - Node 2: [("Apel", 1), ("Pisang", 1)]`',
      '`  - Node 3: [("Jeruk", 1), ("Pisang", 1)]`',
      '`SHUFFLE (untuk groupBy "buah")`',
      '`Partisi Hasil:`',
      '`  - Node 1: [("Apel", [1, 1])]`',
      '`  - Node 2: [("Jeruk", [1, 1])]`',
      '`  - Node 3: [("Pisang", [1, 1])]`',
      'Karena sangat "mahal", tujuan kita saat menulis kode adalah untuk **mengurangi atau menghindari operasi shuffle yang tidak perlu.**'
    ],
    practice: [
      '**Praktik: Membuktikan Biaya Shuffle**',
      'Praktik ini akan membuktikan secara langsung bahwa operasi yang butuh **Shuffle** (`groupBy`) jauh lebih lambat daripada yang tidak (`map`). Kita akan membuat DataFrame besar, lalu membandingkan waktu eksekusi dari dua jenis operasi yang berbeda pada data yang sama.',
      '**Contoh Kode:**',
      `\`\`\`python
# Mengimpor library yang diperlukan.
import dask.dataframe as dd
import pandas as pd
import time

# Membuat data besar contoh dengan 1 juta baris dan 10 partisi.
size = 1_000_000
df = pd.DataFrame({
    'grup': [f"g_{i % 100}" for i in range(size)],
    'nilai': range(size)
})
ddf = dd.from_pandas(df, npartitions=10)
# .persist() untuk memastikan data ada di memori dan pengukuran lebih adil.
ddf = ddf.persist()

# --- Operasi TANPA SHUFFLE (Cepat) ---
print("Memulai operasi tanpa shuffle (map)...")
start_time = time.time()
# Mengalikan setiap nilai dengan 2. Setiap partisi bisa bekerja sendiri.
# Ini adalah operasi 'sempit'.
ddf['nilai_baru'] = ddf['nilai'] * 2
# Menghitung hasil (mean bisa dihitung sebagian di setiap partisi lalu digabung).
ddf['nilai_baru'].mean().compute()
end_time = time.time()
print(f"Waktu Tanpa Shuffle: {end_time - start_time:.4f}s")

# --- Operasi DENGAN SHUFFLE (Lambat) ---
print("\\nMemulai operasi dengan shuffle (groupBy)...")
start_time = time.time()
# groupby() mengharuskan data dengan 'grup' yang sama dikumpulkan di satu tempat.
# Ini memicu perpindahan data besar-besaran antar komputer (Shuffle).
# Ini adalah operasi 'lebar'.
ddf.groupby('grup').nilai.mean().compute()
end_time = time.time()
print(f"Waktu Dengan Shuffle: {end_time - start_time:.4f}s")
\`\`\``,
      `_CONSOLE_Terlihat jelas bahwa \`groupby\` butuh waktu jauh lebih lama. Ini karena Dask harus melakukan **Shuffle**: memindahkan data antar partisi untuk mengumpulkan semua nilai dengan \`grup\` yang sama di satu tempat sebelum menghitung rata-ratanya. Ini membuktikan bahwa shuffle adalah operasi yang mahal dan harus dihindari jika memungkinkan.|||Memulai operasi tanpa shuffle (map)...\nWaktu Tanpa Shuffle: 0.0812s\n\nMemulai operasi dengan shuffle (groupBy)...\nWaktu Dengan Shuffle: 0.2567s\n\n*(waktu eksekusi akan berbeda di setiap komputer, tapi Shuffle pasti lebih lambat)*`,
    ],
    assignment: ['Jelaskan dalam 1-2 paragraf, mengapa menggabungkan dua tabel besar (misalnya, data pelanggan dan data pesanan) berdasarkan ID pelanggan adalah contoh operasi yang membutuhkan shuffle.', 'Sebutkan dua operasi Dask/Spark lain selain `groupBy` yang menurut Anda juga membutuhkan shuffle dan jelaskan mengapa.'],
    assignmentAnswers: [
      '**Jawaban 1:** Menggabungkan dua tabel besar berdasarkan ID pelanggan memerlukan shuffle karena data untuk pelanggan yang sama kemungkinan besar tersebar di komputer (node) dan partisi yang berbeda dalam cluster. Misalnya, data profil pelanggan "Alice" (ID 123) mungkin ada di Komputer 1, sementara data tiga pesanannya tersebar di Komputer 3, 5, dan 8. Agar bisa menggabungkan informasi ini, sistem harus membaca semua partisi dari kedua tabel dan memindahkan (shuffle) semua data (baik profil maupun pesanan) yang memiliki ID 123 ke satu lokasi (satu partisi/node) yang sama untuk diproses. Proses pengumpulan semua data yang relevan dengan kunci yang sama inilah yang disebut shuffle.',
      '**Jawaban 2:** Dua operasi lain yang butuh shuffle adalah:\n1. **`sort_values()` / `orderBy()`:** Untuk mengurutkan seluruh dataset, sistem tidak bisa hanya mengurutkan setiap partisi secara independen. Ia harus melihat SEMUA data untuk menentukan urutan global. Ini memerlukan shuffle di mana data dipartisi ulang berdasarkan rentang nilai (misalnya, semua nilai A-E ke satu node, F-J ke node lain), diurutkan di sana, lalu digabungkan kembali secara terurut.\n2. **`drop_duplicates()` / `distinct()`:** Untuk menemukan dan menghapus duplikat secara global, sistem harus membandingkan setiap baris dengan semua baris lainnya. Cara paling efisien untuk melakukan ini adalah dengan melakukan shuffle, mengirim semua baris dengan nilai (atau hash dari nilai) yang sama ke node yang sama. Di sana, duplikat dapat dengan mudah diidentifikasi dan dihapus.'
    ]
  },
   {
    id: 11,
    title: 'Optimasi Performa Dasar',
    theory: [
      '**Dari Paham menjadi Cepat**',
      'Setelah di pertemuan sebelumnya kita belajar tentang operasi paling "mahal" (Shuffle), sekarang kita akan belajar bagaimana menjadi "programmer data" yang cerdas. Mengetahui cara kerja sistem memungkinkan kita untuk menulis kode yang tidak hanya benar, tetapi juga sangat efisien. Ini adalah sesi tentang **optimasi performa**—kumpulan trik dan praktik terbaik untuk membuat pekerjaan data besar Anda berjalan secepat mungkin.',
      '**Membuat Kode Berjalan Lebih Cepat**',
      'Menulis kode yang benar itu satu hal; menulis kode yang berjalan cepat di skala besar itu hal lain. Berikut beberapa tips fundamental untuk optimasi:',
      '**1. Gunakan Format File yang Tepat (Parquet > CSV):**',
      '   - **CSV (Comma-Separated Values):** Seperti buku catatan biasa, berbasis baris. Untuk membaca satu kolom saja (misal: "harga"), sistem tetap harus memindai seluruh baris dan memisahkannya, membuang data yang tidak perlu. Sangat tidak efisien.',
      '   - **Parquet:** Format file kolomnar (columnar). Menyimpan data per kolom. Jika Anda hanya butuh data dari kolom "harga", sistem hanya akan membaca "blok harga" itu saja dari disk. Ini secara drastis mengurangi jumlah data yang dibaca (I/O) dan mempercepat query.',
      '**2. Saring Data Sedini Mungkin (Predicate Pushdown):**',
      '   - **Analogi:** Anda butuh data penjualan "laptop" di bulan "Januari". Jangan minta sistem mengambil SEMUA data penjualan dari 5 tahun terakhir, baru Anda saring sendiri di akhir. Perintahkan sistem: "Tolong HANYA ambilkan data penjualan laptop di bulan Januari." Lakukan `filter()` sedekat mungkin dengan sumber data. Banyak sistem (seperti yang menggunakan Parquet) cukup pintar untuk menerapkan filter ini saat membaca data, sehingga data yang tidak relevan bahkan tidak pernah dimuat ke memori.',
      '**3. Simpan Hasil Perhitungan yang Sering Dipakai (.persist()/.cache()):**',
      '   - **Analogi:** Anda butuh 10 menit untuk membersihkan data mentah. Setelah itu, Anda akan membuat 5 grafik berbeda dari data bersih tersebut. Tentu Anda tidak akan mengulangi proses pembersihan 10 menit itu sebanyak 5 kali.',
      '   - Gunakan `.persist()` (Dask) atau `.cache()` (Spark) untuk menyimpan hasil DataFrame perantara di memori para pekerja. Saat Anda memanggil aksi berikutnya, perhitungan akan dimulai dari data yang sudah bersih di memori, bukan dari awal file lagi. Ini sangat berguna dalam analisis data interaktif.',
      '**4. Hindari UDF Kompleks (Gunakan Fungsi Bawaan):**',
      '   - **UDF (User-Defined Function):** Fungsi Python kustom yang Anda terapkan pada DataFrame. Meskipun fleksibel, Dask/Spark melihatnya sebagai "kotak hitam" dan tidak bisa mengoptimasinya. Data harus dipindahkan dari engine (JVM di Spark) ke interpreter Python, diproses, lalu dikembalikan, yang mana lambat.',
      '   - **Fungsi Bawaan:** Fungsi seperti `avg()`, `sum()`, `concat()` dijalankan langsung di dalam engine yang dioptimalkan (ditulis dalam C atau Scala/Java) dan jauh lebih cepat. Selalu prioritaskan fungsi bawaan.'
    ],
    practice: [
      '**Instalasi & Persiapan**',
      'Untuk bekerja dengan format Parquet, Dask butuh `pyarrow` atau `fastparquet`.',
      `\`\`\`bash
pip install pyarrow fastparquet
\`\`\``,
      '**Praktik: Membuktikan Tips Optimasi**',
      'Kode ini akan mendemonstrasikan **Tip #1 (Parquet > CSV)** dan **Tip #3 (Gunakan .persist())**. Kita akan membuat data, menyimpannya dalam kedua format, lalu mengukur perbedaan waktu baca. Kemudian, kita akan mengukur perbedaan waktu saat melakukan beberapa komputasi pada DataFrame yang sama dengan dan tanpa `.persist()`.',
      '**Contoh Kode:**',
      `\`\`\`python
# Mengimpor library yang diperlukan.
import dask.dataframe as dd
import pandas as pd
import time
import os

# Membuat data contoh.
size = 1_000_000
df = pd.DataFrame({
    'kategori': [f'cat_{i%100}' for i in range(size)],
    'nilai': range(size)
})
ddf = dd.from_pandas(df, npartitions=4)

# Menyimpan data ke CSV dan Parquet jika belum ada.
if not os.path.exists('data_parquet.pq'):
    print("Menyimpan data ke CSV dan Parquet...")
    ddf.to_csv('data_csv', index=False)
    ddf.to_parquet('data_parquet.pq', write_index=False)
    print("Selesai menyimpan.")

# --- Tip #1: Bandingkan kecepatan baca CSV vs Parquet ---
print("\\n--- Membandingkan Waktu Baca ---")
start = time.time()
dd.read_csv('data_csv/part.*.csv')['nilai'].mean().compute()
print(f"Waktu baca & hitung dari CSV: {time.time() - start:.4f}s")

start = time.time()
dd.read_parquet('data_parquet.pq')['nilai'].mean().compute()
print(f"Waktu baca & hitung dari Parquet: {time.time() - start:.4f}s")

# --- Tip #3: Penggunaan .persist() ---
ddf_pq = dd.read_parquet('data_parquet.pq')
# .persist() menyimpan hasil filter di memori para pekerja.
# Ini adalah aksi non-blocking, Dask mulai bekerja di latar belakang.
print("\\nMemulai .persist()...")
persisted_ddf = ddf_pq[ddf_pq.kategori == 'cat_10'].persist()
time.sleep(1) # Beri waktu Dask untuk menyelesaikan persist di latar belakang.
print("Selesai .persist().")

# --- Menggunakan data yang sudah di-persist berulang kali ---
print("\\n--- Menghitung 3x DENGAN .persist() ---")
start = time.time()
persisted_ddf.nilai.count().compute() # Komputasi 1
persisted_ddf.nilai.sum().compute()   # Komputasi 2: pakai hasil persist.
persisted_ddf.nilai.mean().compute()  # Komputasi 3: pakai hasil persist.
print(f"Total waktu dengan .persist(): {time.time() - start:.4f}s")

# --- Tanpa .persist(), filter akan diulang 3x dari file ---
print("\\n--- Menghitung 3x TANPA .persist() ---")
start = time.time()
ddf_pq[ddf_pq.kategori == 'cat_10'].nilai.count().compute() # Baca & filter dari awal
ddf_pq[ddf_pq.kategori == 'cat_10'].nilai.sum().compute()   # Baca & filter LAGI
ddf_pq[ddf_pq.kategori == 'cat_10'].nilai.mean().compute()  # Baca & filter LAGI
print(f"Total waktu tanpa .persist(): {time.time() - start:.4f}s")
\`\`\``,
      `_CONSOLE_Hasilnya membuktikan teori: (1) Parquet jauh lebih cepat dibaca dan diproses karena format kolomnarnya. (2) Menggunakan \`.persist()\` membuat komputasi berulang pada data yang sama menjadi jauh lebih cepat karena Dask tidak perlu membaca ulang dan memfilter data dari awal setiap saat, melainkan langsung dari memori.|||--- Membandingkan Waktu Baca ---\nWaktu baca & hitung dari CSV: 0.1534s\nWaktu baca & hitung dari Parquet: 0.0421s\n\nMemulai .persist()...\nSelesai .persist().\n\n--- Menghitung 3x DENGAN .persist() ---\nTotal waktu dengan .persist(): 0.0512s\n\n--- Menghitung 3x TANPA .persist() ---\nTotal waktu tanpa .persist(): 0.1289s\n\n*(waktu eksekusi akan berbeda di setiap komputer)*`,
    ],
    assignment: ['Baca tentang format file Apache Parquet dan sebutkan 3 keunggulannya dibandingkan CSV untuk analisis data.', 'Jelaskan skenario di mana penggunaan `.persist()` justru bisa merugikan atau tidak efektif.'],
    assignmentAnswers: [
      '**Jawaban 1:** Tiga keunggulan utama Parquet dibandingkan CSV adalah:\n1. **Penyimpanan Kolomnar (Columnar Storage):** Parquet menyimpan data per kolom, bukan per baris. Ini sangat efisien untuk query analitik yang biasanya hanya butuh beberapa kolom dari tabel yang lebar, karena sistem hanya perlu membaca data yang relevan dari disk, bukan seluruh baris.\n2. **Kompresi yang Lebih Baik:** Karena data dengan tipe yang sama disimpan bersamaan dalam satu kolom (misalnya, semua angka integer bersama), Parquet dapat menerapkan skema kompresi yang jauh lebih efektif dan spesifik untuk tipe data tersebut, menghasilkan ukuran file yang lebih kecil dan menghemat biaya penyimpanan serta mempercepat transfer data.\n3. **Penyimpanan Skema:** Parquet menyimpan skema data (nama kolom, tipe data) di dalam file itu sendiri. Ini mencegah masalah seperti salah interpretasi tipe data (misalnya, angka dibaca sebagai teks) yang sering terjadi pada CSV, sehingga membuat data lebih portabel dan andal.',
      '**Jawaban 2:** Penggunaan `.persist()` bisa merugikan jika:\n1. **Data yang di-persist terlalu besar:** Jika hasil DataFrame antara yang Anda coba `.persist()` tidak muat di total RAM semua komputer pekerja, sistem akan mulai "menumpahkan" data ke disk, yang sangat lambat dan bisa menghilangkan keuntungan performa. Anda bisa membuat sistem lebih lambat dari seharusnya.\n2. **Hanya digunakan sekali:** Jika Anda hanya akan melakukan satu aksi pada DataFrame antara, memanggil `.persist()` tidak ada gunanya. Anda hanya menambahkan overhead untuk menyimpan data ke memori yang kemudian tidak akan pernah dibaca lagi. `.persist()` hanya berguna jika data antara akan digunakan kembali beberapa kali.'
    ]
  },
  {
    id: 12,
    title: 'Integrasi Data dari Sumber Berbeda',
    theory: [
      '**Menyatukan Dunia yang Terpisah**',
      'Analisis data di dunia nyata jarang sekali hanya melibatkan satu file. Seringkali, informasi yang kita butuhkan terpecah di berbagai sumber: data pelanggan di satu tabel, data transaksi di tabel lain. Pertemuan ini akan membahas cara **menggabungkan** tabel-tabel terdistribusi ini, sebuah operasi yang sangat bergantung pada pemahaman kita tentang **shuffle** dari pertemuan 10.',
      '**Menggabungkan Potongan Puzzle Data**',
      'Dalam analisis dunia nyata, data yang kita butuhkan seringkali tersebar di beberapa tabel atau file. Kita perlu menggabungkannya untuk mendapatkan gambaran utuh. Dask dan Spark menyediakan operasi yang kuat untuk melakukan ini secara terdistribusi.',
      '**Dua Cara Utama Menggabungkan Data:**',
      '**1. Union (Menumpuk ke Bawah):**',
      '  - **Kapan Digunakan:** Ketika Anda punya beberapa tabel dengan **struktur kolom yang sama persis** (nama dan tipe data kolom cocok).',
      '  - **Analogi:** Anda punya data penjualan Januari di satu file dan data penjualan Februari di file lain. `Union` adalah seperti menumpuk kedua file itu menjadi satu tumpukan yang lebih tebal dan panjang. Jumlah baris bertambah, jumlah kolom tetap.',
      '  - **Contoh di Kode:** `dd.concat([df1, df2])`',
      
      '**2. Join / Merge (Menggabungkan ke Samping):**',
      '  - **Kapan Digunakan:** Ketika Anda punya tabel dengan informasi berbeda tentang entitas yang sama (misal: pelanggan), dan Anda ingin menggabungkannya berdasarkan **kolom kunci** yang sama.',
      '  - **Analogi:** Anda punya daftar `(ID Siswa, Nama)` dan daftar lain `(ID Siswa, Nilai)`. `Join` adalah cara untuk mencocokkan baris berdasarkan `ID Siswa` untuk membuat satu tabel baru yang lebih lebar: `(ID Siswa, Nama, Nilai)`.',
      '  - **Penting:** Join adalah operasi **shuffle** yang mahal!',
      '  - **Jenis Join Paling Umum:**',
      '    - **Inner Join (Irisan):** Hanya menampilkan baris yang kuncinya ada di KEDUA tabel.',
      '    - **Left Join (Utamakan Kiri):** Menampilkan SEMUA baris dari tabel kiri. Jika kunci dari tabel kiri tidak ada di tabel kanan, kolom dari tabel kanan akan kosong (null/NaN). Berguna untuk mencari "siapa saja pelanggan yang belum pernah bertransaksi?".',
      '    - **Right Join (Utamakan Kanan):** Kebalikan dari Left Join. Menampilkan SEMUA baris dari tabel kanan.',
      '    - **Outer Join (Gabungan Penuh):** Menampilkan SEMUA baris dari KEDUA tabel. Jika ada kunci yang tidak cocok di salah satu sisi, sisi tersebut akan diisi null.'
    ],
    practice: [
      '**Praktik: Menggabungkan Data Pelanggan dan Transaksi (Left Join)**',
      'Praktik ini mendemonstrasikan **Left Join**, salah satu join yang paling umum digunakan. Kita punya data pelanggan (tabel kiri) dan data transaksi (tabel kanan). Kita ingin melihat semua pelanggan kita, dan apa saja transaksi yang telah mereka lakukan.',
      '`Left join` akan memastikan semua pelanggan dari tabel kiri (pelanggan_df) tetap ada di hasil akhir, meskipun mereka belum pernah bertransaksi (seperti Alice).',
      '**Contoh Kode:**',
      `\`\`\`python
# Mengimpor Dask DataFrame dan Pandas.
import dask.dataframe as dd
import pandas as pd

# Membuat DataFrame Pelanggan (tabel kiri).
pelanggan_df = pd.DataFrame({
    'id_pelanggan': [1, 2, 3, 4],
    'nama': ['Alice', 'Bob', 'Charlie', 'David']
})
ddf_pelanggan = dd.from_pandas(pelanggan_df, npartitions=1)

# Membuat DataFrame Transaksi (tabel kanan).
# Perhatikan, pelanggan 1 (Alice) tidak punya transaksi di sini.
# Pelanggan 2 (Bob) punya dua transaksi.
transaksi_df = pd.DataFrame({
    'id_pelanggan': [2, 3, 2, 4],
    'jumlah': [100, 150, 50, 200]
})
ddf_transaksi = dd.from_pandas(transaksi_df, npartitions=1)

# Menggabungkan kedua tabel menggunakan Left Join berdasarkan 'id_pelanggan'.
# Ini adalah operasi 'malas'.
hasil_gabung = dd.merge(
    ddf_pelanggan,    # Tabel kiri (semua baris dari sini akan dipertahankan).
    ddf_transaksi,    # Tabel kanan.
    on='id_pelanggan',# Kolom kunci untuk menggabungkan.
    how='left'        # Jenis join: 'left' berarti utamakan tabel kiri.
)

print("--- Hasil Penggabungan (Left Join) ---")
# .compute() memicu eksekusi join (dan shuffle di baliknya).
print(hasil_gabung.compute())
\`\`\``,
      `_CONSOLE_Sesuai aturan \`left join\`, semua pelanggan dari tabel kiri (termasuk Alice) muncul di hasil akhir. Karena Alice tidak punya data transaksi di tabel kanan, kolom \`jumlah\` miliknya diisi dengan \`NaN\` (Not a Number / kosong), yang membuktikan bahwa left join mempertahankan semua data dari tabel kiri. Bob muncul dua kali karena ia memiliki dua transaksi yang cocok.|||--- Hasil Penggabungan (Left Join) ---\n   id_pelanggan     nama  jumlah\n0             1    Alice     NaN\n1             2      Bob   100.0\n2             2      Bob    50.0\n3             3  Charlie   150.0\n4             4    David   200.0`,
    ],
    assignment: ['Diberikan dua tabel (data produk dan data penjualan), temukan kolom kunci yang sama dan gabungkan keduanya menggunakan `inner join` untuk menjawab pertanyaan: "Berapa total pendapatan untuk setiap produk yang terjual?".', 'Jelaskan perbedaan hasil jika Anda menggunakan `left join` dengan tabel produk sebagai tabel kiri, dibandingkan dengan `inner join` pada soal pertama.'],
    assignmentAnswers: [
      '**Jawaban 1:** Langkah-langkahnya adalah menggabungkan (merge) kedua tabel berdasarkan `id_produk`, membuat kolom pendapatan baru, lalu mengelompokkan (groupby) hasilnya berdasarkan nama produk sambil menjumlahkan pendapatan.',
      `\`\`\`python
# Mengimpor Dask DataFrame dan Pandas.
import dask.dataframe as dd
import pandas as pd

# Data 1: DataFrame Produk.
produk_df = pd.DataFrame({
    'id_produk': [1, 2, 3, 4], 
    'nama_produk': ['Apel', 'Jeruk', 'Pisang', 'Mangga'],
    'harga': [5000, 7000, 3000, 8000]
})
ddf_produk = dd.from_pandas(produk_df, npartitions=1)

# Data 2: DataFrame Penjualan. Perhatikan produk 4 (Mangga) tidak pernah terjual.
penjualan_df = pd.DataFrame({
    'id_produk': [1, 2, 1, 3, 1], 
    'jumlah_terjual': [10, 5, 12, 20, 8]
})
ddf_penjualan = dd.from_pandas(penjualan_df, npartitions=1)

# 1. Gabungkan (merge) dengan 'inner join'.
merged_df = dd.merge(ddf_penjualan, ddf_produk, on='id_produk', how='inner')

# 2. Buat kolom baru 'pendapatan'.
merged_df['pendapatan'] = merged_df['jumlah_terjual'] * merged_df['harga']

# 3. Kelompokkan berdasarkan nama produk dan jumlahkan total pendapatannya.
pendapatan_per_produk = merged_df.groupby('nama_produk').pendapatan.sum().compute()

print("Total pendapatan per produk (Inner Join):")
print(pendapatan_per_produk)
\`\`\``,
      `_CONSOLE_Total pendapatan per produk (Inner Join):\nnama_produk\nApel      150000\nJeruk      35000\nPisang     60000\nName: pendapatan, dtype: int64`,
      '**Jawaban 2:** Jika menggunakan `left join` dengan tabel produk sebagai tabel kiri, hasilnya akan menyertakan **semua produk** dari tabel produk, termasuk yang tidak pernah terjual. Untuk produk "Mangga" yang tidak ada di data penjualan, semua kolom dari tabel penjualan (`jumlah_terjual`, `pendapatan`) akan bernilai `NaN` atau kosong. Ini berguna jika pertanyaannya adalah "Daftar semua produk dan total pendapatannya jika ada". Sebaliknya, `inner join` hanya menampilkan produk yang ada di KEDUA tabel, jadi "Mangga" tidak akan muncul sama sekali, yang mana cocok untuk pertanyaan "Berapa total pendapatan untuk setiap produk **yang terjual**?".'
    ]
  },
  {
    id: 13,
    title: 'Persiapan Proyek Akhir',
    projectInfo: {
      description: 'Proyek akhir adalah kesempatan untuk menerapkan semua yang telah dipelajari dalam sebuah kasus nyata. Anda akan memilih sebuah dataset publik yang cukup besar, melakukan pemrosesan, analisis, dan mungkin visualisasi secara terdistribusi, lalu mempresentasikan temuan Anda.',
      groups: 'Proyek dikerjakan dalam kelompok, maksimal 3 orang per kelompok.',
      grading: ['**Laporan (40%):** Dokumen yang menjelaskan masalah, data, proses analisis (ETL), temuan, dan kesimpulan.', '**Kode (40%):** Kualitas, efisiensi, dan fungsionalitas kode yang dibuat menggunakan Dask atau Spark.', '**Presentasi (20%):** Kemampuan menyajikan latar belakang, proses, dan hasil proyek dengan jelas dan efektif.'],
    },
    isProject: true,
  },
  {
    id: 14,
    title: 'Kerja Proyek & Konsultasi',
    isProject: true,
    summary: 'Sesi ini didedikasikan sepenuhnya untuk kerja kelompok. Dosen atau asisten akan berkeliling untuk memberikan konsultasi, menjawab pertanyaan, dan membantu jika ada kesulitan teknis terkait pemilihan data, implementasi kode Dask/Spark, atau analisis.',
  },
  {
    id: 15,
    title: 'Presentasi Proyek Akhir',
    isProject: true,
    summary: 'Setiap kelompok akan mempresentasikan hasil proyek mereka di depan kelas. Presentasi mencakup latar belakang masalah, proses analisis yang dilakukan, temuan utama, tantangan yang dihadapi, dan demo singkat dari kode yang dibuat.',
  },
  {
    id: 16,
    title: 'UJIAN AKHIR SEMESTER (UAS)',
    isExam: true,
    summary: 'Ujian Akhir Semester akan mencakup semua materi dari pertemuan 1 hingga 15, dengan penekanan pada konsep-konsep yang lebih lanjut seperti fault tolerance, shuffle, optimasi, dan integrasi data. Ujian akan bersifat studi kasus yang menguji kemampuan analisis dan pemecahan masalah menggunakan Dask atau Spark.',
  },
];