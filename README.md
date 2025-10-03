# 🐎 Uma Musume Notes - Frontend

Frontend web application untuk **Uma Musume Notes**, sebuah database online komprehensif yang didedikasikan untuk game **Uma Musume Pretty Derby**. Aplikasi ini menyediakan interface yang user-friendly untuk menjelajahi dan mengelola koleksi Uma Musume, Support Card, Skills, dan Factors.

## 🎯 Tujuan

Membangun **frontend web application yang mudah digunakan dan responsif** dengan fitur:

- **Database Explorer**: Interface intuitif untuk menjelajahi database Uma Musume
- **Collection Tracker**: Sistem untuk melacak progres dan koleksi personal
- **Responsive Design**: Optimized untuk desktop dan mobile devices
- **Real-time Updates**: Integrasi dengan backend API untuk data terkini
- **Modern UI/UX**: Clean design dengan smooth animations dan transitions

## 📚 Dokumentasi

### **Tech Stack**
- **Framework**: React 19 dengan TypeScript
- **Build Tool**: Vite 7 untuk development yang super cepat
- **Styling**: Tailwind CSS 4 dengan custom design system
- **State Management**: React Query (TanStack Query) untuk server state
- **Routing**: React Router DOM untuk navigation
- **HTTP Client**: Axios untuk API communication
- **Code Quality**: ESLint dengan TypeScript support
- **CSS Processing**: PostCSS dengan Autoprefixer

### **Architecture Overview**
Aplikasi menggunakan **component-based architecture** dengan:
- **Pages**: Route-level components (HomePage, ProgressTrackerPage, ViewAllPage)
- **Components**: Reusable UI components (Cards, Modals, Header, SearchBar)
- **API Layer**: Centralized API calls dengan React Query hooks
- **Type Safety**: Full TypeScript coverage untuk type safety
- **Custom Hooks**: Encapsulated logic dalam reusable hooks

### **Design System**
Menggunakan **Tailwind CSS** dengan custom theme:

#### **Custom Colors**
```css
--uma-blue: #667eea       /* Primary brand color */
--uma-purple: #764ba2     /* Secondary brand color */
--uma-gold: #f59e0b       /* Accent color */
```

#### **Aptitude Colors**
- **S Rank**: `#ff6b6b` (Red)
- **A Rank**: `#4ecdc4` (Teal)  
- **B Rank**: `#45b7d1` (Blue)
- **C Rank**: `#96c93d` (Green)
- **D Rank**: `#feca57` (Yellow)
- **E Rank**: `#ff9ff3` (Pink)
- **F Rank**: `#ff7675` (Light Red)
- **G Rank**: `#ddd` (Gray)

## ✨ Fitur Utama

### **🏠 Homepage - Database Explorer**
- **Hero Section**: Eye-catching introduction dengan search functionality
- **Featured Collections**: Showcase Uma Musume, Support Cards, Skills, dan Factors
- **Database Statistics**: Live statistics dari backend API
- **Responsive Grid**: Optimized layout untuk semua screen sizes
- **Smooth Navigation**: Animated section scrolling dengan intersection observer

### **📈 Progress Tracker Page**
- **Personal Collection**: Track Uma Musume dan Support Cards yang dimiliki
- **Trained Uma Management**: Kelola Uma yang sudah dilatih dengan stats detail
- **Collection Statistics**: Visual progress tracking dengan charts
- **Add New Items**: Modal interface untuk menambah items baru
- **View All Pages**: Paginated view untuk large collections

### **🔍 View All Page**
- **Paginated Display**: Efficient handling untuk large datasets
- **Smart Pagination**: User-friendly pagination dengan page numbers
- **Add Item Modal**: Quick add functionality dari view all page
- **Back Navigation**: Seamless navigation kembali ke progress page

### **🎨 UI/UX Features**
- **Responsive Design**: Mobile-first approach dengan breakpoint optimization
- **Card Components**: Consistent card design untuk semua item types
- **Loading States**: Skeleton loading dan spinner components
- **Error Handling**: User-friendly error messages dan retry mechanisms
- **Smooth Animations**: CSS transitions dan hover effects

### **🔌 API Integration**
- **React Query**: Efficient data fetching dengan caching dan background updates
- **API Hooks**: Custom hooks untuk setiap entity (useUma, useSupportCard, dll)
- **Type Safety**: Full TypeScript integration untuk API responses
- **Error Handling**: Centralized error handling dengan user feedback
- **Environment Config**: Flexible API base URL configuration

## ⚡ Preview Singkat

### **Component Structure**
```
📁 src/
├── 📁 components/           # Reusable UI components
│   ├── 📄 Cards.tsx         # Uma, SupportCard, Skill, Factor cards
│   ├── 📄 Header.tsx        # Navigation header dengan routing
│   ├── 📄 SearchBar.tsx     # Search functionality
│   ├── 📄 Modal.tsx         # Base modal component
│   └── 📄 AddItemModal.tsx  # Add new item modal
├── 📁 pages/               # Route-level pages
│   ├── 📄 HomePage.tsx      # Database explorer homepage
│   ├── 📄 ProgressTrackerPage.tsx  # Personal collection tracker
│   └── 📄 ViewAllPage.tsx   # Paginated view all page
├── 📁 api/                 # API layer & hooks
│   ├── 📁 hooks/           # React Query hooks
│   ├── 📄 config.ts        # Axios configuration
│   └── 📄 [entity].ts      # API functions per entity
├── 📁 types/               # TypeScript type definitions
├── 📁 constants/           # App constants & sample data
├── 📁 utils/               # Utility functions
└── 📁 layout/              # Layout components
```

### **API Integration Example**
```typescript
// Custom React Query hook
const { data: umas, isLoading, error } = useUmas({
  page: 1,
  limit: 10
});

// API Response Type Safety
interface ApiResponse<T> {
  meta: {
    code: number;
    status: string;
    message: boolean;
    isPaginated: boolean;
  };
  data?: T;
  pagination?: PaginationInfo;
}
```

### **Component Example**
```tsx
// UmaCard component dengan TypeScript
interface UmaCardProps {
  id: number;
  name: string;
  rarity: number;
  imgUrl: string;
}

export const UmaCard: React.FC<UmaCardProps> = ({ 
  id, name, rarity, imgUrl 
}) => {
  return (
    <div className="card-hover-effect p-4">
      <img src={imgUrl} alt={name} className="w-full h-48 object-cover" />
      <h3 className="text-lg font-semibold mt-2">{name}</h3>
      <div className="flex items-center gap-1">
        {Array.from({ length: rarity }).map((_, i) => (
          <span key={i} className="text-yellow-400">⭐</span>
        ))}
      </div>
    </div>
  );
};
```

## 🚀 Cara Install

### **Prerequisites**
- Node.js v18+ 
- npm atau yarn
- Backend API running di port 3000

### **Installation Steps**

1. **Clone Repository**
   ```bash
   git clone https://github.com/zakkutsu/uma-notes.git
   cd uma-notes
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment**
   Buat file `.env` di root directory:
   ```env
   # API Configuration
   VITE_API_BASE_URL=http://localhost:3000/api/v1

   # App Configuration
   VITE_APP_TITLE=Uma Musume Notes
   VITE_APP_VERSION=1.0.0
   ```

4. **Run Development Server**
   ```bash
   # Development mode dengan hot reload
   npm run dev
   
   # Server akan berjalan di http://localhost:5173
   ```

5. **Build for Production**
   ```bash
   # Build optimized production bundle
   npm run build
   
   # Preview production build
   npm run preview
   ```

6. **Verify Installation**
   Buka browser dan navigasi ke `http://localhost:5173`
   
   Pastikan backend API sudah running di `http://localhost:3000`

## 🎮 Isi Web & Fungsionalitas

### **Core Features**
- ✅ **Homepage**: Database explorer dengan featured items
- ✅ **Collection Tracker**: Personal collection management
- ✅ **Responsive Design**: Mobile-first responsive layout
- ✅ **Search Functionality**: Search bar di header
- ✅ **Navigation**: Smooth scroll navigation antar sections
- ✅ **Card Components**: Consistent design untuk semua item types

### **Pages Overview**

#### **🏠 Homepage (`/`)**
```
- Hero Section dengan CTA buttons
- Featured Uma Musume section
- Featured Support Cards section  
- Featured Skills section
- Featured Factors section
- Database Statistics section
- About section
```

#### **📈 Progress Tracker (`/progress`)**
```
- Collection statistics overview
- Your Uma Musume section
- Your Support Cards section
- Trained Uma Musume section
- Add new item functionality
- View all collections
```

#### **🔍 View All Pages**
```
- Paginated item display (12 items per page)
- Smart pagination controls
- Add new item modal
- Back navigation
- Search functionality (future feature)
```

### **Component Features**
- ✅ **Header Navigation**: Responsive navigation dengan active states
- ✅ **Search Bar**: Global search functionality
- ✅ **Card Components**: UmaCard, SupportCardCard, SkillCard, FactorCard
- ✅ **Modal System**: Base modal dengan AddItemModal implementation
- ✅ **Layout System**: MainLayout dengan header props management

### **API Integration**
- ✅ **React Query Setup**: Configured dengan default options
- ✅ **API Client**: Axios instance dengan interceptors
- ✅ **Custom Hooks**: Hooks untuk setiap entity
- ✅ **Type Safety**: Full TypeScript coverage
- ✅ **Error Handling**: Centralized error management

### **Styling Features**
- ✅ **Tailwind CSS**: Modern utility-first CSS framework
- ✅ **Custom Theme**: Uma Musume brand colors dan design tokens
- ✅ **Responsive Grid**: Optimized untuk berbagai screen sizes
- ✅ **Hover Effects**: Smooth transitions dan animations
- ✅ **Loading States**: Skeleton loading dan spinners

## 🏷️ Text Tag

**Frontend**: `React` `TypeScript` `Vite` `SPA` `Component Architecture`  
**Styling**: `Tailwind CSS` `Responsive Design` `Mobile First` `Custom Theme` `CSS Grid`  
**State Management**: `React Query` `TanStack Query` `Server State` `Caching` `Background Updates`  
**API**: `Axios` `REST API` `TypeScript Integration` `Error Handling` `Environment Config`  
**DevTools**: `ESLint` `PostCSS` `Autoprefixer` `Hot Module Replacement` `TypeScript Compiler`  
**Game**: `Uma Musume` `Pretty Derby` `Character Database` `Collection Tracker` `Umamusume` `Horse Racing` `Gacha Game` `Anime` `Horse Girls`

## 📱 Demo

### **Live Application Testing**
Access the application di development server:
- **Development**: `http://localhost:5173`
- **API Endpoint**: `http://localhost:3000/api/v1`

### **Responsive Testing**
Aplikasi dioptimasi untuk:
- **Desktop**: 1024px+ (Full feature layout)
- **Tablet**: 768px-1023px (Adjusted grid dan spacing)
- **Mobile**: 320px-767px (Mobile-optimized navigation)

### **Performance Features**
```
- Vite Hot Module Replacement untuk instant updates
- React Query caching untuk reduced API calls
- Lazy loading untuk images dan components
- Code splitting untuk optimized bundle size
- Modern JavaScript features dengan polyfills
```

### **Browser Support**
- ✅ **Chrome**: Latest 2 versions
- ✅ **Firefox**: Latest 2 versions
- ✅ **Safari**: Latest 2 versions
- ✅ **Edge**: Latest 2 versions

## 🔗 Backend Repository

Repository backend untuk aplikasi Uma Notes tersedia di:
**https://github.com/zakkutsu/uma-notes-be.git**

Backend menyediakan REST API yang dikonsumsi oleh frontend ini dengan endpoints untuk Uma Musume, Support Cards, Skills, Factors, dan Trained Umas.

## 📝 Development Notes

### File Structure Detail
```
📁 uma-notes/
├── 📄 index.html            # HTML entry point
├── 📄 vite.config.ts        # Vite configuration
├── 📄 tailwind.config.js    # Tailwind CSS configuration
├── 📄 eslint.config.js      # ESLint configuration
├── 📄 postcss.config.mjs    # PostCSS configuration
├── 📄 tsconfig.json         # TypeScript configuration
├── 📁 public/              # Static assets
└── 📁 src/                 # Source code
    ├── 📄 main.tsx          # React entry point
    ├── 📄 App.tsx           # Main App component
    ├── 📄 index.css         # Global styles & Tailwind imports
    └── [subdirectories]     # Feature-organized folders
```

### Development Workflow
1. **Component Development**: Create reusable components di `src/components/`
2. **Page Development**: Add new pages di `src/pages/`
3. **API Integration**: Create API functions & hooks di `src/api/`
4. **Type Safety**: Define interfaces di `src/types/`
5. **Styling**: Use Tailwind classes dengan custom design system

### Environment Variables
Supported environment variables di `.env`:
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_TITLE=Uma Musume Notes
VITE_APP_VERSION=1.0.0
```

### Future Enhancements
- 🔄 **Firebase Authentication**: User login dan personal collections
- 🔍 **Advanced Search**: Global search dengan filters
- 📊 **Analytics**: User interaction tracking
- 🌐 **Internationalization**: Multi-language support
- 📱 **PWA**: Progressive Web App features
- 🎨 **Themes**: Dark mode support

---

**Happy Coding! 🐎✨**
```
