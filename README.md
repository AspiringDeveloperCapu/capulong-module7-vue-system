# IT Asset Management System - Prototype Implementation

## Student Information

* **Name:** Aaron Jacob B. Capulong
* **Course & Section:** BSCS 3A
* **Subject:** Software Engineering 1
* **Module:** Module 7 - Design and Implementation
* **Instructor:** Patrick Jason L. Torres

---

## 1. Project Overview & Selected Entity

This repository contains the prototype implementation of the **IT Asset Management System** designed in Module 6. For Module 7, the core **IT Asset / Equipment** entity was selected for full CRUD implementation and interactive prototype interface.

The system empowers IT Administrators to track hardware assets (Laptops, Desktops, Monitors, Printers, Servers), manage equipment status (Available, Assigned, Under Maintenance, Retired), assign devices to employees, and monitor total inventory valuation.

---

## 2. Technologies Used

* **Frontend Framework:** Vue 3 (Composition API `<script setup>`) + Vite
* **Styling:** Tailwind CSS (v4) + Custom Glassmorphic Dark Design System
* **Icons:** Lucide Icons (`lucide-vue-next`)
* **State & Persistence:** Browser `localStorage` (Offline Prototype Mode) + Express REST API (Full-Stack Mode)
* **Backend API:** Node.js + Express.js
* **Continuous Integration:** GitHub Actions (`.github/workflows/build.yml`)
* **Version Control:** Git & GitHub

---

## 3. Implemented Features

1. **Reusable Component Architecture**:
   - `AppHeader.vue`: Branding header, student info, storage status badge, and sample data reset button.
   - `RecordForm.vue`: Modal form for adding and updating asset records with validation.
   - `RecordList.vue`: Interactive table list displaying assets, status badges, values, and action buttons.
   - `AppFooter.vue`: Footer section displaying student metadata and course details.

2. **Full CRUD Operations**:
   - **Create**: Add new assets with auto-generated serial numbers, categories, cost, and purchase dates.
   - **Read**: View equipment list and real-time dashboard metrics (Total Assets, Available, Assigned, Maintenance, Valuation).
   - **Update**: Edit existing asset attributes or quick-assign assets to employees.
   - **Delete**: Remove asset records with confirmation popups.

3. **Search & Filter**:
   - Real-time search across asset names, serial numbers, and assignee names.
   - Filter by asset category (Laptop, Monitor, Printer, Server, etc.) and operational status.

4. **Form Validation & User Feedback**:
   - Required field checks to prevent empty submissions.
   - Animated toast notifications for success/error alerts.

---

## 4. Relationship Between Module 6 and Module 7

| Module 6 (Architecture) | Module 7 (Implementation) |
|---|---|
| Proposed Three-Tier Architecture | Vue 3 Presentation Layer + Express Application Layer |
| `assets` Primary Database Collection | `IT Asset / Equipment` Functional Entity |
| System Requirements & Data Flow | Interactive CRUD Forms, Search, and Status Tracking |
| Data Layer Specification | Browser `localStorage` (`module7-records`) + Offline Fallback Engine |

---

## 5. Explanation of `localStorage` Data Persistence

The application uses browser `localStorage` under the key `module7-records` to ensure data persists even when the browser is refreshed or reopened. 
- **On Startup**: The app checks if `module7-records` exists in `localStorage`. If found, it populates the state immediately; if empty, it initializes default sample hardware assets.
- **On Create / Update / Delete**: Any modification immediately updates the reactive state and stringifies the updated array into `localStorage`.
- **Hybrid Support**: If the Node/Express backend is running on `http://localhost:5000`, the app automatically syncs changes to the API while keeping `localStorage` updated as a backup.

---

## 6. Installation & Local Run Instructions

### Prerequisites
- Node.js (v18 or higher)
- Git

### Quick Start (Full Stack)

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AspiringDeveloperCapu/capulong-module6-architecture.git
   cd capulong-module6-architecture
   ```

2. **Install Dependencies**:
   ```bash
   # Install root, backend, and frontend dependencies
   npm run install:all
   ```

3. **Start the Application**:
   ```bash
   # Starts both backend (port 5000) and Vue frontend (port 3000)
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 7. Continuous Integration (CI)

A GitHub Actions workflow is configured in `.github/workflows/build.yml`. On every push or pull request to `main`, GitHub Actions automatically:
1. Checks out the repository.
2. Installs Node.js v22 and project dependencies via `npm install`.
3. Runs `npm run build` inside `frontend/` to verify clean compilation.

---

## 8. Known Limitations & Future Improvements

- **Authentication**: User role-based authentication (Admin vs Employee) is planned for future modules.
- **Exporting**: PDF/CSV export for inventory audit reports.
- **Barcodes**: QR code / Barcode scanner integration for physical asset tags.
