import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import { Button, Form, FormProps, Input, theme, Typography } from "antd";
import {
  IdcardOutlined,
  LockOutlined,
  MailOutlined,
  TeamOutlined,
  UnlockOutlined,
  UserOutlined,
} from "@ant-design/icons";

import type { PageProps } from "../typings";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function Register(
  props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, classes } = props;
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const {
    url,
    register,
    realm,
    passwordRequired,
    recaptchaRequired,
    recaptchaSiteKey,
  } = kcContext;

  const { msg, msgStr } = i18n;

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onSubmit = useConstCallback<FormProps["onFinish"]>((values) => {
    setIsButtonDisabled(true);

    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== undefined)
    );

    fetch(url.loginAction, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(
        filteredValues as Record<string, string>
      ).toString(),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = response.url;
        } else {
          setIsButtonDisabled(false);
        }
      })
      .catch(() => {
        setIsButtonDisabled(false);
      });
  });

  return (
    <Form
      id="kc-register-form"
      className={getClassName("kcFormClass")}
      name="kc-form-register"
      form={form}
      autoComplete="off"
      layout="vertical"
      onFinish={onSubmit}
      action={url.registrationAction}
      method="post"
    >
      <div className={clsx(getClassName("kcFormGroupClass"))}>
        <Form.Item
          name="firstName"
          label={msg("firstName")}
          className={getClassName("kcLabelClass")}
          htmlFor="firstName"
          rules={[
            {
              required: true,
              message: msgStr("missingFirstNameMessage"),
            },
          ]}
        >
          <div className={getClassName("kcInputWrapperClass")}>
            <Input
              id="firstName"
              tabIndex={1}
              name="firstName"
              placeholder={msgStr("placeholderFirstName")}
              prefix={<IdcardOutlined style={{ color: token.colorPrimary }} />}
              size="large"
              className={getClassName("kcInputClass")}
              type="text"
              autoFocus={true}
              autoComplete="firstName"
              defaultValue={register.formData.firstName ?? ""}
            />
          </div>
        </Form.Item>
      </div>

      <div className={clsx(getClassName("kcFormGroupClass"))}>
        <Form.Item
          name="lastName"
          label={msg("lastName")}
          className={getClassName("kcLabelClass")}
          htmlFor="lastName"
          rules={[
            {
              required: true,
              message: msgStr("missingLastNameMessage"),
            },
          ]}
        >
          <div className={getClassName("kcInputWrapperClass")}>
            <Input
              id="lastName"
              tabIndex={2}
              name="lastName"
              placeholder={msgStr("placeholderLastName")}
              prefix={<TeamOutlined style={{ color: token.colorPrimary }} />}
              size="large"
              className={getClassName("kcInputClass")}
              type="text"
              autoComplete="lastName"
              defaultValue={register.formData.lastName ?? ""}
            />
          </div>
        </Form.Item>
      </div>

      <div className={clsx(getClassName("kcFormGroupClass"))}>
        <Form.Item
          name="email"
          label={msg("email")}
          className={getClassName("kcLabelClass")}
          htmlFor="email"
          rules={[
            {
              required: true,
              message: msgStr("missingEmailMessage"),
            },
          ]}
        >
          <div className={getClassName("kcInputWrapperClass")}>
            <Input
              id="email"
              tabIndex={3}
              name="email"
              placeholder={msgStr("placeholderEmail")}
              prefix={<MailOutlined style={{ color: token.colorPrimary }} />}
              size="large"
              className={getClassName("kcInputClass")}
              type="email"
              autoComplete="email"
              defaultValue={register.formData.email ?? ""}
            />
          </div>
        </Form.Item>
      </div>

      {!realm.registrationEmailAsUsername && (
        <div className={clsx(getClassName("kcFormGroupClass"))}>
          <Form.Item
            name="username"
            label={msg("username")}
            className={getClassName("kcLabelClass")}
            htmlFor="username"
            rules={[
              {
                required: true,
                message: msgStr("missingUsernameMessage"),
              },
            ]}
          >
            <div className={getClassName("kcInputWrapperClass")}>
              <Input
                id="username"
                tabIndex={4}
                name="username"
                placeholder={msgStr("placeholderUsername")}
                prefix={<UserOutlined style={{ color: token.colorPrimary }} />}
                size="large"
                className={getClassName("kcInputClass")}
                type="text"
                autoComplete="username"
                defaultValue={register.formData.username ?? ""}
              />
            </div>
          </Form.Item>
        </div>
      )}

      {passwordRequired && (
        <>
          <div className={clsx(getClassName("kcFormGroupClass"))}>
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
              <div className={getClassName("kcInputWrapperClass")}>
                <Input.Password
                  id="password"
                  tabIndex={5}
                  name="password"
                  placeholder={msgStr("placeholderPassword")}
                  prefix={
                    <UnlockOutlined style={{ color: token.colorPrimary }} />
                  }
                  size="large"
                  className={getClassName("kcInputClass")}
                  type="password"
                  autoComplete="new-password"
                  visibilityToggle
                />
              </div>
            </Form.Item>
          </div>

          <div className={clsx(getClassName("kcFormGroupClass"))}>
            <Form.Item
              name="password-confirm"
              label={msg("passwordConfirm")}
              className={getClassName("kcLabelClass")}
              htmlFor="password-confirm"
              rules={[
                {
                  required: true,
                  message: msgStr("missingPasswordMessage"),
                },
              ]}
            >
              <div className={getClassName("kcInputWrapperClass")}>
                <Input.Password
                  id="password-confirm"
                  tabIndex={6}
                  name="password-confirm"
                  placeholder={msgStr("placeholderPassword")}
                  prefix={
                    <LockOutlined style={{ color: token.colorPrimary }} />
                  }
                  size="large"
                  className={getClassName("kcInputClass")}
                  type="password"
                  autoComplete="new-password"
                  visibilityToggle
                />
              </div>
            </Form.Item>
          </div>
        </>
      )}

      {recaptchaRequired && (
        <div className="form-group">
          <div className={getClassName("kcInputWrapperClass")}>
            <div
              className="g-recaptcha"
              data-size="compact"
              data-sitekey={recaptchaSiteKey}
            ></div>
          </div>
        </div>
      )}

      <div className={getClassName("kcFormGroupClass")}>
        <div
          id="kc-form-options"
          className={getClassName("kcFormOptionsClass")}
        >
          <div className={getClassName("kcFormOptionsWrapperClass")}>
            <Form.Item>
              <Typography.Link
                tabIndex={7}
                href={url.loginUrl}
                className="link-focus-visible"
              >
                {msg("backToLogin")}
              </Typography.Link>
            </Form.Item>
          </div>
        </div>
        <div
          id="kc-form-buttons"
          className={getClassName("kcFormButtonsClass")}
        >
          <Form.Item>
            <Button
              tabIndex={8}
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
              {msgStr("doRegister")}
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
}
