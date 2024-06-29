import { lazy, Suspense, useState } from "react";
import Fallback, { type PageProps } from "keycloakify/login";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";

import "./KcApp.css";
import { getKcContext, type KcContext } from "./kcContext";
import type { LoginContext } from "./typings";
import { useI18n } from "./i18n";
import Template from "./Template";

const Login = lazy(() => import("./pages/Login"));
// If you can, favor register-user-profile.ftl over register.ftl, see: https://docs.keycloakify.dev/realtime-input-validation
const Register = lazy(() => import("./pages/Register"));
const RegisterUserProfile = lazy(() => import("./pages/RegisterUserProfile"));
const Terms = lazy(() => import("./pages/Terms"));
const MyExtraPage1 = lazy(() => import("./pages/MyExtraPage1"));
const MyExtraPage2 = lazy(() => import("./pages/MyExtraPage2"));
const Info = lazy(() => import("keycloakify/login/pages/Info"));

// This is like adding classes to theme.properties
// https://github.com/keycloak/keycloak/blob/11.0.3/themes/src/main/resources/theme/keycloak/login/theme.properties
const classes = {
  // NOTE: The classes are defined in ./KcApp.css
  // kcHtmlClass: "root-container",
  // "kcBodyClass": "body-container",
  kcLoginClass: "auth-container",
  kcHeaderClass: "auth-header",
  kcFormCardClass: "auth-body",
} satisfies PageProps["classes"];

export default function KcApp({
  kcContext: initialKcContext,
}: {
  kcContext: KcContext;
}) {
  const [activeTab, setActiveTab] = useState<string>(initialKcContext.pageId);
  const [kcContext, setKcContext] = useState<KcContext>(initialKcContext);
  const i18n = useI18n({ kcContext });

  let social, realm, url, registrationDisabled;
  const doUseDefaultCss = false;

  const handleTabClick = (key: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { kcContext: newContext } = getKcContext({ mockPageId: key } as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setKcContext(newContext as any);
    setActiveTab(key);
  };

  if (i18n === null) {
    // NOTE: Text resources for the current language are still being downloaded, we can't display anything yet.
    // We could display a loading progress but it's usually a matter of milliseconds.
    return null;
  }
  const { msg, msgStr } = i18n;

  /*
   * Examples assuming i18n.currentLanguageTag === "en":
   * i18n.msg("access-denied") === <span>Access denied</span>
   * i18n.msg("foo") === <span>foo in English</span>
   */

  return (
    <Suspense>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#16c2c2",
          },
        }}
      >
        <StyleProvider hashPriority="high">
          <section>
            {(() => {
              switch (kcContext.pageId) {
                case "login.ftl":
                case "register.ftl":
                  social = (kcContext as LoginContext).social;
                  realm = (kcContext as LoginContext).realm;
                  url = (kcContext as LoginContext).url;
                  registrationDisabled = (kcContext as LoginContext)
                    .registrationDisabled;

                  return (
                    <Template
                      {...{ kcContext, i18n, doUseDefaultCss, classes }}
                      activeTab={activeTab}
                      onTabClick={handleTabClick}
                      displayInfo={
                        realm.password &&
                        realm.registrationAllowed &&
                        !registrationDisabled
                      }
                      displayWide={
                        realm.password && social.providers !== undefined
                      }
                      headerNode={msg(
                        kcContext.pageId === "login.ftl"
                          ? "doLogIn"
                          : "doRegister"
                      )}
                      pageTitleNode={
                        <h1>
                          {msgStr(
                            kcContext.pageId === "login.ftl"
                              ? "loginPageTitle"
                              : "registerPageTitle"
                          )}
                        </h1>
                      }
                      pageSubtitleNode={
                        <p>
                          {msgStr(
                            kcContext.pageId === "login.ftl"
                              ? "loginPageSubtitle"
                              : "registerPageSubtitle"
                          )}
                        </p>
                      }
                      infoNode={
                        <div id="kc-registration">
                          <span>
                            {msg("noAccount")}
                            <a tabIndex={6} href={url.registrationUrl}>
                              {msg("doRegister")}
                            </a>
                          </span>
                        </div>
                      }
                      loginPageFormNode={
                        kcContext.pageId === "login.ftl" && (
                          <Login
                            {...{ kcContext, i18n, Template, classes }}
                            doUseDefaultCss={doUseDefaultCss}
                          />
                        )
                      }
                      registerPageFormNode={
                        kcContext.pageId === "register.ftl" && (
                          <Register
                            {...{ kcContext, i18n, Template, classes }}
                            doUseDefaultCss={doUseDefaultCss}
                          />
                        )
                      }
                    >
                      {kcContext.pageId === "login.ftl" ? (
                        <Login
                          {...{ kcContext, i18n, Template, classes }}
                          doUseDefaultCss={doUseDefaultCss}
                        />
                      ) : (
                        <Register
                          {...{ kcContext, i18n, Template, classes }}
                          doUseDefaultCss={doUseDefaultCss}
                        />
                      )}
                    </Template>
                  );
                // case "login.ftl":
                //   return (
                //     <Login
                //       {...{ kcContext, i18n, Template, classes }}
                //       doUseDefaultCss={false}
                //     />
                //   );
                // case "register.ftl":
                //   return (
                //     <Register
                //       {...{ kcContext, i18n, Template, classes }}
                //       doUseDefaultCss={false}
                //     />
                //   );
                case "register-user-profile.ftl":
                  return (
                    <RegisterUserProfile
                      {...{ kcContext, i18n, Template, classes }}
                      doUseDefaultCss={true}
                    />
                  );
                case "terms.ftl":
                  return (
                    <Terms
                      {...{ kcContext, i18n, Template, classes }}
                      doUseDefaultCss={true}
                    />
                  );
                // Removes those pages in you project. They are included to show you how to implement keycloak pages
                // that are not yes implemented by Keycloakify.
                // See: https://docs.keycloakify.dev/limitations#some-pages-still-have-the-default-theme.-why
                case "my-extra-page-1.ftl":
                  return (
                    <MyExtraPage1
                      {...{ kcContext, i18n, Template, classes }}
                      doUseDefaultCss={true}
                    />
                  );
                case "my-extra-page-2.ftl":
                  return (
                    <MyExtraPage2
                      {...{ kcContext, i18n, Template, classes }}
                      doUseDefaultCss={true}
                    />
                  );
                // We choose to use the default Template for the Info page and to download the theme resources.
                // This is just an example to show you what is possible. You likely don't want to keep this as is.
                case "info.ftl":
                  return (
                    <Info
                      {...{ kcContext, i18n, classes }}
                      Template={lazy(
                        () => import("keycloakify/login/Template")
                      )}
                      doUseDefaultCss={true}
                    />
                  );
                default:
                  return (
                    <Fallback
                      {...{ kcContext, i18n, classes }}
                      Template={Template}
                      doUseDefaultCss={true}
                    />
                  );
              }
            })()}
          </section>
        </StyleProvider>
      </ConfigProvider>
    </Suspense>
  );
}
