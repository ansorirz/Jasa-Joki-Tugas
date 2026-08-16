import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Send, PhoneCall, MessageSquare, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { sendMessage, settings, generateWhatsAppLink } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    university: '',
    service: 'Skripsi',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Save message in context inbox
    sendMessage({
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      message: `[Kampus: ${formData.university || '-'}] ${formData.message}`
    });

    // Prepare WhatsApp redirect message
    const waText = `Halo Admin JASKIS, saya ingin konsultasi tugas:\n\n` +
      `• *Nama*: ${formData.name}\n` +
      `• *WhatsApp*: ${formData.phone}\n` +
      `• *Universitas/Kampus*: ${formData.university || '-'}\n` +
      `• *Jenis Layanan*: ${formData.service}\n` +
      `• *Detail Tugas & Catatan*: ${formData.message || '-'}`;

    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const targetPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
    const waUrl = `https://wa.me/${targetPhone || '6283183372985'}?text=${encodeURIComponent(waText)}`;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');

    setSubmitted(true);
  };

  return (
    <section id="kontak" className="relative bg-slate-50/80 py-16 sm:py-20 border-t border-slate-200/90 overflow-hidden">
      {/* Pattern Matrix & Geometric Motifs */}
      <div className="absolute inset-0 bg-pattern-grid-slate opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-pattern-dots opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[11px] font-extrabold tracking-wider uppercase mb-4 font-poppins">
                HUBUNGI TIM JASKIS
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black font-montserrat text-slate-900 tracking-tight leading-[1.18]">
                Siap Membantu Tugas <br className="hidden sm:inline" />
                Akademikmu Hari Ini
              </h2>
              
              <p className="text-slate-500 text-sm sm:text-base font-normal font-roboto leading-relaxed mt-4">
                Isi formulir singkat di samping atau hubungi kami langsung via WhatsApp untuk respon instan dalam hitungan menit.
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              {/* WhatsApp Info Card */}
              <div className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100/70 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Nomor WhatsApp Resmi
                  </p>
                  <p className="text-lg font-black text-blue-700 font-mono mt-0.5">
                    {settings.whatsappNumber || '083183372985'}
                  </p>
                </div>
              </div>

              {/* Consultation Support Card */}
              <div className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100/70 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Layanan Konsultasi
                  </p>
                  <p className="text-lg font-black text-slate-900 mt-0.5">
                    24/7 Aktif & Ramah
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 lg:p-10 rounded-[32px] border border-slate-200/80 shadow-xl shadow-slate-200/50">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
              Formulir Konsultasi Tugas
            </h3>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-lg">Konsultasi Terkirim ke WhatsApp!</h4>
                  <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                    Formulir Anda telah diteruskan ke WhatsApp CS JASKIS. Jika aplikasi WhatsApp tidak terbuka otomatis, Anda dapat menekan tombol di bawah.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      const waText = `Halo Admin JASKIS, saya ingin konsultasi tugas:\n\n` +
                        `• *Nama*: ${formData.name}\n` +
                        `• *WhatsApp*: ${formData.phone}\n` +
                        `• *Universitas*: ${formData.university || '-'}\n` +
                        `• *Layanan*: ${formData.service}\n` +
                        `• *Detail Tugas*: ${formData.message}`;
                      const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
                      const targetPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
                      window.open(`https://wa.me/${targetPhone || '6283183372985'}?text=${encodeURIComponent(waText)}`, '_blank');
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-sm"
                  >
                    Buka WhatsApp Sekarang
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', university: '', service: 'Skripsi', message: '' });
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                  >
                    Isi Formulir Baru
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                
                {/* Row 1: Nama & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Contoh: Ahmad Rizky"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200/90 bg-slate-50/70 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Nomor WhatsApp *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Contoh: 083183372985"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200/90 bg-slate-50/70 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Universitas & Jenis Layanan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Universitas / Kampus
                    </label>
                    <input
                      type="text"
                      value={formData.university}
                      onChange={e => setFormData({ ...formData, university: e.target.value })}
                      placeholder="Contoh: Universitas Brawijaya"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200/90 bg-slate-50/70 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Jenis Layanan
                    </label>
                    <select
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200/90 bg-slate-50/70 text-sm font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
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
                </div>

                {/* Row 3: Detail Tugas & Catatan */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Detail Tugas & Catatan
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Jelaskan topik tugas, deadline, dan ketentuan khusus dari dosen..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200/90 bg-slate-50/70 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-y"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl font-bold text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Kirim & Hubungi WhatsApp Admin</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

