# Super Cool Projects Website

A premium, highly polished web application for **KD AC | Super Cool Projects**, built with React, Vite, Tailwind CSS, and Framer Motion. 

---

## 🚀 How to Export to GitHub & Deploy to Vercel

You can link this workspace to your GitHub repository and automatically trigger deployments on Vercel. Here are the step-by-step instructions.

### Step 1: Export Project to GitHub

There are two primary ways to move this codebase to your GitHub repository (`https://github.com/Whatzup/scp_website.git`):

#### Method A: Direct Export via AI Studio (Recommended)
1. In the **Google AI Studio** interface, click on the **Settings** menu (usually a gear icon or a menu in the top-right corner).
2. Select **Export to GitHub** or **Download ZIP**.
3. If exporting via GitHub integration, connect your GitHub account, grant permissions, and select your repository `Whatzup/scp_website`.
4. If downloading the ZIP, extract it locally, open your computer's terminal in that folder, and follow the **Local Push** steps below.

#### Method B: Local Terminal Push
If you downloaded the ZIP file or have a local copy of the code, run these commands in your machine's terminal:

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initialize KD AC website with updated assets and configurations"

# Rename default branch to main
git branch -M main

# Add your GitHub repository as remote origin
git remote add origin https://github.com/Whatzup/scp_website.git

# Force-push to clear any conflicting history or upload for the first time
git push -u origin main --force
```

---

### Step 2: Set Up Automatic Vercel Deployment

Once your codebase is on GitHub, Vercel can manage automatic continuous deployments whenever you push changes.

1. Go to your **Vercel Dashboard** or project link: [super-cool-projects](https://vercel.com/super-cool-projects).
2. Click **Add New...** and choose **Project**.
3. Under **Import Git Repository**, select your GitHub account and find the **scp_website** repository.
4. Click **Import**.
5. Configure the Build and Output settings (Vercel automatically detects Vite configurations):
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**.

Vercel will successfully build and host the app at your custom Vercel subdomain or connected domains. Every time you push a modification to your GitHub `main` branch, Vercel will automatically compile and roll out the live production update instantly.

---

## 🛠️ Project Architecture

- **`vercel.json`**: Pre-configured at the root level to route all client-side page paths to `index.html` seamlessly, preventing 404s on refresh.
- **`src/components/Logo.tsx`**: Loads the official local fallback `src/assets/logo.jpg` and `public/logo.jpg` derived from your uploaded label file.
- **`src/components/Hero.tsx`**: Displaying your custom slogan, service descriptions, and Haryana division tax credentials.
- **`src/components/DealerShowcase.tsx`**: Highlighting authentic factory partnerships with direct-source warranties.

---

## 💻 Local Development

To run the project locally on your machine:

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Start Development Server:**
   ```bash
   npm run dev
   ```
3. **Build Code for Production:**
   ```bash
   npm run build
   ```
