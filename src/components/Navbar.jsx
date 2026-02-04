import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'
import { translations } from '../utils/translations'
import { FaBars, FaTimes, FaMoon, FaSun, FaShoppingCart } from 'react-icons/fa'
import Cart from './Cart'
import './Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const { getTotalItems } = useCart()
  const location = useLocation()
  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/collections', label: t.nav.collections },
    { path: '/about', label: t.nav.about },
    { path: '/products', label: t.nav.products },
    { path: '/gallery', label: t.nav.gallery },
    { path: '/contact', label: t.nav.contact },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className={`flex items-center navbar-logo-link ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2 sm:space-x-3`}>
            <img
              src="/image/logo.png"
              alt="Touch Furniture"
              className="h-8 w-auto sm:h-12 navbar-logo-img"
            />
            <span className="text-lg sm:text-2xl font-serif font-bold text-primary-700 dark:text-primary-400 navbar-logo-text">
              Touch Furniture
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center navbar-nav-links ${language === 'ar' ? 'space-x-reverse' : ''} space-x-6 lg:space-x-8`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm lg:text-base font-medium transition-colors navbar-nav-link ${
                  location.pathname === link.path
                    ? 'text-primary-700 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Language Toggle, Cart, Theme Toggle & Mobile Menu Button */}
          <div className={`flex items-center navbar-actions ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2 sm:space-x-4`}>
            <button
              onClick={toggleLanguage}
              className="px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-400 font-semibold hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors text-xs sm:text-sm navbar-language-btn"
              aria-label="Toggle language"
            >
              {language === 'ar' ? 'EN' : 'AR'}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 sm:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors navbar-cart-btn"
              aria-label="Shopping cart"
            >
              <FaShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 navbar-cart-icon" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-primary-600 text-white text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center navbar-cart-badge">
                  {getTotalItems()}
                </span>
              )}
            </button>

            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors navbar-theme-btn"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <FaSun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 navbar-theme-icon" />
              ) : (
                <FaMoon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 navbar-theme-icon" />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors navbar-menu-btn"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-5 h-5 sm:w-6 sm:h-6 navbar-menu-icon" />
              ) : (
                <FaBars className="w-5 h-5 sm:w-6 sm:h-6 navbar-menu-icon" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="container-custom py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 px-4 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </motion.nav>
  )
}

export default Navbar

