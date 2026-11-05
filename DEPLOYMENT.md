# 🚀 Deployment Guide

**Quick deployment guide for EBC OCR Website v1.0.0**

---

## Pre-Deployment Checklist

### ✅ Code Quality
- [x] ESLint: 0 errors ✅
- [x] TypeScript: 0 errors ✅
- [x] Build: SUCCESS ✅
- [x] All features tested ✅

### ✅ Configuration
- [ ] Environment variables ready
- [ ] API credentials secured
- [ ] Domain name configured
- [ ] SSL certificate ready

### ✅ Documentation
- [x] README.md updated ✅
- [x] CHANGELOG.md complete ✅
- [x] API documentation available ✅

---

## Quick Deploy (Vercel)

### 1. Prepare Repository
```bash
# Commit all changes
git add .
git commit -m "chore: prepare for v1.0.0 deployment"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Import Project"**
3. Select your GitHub repository
4. Configure:
   - Framework: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. Add Environment Variables
```bash
OCR_API_URL=https://your-api.com/ocr
OCR_API_USERNAME=your-username
OCR_API_SECRET_KEY=your-secret-key
NODE_ENV=production
```

### 4. Deploy
Click **"Deploy"** - Done in ~2 minutes! 🎉

---

## Alternative Deployments

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

### Docker (Self-Hosted)

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t ebc-ocr .
docker run -p 3000:3000 --env-file .env.local ebc-ocr
```

### AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize
amplify init

# Deploy
amplify publish
```

---

## Post-Deployment Verification

### 1. Health Check
```bash
# Check if site is live
curl https://your-domain.com

# Check API health
curl https://your-domain.com/api/health
```

### 2. Feature Testing
- [ ] Home page loads
- [ ] Dark mode toggle works
- [ ] Language switch works
- [ ] File upload works
- [ ] OCR processing works
- [ ] Export to TXT works
- [ ] Export to Word works
- [ ] Mobile responsive

### 3. Performance Check
- [ ] Lighthouse score >90
- [ ] LCP <2.5s
- [ ] FID <100ms
- [ ] CLS <0.1

---

## Monitoring Setup (Optional)

### Sentry (Error Tracking)

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Rollback Plan

### Quick Rollback (Vercel)
1. Go to Deployments
2. Find previous working deployment
3. Click **"Promote to Production"**

### Manual Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific version
git reset --hard <commit-hash>
git push -f origin main
```

---

## Common Issues

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working
- Verify variables are set in hosting dashboard
- Check variable names match exactly
- Redeploy after adding variables

### 404 Errors
- Check `next.config.ts` for proper routing
- Verify static files in `public/` directory
- Check middleware configuration

---

## Domain Configuration

### Custom Domain (Vercel)
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (~24 hours)

### SSL Certificate
- Vercel: Automatic (Let's Encrypt)
- Netlify: Automatic (Let's Encrypt)
- Self-hosted: Use Certbot

---

## Performance Optimization

### After Deployment

1. **Enable Compression**
   - Already enabled in Next.js

2. **CDN Configuration**
   - Vercel/Netlify: Automatic
   - Self-hosted: Use Cloudflare

3. **Image Optimization**
   ```bash
   # Convert images to WebP
   npm install sharp
   # Use in Phase 2
   ```

4. **Cache Headers**
   ```typescript
   // next.config.ts
   async headers() {
     return [
       {
         source: '/static/:path*',
         headers: [
           {
             key: 'Cache-Control',
             value: 'public, max-age=31536000, immutable',
           },
         ],
       },
     ];
   }
   ```

---

## Security Checklist

### Pre-Production
- [ ] Environment variables not in git
- [ ] API keys rotated
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Rate limiting enabled (optional)
- [ ] CSP headers set (optional)

### Post-Production
- [ ] Security headers verified
- [ ] SSL certificate valid
- [ ] No sensitive data in logs
- [ ] Error messages sanitized

---

## Backup Strategy

### Database (if applicable)
```bash
# Daily backups
0 2 * * * pg_dump dbname > backup_$(date +%Y%m%d).sql
```

### Code
- GitHub: Automatic version control
- Vercel: Automatic deployment history

---

## Support & Maintenance

### Regular Tasks
- **Weekly**: Check error logs
- **Monthly**: Update dependencies
- **Quarterly**: Security audit

### Monitoring
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Enable email alerts for errors
- Track performance metrics

---

## Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server

# Quality Checks
npm run check            # Type-check + Lint
npm run build            # Production build

# Deployment
git push origin main     # Auto-deploy (if configured)
vercel                   # Manual Vercel deploy
netlify deploy --prod    # Manual Netlify deploy
```

---

## Success Criteria

Deployment is successful when:
- ✅ All pages load without errors
- ✅ Core OCR functionality works
- ✅ Dark mode functions correctly
- ✅ Both languages work
- ✅ Mobile experience is smooth
- ✅ Lighthouse score >85
- ✅ No console errors
- ✅ SSL certificate valid

---

## Need Help?

- **Documentation**: See [SETUP.md](SETUP.md)
- **Issues**: Check [GitHub Issues](../../issues)
- **Support**: support@example.com

---

**Last Updated**: 2026-11-02  
**Version**: 1.0.0  
**Status**: Production Ready ✅

**Happy Deploying! 🚀**
