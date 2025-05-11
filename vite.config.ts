import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import mkcert from "vite-plugin-mkcert";

import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  base: "/vuejs-template",
  plugins: [
    vue(),
    vueDevTools(),
    // Creates a custom SSL certificate valid for the local machine.
    // Using this plugin requires admin rights on the first dev-mode launch.
    // https://www.npmjs.com/package/vite-plugin-mkcert
    process.env.HTTPS ? mkcert() : undefined,
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  publicDir: "./public",
  // server: {
  //   // Exposes your dev server and makes it accessible for the devices in the same network.
  //   host: true,
  // },

  server: {
    port: 3000,
    host: "localhost",
    // HTTPS config is optional - only needed if you want local HTTPS
    // Otherwise, the HTTPS will be handled by the remote Nginx
    https: process.env.HTTPS
      ? {
          key: fs.readFileSync("./.cert/localhost-key.pem"),
          cert: fs.readFileSync("./.cert/localhost.pem"),
        }
      : undefined,
  },
});
