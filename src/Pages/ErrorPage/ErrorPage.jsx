import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError();

	return (
		<div id="error-page" className="mx-auto container text-center mt-20">
			<h1 className="text-5xl">Oops!</h1>
			<p className="text-2xl">Sorry, an unexpected error has occurred.</p>
			<p className="text-xl">
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
};

export default ErrorPage;
