import { Link } from "react-router-dom";

const Services = () => {
	return (
		<div className="h-96 flex flex-col items-center place-content-center  bg-primary ">
			<p className="text-white font-bold text-6xl">
				World class services
			</p>
			<div className="py-9 grid grid-cols-3 gap-10 justify-items-center">
				<p className="text-slate-50 font-mercellus text-xl">
					Airport pickup
				</p>
				<p className="text-slate-50 font-mercellus text-xl">
					Housekeeping
				</p>
				<p className="text-slate-50 font-mercellus text-xl">
					Wifi and internet
				</p>
				<p className="text-slate-50 font-mercellus text-xl">Laundry</p>
				<p className="text-slate-50 font-mercellus text-xl">
					Breakfast in bed
				</p>
				<p className="text-slate-50 font-mercellus text-xl">
					Private parking
				</p>
			</div>
			<p className="text-3xl text-orange-400"> <Link to='/rooms'><button  className="btn bg-red-600 border-0 text-white">
            Book now</button></Link> to get 10% off!</p>
		</div>
	);
};

export default Services;
