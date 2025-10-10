import { Link, Outlet } from "react-router";

export default () => (
	<div>
		<div
			style={{
				border: "1px solid black",
				padding: "1rem",
				margin: "1rem",
			}}
		>
			<div>
				The issue isn't completely deterministic. If it doesn't occur,
				navigate <Link to="/a">here</Link> until you see an error in the
				console.
			</div>
			<div>
				For some reason, <Link to="/b">this</Link> link is also needed.
			</div>
		</div>

		<Outlet />
	</div>
);
