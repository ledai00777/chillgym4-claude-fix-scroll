import { useEffect, useRef, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react';
import { smoothScrollToSelector } from '@/lib/scroll';
import { CONTACT_LINKS } from '@/lib/site';

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          observer.unobserve(node);
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function Reveal({ children, delay, className = '' }: { children: ReactNode; delay: number; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div className={`reveal ${className}`} ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const exploreLinks = [
  { label: 'Giới thiệu', href: '#giới-thiệu' },
  { label: 'Huấn luyện viên', href: '#dong-hanh-cung-ban' },
  { label: 'Đánh giá', href: '#danh-gia' },
  { label: 'FAQ', href: '#câu-hỏi-thường-gặp' },
  { label: 'Các gói tập', href: '#bat-dau-hanh-trinh' },
];

const socialLinks = [
  { label: 'Facebook', href: CONTACT_LINKS.messenger },
  { label: 'Zalo', href: CONTACT_LINKS.zalo },
];

function Footer() {
  const handleFooterNavClick = (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    smoothScrollToSelector(href);
  };

  return (
    <footer className="site-footer" id="footer" aria-labelledby="footer-heading">
      <div className="footer-transition" aria-hidden="true" />

      <div className="footer-inner">
        <div className="footer-brand-statement">
          <Reveal delay={0}>
            <p className="footer-eyebrow">CHILL GYM • LÁI THIÊU</p>
          </Reveal>

          <h2 id="footer-heading" className="footer-slogan">
            <Reveal delay={120}><span className="footer-slogan-line">RÈN THÂN.</span></Reveal>
            <Reveal delay={240}><span className="footer-slogan-line">LUYỆN Ý.</span></Reveal>
            <Reveal delay={360}><span className="footer-slogan-line footer-slogan-accent">ĐỔI ĐỜI.</span></Reveal>
          </h2>

          <Reveal delay={480}>
            <p className="footer-support">
              Bắt đầu hành trình thay đổi từ buổi tập đầu tiên tại Chill Gym.
            </p>
          </Reveal>
        </div>

        <div className="footer-grid">
          <Reveal delay={120} className="footer-column">
            <p className="footer-column-heading">CHILL GYM</p>
            <nav aria-label="Khám phá">
              <ul className="footer-links">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleFooterNavClick(e, link.href)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal delay={200} className="footer-column">
            <p className="footer-column-heading">LIÊN HỆ</p>
            <address>
              <a href="tel:0704952969">070 495 2969</a>
              <span className="footer-address-line">39A Đường Cách Mạng Tháng Tám</span>
              <span className="footer-address-line">KP Hòa Long, Lái Thiêu</span>
              <span className="footer-address-line">Thuận An, TP. Hồ Chí Minh</span>
            </address>
            <div className="footer-hours">
              <div>
                <span>Thứ 2 – Thứ 7</span>
                <strong>06:00 – 21:00</strong>
              </div>
              <div>
                <span>Chủ Nhật</span>
                <strong>09:00 – 17:00</strong>
              </div>
            </div>
          </Reveal>

          <Reveal delay={280} className="footer-column">
            <p className="footer-column-heading">THEO DÕI</p>
            <nav aria-label="Mạng xã hội">
              <ul className="footer-links">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>

        <Reveal delay={360}>
          <div className="footer-bottom">
            <div className="footer-divider" />
            <div className="footer-copyright">
              <p>© 2026 Chill Gym. All rights reserved.</p>
              <p className="footer-built">Built in Lái Thiêu, Bình Dương.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

export default Footer;
