// src/components/FilterSidebar.tsx
import React from 'react';

// Fungsi untuk membuat satu grup filter
const FilterGroup = ({ title, options }: { title: string, options: string[] }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <h4 style={{ marginTop: 0, marginBottom: '0.5rem', borderBottom: '1px solid #ddd', paddingBottom: '0.25rem' }}>
      {title}
    </h4>
    {options.map(option => (
      <div key={option}>
        <input type="checkbox" id={option} name={option} />
        <label htmlFor={option} style={{ marginLeft: '0.5rem' }}>{option}</label>
      </div>
    ))}
  </div>
);

export const FilterSidebar = () => {
  return (
    <aside style={{ width: '200px', paddingRight: '1rem' }}>
      <h3>Filters</h3>
      <FilterGroup title="Bakat Arena" options={['Turf', 'Dirt']} />
      <FilterGroup title="Bakat Jarak" options={['Sprint', 'Mile', 'Medium', 'Long']} />
      <FilterGroup title="Bakat Strategi" options={['Runner', 'Leader', 'Betweener', 'Chaser']} />
    </aside>
  );
};