import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../utils/translations'
import './Contact.css'

const Contact = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert(language === 'ar' ? 'شكراً لرسالتك! سنعود إليك قريباً.' : 'Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: t.contact.address,
      details: language === 'ar' ? ['123 شارع الأثاث', 'منطقة التصميم، المدينة 12345'] : ['123 Furniture Street', 'Design District, City 12345'],
    },
    {
      icon: FaPhone,
      title: t.contact.phone,
      details: [t.contact.phoneValue1, t.contact.phoneValue2],
    },
    {
      icon: FaEnvelope,
      title: t.contact.email,
      details: [t.contact.emailValue1, t.contact.emailValue2],
    },
    {
      icon: FaClock,
      title: t.contact.hours,
      details: [t.contact.hoursValue1, t.contact.hoursValue2],
    },
  ]

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="section-padding contact-hero">
        <div className="container-custom" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-gray-900 dark:text-white">
              {t.contact.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="contact-content">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="contact-form-section"
            >
              <h2 className="text-3xl font-serif font-bold mb-6 text-gray-900 dark:text-white">
                {t.contact.sendMessage}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="form-textarea"
                    placeholder="Your message..."
                  />
                </div>
                <button type="submit" className="form-button">
                  {t.contact.send}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="contact-info-section"
            >
              <h2 className="text-3xl font-serif font-bold mb-6 text-gray-900 dark:text-white">
                {t.contact.contactInfo}
              </h2>
              <div className="contact-info-list">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="contact-info-item"
                    >
                      <div className="contact-info-icon">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="contact-info-content">
                        <h3>{info.title}</h3>
                        {info.details.map((detail, i) => (
                          <p key={i}>{detail}</p>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Map */}
              <div className="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184132576012!2d-73.98811768459418!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Touch Furniture Location"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

