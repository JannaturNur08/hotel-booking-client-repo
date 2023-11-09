const Maparea = () => {
	return (
		<div className="h-96 bg-slate-100  ">
			<div className="flex gap-12 justify-center py-10">
				<div className="flex flex-col gap-6">
					<p className="text-6xl font-bold text-primary uppercase" data-aos="zoom-in">
						Find us here
					</p>
					<div>
						<p>4 kilometers from airport</p>
						<p>1.4 kilometers from city center</p>
						<p>Nearby park</p>
						<p>River view</p>
					</div>
				</div>
				<div className="border-8">
					<iframe
						width="300"
						height="300"
						src="https://www.google.com/maps/embed/v1/place?q=Hôtel+de+Ville,+Place+de+l'Hôtel-de-Ville,+Paris,+France&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
				</div>
			</div>
		</div>
	);
};

export default Maparea;
