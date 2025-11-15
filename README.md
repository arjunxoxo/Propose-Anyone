# Propose Anyone

## Deploy to Render

Click the button below to deploy this application to Render:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/arjunxoxo/Propose-Anyone)

### Manual Deployment

If the button doesn't work, follow these steps:

1. Go to https://render.com
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Select the "Propose-Anyone" repository
5. Configure:
   - **Root Directory**: `apps/web`
   - **Build Command**: `npm install --legacy-peer-deps && npm run build`
   - **Start Command**: `npm start`
6. Click "Create Web Service"

Your app will be live at: `https://propose-anyone.onrender.com`
