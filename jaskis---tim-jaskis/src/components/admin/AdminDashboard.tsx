import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus, ServiceCategory, Gender, Order, PortfolioItem } from '../../types';
import { Logo } from '../common/Logo';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  LayoutDashboard,
  ShoppingBag,
  Briefcase,
  FolderKanban,
  MessageSquareQuote,
  HelpCircle,
  Inbox,
  Bell,
  Settings,
  LogOut,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  MessageCircle,
  X,
  TrendingUp,
  Users,
  DollarSign,
  Layers,
  Globe,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Award,
  Check,
  Calendar,
  ExternalLink,
  MessageSquareText,
  ChevronRight
} from 'lucide-react';

type AdminTab =
  | 'overview'
  | 'stats'
  | 'website-content'
  | 'orders'
  | 'services'
  | 'portfolio'
  | 'testimonials'
  | 'faqs'
  | 'inbox'
  | 'notifications'
  | 'settings';

const COVER_PRESETS = [
  { label: 'Riset & Jurnal SINTA', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop' },
  { label: 'Buku & Skripsi', url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop' },
  { label: 'Keuangan & Data Analysis', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop' },
  { label: 'Sistem Web & Source Code', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop' },
  { label: 'PPT Seminar & Presentation', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop' },
  { label: 'Riset Lab & Sains', url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop' },
  { label: 'Proposal Penelitian', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop' },
  { label: 'Poster & Infografis', url: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?q=80&w=800&auto=format&fit=crop' },
];

export const AdminDashboard: React.FC = () => {
  const {
    orders,
    createOrder,
    updateOrder,
    deleteOrder,
    services,
    createService,
    updateService,
    deleteService,
    portfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    testimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    faqs,
    createFAQ,
    updateFAQ,
    deleteFAQ,
    messages,
    markMessageAsRead,
    deleteMessage,
    markNotificationAsRead,
    deleteNotification,
    clearAllNotifications,
    notifications,
    clients,
    createClient,
    updateClient,
    deleteClient,
    settings,
    updateSettings,
    resetAllDataToDefault,
    logoutAdmin,
    generateWhatsAppLink,
    getWhatsAppOrderMessage,
    navigateTo,
    adminActiveTab,
    setAdminActiveTab,
    activeSearchOrderId
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTab>(adminActiveTab || 'overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sync activeTab whenever adminActiveTab changes in context
  useEffect(() => {
    if (adminActiveTab) {
      setActiveTab(adminActiveTab);
    }
  }, [adminActiveTab]);

  // Mobile responsive helper to set active tab & close mobile drawer if open
  const selectTab = (tab: AdminTab) => {
    setActiveTab(tab);
    setAdminActiveTab(tab);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };
  const [searchTerm, setSearchTerm] = useState(activeSearchOrderId || '');

  // Modals state
  const [orderModal, setOrderModal] = useState<{ open: boolean; mode: 'add' | 'edit'; data?: Order }>({ open: false, mode: 'add' });
  const [editStatus, setEditStatus] = useState<OrderStatus>('Sedang Dikerjakan');
  const [editProgress, setEditProgress] = useState<number>(65);
  const [showDetailOrderFields, setShowDetailOrderFields] = useState<boolean>(true);

  // Custom Delete Confirmation Modal State (replaces blocked browser confirm dialogs)
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{
    open: boolean;
    type: 'order' | 'service' | 'portfolio' | 'testimonial' | 'faq' | 'message' | 'reset-data' | 'clear-notifications';
    id?: string;
    title: string;
    subtitle?: string;
  }>({ open: false, type: 'order', title: '' });

  const executeDeleteConfirmed = () => {
    if (!deleteConfirmModal.open) return;
    const { type, id, title } = deleteConfirmModal;

    if (type === 'order' && id) {
      deleteOrder(id);
      showToast(`Pesanan #${id} berhasil dihapus.`);
    } else if (type === 'service' && id) {
      deleteService(id);
      showToast(`Layanan "${title}" berhasil dihapus.`);
    } else if (type === 'portfolio' && id) {
      deletePortfolio(id);
      showToast(`Portofolio "${title}" berhasil dihapus.`);
    } else if (type === 'testimonial' && id) {
      deleteTestimonial(id);
      showToast(`Testimoni dari "${title}" berhasil dihapus.`);
    } else if (type === 'faq' && id) {
      deleteFAQ(id);
      showToast(`FAQ "${title}" berhasil dihapus.`);
    } else if (type === 'message' && id) {
      deleteMessage(id);
      showToast(`Pesan masuk dari "${title}" berhasil dihapus.`);
    } else if (type === 'reset-data') {
      resetAllDataToDefault();
      showToast('Seluruh data berhasil direset ke kondisi awal.');
    } else if (type === 'clear-notifications') {
      clearAllNotifications();
      showToast('Semua riwayat notifikasi dibersihkan.');
    }

    setDeleteConfirmModal({ open: false, type: 'order', title: '' });
  };

  const openEditOrderModal = (order: Order) => {
    setEditStatus(order.status || 'Sedang Dikerjakan');
    setEditProgress(order.progress !== undefined ? order.progress : 50);
    setShowDetailOrderFields(true);
    setOrderModal({ open: true, mode: 'edit', data: order });
  };

  const openAddOrderModal = () => {
    setEditStatus('Pesanan Diterima');
    setEditProgress(0);
    setShowDetailOrderFields(true);
    setOrderModal({ open: true, mode: 'add' });
  };

  const [serviceModal, setServiceModal] = useState<{ open: boolean; mode: 'add' | 'edit'; data?: any }>({ open: false, mode: 'add' });
  const [portfolioModal, setPortfolioModal] = useState<{ open: boolean; mode: 'add' | 'edit'; data?: PortfolioItem }>({ open: false, mode: 'add' });
  const [testimonialModal, setTestimonialModal] = useState<{ open: boolean; mode: 'add' | 'edit'; data?: any }>({ open: false, mode: 'add' });
  const [faqModal, setFaqModal] = useState<{ open: boolean; mode: 'add' | 'edit'; data?: any }>({ open: false, mode: 'add' });
  
  // Custom cover image state for Portfolio Modal
  const [portfolioCoverUrl, setPortfolioCoverUrl] = useState<string>('');

  // Notification drawer & Toast notice
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Unread counts
  const unreadMessagesCount = messages.filter(m => !m.read).length;
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  // Overview & Analytics Stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const activeOrdersCount = orders.filter(o => o.status === 'Sedang Dikerjakan' || o.status === 'Review' || o.status === 'Brief Dikonfirmasi').length;
  const completedOrdersCount = orders.filter(o => o.status === 'Selesai').length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  // Order Status Breakdown Distribution Data for Recharts
  const STATUS_ORDER_LIST: { status: OrderStatus; shortName: string; label: string; color: string; group: 'pending' | 'in_progress' | 'completed' }[] = [
    { status: 'Pesanan Diterima', shortName: 'Diterima', label: 'Pesanan Diterima', color: '#3B82F6', group: 'pending' },
    { status: 'Brief Dikonfirmasi', shortName: 'Brief Valid', label: 'Brief Dikonfirmasi', color: '#8B5CF6', group: 'pending' },
    { status: 'Pembayaran Dikonfirmasi', shortName: 'Bayar Valid', label: 'Pembayaran Valid', color: '#06B6D4', group: 'pending' },
    { status: 'Sedang Dikerjakan', shortName: 'Dikerjakan', label: 'Sedang Dikerjakan', color: '#F59E0B', group: 'in_progress' },
    { status: 'Review', shortName: 'Review', label: 'Tahap Review', color: '#EC4899', group: 'in_progress' },
    { status: 'Selesai', shortName: 'Selesai', label: 'Selesai / Tuntas', color: '#10B981', group: 'completed' },
  ];

  const orderStatusDistribution = STATUS_ORDER_LIST.map(item => {
    const count = orders.filter(o => o.status === item.status).length;
    const percentage = totalOrders > 0 ? Math.round((count / totalOrders) * 100) : 0;
    return {
      name: item.shortName,
      fullName: item.label,
      status: item.status,
      count,
      value: count,
      percentage,
      color: item.color,
      group: item.group
    };
  });

  // Grouped Status Summary: Pending/Antrian vs Sedang Dikerjakan vs Selesai
  const pendingOrdersTotal = orders.filter(o => o.status === 'Pesanan Diterima' || o.status === 'Brief Dikonfirmasi' || o.status === 'Pembayaran Dikonfirmasi').length;
  const inProgressOrdersTotal = orders.filter(o => o.status === 'Sedang Dikerjakan' || o.status === 'Review').length;
  const completedOrdersTotal = orders.filter(o => o.status === 'Selesai').length;

  const groupedStatusData = [
    { name: 'Pending / Antrean', value: pendingOrdersTotal, color: '#3B82F6', percentage: totalOrders > 0 ? Math.round((pendingOrdersTotal / totalOrders) * 100) : 0 },
    { name: 'Sedang Dikerjakan', value: inProgressOrdersTotal, color: '#F59E0B', percentage: totalOrders > 0 ? Math.round((inProgressOrdersTotal / totalOrders) * 100) : 0 },
    { name: 'Selesai / Tuntas', value: completedOrdersTotal, color: '#10B981', percentage: totalOrders > 0 ? Math.round((completedOrdersTotal / totalOrders) * 100) : 0 }
  ];

  // Monthly Chart Data
  const monthlyData = [
    { month: 'Jan', pesanan: 12, omset: 4200000 },
    { month: 'Feb', pesanan: 18, omset: 6800000 },
    { month: 'Mar', pesanan: 24, omset: 9500000 },
    { month: 'Apr', pesanan: 20, omset: 8100000 },
    { month: 'Mei', pesanan: 30, omset: 12400000 },
    { month: 'Jun', pesanan: 35, omset: 15200000 },
    { month: 'Jul', pesanan: 28, omset: 11000000 },
    { month: 'Agt', pesanan: orders.length + 12, omset: totalRevenue + 3500000 },
  ];

  // Service Category Revenue Share Data
  const serviceCategoryData = [
    { name: 'Skripsi', value: orders.filter(o => o.serviceCategory === 'Skripsi').length || 10 },
    { name: 'Jurnal / SINTA', value: orders.filter(o => o.serviceCategory === 'Jurnal / SINTA').length || 8 },
    { name: 'Proposal', value: orders.filter(o => o.serviceCategory === 'Proposal').length || 6 },
    { name: 'PPT', value: orders.filter(o => o.serviceCategory === 'PPT').length || 7 },
    { name: 'Makalah', value: orders.filter(o => o.serviceCategory === 'Makalah').length || 5 },
    { name: 'Lainnya', value: 4 }
  ];

  // University Order Breakdown
  const uniDistribution = [
    { uni: 'Univ Brawijaya (UB)', count: 24 },
    { uni: 'Univ Indonesia (UI)', count: 18 },
    { uni: 'Univ Gadjah Mada (UGM)', count: 15 },
    { uni: 'Univ Airlangga (UNAIR)', count: 12 },
    { uni: 'Inst Teknologi Bandung (ITB)', count: 9 },
    { uni: 'Lainnya', count: 16 }
  ];

  const CHART_COLORS = ['#6366F1', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

  // Order Filters State
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('ALL');

  const filteredOrders = orders.filter(o => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.serviceCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.university && o.university.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = orderStatusFilter === 'ALL' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle Order Form Submit
  const handleSaveOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const orderData = {
      clientName: (fd.get('clientName') as string) || orderModal.data?.clientName || 'Klien Mahasiswa',
      gender: (fd.get('gender') as Gender) || orderModal.data?.gender || 'Pria',
      university: (fd.get('university') as string) || orderModal.data?.university || 'Universitas Brawijaya',
      phone: (fd.get('phone') as string) || orderModal.data?.phone || '081234567890',
      serviceCategory: (fd.get('serviceCategory') as ServiceCategory) || orderModal.data?.serviceCategory || 'Skripsi',
      deadline: (fd.get('deadline') as string) || orderModal.data?.deadline || '25 Ags 2026',
      brief: (fd.get('brief') as string) || orderModal.data?.brief || 'Pengerjaan tugas',
      totalPrice: Number(fd.get('totalPrice') || orderModal.data?.totalPrice || 350000),
      status: editStatus,
      progress: editProgress,
      notes: (fd.get('notes') as string) || orderModal.data?.notes || ''
    };

    if (orderModal.mode === 'add') {
      createOrder(orderData);
      showToast('Pesanan baru berhasil ditambahkan!');
    } else if (orderModal.mode === 'edit' && orderModal.data) {
      updateOrder(orderModal.data.id, orderData);
      showToast(`Progres pesanan ${orderModal.data.id} diperbarui ke ${editProgress}% (${editStatus})!`);
    }
    setOrderModal({ open: false, mode: 'add' });
  };

  // Website Content CMS Form State
  const [cmsForm, setCmsForm] = useState({ ...settings });

  // Keep cmsForm synced with latest settings
  useEffect(() => {
    setCmsForm({ ...settings });
  }, [settings]);

  const handleSaveWebsiteContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(cmsForm);
    showToast('Konten website berhasil disimpan dan diperbarui secara live!');
  };

  // Open Portfolio Modal & sync image URL
  const handleOpenPortfolioModal = (mode: 'add' | 'edit', item?: PortfolioItem) => {
    if (mode === 'edit' && item) {
      setPortfolioCoverUrl(item.coverImage);
      setPortfolioModal({ open: true, mode: 'edit', data: item });
    } else {
      setPortfolioCoverUrl('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop');
      setPortfolioModal({ open: true, mode: 'add' });
    }
  };

  // Local File Upload Handler for Portfolio Cover Image
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPortfolioCoverUrl(reader.result as string);
          showToast('Gambar sampul dari file lokal berhasil dimuat!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col bg-slate-900 font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-indigo-500/40 flex items-center gap-3 animate-fade-in text-xs font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER / BAR */}
      <header className="shrink-0 bg-slate-900 text-white border-b border-slate-800/90 px-4 sm:px-6 py-3 flex items-center justify-between shadow-md z-40">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Toggle Sidebar"
          >
            <Layers className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <Logo variant="light" size="sm" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-extrabold tracking-wider uppercase border border-indigo-500/30">
                Admin Panel CMS
              </span>
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Sync
              </span>
            </div>
          </div>
        </div>

        {/* Global Search & Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Return to Public Web */}
          <button
            onClick={() => navigateTo('home')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700/80 transition-all cursor-pointer shadow-sm"
            title="Buka Halaman Depan Publik"
          >
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
            <span>Lihat Website</span>
          </button>

          {/* Quick Search */}
          <div className="relative hidden lg:block w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari pesanan, klien..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/90 text-xs text-white pl-8 pr-3 py-1.5 rounded-xl border border-slate-700/80 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setNotifDrawerOpen(!notifDrawerOpen)}
              className="relative p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              title="Notifikasi"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center animate-pulse">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Notification Drawer Popover */}
            {notifDrawerOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 z-50 p-4 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-indigo-600" />
                    <h4 className="font-bold text-sm">Notifikasi Terbaru</h4>
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={() => setDeleteConfirmModal({
                        open: true,
                        type: 'clear-notifications',
                        title: 'Hapus Semua Notifikasi',
                        subtitle: 'Semua riwayat notifikasi di panel admin akan dibersihkan.'
                      })}
                      className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                    >
                      Hapus Semua
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2 scrollbar-slate">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-6">Tidak ada notifikasi baru.</p>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationAsRead(n.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                          n.read ? 'bg-slate-50 border-slate-100' : 'bg-indigo-50/60 border-indigo-100 font-medium'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-bold text-slate-900">{n.title}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                        </div>
                        <p className="text-slate-600 mt-0.5">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-purple-blue flex items-center justify-center text-white font-bold text-xs shadow-sm">
              A
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-slate-200 leading-tight">{settings.adminUsername || 'admin'}</p>
              <p className="text-[10px] text-indigo-400 font-mono font-medium">Super Admin</p>
            </div>
            <button
              onClick={logoutAdmin}
              title="Logout Admin"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE HORIZONTAL SCROLLABLE MENU (Bisa Digeser Ke Kiri/Kanan di Layar Kecil) */}
      <nav className="shrink-0 lg:hidden bg-slate-900 border-b border-slate-800 px-3 py-2 overflow-x-auto whitespace-nowrap flex items-center gap-1.5 z-30 shadow-md no-scrollbar">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'stats', label: 'Statistik', icon: TrendingUp, badge: 'NEW', badgeBg: 'bg-emerald-500/20 text-emerald-300' },
          { id: 'website-content', label: 'Konten CMS', icon: Globe, badge: 'CMS', badgeBg: 'bg-indigo-500/20 text-indigo-300' },
          { id: 'orders', label: 'Pesanan', icon: ShoppingBag, count: orders.length },
          { id: 'services', label: 'Layanan', icon: Briefcase },
          { id: 'portfolio', label: 'Portofolio', icon: FolderKanban },
          { id: 'testimonials', label: 'Testimoni', icon: MessageSquareQuote },
          { id: 'faqs', label: 'FAQ', icon: HelpCircle },
          { id: 'inbox', label: 'Inbox', icon: Inbox, count: unreadMessagesCount, countBg: 'bg-emerald-500 text-white' },
          { id: 'settings', label: 'Pengaturan', icon: Settings }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => selectTab(item.id as AdminTab)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-gradient-purple-blue text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
              {item.badge && (
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${item.badgeBg}`}>
                  {item.badge}
                </span>
              )}
              {item.count !== undefined && item.count > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${item.countBg || 'bg-indigo-500/30 text-indigo-300'}`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* MAIN DUAL-PANE LAYOUT: FIXED LEFT SIDEBAR + SCROLLABLE RIGHT CONTENT */}
      <div className="flex-1 min-h-0 flex overflow-hidden relative">
        
        {/* MOBILE BACKDROP OVERLAY */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 animate-fade-in"
          />
        )}

        {/* STATIONARY SIDEBAR NAVIGATION */}
        <aside
          className={`h-full overflow-y-auto shrink-0 bg-slate-900 text-slate-300 w-72 lg:w-64 border-r border-slate-800/90 transition-all duration-300 flex flex-col justify-between fixed lg:static inset-y-0 left-0 z-50 lg:z-auto scrollbar-dark shadow-xl lg:shadow-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:-ml-64'
          }`}
        >
          <div className="p-3.5 space-y-4">
            
            {/* Group 1: Ringkasan & Analitik */}
            <div>
              <div className="flex items-center justify-between px-3 mb-1.5">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-montserrat">
                  Ringkasan & Analitik
                </span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                {/* TAB 1: OVERVIEW */}
                <button
                  onClick={() => selectTab('overview')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    activeTab === 'overview'
                      ? 'bg-gradient-purple-blue text-white shadow-md shadow-indigo-900/30'
                      : 'hover:bg-slate-800/90 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className={`w-4 h-4 ${activeTab === 'overview' ? 'text-white' : 'text-slate-400'}`} />
                    <span>Overview Utama</span>
                  </div>
                </button>

                {/* TAB 2: STATISTIK (NEW) */}
                <button
                  onClick={() => selectTab('stats')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    activeTab === 'stats'
                      ? 'bg-gradient-purple-blue text-white shadow-md shadow-indigo-900/30'
                      : 'hover:bg-slate-800/90 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <TrendingUp className={`w-4 h-4 ${activeTab === 'stats' ? 'text-white' : 'text-emerald-400'}`} />
                    <span>Statistik & Analisis</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-extrabold font-mono">
                    NEW
                  </span>
                </button>
              </div>
            </div>

            {/* Group 2: Transaksi & Order */}
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 mb-1.5 font-montserrat">
                Manajemen Pesanan
              </div>

              <div className="space-y-1">
                {/* TAB 4: ORDERS */}
                <button
                  onClick={() => selectTab('orders')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    activeTab === 'orders'
                      ? 'bg-gradient-purple-blue text-white shadow-md shadow-indigo-900/30'
                      : 'hover:bg-slate-800/90 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className={`w-4 h-4 ${activeTab === 'orders' ? 'text-white' : 'text-indigo-400'}`} />
                    <span>Pesanan & Order</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black font-mono ${
                    activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-indigo-500/20 text-indigo-300'
                  }`}>
                    {orders.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Group 3: CMS & Konten Publik */}
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 mb-1.5 font-montserrat">
                Konten Website (CMS)
              </div>

              <div className="space-y-1">
                {/* TAB 3: KONTEN WEBSITE CMS */}
                <button
                  onClick={() => selectTab('website-content')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    activeTab === 'website-content'
                      ? 'bg-gradient-purple-blue text-white shadow-md shadow-indigo-900/30'
                      : 'hover:bg-slate-800/90 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className={`w-4 h-4 ${activeTab === 'website-content' ? 'text-white' : 'text-blue-400'}`} />
                    <span>Edit Konten Beranda</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[9px] font-extrabold">
                    CMS
                  </span>
                </button>

                {/* TAB 5: SERVICES */}
                <button
                  onClick={() => selectTab('services')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    activeTab === 'services'
                      ? 'bg-gradient-purple-blue text-white shadow-md shadow-indigo-900/30'
                      : 'hover:bg-slate-800/90 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Briefcase className={`w-4 h-4 ${activeTab === 'services' ? 'text-white' : 'text-slate-400'}`} />
                    <span>Katalog Layanan</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{services.length}</span>
                </button>

                {/* TAB 6: PORTFOLIO */}
                <button
                  onClick={() => selectTab('portfolio')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    activeTab === 'portfolio'
                      ? 'bg-gradient-purple-blue text-white shadow-md shadow-indigo-900/30'
                      : 'hover:bg-slate-800/90 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FolderKanban className={`w-4 h-4 ${activeTab === 'portfolio' ? 'text-white' : 'text-slate-400'}`} />
                    <span>Portofolio Karya</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{portfolio.length}</span>
                </button>

                {/* TAB 7: TESTIMONIALS */}
                <button
                  onClick={() => selectTab('testimonials')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    activeTab === 'testimonials'
                      ? 'bg-gradient-purple-blue text-white shadow-md shadow-indigo-900/30'
                      : 'hover:bg-slate-800/90 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquareQuote className={`w-4 h-4 ${activeTab === 'testimonials' ? 'text-white' : 'text-slate-400'}`} />
                    <span>Testimoni Klien</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{testimonials.length}</span>
                </button>

                {/* TAB 8: FAQS */}
                <button
                  onClick={() => selectTab('faqs')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    activeTab === 'faqs'
                      ? 'bg-gradient-purple-blue text-white shadow-md shadow-indigo-900/30'
                      : 'hover:bg-slate-800/90 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className={`w-4 h-4 ${activeTab === 'faqs' ? 'text-white' : 'text-slate-400'}`} />
                    <span>Kelola FAQ Tanya Jawab</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{faqs.length}</span>
                </button>
              </div>
            </div>

            {/* Group 4: Komunikasi & Pengaturan */}
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 mb-1.5 font-montserrat">
                Komunikasi & Sistem
              </div>

              <div className="space-y-1">
                {/* TAB 9: INBOX */}
                <button
                  onClick={() => selectTab('inbox')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    activeTab === 'inbox'
                      ? 'bg-gradient-purple-blue text-white shadow-md shadow-indigo-900/30'
                      : 'hover:bg-slate-800/90 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Inbox className={`w-4 h-4 ${activeTab === 'inbox' ? 'text-white' : 'text-emerald-400'}`} />
                    <span>Inbox Pesan Publik</span>
                  </div>
                  {unreadMessagesCount > 0 ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black animate-pulse">
                      {unreadMessagesCount} baru
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500">{messages.length}</span>
                  )}
                </button>

                {/* TAB 10: SETTINGS */}
                <button
                  onClick={() => selectTab('settings')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-gradient-purple-blue text-white shadow-md shadow-indigo-900/30'
                      : 'hover:bg-slate-800/90 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-white' : 'text-slate-400'}`} />
                    <span>Pengaturan Sistem</span>
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* Sidebar Bottom Footer Info */}
          <div className="p-3.5 border-t border-slate-800/90 bg-slate-950/70 text-[11px] text-slate-400 flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-300 font-mono text-[10px]">JASKIS Core v2.9</p>
              <p className="text-[9px] text-slate-500">Auto-saved to Storage</p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[9px] flex items-center gap-1 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online
            </span>
          </div>
        </aside>

        {/* RIGHT CONTENT AREA (INDEPENDENT SMOOTH SCROLL) */}
        <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-100/90 scrollbar-slate relative">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Ringkasan Performa & Overview
                  </h1>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    Ringkasan cepat aktivitas pesanan, omset, dan navigasi CMS JASKIS.
                  </p>
                </div>
                <button
                  onClick={openAddOrderModal}
                  className="py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-purple-blue hover:opacity-95 shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Pesanan Manual</span>
                </button>
              </div>

              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Pesanan</p>
                    <h3 className="text-2xl font-black text-slate-900 mt-1 font-mono">{totalOrders}</h3>
                    <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> +18% bulan ini
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Sedang Dikerjakan</p>
                    <h3 className="text-2xl font-black text-amber-600 mt-1 font-mono">{activeOrdersCount}</h3>
                    <p className="text-[11px] text-slate-600 font-medium mt-1">
                      Target deadline tepat waktu
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Order Selesai</p>
                    <h3 className="text-2xl font-black text-emerald-600 mt-1 font-mono">{completedOrdersCount}</h3>
                    <p className="text-[11px] text-emerald-600 font-bold mt-1">
                      100% garansi revisi
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Omset</p>
                    <h3 className="text-xl font-black text-slate-900 mt-1 font-mono">
                      Rp {totalRevenue.toLocaleString('id-ID')}
                    </h3>
                    <p className="text-[11px] text-indigo-600 font-bold mt-1">
                      Avg: Rp {avgOrderValue.toLocaleString('id-ID')} / order
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* SUMMARY CHART: RECHARTS ORDER STATUS DISTRIBUTION */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-indigo-600" />
                        <span>Distribusi Status Pesanan (Order Status Distribution)</span>
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                        Live Recharts
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Visualisasi perbandingan pesanan dalam antrean pending, proses pengerjaan aktif, hingga pesanan tuntas.
                    </p>
                  </div>

                  {/* Quick Summary Pill Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-blue-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                      <span>Pending: {pendingOrdersTotal}</span>
                      <span className="text-[10px] opacity-75">({totalOrders > 0 ? Math.round((pendingOrdersTotal / totalOrders) * 100) : 0}%)</span>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>Dikerjakan: {inProgressOrdersTotal}</span>
                      <span className="text-[10px] opacity-75">({totalOrders > 0 ? Math.round((inProgressOrdersTotal / totalOrders) * 100) : 0}%)</span>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>Selesai: {completedOrdersTotal}</span>
                      <span className="text-[10px] opacity-75">({totalOrders > 0 ? Math.round((completedOrdersTotal / totalOrders) * 100) : 0}%)</span>
                    </div>
                  </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* 1. BarChart: Detailed Distribution per Status */}
                  <div className="lg:col-span-7 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        Volume per Tahapan Pengerjaan
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">Total {totalOrders} Pesanan</span>
                    </div>

                    <div className="h-56 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={orderStatusDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <XAxis
                            dataKey="name"
                            stroke="#64748b"
                            fontSize={11}
                            tickLine={false}
                            axisLine={{ stroke: '#cbd5e1' }}
                          />
                          <YAxis
                            stroke="#64748b"
                            fontSize={11}
                            allowDecimals={false}
                            tickLine={false}
                            axisLine={{ stroke: '#cbd5e1' }}
                          />
                          <RechartsTooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1 border border-slate-800">
                                    <p className="font-extrabold text-indigo-300">{data.fullName}</p>
                                    <p className="text-slate-200">
                                      Jumlah Pesanan: <strong className="text-white font-mono">{data.count}</strong>
                                    </p>
                                    <p className="text-slate-400 text-[10px]">
                                      Porsi: <strong className="text-amber-400 font-mono">{data.percentage}%</strong> dari total
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                            {orderStatusDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 2. Donut PieChart & Interactive Legend */}
                  <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-100 h-full">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        Komparasi Pending vs Selesai
                      </span>
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        Rasio Status
                      </span>
                    </div>

                    <div className="h-40 w-full relative flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={groupedStatusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={68}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {groupedStatusData.map((entry, index) => (
                              <Cell key={`grouped-cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-xl text-xs space-y-0.5 border border-slate-800">
                                    <p className="font-bold text-indigo-300">{data.name}</p>
                                    <p className="text-slate-200">Total: <strong className="text-white font-mono">{data.value}</strong> order ({data.percentage}%)</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      {/* Centered Total Label */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xl font-black text-slate-900 font-mono leading-none">{totalOrders}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
                      </div>
                    </div>

                    {/* Interactive Legend / Filter Links */}
                    <div className="space-y-1.5 pt-2">
                      {groupedStatusData.map(group => (
                        <div
                          key={group.name}
                          className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-white transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: group.color }} />
                            <span className="font-bold text-slate-700 text-[11px]">{group.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-900 text-xs">{group.value}</span>
                            <span className="text-[10px] font-mono text-slate-400 bg-slate-200/70 px-1.5 py-0.5 rounded">
                              {group.percentage}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status Quick Filter Chips */}
                <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <Search className="w-3.5 h-3.5" /> Filter Cepat Pesanan:
                  </span>
                  {orderStatusDistribution.map(item => (
                    <button
                      key={item.status}
                      onClick={() => {
                        setOrderStatusFilter(item.status);
                        setActiveTab('orders');
                      }}
                      className="px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1.5 hover:scale-105 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80"
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.fullName}</span>
                      <span className="font-mono text-[9px] bg-white px-1.5 py-0.2 rounded text-slate-800 shadow-2xs">
                        {item.count}
                      </span>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setOrderStatusFilter('ALL');
                      setActiveTab('orders');
                    }}
                    className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 cursor-pointer ml-auto"
                  >
                    Buka Tabel Pesanan →
                  </button>
                </div>
              </div>

              {/* Quick Actions Shortcuts */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <span>Akses Cepat Pengelolaan Website</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab('stats')}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                      <span className="text-indigo-600 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                    <p className="font-bold text-sm text-slate-900">Lihat Grafik Statistik</p>
                    <p className="text-xs text-slate-500 mt-0.5">Analisis tren penjualan & kategori terlaris</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('website-content')}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Globe className="w-5 h-5 text-indigo-600" />
                      <span className="text-indigo-600 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                    <p className="font-bold text-sm text-slate-900">Edit Konten Website (CMS)</p>
                    <p className="text-xs text-slate-500 mt-0.5">Ubah headline, banner promo, & teks landing page</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('portfolio')}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <FolderKanban className="w-5 h-5 text-amber-600" />
                      <span className="text-indigo-600 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                    <p className="font-bold text-sm text-slate-900">Edit Sampul Portofolio</p>
                    <p className="text-xs text-slate-500 mt-0.5">Upload atau ganti foto sampul portofolio karya</p>
                  </button>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-base">Pesanan Terbaru Masuk</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Lihat Semua Order</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                        <th className="pb-3 px-2">ID</th>
                        <th className="pb-3 px-2">Klien & Kampus</th>
                        <th className="pb-3 px-2">Layanan</th>
                        <th className="pb-3 px-2">Deadline</th>
                        <th className="pb-3 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.slice(0, 5).map(o => (
                        <tr key={o.id} className="hover:bg-slate-50">
                          <td className="py-3 px-2 font-mono font-bold text-indigo-600">{o.id}</td>
                          <td className="py-3 px-2">
                            <span className="font-bold text-slate-900 block">{o.clientName}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{o.university || 'Umum'}</span>
                          </td>
                          <td className="py-3 px-2 font-medium">{o.serviceCategory}</td>
                          <td className="py-3 px-2 font-bold text-rose-600">{o.deadline}</td>
                          <td className="py-3 px-2">
                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STATISTIK & ANALISIS (NEW) */}
          {activeTab === 'stats' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                    <span>Statistik & Analisis Bisnis JASKIS</span>
                  </h1>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    Laporan grafik pendapatan bulanan, distribusi kategori layanan, dan volume pemesanan kampus.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                    Sistem Terorganisir Live
                  </span>
                </div>
              </div>

              {/* Analytics Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Pendapatan</p>
                  <h3 className="text-2xl font-black text-slate-900 mt-1 font-mono">
                    Rp {totalRevenue.toLocaleString('id-ID')}
                  </h3>
                  <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Target Metrik Tercapai
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rata-rata Transaksi</p>
                  <h3 className="text-2xl font-black text-indigo-600 mt-1 font-mono">
                    Rp {avgOrderValue.toLocaleString('id-ID')}
                  </h3>
                  <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                    Average Order Value
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kepuasan Klien</p>
                  <h3 className="text-2xl font-black text-amber-500 mt-1 font-mono">98.5%</h3>
                  <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    Berdasarkan Ulasan
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Penyelesaian On-Time</p>
                  <h3 className="text-2xl font-black text-emerald-600 mt-1 font-mono">99.2%</h3>
                  <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Garansi Tepat Waktu
                  </span>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Monthly Revenue Chart */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">Tren Penjualan Bulanan (Rp)</h3>
                      <p className="text-xs text-slate-500 font-medium">Estimasi omset bulanan pengerjaan tugas</p>
                    </div>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={10} tickFormatter={v => `${v / 1000000}M`} />
                        <RechartsTooltip
                          formatter={(value: any) => [`Rp ${Number(value).toLocaleString('id-ID')}`, 'Omset']}
                          contentStyle={{ borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}
                        />
                        <Bar dataKey="omset" fill="#6366F1" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Service Share Pie Chart */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">Distribusi Kategori Layanan</h3>
                    <p className="text-xs text-slate-500 font-medium">Persentase porsi layanan yang paling banyak dipesan</p>
                  </div>
                  <div className="h-64 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={serviceCategoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {serviceCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip contentStyle={{ borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[11px] font-bold">
                    {serviceCategoryData.map((item, idx) => (
                      <div key={item.name} className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }} />
                        <span className="text-slate-700">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* University Breakdown Table */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-extrabold text-base text-slate-900">Demografi Kampus Asal Klien Mahasiswa</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {uniDistribution.map((item, idx) => (
                    <div key={item.uni} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-xs text-slate-900">{item.uni}</p>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">Total Pesanan: {item.count} Proyek</p>
                      </div>
                      <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: `${(item.count / 30) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KONTEN WEBSITE CMS (NEW) */}
          {activeTab === 'website-content' && (
            <div className="space-y-8 animate-fade-in max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <Globe className="w-6 h-6 text-indigo-600" />
                    <span>Pengelola Konten Website (CMS)</span>
                  </h1>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    Ubah teks headline, deskripsi, banner promo, dan banner statistik yang tampil secara live di halaman utama.
                  </p>
                </div>

                <button
                  onClick={handleSaveWebsiteContent}
                  className="py-3 px-6 rounded-xl font-extrabold text-xs text-white bg-gradient-purple-blue hover:opacity-95 shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Perubahan Konten</span>
                </button>
              </div>

              <form onSubmit={handleSaveWebsiteContent} className="space-y-8">
                
                {/* 1. Hero Section CMS */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-extrabold text-base text-slate-900">Hero Section (Halaman Utama)</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Badge Teks Atas Hero</label>
                      <input
                        type="text"
                        value={cmsForm.heroBadgeText || ''}
                        onChange={e => setCmsForm({ ...cmsForm, heroBadgeText: e.target.value })}
                        placeholder="#1 Solusi Tugas Akademik Mahasiswa"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-semibold focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Judul Utama / Headline Hero</label>
                      <input
                        type="text"
                        value={cmsForm.heroHeadline || ''}
                        onChange={e => setCmsForm({ ...cmsForm, heroHeadline: e.target.value })}
                        placeholder="Solusi Tugasmu, Waktumu Jadi Lebih Berarti"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-extrabold focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Subheadline / Deskripsi Ringkas</label>
                      <textarea
                        rows={3}
                        value={cmsForm.heroSubheadline || ''}
                        onChange={e => setCmsForm({ ...cmsForm, heroSubheadline: e.target.value })}
                        placeholder="Layanan bantuan pengerjaan tugas akademik..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Announcement Promo Banner CMS */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <MessageSquareText className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-extrabold text-base text-slate-900">Banner Pengumuman / Promo Running Bar</h3>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cmsForm.promoBannerActive ?? true}
                        onChange={e => setCmsForm({ ...cmsForm, promoBannerActive: e.target.checked })}
                        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <span className="text-xs font-bold text-slate-700">Tampilkan Banner Promo Atas Header</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Teks Banner Promo</label>
                    <input
                      type="text"
                      value={cmsForm.promoBannerText || ''}
                      onChange={e => setCmsForm({ ...cmsForm, promoBannerText: e.target.value })}
                      placeholder="⚡ PROMO SPESIAL: Diskon 15% untuk Pengerjaan Jurnal & Skripsi!"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* 3. Homepage Stats Counter CMS */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <Award className="w-5 h-5 text-amber-500" />
                    <h3 className="font-extrabold text-base text-slate-900">Angka Statistik Banner Homepage</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Total Proyek Selesai</label>
                      <input
                        type="text"
                        value={cmsForm.statsCompletedCount || ''}
                        onChange={e => setCmsForm({ ...cmsForm, statsCompletedCount: e.target.value })}
                        placeholder="700+"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold font-mono text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Tingkat Kepuasan</label>
                      <input
                        type="text"
                        value={cmsForm.statsSatisfactionRate || ''}
                        onChange={e => setCmsForm({ ...cmsForm, statsSatisfactionRate: e.target.value })}
                        placeholder="98%"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold font-mono text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Waktu Respon Admin</label>
                      <input
                        type="text"
                        value={cmsForm.statsResponseTime || ''}
                        onChange={e => setCmsForm({ ...cmsForm, statsResponseTime: e.target.value })}
                        placeholder="< 10 Menit"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold font-mono text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Jumlah Klien Mahasiswa</label>
                      <input
                        type="text"
                        value={cmsForm.statsActiveClients || ''}
                        onChange={e => setCmsForm({ ...cmsForm, statsActiveClients: e.target.value })}
                        placeholder="500+ Klien"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold font-mono text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. CTA Section CMS */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <MessageSquareQuote className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-extrabold text-base text-slate-900">Call To Action (CTA Banner Bawah)</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Judul Banner CTA</label>
                      <input
                        type="text"
                        value={cmsForm.ctaHeadline || ''}
                        onChange={e => setCmsForm({ ...cmsForm, ctaHeadline: e.target.value })}
                        placeholder="Punya Tugas? Mari Konsultasikan Sekarang."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-extrabold focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Subtitle CTA</label>
                      <textarea
                        rows={2}
                        value={cmsForm.ctaSubheadline || ''}
                        onChange={e => setCmsForm({ ...cmsForm, ctaSubheadline: e.target.value })}
                        placeholder="Tim profesional JASKIS siap membantu pengerjaan..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm text-white bg-gradient-purple-blue hover:opacity-95 shadow-xl transition-all cursor-pointer"
                  >
                    Simpan Semua Perubahan Konten
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Manajemen Pesanan & Order
                  </h1>
                  <p className="text-xs text-slate-600 font-medium">
                    Kelola data pesanan, perbarui status timeline, dan hubungi klien via WhatsApp.
                  </p>
                </div>

                <button
                  onClick={openAddOrderModal}
                  className="py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-purple-blue hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Pesanan Baru</span>
                </button>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {[
                  { id: 'ALL', label: 'Semua Status', count: orders.length },
                  { id: 'Pesanan Diterima', label: 'Pesanan Diterima', count: orders.filter(o => o.status === 'Pesanan Diterima').length },
                  { id: 'Brief Dikonfirmasi', label: 'Brief Dikonfirmasi', count: orders.filter(o => o.status === 'Brief Dikonfirmasi').length },
                  { id: 'Pembayaran Dikonfirmasi', label: 'Pembayaran Valid', count: orders.filter(o => o.status === 'Pembayaran Dikonfirmasi').length },
                  { id: 'Sedang Dikerjakan', label: 'Sedang Dikerjakan', count: orders.filter(o => o.status === 'Sedang Dikerjakan').length },
                  { id: 'Review', label: 'Review', count: orders.filter(o => o.status === 'Review').length },
                  { id: 'Selesai', label: 'Selesai', count: orders.filter(o => o.status === 'Selesai').length },
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setOrderStatusFilter(s.id)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                      orderStatusFilter === s.id
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      orderStatusFilter === s.id ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {s.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Orders Data Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase tracking-wider">
                        <th className="py-3.5 px-4">ID Pesanan</th>
                        <th className="py-3.5 px-4">Klien & Kampus</th>
                        <th className="py-3.5 px-4">Layanan</th>
                        <th className="py-3.5 px-4">Deadline</th>
                        <th className="py-3.5 px-4">Biaya</th>
                        <th className="py-3.5 px-4">Status & Progress</th>
                        <th className="py-3.5 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                            Tidak ada pesanan yang sesuai dengan pencarian/filter.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map(o => (
                          <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">
                              {o.id}
                              <span className="block text-[10px] text-slate-400 font-normal">{o.orderDate}</span>
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="font-bold text-slate-900 block">{o.clientName} ({o.gender})</span>
                              <span className="text-[10px] text-slate-500 font-mono">{o.phone}</span>
                              <span className="block text-[10px] text-indigo-600 font-semibold">{o.university}</span>
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-slate-800">{o.serviceCategory}</span>
                            </td>

                            <td className="py-3.5 px-4 font-bold text-rose-600">
                              {o.deadline}
                            </td>

                            <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                              Rp {(o.totalPrice || 0).toLocaleString('id-ID')}
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="space-y-1.5">
                                <select
                                  value={o.status}
                                  onChange={e => updateOrder(o.id, { status: e.target.value as OrderStatus })}
                                  className="text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
                                >
                                  <option value="Pesanan Diterima">1. Pesanan Diterima</option>
                                  <option value="Brief Dikonfirmasi">2. Brief Dikonfirmasi</option>
                                  <option value="Pembayaran Dikonfirmasi">3. Pembayaran Dikonfirmasi</option>
                                  <option value="Sedang Dikerjakan">4. Sedang Dikerjakan</option>
                                  <option value="Review">5. Review</option>
                                  <option value="Selesai">6. Selesai</option>
                                </select>

                                <div className="flex items-center gap-2">
                                  <div className="w-20 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                    <div
                                      className="bg-emerald-500 h-full rounded-full"
                                      style={{ width: `${o.progress}%` }}
                                    />
                                  </div>
                                  <span className="text-[10px] font-mono text-slate-500">{o.progress}%</span>
                                </div>
                              </div>
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={generateWhatsAppLink(settings.whatsappNumber, getWhatsAppOrderMessage(o))}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                                  title="Chat WA Klien"
                                >
                                  <MessageCircle className="w-4 h-4" />
                                </a>

                                <button
                                  onClick={() => openEditOrderModal(o)}
                                  className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors cursor-pointer"
                                  title="Edit Order / Progress"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>

                                <button
                                  onClick={() => setDeleteConfirmModal({
                                    open: true,
                                    type: 'order',
                                    id: o.id,
                                    title: `Pesanan #${o.id}`,
                                    subtitle: `Klien: ${o.clientName} • Layanan: ${o.serviceCategory} • Deadline: ${o.deadline}`
                                  })}
                                  className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                                  title="Hapus Order"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Kelola Layanan Akademik
                  </h1>
                  <p className="text-xs text-slate-600 font-medium">
                    Atur daftar katalog layanan, harga, dan deskripsi pengerjaan.
                  </p>
                </div>

                <button
                  onClick={() => setServiceModal({ open: true, mode: 'add' })}
                  className="py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-purple-blue hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Layanan Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(s => (
                  <div key={s.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                          {s.category}
                        </span>
                        <span className="text-xs font-bold font-mono text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                          {s.priceRange}
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-slate-900 mb-2">{s.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">{s.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        onClick={() => setServiceModal({ open: true, mode: 'edit', data: s })}
                        className="p-2 rounded-xl text-indigo-600 hover:bg-indigo-50 font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirmModal({
                          open: true,
                          type: 'service',
                          id: s.id,
                          title: s.title,
                          subtitle: `Kategori: ${s.category} • Kisaran: ${s.priceRange}`
                        })}
                        className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PORTFOLIO MANAGEMENT (ENHANCED COVER IMAGE EDITING) */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <FolderKanban className="w-6 h-6 text-indigo-600" />
                    <span>Kelola Portofolio Hasil Pengerjaan</span>
                  </h1>
                  <p className="text-xs text-slate-600 font-medium">
                    Admin dapat bebas mengubah karya, judul, kampus, serta memilih/upload foto sampul secara langsung.
                  </p>
                </div>

                <button
                  onClick={() => handleOpenPortfolioModal('add')}
                  className="py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-purple-blue hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Portofolio Baru</span>
                </button>
              </div>

              {/* Portfolio Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolio.map(p => (
                  <div key={p.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between group">
                    <div>
                      {/* Cover Photo */}
                      <div className="relative h-48 bg-slate-100 overflow-hidden">
                        <img
                          src={p.coverImage}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold">
                          {p.category}
                        </div>
                        <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg">
                          {p.date}
                        </span>
                      </div>

                      <div className="p-5">
                        <span className="text-[11px] font-bold text-indigo-600 font-mono block mb-1">
                          🎓 {p.clientUni}
                        </span>
                        <h3 className="text-base font-extrabold text-slate-900 mb-2 leading-snug">
                          {p.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-3 mb-3 leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-500">★ {p.rating || 5.0} / 5.0</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenPortfolioModal('edit', p)}
                          className="p-2 rounded-xl text-indigo-600 hover:bg-indigo-50 font-bold text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit Sampul
                        </button>
                        <button
                          onClick={() => setDeleteConfirmModal({
                            open: true,
                            type: 'portfolio',
                            id: p.id,
                            title: p.title,
                            subtitle: `Asal Kampus: ${p.clientUni} • Kategori: ${p.category}`
                          })}
                          className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50 cursor-pointer"
                          title="Hapus Portofolio"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Kelola Ulasan & Testimoni Klien
                  </h1>
                  <p className="text-xs text-slate-600 font-medium">
                    Testimoni asli kepuasan mahasiswa yang pernah menggunakan layanan JASKIS.
                  </p>
                </div>

                <button
                  onClick={() => setTestimonialModal({ open: true, mode: 'add' })}
                  className="py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-purple-blue hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Testimoni</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map(t => (
                  <div key={t.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-white ${
                            t.avatarColor || 'bg-indigo-600'
                          }`}>
                            {t.clientName.substring(0, 1)}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{t.clientName}</h4>
                            <p className="text-[11px] text-slate-500">{t.university}</p>
                          </div>
                        </div>

                        <span className="text-xs font-bold text-amber-500">★ {t.rating}</span>
                      </div>

                      <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-bold mb-3">
                        Layanan: {t.serviceName}
                      </div>

                      <p className="text-xs text-slate-600 italic leading-relaxed mb-4">
                        "{t.content}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        Verified Reviewer
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setTestimonialModal({ open: true, mode: 'edit', data: t })}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmModal({
                            open: true,
                            type: 'testimonial',
                            id: t.id,
                            title: t.clientName,
                            subtitle: `Kampus: ${t.university} • Layanan: ${t.serviceName}`
                          })}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                          title="Hapus Testimoni"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: FAQS */}
          {activeTab === 'faqs' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Kelola FAQ Pertanyaan Umum
                  </h1>
                  <p className="text-xs text-slate-600 font-medium">
                    Sunting daftar pertanyaan yang paling sering ditanyakan oleh mahasiswa.
                  </p>
                </div>

                <button
                  onClick={() => setFaqModal({ open: true, mode: 'add' })}
                  className="py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-purple-blue hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah FAQ Baru</span>
                </button>
              </div>

              <div className="space-y-4">
                {faqs.map(f => (
                  <div key={f.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                        {f.category}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base">{f.question}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{f.answer}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => setFaqModal({ open: true, mode: 'edit', data: f })}
                        className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmModal({
                          open: true,
                          type: 'faq',
                          id: f.id,
                          title: f.question,
                          subtitle: `Kategori: ${f.category}`
                        })}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                        title="Hapus FAQ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: INBOX */}
          {activeTab === 'inbox' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Inbox Pesan Pertanyaan ({messages.length})
                  </h1>
                  <p className="text-xs text-slate-600 font-medium">
                    Pesan konsultasi yang dikirimkan langsung melalui form Kontak publik.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 font-medium text-xs">
                    Belum ada pesan masuk di Inbox.
                  </div>
                ) : (
                  messages.map(m => (
                    <div
                      key={m.id}
                      className={`p-6 rounded-2xl border transition-all space-y-3 ${
                        m.read
                          ? 'bg-white border-slate-200'
                          : 'bg-indigo-50/40 border-indigo-200 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${m.read ? 'bg-slate-300' : 'bg-indigo-600 animate-pulse'}`} />
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                              {m.name}
                              {!m.read && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-indigo-600 text-white">
                                  Baru
                                </span>
                              )}
                            </h4>
                            <p className="text-[11px] text-slate-500 font-mono">{m.email} • {m.phone}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">{m.date}</span>
                      </div>

                      <div className="px-3 py-1 bg-slate-100/80 rounded-lg text-xs text-slate-700 font-medium w-fit">
                        Layanan dicari: <strong className="text-indigo-600">{m.service}</strong>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed bg-white/80 p-3.5 rounded-xl border border-slate-100">
                        "{m.message}"
                      </p>

                      <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                        <div>
                          {!m.read && (
                            <button
                              onClick={() => {
                                markMessageAsRead(m.id);
                                showToast('Pesan ditandai telah dibaca.');
                              }}
                              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                            >
                              Tandai Dibaca
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDeleteConfirmModal({
                              open: true,
                              type: 'message',
                              id: m.id,
                              title: m.name,
                              subtitle: `Email: ${m.email} • Layanan: ${m.service}`
                            })}
                            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Hapus pesan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <a
                            href={generateWhatsAppLink(m.phone, `Halo ${m.name}, menindaklanjuti pesan konsultasi Anda di JASKIS mengenai ${m.service}...`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs hover:bg-emerald-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <MessageCircle className="w-3.5 h-3.5" /> Balas via WA
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 10: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Pengaturan Sistem & Admin
                </h1>
                <p className="text-xs text-slate-600 font-medium">
                  Atur kontak resmi WhatsApp CS, email, alamat kantor, serta username/password login admin.
                </p>
              </div>

              <form onSubmit={e => {
                e.preventDefault();
                updateSettings(cmsForm);
                showToast('Pengaturan sistem berhasil disimpan!');
              }} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                
                <div className="space-y-4">
                  <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
                    Kontak & Informasi Resmi JASKIS
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp CS</label>
                      <input
                        type="text"
                        value={cmsForm.whatsappNumber}
                        onChange={e => setCmsForm({ ...cmsForm, whatsappNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold font-mono text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Resmi</label>
                      <input
                        type="email"
                        value={cmsForm.email}
                        onChange={e => setCmsForm({ ...cmsForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Instagram Handle</label>
                      <input
                        type="text"
                        value={cmsForm.instagramHandle}
                        onChange={e => setCmsForm({ ...cmsForm, instagramHandle: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Telegram Channel / CS</label>
                      <input
                        type="text"
                        value={cmsForm.telegramNumber}
                        onChange={e => setCmsForm({ ...cmsForm, telegramNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Operasional</label>
                    <input
                      type="text"
                      value={cmsForm.address}
                      onChange={e => setCmsForm({ ...cmsForm, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
                    Kredensial Login Super Admin
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Username Admin</label>
                      <input
                        type="text"
                        value={cmsForm.adminUsername}
                        onChange={e => setCmsForm({ ...cmsForm, adminUsername: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold font-mono text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Password Admin</label>
                      <input
                        type="text"
                        value={cmsForm.adminPasswordHash}
                        onChange={e => setCmsForm({ ...cmsForm, adminPasswordHash: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold font-mono text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl font-extrabold text-xs text-white bg-gradient-purple-blue hover:opacity-95 shadow-md cursor-pointer"
                  >
                    Simpan Perubahan Pengaturan
                  </button>
                </div>

              </form>

              {/* SINKRONISASI DATA CARD */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Status Sinkronisasi & Penyimpanan Data
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-roboto">
                  Semua data (Pesanan, Portofolio, Layanan, Testimoni, FAQ, Klien, Pesan Inbox, dan Pengaturan) tersinkronisasi otomatis secara real-time ke penyimpanan browser (LocalStorage) dan terhubung timbal balik antara halaman publik dan panel admin.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-lg font-black font-montserrat text-indigo-600">{orders.length}</p>
                    <p className="text-[10px] font-bold text-slate-500 font-poppins">Total Pesanan</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-lg font-black font-montserrat text-indigo-600">{clients.length}</p>
                    <p className="text-[10px] font-bold text-slate-500 font-poppins">Total Klien</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-lg font-black font-montserrat text-indigo-600">{services.length}</p>
                    <p className="text-[10px] font-bold text-slate-500 font-poppins">Layanan Aktif</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-lg font-black font-montserrat text-indigo-600">{portfolio.length}</p>
                    <p className="text-[10px] font-bold text-slate-500 font-poppins">Portofolio Karya</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Reset Data Demo ke Awal</p>
                    <p className="text-[11px] text-slate-500">Kembalikan data ke struktur bawaan awal bila ingin testing ulang.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmModal({
                      open: true,
                      type: 'reset-data',
                      title: 'Reset Seluruh Data Demo ke Awal',
                      subtitle: 'Perhatian: Tindakan ini akan mengembalikan data pesanan, katalog layanan, portofolio, dan pengaturan ke data awal bawaan.'
                    })}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer shrink-0"
                  >
                    Reset ke Data Bawaan
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL: ORDER ADD / EDIT - MATCHING EXACT DESIGN IN IMAGE */}
      {orderModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-[28px] max-w-md sm:max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8 relative">
            <button
              type="button"
              onClick={() => setOrderModal({ open: false, mode: 'add' })}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6 pr-8">
              {orderModal.mode === 'add' ? 'Tambah Pesanan Baru' : `Edit Pesanan ${orderModal.data?.id}`}
            </h3>

            <form onSubmit={handleSaveOrder} className="space-y-6">
              
              {/* STATUS PESANAN */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-2">
                  Status Pesanan
                </label>
                <div className="relative">
                  <select
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value as OrderStatus)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-900 bg-white text-sm font-semibold text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer pr-10"
                  >
                    <option value="Sedang Dikerjakan">Sedang Dikerjakan</option>
                    <option value="Pesanan Diterima">Pesanan Diterima</option>
                    <option value="Brief Dikonfirmasi">Brief Dikonfirmasi</option>
                    <option value="Pembayaran Dikonfirmasi">Pembayaran Dikonfirmasi</option>
                    <option value="Review">Review</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-800">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              {/* PROGRESS PENGERJAAN */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold text-slate-800">
                    Progress Pengerjaan ({editProgress}%)
                  </label>
                </div>

                <div className="relative py-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={editProgress}
                    onChange={e => setEditProgress(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
                  />
                </div>

                {/* Quick Presets */}
                <div className="flex items-center justify-between gap-1.5 pt-1">
                  {[0, 25, 50, 65, 75, 100].map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setEditProgress(p)}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold transition-all cursor-pointer ${
                        editProgress === p
                          ? 'bg-blue-600 text-white shadow-md scale-105'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {p}%
                    </button>
                  ))}
                </div>
              </div>

              {/* OPTIONAL EXPANDABLE DETAILS EDITING */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowDetailOrderFields(!showDetailOrderFields)}
                  className="w-full py-1.5 flex items-center justify-between text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>{showDetailOrderFields ? 'Sembunyikan Detail Data Klien' : 'Edit Detail Klien, Kontak & Brief'}</span>
                  </span>
                  <span className="text-[10px]">{showDetailOrderFields ? '▲' : '▼'}</span>
                </button>

                {showDetailOrderFields && (
                  <div className="mt-3 space-y-3 pt-3 border-t border-slate-100 text-left animate-fade-in">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Nama Klien *</label>
                        <input
                          type="text"
                          name="clientName"
                          defaultValue={orderModal.data?.clientName || ''}
                          placeholder="Nama Mahasiswa"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Jenis Kelamin</label>
                        <select
                          name="gender"
                          defaultValue={orderModal.data?.gender || 'Pria'}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-900 font-medium"
                        >
                          <option value="Pria">Pria</option>
                          <option value="Wanita">Wanita</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Kampus</label>
                        <input
                          type="text"
                          name="university"
                          defaultValue={orderModal.data?.university || ''}
                          placeholder="Univ Brawijaya"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">No. WhatsApp *</label>
                        <input
                          type="text"
                          name="phone"
                          defaultValue={orderModal.data?.phone || ''}
                          placeholder="0812345678"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Kategori Layanan *</label>
                        <select
                          name="serviceCategory"
                          defaultValue={orderModal.data?.serviceCategory || 'Skripsi'}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-900 font-semibold"
                        >
                          <option value="Skripsi">Skripsi</option>
                          <option value="Proposal">Proposal</option>
                          <option value="Jurnal / SINTA">Jurnal / SINTA</option>
                          <option value="Makalah">Makalah</option>
                          <option value="Laporan">Laporan</option>
                          <option value="Essay">Essay</option>
                          <option value="PPT">PPT Presentasi</option>
                          <option value="Poster">Poster Ilmiah</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Deadline *</label>
                        <input
                          type="text"
                          name="deadline"
                          defaultValue={orderModal.data?.deadline || ''}
                          placeholder="25 Ags 2026"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Total Biaya (Rp)</label>
                      <input
                        type="number"
                        name="totalPrice"
                        defaultValue={orderModal.data?.totalPrice || 350000}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Brief / Ketentuan *</label>
                      <textarea
                        name="brief"
                        rows={2}
                        defaultValue={orderModal.data?.brief || ''}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* ACTION BUTTON MATCHING EXACT IMAGE COLOR & RADIUS */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl font-extrabold text-sm text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] shadow-lg shadow-blue-500/20 transition-all cursor-pointer mt-4"
              >
                Simpan Perubahan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SERVICE ADD / EDIT */}
      {serviceModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button onClick={() => setServiceModal({ open: false, mode: 'add' })} className="absolute top-5 right-5 text-slate-400 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {serviceModal.mode === 'add' ? 'Tambah Layanan Baru' : 'Edit Layanan'}
            </h3>
            <form onSubmit={e => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const data = {
                title: fd.get('title') as string,
                category: fd.get('category') as ServiceCategory || 'Skripsi',
                description: fd.get('description') as string,
                priceRange: fd.get('priceRange') as string,
                iconName: 'FileText',
                featured: true
              };
              if (serviceModal.mode === 'add') {
                createService(data);
                showToast('Layanan baru ditambahkan.');
              } else {
                updateService(serviceModal.data.id, data);
                showToast('Layanan diperbarui.');
              }
              setServiceModal({ open: false, mode: 'add' });
            }} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Layanan</label>
                <input type="text" name="title" required defaultValue={serviceModal.data?.title || ''} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 font-bold" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Pengerjaan</label>
                <textarea name="description" rows={3} required defaultValue={serviceModal.data?.description || ''} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kisaran Harga</label>
                <input type="text" name="priceRange" required defaultValue={serviceModal.data?.priceRange || 'Mulai Rp 100.000'} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-900" />
              </div>
              <button type="submit" className="w-full py-2.5 bg-gradient-purple-blue text-white rounded-xl text-xs font-bold shadow-md cursor-pointer">
                Simpan Layanan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PORTFOLIO ADD / EDIT (WITH ENHANCED COVER IMAGE EDITOR) */}
      {portfolioModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8">
            <button
              onClick={() => setPortfolioModal({ open: false, mode: 'add' })}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 mb-1">
              {portfolioModal.mode === 'add' ? 'Tambah Portofolio Karya Baru' : `Edit Portofolio ${portfolioModal.data?.title}`}
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-medium">
              Admin dapat dengan bebas mengedit judul, deskripsi, kampus, dan mengganti foto sampul (cover).
            </p>

            <form onSubmit={e => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const data = {
                title: fd.get('title') as string,
                category: fd.get('category') as ServiceCategory || 'Skripsi',
                clientUni: fd.get('clientUni') as string || 'Universitas Indonesia',
                date: fd.get('date') as string || 'Ags 2026',
                coverImage: portfolioCoverUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
                description: fd.get('description') as string,
                rating: Number(fd.get('rating') || 5.0)
              };

              if (portfolioModal.mode === 'add') {
                createPortfolio(data);
                showToast('Portofolio baru berhasil dibuat!');
              } else if (portfolioModal.data) {
                updatePortfolio(portfolioModal.data.id, data);
                showToast('Portofolio & Gambar Sampul berhasil diperbarui!');
              }
              setPortfolioModal({ open: false, mode: 'add' });
            }} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Hasil Karya / Proyek *</label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={portfolioModal.data?.title || ''}
                  placeholder="Contoh: Analisis Metode PLS-SEM pada Jurnal SINTA 3"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Layanan</label>
                  <select
                    name="category"
                    defaultValue={portfolioModal.data?.category || 'Skripsi'}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white"
                  >
                    <option value="Skripsi">Skripsi</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Jurnal / SINTA">Jurnal / SINTA</option>
                    <option value="Makalah">Makalah</option>
                    <option value="PPT">PPT Presentasi</option>
                    <option value="Poster">Poster Ilmiah</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Asal Kampus / Klien *</label>
                  <input
                    type="text"
                    name="clientUni"
                    required
                    defaultValue={portfolioModal.data?.clientUni || 'Universitas Brawijaya'}
                    placeholder="Contoh: Univ Indonesia"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium"
                  />
                </div>
              </div>

              {/* COVER IMAGE EDITOR SECTION */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-extrabold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-indigo-600" />
                    <span>Gambar Sampul (Cover Photo) Editor</span>
                  </span>
                  <span className="text-[10px] text-indigo-600 font-bold">3 Pilihan Mudah</span>
                </label>

                {/* Cover Preview */}
                <div className="relative h-36 rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                  <img
                    src={portfolioCoverUrl}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 text-white text-[10px] font-bold">
                    Preview Sampul Live
                  </div>
                </div>

                {/* Option 1: URL Input */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">A. URL Gambar Sampul (Direct Link / Unsplash / Imgur)</label>
                  <input
                    type="text"
                    value={portfolioCoverUrl}
                    onChange={e => setPortfolioCoverUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 bg-white"
                  />
                </div>

                {/* Option 2: File Upload */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">B. Upload Foto dari Laptop / HP</label>
                  <label className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-dashed border-indigo-300 bg-white hover:bg-indigo-50/50 cursor-pointer text-xs font-bold text-indigo-600 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Pilih File Gambar dari Perangkat</span>
                    <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                  </label>
                </div>

                {/* Option 3: Presets Selector */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">C. Atau Pilih Dari Galeri Sampul Akademik</label>
                  <div className="grid grid-cols-4 gap-2 max-h-28 overflow-y-auto pr-1">
                    {COVER_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPortfolioCoverUrl(preset.url)}
                        className={`p-1 rounded-lg border text-left flex flex-col items-center group cursor-pointer transition-all ${
                          portfolioCoverUrl === preset.url ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500/20' : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <img src={preset.url} alt={preset.label} className="w-full h-10 object-cover rounded" />
                        <span className="text-[9px] font-bold text-slate-700 truncate w-full text-center mt-1">
                          {preset.label.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Ringkas Karya *</label>
                <textarea
                  name="description"
                  rows={3}
                  required
                  defaultValue={portfolioModal.data?.description || ''}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-extrabold text-xs text-white bg-gradient-purple-blue hover:opacity-95 shadow-lg cursor-pointer"
              >
                Simpan Portofolio & Cover
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: TESTIMONIAL ADD / EDIT */}
      {testimonialModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button onClick={() => setTestimonialModal({ open: false, mode: 'add' })} className="absolute top-5 right-5 text-slate-400 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {testimonialModal.mode === 'add' ? 'Tambah Testimoni' : 'Edit Testimoni'}
            </h3>
            <form onSubmit={e => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const data = {
                clientName: fd.get('clientName') as string,
                maskedName: (fd.get('clientName') as string).substring(0, 1) + '***',
                university: fd.get('university') as string,
                serviceName: fd.get('serviceName') as string || 'Skripsi',
                content: fd.get('content') as string,
                rating: Number(fd.get('rating') || 5),
                avatarColor: 'bg-indigo-600'
              };
              if (testimonialModal.mode === 'add') {
                createTestimonial(data);
                showToast('Testimoni baru dibuat.');
              } else {
                updateTestimonial(testimonialModal.data.id, data);
                showToast('Testimoni diperbarui.');
              }
              setTestimonialModal({ open: false, mode: 'add' });
            }} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Mahasiswa / Klien</label>
                <input type="text" name="clientName" required defaultValue={testimonialModal.data?.clientName || ''} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 font-bold" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Asal Kampus</label>
                <input type="text" name="university" defaultValue={testimonialModal.data?.university || ''} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Layanan Dipesan</label>
                <input type="text" name="serviceName" defaultValue={testimonialModal.data?.serviceName || 'Skripsi'} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ulasan Kepuasan</label>
                <textarea name="content" rows={3} required defaultValue={testimonialModal.data?.content || ''} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900" />
              </div>
              <button type="submit" className="w-full py-2.5 bg-gradient-purple-blue text-white rounded-xl text-xs font-bold shadow-md cursor-pointer">
                Simpan Testimoni
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: FAQ ADD / EDIT */}
      {faqModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button onClick={() => setFaqModal({ open: false, mode: 'add' })} className="absolute top-5 right-5 text-slate-400 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {faqModal.mode === 'add' ? 'Tambah FAQ Baru' : 'Edit FAQ'}
            </h3>
            <form onSubmit={e => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const data = {
                question: fd.get('question') as string,
                answer: fd.get('answer') as string,
                category: fd.get('category') as string || 'Umum'
              };
              if (faqModal.mode === 'add') {
                createFAQ(data);
                showToast('FAQ baru dibuat.');
              } else {
                updateFAQ(faqModal.data.id, data);
                showToast('FAQ diperbarui.');
              }
              setFaqModal({ open: false, mode: 'add' });
            }} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pertanyaan</label>
                <input type="text" name="question" required defaultValue={faqModal.data?.question || ''} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 font-bold" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Jawaban Lengkap</label>
                <textarea name="answer" rows={4} required defaultValue={faqModal.data?.answer || ''} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kategori FAQ</label>
                <input type="text" name="category" defaultValue={faqModal.data?.category || 'Pemesanan'} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900" />
              </div>
              <button type="submit" className="w-full py-2.5 bg-gradient-purple-blue text-white rounded-xl text-xs font-bold shadow-md cursor-pointer">
                Simpan FAQ
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE CONFIRMATION DIALOG (100% RELIABLE & ACCESSIBLE) */}
      {deleteConfirmModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 text-center relative animate-scale-up">
            <button
              onClick={() => setDeleteConfirmModal({ open: false, type: 'order', title: '' })}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Warning Icon */}
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4 shadow-inner">
              <Trash2 className="w-7 h-7" />
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
              {deleteConfirmModal.type === 'reset-data'
                ? 'Konfirmasi Reset Data'
                : deleteConfirmModal.type === 'clear-notifications'
                ? 'Bersihkan Semua Notifikasi'
                : 'Konfirmasi Hapus Data'}
            </h3>

            <p className="text-sm font-bold text-slate-800 mb-1">
              {deleteConfirmModal.title}
            </p>

            {deleteConfirmModal.subtitle && (
              <p className="text-xs text-slate-500 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {deleteConfirmModal.subtitle}
              </p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmModal({ open: false, type: 'order', title: '' })}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={executeDeleteConfirmed}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.98] transition-all shadow-md shadow-rose-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>
                  {deleteConfirmModal.type === 'reset-data'
                    ? 'Ya, Reset Sekarang'
                    : deleteConfirmModal.type === 'clear-notifications'
                    ? 'Ya, Bersihkan'
                    : 'Ya, Hapus Data'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
