# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

---

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

### How to Report

1. **Email:** security@example.com
2. **Subject:** [SECURITY] Brief description
3. **Include:**
   - Type of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days
- **Fix Timeline:** Varies by severity

### Severity Levels

**Critical:** Immediate attention
- Remote code execution
- Authentication bypass
- Data breach risk

**High:** Priority fix
- XSS vulnerabilities
- CSRF issues
- Sensitive data exposure

**Medium:** Next release
- DoS vulnerabilities
- Minor information disclosure

**Low:** Addressed when possible
- Minor issues with low impact

---

## Security Best Practices

### For Users

1. **Keep Updated:** Use the latest version
2. **Secure Environment:** Use HTTPS in production
3. **Environment Variables:** Never commit `.env.local`
4. **API Keys:** Rotate regularly, use strong keys

### For Contributors

1. **Input Validation:** Always validate user input
2. **Output Encoding:** Escape HTML/JavaScript properly
3. **Dependencies:** Keep dependencies updated
4. **Secrets:** Never commit sensitive data
5. **Code Review:** All PRs require security review

---

## Known Security Measures

### Implemented
- ✅ File type validation
- ✅ File size limits (10MB)
- ✅ Executable file blocking
- ✅ XSS prevention in exports
- ✅ Request timeout handling
- ✅ Input sanitization
- ✅ HTML entity escaping

### Recommended (Optional)
- Rate limiting on API endpoints
- Content Security Policy headers
- CORS configuration
- API key rotation
- Request logging

---

## Security Updates

Security patches will be released as:
- **Critical:** Immediate patch release
- **High:** Within 7 days
- **Medium:** Next minor version
- **Low:** Next major version

---

**Last Updated:** 2026-11-02
