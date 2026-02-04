import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFacebook, FaInstagram, FaPhone, FaComments, FaWhatsapp, FaArrowUp } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../utils/translations'
import './FixedIcons.css'

const FixedIcons = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [isExpanded, setIsExpanded] = useState(false)
  const [isScrollVisible, setIsScrollVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsScrollVisible(true)
      } else {
        setIsScrollVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const socialLinks = [
    {
      icon: FaFacebook,
      url: 'https://www.facebook.com',
      label: 'Facebook',
      color: '#1877F2',
    },
    {
      icon: FaInstagram,
      url: 'https://www.instagram.com',
      label: 'Instagram',
      color: '#E4405F',
    },
    {
      icon: FaWhatsapp,
      url: 'https://wa.me/1234567890',
      label: language === 'ar' ? 'واتساب' : 'WhatsApp',
      color: '#25D366',
    },
    {
      icon: FaPhone,
      url: 'tel:+1234567890',
      label: language === 'ar' ? 'اتصل بنا' : 'Call Us',
      color: '#25D366',
    },
    {
      icon: FaComments,
      url: '#',
      label: language === 'ar' ? 'استشارة' : 'Consultation',
      color: '#8A7560',
      onClick: (e) => {
        e.preventDefault()
        // يمكن إضافة منطق فتح نموذج الاستشارة هنا
        alert(language === 'ar' ? 'ستفتح صفحة الاستشارة قريباً' : 'Consultation page will open soon')
      },
    },
  ]

  return (
    <div className="fixed-icons-container">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            className="fixed-icons-menu"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target={social.url.startsWith('tel:') || social.url === '#' ? '_self' : '_blank'}
                  rel={social.url.startsWith('tel:') || social.url === '#' ? '' : 'noopener noreferrer'}
                  onClick={social.onClick}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="fixed-icon-item"
                  style={{ '--icon-color': social.color }}
                  aria-label={social.label}
                >
                  <Icon className="fixed-icon" />
                  <span className="fixed-icon-label">{social.label}</span>
                </motion.a>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {isScrollVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed-scroll-top"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={language === 'ar' ? 'الصعود إلى الأعلى' : 'Scroll to top'}
          >
            <FaArrowUp className="fixed-scroll-icon" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed-icons-toggle"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isExpanded ? (language === 'ar' ? 'إغلاق' : 'Close') : (language === 'ar' ? 'فتح' : 'Open')}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaComments className="fixed-toggle-icon" />
        </motion.div>
      </motion.button>
    </div>
  )
}

export default FixedIcons

