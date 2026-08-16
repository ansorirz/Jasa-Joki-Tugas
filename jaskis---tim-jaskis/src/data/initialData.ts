import {
  Order,
  Client,
  ServiceItem,
  PortfolioItem,
  Testimonial,
  FAQItem,
  ContactMessage,
  NotificationItem,
  WebsiteSettings
} from '../types';

export const initialOrders: Order[] = [
  {
    id: 'JKS-2026-000125',
    clientName: 'Ansori Rahman',
    maskedName: 'A*** R***',
    university: 'Universitas Brawijaya',
    gender: 'Pria',
    phone: '083183372985',
    serviceCategory: 'Jurnal / SINTA',
    orderDate: '13 Ags 2026',
    deadline: '20 Ags 2026',
    status: 'Sedang Dikerjakan',
    progress: 65,
    totalPrice: 850000,
    paidAmount: 850000,
    brief: 'Penyusunan Jurnal SINTA 3 bidang Manajemen Pemasaran Digital.',
    timeline: [
      { title: 'Pesanan diterima', timestamp: '13 Ags 2026 10:30', completed: true },
      { title: 'Brief dikonfirmasi', timestamp: '13 Ags 2026 11:00', completed: true },
      { title: 'Pembayaran dikonfirmasi', timestamp: '13 Ags 2026 11:30', completed: true },
      { title: 'Sedang dikerjakan', timestamp: '14 Ags 2026 09:00', completed: true, active: true },
      { title: 'Review', timestamp: '-', completed: false },
      { title: 'Selesai', timestamp: '-', completed: false }
    ],
    notes: 'Prioritas revisi abstrak & metodologi penelitian.'
  },
  {
    id: 'JKS-2026-000124',
    clientName: 'Maya Safitri',
    maskedName: 'M*** S***',
    university: 'Universitas Indonesia',
    gender: 'Wanita',
    phone: '081234567890',
    serviceCategory: 'PPT',
    orderDate: '11 Ags 2026',
    deadline: '19 Ags 2026',
    status: 'Review',
    progress: 90,
    totalPrice: 250000,
    paidAmount: 250000,
    brief: 'Desain PPT Seminar Nasional 25 slide gaya modern & animasi subtle.',
    timeline: [
      { title: 'Pesanan diterima', timestamp: '11 Ags 2026 14:10', completed: true },
      { title: 'Brief dikonfirmasi', timestamp: '11 Ags 2026 15:00', completed: true },
      { title: 'Pembayaran dikonfirmasi', timestamp: '11 Ags 2026 15:30', completed: true },
      { title: 'Sedang dikerjakan', timestamp: '12 Ags 2026 08:00', completed: true },
      { title: 'Review', timestamp: '13 Ags 2026 10:00', completed: true, active: true },
      { title: 'Selesai', timestamp: '-', completed: false }
    ]
  },
  {
    id: 'JKS-2026-000123',
    clientName: 'Budi Prasetyo',
    maskedName: 'B*** P***',
    university: 'Universitas Gadjah Mada',
    gender: 'Pria',
    phone: '085712345678',
    serviceCategory: 'Skripsi',
    orderDate: '10 Ags 2026',
    deadline: '25 Ags 2026',
    status: 'Brief Dikonfirmasi',
    progress: 40,
    totalPrice: 2400000,
    paidAmount: 1200000,
    brief: 'Bantuan bimbingan & struktur Bab 1-3 Skripsi Sistem Informasi.',
    timeline: [
      { title: 'Pesanan diterima', timestamp: '10 Ags 2026 09:00', completed: true },
      { title: 'Brief dikonfirmasi', timestamp: '10 Ags 2026 10:15', completed: true, active: true },
      { title: 'Pembayaran dikonfirmasi', timestamp: '10 Ags 2026 10:30', completed: true },
      { title: 'Sedang dikerjakan', timestamp: '-', completed: false },
      { title: 'Review', timestamp: '-', completed: false },
      { title: 'Selesai', timestamp: '-', completed: false }
    ]
  },
  {
    id: 'JKS-2026-000122',
    clientName: 'Siti Lestari',
    maskedName: 'S*** L***',
    university: 'Universitas Airlangga',
    gender: 'Wanita',
    phone: '082198765432',
    serviceCategory: 'Makalah',
    orderDate: '08 Ags 2026',
    deadline: '12 Ags 2026',
    status: 'Selesai',
    progress: 100,
    totalPrice: 180000,
    paidAmount: 180000,
    brief: 'Makalah Komunikasi Bisnis & Etika Profesi 15 Halaman.',
    timeline: [
      { title: 'Pesanan diterima', timestamp: '08 Ags 2026 11:00', completed: true },
      { title: 'Brief dikonfirmasi', timestamp: '08 Ags 2026 11:30', completed: true },
      { title: 'Pembayaran dikonfirmasi', timestamp: '08 Ags 2026 12:00', completed: true },
      { title: 'Sedang dikerjakan', timestamp: '09 Ags 2026 08:00', completed: true },
      { title: 'Review', timestamp: '11 Ags 2026 16:00', completed: true },
      { title: 'Selesai', timestamp: '12 Ags 2026 10:00', completed: true, active: true }
    ]
  },
  {
    id: 'JKS-2026-000121',
    clientName: 'Dina Amelia',
    maskedName: 'D*** A***',
    university: 'Universitas Padjadjaran',
    gender: 'Wanita',
    phone: '081399887766',
    serviceCategory: 'Proposal',
    orderDate: '07 Ags 2026',
    deadline: '18 Ags 2026',
    status: 'Sedang Dikerjakan',
    progress: 75,
    totalPrice: 450000,
    paidAmount: 450000,
    brief: 'Proposal Kegiatan Seminar Nasional & Workshop Kewirausahaan.',
    timeline: [
      { title: 'Pesanan diterima', timestamp: '07 Ags 2026 13:00', completed: true },
      { title: 'Brief dikonfirmasi', timestamp: '07 Ags 2026 14:00', completed: true },
      { title: 'Pembayaran dikonfirmasi', timestamp: '07 Ags 2026 14:30', completed: true },
      { title: 'Sedang dikerjakan', timestamp: '08 Ags 2026 09:00', completed: true, active: true },
      { title: 'Review', timestamp: '-', completed: false },
      { title: 'Selesai', timestamp: '-', completed: false }
    ]
  },
  {
    id: 'JKS-2026-000120',
    clientName: 'Rian Kurniawan',
    maskedName: 'R*** K***',
    university: 'Institut Teknologi Bandung',
    gender: 'Pria',
    phone: '081211223344',
    serviceCategory: 'Laporan',
    orderDate: '05 Ags 2026',
    deadline: '10 Ags 2026',
    status: 'Selesai',
    progress: 100,
    totalPrice: 320000,
    paidAmount: 320000,
    brief: 'Laporan Praktikum Laboratorium Komputer & Jaringan Data.',
    timeline: [
      { title: 'Pesanan diterima', timestamp: '05 Ags 2026 09:00', completed: true },
      { title: 'Brief dikonfirmasi', timestamp: '05 Ags 2026 09:30', completed: true },
      { title: 'Pembayaran dikonfirmasi', timestamp: '05 Ags 2026 10:00', completed: true },
      { title: 'Sedang dikerjakan', timestamp: '06 Ags 2026 08:00', completed: true },
      { title: 'Review', timestamp: '09 Ags 2026 15:00', completed: true },
      { title: 'Selesai', timestamp: '10 Ags 2026 09:00', completed: true, active: true }
    ]
  }
];

export const initialClients: Client[] = [
  {
    id: 'CLI-001',
    name: 'Ansori Rahman',
    maskedName: 'A*** R***',
    gender: 'Pria',
    university: 'Universitas Brawijaya',
    phone: '083183372985',
    email: 'ansori@brawijaya.ac.id',
    totalOrders: 3,
    totalSpent: 1850000,
    registeredDate: '15 Jan 2026'
  },
  {
    id: 'CLI-002',
    name: 'Maya Safitri',
    maskedName: 'M*** S***',
    gender: 'Wanita',
    university: 'Universitas Indonesia',
    phone: '081234567890',
    email: 'maya.s@ui.ac.id',
    totalOrders: 2,
    totalSpent: 600000,
    registeredDate: '20 Feb 2026'
  },
  {
    id: 'CLI-003',
    name: 'Budi Prasetyo',
    maskedName: 'B*** P***',
    gender: 'Pria',
    university: 'Universitas Gadjah Mada',
    phone: '085712345678',
    email: 'budi.p@mail.ugm.ac.id',
    totalOrders: 4,
    totalSpent: 3200000,
    registeredDate: '01 Mar 2026'
  },
  {
    id: 'CLI-004',
    name: 'Siti Lestari',
    maskedName: 'S*** L***',
    gender: 'Wanita',
    university: 'Universitas Airlangga',
    phone: '082198765432',
    email: 'siti.l@unair.ac.id',
    totalOrders: 2,
    totalSpent: 420000,
    registeredDate: '10 Apr 2026'
  },
  {
    id: 'CLI-005',
    name: 'Dina Amelia',
    maskedName: 'D*** A***',
    gender: 'Wanita',
    university: 'Universitas Padjadjaran',
    phone: '081399887766',
    email: 'dina.a@unpad.ac.id',
    totalOrders: 1,
    totalSpent: 450000,
    registeredDate: '12 May 2026'
  },
  {
    id: 'CLI-006',
    name: 'Rian Kurniawan',
    maskedName: 'R*** K***',
    gender: 'Pria',
    university: 'Institut Teknologi Bandung',
    phone: '081211223344',
    email: 'rian.k@itb.ac.id',
    totalOrders: 3,
    totalSpent: 980000,
    registeredDate: '02 Jun 2026'
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: 'SRV-01',
    title: 'Skripsi',
    category: 'Skripsi',
    description: 'Bantuan penyusunan skripsi secara terstruktur dari Bab I hingga Bab V serta persiapan komprehensif.',
    priceRange: 'Mulai Rp 500.000',
    iconName: 'GraduationCap',
    featured: true
  },
  {
    id: 'SRV-02',
    title: 'Proposal',
    category: 'Proposal',
    description: 'Bantuan pembuatan proposal penelitian, tesis, maupun kegiatan organisasi yang sistematis.',
    priceRange: 'Mulai Rp 200.000',
    iconName: 'FileText',
    featured: true
  },
  {
    id: 'SRV-03',
    title: 'Jurnal / SINTA',
    category: 'Jurnal / SINTA',
    description: 'Bantuan penyusunan artikel ilmiah, reformat template jurnal, dan pendampingan publikasi.',
    priceRange: 'Mulai Rp 350.000',
    iconName: 'BookOpen',
    featured: true
  },
  {
    id: 'SRV-04',
    title: 'Makalah',
    category: 'Makalah',
    description: 'Pembuatan makalah ilmiah berbagai bidang ilmu sesuai kaidah tata tulis akademik Indonesia.',
    priceRange: 'Mulai Rp 100.000',
    iconName: 'FileCheck',
    featured: true
  },
  {
    id: 'SRV-05',
    title: 'Laporan',
    category: 'Laporan',
    description: 'Pembuatan laporan praktikum, PKL, kunjungan industri, hingga magang akademik.',
    priceRange: 'Mulai Rp 120.000',
    iconName: 'ClipboardList',
    featured: true
  },
  {
    id: 'SRV-06',
    title: 'Essay',
    category: 'Essay',
    description: 'Essay akademik, beasiswa, lomba, dan opini publik dengan analisis tajam & orisinal.',
    priceRange: 'Mulai Rp 100.000',
    iconName: 'PenTool',
    featured: true
  },
  {
    id: 'SRV-07',
    title: 'PPT',
    category: 'PPT',
    description: 'Pembuatan presentasi dengan desain visual profesional, infographic modern, dan animasi.',
    priceRange: 'Mulai Rp 80.000',
    iconName: 'Presentation',
    featured: true
  },
  {
    id: 'SRV-08',
    title: 'Poster',
    category: 'Poster',
    description: 'Desain poster ilmiah, seminar, event akademik, dan infografis riset yang menarik.',
    priceRange: 'Mulai Rp 75.000',
    iconName: 'Image',
    featured: true
  }
];

export const initialPortfolio: PortfolioItem[] = [
  {
    id: 'PORT-01',
    title: 'Analisis Pengaruh Digital Marketing terhadap Keputusan Pembelian',
    category: 'Jurnal / SINTA',
    description: 'Jurnal SINTA 3 terbit dengan metode kuantitatif dan analisis PLS-SEM.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    date: 'Juli 2026',
    clientUni: 'Universitas Brawijaya'
  },
  {
    id: 'PORT-02',
    title: 'Pengaruh Profitabilitas Terhadap Nilai Perusahaan Sektor Perbankan',
    category: 'Skripsi',
    description: 'Penyusunan laporan akhir kuantitatif dengan sampel 24 laporan keuangan bank.',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
    date: 'Juni 2026',
    clientUni: 'Universitas Indonesia'
  },
  {
    id: 'PORT-03',
    title: 'Perancangan Sistem Informasi Akademik Berbasis Web React & Node.js',
    category: 'Skripsi',
    description: 'Riset sistem perangkat lunak akademik lengkap UML, ERD, dan prototype UI/UX.',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    date: 'Mei 2026',
    clientUni: 'Universitas Gadjah Mada'
  },
  {
    id: 'PORT-04',
    title: 'Desain Presentasi Seminar Nasional Pendidikan Multikultural',
    category: 'PPT',
    description: 'Slide deck 30 halaman dengan tema modern clean untuk paparan dosen & mahasiswa.',
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
    date: 'Juli 2026',
    clientUni: 'Universitas Negeri Malang'
  },
  {
    id: 'PORT-05',
    title: 'Strategi Pemasaran Produk UMKM di Era Digitalization',
    category: 'Makalah',
    description: 'Makalah kajian pustaka komprehensif tentang transformasi e-commerce.',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
    date: 'Agustus 2026',
    clientUni: 'Universitas Airlangga'
  },
  {
    id: 'PORT-06',
    title: 'Pengembangan Media Pembelajaran Interaktif Berbasis Augmented Reality',
    category: 'PPT',
    description: 'Bahan paparan sidang karya inovasi pembelajaran sekolah dasar.',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    date: 'Juni 2026',
    clientUni: 'Universitas Negeri Yogyakarta'
  },
  {
    id: 'PORT-07',
    title: 'Analisis Laporan Keuangan Perusahaan Manufaktur',
    category: 'Laporan',
    description: 'Laporan analisis rasio likuiditas, solvabilitas, dan rentabilitas.',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
    date: 'Juli 2026',
    clientUni: 'Universitas Diponegoro'
  },
  {
    id: 'PORT-08',
    title: 'Sistem Monitoring Keamanan Jaringan Komputer',
    category: 'Jurnal / SINTA',
    description: 'Naskah publikasi riset infrastruktur IT dan pencegahan Intrusion Detection.',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    date: 'Agustus 2026',
    clientUni: 'Institut Teknologi Sepuluh Nopember'
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'TEST-01',
    clientName: 'Ansori R.',
    maskedName: 'A*** R***',
    university: 'Universitas Brawijaya',
    serviceName: 'Jurnal / SINTA',
    rating: 5,
    content: 'Komunikasinya cepat dan hasilnya sangat membantu.',
    avatarColor: 'bg-indigo-500'
  },
  {
    id: 'TEST-02',
    clientName: 'Maya S.',
    maskedName: 'M*** S***',
    university: 'Universitas Indonesia',
    serviceName: 'PPT',
    rating: 5,
    content: 'Desain PPT-nya rapi dan profesional.',
    avatarColor: 'bg-blue-500'
  },
  {
    id: 'TEST-03',
    clientName: 'Budi P.',
    maskedName: 'B*** P***',
    university: 'Universitas Gadjah Mada',
    serviceName: 'Skripsi',
    rating: 5,
    content: 'Jurnal saya berhasil terbit, terima kasih JASKIS!',
    avatarColor: 'bg-sky-500'
  },
  {
    id: 'TEST-04',
    clientName: 'Siti L.',
    maskedName: 'S*** L***',
    university: 'Universitas Airlangga',
    serviceName: 'Makalah',
    rating: 5,
    content: 'Pengerjaannya on time dan sesuai brief.',
    avatarColor: 'bg-violet-500'
  }
];

export const initialFAQs: FAQItem[] = [
  {
    id: 'FAQ-01',
    question: 'Bagaimana cara pemesanan layanan di JASKIS?',
    answer: 'Anda dapat menghubungi kami langsung via WhatsApp atau mengisi formulir pemesanan online. Tim kami akan segera merespon dan memberikan estimasi biaya & estimasi waktu pengerjaan.',
    category: 'Pemesanan'
  },
  {
    id: 'FAQ-02',
    question: 'Apakah kerahasiaan data dan identitas saya terjamin?',
    answer: 'Ya, 100% data privasi dan identitas pelanggan dijamin aman dan dirahasiakan sepenuhnya. Kami menerapkan standar enkripsi internal serta tidak pernah mempublikasikan karya tanpa izin.',
    category: 'Privasi'
  },
  {
    id: 'FAQ-03',
    question: 'Bagaimana sistem pembayaran di JASKIS?',
    answer: 'Pembayaran dapat dilakukan dengan DP (Down Payment) sesuai kesepakatan awal dan pelunasan saat hasil pengerjaan siap ditinjau/dikirim.',
    category: 'Pembayaran'
  },
  {
    id: 'FAQ-04',
    question: 'Apakah ada garansi revisi jika ada perbaikan dari dosen?',
    answer: 'Tentu! Kami menyediakan layanan garansi revisi sesuai dengan kesepakatan awal brief tanpa biaya tambahan.',
    category: 'Revisi'
  },
  {
    id: 'FAQ-05',
    question: 'Berapa lama proses pengerjaan tugas akademik?',
    answer: 'Durasi pengerjaan bervariasi mulai dari kilat 24 jam untuk tugas harian/PPT hingga beberapa hari/minggu untuk Skripsi atau Jurnal SINTA.',
    category: 'Pengerjaan'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    title: 'Pesanan Baru Masuk!',
    message: 'A*** R*** membuat pesanan Jurnal / SINTA (#JKS-2026-000125)',
    time: '10 menit yang lalu',
    read: false,
    type: 'new_order',
    orderId: 'JKS-2026-000125'
  },
  {
    id: 'NOTIF-02',
    title: 'Update Progress',
    message: 'Pesanan #JKS-2026-000124 telah mencapai status Review (90%)',
    time: '1 jam yang lalu',
    read: false,
    type: 'status_update',
    orderId: 'JKS-2026-000124'
  }
];

export const initialWebsiteSettings: WebsiteSettings = {
  brandName: 'JASKIS',
  brandTagline: 'Solusi Tugasmu, Waktumu Jadi Lebih Berarti',
  whatsappNumber: '083183372985',
  telegramNumber: '083183372985',
  instagramHandle: '@ansori_rz',
  email: 'info@jaskis.id',
  address: 'Malang & Surabaya, Jawa Timur, Indonesia',
  heroBadgeText: '#1 Solusi Tugas Akademik Mahasiswa',
  heroHeadline: 'Solusi Tugasmu, Waktumu Jadi Lebih Berarti',
  heroSubheadline: 'Layanan bantuan pengerjaan tugas akademik dengan proses profesional, komunikasi mudah, bebas plagiasi Turnitin, dan pengerjaan tepat waktu.',
  ctaHeadline: 'Punya Tugas? Mari Konsultasikan Sekarang.',
  ctaSubheadline: 'Tim profesional JASKIS siap membantu pengerjaan skripsi, proposal, jurnal SINTA, makalah, dan PPT Anda 24/7.',
  statsCompletedCount: '700+',
  statsSatisfactionRate: '98%',
  statsResponseTime: '< 10 Menit',
  statsActiveClients: '500+ Klien',
  promoBannerText: '⚡ PROMO SEMESTER BARU: Diskon 15% untuk Pengerjaan Jurnal SINTA & Bab 1-3 Skripsi!',
  promoBannerActive: true,
  adminUsername: 'admin',
  adminPasswordHash: 'admin123'
};
