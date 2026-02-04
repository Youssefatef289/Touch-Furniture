import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaAward, FaPalette, FaTruck, FaDollarSign } from 'react-icons/fa'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../utils/translations'
import './WhyChooseUs.css'

const WhyChooseUs = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: FaAward,
      title: t.features.highQuality,
      description: t.features.highQualityDesc,
    },
    {
      icon: FaPalette,
      title: t.features.customDesigns,
      description: t.features.customDesignsDesc,
    },
    {
      icon: FaTruck,
      title: t.features.fastDelivery,
      description: t.features.fastDeliveryDesc,
    },
    {
      icon: FaDollarSign,
      title: t.features.affordablePrices,
      description: t.features.affordablePricesDesc,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="why-choose-us bg-white dark:bg-gray-900">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="why-choose-us-header"
        >
          <h2 className="why-choose-us-title">
            {t.home.whyChooseUs}
          </h2>
          <p className="why-choose-us-description">
            {t.home.whyChooseUsDesc}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="why-choose-us-grid"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="feature-card"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="feature-icon-wrapper"
                >
                  <Icon className="feature-icon" />
                </motion.div>
                <h3 className="feature-title">
                  {feature.title}
                </h3>
                <p className="feature-description">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs

