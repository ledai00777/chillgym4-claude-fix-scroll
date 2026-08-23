import { useEffect, useState } from 'react';
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
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 1.2C6.09 1.2 1.2 5.53 1.2 10.95c0 3.02 1.49 5.72 3.84 7.53v3.72l3.5-1.94c1.06.3 2.18.46 3.46.46 5.91 0 10.8-4.33 10.8-9.77C22.8 5.53 17.91 1.2 12 1.2z"
        fill="#0068FF"
      />
      <path
        d="M6.83 7.5h7.2c.28 0 .5.22.5.5v4.8c0 .28-.22.5-.5.5H9.7l-1.4 1.2v-1.2H6.83c-.28 0-.5-.22-.5-.5V8c0-.28.22-.5.5-.5z"
        fill="#fff"
      />
      <path
        d="M8.2 9.3h4.4M8.2 10.5h3.2M8.2 11.7h3.8"
        stroke="#0068FF"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GoogleMapsIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.25 6.3 11.74 6.57 12.02a.45.45 0 0 0 .66 0C12 21.24 19.5 14.75 19.5 9.5 19.5 5.36 16.14 2 12 2z"
        fill="#EA4335"
      />
      <path
        d="M12 12.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
        fill="#fff"
      />
      <path
        d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.25 6.3 11.74 6.57 12.02a.45.45 0 0 0 .66 0C12 21.24 19.5 14.75 19.5 9.5 19.5 5.36 16.14 2 12 2zm0 10.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
        fill="#34A853"
        fillOpacity="0"
      />
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
  {
    label: 'Mở Google Maps',
    href: CONTACT_LINKS.maps,
    icon: GoogleMapsIcon,
    external: true,
  },
];

function FloatingContact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let revealed = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      setVisible(true);
      cleanup();
    };

    const onScroll = () => reveal();
    const onPointer = () => reveal();
    const onKey = () => reveal();

    const cleanup = () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('pointerdown', onPointer, true);
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('touchstart', onPointer, true);
    };

    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('pointerdown', onPointer, true);
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('touchstart', onPointer, true);

    return cleanup;
  }, []);

  return (
    <div
      className={`floating-contact ${visible ? 'is-visible' : ''}`}
      aria-label="Liên hệ nhanh"
    >
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
