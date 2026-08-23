import { useEffect, useRef, type ReactNode } from 'react';

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
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
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

function ContactMap() {
  const introRef = useReveal<HTMLDivElement>();

  return (
    <section className="contact-section" id="địa-chỉ" aria-labelledby="contact-heading">
      <div className="contact-intro reveal" ref={introRef}>
        <p className="section-kicker">ĐỊA ĐIỂM</p>
        <h2 id="contact-heading">
          GHÉ <em>CHILL GYM.</em>
          <br />
          <em>BẮT ĐẦU</em> HÀNH TRÌNH CỦA BẠN.
        </h2>
        <p className="contact-tagline">Chúng tôi luôn sẵn sàng chào đón bạn đến tập thử, tư vấn và đồng hành cùng mục tiêu của bạn.</p>
      </div>

      <div className="contact-layout">
        <Reveal delay={120} className="contact-details">
          <div className="contact-detail-group">
            <p className="contact-label">ĐỊA CHỈ</p>
            <address>
              39A Đường Cách Mạng Tháng Tám
              <br />
              Khu phố Hòa Long, Lái Thiêu
              <br />
              Thuận An, TP. Hồ Chí Minh
              <br />
              Việt Nam
            </address>
          </div>

          <div className="contact-detail-group">
            <p className="contact-label">HOTLINE</p>
            <a className="contact-phone" href="tel:0704952969">070 495 2969</a>
            <p className="contact-person">Mr. Duy</p>
          </div>

          <div className="contact-detail-group">
            <p className="contact-label">GIỜ HOẠT ĐỘNG</p>
            <div className="contact-hours">
              <div>
                <span>THỨ 2 – THỨ 7</span>
                <strong>06:00 – 21:00</strong>
              </div>
              <div>
                <span>CHỦ NHẬT</span>
                <strong>09:00 – 17:00</strong>
              </div>
            </div>
          </div>

          <a
            className="button button-secondary contact-cta"
            href="https://www.google.com/maps/search/?api=1&query=CHILL+GYM+L%C3%A1i+Thi%C3%AAu"
            target="_blank"
            rel="noreferrer"
          >
            MỞ GOOGLE MAPS
          </a>
        </Reveal>

        <Reveal delay={220} className="contact-map-wrap">
          <iframe
            className="contact-map"
            title="Google Maps location of Chill Gym Lái Thiêu"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d323555.1036915002!2d106.395206451416!3d10.893490856593925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d7007386afb7%3A0x82fc31de7964b7e2!2zQ0hJTEwgR1lNIEzDoWkgVGhpw6p1!5e1!3m2!1sen!2s!4v1787491965705!5m2!1sen!2s"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </Reveal>
      </div>
    </section>
  );
}

export default ContactMap;
