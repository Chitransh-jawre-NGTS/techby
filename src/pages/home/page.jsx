import React from 'react'
import HeroSection from '../../components/HeroSection'
import FeaturesSection from '../../components/FeaturesSection'
import FeaturedProducts from '../../components/FeaturedProducts'
import ProductsPage from '../../components/ProductPage'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import CategoryMenu from '../../components/CategoryMenu'
import SaleBannerCarousel from '../../components/SaleCarousal'
import CategoryPage from '../../components/CategoryPage'
import PrizeCarouselPage from '../../components/PrizeCarouselPage'
import MobileBottomNavbar from '../../components/MobileBottomNavbar'
import WinnerBanner from '../../components/WinnerBanner'
import FullImageCover from '../../components/FullImageCover'
import coverImage from "../../assets/add banners/image1.png"

const Home = () => {
  return (
               <>
               <Navbar/>
               <CategoryMenu/>
            <HeroSection />
            {/* <WinnerBanner/> */}
            <PrizeCarouselPage/>
            <CategoryPage/>
            <FeaturedProducts /> 
            <ProductsPage/>
            {/* <SaleBannerCarousel/> */}
            <FullImageCover imageUrl={coverImage}/>
            <FeaturesSection />
            <Footer/>
            <MobileBottomNavbar/>
    </>
  )
}

export default Home
