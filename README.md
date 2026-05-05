# 🐾 PetLove - Find Your Perfect Companion

![PetLove Hero](https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?auto=format&fit=crop&q=80&w=1200&h=400)

[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![MUI](https://img.shields.io/badge/MUI-9.0-007FFF?logo=mui)](https://mui.com/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)](https://redux-toolkit.js.org/)
[![React Router](https://img.shields.io/badge/React_Router-7.14-CA4245?logo=reactrouter)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**PetLove** is a modern, premium web application designed to connect pet lovers with their future furry friends. Built with a focus on aesthetics and user experience, it offers a seamless platform for browsing pet notices, staying updated with animal news, and managing pet adoptions.

---

## ✨ Key Features

- 🔐 **Robust Authentication**: Secure registration and login system with persistent user sessions via Redux Toolkit.
- 🐕 **Advanced Pet Discovery**: Filterable notice board to find pets by species, gender, category, and location.
- 📰 **Dynamic News Feed**: Stay informed with the latest updates and stories from the pet world.
- 👤 **Personalized Profiles**: Manage your personal information, track favorite pets, and list your own pets for adoption.
- 🖼️ **Modern UI/UX**: Crafted with Material UI v9, featuring glassmorphism elements, premium typography (Manrope), and smooth micro-animations.
- 🚀 **Optimized Performance**: All assets are delivered in `.webp` format for lightning-fast load times.
- 🔍 **Advanced SEO**: Dynamic metadata management for every page, including Open Graph and Twitter Card support.

---

## 🛠️ Tech Stack

- **Core**: [React 19](https://reactjs.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **UI Framework**: [Material UI (MUI) v9](https://mui.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Yup](https://github.com/jquense/yup) validation
- **API Communication**: [Axios](https://axios-http.com/)
- **Typography**: [Google Fonts (Manrope)](https://fonts.google.com/specimen/Manrope)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/petlove.git
   cd petlove
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add any necessary environment variables (e.g., API Base URL).

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
src/
├── components/     # Reusable UI components (Modals, NoticeCards, SEO, etc.)
├── pages/          # Full page components (Home, Profile, Notices, etc.)
├── store/          # Redux Toolkit slices and store configuration
├── styles/         # Global CSS and theme overrides
├── assets/         # Static images and icons
└── App.jsx         # Main application entry and routing
```

---

## 🎨 Design System

PetLove follows a strict and vibrant design language:
- **Primary Color**: `#F6B83D` (Yellow/Orange)
- **Secondary Color**: `#FFF4DF` (Light Cream)
- **Typography**: Manrope (Font-weights: 400, 500, 700)
- **Border Radius**: Large rounded corners (30px to 60px) for a friendly, modern feel.

---

## 📈 SEO Strategy

Each page in the application is wrapped with a custom `<SEO />` component that dynamically updates:
- `document.title`
- `meta[name="description"]`
- `meta[property="og:title"]`
- `meta[property="og:description"]`

This ensures that social media shares are always visually appealing and search engines index the content accurately.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Developed with ❤️ for pet lovers everywhere.
