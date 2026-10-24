import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../types.ts';

export const MobileStickyBar: React.FC = () => {
  return (
    <aside
      aria-label="Quick contact"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#141518]/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl"
    >
      <a
        href={BUSINESS_INFO.phoneTel}
        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium uppercase tracking-wider text-white bg-[#105652] hover:bg-[#0C4340] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2DD4BF]"
      >
        <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>Call now</span>
      </a>

      <a
        href={BUSINESS_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium uppercase tracking-wider text-[#FAF9F5] bg-white/10 hover:bg-white/15 border border-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2DD4BF]"
      >
        <MessageCircle className="w-3.5 h-3.5 shrink-0 text-[#25D366]" aria-hidden="true" />
        <span>WhatsApp</span>
      </a>
    </aside>
  );
};
