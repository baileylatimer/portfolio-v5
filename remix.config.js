/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  serverBuildTarget: "netlify",
  server: "./server.js",
  serverModuleFormat: "esm",
  tailwind: true,
  future: {
    v2_dev: true,
  },
};