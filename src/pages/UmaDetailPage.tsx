// src/pages/UmaDetailPage.tsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { getUmaById, getUmaSkills, getSkillById, type Skill } from '../data';

// Helper function removed - using Tailwind aptitude classes instead

// Component untuk menampilkan aptitude dengan visual yang menarik
const AptitudeDisplay = ({ label, rating }: { label: string; rating: string }) => (
  <div className="flex items-center mb-2 p-2 bg-gray-50 rounded-lg">
    <span className="w-32 font-bold text-sm">
      {label}
    </span>
    <span className={`inline-block py-1 px-3 rounded-full font-bold text-lg min-w-[40px] text-center text-white aptitude-${rating.toLowerCase()}-bg`}>
      {rating}
    </span>
  </div>
);

// Component untuk menampilkan skill
const SkillDisplay = ({ skill, category }: { skill: Skill; category: string }) => {
  const categoryColors: Record<string, string> = {
    'unique': 'bg-red-500',
    'initial': 'bg-teal-500', 
    'awakening_lv2': 'bg-blue-500',
    'awakening_lv3': 'bg-green-500',
    'awakening_lv4': 'bg-yellow-500',
    'awakening_lv5': 'bg-pink-500'
  };

  const categoryLabels: Record<string, string> = {
    'unique': '固有スキル',
    'initial': '初期スキル',
    'awakening_lv2': '覚醒Lv2',
    'awakening_lv3': '覚醒Lv3', 
    'awakening_lv4': '覚醒Lv4',
    'awakening_lv5': '覚醒Lv5'
  };

  const rarityColors: Record<string, string> = {
    'Unique': 'bg-red-500',
    'Rare': 'bg-yellow-500',
    'Normal': 'bg-gray-500'
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
      <div className="flex justify-between items-start mb-2">
        <h4 className="m-0 text-gray-800 font-semibold">{skill.skill_name}</h4>
        <div className="flex gap-2">
          <span className={`px-2 py-1 text-white rounded-xl text-xs font-bold ${
            categoryColors[category] || 'bg-gray-500'
          }`}>
            {categoryLabels[category] || category}
          </span>
          <span className={`px-2 py-1 text-white rounded-xl text-xs ${
            rarityColors[skill.skill_rarity] || 'bg-gray-500'
          }`}>
            {skill.skill_rarity}
          </span>
        </div>
      </div>
      <p 
        className="mt-2 mb-0 text-gray-600 leading-relaxed text-sm"
        dangerouslySetInnerHTML={{ __html: skill.skill_effect }}
      />
      <div className="mt-2 text-xs text-gray-500">
        Type: {skill.skill_type}
      </div>
    </div>
  );
};

export const UmaDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'stats'>('overview');
  
  const uma = getUmaById(Number(id));
  
  if (!uma) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container py-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Uma not found</h2>
          <Link to="/uma" className="text-blue-500 hover:text-blue-600 no-underline">
            ← Back to Uma List
          </Link>
        </main>
      </div>
    );
  }

  const umaSkills = getUmaSkills(uma.id);
  const skillsWithDetails = umaSkills.map(us => ({
    ...us,
    skill: getSkillById(us.skill_id)!
  })).filter(item => item.skill);

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: '📊' },
    { id: 'skills' as const, label: 'Skills', icon: '⚡' },
    { id: 'stats' as const, label: 'Stats', icon: '📈' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container py-6 sm:py-8 max-w-6xl">
        {/* Navigation */}
        <div className="mb-6 sm:mb-8">
          <Link to="/uma" className="text-blue-500 hover:text-blue-600 transition-colors no-underline text-sm sm:text-base">
            ← Back to Uma List
          </Link>
        </div>

        {/* Header Section */}
        <section className="card p-6 sm:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            <div className="flex-shrink-0 mx-auto lg:mx-0">
              <img 
                src={uma.imageUrl || 'https://via.placeholder.com/200x300'} 
                alt={uma.name}
                className="w-48 h-72 sm:w-52 sm:h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
                {uma.name}
              </h1>
              
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-lg font-medium">
                  ⭐ {uma.star_initial} Star
                </span>
              </div>
              
              {uma.description && (
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
                  {uma.description}
                </p>
              )}
              
              {/* Quick Stats Preview */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Speed</div>
                  <div className={`text-xl sm:text-2xl font-bold aptitude-${uma.speed_aptitude.toLowerCase()}`}>
                    {uma.speed_aptitude}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Stamina</div>
                  <div className={`text-xl sm:text-2xl font-bold aptitude-${uma.stamina_aptitude.toLowerCase()}`}>
                    {uma.stamina_aptitude}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Power</div>
                  <div className={`text-xl sm:text-2xl font-bold aptitude-${uma.power_aptitude.toLowerCase()}`}>
                    {uma.power_aptitude}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Guts</div>
                  <div className={`text-xl sm:text-2xl font-bold aptitude-${uma.guts_aptitude.toLowerCase()}`}>
                    {uma.guts_aptitude}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Wit</div>
                  <div className={`text-xl sm:text-2xl font-bold aptitude-${uma.wit_aptitude.toLowerCase()}`}>
                    {uma.wit_aptitude}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex bg-white rounded-t-lg shadow-md">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 px-4 py-4 sm:px-8 font-bold text-base transition-all duration-200
                ${
                  activeTab === tab.id 
                    ? 'bg-blue-500 text-white rounded-t-lg' 
                    : 'bg-transparent text-gray-600 hover:text-gray-800'
                }
              `}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <section className="bg-white rounded-b-lg p-8 shadow-lg">
          {activeTab === 'overview' && (
            <div>
              <h3 className="mb-6 text-gray-800 text-xl font-bold">Aptitudes Overview</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                <div>
                  <h4 className="mb-4 text-blue-500 text-lg font-semibold">Base Stats</h4>
                  <AptitudeDisplay label="Speed (スピード)" rating={uma.speed_aptitude} />
                  <AptitudeDisplay label="Stamina (スタミナ)" rating={uma.stamina_aptitude} />
                  <AptitudeDisplay label="Power (パワー)" rating={uma.power_aptitude} />
                  <AptitudeDisplay label="Guts (根性)" rating={uma.guts_aptitude} />
                  <AptitudeDisplay label="Wit (賢さ)" rating={uma.wit_aptitude} />
                </div>
                
                <div>
                  <h4 className="mb-4 text-blue-500 text-lg font-semibold">Surface</h4>
                  <AptitudeDisplay label="Turf (芝)" rating={uma.turf_aptitude} />
                  <AptitudeDisplay label="Dirt (ダート)" rating={uma.dirt_aptitude} />
                  
                  <h4 className="mt-6 mb-4 text-blue-500 text-lg font-semibold">Distance</h4>
                  <AptitudeDisplay label="Sprint (短距離)" rating={uma.sprint_aptitude} />
                  <AptitudeDisplay label="Mile (マイル)" rating={uma.mile_aptitude} />
                  <AptitudeDisplay label="Medium (中距離)" rating={uma.medium_aptitude} />
                  <AptitudeDisplay label="Long (長距離)" rating={uma.long_aptitude} />
                </div>
                
                <div>
                  <h4 className="mb-4 text-blue-500 text-lg font-semibold">Strategy</h4>
                  <AptitudeDisplay label="Runner (逃げ)" rating={uma.runner_aptitude} />
                  <AptitudeDisplay label="Leader (先行)" rating={uma.leader_aptitude} />
                  <AptitudeDisplay label="Betweener (差し)" rating={uma.betweener_aptitude} />
                  <AptitudeDisplay label="Chaser (追込)" rating={uma.chaser_aptitude} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <h3 className="mb-6 text-gray-800 text-xl font-bold">
                Skills ({skillsWithDetails.length})
              </h3>
              
              {skillsWithDetails.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {skillsWithDetails.map(item => (
                    <SkillDisplay 
                      key={`${item.uma_id}-${item.skill_id}-${item.skill_category}`}
                      skill={item.skill} 
                      category={item.skill_category} 
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No skills data available
                </p>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div>
              <h3 className="mb-6 text-gray-800 text-xl font-bold">Detailed Statistics</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-blue-500 mb-4 text-lg font-semibold">Best Distances</h4>
                  {[
                    { label: 'Sprint', rating: uma.sprint_aptitude },
                    { label: 'Mile', rating: uma.mile_aptitude },
                    { label: 'Medium', rating: uma.medium_aptitude },
                    { label: 'Long', rating: uma.long_aptitude }
                  ]
                    .sort((a, b) => a.rating.localeCompare(b.rating))
                    .slice(0, 2)
                    .map(item => (
                      <div key={item.label} className="mb-2">
                        <span className="font-bold">{item.label}</span>: 
                        <span className={`ml-2 aptitude-${item.rating.toLowerCase()} font-bold`}>
                          {item.rating}
                        </span>
                      </div>
                    ))}
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-blue-500 mb-4 text-lg font-semibold">Best Strategies</h4>
                  {[
                    { label: 'Runner', rating: uma.runner_aptitude },
                    { label: 'Leader', rating: uma.leader_aptitude },
                    { label: 'Betweener', rating: uma.betweener_aptitude },
                    { label: 'Chaser', rating: uma.chaser_aptitude }
                  ]
                    .sort((a, b) => a.rating.localeCompare(b.rating))
                    .slice(0, 2)
                    .map(item => (
                      <div key={item.label} className="mb-2">
                        <span className="font-bold">{item.label}</span>: 
                        <span className={`ml-2 aptitude-${item.rating.toLowerCase()} font-bold`}>
                          {item.rating}
                        </span>
                      </div>
                    ))}
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-blue-500 mb-4 text-lg font-semibold">Surface Preference</h4>
                  <div className="mb-2">
                    <span className="font-bold">Turf</span>: 
                    <span className={`ml-2 aptitude-${uma.turf_aptitude.toLowerCase()} font-bold`}>
                      {uma.turf_aptitude}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold">Dirt</span>: 
                    <span className={`ml-2 aptitude-${uma.dirt_aptitude.toLowerCase()} font-bold`}>
                      {uma.dirt_aptitude}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};