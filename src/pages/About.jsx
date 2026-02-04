import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaAward, FaUsers, FaBox, FaHeart } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../utils/translations'
import './About.css'

const About = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const stats = [
    { icon: FaAward, number: '10+', label: t.stats.yearsExperience },
    { icon: FaUsers, number: '500+', label: t.stats.happyCustomers },
    { icon: FaBox, number: '1000+', label: t.stats.productsAvailable },
    { icon: FaHeart, number: '50+', label: t.stats.designAwards },
  ]

  const values = [
    {
      title: t.about.qualityFirst,
      description: t.about.qualityFirstDesc,
    },
    {
      title: t.about.customerFocus,
      description: t.about.customerFocusDesc,
    },
    {
      title: t.about.innovation,
      description: t.about.innovationDesc,
    },
    {
      title: t.about.sustainability,
      description: t.about.sustainabilityDesc,
    },
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="section-padding about-hero">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
            ref={ref}
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-gray-900 dark:text-white">
              {t.about.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t.about.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="/image/Living room/Living room (20).jpeg"
                  alt="Touch Furniture Story"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-gray-900 dark:text-white">
                {t.about.story}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {t.about.storyText1}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {t.about.storyText2}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.about.storyText3}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="about-stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gray-900 dark:text-white">
              {t.about.values}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.about.valuesDesc}
            </p>
          </motion.div>

          <div className="about-values-grid">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <h3 className="text-2xl font-serif font-bold mb-3 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

