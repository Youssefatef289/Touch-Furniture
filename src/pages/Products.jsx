import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'
import { translations } from '../utils/translations'
import './Products.css'

const Products = () => {
  const { language } = useLanguage()
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const t = translations[language]
  const [filter, setFilter] = useState('all')
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.01 })

  // Auto-load images when component mounts
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [])

  // Generate all products from images
  const allProducts = useMemo(() => {
    const products = []
    let id = 1

    // Living Room - 39 images
    for (let i = 1; i <= 39; i++) {
      products.push({
        id: id++,
        name: language === 'ar' ? `أثاث غرفة معيشة ${i}` : `Living Room Furniture ${i}`,
        price: language === 'ar' ? `${(Math.floor(Math.random() * 2000) + 300).toLocaleString('ar-SA')} ر.س` : `$${(Math.floor(Math.random() * 2000) + 300).toLocaleString()}`,
        category: t.collections.livingRoom,
        categoryKey: 'living-room',
        image: `/image/Living room/Living room (${i}).jpeg`,
        imageIndex: i - 1,
      })
    }

    // Bedroom (Dressing room) - 44 images
    for (let i = 1; i <= 44; i++) {
      products.push({
        id: id++,
        name: language === 'ar' ? `أثاث غرفة نوم ${i}` : `Bedroom Furniture ${i}`,
        price: language === 'ar' ? `${(Math.floor(Math.random() * 2000) + 300).toLocaleString('ar-SA')} ر.س` : `$${(Math.floor(Math.random() * 2000) + 300).toLocaleString()}`,
        category: t.collections.bedroom,
        categoryKey: 'bedroom',
        image: `/image/Dressing room/Dressing room (${i}).jpeg`,
        imageIndex: i - 1,
      })
    }

    // Dining Room - 15 images
    for (let i = 1; i <= 15; i++) {
      products.push({
        id: id++,
        name: language === 'ar' ? `طاولة طعام ${i}` : `Dining Table ${i}`,
        price: language === 'ar' ? `${(Math.floor(Math.random() * 2000) + 300).toLocaleString('ar-SA')} ر.س` : `$${(Math.floor(Math.random() * 2000) + 300).toLocaleString()}`,
        category: t.collections.diningRoom,
        categoryKey: 'dining-room',
        image: `/image/dining table/dining table  (${i}).jpg`,
        imageIndex: i - 1,
      })
    }

    // Office (TV libraries) - 17 jpeg images + 5 jpg images = 22 images
    // First add jpeg images (1-17)
    for (let i = 1; i <= 17; i++) {
      products.push({
        id: id++,
        name: language === 'ar' ? `أثاث مكتب ${i}` : `Office Furniture ${i}`,
        price: language === 'ar' ? `${(Math.floor(Math.random() * 2000) + 300).toLocaleString('ar-SA')} ر.س` : `$${(Math.floor(Math.random() * 2000) + 300).toLocaleString()}`,
        category: t.collections.office,
        categoryKey: 'office',
        image: `/image/TV libraries/TV libraries (${i}).jpeg`,
        imageIndex: i - 1,
      })
    }
    // Then add jpg images (1-5)
    for (let i = 1; i <= 5; i++) {
      products.push({
        id: id++,
        name: language === 'ar' ? `أثاث مكتب ${17 + i}` : `Office Furniture ${17 + i}`,
        price: language === 'ar' ? `${(Math.floor(Math.random() * 2000) + 300).toLocaleString('ar-SA')} ر.س` : `$${(Math.floor(Math.random() * 2000) + 300).toLocaleString()}`,
        category: t.collections.office,
        categoryKey: 'office',
        image: `/image/TV libraries/TV libraries (${i}).jpg`,
        imageIndex: 17 + i - 1,
      })
    }

    // Outdoor - 19 images
    for (let i = 1; i <= 19; i++) {
      products.push({
        id: id++,
        name: language === 'ar' ? `أثاث خارجي ${i}` : `Outdoor Furniture ${i}`,
        price: language === 'ar' ? `${(Math.floor(Math.random() * 2000) + 300).toLocaleString('ar-SA')} ر.س` : `$${(Math.floor(Math.random() * 2000) + 300).toLocaleString()}`,
        category: t.collections.outdoor,
        categoryKey: 'outdoor',
        image: `/image/LuxuryFurniture- ClassicStyle/ClassicStyle  (${i}).jpg`,
        imageIndex: i - 1,
      })
    }

    // Children's Room - 5 images
    for (let i = 1; i <= 5; i++) {
      products.push({
        id: id++,
        name: language === 'ar' ? `أثاث غرفة أطفال ${i}` : `Children's Room Furniture ${i}`,
        price: language === 'ar' ? `${(Math.floor(Math.random() * 2000) + 300).toLocaleString('ar-SA')} ر.س` : `$${(Math.floor(Math.random() * 2000) + 300).toLocaleString()}`,
        category: t.collections.childrenRoom,
        categoryKey: 'children',
        image: `/image/children's room/children's room (${i}).jpg`,
        imageIndex: i - 1,
      })
    }

    return products
  }, [language, t])

  const categories = [
    { key: 'all', label: t.common.all, categoryKey: 'all' },
    { key: t.collections.livingRoom, label: t.collections.livingRoom, categoryKey: 'living-room' },
    { key: t.collections.bedroom, label: t.collections.bedroom, categoryKey: 'bedroom' },
    { key: t.collections.diningRoom, label: t.collections.diningRoom, categoryKey: 'dining-room' },
    { key: t.collections.office, label: t.collections.office, categoryKey: 'office' },
    { key: t.collections.outdoor, label: t.collections.outdoor, categoryKey: 'outdoor' },
    { key: t.collections.childrenRoom, label: t.collections.childrenRoom, categoryKey: 'children' },
  ]

  const filteredProducts = useMemo(() => {
    if (filter === 'all') {
      return allProducts
    }
    const selectedCategory = categories.find(cat => cat.key === filter)
    if (selectedCategory) {
      return allProducts.filter(p => p.categoryKey === selectedCategory.categoryKey)
    }
    return allProducts
  }, [filter, allProducts, categories])

  const handleProductClick = (product) => {
    navigate(`/product/${product.categoryKey}/${product.imageIndex}`)
  }

  return (
    <div className="products-page">
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="products-hero"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-bold mb-4 text-gray-900 dark:text-white"
            >
              {t.products.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              {t.products.description}
            </motion.p>
          </motion.div>

          {/* Filter */}
          <div className="products-filters">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key === t.common.all ? 'all' : cat.key)}
                className={`filter-button ${filter === (cat.key === t.common.all ? 'all' : cat.key) ? 'active' : ''}`}
              >
                {cat.key === t.common.all ? t.products.allProducts : cat.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="products-grid"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.015 }}
                className="product-card"
                onClick={() => handleProductClick(product)}
              >
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    loading={index < 12 ? "eager" : "lazy"}
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
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
      </section>
    </div>
  )
}

export default Products

