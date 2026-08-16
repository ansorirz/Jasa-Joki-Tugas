import React, { useState } from 'react';
import { Order } from '../types';
import { X, Send, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';

interface OrderModalProps {
  initialService?: string;
  onClose: () => void;
  onSubmitOrder: (newOrder: Order) => void;
  whatsappNumber?: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  initialService = 'Skripsi',
  onClose,
  onSubmitOrder,
  whatsappNumber = '083183372985',
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [university, setUniversity] = useState('');
  const [service, setService] = useState(initialService || 'Skripsi');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    // Mask name for public tracking e.g. "Ahmad Rizky" -> "A*** R***"
    const nameParts = clientName.trim().split(' ');
    const maskedName = nameParts
      ? nameParts
          .map((part) => part.charAt(0) + '***')
          .join(' ')
      : clientName.charAt(0) + '***';

    // Random new order ID
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newId = `JKS-2026-${randomNum}`;

    const newOrderObj: Order = {
      id: newId,
      clientName: maskedName,
      fullClientName: clientName,
      clientPhone,
      clientUniversity: university || 'Mahasiswa Kampus',
      service,
      orderDate: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      deadline: deadline || 'Sesuai Kesepakatan',
      status: 'Diproses',
      progress: 10,
      price: service === 'Skripsi' ? 1200000 : service === 'PPT' ? 150000 : 350000,
      notes,
      timeline: [
        {
          title: 'Pesanan diterima',
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          completed: true,
          active: true,
        },
        { title: 'Brief dikonfirmasi', timestamp: '-', completed: false },
        { title: 'Pembayaran dikonfirmasi', timestamp: '-', completed: false },
        { title: 'Sedang dikerjakan', timestamp: '-', completed: false },
        { title: 'Review', timestamp: '-', completed: false },
        { title: 'Selesai', timestamp: '-', completed: false },
      ],
    };

    onSubmitOrder(newOrderObj);
    setCreatedOrder(newOrderObj);
  };

  const handleSendWa = () => {
    if (!createdOrder) return;
    const formattedWa = whatsappNumber.startsWith('0')
      ? '62' + whatsappNumber.slice(1)
      : whatsappNumber;

    const text = `Halo Admin JASKIS, saya *${clientName}* (${university || 'Kampus'}) telah membuat pesanan baru!\n\nID Pesanan: *${createdOrder.id}*\nLayanan: *${service}*\nDeadline: *${deadline}*\nCatatan: ${notes}`;
    const url = `https://wa.me/${formattedWa}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 card-shadow relative my-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {createdOrder ? (
          <div className="py-6 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-gray-900">Pesanan Berhasil dibuat!</h3>
              <p className="text-xs text-gray-500">ID Pesanan Anda telah dibuat secara otomatis:</p>
            </div>

            <div className="bg-indigo-50/80 border border-indigo-100 p-4 rounded-2xl max-w-xs mx-auto">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">ID Pesanan Unik</p>
              <p className="text-2xl font-black text-indigo-700 font-mono tracking-wider my-1">
                {createdOrder.id}
              </p>
              <p className="text-[11px] text-gray-500">Gunakan ID ini untuk cek status di website</p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleSendWa}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Kirim Brief & Konfirmasi via WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-xs transition-colors"
              >
                Tutup & Kembali
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Formulir Pesan Layanan</span>
            </div>

            <h3 className="text-xl font-extrabold text-gray-900">
              Pesan Layanan {service}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Contoh: Ahmad Rizky"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="083183372985"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Universitas
                  </label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="Contoh: Universitas Brawijaya"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Pilih Layanan
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500"
                  >
                    <option value="Skripsi">Skripsi</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Jurnal / SINTA">Jurnal / SINTA</option>
                    <option value="Makalah">Makalah</option>
                    <option value="Laporan">Laporan</option>
                    <option value="Essay">Essay</option>
                    <option value="PPT">PPT</option>
                    <option value="Poster">Poster</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Target Deadline
                  </label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="Contoh: 20 Agustus 2026"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Catatan Brief / Kebutuhan Tugas
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Deskripsikan judul/topik tugas, bab, dan petunjuk dari dosen..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500 text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full gradient-bg text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-indigo-300 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <Send className="w-4 h-4" />
              <span>Buat Pesanan & Dapatkan ID Tracking</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
