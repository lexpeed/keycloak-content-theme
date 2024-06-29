import type { ReactNode } from "react";
import type { LazyOrNot as KeycloakifyLazyOrNot } from "keycloakify/tools/LazyOrNot";
import type { TemplateProps as KeycloakifyTemplateProps } from "keycloakify/login/TemplateProps";
import type { PageProps as KeycloakifyPageProps } from "keycloakify/login/pages/PageProps";
import type { I18n as KeycloakifyI18n } from "keycloakify/login/i18n";
import { KcContext as KeycloakifyKcContext } from "keycloakify/login/kcContext";

import { KcContext } from "../kcContext";
import { I18n } from "../i18n";

export type TemplateProps<
  KcContext extends KeycloakifyKcContext.Common,
  I18nExtended extends KeycloakifyI18n
> = Omit<KeycloakifyTemplateProps<KcContext, I18nExtended>, "headerNode"> & {
  headerNode?: ReactNode;
  activeTab?: string;
  onTabClick?: (key: string) => void;
  pageTitleNode?: ReactNode;
  pageSubtitleNode?: ReactNode;
  loginPageFormNode?: ReactNode;
  registerPageFormNode?: ReactNode;
};

export type PageProps<
  NarowedKcContext = KeycloakifyKcContext,
  I18nExtended extends KeycloakifyI18n = KeycloakifyI18n
> = Omit<KeycloakifyPageProps<NarowedKcContext, I18nExtended>, "Template"> & {
  Template: KeycloakifyLazyOrNot<
    (props: TemplateProps<KcContext, I18n>) => JSX.Element | null
  >;
};

export type LoginContext = Extract<KcContext, { pageId: "login.ftl" }>;
export type RegisterContext = Extract<KcContext, { pageId: "register.ftl" }>;
