import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("place-two", "routes/place-two.tsx"),
  route("gwangneung", "routes/gwangneungRoutes.tsx"),
  route("process", "routes/process.tsx"),
  route("se", "routes/se/se.tsx"),
  route("se/busOne", "routes/se/busOne.tsx"),
  route("se/busTwo", "routes/se/busTwo.tsx"),
  route("se/busThree", "routes/se/busThree.tsx"),
  route("se/shuttle", "routes/se/shuttle.tsx"),
  route("gw", "routes/gw/gw.tsx"),
  route("gw/busOne", "routes/gw/busOne.tsx"),
  route("gw/busTwo", "routes/gw/busTwo.tsx"),
  route("gl", "routes/gl/gl.tsx"),
  route("gl/busTo", "routes/gl/busTo.tsx"),
  route("gl/busFrom", "routes/gl/busFrom.tsx"),
  route("gl/commute", "routes/gl/commute.tsx"),
  route("gl/shuttle", "routes/gl/shuttle.tsx"),
] satisfies RouteConfig;
