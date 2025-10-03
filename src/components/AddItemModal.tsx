import React, { useState } from 'react';
import { Modal } from './Modal';

type ItemType = 'uma' | 'support-card' | 'skill' | 'factor';

interface FormData {
  name?: string;
  rarity?: number;
  imgUrl?: string;
  type?: string;
  icon?: string;
  description?: string;
  stars?: number;
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