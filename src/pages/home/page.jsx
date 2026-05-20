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

const Home = () => {
  return (
               <>
               <Navbar/>
               <CategoryMenu/>
            {/* <HeroSection /> */}
            {/* <WinnerBanner/> */}
            {/* <PrizeCarouselPage/> */}
            {/* <CategoryPage/> */}
            <RecentlyViewed
             /> 
            <ProductsPage/>
            <BlogPage/> 
            {/* <FullImageCover imageUrl={coverImage}/> */}
            {/* <FeaturesSection /> */}
            <Footer/>
            <MobileBottomNavbar/>
    </>
  )
}

export default Home
