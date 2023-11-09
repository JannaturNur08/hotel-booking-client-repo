import { Helmet } from "react-helmet";

const Paralax = () => {
	return (
		<div className="h-[700px] flex flex-col items-center justify-center bg-[url('https://i.ibb.co/mTswZfq/header.jpg')] bg-fixed bg bg-cover">
			<h2 className="text-[100px] font-bold text-white">
				YOUR RELAXING STAY
			</h2>
			<div className="text-white text-center">
							<p className="text-sm font-jost ">
								CHECK OUR ACCOMODATIONS{" "}
							</p>
							<h2 className="text-6xl font-bold font-mercellus">
								Rooms, Suites & Chalets
							</h2>
							<Helmet>
								<title>Home | Hotel COZYSTAY</title>
							</Helmet>
						</div>
			<p className="text-2xl text-slate-300">Stay in our place</p>
		</div>
	);
};

export default Paralax;
