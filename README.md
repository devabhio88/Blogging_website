# 🌐 PeniVerse — A Full-Stack Blogging Platform

PeniVerse is a modern, full-featured blogging web application built using **React**, **Vite**, and **Appwrite**. It supports authentication, file uploads, post creation, editing, rich text content, and form validations — all handled with best practices and developer-friendly tooling.

---

## 🔧 Tech Stack

- ⚛️ **React** (UI)
- ⚡ **Vite** (Bundler)
- ☁️ **Appwrite** (Authentication, Database, File Storage)
- 🪝 **React Hook Form** (Form state and validation)
- 📝 **TinyMCE** (Rich Text Editor)
- 📦 **Redux** (Global state management)

---

## 🔁 Project Flow

1. Appwrite Configuration
2. Store & Redux Setup
3. UI Component Creation (focus on design system)
4. Form Integrations, Authentication, and CRUD
5. Page Routing and Protection

---

## 🌐 Environment Setup

Follow these instructions to set up and run the project locally.

---

# 📁 1. Clone the Repository

git clone https://github.com/devabhio88/Blogging_website.git
cd Blogging_website

--- 

**📦 2. Install Dependencies**
npm install

--- 

###🔐 3. Configure Environment Variables
Create a .env file in the root directory and add the following:

---

VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id

---

⚠️ Important:

Do not commit the .env file — make sure it's in .gitignore.

Create a .env.sample file (with placeholder values) for others to reference.

---

###▶️ 4. Start the Development Server
npm run dev
Once started, open your browser and go to:
http://localhost:5173

---

###🏗️ 5. Build for Production
npm run build
The build output will be located in the dist/ folder.

---

###🧪 6. Preview Production Build Locally
npm run preview
