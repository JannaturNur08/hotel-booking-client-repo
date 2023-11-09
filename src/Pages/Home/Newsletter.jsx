const Newsletter = () => {
	return (
		<div className="h-96 flex bg-[url('https://i.ibb.co/BT1Y1fc/Home-footer.jpg')] bg-cover bg-center  items-center justify-center">
			<p className="text-slate-50 text-xl">Stay tuned  & <br />
			 Sign up for our newsletter to reicive news, deals and offers.</p>

			<input
				type="text"
				placeholder="Your Email"
				className="input input-bordered glass w-full max-w-xs"
			/>
			<button className="btn  text-primary">Subscribe</button>
		</div>
	);
};

export default Newsletter;
