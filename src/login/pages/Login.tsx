import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
// import { useConstCallback } from "keycloakify/tools/useConstCallback";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import {
  Form,
  Input,
  Typography,
  Checkbox,
  theme,
  Button,
  // FormProps,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  ContactsOutlined,
  MailOutlined,
} from "@ant-design/icons";

import type { PageProps } from "../typings";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, classes } = props;
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const { social, realm, url, usernameHidden, login, auth } = kcContext;

  const { msg, msgStr } = i18n;

  const [isButtonDisabled] = useState(false);
  // const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // const onSubmit = useConstCallback<FormProps["onFinish"]>((values) => {
  //   setIsButtonDisabled(true);

  //   const filteredValues = Object.fromEntries(
  //     Object.entries(values).filter(([, v]) => v !== undefined)
  //   );

  //   fetch(url.loginAction, {
  //     method: "POST",
  //     mode: 'no-cors',
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: new URLSearchParams(
  //       filteredValues as Record<string, string>
  //     ).toString(),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         window.location.href = response.url;
  //       } else {
  //         setIsButtonDisabled(false);
  //       }
  //     })
  //     .catch(() => {
  //       setIsButtonDisabled(false);
  //     });
  // });

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
          <Form
            name="kc-form-login"
            form={form}
            autoComplete="off"
            layout="vertical"
            // onFinish={onSubmit}
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

                  const placeholderHelper =
                    label === "username"
                      ? msgStr("placeholderUsername")
                      : msgStr("placeholderEmail");

                  const IconPrefix =
                    label === "usernameOrEmail"
                      ? ContactsOutlined
                      : label === "username"
                      ? UserOutlined
                      : MailOutlined;

                  return (
                    <Form.Item
                      // name={label}
                      name="username"
                      label={msg(label)}
                      className={getClassName("kcLabelClass")}
                      htmlFor={autoCompleteHelper}
                      initialValue={login.username ?? ""}
                      rules={[
                        {
                          required: true,
                          message:
                            label === "email"
                              ? msgStr("missingEmailMessage")
                              : label === "usernameOrEmail"
                              ? msgStr("missingEmailMessage")
                              : msgStr("missingUsernameMessage"),
                        },
                      ]}
                    >
                      <Input
                        id={autoCompleteHelper}
                        tabIndex={1}
                        // name={autoCompleteHelper}
                        name="username"
                        placeholder={placeholderHelper}
                        prefix={
                          <IconPrefix style={{ color: token.colorPrimary }} />
                        }
                        size="large"
                        className={getClassName("kcInputClass")}
                        type="text"
                        autoFocus={true}
                        autoComplete={autoCompleteHelper}
                      />
                    </Form.Item>
                  );
                })()}
            </div>
            <div className={getClassName("kcFormGroupClass")}>
              <Form.Item
                name="password"
                label={msg("password")}
                className={getClassName("kcLabelClass")}
                htmlFor="password"
                rules={[
                  {
                    required: true,
                    message: msgStr("missingPasswordMessage"),
                  },
                ]}
              >
                <Input.Password
                  id="password"
                  tabIndex={2}
                  name="password"
                  placeholder={msgStr("placeholderPassword")}
                  prefix={
                    <LockOutlined style={{ color: token.colorPrimary }} />
                  }
                  size="large"
                  className={getClassName("kcInputClass")}
                  type="password"
                  autoComplete="current-password"
                  visibilityToggle
                />
              </Form.Item>
            </div>
            <div
              className={clsx(
                getClassName("kcFormGroupClass"),
                getClassName("kcFormSettingClass")
              )}
            >
              <div id="kc-form-options">
                {realm.rememberMe && !usernameHidden && (
                  <Form.Item
                    name="rememberMe"
                    className="checkbox"
                    valuePropName="checked"
                  >
                    <Checkbox
                      tabIndex={3}
                      id="rememberMe"
                      name="rememberMe"
                      defaultChecked={login.rememberMe === "on"}
                    >
                      {msg("rememberMe")}
                    </Checkbox>
                  </Form.Item>
                )}
              </div>
              <div className={getClassName("kcFormOptionsWrapperClass")}>
                {realm.resetPasswordAllowed && (
                  <Form.Item>
                    <Typography.Link
                      tabIndex={5}
                      href={url.loginResetCredentialsUrl}
                      style={{ color: token.colorPrimary }}
                      className="link-focus-visible"
                    >
                      {msg("doForgotPassword")}
                    </Typography.Link>
                  </Form.Item>
                )}
              </div>
            </div>
            <div
              id="kc-form-buttons"
              className={getClassName("kcFormGroupClass")}
            >
              <Form.Item
                name="credentialId"
                hidden
                initialValue={auth?.selectedCredential}
              >
                <Input
                  id="id-hidden-input"
                  name="credentialId"
                  type="hidden"
                  value={auth?.selectedCredential}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  id="kc-login"
                  tabIndex={4}
                  className={clsx(
                    getClassName("kcButtonClass"),
                    getClassName("kcButtonPrimaryClass"),
                    getClassName("kcButtonBlockClass"),
                    getClassName("kcButtonLargeClass")
                  )}
                  htmlType="submit"
                  disabled={isButtonDisabled}
                  type="primary"
                  size="large"
                  block
                >
                  {msgStr("doLogIn")}
                </Button>
              </Form.Item>
            </div>
          </Form>
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
