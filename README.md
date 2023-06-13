# Foody-App 🍔

A simple project to learn how to use Angular and Node w/ TypeScript.
### Description
This application allows you to manage your daily food consumption. You can through different features you can manage your diet, weight, physical activity and health.

## Tech stack
### Frontend
- Angular 🅰️
- TailwindCSS + DaisyUI 🍃
- Font Awesome 🎨
- Chart.js 📊

### Backend
- Node + TypeScript 🟩
- Express 🚂
- Multer 📁
- JWT 🍪
- Bcrypt 🔒
- MySQL 🐬

### Common
- TypeScript 🟦
- pnpm 📦

## Installation 📥
### Install pnpm (if not already installed)
```bash
npm install -g pnpm
```
### Frontend
```bash
cd frontend
pnpm install
```

### Backend
```bash
cd backend
pnpm install
```

### Database
Import the database from the `foody-app.sql.zip` file into your MySQL server.
## Getting started 🏁
### Frontend
```bash
cd frontend
pnpm start
```
and go to http://localhost:4200

### Backend
```bash
cd backend
pnpm dev
```

## TODO 📇
- [x] User Authentication
- [x] Allow a user to enter a new food with (name, calorie, lipid, carbohydrate, protein)
- [x] Allow a user to fill in 4 categories for this day: breakfast, lunch, dinner and snack with a product
- [x] The product list is a common list between all users of the application
- [x] An administrator can delete a product
- [x] Allow the user to follow his consumption over a given period (free representation: graph, table, summary list, etc.)