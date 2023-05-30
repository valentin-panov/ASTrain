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
