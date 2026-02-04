import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../utils/translations'
import './CollectionDetails.css'

const CollectionDetails = () => {
  const { category } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = translations[language]
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Map category to folder and images
  const categoryMap = {
    'living-room': {
      name: t.collections.livingRoom,
      folder: 'Living room',
      images: Array.from({ length: 39 }, (_, i) => `/image/Living room/Living room (${i + 1}).jpeg`),
    },
    'bedroom': {
      name: t.collections.bedroom,
      folder: 'Dressing room',
      images: Array.from({ length: 44 }, (_, i) => `/image/Dressing room/Dressing room (${i + 1}).jpeg`),
    },
    'dining-room': {
      name: t.collections.diningRoom,
      folder: 'dining table',
      images: Array.from({ length: 15 }, (_, i) => `/image/dining table/dining table  (${i + 1}).jpg`),
    },
    'office': {
      name: t.collections.office,
      folder: 'TV libraries',
      images: [
        // jpeg images (1-17)
        ...Array.from({ length: 17 }, (_, i) => `/image/TV libraries/TV libraries (${i + 1}).jpeg`),
        // jpg images (1-5)
        ...Array.from({ length: 5 }, (_, i) => `/image/TV libraries/TV libraries (${i + 1}).jpg`),
      ],
    },
    'outdoor': {
      name: t.collections.outdoor,
      folder: 'LuxuryFurniture- ClassicStyle',
      images: Array.from({ length: 19 }, (_, i) => `/image/LuxuryFurniture- ClassicStyle/ClassicStyle  (${i + 1}).jpg`),
    },
    'children': {
      name: t.collections.childrenRoom,
      folder: "children's room",
      images: Array.from({ length: 5 }, (_, i) => `/image/children's room/children's room (${i + 1}).jpg`),
    },
  }

  const collection = categoryMap[category]

  useEffect(() => {
    if (!collection) {
      navigate('/collections')
    }
  }, [category, collection, navigate])

  if (!collection) return null

  const handleImageClick = (imageIndex) => {
    navigate(`/product/${category}/${imageIndex}`)
  }

  return (
    <div className="collection-details-page">
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="collection-details-header"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-gray-900 dark:text-white">
              {collection.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {language === 'ar' ? `${collection.images.length} قطعة متاحة` : `${collection.images.length} Items Available`}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="collection-images-grid"
          >
            {collection.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="collection-image-card"
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={image}
                  alt={`${collection.name} ${index + 1}`}
                  className="collection-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
                <div className="collection-image-overlay">
                  <span className="collection-image-number">{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CollectionDetails

