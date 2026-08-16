import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageCircle, Send, Instagram, ExternalLink } from 'lucide-react';

export const SocialMediaSection: React.FC = () => {
  const { settings, generateWhatsAppLink } = useApp();

  const socialCards = [
    {
      platform: 'WhatsApp',
      handle: settings.whatsappNumber,
      actionText: 'Chat melalui WhatsApp',
      icon: MessageCircle,
      bgColor: 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200',
      iconBg: 'bg-emerald-500 text-white',
      textColor: 'text-emerald-700',
      link: generateWhatsAppLink(
        settings.whatsappNumber,
        'Halo Admin JASKIS, saya ingin berkonsultasi mengenai pengerjaan tugas akademik.'
      )
    },
    {
      platform: 'Telegram',
      handle: settings.telegramNumber,
      actionText: 'Chat melalui Telegram',
      icon: Send,
      bgColor: 'bg-sky-50 hover:bg-sky-100/80 border-sky-200',
      iconBg: 'bg-sky-500 text-white',
      textColor: 'text-sky-700',
      link: `https://t.me/${settings.telegramNumber}`
    },
    {
      platform: 'Instagram',
      handle: settings.instagramHandle,
      actionText: 'Follow Instagram kami',
      icon: Instagram,
      bgColor: 'bg-pink-50 hover:bg-pink-100/80 border-pink-200',
      iconBg: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white',
      textColor: 'text-pink-700',
      link: `https://instagram.com/${settings.instagramHandle.replace('@', '')}`
    }
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 font-sans">
          Hubungi Kami di
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {socialCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <a
                key={idx}
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-5 rounded-2xl border ${card.bgColor} shadow-sm hover:shadow-md transition-all flex items-center gap-4 text-left group cursor-pointer`}
              >
                <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">{card.platform}</h3>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
                  </div>
                  <p className="text-base font-extrabold text-slate-800 truncate mt-0.5">
                    {card.handle}
                  </p>
                  <p className={`text-xs font-semibold ${card.textColor} mt-1`}>
                    {card.actionText}
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
