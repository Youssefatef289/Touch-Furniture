import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../utils/translations'
import './FeaturedCollections.css'

const FeaturedCollections = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const collections = [
    {
      name: t.collections.livingRoom,
      image: '/image/Living room/Living room (1).jpeg',
      path: '/collection/living-room',
      count: language === 'ar' ? '39+ قطعة' : '39+ Items',
    },
    {
      name: t.collections.bedroom,
      image: '/image/Dressing room/Dressing room (1).jpeg',
      path: '/collection/bedroom',
      count: language === 'ar' ? '44+ قطعة' : '44+ Items',
    },
    {
      name: t.collections.diningRoom,
      image: '/image/dining table/dining table  (1).jpg',
      path: '/collection/dining-room',
      count: language === 'ar' ? '15+ قطعة' : '15+ Items',
    },
    {
      name: t.collections.office,
      image: '/image/TV libraries/TV libraries (1).jpeg',
      path: '/collection/office',
      count: language === 'ar' ? '24+ قطعة' : '24+ Items',
    },
    {
      name: t.collections.outdoor,
      image: '/image/LuxuryFurniture- ClassicStyle/ClassicStyle  (1).jpg',
      path: '/collection/outdoor',
      count: language === 'ar' ? '19+ قطعة' : '19+ Items',
    },
    {
      name: t.collections.childrenRoom,
      image: '/image/children\'s room/children\'s room (1).jpg',
      path: '/collection/children',
      count: language === 'ar' ? '5+ قطع' : '5+ Items',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="featured-collections bg-gray-50 dark:bg-gray-800">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="featured-collections-header"
        >
          <h2 className="featured-collections-title">
            {t.home.featuredCollections}
          </h2>
          <p className="featured-collections-description">
            {t.home.featuredCollectionsDesc}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="featured-collections-grid"
        >
          {collections.map((collection, index) => (
            <motion.div
              key={collection.name}
              variants={itemVariants}
              className="collection-card"
            >
              <Link to={collection.path} className="collection-card-link">
                <div className="collection-image-wrapper">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="collection-image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = '/image/logo.png'
                    }}
                  />
                  <div className="collection-gradient" />
                  <div className="collection-info">
                    <h3 className="collection-name">
                      {collection.name}
                    </h3>
                    <p className="collection-count">{collection.count}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedCollections

