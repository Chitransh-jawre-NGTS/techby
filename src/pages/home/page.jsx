import React from 'react'
import HeroSection from '../../components/HeroSection'
import FeaturesSection from '../../components/FeaturesSection'
import FeaturedProducts from '../../components/FeaturedProducts'
import ProductsPage from '../../components/ProductPage'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import CategoryMenu from '../../components/CategoryMenu'
import CategoryPage from '../../components/CategoryPage'
import MobileBottomNavbar from '../../components/MobileBottomNavbar'
import BlogPage from '../../components/Blog'
import RecentlyViewed from '../../components/RecentlyViewd'
import BannerPage from '../../components/Banner'
import CategoryBar from '../../components/CategoryBar'
import AdBanner from '../../components/AdBanner'
import TrendingArticles from '../../components/TrendingArticles'
import AboutWebsite from '../../components/AboutWebsite'
import PricingPage from '../../components/PricingPage'
import TrendingNews from '../../components/TrendingNews'

const Home = () => {
  return (
               <>
               <Navbar/>
               <CategoryBar/>
               <AdBanner place="top-banner" />
               <BannerPage/>
               <CategoryMenu/>
            {/* <HeroSection /> */}
            {/* <WinnerBanner/> */}
            {/* <PrizeCarouselPage/> */}
            {/* <CategoryPage/> */}
            <RecentlyViewed
             /> 
            <ProductsPage/>
            {/* <BlogPage/>  */}
            {/* <FullImageCover imageUrl={coverImage}/> */}
            {/* <FeaturesSection /> */}
            {/* <TrendingArticles/> */}
            <TrendingNews/>
            <AboutWebsite/>
            <Footer/>
            <MobileBottomNavbar/>
            {/* <PricingPage/> */}
    </>
  )
}

export default Home
