import {
    CenteredInCommunity,
    OurMakers,
    QualityWithCharacter,
    WovenByTradition,
    Anonymous,
} from '../../sections'

const TheMakersPage = () => {
    return (
        <main className="nomadory-container">
            <OurMakers />
            <div className="h-20 md:h-40" />
            <WovenByTradition />
            <div className="h-20 md:h-40" />
            <CenteredInCommunity />
            <div className="h-20 md:h-40" />
            <QualityWithCharacter />
            <div className="h-20 md:h-40" />
            <Anonymous />
            <div className="h-20 md:h-40" />
        </main>
    )
}
export default TheMakersPage
