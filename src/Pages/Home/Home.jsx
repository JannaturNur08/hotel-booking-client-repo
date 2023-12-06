import { useEffect } from "react";
import Footer from "../Shared/Footer/Footer";
import Banner from "./Banner";
import Carosel from "./Carosel";
import Maparea from "./MapArea";
import Newsletter from "./Newsletter";
import Paralax from "./Paralax";
import Quote from "./Quote";
import Services from "./Services";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
	useEffect(() => {
		AOS.init({
			duration: 2000,
			delay: 500,
			once: false,
			easing: "ease-out",
			mirror: false,
			anchorPlacement: "top-bottom",
		});
	}, []);
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
