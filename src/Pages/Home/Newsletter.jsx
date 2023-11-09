import './Newsletter.css';

const Newsletter = () => {
	return (
		<div className="h-96 flex newsletter-bg bg-cover bg-center  items-center justify-center">
			<p className="text-slate-50 text-xl">Stay tuned  & <br />
			 Sign up for our newsletter to receive news, deals and offers.</p>

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
