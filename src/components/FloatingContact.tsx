import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { CONTACT_LINKS } from '@/lib/site';

function FacebookIcon({ size = 22 }: { size?: number }) {
  return (
    <img
      src="https://res.cloudinary.com/iq7pkdiu/image/upload/v1787503249/5968771.png"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      style={{ objectFit: 'contain', display: 'block' }}
    />
  );
}

function ZaloIcon({ size = 22 }: { size?: number }) {
  return (
    <img
      src="https://res.cloudinary.com/iq7pkdiu/image/upload/v1787502707/Icon_of_Zalo.svg.webp"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      style={{ objectFit: 'contain', display: 'block' }}
    />
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
