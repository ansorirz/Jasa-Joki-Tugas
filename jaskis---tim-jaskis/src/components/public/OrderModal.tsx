import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceCategory, Gender } from '../../types';
import { X, CheckCircle2, MessageCircle, ShieldCheck, ArrowRight } from 'lucide-react';

export const OrderModal: React.FC = () => {
  const {
    orderModalOpen,
    setOrderModalOpen,
    selectedServiceForModal,
    createOrder,
    generateWhatsAppLink,
    getWhatsAppOrderMessage,
    settings,
    navigateTo,
    services
  } = useApp();

  const [clientName, setClientName] = useState('');
  const [gender, setGender] = useState<Gender>('Pria');
  const [university, setUniversity] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>('Skripsi');
  const [deadline, setDeadline] = useState('');
  const [brief, setBrief] = useState('');
  const [createdOrderResult, setCreatedOrderResult] = useState<any | null>(null);

  useEffect(() => {
    if (selectedServiceForModal) {
      setServiceCategory(selectedServiceForModal);
    }
  }, [selectedServiceForModal]);

  if (!orderModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !phone || !brief || !deadline) return;

    const newOrd = createOrder({
      clientName,
      gender,
      university: university || 'Mahasiswa Indonesia',
      phone,
      serviceCategory,
      deadline,
      brief
    });

    setCreatedOrderResult(newOrd);
  };

  const handleClose = () => {
    setOrderModalOpen(false);
    setCreatedOrderResult(null);
    setClientName('');
    setUniversity('');
    setPhone('');
    setBrief('');
    setDeadline('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8 animate-fade-in relative">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {createdOrderResult ? (
          /* Order Created Success View */
          <div className="text-center space-y-4 py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900">
              Pesanan Berhasil Dibuat!
            </h3>

            <p className="text-xs text-slate-500 font-medium">
              ID Pesanan Anda telah dibuat dan tersimpan otomatis di sistem.
            </p>

            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 my-4 text-left">
              <div className="flex items-center justify-between border-b border-indigo-100 pb-2 mb-2">
                <span className="text-xs font-bold text-slate-500">ID Pesanan</span>
                <span className="text-base font-extrabold text-indigo-700 font-mono">
                  {createdOrderResult.id}
                </span>
              </div>
              <div className="text-xs text-slate-700 space-y-1">
                <p><strong>Klien:</strong> {createdOrderResult.clientName} ({createdOrderResult.gender})</p>
                <p><strong>Layanan:</strong> {createdOrderResult.serviceCategory}</p>
                <p><strong>Deadline:</strong> {createdOrderResult.deadline}</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <a
                href={generateWhatsAppLink(settings.whatsappNumber, getWhatsAppOrderMessage(createdOrderResult))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Kirim Brief via WhatsApp Sekarang</span>
              </a>

              <button
                onClick={() => {
                  const id = createdOrderResult.id;
                  handleClose();
                  navigateTo('cek-pesanan', id);
                }}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5"
              >
                <span>Lihat Halaman Tracking Status</span>
                <ArrowRight className="w-4 h-4 text-indigo-600" />
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Pemesanan Langsung & Terenkripsi</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-sans">
                Formulir Pemesanan Tugas
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Isi data tugas Anda untuk mendapatkan penawaran & jadwal pengerjaan.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  placeholder="Contoh: Ansori Rahman"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Kelamin</label>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value as Gender)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 font-medium bg-white"
                  >
                    <option value="Pria">Pria</option>
                    <option value="Wanita">Wanita</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="083183372985"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Layanan *</label>
                  <select
                    value={serviceCategory}
                    onChange={e => setServiceCategory(e.target.value as ServiceCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 font-medium bg-white"
                  >
                    {services && services.length > 0 ? (
                      services.map(s => (
                        <option key={s.id} value={s.category}>
                          {s.category} ({s.title})
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Skripsi">Skripsi</option>
                        <option value="Proposal">Proposal</option>
                        <option value="Jurnal / SINTA">Jurnal / SINTA</option>
                        <option value="Makalah">Makalah</option>
                        <option value="Laporan">Laporan</option>
                        <option value="Essay">Essay</option>
                        <option value="PPT">PPT Presentasi</option>
                        <option value="Poster">Poster Ilmiah</option>
                      </>
                    )}
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Deadline Tugas *</label>
                  <input
                    type="text"
                    required
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    placeholder="Contoh: 20 Ags 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Asal Kampus / Instansi</label>
                <input
                  type="text"
                  value={university}
                  onChange={e => setUniversity(e.target.value)}
                  placeholder="Contoh: Universitas Brawijaya"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Brief / Ringkasan Tugas *</label>
                <textarea
                  rows={3}
                  required
                  value={brief}
                  onChange={e => setBrief(e.target.value)}
                  placeholder="Tuliskan judul tugas, jumlah halaman, atau ketentuan dari dosen..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-purple-blue hover:opacity-95 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>Buat Pesanan & Dapatkan ID</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
