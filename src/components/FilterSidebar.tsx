// src/components/FilterSidebar.tsx
import { useState } from 'react';
import type { UmaFilters, AptitudeRating } from '../data';

const aptitudeRatings: AptitudeRating[] = ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];

interface FilterSidebarProps {
  filters: UmaFilters;
  onFilterChange: (filters: UmaFilters) => void;
}

// Fungsi untuk membuat satu grup filter aptitude
const AptitudeFilterGroup = ({ 
  title, 
  selectedRatings, 
  onSelectionChange 
}: { 
  title: string;
  selectedRatings: AptitudeRating[];
  onSelectionChange: (ratings: AptitudeRating[]) => void;
}) => {
  const handleRatingToggle = (rating: AptitudeRating) => {
    const isSelected = selectedRatings.includes(rating);
    if (isSelected) {
      onSelectionChange(selectedRatings.filter(r => r !== rating));
    } else {
      onSelectionChange([...selectedRatings, rating]);
    }
  };

  return (
    <div className="mb-4">
      <h4 className="text-sm font-semibold mb-2 text-gray-700 border-b border-gray-200 pb-1">{title}</h4>
      <div className="flex flex-wrap gap-1">
        {aptitudeRatings.map(rating => (
          <label 
            key={rating}
            className={`
              inline-flex items-center cursor-pointer
              px-2 py-1 text-xs font-medium rounded
              border transition-all duration-200
              ${selectedRatings.includes(rating)
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            <input 
              type="checkbox"
              checked={selectedRatings.includes(rating)}
              onChange={() => handleRatingToggle(rating)}
              className="sr-only"
            />
            {rating}
          </label>
        ))}
      </div>
    </div>
  );
};

// Fungsi untuk membuat filter star rating
const StarFilterGroup = ({ 
  selectedStars, 
  onSelectionChange 
}: { 
  selectedStars: number[];
  onSelectionChange: (stars: number[]) => void;
}) => {
  const starOptions = [1, 2, 3];
  
  const handleStarToggle = (star: number) => {
    const isSelected = selectedStars.includes(star);
    if (isSelected) {
      onSelectionChange(selectedStars.filter(s => s !== star));
    } else {
      onSelectionChange([...selectedStars, star]);
    }
  };

  return (
    <div className="mb-4">
      <h4 className="text-sm font-semibold mb-2 text-gray-700 border-b border-gray-200 pb-1">Star Rating</h4>
      <div className="flex flex-wrap gap-1">
        {starOptions.map(star => (
          <label 
            key={star}
            className={`
              inline-flex items-center cursor-pointer
              px-3 py-1 text-xs font-medium rounded
              border transition-all duration-200
              ${selectedStars.includes(star)
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            <input 
              type="checkbox"
              checked={selectedStars.includes(star)}
              onChange={() => handleStarToggle(star)}
              className="sr-only"
            />
            ⭐{star}
          </label>
        ))}
      </div>
    </div>
  );
};

export const FilterSidebar = ({ filters, onFilterChange }: FilterSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleAptitudeFilterChange = (
    filterKey: keyof NonNullable<UmaFilters['aptitudes']>, 
    ratings: AptitudeRating[]
  ) => {
    const newAptitudes = {
      ...filters.aptitudes,
      [filterKey]: ratings.length > 0 ? ratings : undefined
    };
    
    // Hapus keys yang undefined
    Object.keys(newAptitudes).forEach(key => {
      if (newAptitudes[key as keyof typeof newAptitudes] === undefined) {
        delete newAptitudes[key as keyof typeof newAptitudes];
      }
    });
    
    onFilterChange({
      ...filters,
      aptitudes: Object.keys(newAptitudes).length > 0 ? newAptitudes : undefined
    });
  };

  const handleStarFilterChange = (stars: number[]) => {
    onFilterChange({
      ...filters,
      star_initial: stars.length > 0 ? stars : undefined
    });
  };

  const clearAllFilters = () => {
    onFilterChange({});
  };

  return (
    <aside className="w-full lg:w-72 lg:flex-shrink-0">
      <div className="bg-gray-50 rounded-xl p-4 sticky top-20">
        {/* Header dengan toggle untuk mobile */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Filters</h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={clearAllFilters}
              className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              aria-label={isCollapsed ? "Expand filters" : "Collapse filters"}
            >
              {isCollapsed ? '▼' : '▲'}
            </button>
          </div>
        </div>
        
        {/* Filter Content */}
        <div className={`${isCollapsed ? 'hidden' : 'block'} lg:block space-y-6`}>
          <StarFilterGroup 
            selectedStars={filters.star_initial || []} 
            onSelectionChange={handleStarFilterChange} 
          />
          
          {/* Stats Group */}
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-3 border-b-2 border-blue-200 pb-1">Stats</h3>
            <AptitudeFilterGroup 
              title="Speed" 
              selectedRatings={filters.aptitudes?.speed || []} 
              onSelectionChange={(ratings) => handleAptitudeFilterChange('speed', ratings)} 
            />
            <AptitudeFilterGroup 
              title="Stamina" 
              selectedRatings={filters.aptitudes?.stamina || []} 
              onSelectionChange={(ratings) => handleAptitudeFilterChange('stamina', ratings)} 
            />
            <AptitudeFilterGroup 
              title="Power" 
              selectedRatings={filters.aptitudes?.power || []} 
              onSelectionChange={(ratings) => handleAptitudeFilterChange('power', ratings)} 
            />
            <AptitudeFilterGroup 
              title="Guts" 
              selectedRatings={filters.aptitudes?.guts || []} 
              onSelectionChange={(ratings) => handleAptitudeFilterChange('guts', ratings)} 
            />
            <AptitudeFilterGroup 
              title="Wit" 
              selectedRatings={filters.aptitudes?.wit || []} 
              onSelectionChange={(ratings) => handleAptitudeFilterChange('wit', ratings)} 
            />
          </div>
          
          {/* Surface Group */}
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-3 border-b-2 border-green-200 pb-1">Surface</h3>
            <AptitudeFilterGroup 
              title="芝 (Turf)" 
              selectedRatings={filters.aptitudes?.turf || []} 
              onSelectionChange={(ratings) => handleAptitudeFilterChange('turf', ratings)} 
            />
            <AptitudeFilterGroup 
              title="ダート (Dirt)" 
              selectedRatings={filters.aptitudes?.dirt || []} 
              onSelectionChange={(ratings) => handleAptitudeFilterChange('dirt', ratings)} 
            />
          </div>
          
          {/* Distance Group */}
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-3 border-b-2 border-purple-200 pb-1">Distance</h3>
            <AptitudeFilterGroup 
              title="短距離 (Sprint)" 
              selectedRatings={filters.aptitudes?.sprint || []} 
              onSelectionChange={(ratings) => handleAptitudeFilterChange('sprint', ratings)} 
            />
            <AptitudeFilterGroup 
              title="マイル (Mile)" 
              selectedRatings={filters.aptitudes?.mile || []} 
              onSelectionChange={(ratings) => handleAptitudeFilterChange('mile', ratings)} 
            />
            <AptitudeFilterGroup 
              title="中距離 (Medium)" 
              selectedRatings={filters.aptitudes?.medium || []} 
              onSelectionChange={(ratings) => handleAptitudeFilterChange('medium', ratings)} 
            />
            <AptitudeFilterGroup 
              title="長距離 (Long)" 
              selectedRatings={filters.aptitudes?.long || []} 
              onSelectionChange={(ratings) => handleAptitudeFilterChange('long', ratings)} 
            />
          </div>
          
          {/* Strategy Group */}
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-3 border-b-2 border-orange-200 pb-1">Strategy</h3>
            <AptitudeFilterGroup 
              title="逃げ (Runner)" 
              selectedRatings={filters.aptitudes?.runner || []} 
              onSelectionChange={(ratings) => handleAptitudeFilterChange('runner', ratings)} 
            />
            <AptitudeFilterGroup 
              title="先行 (Leader)" 
              selectedRatings={filters.aptitudes?.leader || []} 
              onSelectionChange={(ratings) => handleAptitudeFilterChange('leader', ratings)} 
            />
            <AptitudeFilterGroup 
              title="差し (Betweener)" 
              selectedRatings={filters.aptitudes?.betweener || []} 
              onSelectionChange={(ratings) => handleAptitudeFilterChange('betweener', ratings)} 
            />
            <AptitudeFilterGroup 
              title="追込 (Chaser)" 
              selectedRatings={filters.aptitudes?.chaser || []} 
              onSelectionChange={(ratings) => handleAptitudeFilterChange('chaser', ratings)} 
            />
          </div>
        </div>
      </div>
    </aside>
  );
};