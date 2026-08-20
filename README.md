# IT Asset Management System
### Software Engineering 1 — Module 7: Design and Implementation

**Student:** Aaron Jacob Capulong  
**Section:** BSCS - 3A  
**Repository:** [capulong-module7-vue-system](https://github.com/AspiringDeveloperCapu/capulong-module7-vue-system)

---

## 📋 System Description

The **IT Asset Management System** is a frontend prototype built as part of Module 7. It implements the **Equipment** entity selected from the Module 6 architectural design — an IT Asset Management System that tracks hardware and software assets across an organization.

This prototype allows users to add, view, edit, delete, and search IT asset records directly in the browser using `localStorage` for data persistence — no backend or database required.

---

## ✅ Implemented Features

- **Add Asset** — Create a new asset record using a validated form
- **View Assets** — Display all records in a responsive table/card layout
- **Edit Asset** — Load an existing record into the form, update, and save
- **Delete Asset** — Remove a record after confirmation prompt
- **Search/Filter** — Filter records by asset name or code in real time
- **Validation** — Prevents form submission when required fields are empty
- **Persistence** — Records are saved to `localStorage` and survive page refresh
- **Stats Dashboard** — Summary cards showing Total, Available, Assigned, and Maintenance counts
- **Responsive Design** — Works on desktop and smaller screen widths

---

## 🛠 Technologies Used

| Technology | Purpose |
|---|---|
| Vue.js 3 + Vite | Frontend framework and build tooling |
| Tailwind CSS v4 | Utility-first responsive styling |
| JavaScript (ES6+) | Application and CRUD logic |
| localStorage | Browser-based data persistence |
| Git + GitHub | Version control and repository submission |
| GitHub Actions | Continuous integration build check |

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AppHeader.vue      # Navigation bar and system title
│   │   ├── RecordForm.vue     # Asset entry and edit form
│   │   ├── RecordList.vue     # Asset table with search and actions
│   │   └── AppFooter.vue      # Footer with student name and section
│   ├── App.vue                # Root component and state management
│   ├── main.js                # Application entry point
│   └── style.css              # Global styles with Tailwind import
├── index.html
├── vite.config.js
└── package.json
.github/
└── workflows/
    └── build.yml              # GitHub Actions CI workflow
```

---

## 🚀 Installation and Run Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/AspiringDeveloperCapu/capulong-module7-vue-system.git
cd capulong-module7-vue-system

# 2. Install frontend dependencies
cd frontend
npm install

# 3. Start the development server
npm run dev
```

Open your browser and go to: **http://localhost:3000**

---

## 💾 localStorage Explanation

This prototype uses the browser's built-in `localStorage` API to persist data without a backend server. When a record is added, edited, or deleted, the updated list is serialized as JSON and saved under the key `module7-records`. When the page loads, `onMounted()` reads from `localStorage` and restores all previously saved records automatically.

```js
// Save records
localStorage.setItem('module7-records', JSON.stringify(records.value))

// Load records on mount
onMounted(() => {
  const saved = localStorage.getItem('module7-records')
  records.value = saved ? JSON.parse(saved) : []
})
```

---

## 🔗 Connection Between Module 6 and Module 7

| Module 6 Element | Module 7 Implementation |
|---|---|
| Proposed complete system | Basis and long-term blueprint |
| Presentation layer | Vue components and Tailwind CSS interface |
| Equipment entity (Asset System) | Selected functional prototype |
| User interactions | Forms, buttons, record list, and search |
| Application logic | JavaScript CRUD and validation functions |
| Data layer | Simulated using browser localStorage |
| Backend / API / Database | Future implementation — not required for Module 7 |

---

## ⚠️ Known Limitations

- Data is stored only in the browser — clearing browser data will erase all records
- No authentication or user role management
- No backend API integration (planned for future modules)
- Search is limited to asset name field only

## 🔮 Proposed Future Improvements

- Connect to the Express REST API backend (already designed in Module 6)
- Add MongoDB Atlas database integration for persistent cloud storage
- Implement user authentication and role-based access control
- Add data export to CSV/PDF
- Deploy to a cloud hosting platform (e.g., Vercel, Render)

---

## 📸 Screenshots

### IT Asset Management Dashboard
![IT Asset Management Dashboard](docs/screenshots/asset-dashboard.png)

### Register New Asset
![Register New Asset](docs/screenshots/register-new-asset.png)

### Edit Asset Record
![Edit Asset Record](docs/screenshots/edit-asset-record.png)

### Asset Update Confirmation
![Asset Update Confirmation](docs/screenshots/asset-update-confirmation.png)

### Delete Asset Confirmation
![Delete Asset Confirmation](docs/screenshots/delete-asset-confirmation.png)

### Search Asset Records
![Search Asset Records](docs/screenshots/search-asset-records.png)

### Responsive Mobile Asset View
![Responsive Mobile Asset View](docs/screenshots/responsive-mobile-view.png)

### localStorage Data Persistence
![localStorage Data Persistence](docs/screenshots/localstorage-persistence.png)

### GitHub Repository
![GitHub Repository](docs/screenshots/github-repository.png)

### Git Commit History
![Git Commit History](docs/screenshots/git-commit-history.png)

### GitHub Actions Build Check
![GitHub Actions Build Check](docs/screenshots/github-actions-build.png)


---

## 📄 License

This project is created for academic purposes — Software Engineering 1, Module 7.
