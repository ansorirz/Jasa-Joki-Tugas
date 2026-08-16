import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import {
  Search,
  CheckCircle2,
  Clock,
  MessageCircle,
  ChevronRight,
  AlertCircle,
  FileText,
  Calendar,
  Layers,
  Percent,
  ShieldCheck,
  Edit3,
  Send,
  Share2,
  Sliders,
  UserCheck,
  X,
  Lock,
  MessageSquare,
  Sparkles,
  CheckCircle,
  RefreshCw,
  Eye,
  EyeOff,
  ExternalLink,
  KeyRound,
  Check
} from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const {
    orders,
    activeSearchOrderId,
    setActiveSearchOrderId,
    navigateTo,
    generateWhatsAppLink,
    getWhatsAppOrderMessage,
    settings,
    updateOrder,
    isAdminLoggedIn,
    loginAdmin
  } = useApp();

  const [inputCode, setInputCode] = useState(activeSearchOrderId || 'JKS-2026-000125');
  const [searchedOrder, setSearchedOrder] = useState<any | null>(null);
  const [searched, setSearched] = useState(false);

  // Follow-up modals state
  const [showClientRevisionModal, setShowClientRevisionModal] = useState(false);
  const [revisionNote, setRevisionNote] = useState('');

  const [showJokiUpdateModal, setShowJokiUpdateModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [showPinPassword, setShowPinPassword] = useState(false);
  const [pinError, setPinError] = useState<string | null>(null);
  const [isJokiVerified, setIsJokiVerified] = useState(false);
  const [jokiStatus, setJokiStatus] = useState<OrderStatus>('Sedang Dikerjakan');
  const [jokiProgress, setJokiProgress] = useState(50);
  const [jokiNotes, setJokiNotes] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (activeSearchOrderId) {
      setInputCode(activeSearchOrderId);
      const found = orders.find(o => o.id.toLowerCase() === activeSearchOrderId.toLowerCase());
      setSearchedOrder(found || null);
      setSearched(true);
    } else {
      // default search first order
      const defaultOrder = orders.find(o => o.id === 'JKS-2026-000125') || orders[0];
      if (defaultOrder) {
        setInputCode(defaultOrder.id);
        setSearchedOrder(defaultOrder);
        setSearched(true);
      }
    }
  }, [activeSearchOrderId, orders]);

  // Keep searchedOrder in sync if orders array is updated
  useEffect(() => {
    if (searchedOrder) {
      const fresh = orders.find(o => o.id === searchedOrder.id);
      if (fresh) {
        setSearchedOrder(fresh);
      }
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputCode.trim();
    if (!clean) return;
    setActiveSearchOrderId(clean);
    const found = orders.find(o => o.id.toLowerCase() === clean.toLowerCase());
    setSearchedOrder(found || null);
    setSearched(true);
  };

  const openJokiModal = () => {
    if (searchedOrder) {
      setJokiStatus(searchedOrder.status || 'Sedang Dikerjakan');
      setJokiProgress(searchedOrder.progress !== undefined ? searchedOrder.progress : 50);
      setJokiNotes(searchedOrder.notes || '');
    }
    setPinError(null);
    if (isAdminLoggedIn) {
      setIsJokiVerified(true);
    }
    setShowJokiUpdateModal(true);
  };

  const handleQuickPin = (pin: string) => {
    setPinInput(pin);
    setPinError(null);
    if (pin === '123456' || pin === 'admin123' || pin === settings.adminPasswordHash || loginAdmin('admin', pin)) {
      setIsJokiVerified(true);
      showToast('Verifikasi Tim JASKIS berhasil!');
    }
  };

  const handleVerifyJokiPin = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pinInput.trim();
    if (clean === '123456' || clean === 'admin123' || clean === settings.adminPasswordHash || loginAdmin('admin', clean)) {
      setIsJokiVerified(true);
      setPinError(null);
      showToast('Verifikasi Tim JASKIS berhasil!');
    } else {
      setPinError('PIN atau kata sandi tidak valid. Coba gunakan 123456 atau admin123');
    }
  };

  const handleSaveJokiProgress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchedOrder) return;

    // Update timeline step dynamically
    let updatedTimeline = [...searchedOrder.timeline];
    if (jokiProgress >= 100) {
      updatedTimeline = updatedTimeline.map(step => ({ ...step, completed: true, active: false }));
    } else {
      const stepIndex = Math.min(Math.floor((jokiProgress / 100) * updatedTimeline.length), updatedTimeline.length - 1);
      updatedTimeline = updatedTimeline.map((step, idx) => ({
        ...step,
        completed: idx < stepIndex,
        active: idx === stepIndex
      }));
    }

    updateOrder(searchedOrder.id, {
      status: jokiStatus,
      progress: jokiProgress,
      notes: jokiNotes,
      timeline: updatedTimeline
    });

    showToast(`Progres pesanan ${searchedOrder.id} berhasil diperbarui ke ${jokiProgress}%!`);
    setShowJokiUpdateModal(false);
  };

  const handleSendClientRevisionWA = () => {
    if (!searchedOrder) return;
    const msg = `Halo CS JASKIS, saya ingin menyampaikan CATATAN / REVISI TINDAK LANJUT untuk pesanan saya:\n\n*ID Pesanan:* ${searchedOrder.id}\n*Layanan:* ${searchedOrder.serviceCategory}\n*Klien:* ${searchedOrder.clientName || searchedOrder.maskedName}\n\n*Detail Catatan/Revisi:* \n"${revisionNote.trim() || 'Mohon cek kembali progres pengerjaan tugas saya.'}"\n\nMohon dikonfirmasi & ditindaklanjuti, terima kasih!`;
    window.open(generateWhatsAppLink(settings.whatsappNumber, msg), '_blank');
    setShowClientRevisionModal(false);
    setRevisionNote('');
  };

  const handleSendJokiReportToClientWA = () => {
    if (!searchedOrder) return;
    const clientPhone = searchedOrder.phone || settings.whatsappNumber;
    const msg = `Halo Kak ${searchedOrder.clientName || 'Klien'},\n\nBerikut Laporan Resmi Update Progres Tugas Akademik Anda di JASKIS:\n\n📌 *ID Pesanan:* ${searchedOrder.id}\n📚 *Layanan:* ${searchedOrder.serviceCategory}\n⏳ *Status:* ${searchedOrder.status}\n📊 *Progres:* ${searchedOrder.progress}%\n📅 *Deadline:* ${searchedOrder.deadline}\n💡 *Catatan Penjoki:* ${searchedOrder.notes || 'Tugas sedang dikerjakan dengan cermat sesuai brief.'}\n\nTerima kasih atas kepercayaannya bersama Tim JASKIS! 🙏`;
    window.open(generateWhatsAppLink(clientPhone, msg), '_blank');
  };

  const getBadgeClass = (status: string) => {
    switch (status) {
      case 'Pesanan Diterima': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Brief Dikonfirmasi': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'Pembayaran Dikonfirmasi': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Sedang Dikerjakan': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Review': return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'Selesai': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="relative bg-slate-50 min-h-screen py-10 overflow-hidden">
      {/* Pattern Matrix & Geometric Motifs */}
      <div className="absolute inset-0 bg-pattern-grid-slate opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header & Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <button onClick={() => navigateTo('home')} className="hover:text-indigo-600 cursor-pointer">Home</button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-indigo-600 font-bold">Cek Pesanan</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 font-montserrat">
                Cek Status Pesanan
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-normal font-roboto">
                Pantau progress pengerjaan tugas akademik secara real-time.
              </p>
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <label className="block text-xs font-bold text-slate-600 mb-1 font-poppins">
                Masukkan ID Pesanan
              </label>
              <div className="relative font-opensans">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={inputCode}
                  onChange={e => setInputCode(e.target.value)}
                  placeholder="Contoh: JKS-2026-000125"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-mono text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-purple-blue hover:opacity-95 shadow-md transition-all cursor-pointer"
              >
                Cek Status
              </button>
            </div>
          </form>

          {/* Sample quick IDs */}
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 flex-wrap">
            <span className="font-semibold text-slate-700">Pilih Cepat Pesanan:</span>
            {orders.slice(0, 5).map(o => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setInputCode(o.id);
                  setActiveSearchOrderId(o.id);
                  setSearchedOrder(o);
                  setSearched(true);
                }}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold transition-all cursor-pointer ${
                  inputCode === o.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 border border-slate-200'
                }`}
              >
                {o.id}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Display */}
        {searched && searchedOrder ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Card: Detail Pesanan */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Detail Pesanan
                    </span>
                    <h2 className="text-xl font-extrabold text-slate-900 font-mono mt-0.5">
                      {searchedOrder.id}
                    </h2>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getBadgeClass(searchedOrder.status)}`}>
                    {searchedOrder.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block">Layanan</span>
                    <span className="text-base font-bold text-slate-900 mt-1 block">
                      {searchedOrder.serviceCategory}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 font-semibold block">Universitas / Klien</span>
                    <span className="text-base font-bold text-slate-800 mt-1 block">
                      {searchedOrder.university || searchedOrder.maskedName}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 font-semibold block">Tanggal Order</span>
                    <span className="text-sm font-semibold text-slate-700 mt-1 block">
                      {searchedOrder.orderDate}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 font-semibold block">Estimasi Deadline</span>
                    <span className="text-sm font-bold text-indigo-600 mt-1 block">
                      {searchedOrder.deadline}
                    </span>
                  </div>
                </div>

                {/* Progress Bar Container */}
                <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 my-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                      Progress Pengerjaan
                    </span>
                    <span className="text-sm font-extrabold text-indigo-600">
                      {searchedOrder.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-indigo-200/60 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-purple-blue h-full rounded-full transition-all duration-500"
                      style={{ width: `${searchedOrder.progress}%` }}
                    />
                  </div>
                </div>

                {/* Brief & Notes */}
                {searchedOrder.brief && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                    <span className="font-bold text-slate-800 block">Brief / Ketentuan Klien:</span>
                    <p className="leading-relaxed">{searchedOrder.brief}</p>
                  </div>
                )}

                {searchedOrder.notes && (
                  <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 mt-3 space-y-1">
                    <span className="font-extrabold text-amber-950 block flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Catatan Terbaru Penjoki:</span>
                    </span>
                    <p className="leading-relaxed font-medium">{searchedOrder.notes}</p>
                  </div>
                )}
              </div>

              {/* PUSAT KONFIRMASI & TINDAK LANJUT PESANAN */}
              <div className="pt-6 border-t border-slate-200 mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                    <span>Aksi Konfirmasi & Tindak Lanjut</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                    Real-time
                  </span>
                </div>

                {/* 1. KLIEN / PEMESAN ACTIONS */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Bagi Pemesan (Klien):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      href={generateWhatsAppLink(settings.whatsappNumber, getWhatsAppOrderMessage(searchedOrder))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Tanya / Konfirmasi WA CS</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setShowClientRevisionModal(true)}
                      className="py-2.5 px-3 rounded-xl font-bold text-xs text-indigo-700 bg-indigo-100/80 hover:bg-indigo-200 transition-colors border border-indigo-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Kirim Catatan / Revisi</span>
                    </button>
                  </div>
                </div>

                {/* 2. PENJOKI / TIM JASKIS ACTIONS */}
                <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-2 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Khusus Penjoki / Tim JASKIS:</span>
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      ADMIN / JOKI
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={openJokiModal}
                      className="py-2.5 px-3 rounded-xl font-bold text-xs text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sliders className="w-4 h-4" />
                      <span>Update Status & Progres</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendJokiReportToClientWA}
                      className="py-2.5 px-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Lapor WA ke Klien</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Card: Timeline Status */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="pb-4 border-b border-slate-100 mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Timeline Status Pengerjaan
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tahapan proses pengerjaan tugas Anda.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const fresh = orders.find(o => o.id === searchedOrder.id);
                      if (fresh) setSearchedOrder({ ...fresh });
                      showToast('Status pengerjaan diperbarui!');
                    }}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                    title="Refresh Status"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                  {searchedOrder.timeline.map((step: any, idx: number) => (
                    <div key={idx} className="relative flex items-start justify-between gap-4">
                      {/* Circle Node Icon */}
                      <div
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          step.completed
                            ? 'bg-emerald-500 text-white shadow-sm'
                            : step.active
                            ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 animate-pulse'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {step.completed ? '✓' : idx + 1}
                      </div>

                      <div>
                        <p className={`text-sm font-bold ${
                          step.completed ? 'text-slate-900' : step.active ? 'text-indigo-600 font-extrabold' : 'text-slate-400'
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                          {step.timestamp}
                        </p>
                      </div>

                      {step.completed && (
                        <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          Selesai
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Info Box */}
              <div className="mt-8 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-indigo-600 shrink-0" />
                <p className="leading-snug">
                  Garansi revisi gratis sampai lulus / tuntas. Jika ada pertanyaan, gunakan tombol <strong>Konfirmasi WA CS</strong>.
                </p>
              </div>
            </div>

          </div>
        ) : searched ? (
          /* Not Found State */
          <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              ID Pesanan Tidak Ditemukan
            </h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              ID Pesanan <strong className="font-mono text-slate-800">{inputCode}</strong> tidak ditemukan dalam database. Pastikan format ID benar (contoh: JKS-2026-000125).
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => {
                  const first = orders[0]?.id || 'JKS-2026-000125';
                  setInputCode(first);
                  setActiveSearchOrderId(first);
                  setSearchedOrder(orders[0]);
                  setSearched(true);
                }}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                Coba ID Demo ({orders[0]?.id || 'JKS-2026-000125'})
              </button>
              <a
                href={generateWhatsAppLink(settings.whatsappNumber, `Halo Admin JASKIS, saya ingin menanyakan ID pesanan saya: ${inputCode}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
              >
                Tanya Admin via WhatsApp
              </a>
            </div>
          </div>
        ) : null}

      </div>

      {/* TOAST FLOATING NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-800 text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MODAL 1: CLIENT REVISION / NOTES */}
      {showClientRevisionModal && searchedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setShowClientRevisionModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs mb-1">
              <Edit3 className="w-4 h-4" />
              <span>Tindak Lanjut Klien</span>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 mb-2">
              Kirim Catatan / Revisi
            </h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Tuliskan instruksi tambahan atau permintaan revisi untuk pesanan <strong className="text-slate-800 font-mono">{searchedOrder.id}</strong>.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Detail Catatan / Revisi Pengerjaan *
                </label>
                <textarea
                  rows={4}
                  value={revisionNote}
                  onChange={e => setRevisionNote(e.target.value)}
                  placeholder="Contoh: Mohon tambahkan referensi jurnal SINTA 2 tahun terbaru di Bab 2..."
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="button"
                onClick={handleSendClientRevisionWA}
                className="w-full py-3.5 px-4 rounded-2xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kirimkan via WhatsApp CS JASKIS</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PENJOKI / WORKER PROGRESS UPDATE (SESUAI GAMBAR DENGAN FUNGSIONALITAS LENGKAP & SINKRONISASI) */}
      {showJokiUpdateModal && searchedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md sm:max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8 relative">
            
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setShowJokiUpdateModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              title="Tutup Modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2 text-amber-600 font-bold text-xs mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Akses Tim Penjoki / Admin JASKIS</span>
            </div>

            {/* Modal Heading */}
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
              Update Progres {searchedOrder.id}
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-medium">
              Perbarui persentase & status pengerjaan tugas secara langsung di sistem.
            </p>

            {!isJokiVerified ? (
              /* VIEW 1: PIN VERIFICATION FORM (SESUAI GAMBAR USER) */
              <form onSubmit={handleVerifyJokiPin} className="space-y-4">
                
                {/* Security Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <span className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Masukkan PIN Tim Penjoki</span>
                  </span>
                  <p className="text-slate-500 leading-relaxed">
                    Sistem membutuhkan verifikasi PIN atau Kata Sandi Admin untuk mengamankan data pesanan klien.
                  </p>
                </div>

                {/* Input PIN */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    PIN / Paswoord Tim JASKIS
                  </label>
                  <div className="relative">
                    <input
                      type={showPinPassword ? 'text' : 'password'}
                      value={pinInput}
                      onChange={e => {
                        setPinInput(e.target.value);
                        if (pinError) setPinError(null);
                      }}
                      placeholder="Masukkan PIN (default: 123456)"
                      className={`w-full pl-4 pr-11 py-3 rounded-2xl border text-sm font-mono text-slate-900 focus:outline-none transition-all ${
                        pinError
                          ? 'border-rose-300 bg-rose-50/40 focus:ring-2 focus:ring-rose-500'
                          : 'border-slate-200 bg-blue-50/30 focus:ring-2 focus:ring-amber-500'
                      }`}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPinPassword(!showPinPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                      title={showPinPassword ? 'Sembunyikan' : 'Tampilkan'}
                    >
                      {showPinPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {pinError && (
                    <p className="text-xs font-bold text-rose-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{pinError}</span>
                    </p>
                  )}

                  {/* Interactive Quick Fill Hint Badges */}
                  <div className="mt-2 flex items-center flex-wrap gap-1.5 text-[11px] text-slate-500">
                    <span>💡 Gunakan PIN default:</span>
                    <button
                      type="button"
                      onClick={() => handleQuickPin('123456')}
                      className="px-2 py-0.5 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold font-mono transition-colors cursor-pointer"
                    >
                      123456
                    </button>
                    <span>atau</span>
                    <button
                      type="button"
                      onClick={() => handleQuickPin('admin123')}
                      className="px-2 py-0.5 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold font-mono transition-colors cursor-pointer"
                    >
                      admin123
                    </button>
                  </div>
                </div>

                {/* Primary Button: Verifikasi Akses Penjoki */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-2xl font-bold text-xs text-slate-900 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-poppins"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Verifikasi Akses Penjoki</span>
                </button>

              </form>
            ) : (
              /* VIEW 2: VERIFIED PROGRESS & STATUS UPDATE FORM */
              <form onSubmit={handleSaveJokiProgress} className="space-y-5">
                
                {/* Verified Header Pill */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Akses Terverifikasi • {searchedOrder.clientName || 'Klien'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsJokiVerified(false)}
                    className="text-[10px] font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
                  >
                    Kunci Ulang
                  </button>
                </div>

                {/* STATUS DROPDOWN */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Status Pengerjaan
                  </label>
                  <select
                    value={jokiStatus}
                    onChange={e => setJokiStatus(e.target.value as OrderStatus)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                  >
                    <option value="Sedang Dikerjakan">⏳ Sedang Dikerjakan</option>
                    <option value="Pesanan Diterima">📥 Pesanan Diterima</option>
                    <option value="Brief Dikonfirmasi">📋 Brief Dikonfirmasi</option>
                    <option value="Pembayaran Dikonfirmasi">💳 Pembayaran Dikonfirmasi</option>
                    <option value="Review">🔍 Review & Pengecekan</option>
                    <option value="Selesai">✅ Selesai</option>
                  </select>
                </div>

                {/* PROGRESS RANGE SLIDER */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-800">
                      Persentase Progress
                    </label>
                    <span className="text-sm font-extrabold text-amber-600 font-mono">
                      {jokiProgress}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={jokiProgress}
                    onChange={e => setJokiProgress(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
                  />

                  {/* Preset Buttons */}
                  <div className="flex items-center justify-between gap-1 mt-2">
                    {[0, 25, 50, 65, 75, 100].map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setJokiProgress(p)}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold transition-all cursor-pointer ${
                          jokiProgress === p
                            ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm scale-105'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {p}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* NOTES TEXTAREA */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Catatan Pengerjaan untuk Klien
                  </label>
                  <textarea
                    rows={3}
                    value={jokiNotes}
                    onChange={e => setJokiNotes(e.target.value)}
                    placeholder="Contoh: Bab 1-3 sudah rampung diselaraskan dengan SPSS, saat ini merapikan daftar pustaka..."
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* ACTION BUTTONS (SYNCED & INTERACTIVE) */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="submit"
                    className="py-3 px-4 rounded-2xl font-bold text-xs text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Simpan Progres Sistem</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleSaveJokiProgress({ preventDefault: () => {} } as any);
                      handleSendJokiReportToClientWA();
                    }}
                    className="py-3 px-4 rounded-2xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Simpan & Lapor WA</span>
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
