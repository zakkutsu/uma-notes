// src/pages/UmaDetailPage.tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { getUmaById, getUmaSkills, getSkillById, type Skill } from '../data';

// Helper function untuk warna aptitude (sama seperti di UmaCard)
const getAptitudeColor = (rating: string) => {
  const colors: Record<string, string> = {
    'S': '#ff6b6b', 'A': '#4ecdc4', 'B': '#45b7d1', 'C': '#96c93d',
    'D': '#feca57', 'E': '#ff9ff3', 'F': '#ff7675', 'G': '#ddd'
  };
  return colors[rating] || '#ddd';
};

// Component untuk menampilkan aptitude dengan visual yang menarik
const AptitudeDisplay = ({ label, rating }: { label: string; rating: string }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    marginBottom: '0.5rem',
    padding: '0.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px'
  }}>
    <span style={{ 
      width: '120px', 
      fontWeight: 'bold',
      fontSize: '0.9em'
    }}>
      {label}
    </span>
    <span style={{ 
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      backgroundColor: getAptitudeColor(rating),
      color: rating === 'G' || rating === 'F' ? '#666' : '#fff',
      borderRadius: '20px',
      fontWeight: 'bold',
      fontSize: '1.1em',
      minWidth: '40px',
      textAlign: 'center'
    }}>
      {rating}
    </span>
  </div>
);

// Component untuk menampilkan skill
const SkillDisplay = ({ skill, category }: { skill: Skill; category: string }) => {
  const categoryColors: Record<string, string> = {
    'unique': '#ff6b6b',
    'initial': '#4ecdc4', 
    'awakening_lv2': '#45b7d1',
    'awakening_lv3': '#96c93d',
    'awakening_lv4': '#feca57',
    'awakening_lv5': '#ff9ff3'
  };

  const categoryLabels: Record<string, string> = {
    'unique': '固有スキル',
    'initial': '初期スキル',
    'awakening_lv2': '覚醒Lv2',
    'awakening_lv3': '覚醒Lv3', 
    'awakening_lv4': '覚醒Lv4',
    'awakening_lv5': '覚醒Lv5'
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
      backgroundColor: '#fff'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <h4 style={{ margin: 0, color: '#333' }}>{skill.skill_name}</h4>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: categoryColors[category] || '#6c757d',
            color: '#fff',
            borderRadius: '12px',
            fontSize: '0.8em',
            fontWeight: 'bold'
          }}>
            {categoryLabels[category] || category}
          </span>
          <span style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: skill.skill_rarity === 'Unique' ? '#dc3545' : skill.skill_rarity === 'Rare' ? '#ffc107' : '#6c757d',
            color: '#fff',
            borderRadius: '12px',
            fontSize: '0.8em'
          }}>
            {skill.skill_rarity}
          </span>
        </div>
      </div>
      <p style={{ 
        margin: '0.5rem 0 0 0', 
        color: '#666',
        lineHeight: '1.4',
        fontSize: '0.9em'
      }} dangerouslySetInnerHTML={{ __html: skill.skill_effect }}>
      </p>
      <div style={{ marginTop: '0.5rem', fontSize: '0.8em', color: '#888' }}>
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
      <div>
        <Header />
        <main style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Uma not found</h2>
          <Link to="/uma" style={{ color: '#007bff', textDecoration: 'none' }}>
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
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Header />
      
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Navigation */}
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/uma" style={{ 
            color: '#007bff', 
            textDecoration: 'none',
            fontSize: '1rem'
          }}>
            ← Back to Uma List
          </Link>
        </div>

        {/* Header Section */}
        <section style={{ 
          backgroundColor: '#fff', 
          borderRadius: '12px', 
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0 }}>
              <img 
                src={uma.imageUrl || 'https://via.placeholder.com/200x300'} 
                alt={uma.name}
                style={{ 
                  width: '200px', 
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }}
              />
            </div>
            
            <div style={{ flex: 1 }}>
              <h1 style={{ 
                fontSize: '2.5rem', 
                marginBottom: '0.5rem',
                color: '#333'
              }}>
                {uma.name}
              </h1>
              
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ 
                  fontSize: '1.2rem', 
                  color: '#666',
                  backgroundColor: '#e9ecef',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px'
                }}>
                  ⭐ {uma.star_initial} Star
                </span>
              </div>
              
              {uma.description && (
                <p style={{ 
                  fontSize: '1.1rem', 
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {uma.description}
                </p>
              )}
              
              {/* Quick Stats Preview */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: '1rem',
                marginTop: '1.5rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8em', color: '#666' }}>Speed</div>
                  <div style={{ 
                    fontSize: '1.5em', 
                    fontWeight: 'bold',
                    color: getAptitudeColor(uma.speed_aptitude)
                  }}>
                    {uma.speed_aptitude}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8em', color: '#666' }}>Stamina</div>
                  <div style={{ 
                    fontSize: '1.5em', 
                    fontWeight: 'bold',
                    color: getAptitudeColor(uma.stamina_aptitude)
                  }}>
                    {uma.stamina_aptitude}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8em', color: '#666' }}>Power</div>
                  <div style={{ 
                    fontSize: '1.5em', 
                    fontWeight: 'bold',
                    color: getAptitudeColor(uma.power_aptitude)
                  }}>
                    {uma.power_aptitude}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8em', color: '#666' }}>Guts</div>
                  <div style={{ 
                    fontSize: '1.5em', 
                    fontWeight: 'bold',
                    color: getAptitudeColor(uma.guts_aptitude)
                  }}>
                    {uma.guts_aptitude}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8em', color: '#666' }}>Wit</div>
                  <div style={{ 
                    fontSize: '1.5em', 
                    fontWeight: 'bold',
                    color: getAptitudeColor(uma.wit_aptitude)
                  }}>
                    {uma.wit_aptitude}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div style={{ 
          display: 'flex', 
          backgroundColor: '#fff',
          borderRadius: '8px 8px 0 0',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '1rem 2rem',
                border: 'none',
                backgroundColor: activeTab === tab.id ? '#007bff' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#666',
                borderRadius: activeTab === tab.id ? '8px 8px 0 0' : '0',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <section style={{ 
          backgroundColor: '#fff', 
          borderRadius: '0 0 8px 8px',
          padding: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          {activeTab === 'overview' && (
            <div>
              <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>Aptitudes Overview</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div>
                  <h4 style={{ marginBottom: '1rem', color: '#007bff' }}>Base Stats</h4>
                  <AptitudeDisplay label="Speed (スピード)" rating={uma.speed_aptitude} />
                  <AptitudeDisplay label="Stamina (スタミナ)" rating={uma.stamina_aptitude} />
                  <AptitudeDisplay label="Power (パワー)" rating={uma.power_aptitude} />
                  <AptitudeDisplay label="Guts (根性)" rating={uma.guts_aptitude} />
                  <AptitudeDisplay label="Wit (賢さ)" rating={uma.wit_aptitude} />
                </div>
                
                <div>
                  <h4 style={{ marginBottom: '1rem', color: '#007bff' }}>Surface</h4>
                  <AptitudeDisplay label="Turf (芝)" rating={uma.turf_aptitude} />
                  <AptitudeDisplay label="Dirt (ダート)" rating={uma.dirt_aptitude} />
                  
                  <h4 style={{ marginTop: '1.5rem', marginBottom: '1rem', color: '#007bff' }}>Distance</h4>
                  <AptitudeDisplay label="Sprint (短距離)" rating={uma.sprint_aptitude} />
                  <AptitudeDisplay label="Mile (マイル)" rating={uma.mile_aptitude} />
                  <AptitudeDisplay label="Medium (中距離)" rating={uma.medium_aptitude} />
                  <AptitudeDisplay label="Long (長距離)" rating={uma.long_aptitude} />
                </div>
                
                <div>
                  <h4 style={{ marginBottom: '1rem', color: '#007bff' }}>Strategy</h4>
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
              <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>
                Skills ({skillsWithDetails.length})
              </h3>
              
              {skillsWithDetails.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>
                  {skillsWithDetails.map(item => (
                    <SkillDisplay 
                      key={`${item.uma_id}-${item.skill_id}-${item.skill_category}`}
                      skill={item.skill} 
                      category={item.skill_category} 
                    />
                  ))}
                </div>
              ) : (
                <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
                  No skills data available
                </p>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div>
              <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>Detailed Statistics</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                <div style={{ 
                  padding: '1.5rem', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '8px',
                  border: '1px solid #dee2e6'
                }}>
                  <h4 style={{ color: '#007bff', marginBottom: '1rem' }}>Best Distances</h4>
                  {[
                    { label: 'Sprint', rating: uma.sprint_aptitude },
                    { label: 'Mile', rating: uma.mile_aptitude },
                    { label: 'Medium', rating: uma.medium_aptitude },
                    { label: 'Long', rating: uma.long_aptitude }
                  ]
                    .sort((a, b) => a.rating.localeCompare(b.rating))
                    .slice(0, 2)
                    .map(item => (
                      <div key={item.label} style={{ marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 'bold' }}>{item.label}</span>: 
                        <span style={{ 
                          marginLeft: '0.5rem',
                          color: getAptitudeColor(item.rating),
                          fontWeight: 'bold'
                        }}>
                          {item.rating}
                        </span>
                      </div>
                    ))}
                </div>
                
                <div style={{ 
                  padding: '1.5rem', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '8px',
                  border: '1px solid #dee2e6'
                }}>
                  <h4 style={{ color: '#007bff', marginBottom: '1rem' }}>Best Strategies</h4>
                  {[
                    { label: 'Runner', rating: uma.runner_aptitude },
                    { label: 'Leader', rating: uma.leader_aptitude },
                    { label: 'Betweener', rating: uma.betweener_aptitude },
                    { label: 'Chaser', rating: uma.chaser_aptitude }
                  ]
                    .sort((a, b) => a.rating.localeCompare(b.rating))
                    .slice(0, 2)
                    .map(item => (
                      <div key={item.label} style={{ marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 'bold' }}>{item.label}</span>: 
                        <span style={{ 
                          marginLeft: '0.5rem',
                          color: getAptitudeColor(item.rating),
                          fontWeight: 'bold'
                        }}>
                          {item.rating}
                        </span>
                      </div>
                    ))}
                </div>
                
                <div style={{ 
                  padding: '1.5rem', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '8px',
                  border: '1px solid #dee2e6'
                }}>
                  <h4 style={{ color: '#007bff', marginBottom: '1rem' }}>Surface Preference</h4>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold' }}>Turf</span>: 
                    <span style={{ 
                      marginLeft: '0.5rem',
                      color: getAptitudeColor(uma.turf_aptitude),
                      fontWeight: 'bold'
                    }}>
                      {uma.turf_aptitude}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Dirt</span>: 
                    <span style={{ 
                      marginLeft: '0.5rem',
                      color: getAptitudeColor(uma.dirt_aptitude),
                      fontWeight: 'bold'
                    }}>
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