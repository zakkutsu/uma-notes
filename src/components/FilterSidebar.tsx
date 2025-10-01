// src/components/FilterSidebar.tsx
import type { UmaFilters, AptitudeRating } from '../data';
import '../styles/responsive.css';

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
    <div className="filter-group">
      <h4>{title}</h4>
      <div className="filter-options">
        {aptitudeRatings.map(rating => (
          <label 
            key={rating}
            className={`filter-option-label ${selectedRatings.includes(rating) ? 'active' : ''}`}
          >
            <input 
              type="checkbox"
              checked={selectedRatings.includes(rating)}
              onChange={() => handleRatingToggle(rating)}
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
    <div className="filter-group">
      <h4>Star Rating</h4>
      <div className="filter-options">
        {starOptions.map(star => (
          <label 
            key={star}
            className={`filter-option-label ${selectedStars.includes(star) ? 'active' : ''}`}
          >
            <input 
              type="checkbox"
              checked={selectedStars.includes(star)}
              onChange={() => handleStarToggle(star)}
            />
            ⭐{star}
          </label>
        ))}
      </div>
    </div>
  );
};

export const FilterSidebar = ({ filters, onFilterChange }: FilterSidebarProps) => {
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
    <aside className="sidebar filter-sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
        <button 
          onClick={clearAllFilters}
          className="btn btn-danger btn-small"
        >
          Clear All
        </button>
      </div>
      
      <StarFilterGroup 
        selectedStars={filters.star_initial || []} 
        onSelectionChange={handleStarFilterChange} 
      />
      
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
      
      <h4>Surface</h4>
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
      
      <h4>Distance</h4>
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
      
      <h4>Strategy</h4>
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
    </aside>
  );
};