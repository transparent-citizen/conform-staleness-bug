import { Links, type LinksFunction, Outlet, Scripts } from "react-router";

import tailwindStyles from "./tailwind.css?url";

export const links: LinksFunction = () => {
	return [
		{
			href: tailwindStyles,
			rel: "stylesheet",
		},
	];
};

export default () => {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8"></meta>
				<Links />
			</head>
			<body>
				<Outlet />
				<Scripts />
			</body>
		</html>
	);
};
