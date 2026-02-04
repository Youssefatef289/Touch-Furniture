import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaEye, FaShoppingCart, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useLanguage } from '../../context/LanguageContext'
import { useCart } from '../../context/CartContext'
import { translations } from '../../utils/translations'
import './BestSellers.css'

const BestSellers = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const { addToCart } = useCart()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const products = [
    {
      id: 1,
      name: language === 'ar' ? 'طقم أريكة حديث' : 'Modern Sofa Set',
      price: language === 'ar' ? '١٬٢٩٩ ر.س' : '$1,299',
      image: '/image/Living room/Living room (5).jpeg',
      category: t.collections.livingRoom,
    },
    {
      id: 2,
      name: language === 'ar' ? 'طاولة طعام أنيقة' : 'Elegant Dining Table',
      price: language === 'ar' ? '٨٩٩ ر.س' : '$899',
      image: '/image/dining table/dining table  (3).jpg',
      category: t.collections.diningRoom,
    },
    {
      id: 3,
      name: language === 'ar' ? 'إطار سرير فاخر' : 'Luxury Bed Frame',
      price: language === 'ar' ? '١٬٥٩٩ ر.س' : '$1,599',
      image: '/image/Dressing room/Dressing room (10).jpeg',
      category: t.collections.bedroom,
    },
    {
      id: 4,
      name: language === 'ar' ? 'حامل تلفزيون عصري' : 'Contemporary TV Stand',
      price: language === 'ar' ? '٦٤٩ ر.س' : '$649',
      image: '/image/TV libraries/TV libraries (5).jpeg',
      category: t.collections.livingRoom,
    },
    {
      id: 5,
      name: language === 'ar' ? 'كرسي ذراع كلاسيكي' : 'Classic Armchair',
      price: language === 'ar' ? '٥٤٩ ر.س' : '$549',
      image: '/image/Living room/Living room (12).jpeg',
      category: t.collections.livingRoom,
    },
    {
      id: 6,
      name: language === 'ar' ? 'طاولة قهوة مصممة' : 'Designer Coffee Table',
      price: language === 'ar' ? '٣٩٩ ر.س' : '$399',
      image: '/image/Living room/Living room (8).jpeg',
      category: t.collections.livingRoom,
    },
    {
      id: 7,
      name: language === 'ar' ? 'مكتب تنفيذي' : 'Executive Desk',
      price: language === 'ar' ? '٧٩٩ ر.س' : '$799',
      image: '/image/TV libraries/TV libraries (10).jpeg',
      category: t.collections.office,
    },
    {
      id: 8,
      name: language === 'ar' ? 'خزانة ملابس حديثة' : 'Modern Wardrobe',
      price: language === 'ar' ? '١٬١٩٩ ر.س' : '$1,199',
      image: '/image/Dressing room/Dressing room (15).jpeg',
      category: t.collections.bedroom,
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

  const openLightbox = (index) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'auto'
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % products.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
  }

  return (
    <section className="best-sellers bg-white dark:bg-gray-900">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="best-sellers-header"
        >
          <h2 className="best-sellers-title">
            {t.home.bestSellers}
          </h2>
          <p className="best-sellers-description">
            {t.home.bestSellersDesc}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="best-sellers-grid"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="product-card"
            >
              <div 
                className="product-image-wrapper"
                onClick={() => openLightbox(products.indexOf(product))}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />
                <div className="product-overlay" />
                
                {/* Content - Appears on Hover */}
                <div className="product-content">
                  {/* Actions - Button in Center */}
                  <div className="product-actions">
                    <button
                      className="product-action-button product-action-cart"
                      onClick={(e) => {
                        e.stopPropagation()
                        addToCart(product)
                      }}
                      aria-label={t.common.addToCart}
                    >
                      <FaShoppingCart className="w-5 h-5" />
                      <span className="product-action-text">{t.common.addToCart}</span>
                    </button>
                  </div>

                  {/* Product Info - Below Button */}
                  <div className="product-info">
                    <p className="product-category">
                      {product.category}
                    </p>
                    <h3 className="product-name">
                      {product.name}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lightbox-close"
                onClick={closeLightbox}
                aria-label="Close"
              >
                <FaTimes className="w-6 h-6" />
              </button>

              <button
                className="lightbox-nav lightbox-prev"
                onClick={prevImage}
                aria-label="Previous"
              >
                <FaChevronLeft className="w-6 h-6" />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={products[currentImageIndex].image}
                  alt={products[currentImageIndex].name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="lightbox-image"
                />
              </AnimatePresence>

              <button
                className="lightbox-nav lightbox-next"
                onClick={nextImage}
                aria-label="Next"
              >
                <FaChevronRight className="w-6 h-6" />
              </button>

              <div className="lightbox-info">
                <h3 className="lightbox-title">
                  {products[currentImageIndex].name}
                </h3>
                <p className="lightbox-price">
                  {products[currentImageIndex].price}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default BestSellers

