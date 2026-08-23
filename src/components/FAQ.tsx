import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Minus, Plus } from 'lucide-react';

type FAQItem = {
  number: string;
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    number: '01',
    question: 'Chưa từng tập gym thì có phù hợp không?',
    answer:
      'Có. Phần lớn học viên tại Chill Gym bắt đầu từ con số 0. Huấn luyện viên sẽ hướng dẫn kỹ thuật và lộ trình phù hợp với thể trạng của bạn.',
  },
  {
    number: '02',
    question: 'Tập thử có mất phí không?',
    answer:
      'Bạn có thể đăng ký buổi tập thử hoặc lựa chọn 3 buổi PT trải nghiệm với giá 500K để làm quen với phòng tập và huấn luyện viên.',
  },
  {
    number: '03',
    question: 'Nam và nữ có tập chung được không?',
    answer:
      'Có. Chill Gym là không gian tập luyện dành cho cả nam và nữ, với môi trường văn minh, sạch sẽ và luôn có huấn luyện viên hỗ trợ khi cần.',
  },
  {
    number: '04',
    question: 'PT sẽ theo sát mình như thế nào?',
    answer:
      'Huấn luyện viên sẽ theo dõi kỹ thuật, điều chỉnh bài tập, dinh dưỡng và tiến độ của bạn trong suốt quá trình tập luyện.',
  },
  {
    number: '05',
    question: 'Làm sao để đăng ký tư vấn hoặc bắt đầu tập?',
    answer:
      'Chỉ cần nhấn "Tư vấn miễn phí", đội ngũ Chill Gym sẽ liên hệ để tư vấn lịch tập, mục tiêu và lộ trình phù hợp với bạn.',
  },
];

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

function Reveal({ children, delay }: { children: ReactNode; delay: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div className="reveal" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const introRef = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLDivElement>();

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="faq-section" id="câu-hỏi-thường-gặp" aria-labelledby="faq-heading">
      <div className="faq-intro reveal" ref={introRef}>
        <p className="section-kicker">CÂU HỎI THƯỜNG GẶP</p>
        <h2 id="faq-heading">
          GIẢI ĐÁP
          <br />
          TRƯỚC KHI BẠN
          <br />
          <em>BẮT ĐẦU</em>
        </h2>
        <p className="faq-tagline">Một vài điều mà hầu hết mọi người đều hỏi trước khi đến Chill Gym.</p>
      </div>

      <div className="faq-list reveal" ref={listRef}>
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-button-${index}`;
          return (
            <Reveal key={item.number} delay={index * 60}>
              <div className={`faq-row ${isOpen ? 'is-open' : ''}`}>
                <div className="faq-row-inner">
                  <span className="faq-number" aria-hidden="true">{item.number}</span>
                  <button
                    type="button"
                    id={buttonId}
                    className="faq-question"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(index)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-icon" aria-hidden="true">
                      {isOpen ? <Minus size={22} strokeWidth={1.4} /> : <Plus size={22} strokeWidth={1.4} />}
                    </span>
                  </button>
                </div>
                <div
                  id={panelId}
                  className={`faq-panel ${isOpen ? 'is-open' : ''}`}
                  role="region"
                  aria-labelledby={buttonId}
                >
                  <div className="faq-panel-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export default FAQ;
