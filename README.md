# TaskFlow — Modern Vanilla JS To-Do Web App

![TaskFlow Hero](./assets/favicons/android-chrome-512x512.png) 

A beautiful, fully responsive, zero-dependency To-Do list application built with vanilla HTML, CSS, and JavaScript. TaskFlow features a custom dark theme, a simulated authentication environment, and robust task filtering—all managed securely within your browser's local storage.

## ✨ Features

- **Core To-Do Actions**: Add, delete, and toggle tasks as complete or active.
- **Client-Side Authentication**: An interactive modal-based mock login/signup flow with user-specific session data.
- **Advanced Filtering**: Quickly switch between All, Active, and Done tasks using dynamic pills.
- **Live Search & Sort**: Search tasks instantly as you type and sort them by Newest, Oldest, or Alphabetically.
- **Multi-user Data Isolation**: Tasks are saved strictly to the logged-in user's email address in LocalStorage.
- **Responsive Dark UI**: A modern, glassmorphic dark theme optimized for both mobile screens and wide desktops.
- **"Clear Done" Utility**: A one-click button to sweep away all completed tasks in bulk.

## 🛠️ Built With

*   Semantic **HTML5** (Multi-page structure)
*   Vanilla **CSS3** (CSS Variables, Flexbox, Gradients, and Animations)
*   Vanilla **JavaScript (ES6+)** (No React, Vue, or bulky frameworks used)
*   Google Material Symbols (Icons)
*   Browser `localStorage` API (Data Persistence)

## 🚀 Getting Started

Because TaskFlow is a pure frontend application without a necessary build step, running it is incredibly simple:

### Prerequisites
You only need a modern web browser. To run it locally over HTTP, it is recommended to use a simple local server like Live Server (VS Code extension) or the `serve` NPM package.

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/S945Nepal/To-Do-Web-App.git
    cd To-Do-Web-App
    ```
2.  **Serve the files** (Example using `serve`)
    ```sh
    npx serve
    ```
3.  **Open your browser**
    Navigate to `http://localhost:3000` (or whichever port your server dictates).

## 💡 How It Works

### The Authentication Flow
Since there is no backend database attached, the authentication flow is entirely simulated to demonstrate a complete frontend application architecture:
1. When you interact with the task input box while logged out, the Auth Modal appears.
2. You can "Sign Up" by providing an email and matching passwords. Client-side validation ensures formatting is correct.
3. Upon registration, the session is saved to `localStorage` under `current_user`. 
4. The Navbar automatically updates to reflect your logged-in state ("Hi, [User]").

### Task Persistence
Every task added by a user is stringified to JSON and saved in `localStorage` with a unique key tied to their email (e.g., `tasks_user@example.com`). This ensures that if User A signs out and User B logs in, their tasks will remain completely isolated from one another.

## 📁 Project Structure 

```text
To-Do-Web-App/
├── index.html        # Main App Page
├── features.html     # Marketing / Info Pages
├── docs.html
├── contact.html
├── about.html
├── assets/           # Embedded assets and favicons
│   └── favicons/
├── css/
│   ├── style.css     # Core Design System, globals & layout
│   └── auth.css      # Filter bar, task row, and auth modal styles 
└── js/
    ├── app.js        # Core task logic (Filter, Search, Sort, CRUD)
    └── auth.js       # Auth modal rendering, validation, session management
```

## 👨‍💻 Developer

Developed and maintained by **[Suman Pokharel](https://portfolio-hazel-psi-43.vercel.app/)**
- Email: pokharelsuman142@gmail.com

---
*Feel free to star the repository if you found it useful! Contributions, issues, and feature requests are welcome!*