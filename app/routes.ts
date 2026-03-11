import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("place-one", "routes/place-one.tsx"),
  route("place-two", "routes/place-two.tsx"),
  route("process", "routes/process.tsx")
] satisfies RouteConfig;
