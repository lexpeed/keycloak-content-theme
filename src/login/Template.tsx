// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { useState } from "react";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import { Flex, Layout, Tabs, Typography } from "antd";

import type { LoginContext, RegisterContext, TemplateProps } from "./typings";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    displayWide = false,
    showAnotherWayIfPresent = true,
    headerNode = null,
    pageTitleNode = null,
    pageSubtitleNode = null,
    showUsernameNode = null,
    infoNode = null,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    activeTab = "",
    onTabClick = () => {},
    children,
  } = props;

  const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

  const {
    msg,
    msgStr,
    changeLocale,
    labelBySupportedLanguageTag,
    currentLanguageTag,
  } = i18n;

  const { pageId, realm, locale, auth, url, message, isAppInitiatedAction } =
    kcContext as LoginContext | RegisterContext;

  const { isReady } = usePrepareTemplate({
    doFetchDefaultThemeResources: doUseDefaultCss,
    styles: [
      `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
      `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
      `${url.resourcesCommonPath}/lib/zocial/zocial.css`,
      `${url.resourcesPath}/css/login.css`,
    ],
    htmlClassName: getClassName("kcHtmlClass"),
    bodyClassName: getClassName("kcBodyClass"),
  });

  useState(() => {
    document.title = msgStr("loginTitle", realm.displayName);
  });

  const items = [
    {
      key: "login.ftl",
      label:
        pageId === "login.ftl" ? (
          msg("doLogIn")
        ) : (
          <Typography.Link
            href={url.loginUrl}
            className="tab-link"
            tabIndex={-1}
          >
            {msg("doLogIn")}
          </Typography.Link>
        ),
      tabIndex: -1,
      children: pageId === "login.ftl" ? children : null,
    },
  ];

  if (displayInfo || pageId === "register.ftl") {
    items.push({
      key: "register.ftl",
      label:
        pageId === "register.ftl" ? (
          msg("doRegister")
        ) : (
          <Typography.Link
            href={url.registrationUrl}
            className="tab-link"
            tabIndex={-1}
          >
            {msg("doRegister")}
          </Typography.Link>
        ),
      tabIndex: -1,
      children: pageId === "register.ftl" ? children : null,
    });
  }

  const showHeaderNode = headerNode && items.length === 1;

  if (!isReady) {
    return null;
  }

  return (
    <Layout className={getClassName("kcLoginClass")}>
      <Flex justify="center" align="center" gap="middle" vertical wrap>
        <Layout.Header id="kc-header" className={getClassName("kcHeaderClass")}>
          <Flex
            id="kc-header-wrapper"
            className={getClassName("kcHeaderWrapperClass")}
            justify="center"
            align="center"
            vertical
            wrap
          >
            {msg("loginTitleHtml", realm.displayNameHtml)}
            {pageTitleNode}
            {pageSubtitleNode}
          </Flex>
        </Layout.Header>
        <Layout.Content
          className={clsx(
            getClassName("kcFormCardClass"),
            displayWide && getClassName("kcFormCardAccountClass")
          )}
        >
          <Flex justify="center" align="center" gap="small" vertical wrap>
            <div className={getClassName("kcFormHeaderClass")}>
              {realm.internationalizationEnabled &&
                (assert(locale !== undefined), true) &&
                locale.supported.length > 1 && (
                  <div id="kc-locale">
                    <div
                      id="kc-locale-wrapper"
                      className={getClassName("kcLocaleWrapperClass")}
                    >
                      <div className="kc-dropdown" id="kc-locale-dropdown">
                        <a href="#" id="kc-current-locale-link">
                          {labelBySupportedLanguageTag[currentLanguageTag]}
                        </a>
                        <ul>
                          {locale.supported.map(({ languageTag }) => (
                            <li key={languageTag} className="kc-dropdown-item">
                              <a
                                href="#"
                                onClick={() => changeLocale(languageTag)}
                              >
                                {labelBySupportedLanguageTag[languageTag]}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              {!(
                auth !== undefined &&
                auth.showUsername &&
                !auth.showResetCredentials
              ) ? (
                displayRequiredFields ? (
                  <div className={getClassName("kcContentWrapperClass")}>
                    <div
                      className={clsx(
                        getClassName("kcLabelWrapperClass"),
                        "subtitle"
                      )}
                    >
                      <span className="subtitle">
                        <span className="required">*</span>
                        {msg("requiredFields")}
                      </span>
                    </div>
                    {showHeaderNode && (
                      <div className="col-md-10">
                        <Typography.Title level={4} id="kc-page-title">
                          {headerNode}
                        </Typography.Title>
                      </div>
                    )}
                  </div>
                ) : (
                  showHeaderNode && (
                    <Typography.Title level={4} id="kc-page-title">
                      {headerNode}
                    </Typography.Title>
                  )
                )
              ) : displayRequiredFields ? (
                <div className={getClassName("kcContentWrapperClass")}>
                  <div
                    className={clsx(
                      getClassName("kcLabelWrapperClass"),
                      "subtitle"
                    )}
                  >
                    <span className="subtitle">
                      <span className="required">*</span>{" "}
                      {msg("requiredFields")}
                    </span>
                  </div>
                  <div className="col-md-10">
                    {showUsernameNode}
                    <div className={getClassName("kcFormGroupClass")}>
                      <div id="kc-username">
                        <label id="kc-attempted-username">
                          {auth?.attemptedUsername}
                        </label>
                        <a id="reset-login" href={url.loginRestartFlowUrl}>
                          <div className="kc-login-tooltip">
                            <i className={getClassName("kcResetFlowIcon")}></i>
                            <span className="kc-tooltip-text">
                              {msg("restartLoginTooltip")}
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {showUsernameNode}
                  <div className={getClassName("kcFormGroupClass")}>
                    <div id="kc-username">
                      <label id="kc-attempted-username">
                        {auth?.attemptedUsername}
                      </label>
                      <a id="reset-login" href={url.loginRestartFlowUrl}>
                        <div className="kc-login-tooltip">
                          <i className={getClassName("kcResetFlowIcon")}></i>
                          <span className="kc-tooltip-text">
                            {msg("restartLoginTooltip")}
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div id="kc-content" style={{ width: "100%" }}>
              <div id="kc-content-wrapper">
                {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                {displayMessage &&
                  message !== undefined &&
                  (message.type !== "warning" || !isAppInitiatedAction) && (
                    <div className={clsx("alert", `alert-${message.type}`)}>
                      {message.type === "success" && (
                        <span
                          className={getClassName("kcFeedbackSuccessIcon")}
                        ></span>
                      )}
                      {message.type === "warning" && (
                        <span
                          className={getClassName("kcFeedbackWarningIcon")}
                        ></span>
                      )}
                      {message.type === "error" && (
                        <span
                          className={getClassName("kcFeedbackErrorIcon")}
                        ></span>
                      )}
                      {message.type === "info" && (
                        <span
                          className={getClassName("kcFeedbackInfoIcon")}
                        ></span>
                      )}
                      <span
                        className="kc-feedback-text"
                        dangerouslySetInnerHTML={{
                          __html: message.summary,
                        }}
                      />
                    </div>
                  )}
                {!showHeaderNode ? (
                  <Tabs
                    className="auth-tabs"
                    activeKey={activeTab}
                    items={items}
                    tabIndex={-1}
                    onTabClick={onTabClick}
                  />
                ) : (
                  children
                )}
                {auth !== undefined &&
                  auth.showTryAnotherWayLink &&
                  showAnotherWayIfPresent && (
                    <form
                      id="kc-select-try-another-way-form"
                      action={url.loginAction}
                      method="post"
                      className={clsx(
                        displayWide && getClassName("kcContentWrapperClass")
                      )}
                    >
                      <div
                        className={clsx(
                          displayWide && [
                            getClassName("kcFormSocialAccountContentClass"),
                            getClassName("kcFormSocialAccountClass"),
                          ]
                        )}
                      >
                        <div className={getClassName("kcFormGroupClass")}>
                          <input
                            type="hidden"
                            name="tryAnotherWay"
                            value="on"
                          />
                          <a
                            href="#"
                            id="try-another-way"
                            onClick={() => {
                              document.forms[
                                "kc-select-try-another-way-form" as never
                              ].submit();
                              return false;
                            }}
                          >
                            {msg("doTryAnotherWay")}
                          </a>
                        </div>
                      </div>
                    </form>
                  )}
                {displayInfo && (
                  <div id="kc-info" className={getClassName("kcSignUpClass")}>
                    <div
                      id="kc-info-wrapper"
                      className={getClassName("kcInfoAreaWrapperClass")}
                    >
                      {infoNode}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Flex>
        </Layout.Content>
      </Flex>
    </Layout>
  );
}
