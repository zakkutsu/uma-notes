
# 🐎 Uma Musume Notes

**Uma Musume Notes** adalah platform database online komprehensif yang didedikasikan untuk game **Uma Musume Pretty Derby**. Aplikasi ini terdiri dari frontend React modern dan backend REST API yang menyediakan sistem manajemen data karakter, skill, support card, dan sistem inheritance yang kompleks.

## 🎯 Tujuan

Membangun **website database Uma Musume yang mudah dicari dan informatif** dengan fitur:

- **Database Online**: Sistem penyimpanan terpusat untuk semua data Uma Musume
- **Collection Tracker**: Interface intuitif untuk melacak progres dan koleksi personal
- **API Terstruktur**: REST API yang skalabel dan mudah dikonsumsi
- **Responsive Design**: Optimized untuk desktop dan mobile devices
- **Real-time Updates**: Integrasi frontend-backend untuk data terkini

## 🏗️ Arsitektur Sistem

```
┌─────────────────────────┐    HTTP/REST API    ┌─────────────────────────┐    SQL Queries    ┌─────────────────────────┐
│                         │ ◄─────────────────► │                         │ ◄───────────────► │                         │
│       Frontend          │                     │        Backend          │                   │       Database          │
│    (React + Vite)       │                     │  (Node.js + Express)    │                   │      (PostgreSQL)       │
│                         │                     │                         │                   │                         │
│  • React 19 + TypeScript│                     │  • REST API Endpoints   │                   │  • Normalized Schema    │
│  • Tailwind CSS         │                     │  • Sequelize ORM        │                   │  • ERD Compliant        │
│  • React Query          │                     │  • Auto Seeding         │                   │  • Junction Tables      │
│  • Responsive Design    │                     │  • Image Upload         │                   │  • Foreign Keys         │
│                         │                     │                         │                   │                         │
│  Port: 5173 (dev)       │                     │  Port: 3000             │                   │  Port: 5432             │
└─────────────────────────┘                     └─────────────────────────┘                   └─────────────────────────┘
```

**Data Flow:**
1. User berinteraksi dengan React frontend
2. Frontend mengirim HTTP requests ke backend API
3. Backend memproses request dan berkomunikasi dengan PostgreSQL
4. Database mengembalikan data melalui Sequelize ORM
5. Backend mengirim JSON response ke frontend
6. React Query melakukan caching dan update UI

## 📂 Repositori

- 🎨 **Frontend**: [uma-notes](https://github.com/zakkutsu/uma-notes-fe.git) *(Repository ini)*
- ⚙️ **Backend**: [uma-notes-be](https://github.com/zakkutsu/uma-notes-be.git)

## 🚀 Tech Stack

### **Frontend** (Repository ini)
- **Framework**: React 19 dengan TypeScript
- **Build Tool**: Vite 7 untuk development yang super cepat
- **Styling**: Tailwind CSS 4 dengan custom design system
- **State Management**: React Query (TanStack Query) untuk server state
- **Routing**: React Router DOM untuk navigation
- **HTTP Client**: Axios untuk API communication

### **Backend**
- **Runtime**: Node.js dengan Express.js
- **Database**: PostgreSQL dengan Sequelize ORM
- **Upload**: Multer untuk file handling
- **Development**: Nodemon untuk hot reload
- **Containerization**: Docker Compose untuk PostgreSQL

### **Database**
- **PostgreSQL**: Database production-grade
- **Sequelize ORM**: Advanced query capabilities dengan auto-migration
- **ERD Compliant**: Normalized schema tanpa redundansi
- **Auto Seeding**: Sistem populasi data otomatis untuk development

## ✨ Fitur Utama

### **🗄️ Comprehensive Database**
- **5+ Karakter Uma** dengan 16 aptitude types lengkap (Speed, Stamina, Power, Guts, Wit)
- **Skills Database** dengan rarity system (Normal/Rare/Unique) dan 9 skill types
- **Support Cards** dengan tier system (SSR/SR/R) dan berbagai card types
- **Inheritance Factors** dengan color coding (Blue/Red/Green/White/Rainbow) & star ratings

### **🎨 Modern Frontend**
- **Homepage**: Database explorer dengan featured items dan search functionality
- **Collection Tracker**: Personal collection management dengan statistics
- **Responsive Design**: Mobile-first approach dengan breakpoint optimization
- **Smooth Animations**: CSS transitions dan hover effects yang halus

### **🔌 Powerful Backend API**
- **RESTful Endpoints**: Standard HTTP methods untuk semua entities
- **Smart Auto Seeder**: Duplicate prevention dengan environment control
- **Image Management**: Polymorphic relations untuk semua entitas
- **Production Ready**: Robust error handling dengan standardized responses

## 📱 Preview Aplikasi

### **Database Structure**
```
┌─────────────┐    ┌──────────────┐    ┌─────────────────┐
│    Umas     │◄──►│  uma_skills  │◄──►│     Skills      │
│             │    │              │    │                 │
│ - 16 aptitude    │ - skill_category   │ - skill_rarity  │
│ - base stats │    │ - uma_id     │    │ - skill_effect  │
└─────────────┘    │ - skill_id   │    └─────────────────┘
                   └──────────────┘              ▲
                                                 │
┌─────────────┐    ┌──────────────┐              │
│TrainedUmas  │◄──►│trained_uma_  │              │
│             │    │acquired_skills◄─────────────┘
│ - final_stats    └──────────────┘
│ - parent1_id │
│ - parent2_id │    ┌──────────────┐    ┌─────────────────┐
└─────────────┘◄──►│trained_uma_  │◄──►│    Factors      │
                   │  factors     │    │                 │
                   │ - star_rating│    │ - factor_type   │
                   └──────────────┘    │ - color         │
                                       └─────────────────┘
```

### **API Endpoints**
```
Base URL: http://localhost:3000/api/v1

GET    /umas              # Get all umas with pagination
GET    /umas/:id          # Get uma by ID
POST   /umas              # Create new uma (with image upload)

GET    /skills            # Get all skills with pagination  
GET    /skills/:id        # Get skill by ID

GET    /support-cards     # Get all support cards
GET    /factors           # Get all factors
GET    /trained-umas      # Get all trained umas

GET    /seed              # Database statistics
POST   /seed/run          # Manual trigger seeding
```

## ⚙️ Cara Menjalankan Project

### **Prerequisites**
- Node.js v18+
- Docker & Docker Compose (untuk PostgreSQL)
- npm atau yarn

### **1. Setup Backend**
```bash
# Clone repository backend
git clone https://github.com/zakkutsu/uma-notes-be.git
cd uma-notes-be

# Install dependencies
npm install

# Setup environment (.env)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=uma_notes_db
DB_USER=your_username
DB_PASSWORD=your_password
PORT=3000
AUTO_SEED=true

# Start PostgreSQL dengan Docker
docker-compose up -d

# Jalankan backend
npm run dev
# Backend berjalan di http://localhost:3000
```

### **2. Setup Frontend**
```bash
# Clone repository frontend  
git clone https://github.com/zakkutsu/uma-notes-fe.git
cd uma-notes-fe

# Install dependencies
npm install

# Setup environment (.env)
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_TITLE=Uma Musume Notes

# Jalankan frontend
npm run dev
# Frontend berjalan di http://localhost:5173
```

### **3. Verify Installation**
```bash
# Test backend API
curl http://localhost:3000/api/v1/seed

# Akses frontend di browser
http://localhost:5173
```

## 🎮 Fitur yang Tersedia

### **Frontend Features**
- ✅ **Homepage**: Database explorer dengan hero section dan featured collections
- ✅ **Progress Tracker**: Personal collection management dengan statistics
- ✅ **View All Pages**: Paginated display untuk large datasets
- ✅ **Responsive Design**: Mobile-first responsive layout
- ✅ **Search Functionality**: Global search dengan header integration
- ✅ **Modal System**: Add new items dengan user-friendly interface

### **Backend Features**  
- ✅ **RESTful API**: Standard HTTP methods untuk CRUD operations
- ✅ **Auto Seeding**: Smart data population dengan duplicate prevention
- ✅ **Image Upload**: Multer integration dengan organized folder structure
- ✅ **Error Handling**: Robust error management dengan standardized responses
- ✅ **Pagination**: Query parameters support (?page=1&limit=10)
- ✅ **Data Validation**: Comprehensive input validation

### **Database Features**
- ✅ **Normalized Schema**: ERD compliant dengan foreign keys
- ✅ **Junction Tables**: Proper many-to-many relationships
- ✅ **Auto Migration**: Database schema auto-sync dengan Sequelize
- ✅ **Seeding Control**: Manual dan automatic data population

## 🔧 Deployment

### **Recommended Stack**
- **Frontend**: Vercel / Netlify (Static deployment)
- **Backend**: Railway / Render / VPS dengan domain .my.id  
- **Database**: PostgreSQL cloud (Supabase / ElephantSQL / Railway)

### **Environment Variables**

**Frontend (.env)**
```env
VITE_API_BASE_URL=https://your-backend-domain.com/api/v1
VITE_APP_TITLE=Uma Musume Notes
```

**Backend (.env)**
```env
DB_HOST=your_prod_host
DB_NAME=your_prod_db
DB_USERNAME=your_prod_user
DB_PASSWORD=your_prod_password
PORT=3000
NODE_ENV=production
AUTO_SEED=false
```

## 🏷️ Tags

**Full Stack**: `React` `Node.js` `PostgreSQL` `TypeScript` `REST API` `Responsive Design`  
**Frontend**: `Vite` `Tailwind CSS` `React Query` `Component Architecture` `Mobile First`  
**Backend**: `Express.js` `Sequelize ORM` `Auto Seeding` `File Upload` `Docker`  
**Database**: `ERD Compliant` `Normalized Schema` `Junction Tables` `Foreign Keys`  
**Game**: `Uma Musume` `Pretty Derby` `Character Database` `Collection Tracker` `Horse Racing` `Gacha Game` `Anime` `Horse Girls`

## 📝 Development Notes

### **Project Structure**
```
📁 uma-notes/ (Frontend)
├── 📁 src/components/      # Reusable UI components
├── 📁 src/pages/          # Route-level pages  
├── 📁 src/api/            # API layer & React Query hooks
├── 📁 src/types/          # TypeScript definitions
└── 📁 src/constants/      # App constants

📁 node-uma-notes-be/ (Backend)  
├── 📁 controllers/        # Route handlers
├── 📁 models/            # Sequelize models
├── 📁 routes/            # API route definitions
├── 📁 services/          # Business logic layer
├── 📁 seeders/           # Database seeding
└── 📁 public/uploads/    # File upload storage
```

### **API Response Format**
```json
{
  "meta": {
    "code": 200,
    "status": "Data berhasil diambil",
    "message": true,
    "isPaginated": true
  },
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalRows": 25,
    "limit": 10
  },
  "data": { /* ... */ }
}
```

---

**Happy Coding! 🐎✨**

