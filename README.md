Welcome to MetroBook Store, highly vulnerable web application.

This application was intentionally impregnated with vulnerabilities and has a test bench to prove the concepts of
vulnerabilities in the React application.

The application uses React/Next/Typescript/MongoDB

Here is working web-version, deployed on Vercel https://metrobooks.vercel.app/

There are:

- 1 broken access control (A01:2021-Broken Access Control)
- 1 uses plain text passwords data store (A02:2021-Cryptographic Failures)
- 14 markup injections (A03:2021-Injection)
- 4 DB injections (A03:2021-Injection)
- 1 system information disclosure (A04:2021-Insecure Design )
- 1 account enumeration failure (A05:2021-Security Misconfiguration )
- 2 authorisation failure (A07:2021-Identification and Authentication Failures)
- 1 exposes session identifier in the URL (A07:2021–Identification and Authentication Failures)
- 5 vulnerable components (A06:2021-Vulnerable and Outdated Components)
- 1 logging failure (A09:2021-Security Logging and Monitoring Failures)

Future developments:

1. yaml with bad settings
2. ReactDOMServer.renderToStaticMarkup
3. vulnerable iframe
