import { createGetKcContext } from "keycloakify/login";

export type KcContextExtension =
  // WARNING: It's important to keep in sync the extraThemeProperties declared in the package.json and this type definition.
  | { pageId: "login.ftl"; extraThemeProperties: { foo: string } }
  | { pageId: "my-extra-page-1.ftl" }
  | { pageId: "my-extra-page-2.ftl"; someCustomValue: string }
  // NOTE: register.ftl is deprecated in favor of register-user-profile.ftl
  // but let's say we use it anyway and have this plugin enabled: https://github.com/micedre/keycloak-mail-whitelisting
  // keycloak-mail-whitelisting define the non standard ftl global authorizedMailDomains, we declare it here.
  | { pageId: "register.ftl"; authorizedMailDomains: string[] };

//NOTE: In most of the cases you do not need to overload the KcContext, you can
// just call createGetKcContext(...) without type arguments.
// You want to overload the KcContext only if:
// - You have custom plugins that add some values to the context (like https://github.com/micedre/keycloak-mail-whitelisting that adds authorizedMailDomains)
// - You want to add support for extra pages that are not yey featured by default, see: https://docs.keycloakify.dev/contributing#adding-support-for-a-new-page
export const { getKcContext } = createGetKcContext<KcContextExtension>({
  mockData: [
    {
      pageId: "login.ftl",
      locale: {
        currentLanguageTag: "pt-BR",
        // currentLanguageTag: "en",
      },
      realm: {
        registrationAllowed: true,
        resetPasswordAllowed: true,
        rememberMe: true,
        registrationEmailAsUsername: true,
        loginWithEmailAllowed: true,
        internationalizationEnabled: false,
        displayName: "Portal Eduque",
        // displayNameHtml: '<h1>Portal Eduque</h1>',
        displayNameHtml: "",
      },
      login: {
        // username: 'teste',
        // rememberMe: 'on',
        // password?: string;
      },
      // social: {
      //   displayInfo: true,
      //   providers: [
      //     {
      //       alias: "google",
      //       providerId: "google",
      //       displayName: "Google",
      //       loginUrl: "google",
      //     },
      //   ],
      // },
      usernameHidden: false,
      // Uncomment the following line for hiding the Alert message
      // "message": undefined
      // Uncomment the following line for showing an Error message
      // message: { type: "error", summary: "This is an error" }
    },
    {
      pageId: "my-extra-page-2.ftl",
      someCustomValue: "foo bar baz",
    },
    {
      // NOTE: You will either use register.ftl (legacy) or register-user-profile.ftl, not both
      pageId: "register-user-profile.ftl",
      locale: {
        currentLanguageTag: "pt-BR",
      },
      profile: {
        attributes: [
          {
            validators: {
              pattern: {
                pattern: "^[a-zA-Z0-9]+$",
                "ignore.empty.value": true,
                // eslint-disable-next-line no-template-curly-in-string
                "error-message": "${alphanumericalCharsOnly}",
              },
            },
            //NOTE: To override the default mock value
            value: undefined,
            name: "username",
          },
          {
            validators: {
              options: {
                options: [
                  "male",
                  "female",
                  "non-binary",
                  "transgender",
                  "intersex",
                  "non_communicated",
                ],
              },
            },
            // eslint-disable-next-line no-template-curly-in-string
            displayName: "${gender}",
            annotations: {},
            required: true,
            groupAnnotations: {},
            readOnly: false,
            name: "gender",
          },
        ],
      },
    },
    {
      pageId: "register.ftl",
      locale: {
        currentLanguageTag: "pt-BR",
        // currentLanguageTag: "en",
      },
      realm: {
        internationalizationEnabled: false,
        displayName: "Portal Eduque",
        // displayNameHtml: '<h1>Portal Eduque</h1>',
        displayNameHtml: "",
        registrationEmailAsUsername: true,
      },
      register: {
        formData: {
          // firstName: "John",
          // displayName: "John Doe",
          // lastName: "Doe",
          // email: "john.doe@email.com",
          // username: "john.doe",
        },
      },
      recaptchaRequired: false,
      recaptchaSiteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
      passwordRequired: true,
      authorizedMailDomains: [
        "example.com",
        "another-example.com",
        "*.yet-another-example.com",
        "*.example.com",
        "hello-world.com",
      ],
    },
    {
      pageId: "terms.ftl",
      locale: {
        currentLanguageTag: "pt-BR",
      },
    },
    {
      pageId: "info.ftl",
      locale: {
        currentLanguageTag: "pt-BR",
      },
    },
  ],
});

export const { kcContext } = getKcContext({
  // Uncomment to test the login page for development.
  // mockPageId: "login.ftl",
  // mockPageId: "my-extra-page-2.ftl",
  // mockPageId: "register-user-profile.ftl",
  // mockPageId: "register.ftl",
  // mockPageId: "terms.ftl",
  // mockPageId: "info.ftl",
});

export type KcContext = NonNullable<
  ReturnType<typeof getKcContext>["kcContext"]
>;
