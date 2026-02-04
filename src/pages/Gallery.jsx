import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaTimes } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../utils/translations'
import './Gallery.css'

const Gallery = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [selectedImage, setSelectedImage] = useState(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Sample images from different categories
  const galleryImages = [
    { src: '/image/Living room/Living room (9).jpeg', category: 'Living Room' },
    { src: '/image/Living room/Living room (10).jpeg', category: 'Living Room' },
    { src: '/image/Living room/Living room (11).jpeg', category: 'Living Room' },
    { src: '/image/dining table/dining table  (6).jpg', category: 'Dining Room' },
    { src: '/image/dining table/dining table  (7).jpg', category: 'Dining Room' },
    { src: '/image/Dressing room/Dressing room (6).jpeg', category: 'Bedroom' },
    { src: '/image/Dressing room/Dressing room (7).jpeg', category: 'Bedroom' },
    { src: '/image/Dressing room/Dressing room (8).jpeg', category: 'Bedroom' },
    { src: '/image/TV libraries/TV libraries (7).jpeg', category: 'Office' },
    { src: '/image/TV libraries/TV libraries (8).jpeg', category: 'Office' },
    { src: '/image/Living room/Living room (13).jpeg', category: 'Living Room' },
    { src: '/image/Living room/Living room (14).jpeg', category: 'Living Room' },
    { src: '/image/dining table/dining table  (8).jpg', category: 'Dining Room' },
    { src: '/image/Dressing room/Dressing room (9).jpeg', category: 'Bedroom' },
    { src: '/image/TV libraries/TV libraries (9).jpeg', category: 'Office' },
    { src: '/image/Living room/Living room (16).jpeg', category: 'Living Room' },
  ]

  return (
    <div className="gallery-page">
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="gallery-hero"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-gray-900 dark:text-white">
              {t.gallery.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.gallery.description}
            </p>
          </motion.div>

          {/* Masonry Grid */}
          <div className="gallery-masonry">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                onClick={() => setSelectedImage(image)}
                className="gallery-item"
              >
                <div className="gallery-image-container">
                  <img
                    src={image.src}
                    alt={image.category}
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="gallery-overlay" />
                  <div className="gallery-category">
                    <p>{image.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="lightbox-close"
                aria-label="Close"
              >
                <FaTimes className="w-8 h-8" />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.category}
                className="lightbox-image"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery

