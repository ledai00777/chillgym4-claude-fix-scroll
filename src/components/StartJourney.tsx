import { useReveal } from '@/lib/reveal';
import { ZALO_CTA_HREF } from '@/lib/site';

const images = {
  opening: 'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787487997/HLV_11.jpg',
  female: 'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787488137/HLV_5.jpg',
  male: 'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787488013/HLV_13.jpg',
};

const membershipOptions = [
  { duration: '3 THÁNG', price: '999K' },
  { duration: '6 THÁNG', price: '1.960K' },
  { duration: '1 NĂM', price: '2.880K' },
];

function StartJourney() {
  const introRef = useReveal<HTMLDivElement>();
  const openingImageRef = useReveal<HTMLDivElement>();
  const memberOfferRef = useReveal<HTMLDivElement>();
  const subheadingRef = useReveal<HTMLDivElement>();
  const femaleOfferRef = useReveal<HTMLDivElement>();
  const maleOfferRef = useReveal<HTMLDivElement>();

  return (
    <>
      <section className="journey-section" id="bat-dau-hanh-trinh" aria-labelledby="journey-heading">
        <div className="journey-intro reveal" ref={introRef}>
          <p className="section-kicker">CHILL GYM</p>
          <h2 id="journey-heading"><em>BẮT ĐẦU</em> HÀNH TRÌNH</h2>
        </div>

        <div className="reveal" ref={openingImageRef}>
          <figure className="journey-opening-image">
            <img
              src={images.opening}
              alt="Huấn luyện viên hướng dẫn hội viên tại Chill Gym"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>

        <div className="member-offer reveal" ref={memberOfferRef}>
          <div className="journey-block-heading">
            <p className="section-kicker">MEMBER</p>
            <h3>TẬP TỰ DO TẠI CHILL GYM</h3>
          </div>

          <div className="membership-options">
            {membershipOptions.map((option) => (
              <div className="membership-option" key={option.duration}>
                <span>{option.duration}</span>
                <strong>{option.price}</strong>
              </div>
            ))}
          </div>

          <a className="button button-secondary journey-cta" href={ZALO_CTA_HREF} target="_blank" rel="noreferrer">
            TƯ VẤN MIỄN PHÍ
          </a>
        </div>
      </section>

      <section className="personal-training-section" id="personal-training">
        <div className="personal-training">
          <div className="journey-subheading reveal" ref={subheadingRef}>
            <p className="section-kicker">PERSONAL TRAINING</p>
            <h3>ĐỒNG HÀNH CÙNG HLV</h3>
          </div>

          <article className="training-offer training-offer-female reveal" ref={femaleOfferRef}>
            <figure className="training-offer-image">
              <img
                src={images.female}
                alt="Huấn luyện viên nữ hướng dẫn tập luyện tại Chill Gym"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="training-offer-content">
              <p className="offer-label">PERSONAL TRAINING</p>
              <h3>TẬP CÙNG HLV</h3>
              <div className="offer-price">
                <span>20 BUỔI</span>
                <strong>4.960.000đ</strong>
              </div>
              <a className="button button-secondary" href={ZALO_CTA_HREF} target="_blank" rel="noreferrer">TƯ VẤN MIỄN PHÍ</a>
            </div>
          </article>

          <article className="training-offer training-offer-male reveal" ref={maleOfferRef}>
            <div className="training-offer-content">
              <p className="offer-label offer-label-start">CHƯA BIẾT</p>
<h3>BẮT ĐẦU TỪ ĐÂU?</h3>
              <div className="offer-price">
                <span>3 BUỔI PT<br />TRẢI NGHIỆM</span>
                <strong>500K</strong>
              </div>
              <a className="button button-secondary" href={ZALO_CTA_HREF} target="_blank" rel="noreferrer">TƯ VẤN MIỄN PHÍ</a>
            </div>
            <figure className="training-offer-image">
              <img
                src={images.male}
                alt="Huấn luyện viên hướng dẫn hội viên nam tại Chill Gym"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </article>
        </div>
      </section>
    </>
  );
}

export default StartJourney;
