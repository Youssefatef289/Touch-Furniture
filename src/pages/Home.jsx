import HeroSlider from '../components/sections/HeroSlider'
import FeaturedCollections from '../components/sections/FeaturedCollections'
import BestSellers from '../components/sections/BestSellers'
import CustomManufacturing from '../components/sections/CustomManufacturing'
import AboutSection from '../components/sections/AboutSection'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import Testimonials from '../components/sections/Testimonials'
import './Home.css'

const Home = () => {
  return (
    <div className="home-page">
      <HeroSlider />
      <FeaturedCollections />
      <BestSellers />
      <CustomManufacturing />
      <AboutSection />
      <WhyChooseUs />
      <Testimonials />
    </div>
  )
}

export default Home

