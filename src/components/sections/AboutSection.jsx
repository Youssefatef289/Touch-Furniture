import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../utils/translations'
import './AboutSection.css'

const AboutSection = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section className="about-section bg-gray-50 dark:bg-gray-800">
      <div className="container-custom" ref={ref}>
        <div className="about-section-content">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="about-section-image-wrapper"
          >
            <div className="about-section-image">
              <img
                src="/image/Living room/Living room (15).jpeg"
                alt="About Touch Furniture"
                loading="lazy"
              />
            </div>
            <div className="about-section-decoration" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="about-section-text"
          >
            <h2>
              {language === 'ar' ? 'من نحن - Touch Furniture' : 'About Touch Furniture'}
            </h2>
            <p>
              {language === 'ar' 
                ? 'في Touch Furniture، نؤمن بأن منزلك يجب أن يكون انعكاساً لأسلوبك الفريد وشخصيتك. مع أكثر من عقد من الخبرة في صناعة الأثاث، قمنا بتجميع مجموعة استثنائية من قطع الأثاث الفاخرة التي تجمع بين الأناقة والوظيفية والتصميم الخالد.'
                : 'At Touch Furniture, we believe that your home should be a reflection of your unique style and personality. With over a decade of experience in the furniture industry, we\'ve curated an exceptional collection of premium furniture pieces that combine elegance, functionality, and timeless design.'}
            </p>
            <p>
              {language === 'ar'
                ? 'مهمتنا هي مساعدتك في إنشاء مساحات معيشة جميلة ومريحة ستحب العودة إليها. كل قطعة في مجموعتنا مختارة بعناية لجودتها وحرفيتها وقدرتها على تحويل الغرف العادية إلى مساحات استثنائية.'
                : 'Our mission is to help you create beautiful, comfortable living spaces that you\'ll love coming home to. Every piece in our collection is carefully selected for its quality, craftsmanship, and ability to transform ordinary rooms into extraordinary spaces.'}
            </p>
            <div className="about-section-stats">
              <div className="about-section-stat">
                <h3>10+</h3>
                <p>{t.stats.yearsExperience}</p>
              </div>
              <div className="about-section-stat">
                <h3>500+</h3>
                <p>{t.stats.happyCustomers}</p>
              </div>
              <div className="about-section-stat">
                <h3>1000+</h3>
                <p>{t.stats.productsAvailable}</p>
              </div>
              <div className="about-section-stat">
                <h3>50+</h3>
                <p>{t.stats.designAwards}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

