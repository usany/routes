import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("place-two", "routes/place-two.tsx"),
  route("gwangneung", "routes/gwangneungRoutes.tsx"),
  route("process", "routes/process.tsx"),
  route("se", "routes/se/se.tsx"),
  route("se/busOne", "routes/se/busOne/busOne.tsx"),
  route("se/busTwo", "routes/se/busTwo/busTwo.tsx"),
  route("se/busThree", "routes/se/busThree/busThree.tsx"),
  route("se/shuttle", "routes/se/shuttle/shuttle.tsx"),
] satisfies RouteConfig;
