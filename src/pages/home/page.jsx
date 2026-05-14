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
import MaintenanceScreen from '../../components/MaintananceScreen'
import BlogPage from '../../components/Blog'
import TopDiscountBikes from '../../components/TopDiscountBikes'

const Home = () => {
  return (
               <>
               <Navbar/>
               <CategoryMenu/>
               <MaintenanceScreen/>
            <HeroSection />
            {/* <WinnerBanner/> */}
            {/* <PrizeCarouselPage/> */}
            <CategoryPage/>
            <FeaturedProducts /> 
            {/* <TopDiscountBikes/> */}
            <ProductsPage/>
            {/* <SaleBannerCarousel/> */}
            <BlogPage/> 
            <FullImageCover imageUrl={coverImage}/>
            <FeaturesSection />
            <Footer/>
            <MobileBottomNavbar/>
    </>
  )
}

export default Home
