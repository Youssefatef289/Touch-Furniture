import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language')
    return saved || 'en'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    
    // Apply font based on language
    if (language === 'ar') {
      document.documentElement.style.setProperty('--font-family', 'Cairo, sans-serif')
      document.body.style.fontFamily = 'Cairo, sans-serif'
      document.body.style.fontVariationSettings = '"slnt" 0'
    } else {
      document.documentElement.style.setProperty('--font-family', 'Josefin Sans, sans-serif')
      document.body.style.fontFamily = 'Josefin Sans, sans-serif'
    }
  }, [language])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar')
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

