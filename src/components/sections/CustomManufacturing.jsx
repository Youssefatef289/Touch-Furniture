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

  return (
    <section className="custom-manufacturing-section" ref={ref}>
      <div className="custom-manufacturing-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="custom-manufacturing-content"
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/contact" className="custom-manufacturing-button">
              {t.home.orderNow}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CustomManufacturing

