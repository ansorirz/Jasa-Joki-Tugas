import React, { useState } from 'react';
import { Order } from '../types';
import {
  Search,
  CheckCircle2,
  Clock,
  ArrowLeft,
  MessageCircle,
  FileText,
  AlertCircle,
  Calendar,
  Layers,
} from 'lucide-react';

interface OrderTrackingPageProps {
  orders: Order[];
  initialOrderId?: string;
  onBackToHome: () => void;
  whatsappNumber?: string;
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({
  orders,
  initialOrderId = 'JKS-2026-000125',
  onBackToHome,
  whatsappNumber = '083183372985',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState<Order | null>(
    orders.find((o) => o.id.toLowerCase() === initialOrderId.toLowerCase()) || orders[0] || null
  );
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const found = orders.find(
      (o) => o.id.toLowerCase() === searchQuery.trim().toLowerCase()
    );

    if (found) {
      setActiveOrder(found);
      setNotFound(false);
    } else {
      setActiveOrder(null);
      setNotFound(true);
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Selesai':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
            ● Selesai
          </span>
        );
      case 'Sedang Dikerjakan':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200">
            ⏱ Sedang Dikerjakan
          </span>
        );
      case 'Review':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-600 border border-purple-200">
            🔍 Review
          </span>
        );
      case 'Diproses':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200">
            ⚙ Diproses
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header & Breadcrumb */}
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-indigo-600 transition-colors mb-3 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Cek Status Pesanan
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Home / <span className="text-indigo-600 font-semibold">Cek Pesanan</span>
            </p>
          </div>
        </div>

        {/* Input Bar */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 card-shadow max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Masukkan ID Pesanan (contoh: JKS-2026-000125)"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500 font-medium"
              />
            </div>
            <button
              type="submit"
              className="gradient-bg text-white px-8 py-3 rounded-xl font-semibold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Cek</span>
            </button>
          </form>

          {/* Demo ID quick picks */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
            <span>Coba ID demo:</span>
            {orders.slice(0, 3).map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  setSearchQuery(o.id);
                  setActiveOrder(o);
                  setNotFound(false);
                }}
                className="text-indigo-600 hover:underline font-semibold bg-indigo-50 px-2 py-0.5 rounded"
              >
                {o.id}
              </button>
            ))}
          </div>
        </div>

        {/* Not Found State */}
        {notFound && (
          <div className="bg-white rounded-2xl p-8 border border-red-100 text-center max-w-md mx-auto space-y-3 card-shadow animate-fadeIn">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-50 text-red-500 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">ID Pesanan Tidak Ditemukan</h3>
            <p className="text-xs text-gray-500">
              Pastikan Anda memasukkan format ID yang benar (contoh: JKS-2026-000125) atau hubungi admin jika terdapat kendala.
            </p>
            <a
              href={`https://wa.me/62${whatsappNumber.replace(/^0/, '')}?text=Halo%20Admin%20JASKIS,%20saya%20ingin%20cek%20pesanan%20ID:%20${searchQuery}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:underline pt-1"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Tanyakan ID ke Admin WA</span>
            </a>
          </div>
        )}

        {/* Found Order View - 2 Cards matching Reference Image 1 */}
        {activeOrder && !notFound && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            
            {/* Card 1: Detail Pesanan */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 card-shadow space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <span>Detail Pesanan</span>
                </h2>
                {getStatusBadge(activeOrder.status)}
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">ID Pesanan</span>
                  <span className="font-extrabold text-gray-900 font-mono bg-slate-100 px-2.5 py-1 rounded-md text-xs">
                    {activeOrder.id}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Layanan</span>
                  <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                    {activeOrder.service}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Tanggal Order</span>
                  <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {activeOrder.orderDate}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Deadline</span>
                  <span className="font-semibold text-rose-600 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-rose-500" />
                    {activeOrder.deadline}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="pt-2 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-gray-600">Progress Pengerjaan</span>
                    <span className="text-indigo-600">{activeOrder.progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full gradient-bg rounded-full transition-all duration-1000"
                      style={{ width: `${activeOrder.progress}%` }}
                    />
                  </div>
                </div>

                {activeOrder.notes && (
                  <div className="bg-slate-50 p-3.5 rounded-xl text-xs text-gray-600 border border-gray-100 space-y-1">
                    <p className="font-bold text-gray-700 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Catatan Brief:</span>
                    </p>
                    <p>{activeOrder.notes}</p>
                  </div>
                )}
              </div>

              {/* Direct WA Action */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/62${whatsappNumber.replace(/^0/, '')}?text=Halo%20Admin%20JASKIS,%20saya%20ingin%20bertanya%20mengenai%20progress%20pesanan%20ID:%20*${activeOrder.id}*`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-3 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-emerald-200"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Tanyakan Progress ke Admin WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Card 2: Timeline Status */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 card-shadow space-y-6">
              <h2 className="text-xl font-bold text-gray-900 pb-4 border-b border-gray-100 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                <span>Timeline Status</span>
              </h2>

              <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100">
                {activeOrder.timeline.map((event, idx) => (
                  <div key={idx} className="relative flex items-start justify-between gap-4 group">
                    {/* Circle Icon */}
                    <div
                      className={`absolute -left-[27px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-transform ${
                        event.completed
                          ? 'bg-emerald-500 border-white text-white shadow-sm'
                          : event.active
                          ? 'bg-indigo-600 border-white text-white ring-4 ring-indigo-100'
                          : 'bg-white border-gray-300 text-gray-300'
                      }`}
                    >
                      {event.completed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : event.active ? (
                        <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      )}
                    </div>

                    {/* Text */}
                    <div className="space-y-0.5">
                      <p
                        className={`text-sm font-bold ${
                          event.active
                            ? 'text-indigo-600'
                            : event.completed
                            ? 'text-gray-900'
                            : 'text-gray-400'
                        }`}
                      >
                        {event.title}
                      </p>
                      {event.active && (
                        <span className="inline-block text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          Tahap Saat Ini
                        </span>
                      )}
                    </div>

                    {/* Timestamp */}
                    <span className="text-xs text-gray-400 font-mono whitespace-nowrap">
                      {event.timestamp}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
