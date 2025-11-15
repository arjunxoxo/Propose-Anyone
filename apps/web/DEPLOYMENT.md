# Deployment Guide

This guide covers deploying the web application to various platforms.

## Prerequisites

- Node.js 20+ installed
- Project dependencies installed (`npm install`)

## Option 1: Vercel (Recommended)

Vercel provides the easiest deployment for React Router applications.

### Steps:

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy from the web app directory:
   ```bash
   cd apps/web
   vercel
   ```

3. Follow the CLI prompts to link/create a project

4. For production deployment:
   ```bash
   vercel --prod
   ```

## Option 2: Netlify

### Steps:

1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Deploy:
   ```bash
   cd apps/web
   netlify deploy
   ```

3. For production:
   ```bash
   netlify deploy --prod
   ```

## Option 3: Docker (Self-hosted)

### Steps:

1. Build the Docker image:
   ```bash
   cd apps/web
   docker build -t create-anything-web .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 create-anything-web
   ```

3. Access at `http://localhost:3000`

### Docker Compose:

Create a `docker-compose.yml`:

```yaml
version: '3.8'
services:
  web:
    build: ./apps/web
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

Run with: `docker-compose up -d`

## Option 4: Traditional VPS/Server

### Steps:

1. Build the application:
   ```bash
   cd apps/web
   npm run build
   ```

2. Copy these to your server:
   - `build/` directory
   - `package.json`
   - `package-lock.json`

3. On the server:
   ```bash
   npm ci --production
   npm start
   ```

4. Use a process manager like PM2:
   ```bash
   npm i -g pm2
   pm2 start npm --name "create-anything" -- start
   pm2 save
   pm2 startup
   ```

5. Setup nginx as reverse proxy (optional):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Environment Variables

Make sure to set any required environment variables on your deployment platform. Check for `.env.example` or required variables in the codebase.

## Post-Deployment

1. Test all functionality
2. Monitor logs for errors
3. Set up custom domain (if needed)
4. Enable HTTPS/SSL certificates
5. Configure CI/CD for automatic deployments

## Troubleshooting

- **Build fails**: Check Node.js version (20+ required)
- **Port issues**: Change PORT environment variable
- **Missing dependencies**: Run `npm install` in the correct directory
- **SSR errors**: Ensure server-side code is compatible with your hosting platform
