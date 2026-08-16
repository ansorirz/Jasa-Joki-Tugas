import React from 'react';
import { MessageCircle, Send, Instagram } from 'lucide-react';

interface SocialSectionProps {
  whatsappNumber?: string;
  telegramNumber?: string;
  instagramHandle?: string;
}

export const SocialSection: React.FC<SocialSectionProps> = ({
  whatsappNumber = '083183372985',
  telegramNumber = '083183372985',
  instagramHandle = '@jaskis_official',
}) => {
  const formattedWa = whatsappNumber.startsWith('0')
    ? '62' + whatsappNumber.slice(1)
    : whatsappNumber;

  const channels = [
    {
      name: 'WhatsApp',
      value: whatsappNumber,
      subtitle: 'Chat melalui WhatsApp',
      icon: MessageCircle,
      bg: 'bg-emerald-50 border-emerald-100/80',
      text: 'text-emerald-600',
      iconBg: 'bg-emerald-500 text-white',
      link: `https://wa.me/${formattedWa}?text=Halo%20Admin%20JASKIS,%20saya%20ingin%20konsultasi%20tugas.`,
    },
    {
      name: 'Telegram',
      value: telegramNumber,
      subtitle: 'Chat melalui Telegram',
      icon: Send,
      bg: 'bg-sky-50 border-sky-100/80',
      text: 'text-sky-600',
      iconBg: 'bg-sky-500 text-white',
      link: `https://t.me/jaskis_official`,
    },
    {
      name: 'Instagram',
      value: instagramHandle,
      subtitle: 'Follow Instagram kami',
      icon: Instagram,
      bg: 'bg-pink-50 border-pink-100/80',
      text: 'text-pink-600',
      iconBg: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white',
      link: `https://instagram.com/${instagramHandle.replace('@', '')}`,
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Hubungi Kami di
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Tim kami siap melayani pertanyaan dan konsultasi tugasmu kapan saja.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {channels.map((channel, idx) => {
            const Icon = channel.icon;
            return (
              <a
                key={idx}
                href={channel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-2xl border border-gray-100 card-shadow hover:border-indigo-200 hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-5 group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${channel.iconBg} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {channel.value}
                  </h3>
                  <p className={`text-sm font-semibold mt-1 ${channel.text}`}>
                    {channel.subtitle}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
