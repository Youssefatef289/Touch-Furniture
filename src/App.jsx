import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import FixedIcons from './components/FixedIcons'
import ScrollToTopOnRouteChange from './components/ScrollToTopOnRouteChange'
import Home from './pages/Home'
import Collections from './pages/Collections'
import CollectionDetails from './pages/CollectionDetails'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CartProvider>
          <Router>
            <ScrollToTopOnRouteChange />
            <LoadingScreen />
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/collection/:category" element={<CollectionDetails />} />
                  <Route path="/product/:category/:imageIndex" element={<ProductDetails />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
              <FixedIcons />
            </div>
          </Router>
        </CartProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App

