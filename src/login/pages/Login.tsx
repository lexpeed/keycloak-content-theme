import { useState, type FormEventHandler } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import { Form } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Input, Button } from "@lexpeed/components-react";

import type { PageProps } from "../typings";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

const my_custom_param = new URL(window.location.href).searchParams.get(
  "my_custom_param"
);

if (my_custom_param !== null) {
  console.log("my_custom_param:", my_custom_param);
}

// export default function Login(
//   props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
// ) {
//   const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
//   const { social, realm, url, registrationDisabled } = kcContext;
//   const { msg, msgStr } = i18n;

//   return (
//     <Template
//       {...{ kcContext, i18n, doUseDefaultCss, classes }}
//       displayInfo={
//         realm.password && realm.registrationAllowed && !registrationDisabled
//       }
//       displayWide={realm.password && social.providers !== undefined}
//       headerNode={msg("doLogIn")}
//       pageTitleNode={<h1>{msgStr("loginPageTitle")}</h1>}
//       pageSubtitleNode={<p>{msgStr("loginPageSubtitle")}</p>}
//       infoNode={
//         <div id="kc-registration">
//           <span>
//             {msg("noAccount")}
//             <a tabIndex={6} href={url.registrationUrl}>
//               {msg("doRegister")}
//             </a>
//           </span>
//         </div>
//       }
//       registerPageFormNode={null}
//     >
//       <LoginContent {...props} />
//     </Template>
//   );
// }

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const { social, realm, url, usernameHidden, login, auth } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    setIsLoginButtonDisabled(true);

    const formElement = e.target as HTMLFormElement;

    //NOTE: Even if we login with email Keycloak expect username and password in
    //the POST request.
    formElement
      .querySelector("input[name='email']")
      ?.setAttribute("name", "username");

    formElement.submit();
  });
  console.log(login)

  return (
    <div
      id="kc-form"
      className={clsx(
        realm.password &&
          social.providers !== undefined &&
          getClassName("kcContentWrapperClass")
      )}
    >
      <div
        id="kc-form-wrapper"
        className={clsx(
          realm.password &&
            social.providers && [
              getClassName("kcFormSocialAccountContentClass"),
              getClassName("kcFormSocialAccountClass"),
            ]
        )}
      >
        {realm.password && (
          <>
            <Form
              name="kc-form-login"
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
              }}
              initialValues={{ remember: false, username: login.username ?? "" }}
              autoComplete="off"
              layout="vertical"
              onFinish={onSubmit}
              action={url.loginAction}
              method="post"
            >
              <div className={getClassName("kcFormGroupClass")}>
                {!usernameHidden &&
                  (() => {
                    const label = !realm.loginWithEmailAllowed
                      ? "username"
                      : realm.registrationEmailAsUsername
                      ? "email"
                      : "usernameOrEmail";

                    const autoCompleteHelper: typeof label =
                      label === "usernameOrEmail" ? "username" : label;

                    return (
                      <>
                        <Form.Item
                          name={label}
                          label={msg(label)}
                          htmlFor={autoCompleteHelper}
                          className={getClassName("kcLabelClass")}
                          rules={[
                            {
                              required: true,
                              message:
                                label === "email"
                                  ? msgStr("invalidEmailMessage")
                                  : label === "usernameOrEmail"
                                  ? msgStr("invalidUsernameOrEmailMessage")
                                  : msgStr("invalidUsernameMessage"),
                            },
                          ]}
                        >
                          <Input
                            id={autoCompleteHelper}
                            tabIndex={1}
                            name={autoCompleteHelper}
                            placeholder="Ex: mariaoliveira@gmail.com"
                            prefix={
                              <UserOutlined style={{ color: "#16C2C2" }} />
                            }
                            style={{
                              display: "flex",
                              height: "40px",
                              alignItems: "center",
                              alignSelf: "stretch",
                            }}
                            className={getClassName("kcInputClass")}
                            // defaultValue={login.username ?? ""}
                            type="text"
                            autoFocus={true}
                            autoComplete="off"
                          />
                        </Form.Item>
                        {/* <label
                          htmlFor={autoCompleteHelper}
                          className={getClassName("kcLabelClass")}
                        >
                          {msg(label)}
                        </label>
                        <input
                          tabIndex={1}
                          id={autoCompleteHelper}
                          className={getClassName("kcInputClass")}
                          //NOTE: This is used by Google Chrome auto fill so we use it to tell
                          //the browser how to pre fill the form but before submit we put it back
                          //to username because it is what keycloak expects.
                          name={autoCompleteHelper}
                          defaultValue={login.username ?? ""}
                          type="text"
                          autoFocus={true}
                          autoComplete="off"
                        /> */}
                      </>
                    );
                  })()}
              </div>
              {/* <Form.Item
                name="email"
                label="Email cadastrado"
                rules={[{ required: true, message: "Insira um email válido" }]}
              >
                <Input
                  placeholder="Ex: mariaoliveira@gmail.com"
                  prefix={<UserOutlined style={{ color: "#16C2C2" }} />}
                  style={{
                    display: "flex",
                    height: "40px",
                    alignItems: "center",
                    alignSelf: "stretch",
                  }}
                />
              </Form.Item> */}

              <Form.Item name="loginButton">
                <Button
                  style={{
                    height: "40px",
                    width: "100%",
                    padding: "6.4px 56px",
                    gap: "10px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    background: "var(--Brand-06, #16C2C2)",
                    boxShadow: "0px 2px 0px 0px rgba(0, 0, 0, 0.04)",
                    color: "var(--Neutral-01, #FFF)",
                    textAlign: "center",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "24px",
                  }}
                >
                  Entrar
                </Button>
              </Form.Item>
            </Form>
            <form
              // id="kc-form-login"
              id="kc-form-login-old"
              onSubmit={onSubmit}
              action={url.loginAction}
              method="post"
            >
              <div className={getClassName("kcFormGroupClass")}>
                {!usernameHidden &&
                  (() => {
                    const label = !realm.loginWithEmailAllowed
                      ? "username"
                      : realm.registrationEmailAsUsername
                      ? "email"
                      : "usernameOrEmail";

                    const autoCompleteHelper: typeof label =
                      label === "usernameOrEmail" ? "username" : label;

                    return (
                      <>
                        <label
                          htmlFor={autoCompleteHelper}
                          className={getClassName("kcLabelClass")}
                        >
                          {msg(label)}
                        </label>
                        <input
                          tabIndex={1}
                          id={autoCompleteHelper}
                          className={getClassName("kcInputClass")}
                          //NOTE: This is used by Google Chrome auto fill so we use it to tell
                          //the browser how to pre fill the form but before submit we put it back
                          //to username because it is what keycloak expects.
                          name={autoCompleteHelper}
                          defaultValue={login.username ?? ""}
                          type="text"
                          autoFocus={true}
                          autoComplete="off"
                        />
                      </>
                    );
                  })()}
              </div>
              <div className={getClassName("kcFormGroupClass")}>
                <label
                  htmlFor="password"
                  className={getClassName("kcLabelClass")}
                >
                  {msg("password")}
                </label>
                <input
                  tabIndex={2}
                  id="password"
                  className={getClassName("kcInputClass")}
                  name="password"
                  type="password"
                  autoComplete="off"
                />
              </div>
              <div
                className={clsx(
                  getClassName("kcFormGroupClass"),
                  getClassName("kcFormSettingClass")
                )}
              >
                <div id="kc-form-options">
                  {realm.rememberMe && !usernameHidden && (
                    <div className="checkbox">
                      <label>
                        <input
                          tabIndex={3}
                          id="rememberMe"
                          name="rememberMe"
                          type="checkbox"
                          {...(login.rememberMe === "on"
                            ? {
                                checked: true,
                              }
                            : {})}
                        />
                        {msg("rememberMe")}
                      </label>
                    </div>
                  )}
                </div>
                <div className={getClassName("kcFormOptionsWrapperClass")}>
                  {realm.resetPasswordAllowed && (
                    <span>
                      <a tabIndex={5} href={url.loginResetCredentialsUrl}>
                        {msg("doForgotPassword")}
                      </a>
                    </span>
                  )}
                </div>
              </div>
              <div
                id="kc-form-buttons"
                className={getClassName("kcFormGroupClass")}
              >
                <input
                  type="hidden"
                  id="id-hidden-input"
                  name="credentialId"
                  {...(auth?.selectedCredential !== undefined
                    ? {
                        value: auth.selectedCredential,
                      }
                    : {})}
                />
                <input
                  tabIndex={4}
                  className={clsx(
                    getClassName("kcButtonClass"),
                    getClassName("kcButtonPrimaryClass"),
                    getClassName("kcButtonBlockClass"),
                    getClassName("kcButtonLargeClass")
                  )}
                  name="login"
                  id="kc-login"
                  type="submit"
                  value={msgStr("doLogIn")}
                  disabled={isLoginButtonDisabled}
                />
              </div>
            </form>
          </>
        )}
      </div>
      {realm.password && social.providers !== undefined && (
        <div
          id="kc-social-providers"
          className={clsx(
            getClassName("kcFormSocialAccountContentClass"),
            getClassName("kcFormSocialAccountClass")
          )}
        >
          <ul
            className={clsx(
              getClassName("kcFormSocialAccountListClass"),
              social.providers.length > 4 &&
                getClassName("kcFormSocialAccountDoubleListClass")
            )}
          >
            {social.providers.map((p) => (
              <li
                key={p.providerId}
                className={getClassName("kcFormSocialAccountListLinkClass")}
              >
                <a
                  href={p.loginUrl}
                  id={`zocial-${p.alias}`}
                  className={clsx("zocial", p.providerId)}
                >
                  <span>{p.displayName}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
