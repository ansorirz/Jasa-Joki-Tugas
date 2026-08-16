import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, PhoneCall } from 'lucide-react';
import { ContactMessage } from '../types';

interface ContactSectionProps {
  onSendMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => void;
  whatsappNumber?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onSendMessage,
  whatsappNumber = '083183372985',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    university: '',
    service: 'Skripsi',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    onSendMessage(formData);
    setSubmitted(true);

    // Open WhatsApp
    const formattedWa = whatsappNumber.startsWith('0')
      ? '62' + whatsappNumber.slice(1)
      : whatsappNumber;
    
    const text = `Halo Admin JASKIS, saya *${formData.name}* dari *${formData.university || 'Kampus'}* ingin konsultasi tugas *${formData.service}*.\n\nDetail: ${formData.message}`;
    const waUrl = `https://wa.me/${formattedWa}?text=${encodeURIComponent(text)}`;
    
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 800);
  };

  return (
    <section id="kontak" className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Hubungi Tim JASKIS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Siap Membantu Tugas Akademikmu Hari Ini
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              Isi formulir singkat di samping atau hubungi kami langsung via WhatsApp untuk respon instan dalam hitungan menit.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100/80">
                <div className="w-12 h-12 rounded-xl gradient-bg text-white flex items-center justify-center shrink-0 shadow-md">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">Nomor WhatsApp Resmi</p>
                  <p className="text-lg font-extrabold text-indigo-600">{whatsappNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50/60 border border-blue-100/80">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">Layanan Konsultasi</p>
                  <p className="text-base font-bold text-gray-900">24/7 Aktif & Ramah</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 card-shadow border border-gray-100 relative">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Pesan Berhasil Terkirim!</h3>
                  <p className="text-sm text-gray-500 max-w-md mx-auto">
                    Mengarahkan Anda ke WhatsApp Admin JASKIS untuk melanjutkan diskusi detail tugas...
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-indigo-600 font-semibold text-sm hover:underline pt-2 inline-block"
                  >
                    Kirim formulir lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Formulir Konsultasi Tugas
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Ahmad Rizky"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Nomor WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Contoh: 083183372985"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Universitas / Kampus
                      </label>
                      <input
                        type="text"
                        value={formData.university}
                        onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                        placeholder="Contoh: Universitas Brawijaya"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Jenis Layanan
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500"
                      >
                        <option value="Skripsi">Skripsi</option>
                        <option value="Proposal">Proposal</option>
                        <option value="Jurnal / SINTA">Jurnal / SINTA</option>
                        <option value="Makalah">Makalah</option>
                        <option value="Laporan">Laporan</option>
                        <option value="Essay">Essay</option>
                        <option value="PPT">PPT</option>
                        <option value="Poster">Poster</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Detail Tugas & Catatan
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Jelaskan topik tugas, deadline, dan ketentuan khusus dari dosen..."
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full gradient-bg text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-indigo-300 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim & Hubungi WhatsApp Admin</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
