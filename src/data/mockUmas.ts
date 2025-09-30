// src/data/mockUmas.ts

// 1. Definisikan struktur data untuk satu karakter Uma
export interface Uma {
  id: number;
  name: string;
  rarity: string; // Kita tambahkan ini untuk keperluan UI
  imageUrl: string;
  aptitudes: {
    turf: string;
    dirt: string;
    sprint: string;
    mile: string;
    medium: string;
    long: string;
  };
}

// 2. Buat dan ekspor array yang berisi data karakter tiruan
export const mockUmasData: Uma[] = [
  {
    id: 1,
    name: "Special Week",
    rarity: "3 Star",
    imageUrl: "https://via.placeholder.com/150", // Gambar placeholder
    aptitudes: {
      turf: 'A', dirt: 'G', sprint: 'F', mile: 'A', medium: 'A', long: 'A'
    }
  },
  {
    id: 2,
    name: "Silence Suzuka",
    rarity: "3 Star",
    imageUrl: "https://via.placeholder.com/150",
    aptitudes: {
      turf: 'A', dirt: 'G', sprint: 'E', mile: 'A', medium: 'B', long: 'F'
    }
  },
  {
    id: 3,
    name: "Tokai Teio",
    rarity: "3 Star",
    imageUrl: "https://via.placeholder.com/150",
    aptitudes: {
      turf: 'A', dirt: 'G', sprint: 'D', mile: 'B', medium: 'A', long: 'A'
    }
  },
  {
    id: 4,
    name: "Oguri Cap",
    rarity: "3 Star",
    imageUrl: "https://via.placeholder.com/150",
    aptitudes: {
      turf: 'A', dirt: 'A', sprint: 'E', mile: 'A', medium: 'A', long: 'B'
    }
  }
];