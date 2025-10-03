import React, { useState } from 'react';
import { Modal } from './Modal';

type ItemType = 'uma' | 'support-card' | 'skill' | 'factor' | 'trained-uma';

interface FormData {
  name?: string;
  rarity?: number;
  imgUrl?: string;
  type?: string;
  icon?: string;
  description?: string;
  stars?: number;
  level?: number;
  stats?: {
    speed: number;
    stamina: number;
    power: number;
    guts: number;
    intellect: number;
  };
  rank?: string;
}

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ItemType;
  onAdd: (item: FormData & { id: number }) => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, type, onAdd }) => {
  const [formData, setFormData] = useState<FormData>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(), // Simple ID generation
      ...formData
    };
    onAdd(newItem);
    setFormData({});
    onClose();
  };

  const renderForm = () => {
    switch (type) {
      case 'uma':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Uma Musume</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Contoh: Special Week"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="rarity-select">Rarity (★)</label>
              <select
                id="rarity-select"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.rarity || 1}
                onChange={(e) => setFormData({...formData, rarity: parseInt(e.target.value)})}
              >
                <option value={1}>★</option>
                <option value={2}>★★</option>
                <option value={3}>★★★</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.imgUrl || ''}
                onChange={(e) => setFormData({...formData, imgUrl: e.target.value})}
                placeholder="https://..."
              />
            </div>
          </>
        );
      case 'support-card':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Support Card</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Contoh: Kitasan Black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                aria-label="Support card type"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.type || 'Speed'}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="Speed">Speed</option>
                <option value="Stamina">Stamina</option>
                <option value="Power">Power</option>
                <option value="Guts">Guts</option>
                <option value="Intellect">Intellect</option>
                <option value="Friend">Friend</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.imgUrl || ''}
                onChange={(e) => setFormData({...formData, imgUrl: e.target.value})}
                placeholder="https://..."
              />
            </div>
          </>
        );
      case 'skill':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Skill</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Contoh: Arc Maestro"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="icon-select">Icon Type</label>
              <select
                id="icon-select"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.icon || 'speed'}
                onChange={(e) => setFormData({...formData, icon: e.target.value})}
              >
                <option value="speed">Speed</option>
                <option value="stamina">Stamina</option>
                <option value="power">Power</option>
                <option value="guts">Guts</option>
                <option value="intellect">Intellect</option>
                <option value="unique">Unique</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Deskripsi skill..."
              />
            </div>
          </>
        );
      case 'factor':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Factor</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Contoh: URA Scenario"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="stars-select">Stars</label>
              <select
                id="stars-select"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.stars || 1}
                onChange={(e) => setFormData({...formData, stars: parseInt(e.target.value)})}
              >
                <option value={1}>★</option>
                <option value={2}>★★</option>
                <option value={3}>★★★</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                aria-label="Factor type"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.type || 'Speed'}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="Speed">Speed</option>
                <option value="Power">Power</option>
                <option value="Turf">Turf</option>
                <option value="URA">URA</option>
              </select>
            </div>
          </>
        );
      case 'trained-uma':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Uma Musume</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Contoh: Special Week"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="rarity-select">Rarity (★)</label>
              <select
                id="rarity-select"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.rarity || 1}
                onChange={(e) => setFormData({...formData, rarity: parseInt(e.target.value)})}
              >
                <option value={1}>★</option>
                <option value={2}>★★</option>
                <option value={3}>★★★</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <input
                type="number"
                min="1"
                max="100"
                aria-label="Uma level"
                placeholder="Enter level (1-100)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.level || 1}
                onChange={(e) => setFormData({...formData, level: parseInt(e.target.value)})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Stats</label>
              <div className="grid grid-cols-2 gap-2">
                {['speed', 'stamina', 'power', 'guts', 'intellect'].map(stat => (
                  <div key={stat}>
                    <label className="block text-xs text-gray-600 mb-1 capitalize">{stat}</label>
                    <input
                      type="number"
                      min="0"
                      max="1600"
                      aria-label={`${stat} stat value`}
                      placeholder="0-1600"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={formData.stats?.[stat as keyof typeof formData.stats] || 0}
                      onChange={(e) => setFormData({
                        ...formData,
                        stats: {
                          speed: 0,
                          stamina: 0,
                          power: 0,
                          guts: 0,
                          intellect: 0,
                          ...formData.stats,
                          [stat]: parseInt(e.target.value) || 0
                        }
                      })}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rank</label>
              <select
                aria-label="Trained Uma rank"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.rank || 'D'}
                onChange={(e) => setFormData({...formData, rank: e.target.value})}
              >
                <option value="G">G</option>
                <option value="F">F</option>
                <option value="E">E</option>
                <option value="D">D</option>
                <option value="C">C</option>
                <option value="B">B</option>
                <option value="A">A</option>
                <option value="S">S</option>
                <option value="SS">SS</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.imgUrl || ''}
                onChange={(e) => setFormData({...formData, imgUrl: e.target.value})}
                placeholder="https://..."
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'uma': return '➕ Add New Uma Musume';
      case 'support-card': return '➕ Add New Support Card';
      case 'skill': return '➕ Add New Skill';
      case 'factor': return '➕ Add New Factor';
      case 'trained-uma': return '➕ Add New Trained Uma';
      default: return 'Add New Item';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getTitle()}>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {renderForm()}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Item
          </button>
        </div>
      </form>
    </Modal>
  );
};