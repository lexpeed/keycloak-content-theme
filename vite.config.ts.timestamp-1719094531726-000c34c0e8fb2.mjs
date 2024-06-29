// vite.config.ts
import { defineConfig } from "file:///Users/pedro/projects/lexpeed/content/libs/keycloak-content-theme/node_modules/.pnpm/vite@5.1.5_@types+node@20.11.25/node_modules/vite/dist/node/index.js";
import react from "file:///Users/pedro/projects/lexpeed/content/libs/keycloak-content-theme/node_modules/.pnpm/@vitejs+plugin-react@4.2.1_vite@5.1.5_@types+node@20.11.25_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import commonjs from "file:///Users/pedro/projects/lexpeed/content/libs/keycloak-content-theme/node_modules/.pnpm/vite-plugin-commonjs@0.10.1/node_modules/vite-plugin-commonjs/dist/index.mjs";
import { keycloakify } from "file:///Users/pedro/projects/lexpeed/content/libs/keycloak-content-theme/node_modules/.pnpm/keycloakify@9.7.0_@types+react@18.2.64_encoding@0.1.13_react@18.2.0/node_modules/keycloakify/vite-plugin/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    commonjs(),
    keycloakify({
      themeName: "keycloak-content-theme",
      extraThemeProperties: [
        "foo=bar"
      ],
      // This is a hook that will be called after the build is done
      // but before the jar is created.  
      // You can use it to add/remove/edit your theme files.  
      postBuild: async (keycloakifyBuildOptions) => {
        const fs = await import("fs/promises");
        const path = await import("path");
        await fs.writeFile(
          path.join(keycloakifyBuildOptions.keycloakifyBuildDirPath, "foo.txt"),
          Buffer.from(
            [
              "This file was created by the postBuild hook of the keycloakify vite plugin",
              "",
              "Resolved keycloakifyBuildOptions:",
              "",
              JSON.stringify(keycloakifyBuildOptions, null, 2),
              ""
            ].join("\n"),
            "utf8"
          )
        );
      }
    })
  ],
  /* 
   * Uncomment this if you want to use the default domain provided by GitHub Pages
   * replace "keycloakify-starter" with your repository name.  
   * This is only relevent if you are building an Wep App + A Keycloak theme.
   * If you are only building a Keycloak theme, you can ignore this.  
   */
  //base: "/keycloakify-starter/"
  build: {
    sourcemap: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcGVkcm8vcHJvamVjdHMvbGV4cGVlZC9jb250ZW50L2xpYnMva2V5Y2xvYWstY29udGVudC10aGVtZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3BlZHJvL3Byb2plY3RzL2xleHBlZWQvY29udGVudC9saWJzL2tleWNsb2FrLWNvbnRlbnQtdGhlbWUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3BlZHJvL3Byb2plY3RzL2xleHBlZWQvY29udGVudC9saWJzL2tleWNsb2FrLWNvbnRlbnQtdGhlbWUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuLy8gTk9URTogVGhpcyBpcyBqdXN0IGZvciB0aGUgS2V5Y2xvYWtpZnkgY29yZSBjb250cmlidXRvcnMgdG8gYmUgYWJsZSB0byBkeW5hbWljYWxseSBsaW5rXG4vLyB0byBhIGxvY2FsIHZlcnNpb24gb2YgdGhlIGtleWNsb2FraWZ5IHBhY2thZ2UuIFRoaXMgaXMgbm90IG5lZWRlZCBmb3Igbm9ybWFsIHVzYWdlLlxuaW1wb3J0IGNvbW1vbmpzIGZyb20gXCJ2aXRlLXBsdWdpbi1jb21tb25qc1wiO1xuaW1wb3J0IHsga2V5Y2xvYWtpZnkgfSBmcm9tIFwia2V5Y2xvYWtpZnkvdml0ZS1wbHVnaW5cIjtcblxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksIFxuICAgIGNvbW1vbmpzKCksIFxuICAgIGtleWNsb2FraWZ5KHtcbiAgICAgIHRoZW1lTmFtZTogXCJrZXljbG9hay1jb250ZW50LXRoZW1lXCIsXG4gICAgICBleHRyYVRoZW1lUHJvcGVydGllczogW1xuICAgICAgICBcImZvbz1iYXJcIlxuICAgICAgXSxcbiAgICAgIC8vIFRoaXMgaXMgYSBob29rIHRoYXQgd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIGJ1aWxkIGlzIGRvbmVcbiAgICAgIC8vIGJ1dCBiZWZvcmUgdGhlIGphciBpcyBjcmVhdGVkLiAgXG4gICAgICAvLyBZb3UgY2FuIHVzZSBpdCB0byBhZGQvcmVtb3ZlL2VkaXQgeW91ciB0aGVtZSBmaWxlcy4gIFxuICAgICAgcG9zdEJ1aWxkOiBhc3luYyBrZXljbG9ha2lmeUJ1aWxkT3B0aW9ucyA9PiB7XG5cbiAgICAgICAgY29uc3QgZnMgPSBhd2FpdCBpbXBvcnQoXCJmcy9wcm9taXNlc1wiKTtcbiAgICAgICAgY29uc3QgcGF0aCA9IGF3YWl0IGltcG9ydChcInBhdGhcIik7XG5cbiAgICAgICAgYXdhaXQgZnMud3JpdGVGaWxlKFxuICAgICAgICAgIHBhdGguam9pbihrZXljbG9ha2lmeUJ1aWxkT3B0aW9ucy5rZXljbG9ha2lmeUJ1aWxkRGlyUGF0aCwgXCJmb28udHh0XCIpLFxuICAgICAgICAgIEJ1ZmZlci5mcm9tKFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgXCJUaGlzIGZpbGUgd2FzIGNyZWF0ZWQgYnkgdGhlIHBvc3RCdWlsZCBob29rIG9mIHRoZSBrZXljbG9ha2lmeSB2aXRlIHBsdWdpblwiLCBcbiAgICAgICAgICAgIFwiXCIsXG4gICAgICAgICAgICBcIlJlc29sdmVkIGtleWNsb2FraWZ5QnVpbGRPcHRpb25zOlwiLFxuICAgICAgICAgICAgXCJcIixcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGtleWNsb2FraWZ5QnVpbGRPcHRpb25zLCBudWxsLCAyKSxcbiAgICAgICAgICAgIFwiXCJcbiAgICAgICAgICAgIF0uam9pbihcIlxcblwiKSxcbiAgICAgICAgICAgIFwidXRmOFwiXG4gICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICB9XG4gICAgfSlcbiAgXSxcbiAgLyogXG4gICAqIFVuY29tbWVudCB0aGlzIGlmIHlvdSB3YW50IHRvIHVzZSB0aGUgZGVmYXVsdCBkb21haW4gcHJvdmlkZWQgYnkgR2l0SHViIFBhZ2VzXG4gICAqIHJlcGxhY2UgXCJrZXljbG9ha2lmeS1zdGFydGVyXCIgd2l0aCB5b3VyIHJlcG9zaXRvcnkgbmFtZS4gIFxuICAgKiBUaGlzIGlzIG9ubHkgcmVsZXZlbnQgaWYgeW91IGFyZSBidWlsZGluZyBhbiBXZXAgQXBwICsgQSBLZXljbG9hayB0aGVtZS5cbiAgICogSWYgeW91IGFyZSBvbmx5IGJ1aWxkaW5nIGEgS2V5Y2xvYWsgdGhlbWUsIHlvdSBjYW4gaWdub3JlIHRoaXMuICBcbiAgICovXG4gIC8vYmFzZTogXCIva2V5Y2xvYWtpZnktc3RhcnRlci9cIlxuICBidWlsZDoge1xuICAgIHNvdXJjZW1hcDogdHJ1ZVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxWCxTQUFTLG9CQUFvQjtBQUNsWixPQUFPLFdBQVc7QUFHbEIsT0FBTyxjQUFjO0FBQ3JCLFNBQVMsbUJBQW1CO0FBSTVCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULFlBQVk7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYLHNCQUFzQjtBQUFBLFFBQ3BCO0FBQUEsTUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSUEsV0FBVyxPQUFNLDRCQUEyQjtBQUUxQyxjQUFNLEtBQUssTUFBTSxPQUFPLGFBQWE7QUFDckMsY0FBTSxPQUFPLE1BQU0sT0FBTyxNQUFNO0FBRWhDLGNBQU0sR0FBRztBQUFBLFVBQ1AsS0FBSyxLQUFLLHdCQUF3Qix5QkFBeUIsU0FBUztBQUFBLFVBQ3BFLE9BQU87QUFBQSxZQUNMO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0EsS0FBSyxVQUFVLHlCQUF5QixNQUFNLENBQUM7QUFBQSxjQUMvQztBQUFBLFlBQ0EsRUFBRSxLQUFLLElBQUk7QUFBQSxZQUNYO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUVGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFRQSxPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsRUFDYjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
