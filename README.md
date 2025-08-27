# 🚀 Google Drive Course Viewer

This is a full-stack web application that transforms a simple Google Drive folder into a structured, interactive online course platform. Users can navigate nested folders and files, view various lesson types like videos, PDFs, and code snippets, and track their progress locally.

**Check out the live demo:** [**course-viewer.itsadityajoshi.tech**](http://course-viewer.itsadityajoshi.tech)



---
## ✨ Features

* **Dynamic Course Structure**: Automatically generates a nested, collapsible course sidebar from a Google Drive folder structure.
* **Multi-Content Viewer**: Intelligently renders different file types:
    * Embedded streaming for video files.
    * Inline viewing for PDFs.
* **Client-Side Progress Tracking**:
    * Remembers the last-viewed lesson for each course.
    * Allows users to mark lessons as "complete."
    * All progress is saved in the browser's `localStorage`.
* **"My Courses" Page**: A dedicated page that lists all courses the user has previously accessed.

---
## 🛠️ Technology Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router)
* **Language**: TypeScript
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN/UI](https://ui.shadcn.com/)
* **API**: Google Drive API

---
## ⚙️ Getting Started

Follow these instructions to get a local copy up and running.

#### **Prerequisites**

* Node.js (v18.0 or later)
* A package manager (npm, yarn, pnpm, or bun)
* A Google Drive API Key. You can get one from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).

#### **Installation**

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/adityajoshi-08/course-viewer.git](https://github.com/adityajoshi-08/course-viewer.git)
    cd course-viewer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a new file named `.env.local` in the root of your project and add your Google Drive API key:
    ```env
    GOOGLE_DRIVE_API_KEY=<your-google-drive-api-key>
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---
## 📖 How to Use

To view a course, navigate to the URL `/courses/[folderID]`, replacing `[folderID]` with the ID of a public Google Drive folder.

For example, if your folder's shareable link is `https://drive.google.com/drive/folders/1At-ao1SUaSzaOXtMDXQYMvnjfn1`, the folder ID is `1At-ao1SUaSzaOXtMDXQYMvnjfn1`. You would access it at:
[http://localhost:3000/courses/1At-ao1SUaSzaOXtMDXQYMvGyOxvnjfn1](http://localhost:3000/courses/1At-ao1SUaSzaOXtMDXQYMvnjfn1)
