import { Phone } from 'lucide-react';
import { CONTACT_LINKS } from '@/lib/site';

function FacebookIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}

function ZaloIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 12.83c.5.34.78.5.78.5s-.72.4-1.66.4c-.43 0-.9-.08-1.38-.3-.3-.14-.62-.32-.95-.54-.4-.27-.78-.6-1.1-.98-.4-.47-.7-1-.86-1.6-.1-.34-.14-.7-.14-1.07 0-.5.08-.95.22-1.34.14-.4.34-.74.58-1.02.24-.3.52-.54.82-.74.3-.2.62-.36.95-.46.34-.1.68-.16 1.02-.16.34 0 .66.05.96.14.3.1.58.22.82.38.24.16.46.34.64.54.18.2.34.4.46.6l-1.1.8c-.16-.24-.38-.46-.66-.64-.28-.18-.6-.27-.96-.27-.22 0-.44.04-.64.12-.2.08-.4.2-.56.34-.16.15-.3.32-.4.53-.1.2-.16.43-.16.68 0 .26.05.5.15.72.1.22.24.42.42.6.18.17.4.32.66.43.26.1.54.16.84.16.34 0 .66-.06.96-.18.3-.12.56-.28.78-.48l.4.4zm-8.3 3.95l-1.12-1.6-1.12 1.6H5.2l2.02-2.86L5.3 11.1h1.78l1.04 1.5L9.16 11.1h1.78l-1.92 2.82 2.02 2.86h-1.8z" />
    </svg>
  );
}

const widgets = [
  {
    label: 'Chat qua Messenger',
    href: CONTACT_LINKS.messenger,
    icon: FacebookIcon,
    external: true,
  },
  {
    label: 'Chat qua Zalo',
    href: CONTACT_LINKS.zalo,
    icon: ZaloIcon,
    external: true,
  },
  {
    label: 'Gọi 070 495 2969',
    href: CONTACT_LINKS.phone,
    icon: Phone,
    external: false,
  },
];

function FloatingContact() {
  return (
    <div className="floating-contact" aria-label="Liên hệ nhanh">
      {widgets.map(({ label, href, icon: Icon, external }) => (
        <a
          key={label}
          className="floating-contact-btn"
          href={href}
          aria-label={label}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
        >
          <Icon size={22} />
        </a>
      ))}
    </div>
  );
}

export default FloatingContact;
