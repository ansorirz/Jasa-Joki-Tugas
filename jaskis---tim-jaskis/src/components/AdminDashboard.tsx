import React, { useState } from 'react';
import { JaskisLogo } from './JaskisLogo';
import {
  Order,
  Client,
  Service,
  PortfolioItem,
  Testimonial,
  FaqItem,
  ContactMessage,
  SiteSettings,
  AdvantageItem,
  OrderStatus,
} from '../types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Briefcase,
  FolderKanban,
  Star,
  BarChart2,
  FileCode,
  Inbox,
  Settings,
  LogOut,
  Search,
  Bell,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Send,
  X,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Check,
  RefreshCw,
  Lock,
  User,
  KeyRound,
  AlertCircle,
} from 'lucide-react';

interface AdminDashboardProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  portfolios: PortfolioItem[];
  setPortfolios: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  faqs: FaqItem[];
  setFaqs: React.Dispatch<React.SetStateAction<FaqItem[]>>;
  advantages: AdvantageItem[];
  setAdvantages: React.Dispatch<React.SetStateAction<AdvantageItem[]>>;
  contactMessages: ContactMessage[];
  setContactMessages: React.Dispatch<React.SetStateAction<ContactMessage[]>>;
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  adminCredentials: { username: string; password: string };
  setAdminCredentials: React.Dispatch<React.SetStateAction<{ username: string; password: string }>>;
  onLogout: () => void;
  onViewOrderTracking: (orderId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orders,
  setOrders,
  clients,
  setClients,
  services,
  setServices,
  portfolios,
  setPortfolios,
  testimonials,
  setTestimonials,
  faqs,
  setFaqs,
  advantages,
  setAdvantages,
  contactMessages,
  setContactMessages,
  siteSettings,
  setSiteSettings,
  adminCredentials,
  setAdminCredentials,
  onLogout,
  onViewOrderTracking,
}) => {
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [chartFilter, setChartFilter] = useState<'Mingguan' | 'Bulanan' | 'Tahunan'>('Bulanan');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Admin Credential Management State
  const [adminUsernameInput, setAdminUsernameInput] = useState(adminCredentials.username);
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [credSuccessMsg, setCredSuccessMsg] = useState('');
  const [credErrorMsg, setCredErrorMsg] = useState('');

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setCredErrorMsg('');
    setCredSuccessMsg('');

    if (!adminUsernameInput.trim()) {
      setCredErrorMsg('Username admin tidak boleh kosong.');
      return;
    }

    if (currentPasswordInput !== adminCredentials.password) {
      setCredErrorMsg('Password saat ini salah. Masukkan password lama yang benar.');
      return;
    }

    if (newPasswordInput) {
      if (newPasswordInput.length < 4) {
        setCredErrorMsg('Password baru minimal 4 karakter.');
        return;
      }
      if (newPasswordInput !== confirmPasswordInput) {
        setCredErrorMsg('Konfirmasi password baru tidak cocok.');
        return;
      }
    }

    const updatedPassword = newPasswordInput ? newPasswordInput : adminCredentials.password;

    setAdminCredentials({
      username: adminUsernameInput.trim(),
      password: updatedPassword,
    });

    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    setCredSuccessMsg('Username dan password admin berhasil diperbarui!');
  };

  // Modals for CRUD
  const [activeOrderModal, setActiveOrderModal] = useState<Order | 'new' | null>(null);
  const [waNotifyModalOrder, setWaNotifyModalOrder] = useState<Order | null>(null);
  const [waSentSuccess, setWaSentSuccess] = useState(false);

  // Other CRUD modals
  const [activeClientModal, setActiveClientModal] = useState<Client | 'new' | null>(null);
  const [activeServiceModal, setActiveServiceModal] = useState<Service | 'new' | null>(null);
  const [activeAdvantageModal, setActiveAdvantageModal] = useState<AdvantageItem | 'new' | null>(null);
  const [activePortfolioModal, setActivePortfolioModal] = useState<PortfolioItem | 'new' | null>(null);
  const [activeTestimonialModal, setActiveTestimonialModal] = useState<Testimonial | 'new' | null>(null);
  const [activeFaqModal, setActiveFaqModal] = useState<FaqItem | 'new' | null>(null);

  // Portfolio Cover Thumbnail Live State
  const [portfolioThumbnail, setPortfolioThumbnail] = useState<string>(
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
  );

  // Client CRUD handlers
  const handleDeleteClient = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data klien ini?')) {
      setClients(clients.filter((c) => c.id !== id));
    }
  };

  const handleSaveClient = (item: Client) => {
    const exists = clients.some((c) => c.id === item.id);
    if (exists) {
      setClients(clients.map((c) => (c.id === item.id ? item : c)));
    } else {
      setClients([...clients, item]);
    }
    setActiveClientModal(null);
  };

  // Service CRUD handlers
  const handleDeleteService = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus layanan ini?')) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  const handleSaveService = (item: Service) => {
    const exists = services.some((s) => s.id === item.id);
    if (exists) {
      setServices(services.map((s) => (s.id === item.id ? item : s)));
    } else {
      setServices([...services, item]);
    }
    setActiveServiceModal(null);
  };

  // Advantage CRUD handlers
  const handleDeleteAdvantage = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus keunggulan ini?')) {
      setAdvantages(advantages.filter((a) => a.id !== id));
    }
  };

  const handleSaveAdvantage = (item: AdvantageItem) => {
    const exists = advantages.some((a) => a.id === item.id);
    if (exists) {
      setAdvantages(advantages.map((a) => (a.id === item.id ? item : a)));
    } else {
      setAdvantages([...advantages, item]);
    }
    setActiveAdvantageModal(null);
  };

  // Portfolio CRUD handlers
  const handleDeletePortfolio = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus portofolio ini?')) {
      setPortfolios(portfolios.filter((p) => p.id !== id));
    }
  };

  const handleSavePortfolio = (item: PortfolioItem) => {
    const exists = portfolios.some((p) => p.id === item.id);
    if (exists) {
      setPortfolios(portfolios.map((p) => (p.id === item.id ? item : p)));
    } else {
      setPortfolios([...portfolios, item]);
    }
    setActivePortfolioModal(null);
  };

  // Testimonial CRUD handlers
  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  const handleSaveTestimonial = (item: Testimonial) => {
    const exists = testimonials.some((t) => t.id === item.id);
    if (exists) {
      setTestimonials(testimonials.map((t) => (t.id === item.id ? item : t)));
    } else {
      setTestimonials([...testimonials, item]);
    }
    setActiveTestimonialModal(null);
  };

  // FAQ CRUD handlers
  const handleDeleteFaq = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus FAQ ini?')) {
      setFaqs(faqs.filter((f) => f.id !== id));
    }
  };

  const handleSaveFaq = (item: FaqItem) => {
    const exists = faqs.some((f) => f.id === item.id);
    if (exists) {
      setFaqs(faqs.map((f) => (f.id === item.id ? item : f)));
    } else {
      setFaqs([...faqs, item]);
    }
    setActiveFaqModal(null);
  };

  // Chart Data
  const lineChartData = [
    { name: 'Jan', pesanan: 12 },
    { name: 'Feb', pesanan: 18 },
    { name: 'Mar', pesanan: 25 },
    { name: 'Apr', pesanan: 20 },
    { name: 'Mei', pesanan: 32 },
    { name: 'Jun', pesanan: 45 },
    { name: 'Jul', pesanan: 38 },
    { name: 'Agu', pesanan: 52 },
  ];

  const pieChartData = [
    { name: 'Skripsi', value: 35, color: '#6366F1' },
    { name: 'Jurnal', value: 25, color: '#3B82F6' },
    { name: 'Proposal', value: 15, color: '#818CF8' },
    { name: 'Makalah', value: 10, color: '#06B6D4' },
    { name: 'PPT', value: 10, color: '#10B981' },
    { name: 'Lainnya', value: 5, color: '#F59E0B' },
  ];

  // Helper delete handlers
  const handleDeleteOrder = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {
      setOrders(orders.filter((o) => o.id !== id));
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus, newProgress: number) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updatedTimeline = o.timeline.map((item) => {
            if (newStatus === 'Selesai') return { ...item, completed: true };
            if (item.title.toLowerCase().includes(newStatus.toLowerCase())) {
              return { ...item, completed: true, active: true, timestamp: 'Hari ini' };
            }
            return item;
          });

          return {
            ...o,
            status: newStatus,
            progress: newProgress,
            timeline: updatedTimeline,
            lastNotifiedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          };
        }
        return o;
      })
    );
  };

  // Trigger WhatsApp Automated Notification
  const handleTriggerWaNotification = (order: Order) => {
    setWaNotifyModalOrder(order);
    setWaSentSuccess(false);
  };

  const handleConfirmSendWa = () => {
    if (!waNotifyModalOrder) return;
    const phone = waNotifyModalOrder.clientPhone.replace(/^0/, '62');
    const msg = `Halo ${waNotifyModalOrder.fullClientName || waNotifyModalOrder.clientName},\n\nNotifikasi Otomatis JASKIS:\nStatus pesanan ID *${waNotifyModalOrder.id}* (${waNotifyModalOrder.service}) telah diperbarui menjadi:\n📌 *${waNotifyModalOrder.status}* (Progress: ${waNotifyModalOrder.progress}%)\n\nCek perkembangan detail & file hasil di website kami:\nhttps://jaskis.com/cek-pesanan?id=${waNotifyModalOrder.id}\n\nTerima kasih,\nTim JASKIS`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    setWaSentSuccess(true);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Sedang Dikerjakan':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            Sedang Dikerjakan
          </span>
        );
      case 'Review':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            Review
          </span>
        );
      case 'Diproses':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            Diproses
          </span>
        );
      case 'Selesai':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Selesai
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  };

  const navMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pesanan', label: 'Pesanan', icon: ShoppingCart, badge: orders.filter((o) => o.status !== 'Selesai').length },
    { id: 'klien', label: 'Klien', icon: Users },
    { id: 'layanan', label: 'Layanan', icon: Briefcase },
    { id: 'keunggulan', label: 'Keunggulan', icon: ShieldCheck },
    { id: 'portofolio', label: 'Portofolio', icon: FolderKanban },
    { id: 'testimoni', label: 'Testimoni', icon: Star },
    { id: 'faq', label: 'FAQ', icon: MessageSquare },
    { id: 'statistik', label: 'Statistik', icon: BarChart2 },
    { id: 'konten', label: 'Konten Website', icon: FileCode },
    { id: 'pesan', label: 'Pesan Masuk', icon: Inbox, badge: contactMessages.filter((m) => !m.read).length },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      
      {/* SIDEBAR KIRI (Navy / Dark Blue Matching Reference Screenshot) */}
      <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
        
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
          <JaskisLogo size="md" variant="dark" />
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'gradient-bg text-white shadow-md shadow-indigo-900/50'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-white text-indigo-700' : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-800/80">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Admin</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOPBAR ADMIN */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-extrabold text-gray-900 capitalize">
              {activeMenu}
            </h1>
          </div>

          {/* Topbar Right Controls */}
          <div className="flex items-center gap-4">
            
            {/* Search Input */}
            <div className="relative hidden sm:block w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari sesuatu..."
                className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-indigo-500 font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-xl relative transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 text-xs space-y-3 animate-fadeIn">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-bold text-gray-900">Notifikasi System</span>
                    <span className="text-[10px] text-indigo-600 font-semibold">2 Baru</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded-lg bg-indigo-50/60 border border-indigo-100">
                      <p className="font-bold text-gray-800">Pesanan Baru Diterima</p>
                      <p className="text-gray-500">A*** R*** memesan layanan Jurnal / SINTA.</p>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <p className="font-bold text-gray-800">Pesan Masuk Baru</p>
                      <p className="text-gray-500">Rian Permana mengirim konsultasi via form.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-inner">
                AJ
              </div>
              <div className="hidden md:block leading-tight">
                <p className="text-xs font-bold text-gray-900">Admin Jaskis</p>
                <p className="text-[10px] text-indigo-600 font-semibold">Administrator</p>
              </div>
            </div>

          </div>
        </header>

        {/* PAGE CONTENT SWITCHER */}
        <main className="p-6 space-y-8">
          
          {/* 1. DASHBOARD OVERVIEW TAB */}
          {activeMenu === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* 4 Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Total Pesanan</p>
                    <p className="text-2xl font-black text-gray-900 mt-1">{orders.length + 120}</p>
                    <button
                      onClick={() => setActiveMenu('pesanan')}
                      className="text-[11px] font-bold text-indigo-600 hover:underline mt-2 inline-block"
                    >
                      Lihat Detail
                    </button>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Pesanan Aktif</p>
                    <p className="text-2xl font-black text-amber-600 mt-1">
                      {orders.filter((o) => o.status !== 'Selesai').length}
                    </p>
                    <button
                      onClick={() => setActiveMenu('pesanan')}
                      className="text-[11px] font-bold text-indigo-600 hover:underline mt-2 inline-block"
                    >
                      Lihat Detail
                    </button>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Pesanan Selesai</p>
                    <p className="text-2xl font-black text-emerald-600 mt-1">
                      {orders.filter((o) => o.status === 'Selesai').length + 80}
                    </p>
                    <button
                      onClick={() => setActiveMenu('pesanan')}
                      className="text-[11px] font-bold text-indigo-600 hover:underline mt-2 inline-block"
                    >
                      Lihat Detail
                    </button>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Total Klien</p>
                    <p className="text-2xl font-black text-blue-600 mt-1">{clients.length + 150}</p>
                    <button
                      onClick={() => setActiveMenu('klien')}
                      className="text-[11px] font-bold text-indigo-600 hover:underline mt-2 inline-block"
                    >
                      Lihat Detail
                    </button>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <Users className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* 2 Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Line Chart: Grafik Pesanan */}
                <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold text-gray-900">Grafik Pesanan</h3>
                    <div className="flex gap-1.5">
                      {(['Mingguan', 'Bulanan', 'Tahunan'] as const).map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setChartFilter(filter)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            chartFilter === filter
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lineChartData}>
                        <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
                        <YAxis stroke="#94A3B8" fontSize={11} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="pesanan"
                          stroke="#6366F1"
                          strokeWidth={3}
                          dot={{ fill: '#3B82F6', r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Donut Chart: Jenis Layanan */}
                <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-base font-bold text-gray-900 border-b border-slate-100 pb-3">
                    Jenis Layanan
                  </h3>
                  <div className="h-48 w-full flex justify-center items-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={70}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Legend list */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600 pt-2 border-t border-slate-100">
                    {pieChartData.map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name} {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Tabel Pesanan Terbaru */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Pesanan Terbaru</h3>
                    <p className="text-xs text-slate-400">Daftar transaksi dan progress tugas terkini.</p>
                  </div>
                  <button
                    onClick={() => setActiveOrderModal('new')}
                    className="gradient-bg text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Pesanan</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                        <th className="p-4">ID Pesanan</th>
                        <th className="p-4">Klien</th>
                        <th className="p-4">Layanan</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Progress</th>
                        <th className="p-4">Deadline</th>
                        <th className="p-4 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-gray-800">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-4 font-mono font-bold text-indigo-600">{o.id}</td>
                          <td className="p-4">
                            <p className="font-bold">{o.fullClientName || o.clientName}</p>
                            <p className="text-[10px] text-slate-400">{o.clientUniversity}</p>
                          </td>
                          <td className="p-4 font-semibold text-slate-700">{o.service}</td>
                          <td className="p-4">{getStatusBadge(o.status)}</td>
                          <td className="p-4">
                            <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden mb-1">
                              <div
                                className="gradient-bg h-full rounded-full"
                                style={{ width: `${o.progress}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-bold text-slate-500">{o.progress}%</span>
                          </td>
                          <td className="p-4 font-semibold text-rose-600">{o.deadline}</td>
                          <td className="p-4 text-center space-x-1">
                            <button
                              onClick={() => onViewOrderTracking(o.id)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Lihat Tracking Live"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleTriggerWaNotification(o)}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Kirim Notifikasi WA Otomatis"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setActiveOrderModal(o)}
                              className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                              title="Edit Pesanan"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteOrder(o.id)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* 2. PESANAN MANAGEMENT TAB (CRUD) */}
          {activeMenu === 'pesanan' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">Kelola Pesanan</h2>
                  <p className="text-xs text-slate-500">
                    Sistem Manajemen Order, Progress Pengerjaan, & WhatsApp Notification Trigger.
                  </p>
                </div>
                <button
                  onClick={() => setActiveOrderModal('new')}
                  className="gradient-bg text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Pesanan Baru</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="p-3">ID Pesanan</th>
                      <th className="p-3">Klien & WA</th>
                      <th className="p-3">Layanan</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Progress</th>
                      <th className="p-3">Harga</th>
                      <th className="p-3">Deadline</th>
                      <th className="p-3 text-center">Aksi Notifikasi WA & Edit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-50/80">
                        <td className="p-3 font-mono font-bold text-indigo-600">{o.id}</td>
                        <td className="p-3">
                          <p className="font-bold text-gray-900">{o.fullClientName || o.clientName}</p>
                          <p className="text-[10px] text-slate-400">{o.clientPhone}</p>
                        </td>
                        <td className="p-3 font-semibold text-slate-700">{o.service}</td>
                        <td className="p-3">{getStatusBadge(o.status)}</td>
                        <td className="p-3 font-bold text-indigo-600">{o.progress}%</td>
                        <td className="p-3 font-semibold text-gray-900">
                          Rp {o.price.toLocaleString('id-ID')}
                        </td>
                        <td className="p-3 text-rose-600 font-semibold">{o.deadline}</td>
                        <td className="p-3 text-center space-x-1">
                          <button
                            onClick={() => handleTriggerWaNotification(o)}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[11px] font-bold inline-flex items-center gap-1 border border-emerald-200"
                          >
                            <Send className="w-3 h-3" />
                            <span>Kirim WA</span>
                          </button>
                          <button
                            onClick={() => setActiveOrderModal(o)}
                            className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(o.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. KLIEN TAB */}
          {activeMenu === 'klien' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">Direktori Klien</h2>
                  <p className="text-xs text-slate-500">Kelola daftar pelanggan, asal kampus, gender (wanita/laki-laki), dan riwayat pesanan.</p>
                </div>
                <button
                  onClick={() => setActiveClientModal('new')}
                  className="gradient-bg text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Klien Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {clients.map((c) => (
                  <div key={c.id} className="p-4 rounded-2xl border border-slate-200 space-y-3 card-shadow bg-white flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">{c.name}</h3>
                          <p className="text-xs text-slate-400">{c.university}</p>
                        </div>
                        <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded font-bold">
                          {c.totalOrders} Order
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            c.gender === 'Perempuan'
                              ? 'bg-rose-50 text-rose-600 border border-rose-200'
                              : 'bg-blue-50 text-blue-600 border border-blue-200'
                          }`}
                        >
                          Gender: {c.gender || 'Perempuan'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 font-mono">WA: {c.phone}</p>
                      <p className="text-[10px] text-slate-400">Bergabung: {c.joinedDate}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        onClick={() => setActiveClientModal(c)}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteClient(c.id)}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. LAYANAN TAB */}
          {activeMenu === 'layanan' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">Kelola Layanan JASKIS</h2>
                  <p className="text-xs text-slate-500">Edit judul, icon, harga, dan pembahasan layanan yang tampil di halaman utama.</p>
                </div>
                <button
                  onClick={() => setActiveServiceModal('new')}
                  className="gradient-bg text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm hover:opacity-95 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Layanan Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((s) => (
                  <div key={s.id} className="p-5 rounded-2xl border border-slate-200 space-y-3 card-shadow bg-white flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600">
                          Icon: {s.iconName || 'GraduationCap'}
                        </span>
                        {s.popular && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200">
                            Populer
                          </span>
                        )}
                      </div>
                      <h3 className="font-extrabold text-indigo-700 text-base">{s.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{s.description}</p>
                      <p className="text-xs font-bold text-gray-900">{s.startingPrice}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        onClick={() => setActiveServiceModal(s)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Pembahasan & Icon</span>
                      </button>
                      <button
                        onClick={() => handleDeleteService(s.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4.5 KEUNGGULAN TAB */}
          {activeMenu === 'keunggulan' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">Kelola Keunggulan JASKIS</h2>
                  <p className="text-xs text-slate-500">Ubah poin-poin keunggulan, judul, icon, dan pembahasan keunggulan.</p>
                </div>
                <button
                  onClick={() => setActiveAdvantageModal('new')}
                  className="gradient-bg text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm hover:opacity-95 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Keunggulan</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {advantages.map((a) => (
                  <div key={a.id} className="p-5 rounded-2xl border border-slate-200 space-y-3 card-shadow bg-white flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600">
                        Icon: {a.iconName}
                      </span>
                      <h3 className="font-extrabold text-gray-900 text-base">{a.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{a.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        onClick={() => setActiveAdvantageModal(a)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteAdvantage(a.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. PORTOFOLIO TAB */}
          {activeMenu === 'portofolio' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">Kelola Portofolio</h2>
                  <p className="text-xs text-slate-500">Tambah, edit pembahasan, atau hapus item hasil pengerjaan tim.</p>
                </div>
                <button
                  onClick={() => {
                    setPortfolioThumbnail('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80');
                    setActivePortfolioModal('new');
                  }}
                  className="gradient-bg text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Portofolio</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolios.map((p) => (
                  <div key={p.id} className="border border-slate-200 rounded-2xl overflow-hidden card-shadow bg-white flex flex-col justify-between">
                    <div>
                      <img src={p.thumbnailUrl} alt={p.title} className="w-full h-36 object-cover" />
                      <div className="p-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded">
                            {p.category}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">{p.dateCompleted}</span>
                        </div>
                        <h4 className="font-bold text-sm text-gray-900 line-clamp-2">{p.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-3">{p.description}</p>
                        <p className="text-[11px] font-semibold text-indigo-600">{p.university}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setPortfolioThumbnail(p.thumbnailUrl);
                          setActivePortfolioModal(p);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Portofolio & Sampul</span>
                      </button>
                      <button
                        onClick={() => handleDeletePortfolio(p.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. TESTIMONI TAB */}
          {activeMenu === 'testimoni' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">Kelola Testimoni Klien</h2>
                  <p className="text-xs text-slate-500">Edit atau tambahkan testimoni dan ulasan dari klien JASKIS.</p>
                </div>
                <button
                  onClick={() => setActiveTestimonialModal('new')}
                  className="gradient-bg text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Testimoni</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {testimonials.map((t) => (
                  <div key={t.id} className="p-5 rounded-2xl border border-slate-200 space-y-3 card-shadow bg-white flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-gray-900">{t.clientName}</span>
                        <span className="text-amber-500 font-bold text-xs">
                          {'★'.repeat(t.rating)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{t.university} • <span className="font-semibold text-indigo-600">{t.service}</span></p>
                      <p className="text-xs italic text-gray-700 bg-slate-50 p-3 rounded-xl border border-slate-100">"{t.comment}"</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        onClick={() => setActiveTestimonialModal(t)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Pembahasan</span>
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(t.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6.5 FAQ TAB */}
          {activeMenu === 'faq' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">Kelola FAQ & Pertanyaan Umum</h2>
                  <p className="text-xs text-slate-500">Edit daftar pertanyaan dan pembahasan jawaban FAQ yang tampil di beranda.</p>
                </div>
                <button
                  onClick={() => setActiveFaqModal('new')}
                  className="gradient-bg text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah FAQ Baru</span>
                </button>
              </div>

              <div className="space-y-4">
                {faqs.map((f) => (
                  <div key={f.id} className="p-5 rounded-2xl border border-slate-200 space-y-3 card-shadow bg-white">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 mb-1 inline-block">
                          Kategori: {f.category}
                        </span>
                        <h3 className="font-bold text-sm text-gray-900">{f.question}</h3>
                        <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                          {f.answer}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setActiveFaqModal(f)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 flex items-center gap-1 cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(f.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6.6 STATISTIK TAB */}
          {activeMenu === 'statistik' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Header */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 font-bold">
                      <BarChart2 className="w-5 h-5" />
                    </span>
                    <h2 className="text-xl font-extrabold text-gray-900">Laporan Statistik & Analitik Masuk</h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Data sinkron otomatis dari transaksi pesanan, gender klien (wanita & laki-laki), jenis tugas (Skripsi, Jurnal, dll), dan total uang masuk.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
                  <RefreshCw className="w-4 h-4 text-indigo-600" />
                  <span>Status: Terintegrasi Live Sync</span>
                </div>
              </div>

              {/* 1. Total Pemasukan Uang Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-5 rounded-2xl shadow-md space-y-2">
                  <p className="text-xs font-semibold opacity-90">Total Pemasukan Keseluruhan</p>
                  <p className="text-2xl font-black">
                    Rp {orders.reduce((acc, o) => acc + o.price, 0).toLocaleString('id-ID')}
                  </p>
                  <p className="text-[11px] opacity-80 pt-1 border-t border-white/20">
                    Dari {orders.length} total pesanan terdaftar
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <p className="text-xs font-semibold text-slate-500">Pemasukan Pesanan Selesai</p>
                  <p className="text-2xl font-black text-emerald-600">
                    Rp {orders.filter((o) => o.status === 'Selesai').reduce((acc, o) => acc + o.price, 0).toLocaleString('id-ID')}
                  </p>
                  <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                    {orders.filter((o) => o.status === 'Selesai').length} pesanan tuntas diserahkan
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <p className="text-xs font-semibold text-slate-500">Pemasukan Pesanan Berjalan</p>
                  <p className="text-2xl font-black text-amber-600">
                    Rp {orders.filter((o) => o.status !== 'Selesai').reduce((acc, o) => acc + o.price, 0).toLocaleString('id-ID')}
                  </p>
                  <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                    {orders.filter((o) => o.status !== 'Selesai').length} pesanan sedang pengerjaan/review
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <p className="text-xs font-semibold text-slate-500">Rata-rata Nilai Order</p>
                  <p className="text-2xl font-black text-blue-600">
                    Rp {orders.length > 0 ? Math.round(orders.reduce((acc, o) => acc + o.price, 0) / orders.length).toLocaleString('id-ID') : 0}
                  </p>
                  <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                    Rata-rata pemasukan per transaksi
                  </p>
                </div>
              </div>

              {/* 2. Demografi Gender & Pemesanan Layanan */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Gender Klien (Wanita / Perempuan vs Laki-laki) */}
                <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Demografi Klien (Wanita & Laki-Laki)</h3>
                      <p className="text-xs text-slate-400">Statistik rasio gender pelanggan terdaftar</p>
                    </div>
                    <Users className="w-5 h-5 text-indigo-600" />
                  </div>

                  {(() => {
                    const totalClientsCount = clients.length;
                    const femaleClients = clients.filter((c) => c.gender === 'Perempuan').length;
                    const maleClients = clients.filter((c) => c.gender === 'Laki-laki').length;
                    const femalePercent = totalClientsCount > 0 ? Math.round((femaleClients / totalClientsCount) * 100) : 0;
                    const malePercent = totalClientsCount > 0 ? Math.round((maleClients / totalClientsCount) * 100) : 0;

                    return (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          {/* Klien Wanita */}
                          <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-100 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-extrabold text-rose-700">Klien Wanita (Perempuan)</span>
                              <span className="text-xs font-extrabold bg-rose-200/80 text-rose-800 px-2 py-0.5 rounded-full">
                                {femalePercent}%
                              </span>
                            </div>
                            <p className="text-3xl font-black text-rose-600">
                              {femaleClients} <span className="text-xs font-semibold text-rose-500">Orang</span>
                            </p>
                            <p className="text-[11px] text-rose-700/80">Mahasiswi aktif dari berbagai PTN/PTS</p>
                          </div>

                          {/* Klien Laki-laki */}
                          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-extrabold text-blue-700">Klien Laki-Laki (Pria)</span>
                              <span className="text-xs font-extrabold bg-blue-200/80 text-blue-800 px-2 py-0.5 rounded-full">
                                {malePercent}%
                              </span>
                            </div>
                            <p className="text-3xl font-black text-blue-600">
                              {maleClients} <span className="text-xs font-semibold text-blue-500">Orang</span>
                            </p>
                            <p className="text-[11px] text-blue-700/80">Mahasiswa aktif berbagai jurusan</p>
                          </div>
                        </div>

                        {/* Comparative Visual Bar */}
                        <div className="space-y-1.5 pt-2">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-rose-600">Wanita: {femaleClients} Klien ({femalePercent}%)</span>
                            <span className="text-blue-600">Laki-laki: {maleClients} Klien ({malePercent}%)</span>
                          </div>
                          <div className="w-full h-3.5 bg-blue-200 rounded-full overflow-hidden flex shadow-inner">
                            <div className="bg-rose-500 h-full transition-all" style={{ width: `${femalePercent}%` }} />
                            <div className="bg-blue-600 h-full transition-all" style={{ width: `${malePercent}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Pemesanan Berdasarkan Jenis Layanan (Skripsi, Jurnal, PPT, Makalah, dll) */}
                <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Pemesanan berdasarkan Jenis Layanan</h3>
                      <p className="text-xs text-slate-400">Rincian pesanan Jurnal, Skripsi, PPT, Makalah, Proposal, & Laporan</p>
                    </div>
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                  </div>

                  {(() => {
                    const categoriesList = ['Skripsi', 'Jurnal', 'PPT', 'Makalah', 'Proposal', 'Laporan'];

                    const categoryData = categoriesList.map((cat) => {
                      const matched = orders.filter((o) => o.service.toLowerCase().includes(cat.toLowerCase()));
                      const rev = matched.reduce((a, b) => a + b.price, 0);
                      return { name: cat, count: matched.length, revenue: rev };
                    });

                    // Check for remaining orders
                    const knownTotalCount = categoryData.reduce((a, b) => a + b.count, 0);
                    const unknownCount = Math.max(0, orders.length - knownTotalCount);
                    if (unknownCount > 0) {
                      const unknownRev = orders
                        .filter((o) => !categoriesList.some((cat) => o.service.toLowerCase().includes(cat.toLowerCase())))
                        .reduce((a, b) => a + b.price, 0);
                      categoryData.push({ name: 'Lainnya', count: unknownCount, revenue: unknownRev });
                    }

                    return (
                      <div className="space-y-2.5 text-xs">
                        {categoryData.map((item, idx) => (
                          <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                            <div className="flex justify-between items-center font-bold">
                              <span className="text-gray-900">{item.name}</span>
                              <span className="text-indigo-600">
                                {item.count} Pesanan — <span className="text-emerald-600 font-mono">Rp {item.revenue.toLocaleString('id-ID')}</span>
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                              <div
                                className="gradient-bg h-full rounded-full"
                                style={{
                                  width: `${orders.length > 0 ? Math.min(100, Math.round((item.count / orders.length) * 100)) : 0}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* 3. Recharts Line Chart for Revenue Breakdown */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Grafik Pemasukan Uang per Kategori Tugas</h3>
                    <p className="text-xs text-slate-400">Total akumulasi rupiah dari seluruh order yang diterima</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Total: Rp {orders.reduce((a, b) => a + b.price, 0).toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { name: 'Skripsi', total: orders.filter((o) => o.service.includes('Skripsi')).reduce((a, b) => a + b.price, 0) },
                        { name: 'Jurnal', total: orders.filter((o) => o.service.includes('Jurnal')).reduce((a, b) => a + b.price, 0) },
                        { name: 'PPT', total: orders.filter((o) => o.service.includes('PPT')).reduce((a, b) => a + b.price, 0) },
                        { name: 'Makalah', total: orders.filter((o) => o.service.includes('Makalah')).reduce((a, b) => a + b.price, 0) },
                        { name: 'Proposal', total: orders.filter((o) => o.service.includes('Proposal')).reduce((a, b) => a + b.price, 0) },
                        { name: 'Laporan', total: orders.filter((o) => o.service.includes('Laporan')).reduce((a, b) => a + b.price, 0) },
                      ]}
                    >
                      <XAxis dataKey="name" stroke="#64748B" fontSize={11} />
                      <YAxis stroke="#64748B" fontSize={11} tickFormatter={(val) => `Rp ${(val / 1000).toLocaleString()}k`} />
                      <Tooltip formatter={(value: any) => [`Rp ${Number(value).toLocaleString('id-ID')}`, 'Pemasukan Uang']} />
                      <Line type="monotone" dataKey="total" stroke="#4F46E5" strokeWidth={3} dot={{ fill: '#4F46E5', r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* 6.6 KONTEN WEBSITE TAB */}
          {activeMenu === 'konten' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6 animate-fadeIn max-w-3xl">
              <div className="border-b pb-4">
                <h2 className="text-xl font-extrabold text-gray-900">Kelola Konten & Statistik Utama Website</h2>
                <p className="text-xs text-slate-500">Edit angka statistik hero banner, judul brand, tagline, dan nomor kontak utama.</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Konten & statistik website berhasil disimpan!');
                }}
                className="space-y-6 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Nama Brand Utama</label>
                    <input
                      type="text"
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Sub-Brand / Label Tim</label>
                    <input
                      type="text"
                      value={siteSettings.subBrand}
                      onChange={(e) => setSiteSettings({ ...siteSettings, subBrand: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Tagline Utama Hero</label>
                  <input
                    type="text"
                    value={siteSettings.tagline}
                    onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>

                <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-2xl space-y-4">
                  <h3 className="font-extrabold text-indigo-900 text-sm">Angka Statistik Banner Beranda</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Jumlah Klien Puas (+)</label>
                      <input
                        type="number"
                        value={siteSettings.totalClientsCount}
                        onChange={(e) => setSiteSettings({ ...siteSettings, totalClientsCount: Number(e.target.value) })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Jumlah Proyek Selesai (+)</label>
                      <input
                        type="number"
                        value={siteSettings.totalProjectsCount}
                        onChange={(e) => setSiteSettings({ ...siteSettings, totalProjectsCount: Number(e.target.value) })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Tingkat Kepuasan (%)</label>
                      <input
                        type="number"
                        value={siteSettings.satisfactionRate}
                        onChange={(e) => setSiteSettings({ ...siteSettings, satisfactionRate: Number(e.target.value) })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Jumlah Jenis Layanan (+)</label>
                      <input
                        type="number"
                        value={siteSettings.serviceTypesCount}
                        onChange={(e) => setSiteSettings({ ...siteSettings, serviceTypesCount: Number(e.target.value) })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">WhatsApp Admin</label>
                    <input
                      type="text"
                      value={siteSettings.whatsappNumber}
                      onChange={(e) => setSiteSettings({ ...siteSettings, whatsappNumber: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Telegram Admin</label>
                    <input
                      type="text"
                      value={siteSettings.telegramNumber}
                      onChange={(e) => setSiteSettings({ ...siteSettings, telegramNumber: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Instagram Admin</label>
                    <input
                      type="text"
                      value={siteSettings.instagramHandle}
                      onChange={(e) => setSiteSettings({ ...siteSettings, instagramHandle: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="gradient-bg text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md hover:opacity-95 cursor-pointer flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Simpan Konten & Statistik Website</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 7. PESAN MASUK TAB */}
          {activeMenu === 'pesan' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6 animate-fadeIn">
              <h2 className="text-xl font-extrabold text-gray-900 border-b pb-4">Pesan Masuk Konsultasi</h2>
              <div className="space-y-3">
                {contactMessages.map((m) => (
                  <div key={m.id} className="p-4 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-indigo-600">{m.name} ({m.phone})</span>
                      <span className="text-slate-400">{m.createdAt}</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-800">Layanan: {m.service} - Kampus: {m.university}</p>
                    <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-xl">{m.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. PENGATURAN TAB */}
          {activeMenu === 'pengaturan' && (
            <div className="space-y-8 max-w-2xl animate-fadeIn">
              
              {/* Card 1: Ubah Akun Admin */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
                <div className="flex items-center gap-3 border-b pb-4 border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-gray-900">Ubah Akun Login Admin</h2>
                    <p className="text-xs text-slate-500">Perbarui username dan password login untuk keamanan akun admin.</p>
                  </div>
                </div>

                {credSuccessMsg && (
                  <div className="bg-emerald-50 text-emerald-700 p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{credSuccessMsg}</span>
                  </div>
                )}

                {credErrorMsg && (
                  <div className="bg-rose-50 text-rose-700 p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 border border-rose-200">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{credErrorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSaveCredentials} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Username / Email Admin
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={adminUsernameInput}
                        onChange={(e) => setAdminUsernameInput(e.target.value)}
                        placeholder="admin@jaskis.com"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:bg-white focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-3">
                    <p className="font-bold text-slate-800 text-xs">Verifikasi & Password Baru</p>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Password Saat Ini <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="password"
                          required
                          value={currentPasswordInput}
                          onChange={(e) => setCurrentPasswordInput(e.target.value)}
                          placeholder="Masukkan password admin saat ini"
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:bg-white focus:border-indigo-500"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">Diperlukan untuk memverifikasi perubahan akun Anda.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">
                          Password Baru (Opsional)
                        </label>
                        <div className="relative">
                          <KeyRound className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                          <input
                            type="password"
                            value={newPasswordInput}
                            onChange={(e) => setNewPasswordInput(e.target.value)}
                            placeholder="Biarkan kosong jika tidak diubah"
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:bg-white focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">
                          Konfirmasi Password Baru
                        </label>
                        <div className="relative">
                          <KeyRound className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                          <input
                            type="password"
                            value={confirmPasswordInput}
                            onChange={(e) => setConfirmPasswordInput(e.target.value)}
                            placeholder="Ketik ulang password baru"
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:bg-white focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="gradient-bg text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Simpan Perubahan Akun Admin</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Card 2: Pengaturan Sistem Website */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
                <h2 className="text-lg font-extrabold text-gray-900 border-b pb-4 border-slate-100">
                  Pengaturan Kontak & Brand
                </h2>
                
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Nomor WhatsApp Admin Website</label>
                    <input
                      type="text"
                      value={siteSettings.whatsappNumber}
                      onChange={(e) => setSiteSettings({ ...siteSettings, whatsappNumber: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Tagline Brand</label>
                    <input
                      type="text"
                      value={siteSettings.tagline}
                      onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => alert('Pengaturan kontak & brand berhasil disimpan!')}
                      className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-colors cursor-pointer"
                    >
                      Simpan Kontak & Brand
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* AUTOMATED WHATSAPP NOTIFICATION TRIGGER MODAL */}
      {waNotifyModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 card-shadow relative">
            <button
              onClick={() => setWaNotifyModalOrder(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Kirim Notifikasi WA</h3>
                <p className="text-xs text-gray-500">Klien: {waNotifyModalOrder.fullClientName || waNotifyModalOrder.clientName}</p>
              </div>
            </div>

            <div className="bg-emerald-50/80 border border-emerald-100 p-4 rounded-2xl space-y-2 text-xs">
              <p className="font-bold text-emerald-800">Pratinjau Pesan WhatsApp Otomatis:</p>
              <div className="p-3 bg-white rounded-xl text-gray-700 space-y-1 font-mono text-[11px] leading-relaxed border border-emerald-100">
                <p>Halo {waNotifyModalOrder.fullClientName || waNotifyModalOrder.clientName},</p>
                <p>Status pesanan ID <strong>{waNotifyModalOrder.id}</strong> telah diperbarui menjadi:</p>
                <p className="text-indigo-600 font-bold">● {waNotifyModalOrder.status} ({waNotifyModalOrder.progress}%)</p>
                <p className="text-gray-400">Cek live tracking di jaskis.com/cek-pesanan</p>
              </div>
            </div>

            {waSentSuccess ? (
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>WhatsApp berhasil dibuka & terkirim!</span>
              </div>
            ) : (
              <button
                onClick={handleConfirmSendWa}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Buka & Kirim via WhatsApp Client</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* CREATE / EDIT CLIENT MODAL */}
      {activeClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 card-shadow relative">
            <button
              onClick={() => setActiveClientModal(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-gray-900">
              {activeClientModal === 'new' ? 'Tambah Data Klien' : `Edit Klien ${activeClientModal.name}`}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                const university = (form.elements.namedItem('university') as HTMLInputElement).value;
                const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
                const gender = (form.elements.namedItem('gender') as HTMLSelectElement).value as 'Perempuan' | 'Laki-laki';
                const totalOrders = Number((form.elements.namedItem('totalOrders') as HTMLInputElement).value || 1);

                handleSaveClient({
                  id: activeClientModal === 'new' ? `CLI-00${clients.length + 1}` : activeClientModal.id,
                  name,
                  university,
                  phone,
                  gender,
                  totalOrders,
                  joinedDate: activeClientModal === 'new' ? 'Agustus 2026' : activeClientModal.joinedDate,
                });
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nama Lengkap / Inisial Klien</label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={activeClientModal === 'new' ? '' : activeClientModal.name}
                  placeholder="Contoh: Annisa Rahmawati"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Gender / Jenis Kelamin</label>
                  <select
                    name="gender"
                    defaultValue={activeClientModal === 'new' ? 'Perempuan' : activeClientModal.gender || 'Perempuan'}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                  >
                    <option value="Perempuan">Perempuan (Wanita)</option>
                    <option value="Laki-laki">Laki-laki (Pria)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Jumlah Pesanan</label>
                  <input
                    name="totalOrders"
                    type="number"
                    min="1"
                    required
                    defaultValue={activeClientModal === 'new' ? 1 : activeClientModal.totalOrders}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Asal Kampus / Universitas</label>
                <input
                  name="university"
                  type="text"
                  required
                  defaultValue={activeClientModal === 'new' ? '' : activeClientModal.university}
                  placeholder="Contoh: Universitas Indonesia"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Nomor WhatsApp Klien</label>
                <input
                  name="phone"
                  type="text"
                  required
                  defaultValue={activeClientModal === 'new' ? '' : activeClientModal.phone}
                  placeholder="08123456789"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full gradient-bg text-white py-3 rounded-xl font-bold cursor-pointer"
                >
                  Simpan Data Klien
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT ORDER MODAL */}
      {activeOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 card-shadow relative">
            <button
              onClick={() => setActiveOrderModal(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-gray-900">
              {activeOrderModal === 'new' ? 'Tambah Pesanan Baru' : `Edit Pesanan ${activeOrderModal.id}`}
            </h3>

            {activeOrderModal === 'new' ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const clientName = (form.elements.namedItem('clientName') as HTMLInputElement).value;
                  const clientGender = (form.elements.namedItem('clientGender') as HTMLSelectElement).value as 'Perempuan' | 'Laki-laki';
                  const clientPhone = (form.elements.namedItem('clientPhone') as HTMLInputElement).value;
                  const university = (form.elements.namedItem('university') as HTMLInputElement).value;
                  const service = (form.elements.namedItem('service') as HTMLInputElement).value;
                  const price = Number((form.elements.namedItem('price') as HTMLInputElement).value || 0);
                  const deadline = (form.elements.namedItem('deadline') as HTMLInputElement).value;

                  const newOrderId = `JAS-2026-${String(orders.length + 1).padStart(3, '0')}`;
                  const newOrderObj: Order = {
                    id: newOrderId,
                    clientName: clientName.split(' ')[0] + ' ***',
                    fullClientName: clientName,
                    clientPhone,
                    clientUniversity: university,
                    clientGender,
                    service,
                    orderDate: 'Hari ini',
                    deadline: deadline || '7 Hari',
                    price,
                    status: 'Diproses',
                    progress: 15,
                    notes: `Pemesanan tugas ${service} baru untuk kampus ${university}`,
                    lastNotifiedAt: 'Belum pernah',
                    timeline: [
                      { title: 'Konsultasi & Order Diterima', completed: true, active: true, timestamp: 'Hari ini' },
                      { title: 'Analisis & Penentuan Tim Expert', completed: false, active: false, timestamp: '-' },
                      { title: 'Pengerjaan Draf / Bab', completed: false, active: false, timestamp: '-' },
                      { title: 'Quality Check & Turnitin Scan', completed: false, active: false, timestamp: '-' },
                      { title: 'Pengiriman Hasil Selesai', completed: false, active: false, timestamp: '-' },
                    ],
                  };

                  setOrders([newOrderObj, ...orders]);

                  // Sync to client list if not present
                  const existingClient = clients.find((c) => c.phone === clientPhone || c.name === clientName);
                  if (!existingClient) {
                    setClients([
                      ...clients,
                      {
                        id: `CLI-00${clients.length + 1}`,
                        name: clientName,
                        university,
                        phone: clientPhone,
                        gender: clientGender,
                        totalOrders: 1,
                        joinedDate: 'Agustus 2026',
                      },
                    ]);
                  } else {
                    setClients(
                      clients.map((c) =>
                        c.id === existingClient.id ? { ...c, totalOrders: c.totalOrders + 1 } : c
                      )
                    );
                  }

                  setActiveOrderModal(null);
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Nama Lengkap Klien</label>
                  <input
                    name="clientName"
                    type="text"
                    required
                    placeholder="Contoh: Dini Kartika"
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Gender / Jenis Kelamin</label>
                    <select name="clientGender" className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium">
                      <option value="Perempuan">Perempuan (Wanita)</option>
                      <option value="Laki-laki">Laki-laki (Pria)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Nomor WhatsApp</label>
                    <input
                      name="clientPhone"
                      type="text"
                      required
                      placeholder="08123456789"
                      className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Kampus / Universitas</label>
                    <input
                      name="university"
                      type="text"
                      required
                      placeholder="Universitas Gadjah Mada"
                      className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Layanan Tugas</label>
                    <input
                      name="service"
                      type="text"
                      required
                      placeholder="Skripsi / Jurnal / PPT / Makalah"
                      className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Harga Pesanan (Rp)</label>
                    <input
                      name="price"
                      type="number"
                      required
                      placeholder="1500000"
                      className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Deadline / Tenggat</label>
                    <input
                      name="deadline"
                      type="text"
                      required
                      placeholder="5 Hari / 25 Agustus 2026"
                      className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button type="submit" className="w-full gradient-bg text-white py-3 rounded-xl font-bold cursor-pointer">
                    Simpan Order & Sinkronkan Data
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Status Pesanan</label>
                  <select
                    value={activeOrderModal.status}
                    onChange={(e) => {
                      const newStat = e.target.value as OrderStatus;
                      handleUpdateOrderStatus(activeOrderModal.id, newStat, activeOrderModal.progress);
                      setActiveOrderModal({ ...activeOrderModal, status: newStat });
                    }}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl"
                  >
                    <option value="Diproses">Diproses</option>
                    <option value="Sedang Dikerjakan">Sedang Dikerjakan</option>
                    <option value="Review">Review</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Progress Pengerjaan ({activeOrderModal.progress}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={activeOrderModal.progress}
                    onChange={(e) => {
                      const p = Number(e.target.value);
                      handleUpdateOrderStatus(activeOrderModal.id, activeOrderModal.status, p);
                      setActiveOrderModal({ ...activeOrderModal, progress: p });
                    }}
                    className="w-full"
                  />
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => setActiveOrderModal(null)}
                    className="w-full gradient-bg text-white py-3 rounded-xl font-bold"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CREATE / EDIT SERVICE MODAL */}
      {activeServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 card-shadow relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveServiceModal(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-gray-900">
              {activeServiceModal === 'new' ? 'Tambah Layanan Baru' : `Edit Layanan ${activeServiceModal.title}`}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
                const iconName = (form.elements.namedItem('iconName') as HTMLSelectElement).value;
                const startingPrice = (form.elements.namedItem('startingPrice') as HTMLInputElement).value;
                const popular = (form.elements.namedItem('popular') as HTMLInputElement).checked;

                handleSaveService({
                  id: activeServiceModal === 'new' ? `SRV-00${services.length + 1}` : activeServiceModal.id,
                  title,
                  description,
                  iconName,
                  startingPrice,
                  popular,
                });
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-gray-700 mb-1">Judul Layanan</label>
                <input
                  name="title"
                  type="text"
                  required
                  defaultValue={activeServiceModal === 'new' ? '' : activeServiceModal.title}
                  placeholder="Contoh: Skripsi / Jurnal / PPT"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Pembahasan & Deskripsi</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  defaultValue={activeServiceModal === 'new' ? '' : activeServiceModal.description}
                  placeholder="Deskripsi detail pembahasan layanan..."
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Pilihan Ikon</label>
                  <select
                    name="iconName"
                    defaultValue={activeServiceModal === 'new' ? 'GraduationCap' : activeServiceModal.iconName || 'GraduationCap'}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                  >
                    <option value="GraduationCap">GraduationCap (Topi Toga)</option>
                    <option value="FileText">FileText (Dokumen)</option>
                    <option value="BookOpen">BookOpen (Buku / SINTA)</option>
                    <option value="FileCheck">FileCheck (Makalah)</option>
                    <option value="ClipboardList">ClipboardList (Laporan)</option>
                    <option value="PenTool">PenTool (Essay)</option>
                    <option value="Presentation">Presentation (PPT)</option>
                    <option value="Image">Image (Poster)</option>
                    <option value="ShieldCheck">ShieldCheck (Aman)</option>
                    <option value="Award">Award (Prestasi)</option>
                    <option value="Lock">Lock (Privasi)</option>
                    <option value="Sparkles">Sparkles (Spesial)</option>
                    <option value="Star">Star (Bintang)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Harga Mulai</label>
                  <input
                    name="startingPrice"
                    type="text"
                    required
                    defaultValue={activeServiceModal === 'new' ? 'Mulai Rp 100rb' : activeServiceModal.startingPrice}
                    placeholder="Mulai Rp 100rb"
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  name="popular"
                  type="checkbox"
                  id="popularCheck"
                  defaultChecked={activeServiceModal === 'new' ? false : !!activeServiceModal.popular}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <label htmlFor="popularCheck" className="font-bold text-gray-700 cursor-pointer">
                  Tandai sebagai Layanan Populer
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full gradient-bg text-white py-3 rounded-xl font-bold cursor-pointer"
                >
                  Simpan Layanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT ADVANTAGE MODAL */}
      {activeAdvantageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 card-shadow relative">
            <button
              onClick={() => setActiveAdvantageModal(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-gray-900">
              {activeAdvantageModal === 'new' ? 'Tambah Keunggulan' : `Edit Keunggulan ${activeAdvantageModal.title}`}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
                const iconName = (form.elements.namedItem('iconName') as HTMLSelectElement).value;

                handleSaveAdvantage({
                  id: activeAdvantageModal === 'new' ? `ADV-00${advantages.length + 1}` : activeAdvantageModal.id,
                  title,
                  description,
                  iconName,
                });
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-gray-700 mb-1">Judul Keunggulan</label>
                <input
                  name="title"
                  type="text"
                  required
                  defaultValue={activeAdvantageModal === 'new' ? '' : activeAdvantageModal.title}
                  placeholder="Contoh: Aman & Terpercaya"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Pembahasan & Penjelasan Keunggulan</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  defaultValue={activeAdvantageModal === 'new' ? '' : activeAdvantageModal.description}
                  placeholder="Penjelasan ringkas keunggulan ini..."
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Pilihan Ikon</label>
                <select
                  name="iconName"
                  defaultValue={activeAdvantageModal === 'new' ? 'ShieldCheck' : activeAdvantageModal.iconName}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                >
                  <option value="ShieldCheck">ShieldCheck (Aman)</option>
                  <option value="Award">Award (Penghargaan)</option>
                  <option value="CheckCircle">CheckCircle (Centang Sukses)</option>
                  <option value="Lock">Lock (Privasi Enkripsi)</option>
                  <option value="Clock">Clock (Cepat & On Time)</option>
                  <option value="Sparkles">Sparkles (Fitur Unggulan)</option>
                  <option value="Star">Star (Rating Terbaik)</option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full gradient-bg text-white py-3 rounded-xl font-bold cursor-pointer"
                >
                  Simpan Keunggulan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT PORTFOLIO MODAL */}
      {activePortfolioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 card-shadow relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActivePortfolioModal(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-gray-900">
              {activePortfolioModal === 'new' ? 'Tambah Portofolio' : `Edit Portofolio ${activePortfolioModal.title}`}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                const category = (form.elements.namedItem('category') as HTMLInputElement).value;
                const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
                const thumbnailUrl = (form.elements.namedItem('thumbnailUrl') as HTMLInputElement).value;
                const dateCompleted = (form.elements.namedItem('dateCompleted') as HTMLInputElement).value;
                const university = (form.elements.namedItem('university') as HTMLInputElement).value;

                handleSavePortfolio({
                  id: activePortfolioModal === 'new' ? `PORT-00${portfolios.length + 1}` : activePortfolioModal.id,
                  title,
                  category: category as PortfolioItem['category'],
                  description,
                  thumbnailUrl: portfolioThumbnail || thumbnailUrl,
                  dateCompleted,
                  university,
                });
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-gray-700 mb-1">Judul Portofolio / Tugas</label>
                <input
                  name="title"
                  type="text"
                  required
                  defaultValue={activePortfolioModal === 'new' ? '' : activePortfolioModal.title}
                  placeholder="Judul skripsi / jurnal / PPT..."
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Kategori</label>
                  <input
                    name="category"
                    type="text"
                    required
                    defaultValue={activePortfolioModal === 'new' ? 'Skripsi' : activePortfolioModal.category}
                    placeholder="Skripsi / Jurnal / PPT"
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Kampus / Universitas</label>
                  <input
                    name="university"
                    type="text"
                    required
                    defaultValue={activePortfolioModal === 'new' ? 'Universitas Indonesia' : activePortfolioModal.university}
                    placeholder="Universitas Indonesia"
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Pembahasan & Hasil Pengerjaan</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  defaultValue={activePortfolioModal === 'new' ? '' : activePortfolioModal.description}
                  placeholder="Pembahasan lengkap mengenai tugas ini..."
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                />
              </div>

              {/* Edit Gambar Sampul Portofolio Section */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="block font-bold text-gray-900">Edit Gambar Sampul Portofolio</label>
                
                {/* Live Preview Box */}
                <div className="relative h-40 w-full rounded-xl overflow-hidden border border-slate-300 bg-slate-200">
                  <img
                    src={portfolioThumbnail || (activePortfolioModal === 'new' ? 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' : activePortfolioModal.thumbnailUrl)}
                    alt="Pratinjau Sampul"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3 text-white text-[11px] font-bold">
                    <span>Pratinjau Sampul Portofolio</span>
                  </div>
                </div>

                {/* Direct URL text field */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">URL Gambar Sampul</label>
                  <input
                    name="thumbnailUrl"
                    type="text"
                    required
                    value={portfolioThumbnail}
                    onChange={(e) => setPortfolioThumbnail(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2.5 bg-white border rounded-xl font-medium"
                  />
                </div>

                {/* Upload File from Computer */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Atau Upload Gambar dari Perangkat</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          if (typeof reader.result === 'string') {
                            setPortfolioThumbnail(reader.result);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full p-2 bg-white border rounded-xl text-slate-600 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 cursor-pointer"
                  />
                </div>

                {/* Preset Cover Images */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Pilihan Sampul Tema Bawaan:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { name: 'Skripsi', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80' },
                      { name: 'Jurnal', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
                      { name: 'PPT', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80' },
                      { name: 'Makalah', url: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80' },
                    ].map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setPortfolioThumbnail(preset.url)}
                        className={`p-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                          portfolioThumbnail === preset.url
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-indigo-50'
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Tanggal Selesai</label>
                <input
                  name="dateCompleted"
                  type="text"
                  required
                  defaultValue={activePortfolioModal === 'new' ? 'Agustus 2026' : activePortfolioModal.dateCompleted}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full gradient-bg text-white py-3 rounded-xl font-bold cursor-pointer"
                >
                  Simpan Portofolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT TESTIMONIAL MODAL */}
      {activeTestimonialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 card-shadow relative">
            <button
              onClick={() => setActiveTestimonialModal(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-gray-900">
              {activeTestimonialModal === 'new' ? 'Tambah Testimoni' : `Edit Testimoni ${activeTestimonialModal.clientName}`}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const clientName = (form.elements.namedItem('clientName') as HTMLInputElement).value;
                const university = (form.elements.namedItem('university') as HTMLInputElement).value;
                const service = (form.elements.namedItem('service') as HTMLInputElement).value;
                const rating = Number((form.elements.namedItem('rating') as HTMLSelectElement).value);
                const comment = (form.elements.namedItem('comment') as HTMLTextAreaElement).value;

                handleSaveTestimonial({
                  id: activeTestimonialModal === 'new' ? `TEST-00${testimonials.length + 1}` : activeTestimonialModal.id,
                  clientName,
                  university,
                  service,
                  rating,
                  comment,
                  avatarBg: 'bg-indigo-100 text-indigo-700',
                });
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nama Klien (Inisial)</label>
                <input
                  name="clientName"
                  type="text"
                  required
                  defaultValue={activeTestimonialModal === 'new' ? 'A*** R***' : activeTestimonialModal.clientName}
                  placeholder="Contoh: A*** R***"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Universitas</label>
                  <input
                    name="university"
                    type="text"
                    required
                    defaultValue={activeTestimonialModal === 'new' ? 'Universitas Brawijaya' : activeTestimonialModal.university}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Layanan</label>
                  <input
                    name="service"
                    type="text"
                    required
                    defaultValue={activeTestimonialModal === 'new' ? 'Skripsi' : activeTestimonialModal.service}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Rating</label>
                <select
                  name="rating"
                  defaultValue={activeTestimonialModal === 'new' ? 5 : activeTestimonialModal.rating}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                >
                  <option value={5}>5 Bintang (Sangat Puas)</option>
                  <option value={4}>4 Bintang (Puas)</option>
                  <option value={3}>3 Bintang (Cukup)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Pembahasan & Ulasan Klien</label>
                <textarea
                  name="comment"
                  required
                  rows={3}
                  defaultValue={activeTestimonialModal === 'new' ? '' : activeTestimonialModal.comment}
                  placeholder="Ulasan & masukan dari klien..."
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full gradient-bg text-white py-3 rounded-xl font-bold cursor-pointer"
                >
                  Simpan Testimoni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT FAQ MODAL */}
      {activeFaqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 card-shadow relative">
            <button
              onClick={() => setActiveFaqModal(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-gray-900">
              {activeFaqModal === 'new' ? 'Tambah FAQ' : `Edit FAQ ${activeFaqModal.id}`}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const question = (form.elements.namedItem('question') as HTMLInputElement).value;
                const category = (form.elements.namedItem('category') as HTMLInputElement).value;
                const answer = (form.elements.namedItem('answer') as HTMLTextAreaElement).value;

                handleSaveFaq({
                  id: activeFaqModal === 'new' ? `FAQ-00${faqs.length + 1}` : activeFaqModal.id,
                  question,
                  category,
                  answer,
                });
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-gray-700 mb-1">Kategori</label>
                <input
                  name="category"
                  type="text"
                  required
                  defaultValue={activeFaqModal === 'new' ? 'Umum' : activeFaqModal.category}
                  placeholder="Umum / Pemesanan / Revisi"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Pertanyaan</label>
                <input
                  name="question"
                  type="text"
                  required
                  defaultValue={activeFaqModal === 'new' ? '' : activeFaqModal.question}
                  placeholder="Pertanyaan yang sering ditanyakan..."
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Pembahasan & Jawaban</label>
                <textarea
                  name="answer"
                  required
                  rows={4}
                  defaultValue={activeFaqModal === 'new' ? '' : activeFaqModal.answer}
                  placeholder="Pembahasan jawaban secara jelas dan lengkap..."
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full gradient-bg text-white py-3 rounded-xl font-bold cursor-pointer"
                >
                  Simpan FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
