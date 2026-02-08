import {
    HeroSection,
    ProductGallery,
    RugsStory,
    CraftedSpaces,
    ExploreOpportunities,
    ShopByDesigners,
} from '../sections'

export const revalidate = 60

const HomePage = async () => {
    return (
        <div className="nomadory-container">
            <ShopByDesigners />
            <div className="h-20 md:h-40" />
            <HeroSection />
            <div className="h-20 md:h-40" />
            <CraftedSpaces />
            <div className="h-20 md:h-40" />
            <ProductGallery />
            <div className="h-20 md:h-40" />
            <RugsStory />
            <div className="h-20 md:h-40" />
            <ExploreOpportunities />
            <div className="h-20 md:h-40" />
        </div>
    )
}

export default HomePage
