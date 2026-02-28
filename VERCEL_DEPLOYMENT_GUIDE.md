# 🚀 How to Host TaskFlow on Vercel

Hosting this vanilla HTML/CSS/JS frontend application on Vercel is incredibly fast, easy, and completely **free**. Because there is no build step (like NPM, Webpack, or Vite), Vercel will instantly serve your `index.html` file right from your GitHub repository.

Here is the step-by-step guide to get it live on the internet in under 2 minutes:

---

## Step 1: Log in to Vercel
1. Go to **[vercel.com](https://vercel.com/)**
2. Click **Log In** or **Sign Up** (it is easiest to sign up using your GitHub account).

## Step 2: Import Your GitHub Repository
1. Once logged into the Vercel dashboard, click the black **Add New...** button in the top right corner.
2. Select **Project** from the dropdown menu.
3. Under the "Import Git Repository" section, you will see a list of your GitHub repositories.
4. Find **`To-Do-Web-App`** and click the **Import** button next to it.
   *(Note: If you don't see the repository, click "Adjust GitHub App Permissions" and select the repository to grant Vercel access).*

## Step 3: Configure the Project
Because this is a pure HTML/CSS/JS project, Vercel understands how to host it automatically.
You will see a "Configure Project" screen. **You do NOT need to change anything here.**

Ensure the settings look like this:
*   **Project Name:** `to-do-web-app` (or whatever you prefer)
*   **Framework Preset:** `Other`
*   **Root Directory:** `./`
*   **Build Command:** *(leave blank / overriding not needed)*
*   **Output Directory:** *(leave blank / overriding not needed)*

## Step 4: Deploy!
1. Click the blue **Deploy** button.
2. Wait a few seconds... Vercel will pull your code from GitHub and put it on a global CDN.
3. You will see a "Congratulations!" screen with confetti when it's done.

## Step 5: View Your Live App
Click on the **Continue to Dashboard** button. In the top right corner, or under the preview image, you will see a public domain name (e.g., `https://to-do-web-app-xxxxx.vercel.app`).

Click it, and your To-Do app is now live on the internet!

---

### 💡 Continuous Deployment (Auto-Updates)
The best part about Vercel is that it is linked to your GitHub repository. 
Whenever you make changes to your code locally and push them to GitHub (`git push`), **Vercel will automatically rebuild and update your live website**! You never have to manually deploy it again.
