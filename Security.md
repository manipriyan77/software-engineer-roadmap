# Phase: Frontend Security Mastery — Daily Roadmap

**Goal:** Understand common vulnerabilities, browser security mechanisms, and secure coding practices to confidently build secure applications.

---

## Day 1 — Web Security Fundamentals

**Read:**
- [OWASP Web Security Basics](https://owasp.org/www-project-top-ten/)
- [Mozilla Security Concepts](https://developer.mozilla.org/docs/Web/Security)
- [Introduction to CIA Triad](https://www.geeksforgeeks.org/cia-triad-in-information-security/)

**Exercises:**
- Explain the difference between authentication vs authorization with examples.
- List all OWASP Top 10 vulnerabilities and give a frontend example for each.
- Identify at least 3 potential attack vectors on a sample web page.

---

## Day 2 — Cross-Site Scripting (XSS)

**Read:**
- [OWASP XSS](https://owasp.org/www-community/attacks/xss/)
- [DOM-based XSS Guide](https://javascript.info/xss)
- [MDN textContent vs innerHTML](https://developer.mozilla.org/docs/Web/API/Node/textContent)

**Exercises:**
- Demonstrate a stored, reflected, and DOM-based XSS example in a test page.
- Rewrite unsafe DOM manipulations using `textContent` or safe libraries.
- Audit a small React component for potential XSS risks.

---

## Day 3 — Cross-Site Request Forgery (CSRF)

**Read:**
- [OWASP CSRF](https://owasp.org/www-community/attacks/csrf)
- [SameSite Cookies Guide](https://web.dev/samesite-cookies-explained/)
- [CSRF Tokens Explained](https://javascript.info/fetch-crossorigin)

**Exercises:**
- Simulate a CSRF attack on a demo form (locally, safe environment).
- Implement CSRF token verification in a frontend + backend demo.
- Configure `SameSite` attribute on cookies and verify behavior.

---

## Day 4 — Content Security Policy (CSP)

**Read:**
- [MDN CSP](https://developer.mozilla.org/docs/Web/HTTP/CSP)
- [CSP Guide & Examples](https://web.dev/content-security-policy/)

**Exercises:**
- Add a basic CSP header to a test HTML page.
- Experiment with `script-src`, `style-src`, and `img-src` directives.
- Implement nonce-based scripts and verify browser behavior.

---

## Day 5 — Secure Authentication & Authorization

**Read:**
- [JWT Guide](https://jwt.io/introduction/)
- [OAuth 2.0 Frontend Flow](https://auth0.com/docs/authorization/flows)
- [MDN Secure Storage](https://developer.mozilla.org/docs/Web/API/Window/localStorage)

**Exercises:**
- Implement JWT-based authentication in a small SPA.
- Compare storing tokens in `localStorage` vs `httpOnly` cookies.
- Simulate refresh token flow using fetch requests.

---

## Day 6 — Browser Security Mechanisms

**Read:**
- [MDN Same-Origin Policy](https://developer.mozilla.org/docs/Web/Security/Same-origin_policy)
- [CORS Guide](https://developer.mozilla.org/docs/Web/HTTP/CORS)
- [Subresource Integrity (SRI)](https://developer.mozilla.org/docs/Web/Security/Subresource_Integrity)

**Exercises:**
- Set up a CORS-enabled fetch request and test restrictions.
- Add SRI to a third-party script and verify integrity.
- Implement sandboxed iframe with different attributes and test.

---

## Day 7 — Frontend Secure Coding Practices

**Read:**
- [Secure Coding Practices (OWASP)](https://cheatsheetseries.owasp.org/)
- [Handling user input safely](https://owasp.org/www-project-cheat-sheets/cheatsheets/Input_Validation_Cheat_Sheet.html)

**Exercises:**
- Audit a React/Next.js component for unsafe DOM manipulations.
- Implement input validation and sanitization.
- Check third-party libraries for vulnerabilities using `npm audit`.

---

## Day 8 — Advanced Security Topics

**Read:**
- [WebAuthn & FIDO2](https://webauthn.guide/)
- [OWASP ZAP Tutorial](https://owasp.org/www-project-zap/)
- [WebSockets Security Guide](https://owasp.org/www-project-cheat-sheets/cheatsheets/WebSockets_Security_Cheat_Sheet.html)

**Exercises:**
- Implement a simple WebAuthn passwordless login demo.
- Run basic frontend security scan using OWASP ZAP.
- Secure a WebSocket connection with TLS and proper origin checks.

---

## Day 9 — Security Mindset & Best Practices

**Read:**
- [OWASP Threat Modeling](https://owasp.org/www-community/Threat_Modeling)
- [Frontend Security Checklist](https://owasp.org/www-project-cheat-sheets/cheatsheets/Frontend_Security_Cheat_Sheet.html)
- [CVE & Vulnerability Alerts](https://cve.mitre.org/)

**Exercises:**
- Create a security-first checklist for a sample SPA project.
- Identify potential vulnerabilities in a project before QA.
- Document incident response plan for frontend security bugs.

---

## ✅ Overall Exit Criteria

- Explain all common frontend vulnerabilities and how to prevent them.
- Audit a frontend codebase and identify security issues.
- Confidently configure browser security policies (CSP, CORS, SRI, cookies).
- Implement secure authentication and authorization flows.
- Build SPA with a security-first mindset.
