/* eslint-disable react-refresh/only-export-components */
import { createRoot } from "react-dom/client";
import { StrictMode, lazy, Suspense } from "react";
import { ConfigProvider, theme } from "antd";

import "./global.css";
import { kcContext as kcLoginThemeContext } from "./login/kcContext";
import { kcContext as kcAccountThemeContext } from "./account/kcContext";

const KcLoginThemeApp = lazy(() => import("./login/KcApp"));
const KcAccountThemeApp = lazy(() => import("./account/KcApp"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense>
      <ConfigProvider
        theme={{
          cssVar: false,
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: "#16c2c2",
            colorLink: "#16c2c2",
            fontFamily: "Segoe UI, Arial, sans-serif",
          },
          components: {
            Layout: {
              algorithm: true,
              headerBg: "#f5f5f5",
              headerHeight: "auto",
              headerPadding: "80px 40px 0 40px",
            },
          },
        }}
      >
        {(() => {
          if (kcLoginThemeContext !== undefined) {
            return <KcLoginThemeApp kcContext={kcLoginThemeContext} />;
          }

          if (kcAccountThemeContext !== undefined) {
            return <KcAccountThemeApp kcContext={kcAccountThemeContext} />;
          }

          throw new Error(
            "This app is a Keycloak theme" +
              "It isn't meant to be deployed outside of Keycloak"
          );
        })()}
      </ConfigProvider>
    </Suspense>
  </StrictMode>
);
