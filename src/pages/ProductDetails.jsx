import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaChevronLeft, FaChevronRight, FaTimes, FaShoppingCart, FaArrowLeft } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'
import { translations } from '../utils/translations'
import './ProductDetails.css'

const ProductDetails = () => {
  const { category, imageIndex } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const { addToCart } = useCart()
  const t = translations[language]
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(parseInt(imageIndex) || 0)

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
      images: Array.from({ length: 24 }, (_, i) => `/image/TV libraries/TV libraries (${i + 1}).jpeg`),
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
      return
    }
    setCurrentImageIndex(parseInt(imageIndex) || 0)
  }, [category, imageIndex, collection, navigate])

  if (!collection) return null

  const currentImage = collection.images[currentImageIndex]
  const productName = language === 'ar' 
    ? `${collection.name} - قطعة ${currentImageIndex + 1}`
    : `${collection.name} - Item ${currentImageIndex + 1}`

  const product = {
    id: `${category}-${currentImageIndex}`,
    name: productName,
    price: language === 'ar' ? '١٬٢٩٩ ر.س' : '$1,299',
    image: currentImage,
    category: collection.name,
  }

  const nextImage = () => {
    const next = (currentImageIndex + 1) % collection.images.length
    setCurrentImageIndex(next)
    navigate(`/product/${category}/${next}`, { replace: true })
  }

  const prevImage = () => {
    const prev = (currentImageIndex - 1 + collection.images.length) % collection.images.length
    setCurrentImageIndex(prev)
    navigate(`/product/${category}/${prev}`, { replace: true })
  }

  const openLightbox = () => {
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'auto'
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
  }

  return (
    <div className="product-details-page">
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom" ref={ref}>
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            onClick={() => navigate(`/collection/${category}`)}
            className="product-back-button"
          >
            <FaArrowLeft className="w-5 h-5" />
            <span>{language === 'ar' ? 'رجوع' : 'Back'}</span>
          </motion.button>

          <div className="product-details-content">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="product-image-section"
            >
              <div className="product-main-image-wrapper" onClick={openLightbox}>
                <img
                  src={currentImage}
                  alt={productName}
                  className="product-main-image"
                  loading="eager"
                  onError={(e) => {
                    e.target.src = '/image/logo.png'
                  }}
                />
                <div className="product-image-overlay">
                  <span className="product-view-text">
                    {language === 'ar' ? 'انقر للعرض' : 'Click to View'}
                  </span>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="product-nav-button product-nav-prev"
                aria-label="Previous"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="product-nav-button product-nav-next"
                aria-label="Next"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>

              {/* Thumbnails */}
              <div className="product-thumbnails">
                {collection.images.slice(0, 6).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index)
                      navigate(`/product/${category}/${index}`, { replace: true })
                    }}
                    className={`product-thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="product-info-section"
            >
              <p className="product-category-badge">{collection.name}</p>
              <h1 className="product-title">{productName}</h1>
              <p className="product-description">
                {language === 'ar'
                  ? 'قطعة أثاث فاخرة مصممة بعناية لتضفي لمسة من الأناقة والراحة على مساحتك. مصنوعة من أجود المواد الخام مع الاهتمام بأدق التفاصيل.'
                  : 'A premium furniture piece carefully designed to add elegance and comfort to your space. Made from the finest materials with attention to every detail.'}
              </p>

              <div className="product-features">
                <div className="product-feature">
                  <span className="feature-label">
                    {language === 'ar' ? 'المادة:' : 'Material:'}
                  </span>
                  <span className="feature-value">
                    {language === 'ar' ? 'خشب عالي الجودة' : 'Premium Wood'}
                  </span>
                </div>
                <div className="product-feature">
                  <span className="feature-label">
                    {language === 'ar' ? 'الأبعاد:' : 'Dimensions:'}
                  </span>
                  <span className="feature-value">
                    {language === 'ar' ? 'متوفر بأحجام مختلفة' : 'Available in various sizes'}
                  </span>
                </div>
                <div className="product-feature">
                  <span className="feature-label">
                    {language === 'ar' ? 'الضمان:' : 'Warranty:'}
                  </span>
                  <span className="feature-value">
                    {language === 'ar' ? '5 سنوات' : '5 Years'}
                  </span>
                </div>
              </div>

              <div className="product-actions-section">
                <button
                  onClick={() => addToCart(product)}
                  className="product-add-to-cart-button"
                >
                  <FaShoppingCart className="w-5 h-5" />
                  <span>{t.common.addToCart}</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="product-lightbox-overlay"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="product-lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="product-lightbox-close"
                onClick={closeLightbox}
                aria-label="Close"
              >
                <FaTimes className="w-6 h-6" />
              </button>

              <button
                className="product-lightbox-nav product-lightbox-prev"
                onClick={prevImage}
                aria-label="Previous"
              >
                <FaChevronLeft className="w-6 h-6" />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={currentImage}
                  alt={productName}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="product-lightbox-image"
                />
              </AnimatePresence>

              <button
                className="product-lightbox-nav product-lightbox-next"
                onClick={nextImage}
                aria-label="Next"
              >
                <FaChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductDetails

