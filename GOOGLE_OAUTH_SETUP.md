# Google OAuth Setup Instructions

## Issue: Error 401: invalid_client

This error occurs because the Google OAuth Client ID is not properly configured. Follow these steps to fix it:

## Step 1: Create Google OAuth Credentials

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create or select a project**
3. **Enable required APIs**:
   - Go to "APIs & Services" → "Library"
   - Search for and enable:
     - "Google Identity" (for OAuth)
     - "Google+ API" (optional, for additional user info)

4. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Set up authorized domains and redirect URIs:

### For Development:
- **Authorized JavaScript origins**: 
  - `http://localhost:3000`
  - Your sandbox URL (if using Cloudflare preview)
- **Authorized redirect URIs**: 
  - `http://localhost:3000`
  - `http://localhost:3000/auth/google/callback` (if needed)

### For Production:
- **Authorized JavaScript origins**: 
  - Your Cloudflare Pages domain (e.g., `https://your-app.pages.dev`)
- **Authorized redirect URIs**: 
  - Your Cloudflare Pages domain

5. **Copy the Client ID** - it will look like: `1234567890-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com`

## Step 2: Configure Your Application

### For Local Development:
1. Open `.dev.vars` file in your project root
2. Replace the placeholder with your actual Client ID:
   ```
   GOOGLE_CLIENT_ID=your-actual-client-id-here.apps.googleusercontent.com
   ```

### For Production:
1. Set the environment variable in Cloudflare:
   ```bash
   npx wrangler secret put GOOGLE_CLIENT_ID
   ```
   Then paste your Client ID when prompted.

## Step 3: Test the Configuration

1. **Start your development server**:
   ```bash
   npm run build
   pm2 start ecosystem.config.cjs
   ```

2. **Test Google OAuth**:
   - Click "Sign In" or "Sign Up"
   - Try the "Continue with Google" button
   - You should see the Google OAuth consent screen instead of the error

## Troubleshooting

### Still getting "invalid_client" error?

1. **Check Client ID format**: Make sure it ends with `.apps.googleusercontent.com`
2. **Verify domains**: Ensure your current domain is in the authorized JavaScript origins
3. **Clear browser cache**: OAuth can be cached, try incognito mode
4. **Check console logs**: Look for configuration loading messages

### Domain not authorized error?

1. Add your current domain to Google Cloud Console:
   - Go to your OAuth client settings
   - Add the domain you're accessing the app from
   - Wait a few minutes for changes to propagate

### Client ID not loading?

1. Check the `/api/config` endpoint returns the correct Client ID
2. Verify environment variables are set correctly
3. Check browser console for configuration loading errors

## Security Notes

- Never commit your Client ID to version control if it's sensitive
- The `.dev.vars` file is already in `.gitignore`
- For production, always use environment variables/secrets
- Consider using different OAuth clients for development and production

## Need Help?

- Google OAuth 2.0 documentation: https://developers.google.com/identity/protocols/oauth2
- Google Cloud Console: https://console.cloud.google.com/