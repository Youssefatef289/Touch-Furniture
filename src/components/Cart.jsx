import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../utils/translations'
import './Cart.css'

const Cart = ({ isOpen, onClose }) => {
  const { language } = useLanguage()
  const t = translations[language]
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCart()

  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return price
    }
    return language === 'ar' ? `${price} ر.س` : `$${price}`
  }

  return (
    <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="cart-overlay"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: language === 'ar' ? 400 : -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: language === 'ar' ? 400 : -400, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="cart-sidebar"
            >
              <div className="cart-header">
                <h2 className="cart-title">
                  {language === 'ar' ? 'سلة التسوق' : 'Shopping Cart'}
                </h2>
                <button onClick={onClose} className="cart-close" aria-label="Close">
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <div className="cart-content">
                {cartItems.length === 0 ? (
                  <div className="cart-empty">
                    <FaShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'سلة التسوق فارغة' : 'Your cart is empty'}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="cart-items">
                      {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="cart-item-image"
                          />
                          <div className="cart-item-details">
                            <h3 className="cart-item-name">{item.name}</h3>
                            <p className="cart-item-category">{item.category}</p>
                            <div className="cart-item-controls">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="cart-quantity-btn"
                                aria-label="Decrease quantity"
                              >
                                <FaMinus className="w-3 h-3" />
                              </button>
                              <span className="cart-quantity">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="cart-quantity-btn"
                                aria-label="Increase quantity"
                              >
                                <FaPlus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <div className="cart-item-right">
                            <p className="cart-item-price">{item.price}</p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="cart-remove-btn"
                              aria-label="Remove item"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="cart-footer">
                      <div className="cart-total">
                        <span className="cart-total-label">
                          {language === 'ar' ? 'الإجمالي:' : 'Total:'}
                        </span>
                        <span className="cart-total-price">
                          {formatPrice(getTotalPrice().toFixed(2))}
                        </span>
                      </div>
                      <div className="cart-actions">
                        <button onClick={clearCart} className="cart-clear-btn">
                          {language === 'ar' ? 'مسح السلة' : 'Clear Cart'}
                        </button>
                        <button className="cart-checkout-btn">
                          {language === 'ar' ? 'إتمام الطلب' : 'Checkout'}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
    </AnimatePresence>
  )
}

export default Cart

