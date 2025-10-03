
````mdc

**🌐 Language / 言語 | [🇮🇩 Indonesian](#-uma-musume-notes) | [🇺🇸 English](#-uma-musume-notes-english) | [🇯🇵 日本語](#-uma-musume-notes-japanese)**

---

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

---

# 🐎 Uma Musume Notes (English)

**Uma Musume Notes** is a comprehensive online database platform dedicated to the **Uma Musume Pretty Derby** game. This application consists of a modern React frontend and REST API backend that provides a complex character, skill, support card, and inheritance system management.

## 🎯 Objectives

Building an **easily searchable and informative Uma Musume database website** with features:

- **Online Database**: Centralized storage system for all Uma Musume data
- **Collection Tracker**: Intuitive interface for tracking progress and personal collections
- **Structured API**: Scalable and easily consumable REST API
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Frontend-backend integration for current data

## 🏗️ System Architecture

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
1. User interacts with React frontend
2. Frontend sends HTTP requests to backend API
3. Backend processes requests and communicates with PostgreSQL
4. Database returns data through Sequelize ORM
5. Backend sends JSON response to frontend
6. React Query performs caching and UI updates

## 📂 Repositories

- 🎨 **Frontend**: [uma-notes](https://github.com/zakkutsu/uma-notes-fe.git) *(This Repository)*
- ⚙️ **Backend**: [uma-notes-be](https://github.com/zakkutsu/uma-notes-be.git)

## 🚀 Tech Stack

### **Frontend** (This Repository)
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7 for super fast development
- **Styling**: Tailwind CSS 4 with custom design system
- **State Management**: React Query (TanStack Query) for server state
- **Routing**: React Router DOM for navigation
- **HTTP Client**: Axios for API communication

### **Backend**
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Upload**: Multer for file handling
- **Development**: Nodemon for hot reload
- **Containerization**: Docker Compose for PostgreSQL

### **Database**
- **PostgreSQL**: Production-grade database
- **Sequelize ORM**: Advanced query capabilities with auto-migration
- **ERD Compliant**: Normalized schema without redundancy
- **Auto Seeding**: Automatic data population system for development

## ✨ Main Features

### **🗄️ Comprehensive Database**
- **5+ Uma Characters** with complete 16 aptitude types (Speed, Stamina, Power, Guts, Wit)
- **Skills Database** with rarity system (Normal/Rare/Unique) and 9 skill types
- **Support Cards** with tier system (SSR/SR/R) and various card types
- **Inheritance Factors** with color coding (Blue/Red/Green/White/Rainbow) & star ratings

### **🎨 Modern Frontend**
- **Homepage**: Database explorer with featured items and search functionality
- **Collection Tracker**: Personal collection management with statistics
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Smooth Animations**: CSS transitions and smooth hover effects

### **🔌 Powerful Backend API**
- **RESTful Endpoints**: Standard HTTP methods for all entities
- **Smart Auto Seeder**: Duplicate prevention with environment control
- **Image Management**: Polymorphic relations for all entities
- **Production Ready**: Robust error handling with standardized responses

## ⚙️ How to Run the Project

### **Prerequisites**
- Node.js v18+
- Docker & Docker Compose (for PostgreSQL)
- npm or yarn

### **1. Backend Setup**
```bash
# Clone backend repository
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

# Start PostgreSQL with Docker
docker-compose up -d

# Run backend
npm run dev
# Backend runs at http://localhost:3000
```

### **2. Frontend Setup**
```bash
# Clone frontend repository  
git clone https://github.com/zakkutsu/uma-notes-fe.git
cd uma-notes-fe

# Install dependencies
npm install

# Setup environment (.env)
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_TITLE=Uma Musume Notes

# Run frontend
npm run dev
# Frontend runs at http://localhost:5173
```

---

**Happy Coding! 🐎✨**

---

# 🐎 Uma Musume Notes (Japanese)

**Uma Musume Notes** は、**ウマ娘 プリティーダービー** ゲーム専用の包括的なオンラインデータベースプラットフォームです。このアプリケーションは、モダンなReactフロントエンドと、キャラクター、スキル、サポートカード、継承システムの複雑な管理を提供するREST APIバックエンドで構成されています。

## 🎯 目標

以下の機能を持つ**検索しやすく情報豊富なウマ娘データベースウェブサイト**の構築：

- **オンラインデータベース**: すべてのウマ娘データの集中ストレージシステム
- **コレクショントラッカー**: 進捗と個人コレクションを追跡する直感的なインターフェース
- **構造化API**: スケーラブルで簡単に利用できるREST API
- **レスポンシブデザイン**: デスクトップとモバイルデバイス向けに最適化
- **リアルタイム更新**: 最新データのためのフロントエンド・バックエンド統合

## 🏗️ システムアーキテクチャ

```
┌─────────────────────────┐    HTTP/REST API    ┌─────────────────────────┐    SQL Queries    ┌─────────────────────────┐
│                         │ ◄─────────────────► │                         │ ◄───────────────► │                         │
│      フロントエンド      │                     │       バックエンド       │                   │      データベース        │
│    (React + Vite)       │                     │  (Node.js + Express)    │                   │      (PostgreSQL)       │
│                         │                     │                         │                   │                         │
│  • React 19 + TypeScript│                     │  • REST API エンドポイント│                   │  • 正規化スキーマ        │
│  • Tailwind CSS         │                     │  • Sequelize ORM        │                   │  • ERD 準拠             │
│  • React Query          │                     │  • 自動シーディング       │                   │  • ジャンクションテーブル │
│  • レスポンシブデザイン   │                     │  • 画像アップロード       │                   │  • 外部キー             │
│                         │                     │                         │                   │                         │
│  ポート: 5173 (dev)      │                     │  ポート: 3000            │                   │  ポート: 5432           │
└─────────────────────────┘                     └─────────────────────────┘                   └─────────────────────────┘
```

**データフロー:**
1. ユーザーがReactフロントエンドと対話
2. フロントエンドがバックエンドAPIにHTTPリクエストを送信
3. バックエンドがリクエストを処理し、PostgreSQLと通信
4. データベースがSequelize ORMを通じてデータを返す
5. バックエンドがフロントエンドにJSONレスポンスを送信
6. React Queryがキャッシュとこのが交換

## 📂 リポジトリ

- 🎨 **フロントエンド**: [uma-notes](https://github.com/zakkutsu/uma-notes-fe.git) *(このリポジトリ)*
- ⚙️ **バックエンド**: [uma-notes-be](https://github.com/zakkutsu/uma-notes-be.git)

## 🚀 技術スタック

### **フロントエンド** (このリポジトリ)
- **フレームワーク**: React 19 with TypeScript
- **ビルドツール**: Vite 7 for 超高速開発
- **スタイリング**: Tailwind CSS 4 with カスタムデザインシステム
- **状態管理**: React Query (TanStack Query) for サーバー状態
- **ルーティング**: React Router DOM for ナビゲーション
- **HTTPクライアント**: Axios for API通信

### **バックエンド**
- **ランタイム**: Node.js with Express.js
- **データベース**: PostgreSQL with Sequelize ORM
- **アップロード**: Multer for ファイル処理
- **開発**: Nodemon for ホットリロード
- **コンテナ化**: Docker Compose for PostgreSQL

### **データベース**
- **PostgreSQL**: プロダクション級データベース
- **Sequelize ORM**: 自動マイグレーション付き高度クエリ機能
- **ERD準拠**: 冗長性のない正規化スキーマ
- **自動シーディング**: 開発用自動データ投入システム

## ✨ 主な機能

### **🗄️ 包括的データベース**
- **5+ウマ娘キャラクター** 16適性タイプ完全対応 (スピード、スタミナ、パワー、根性、賢さ)
- **スキルデータベース** レアリティシステム付き (ノーマル/レア/固有) と9スキルタイプ
- **サポートカード** ティアシステム (SSR/SR/R) と様々なカードタイプ
- **継承ファクター** カラーコーディング (青/赤/緑/白/虹) & 星評価

### **🎨 モダンフロントエンド**
- **ホームページ**: 注目アイテムと検索機能付きデータベースエクスプローラー
- **コレクショントラッカー**: 統計付き個人コレクション管理
- **レスポンシブデザイン**: ブレークポイント最適化によるモバイルファースト
- **スムーズアニメーション**: CSSトランジションと滑らかなホバー効果

### **🔌 強力なバックエンドAPI**
- **RESTfulエンドポイント**: すべてのエンティティに対する標準HTTPメソッド
- **スマート自動シーダー**: 環境制御による重複防止
- **画像管理**: すべてのエンティティのためのポリモーフィックリレーション
- **プロダクション対応**: 標準化レスポンスによる堅牢エラーハンドリング

## ⚙️ プロジェクトの実行方法

### **前提条件**
- Node.js v18+
- Docker & Docker Compose (PostgreSQL用)
- npm または yarn

### **1. バックエンドセットアップ**
```bash
# バックエンドリポジトリをクローン
git clone https://github.com/zakkutsu/uma-notes-be.git
cd uma-notes-be

# 依存関係をインストール
npm install

# 環境設定 (.env)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=uma_notes_db
DB_USER=your_username
DB_PASSWORD=your_password
PORT=3000
AUTO_SEED=true

# DockerでPostgreSQLを起動
docker-compose up -d

# バックエンドを実行
npm run dev
# バックエンドは http://localhost:3000 で動作
```

### **2. フロントエンドセットアップ**
```bash
# フロントエンドリポジトリをクローン
git clone https://github.com/zakkutsu/uma-notes-fe.git
cd uma-notes-fe

# 依存関係をインストール
npm install

# 環境設定 (.env)
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_TITLE=Uma Musume Notes

# フロントエンドを実行
npm run dev
# フロントエンドは http://localhost:5173 で動作
```

---

**Happy Coding! 🐎✨**

