/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  serverBuildTarget: "netlify",
  server: "./netlify/functions/server.js",
  serverModuleFormat: "esm",
  tailwind: true,
};