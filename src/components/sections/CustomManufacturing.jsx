import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../utils/translations'
import './CustomManufacturing.css'

const CustomManufacturing = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      title: t.home.customManufacturingFeature1,
      description: t.home.customManufacturingFeature1Desc,
      image: '/image/Living room/Living room (5).jpeg',
    },
    {
      title: t.home.customManufacturingFeature2,
      description: t.home.customManufacturingFeature2Desc,
      image: '/image/Dressing room/Dressing room (10).jpeg',
    },
    {
      title: t.home.customManufacturingFeature3,
      description: t.home.customManufacturingFeature3Desc,
      image: '/image/dining table/dining table  (3).jpg',
    },
  ]

  return (
    <section className="custom-manufacturing-section" ref={ref}>
      <div className="custom-manufacturing-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="custom-manufacturing-header"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="custom-manufacturing-title"
          >
            {t.home.customManufacturing}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="custom-manufacturing-description"
          >
            {t.home.customManufacturingDesc}
          </motion.p>
        </motion.div>

        {/* Features with Images */}
        <div className="custom-manufacturing-features">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              className={`custom-manufacturing-feature ${index % 2 === 1 ? 'feature-reverse' : ''}`}
            >
              <div className="custom-manufacturing-feature-image">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="feature-img"
                  loading="lazy"
                />
              </div>
              <div className="custom-manufacturing-feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="custom-manufacturing-cta"
        >
          <Link to="/contact" className="custom-manufacturing-button">
            {t.home.orderNow}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CustomManufacturing

