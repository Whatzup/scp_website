# Super Cool Projects Website

A premium, highly polished web application for **KD AC | Super Cool Projects**, built with React, Vite, Tailwind CSS, and Framer Motion. 

---

## 🚀 How to Export to GitHub & Deploy to Vercel

You can link this workspace to your GitHub repository and automatically trigger deployments on Vercel. Here are the step-by-step instructions.

### Step 1: Export Project to GitHub

There are two primary ways to move this codebase to your GitHub repository (`https://github.com/Whatzup/scp_website.git`):

#### Method A: Direct Export via Settings (Recommended)
1. In the **Settings** menu, select Export or Download ZIP.
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

## 🌐 How to Deploy to Hostinger

There are two straightforward ways to deploy this website on **Hostinger**:

### Method 1: Hostinger Web Hosting (Static SPA — Recommended & Easiest)

If you are using standard **Hostinger Web Hosting** or **Cloud Hosting (hPanel)**:

1. **Build the production code:**
   Run the following in your local terminal or export project:
   ```bash
   npm run build
   ```
   This generates a `dist/` folder containing compiled static assets and an automatically included `.htaccess` file for URL routing.

2. **Upload to Hostinger:**
   - Log into your **Hostinger hPanel**.
   - Navigate to **Files** -> **File Manager** (or connect via FTP like FileZilla).
   - Go inside the `public_html/` folder of your domain (e.g. `public_html/`).
   - Drag & drop or upload **all files inside the `dist/` folder** directly into `public_html/`.

3. **Routing & `.htaccess`:**
   - The `.htaccess` file bundled in `dist/` automatically rewrites all sub-path requests (e.g., `/contact`, `/services`) to `index.html`. This ensures page refreshes work without 404 errors.

---

### Method 2: Deploying via GitHub Integration in Hostinger hPanel

If you want Hostinger to automatically deploy directly from your GitHub repository (`https://github.com/Whatzup/scp_website.git`):

#### Step 1: Ensure Latest Code is Pushed to GitHub
In your local project or terminal, push all current changes to your `main` branch:
```bash
git add .
git commit -m "Updated Hostinger configuration and server setup"
git push origin main
```

#### Step 2: Connect GitHub Repository in Hostinger hPanel
1. Log into your **Hostinger hPanel**.
2. Select your website domain and navigate to **Advanced** -> **Git** (or search for **Git** in the search bar).
3. Fill in the **Create a New Repository** form:
   - **Repository**: `https://github.com/Whatzup/scp_website.git`
   - **Branch**: `main`
   - **Install Directory**: `public_html` (or leave empty for main domain root)
4. Click **Create**.
5. Once created, click **Deploy** to pull your latest files into Hostinger.

#### Step 3: Configure Node.js Application Startup (If using Node.js Hosting)
1. Go to **Hostinger hPanel** -> **Websites** -> **Setup Node.js App**.
2. Set configuration parameters:
   - **Node.js Version**: `20.x` or `18.x`
   - **Application Root**: `/public_html`
   - **Application Startup File**: `server.js`
   - **Build Command**: `npm run build`
3. Click **NPM Install** to install packages.
4. Click **Run JS Script** -> select `build` (or run `npm run build`).
5. Click **Start App** / **Restart**.

#### Step 4: Setting Up Automatic GitHub Deployments (Webhook)
To make Hostinger deploy automatically every time you push code to GitHub:
1. In Hostinger **Git** page, copy your unique **Auto Deployment Webhook URL**.
2. Go to your repository on GitHub: `https://github.com/Whatzup/scp_website/settings/hooks`.
3. Click **Add webhook**.
4. Paste the Hostinger Webhook URL into **Payload URL**.
5. Set **Content type** to `application/json` and click **Add webhook**.
Now, every `git push origin main` will instantly trigger Hostinger to auto-deploy!

---

### 🔑 Environment Variables on Hostinger

If you are using **Hostinger Node.js Web Hosting** or **VPS**:

- Go to **Hostinger hPanel** -> **Node.js Apps** -> **Environment Variables** (or set up a `.env` file in your application root folder on the server).
- **Database Connection (Optional)**:
  - If you use a cloud PostgreSQL database (like Neon, Supabase, or Hostinger PostgreSQL), set:
    ```env
    DATABASE_URL="postgresql://username:password@hostname:5432/databasename?sslmode=require"
    ```
- **Admin Configuration**:
  - Set authorized admin email addresses for lead management:
    ```env
    ADMIN_EMAILS="aijaz523@gmail.com"
    ```

> 💡 **Note**: If no `DATABASE_URL` is configured, the application automatically uses built-in in-memory storage for submitted leads so your website and lead forms will work 100% reliably out of the box without crashing.

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
