import { lazy } from "react";
import Fallback, { type PageProps } from "keycloakify/login";
import { theme, Typography } from "antd";

import "./KcApp.css";
import type { KcContext } from "./kcContext";
import type { LoginContext, RegisterContext } from "./typings";
import { useI18n } from "./i18n";
import Template from "./Template";

const Login = lazy(() => import("./pages/Login"));
// TODO: Implement register-user-profile.ftl
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
  kcLoginClass: "container",
  kcHeaderClass: "header",
  kcFormCardClass: "content",
} satisfies PageProps["classes"];

export default function KcApp({ kcContext }: { kcContext: KcContext }) {
  let social, realm, url, registrationDisabled;
  const doUseDefaultCss = false;
  const i18n = useI18n({ kcContext });
  const { token } = theme.useToken();

  if (i18n === null) {
    return null;
  }
  const { msg, msgStr } = i18n;

  const handleTabClick = (
    _: string,
    e: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      e.target instanceof HTMLDivElement &&
      e.target?.children.length > 0 &&
      e.target?.children[0] instanceof HTMLAnchorElement
    ) {
      e.target.children[0].click();
    }
  };

  switch (kcContext.pageId) {
    case "login.ftl":
      social = (kcContext as LoginContext).social;
      realm = (kcContext as LoginContext).realm;
      url = (kcContext as LoginContext).url;
      registrationDisabled = (kcContext as LoginContext).registrationDisabled;

      return (
        <Template
          {...{ kcContext, i18n, doUseDefaultCss, classes }}
          activeTab={kcContext.pageId}
          onTabClick={handleTabClick}
          displayInfo={
            realm.password && realm.registrationAllowed && !registrationDisabled
          }
          displayWide={realm.password && social.providers !== undefined}
          headerNode={msg("doLogIn")}
          pageTitleNode={
            <Typography.Title level={3}>
              {msgStr("loginPageTitle")}
            </Typography.Title>
          }
          pageSubtitleNode={
            <Typography.Title type="secondary" level={5}>
              {msgStr("loginPageSubtitle")}
            </Typography.Title>
          }
          infoNode={
            <div id="kc-registration">
              <Typography.Text strong style={{ paddingRight: 10 }}>
                {msg("noAccount")}
              </Typography.Text>
              <Typography.Link
                tabIndex={6}
                href={url.registrationUrl}
                style={{ color: token.colorPrimary }}
                className="link-focus-visible"
              >
                {msg("doRegister")}
              </Typography.Link>
            </div>
          }
        >
          <Login
            {...{ kcContext, i18n, Template, classes }}
            doUseDefaultCss={doUseDefaultCss}
          />
        </Template>
      );
    case "register.ftl":
      url = (kcContext as RegisterContext).url;

      return (
        <Template
          {...{ kcContext, i18n, doUseDefaultCss, classes }}
          activeTab={kcContext.pageId}
          onTabClick={handleTabClick}
          headerNode={msg("doRegister")}
          pageTitleNode={
            <Typography.Title level={3}>
              {msgStr("registerPageTitle")}
            </Typography.Title>
          }
          pageSubtitleNode={
            <Typography.Title type="secondary" level={5}>
              {msgStr("registerPageSubtitle")}
            </Typography.Title>
          }
        >
          <Register
            {...{ kcContext, i18n, Template, classes }}
            doUseDefaultCss={doUseDefaultCss}
          />
        </Template>
      );
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
          Template={lazy(() => import("keycloakify/login/Template"))}
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
}
