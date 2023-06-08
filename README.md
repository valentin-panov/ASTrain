Welcome to MetroBook Store, highly vulnerable web application.

This application was intentionally impregnated with vulnerabilities and has a test bench to prove the concepts of
vulnerabilities in the React application.

The application uses React/Next/Typescript/MongoDB

Here is working web-version, deployed on Vercel https://metrobooks.vercel.app/

There are:

* 1 broken access control (A01:2021-Broken Access Control)
* 3 plain text secret tokens hardcoded (A02:2021-Cryptographic Failures)
* 13 markup injections (A03:2021-Injection)
* 4 DB injections (A03:2021-Injection)
* 3 system information disclosure (A04:2021-Insecure Design )
* 1 account enumeration failure (A05:2021-Security Misconfiguration )
* 2 vulnerable components (A06:2021-Vulnerable and Outdated Components)
* 2 authorisation failures (A07:2021-Identification and Authentication Failures)
* 1 the session identifier in the URL exposure (A07:2021–Identification and Authentication Failures)
* 1 Insecure deserialization of untrusted data & prototype pollution (A08:2021 – Software and Data Integrity Failures)
* 1 logging failure (A09:2021-Security Logging and Monitoring Failures)

Future developments:

1. yaml with bad settings
2. ReactDOMServer.renderToStaticMarkup
3. vulnerable iframe

The file list:
components/authDebugger/AuthDebugger.tsx
components/avatarDropdown/AvatarDropdown.tsx
components/common/Input/Input.tsx
components/common/buttons/GradientButton.tsx
components/common/buttons/GradientLink.tsx
components/common/buttons/Hyperlink.tsx
components/common/buttons/MainButton.tsx
components/common/card/Card.tsx
components/common/cardContent/CardContent.tsx
components/common/cardSpacer/CardSpacer.tsx
components/common/dangerButton/DangerButton.tsx
components/common/formError/FormError.tsx
components/common/gradientBar/GradientBar.tsx
components/common/label/Label.tsx
components/common/pageTitle/PageTitle.tsx
components/dashboardChart/DashboardChart.tsx
components/dashboardMetric/DashboardMetric.tsx
components/footer/Footer.tsx
components/formError/FormError.tsx
components/formInput/FormInput.tsx
components/formSuccess/FormSuccess.tsx
components/header/Header.tsx
components/index.ts
components/inventoryItemForm/InventoryItemForm.tsx
components/main/Main.tsx
components/navbar/Navbar.tsx
components/sidebar/Sidebar.tsx
components/testLib/_packages/html-to-react-parser/LoopLink/LoopLink.tsx
components/testLib/_packages/html-to-react-parser/Text/Text.tsx
components/testLib/_packages/html-to-react-parser/decode-html/index.ts
components/testLib/_packages/html-to-react-parser/html-to-react-parser.tsx
components/testLib/_packages/html-to-react-parser/index.ts
components/testLib/_packages/html-to-react-parser/link/index.tsx
components/testLib/classicInput/classicInput.tsx
components/testLib/container/barrel.tsx
components/testLib/container/index.tsx
components/testLib/index.ts
components/testLib/poc_PrototypePollution/PrototypePollution.tsx
components/testLib/poc_createElement/createElement.tsx
components/testLib/poc_dSIH/DSIH.tsx
components/testLib/poc_exampleRouter/exampleRouter.tsx
components/testLib/poc_formAction/formAction.tsx
components/testLib/poc_locationHref/locationHref.tsx
components/testLib/poc_nextRedirect/nextRedirect.tsx
components/testLib/poc_objAssign/ObjectAssign.tsx
components/testLib/poc_parseHtmlStringToLoop/ParseHtmlStringToLoop.tsx
components/testLib/poc_react_parser/ReactParser.tsx
components/testLib/poc_react_parser_domToReact/ReactParserDomToReact.tsx
components/testLib/poc_refInnerHTML/refInnerHTML.tsx
components/testLib/poc_windowOpen/windowOpen.tsx
components/testLib/safe_AsPathLinkLink/SafeAsPathLink.tsx
components/testLib/safe_Image/SafeImage.tsx
components/testLib/safe_classN/classN.tsx
components/testLib/safe_dataTestId/dataTestId.tsx
components/testLib/safe_htmlAttr/HtmlAttr.tsx
components/testLib/safe_populatedInput/populatedInput.tsx
components/testLib/test_BaseService/BaseServiceComponent.tsx
components/testLib/test_dSIH_script/DSIHscript.tsx
context/AuthContext.tsx
context/FetchContext.tsx
data/constants.ts
data/dashboard.js
interfaces/IAuth.ts
interfaces/ICredentials.ts
interfaces/ICsrf.ts
interfaces/IInventory.ts
interfaces/IInventoryItemForm.ts
interfaces/IItem.ts
interfaces/IUser.ts
layouts/MainLayout/MainLayout.tsx
layouts/index.ts
lib/auth.ts
lib/authConstants.ts
lib/jsonResponse.ts
middleware.ts
models/InventoryItemModel.ts
models/UserModel.ts
models/createModel.ts
next-env.d.ts
next.config.js
package-lock.json
package.json
packages/Heading/Heading.tsx
packages/Image/Image.tsx
packages/Link/Link.tsx
packages/Text/Text.tsx
packages/index.tsx
pages/404.tsx
pages/_app.tsx
pages/_document.tsx
pages/account/index.tsx
pages/api/auth/authenticate/index.ts
pages/api/auth/logout/index.ts
pages/api/bio/index.ts
pages/api/csrf-invalid.ts
pages/api/dashboard-data/index.ts
pages/api/hello.ts
pages/api/inventory/[id].ts
pages/api/inventory/index.ts
pages/api/signup/index.ts
pages/api/user-role/index.ts
pages/api/users/index.ts
pages/dashboard/index.tsx
pages/homepage/index.tsx
pages/index.tsx
pages/inventory/index.tsx
pages/lab/index.tsx
pages/login/index.tsx
pages/settings/index.tsx
pages/signup/index.tsx
pages/users/index.tsx
services/AccountSummaryService.ts
services/AuthService.ts
services/BaseService.ts
services/InternalPages.ts
services/SignupService.ts
services/index.ts
tsconfig.json
utils/connectMongo.ts
utils/cookie-parse-client-side.ts
utils/formatCurrency.ts
utils/index.ts
utils/passwordTools.ts
utils/routes.ts
utils/storage.ts
utils/url-parse.ts