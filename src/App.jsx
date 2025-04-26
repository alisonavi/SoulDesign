import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import {
  FaMapMarkerAlt,
  FaCommentDots,
  FaPhone,
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
  FaArrowRight
} from 'react-icons/fa';
import PortfolioCarousel from './components/PortfolioCarousel';
import aboutImage from './assets/about-image.jpg';
import port1 from './assets/1-port.jpg';
import port2 from './assets/2-port.jpg';
import port3 from './assets/3-port.jpg';
import port4 from './assets/4-port.jpg';
import port5 from './assets/5-port.jpg';
import port6 from './assets/6-port.jpg';
import port7 from './assets/7-port.jpg';
import port8 from './assets/8-port.jpg';
import port9 from './assets/9-port.jpg';
import port10 from './assets/10-port.jpg';
import port11 from './assets/11-port.jpg';
import bgImage from './assets/2-port-1920x1080.jpg';
import emailjs from 'emailjs-com';


function App() {
  const formRef = useRef(null);
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formState.name || formState.name.trim().length < 2) {
      newErrors.name = 'Введите имя (минимум 2 символа)';
    }
    if (!formState.phone || !/^\+?\d{7,15}$/.test(formState.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Введите корректный номер телефона';
    }
    if (!formState.message || formState.message.trim().length < 10) {
      newErrors.message = 'Опишите ваш проект (минимум 10 символов)';
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    setSubmitResult(null);
    emailjs
      .sendForm(
        'service_m9pr426',     // ← your Service ID
        'template_72xvng6',    // ← your Template ID
        formRef.current,   // ← the form DOM node
        'xgaqymzSq4eNUHe0R'         // ← your Public Key / User ID
      )
      .then(
        (result) => {
          setSubmitting(false);
          setSubmitResult({ success: true, message: 'Спасибо! Ваше сообщение отправлено.' });
          setFormState({ name: '', phone: '', message: '' });
          formRef.current.reset();
        },
        (error) => {
          setSubmitting(false);
          setSubmitResult({ success: false, message: 'Ошибка при отправке. Попробуйте позже.' });
        }
      );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const portfolioImages = [
    port1, port2, port3, port4, port5,
    port6, port7, port8, port9, port10
  ];

  return (
    <div className="App" style={{ backgroundImage: `url(${bgImage})` }}>
      {/* Hero Section */}
      <section id="hero" className="section">
        <div className="content-panel">
          <h1>Soul Design by Zhansaya Mukhtar</h1>
          <p>Ваш интерьер — ваша индивидуальность.<br />Создаём стильные, современные пространства под ключ.</p>
          <div className="social-buttons">
            <a
              className="btn-social"
              href="https://wa.me/77077302090"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp /> WhatsApp
            </a>
            <a
              className="btn-social instagram-button"
              href="https://www.instagram.com/soulhome_qz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram /> Instagram
            </a>
            <a
              className="btn-social"
              href="tel:+77077302090"
              aria-label="Позвонить"
            >
              <FaPhone /> Позвонить
            </a>
          </div>
          <button className="btn-learn-more" onClick={() => scrollTo('about')}>
            Узнать больше <span className="arrow">⌄</span>
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="content-panel">
          <h2>О нас</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Soul Design — это команда профессионалов под руководством Жансаи Мухтар.
                Мы создаём не просто красивые интерьеры — мы делаем дома и офисы удобными,
                функциональными и отражающими ваш характер.
              </p>
              <ul className="about-features">
                <li>Более 7 лет опыта</li>
                <li>100+ реализованных проектов</li>
                <li>Работаем с любым бюджетом</li>
              </ul>
            </div>
            <div className="about-image">
              <img src={aboutImage} alt="О нас" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="content-panel">
          <h2>Наши услуги</h2>
          <ul className="features-list">
            <li>Индивидуальный дизайн-проект</li>
            <li>3D-визуализация</li>
            <li>Рабочие чертежи</li>
            <li>Комплектация (мебель, освещение, декор)</li>
            <li>Авторский надзор</li>
            <li>Подбор материалов</li>
            <li>Декорирование</li>
            <li>Консультации по ремонту и планировке</li>
            <li>Организация строительной бригады</li>
          </ul>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section">
        <div className="content-panel">
          <h2>Портфолио</h2>
          <PortfolioCarousel images={portfolioImages} />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="section">
        <div className="content-panel">
          <h2>Почему выбирают нас?</h2>
          <ul className="features-list">
            <li>Честный, прозрачный подход</li>
            <li>Современные решения и уникальный стиль</li>
            <li>Поддержка на каждом этапе: от идеи до финального декора</li>
            <li>Опыт работы с premium- и middle-сегментом</li>
            <li>Экономия вашего времени — всё под ключ</li>
          </ul>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="section">
        <div className="content-panel">
          <h2>Как мы работаем?</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <p>Знакомство и брифинг</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <p>Создание планировки (3 варианта на выбор)</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <p>3D-визуализация — вы увидите будущий интерьер до начала работ</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <p>Согласование и рабочие чертежи</p>
            </div>
            <div className="step">
              <div className="step-number">5</div>
              <p>Подбор и закупка материалов, мебели, освещения</p>
            </div>
            <div className="step">
              <div className="step-number">6</div>
              <p>Авторский надзор и сопровождение до финального результата</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="content-panel">
          <h2>Контакты</h2>
          <div className="contact-info">
            <a href="https://wa.me/77077302090" className="contact-method">
              <FaWhatsapp />
              <span>WhatsApp</span>
            </a>
            <a href="https://www.instagram.com/soulhome_qz/" className="contact-method">
              <FaInstagram />
              <span>Instagram</span>
            </a>
            <a href="tel:+7XXXXXXXXXX" className="contact-method">
              <FaPhone />
              <span>+7 707 730 20 90</span>
            </a>
            <a href="mailto:your@email.com" className="contact-method">
              <FaEnvelope />
              <span>zhansaya.mukhtarr@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <section id="request-form" className="section">
        <div className="content-panel">
          <h2>Форма заявки</h2>
          <p>Хотите обсудить свой проект?</p>
          <p>Оставьте заявку — и мы свяжемся с вами в ближайшее время!</p>
          <form ref={formRef} onSubmit={sendEmail} className="contact-form" autoComplete="off">
            <input
              type="text"
              name="name"
              placeholder="Имя"
              value={formState.name}
              onChange={handleInputChange}
              required
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <div className="form-error">{errors.name}</div>}
            <input
              type="tel"
              name="phone"
              placeholder="Телефон/WhatsApp"
              value={formState.phone}
              onChange={handleInputChange}
              required
              className={errors.phone ? 'input-error' : ''}
            />
            {errors.phone && <div className="form-error">{errors.phone}</div>}
            <textarea
              name="message"
              placeholder="Опишите свой проект/пожелания"
              value={formState.message}
              onChange={handleInputChange}
              required
              className={errors.message ? 'input-error' : ''}
            ></textarea>
            {errors.message && <div className="form-error">{errors.message}</div>}
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? <span className="loader"></span> : 'Отправить'}
            </button>
            {submitResult && (
              <div className={submitResult.success ? 'form-success' : 'form-error'}>
                {submitResult.message}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="section">
        <div className="content-panel">
          <h2>Ваш идеальный интерьер — ближе, чем кажется.</h2>
          <p>Давайте создадим его вместе!</p>
          <button className="btn-primary" onClick={() => scrollTo('contact')}>
            Связаться с Soul Design
            <FaArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
