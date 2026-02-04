import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../utils/translations'
import './Testimonials.css'

const Testimonials = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const testimonials = [
    {
      name: language === 'ar' ? 'سارة جونسون' : 'Sarah Johnson',
      role: language === 'ar' ? 'صاحبة منزل' : 'Homeowner',
      image: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      text: language === 'ar' 
        ? 'حولت Touch Furniture غرفة معيشتي بالكامل! الجودة استثنائية والتصميم هو بالضبط ما كنت أبحث عنه. أنصح به بشدة!'
        : 'Touch Furniture transformed my living room completely! The quality is exceptional and the design is exactly what I was looking for. Highly recommend!',
    },
    {
      name: language === 'ar' ? 'مايكل تشن' : 'Michael Chen',
      role: language === 'ar' ? 'مصمم داخلي' : 'Interior Designer',
      image: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      text: language === 'ar'
        ? 'كمصمم محترف، أثق بـ Touch Furniture لجميع مشاريع عملائي. قطعهم أنيقة ومتينة ودائماً على الموضة.'
        : 'As a professional designer, I trust Touch Furniture for all my client projects. Their pieces are elegant, durable, and always on-trend.',
    },
    {
      name: language === 'ar' ? 'إيميلي رودريجيز' : 'Emily Rodriguez',
      role: language === 'ar' ? 'عميلة' : 'Customer',
      image: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      text: language === 'ar'
        ? 'خدمة العملاء كانت ممتازة، والتوصيل كان سريعاً. الأثاث يبدو أفضل في الواقع من الصور!'
        : 'The customer service was outstanding, and the delivery was prompt. The furniture looks even better in person than in the photos!',
    },
    {
      name: language === 'ar' ? 'ديفيد طومسون' : 'David Thompson',
      role: language === 'ar' ? 'صاحب عمل' : 'Business Owner',
      image: 'https://i.pravatar.cc/150?img=33',
      rating: 5,
      text: language === 'ar'
        ? 'أثثت مكتبي بالكامل بـ Touch Furniture. التصميم العصري والحرفية عالية الجودة تجاوزت جميع توقعاتي.'
        : 'I furnished my entire office with Touch Furniture. The modern design and quality craftsmanship exceeded all my expectations.',
    },
  ]

  useEffect(() => {
    if (inView) {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 5000)

      return () => clearInterval(timer)
    }
  }, [inView, testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="testimonials bg-gray-50 dark:bg-gray-800" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="testimonials-header"
        >
          <h2 className="testimonials-title">
            {t.home.testimonials}
          </h2>
          <p className="testimonials-description">
            {t.home.testimonialsDesc}
          </p>
        </motion.div>

        <div className="testimonials-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="testimonial-card"
            >
              <FaQuoteLeft className="testimonial-quote-icon" />
              <p className="testimonial-text">
                &quot;{testimonials[currentTestimonial].text}&quot;
              </p>
              <div className="testimonial-rating">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <FaStar key={i} className="testimonial-star" />
                ))}
              </div>
              <div className="testimonial-author">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="testimonial-avatar"
                />
                <div className="testimonial-author-info">
                  <h4>
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p>
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="testimonial-navigation prev"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="testimonial-navigation next"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`testimonial-dot ${index === currentTestimonial ? 'active' : ''}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

