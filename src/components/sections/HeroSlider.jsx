import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../utils/translations'
import './HeroSlider.css'

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { language } = useLanguage()
  const t = translations[language]

  const slides = [
    {
      image: '/image/slider/slider (1).jpg',
      title: language === 'ar' ? 'Touch Furniture' : 'Touch Furniture',
      subtitle: language === 'ar' ? 'راحة عصرية لمنزلك' : 'Modern Comfort for Your Home',
      description: language === 'ar' 
        ? 'اكتشف مجموعات الأثاث الفاخرة المصممة لتحويل مساحة معيشتك'
        : 'Discover premium furniture collections designed to transform your living space',
    },
    {
      image: '/image/slider/slider (2).jpg',
      title: language === 'ar' ? 'تصميم أنيق' : 'Elegant Design',
      subtitle: language === 'ar' ? 'حيث يلتقي الأسلوب بالوظيفة' : 'Where Style Meets Functionality',
      description: language === 'ar'
        ? 'اختبر المزيج المثالي من الجمال والراحة'
        : 'Experience the perfect blend of aesthetics and comfort',
    },
    {
      image: '/image/slider/slider (3).jpg',
      title: language === 'ar' ? 'جودة فاخرة' : 'Premium Quality',
      subtitle: language === 'ar' ? 'مصنوع بإتقان' : 'Crafted with Excellence',
      description: language === 'ar'
        ? 'كل قطعة مختارة بعناية لضمان الجمال الدائم والمتانة'
        : 'Every piece is carefully selected to ensure lasting beauty and durability',
    },
    {
      image: '/image/slider/slider (4).jpg',
      title: language === 'ar' ? 'حوّل مساحتك' : 'Transform Your Space',
      subtitle: language === 'ar' ? 'أنشئ منزل أحلامك' : 'Create Your Dream Home',
      description: language === 'ar'
        ? 'استكشف مجموعاتنا المختارة واعثر على القطع المثالية لكل غرفة'
        : 'Explore our curated collections and find the perfect pieces for every room',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="hero-slider">
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => {
          if (index !== currentSlide) return null
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-slide-wrapper"
            >
              <div className="hero-container">
                {/* Text Content - Left Side */}
                <motion.div
                  initial={{ opacity: 0, x: language === 'ar' ? 80 : -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: language === 'ar' ? -80 : 80 }}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="hero-content-wrapper"
                >
                  <div className="hero-text-content">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="hero-text-inner"
                    >
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="hero-badge"
                      >
                        {t.hero.badge}
                      </motion.span>
                      <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        className="hero-title"
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                        className="hero-subtitle"
                      >
                        {slide.subtitle}
                      </motion.p>
                      <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.7 }}
                        className="hero-description"
                      >
                        {slide.description}
                      </motion.p>
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.7 }}
                        className="hero-buttons"
                      >
                        <Link to="/products" className="hero-button-primary">
                          {t.hero.shopNow}
                        </Link>
                        <Link to="/collections" className="hero-button-secondary">
                          {t.hero.exploreCollection}
                        </Link>
                      </motion.div>
                    </motion.div>

                    {/* Slide Counter */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="hero-slide-counter"
                    >
                      <span className="hero-slide-current">{String(currentSlide + 1).padStart(2, '0')}</span>
                      <span className="hero-slide-separator">/</span>
                      <span className="hero-slide-total">{String(slides.length).padStart(2, '0')}</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Image Slider - Right Side */}
                <motion.div
                  initial={{ opacity: 0, x: language === 'ar' ? -80 : 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: language === 'ar' ? 80 : -80 }}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="hero-image-wrapper"
                >
                  <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="hero-image-slide"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="hero-image"
                      loading="eager"
                    />
                    <div className="hero-image-overlay" />
                    <div className="hero-image-shine" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default HeroSlider

