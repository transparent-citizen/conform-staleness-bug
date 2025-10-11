import { layout, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	layout("./routes/layout.tsx", [route("a", "./routes/a.tsx")]),
] satisfies RouteConfig;
