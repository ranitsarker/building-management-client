import BuildingDetails from "../../components/Home/BuildingDetails";
import Coupons from "../../components/Home/Coupons";
import Slider from "../../components/Home/Slider";
import Container from "../../components/Shared/Container";
import couponsData from "../../components/Home/couponsData"
import ApartmentLocation from "../../components/Home/ApartmentLocation";

const Home = () => {
    return (
        <>
        <div className="z-0">
        <Container>
            <Slider></Slider>
            <BuildingDetails></BuildingDetails>
            <Coupons coupons={couponsData}></Coupons>
            <ApartmentLocation></ApartmentLocation>
        </Container>
        </div>


        </>
    );
};

export default Home;