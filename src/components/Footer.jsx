import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../utils/translations'

const Footer = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    quick: [
      { path: '/', label: t.nav.home },
      { path: '/collections', label: t.nav.collections },
      { path: '/products', label: t.nav.products },
      { path: '/about', label: t.nav.about },
    ],
    support: [
      { path: '/contact', label: t.nav.contact },
      { path: '/gallery', label: t.nav.gallery },
      { path: '#', label: t.footer.shippingInfo },
      { path: '#', label: t.footer.returns },
    ],
  }

  const socialLinks = [
    { icon: FaFacebook, url: 'https://www.facebook.com/TOUCH.INERIOR', label: 'Facebook' },
    { icon: FaInstagram, url: '#', label: 'Instagram' },
    { icon: FaWhatsapp, url: 'https://wa.me/201220263076', label: 'WhatsApp' },
    { icon: FaPhone, url: 'tel:+201220263076', label: language === 'ar' ? 'هاتف' : 'Phone' },
  ]

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/image/logo.png"
                alt="Touch Furniture"
                className="h-10 w-auto"
              />
              <span className="text-xl font-serif font-bold text-white">
                Touch Furniture
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              {t.footer.description}
            </p>
            <div className="flex space-x-4 flex-wrap gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon
                const isPhoneOrWhatsApp = social.url.startsWith('tel:') || social.url.startsWith('https://wa.me/')
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target={isPhoneOrWhatsApp ? '_self' : '_blank'}
                    rel={isPhoneOrWhatsApp ? '' : 'noopener noreferrer'}
                    className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-primary-600 rounded-full transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white font-serif text-lg mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {footerLinks.quick.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white font-serif text-lg mb-4">{t.footer.support}</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-white font-serif text-lg mb-4">{t.contact.contactInfo}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400 whitespace-pre-line">
                  {t.contact.addressValue}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="tel:+201220263076" className="hover:text-primary-400 transition-colors">
                  {t.contact.phoneValue1}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:touchfurniture3@gmail.com" className="hover:text-primary-400 transition-colors break-all">
                  {t.contact.emailValue1}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Touch Furniture. {t.footer.copyright}.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

