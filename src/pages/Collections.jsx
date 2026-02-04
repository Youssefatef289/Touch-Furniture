import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../utils/translations'
import './Collections.css'

const Collections = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  const [selectedCategory, setSelectedCategory] = useState(category || 'all')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const categories = [
    { id: 'all', name: t.collections.allCollections, image: '/image/Living room/Living room (1).jpeg' },
    { id: 'living-room', name: t.collections.livingRoom, image: '/image/Living room/Living room (2).jpeg' },
    { id: 'bedroom', name: t.collections.bedroom, image: '/image/Dressing room/Dressing room (2).jpeg' },
    { id: 'dining-room', name: t.collections.diningRoom, image: '/image/dining table/dining table  (2).jpg' },
    { id: 'office', name: t.collections.office, image: '/image/TV libraries/TV libraries (2).jpeg' },
    { id: 'outdoor', name: t.collections.outdoor, image: '/image/LuxuryFurniture- ClassicStyle/LuxuryFurniture- ClassicStyle (2).jpg' },
    { id: 'children', name: t.collections.childrenRoom, image: '/image/children\'s room/children\'s room (2).jpg' },
  ]

  useEffect(() => {
    if (category) {
      setSelectedCategory(category)
    }
  }, [category])

  return (
    <div className="collections-page">
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="collections-hero"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-gray-900 dark:text-white">
              {t.collections.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.collections.description}
            </p>
          </motion.div>

          <div className="collections-grid">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`collection-card ${selectedCategory === cat.id ? 'selected' : ''}`}
              >
                <div className="collection-image">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="collection-overlay" />
                  <div className="collection-info">
                    <h3 className="text-2xl font-serif font-bold">{cat.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Collections

