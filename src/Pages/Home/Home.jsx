import Footer from "../Shared/Footer/Footer";
import Banner from "./Banner";
import Carosel from "./Carosel";
import Maparea from "./MapArea";
import Newsletter from "./Newsletter";
import Paralax from "./Paralax";
import Quote from "./Quote";
import Services from "./Services";

const Home = () => {
	return (
		<div>
			<Paralax></Paralax>
			<Quote></Quote>
			<Carosel></Carosel>
			<Services></Services>
			<Maparea></Maparea>
			<Newsletter></Newsletter>
			
		</div>
	);
};

export default Home;
