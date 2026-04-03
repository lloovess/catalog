import React, { useState, useEffect } from 'react';
import { Platform } from '../types';
import { X } from 'lucide-react';

interface PlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (platform: any) => void;
  platform?: Platform | null;
}

export function PlatformModal({ isOpen, onClose, onSave, platform }: PlatformModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    imageUrl: '',
    features: '',
    courseCategories: ''
  });

  useEffect(() => {
    if (platform) {
      setFormData({
        title: platform.title,
        description: platform.description,
        url: platform.url,
        imageUrl: platform.imageUrl,
        features: platform.features.join(', '),
        courseCategories: platform.courseCategories?.join(', ') || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        url: '',
        imageUrl: '',
        features: '',
        courseCategories: ''
      });
    }
  }, [platform, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(platform ? { id: platform.id } : {}),
      title: formData.title,
      description: formData.description,
      url: formData.url,
      imageUrl: formData.imageUrl,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
      courseCategories: formData.courseCategories.split(',').map(f => f.trim()).filter(f => f)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-serif font-semibold text-intellect-dark">
            {platform ? 'Редактировать платформу' : 'Новая платформа'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form id="platform-form" onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Название платформы</label>
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-intellect-gold focus:border-intellect-gold outline-none transition-all"
                placeholder="Например: Intellect Core"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
              <textarea 
                required
                rows={3}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-intellect-gold focus:border-intellect-gold outline-none transition-all resize-none"
                placeholder="Краткое описание платформы..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ссылка (URL)</label>
                <input 
                  required
                  type="url" 
                  value={formData.url}
                  onChange={e => setFormData({...formData, url: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-intellect-gold focus:border-intellect-gold outline-none transition-all"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Изображения</label>
                <input 
                  required
                  type="url" 
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-intellect-gold focus:border-intellect-gold outline-none transition-all"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ключевые особенности (через запятую)</label>
              <input 
                type="text" 
                value={formData.features}
                onChange={e => setFormData({...formData, features: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-intellect-gold focus:border-intellect-gold outline-none transition-all"
                placeholder="Видеоуроки, Тестирование, Чат..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Категории курсов (через запятую)</label>
              <input 
                type="text" 
                value={formData.courseCategories}
                onChange={e => setFormData({...formData, courseCategories: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-intellect-gold focus:border-intellect-gold outline-none transition-all"
                placeholder="Программирование, Дизайн..."
              />
            </div>
          </form>
        </div>
        
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Отмена
          </button>
          <button 
            type="submit"
            form="platform-form"
            className="px-6 py-2.5 rounded-lg font-medium bg-intellect-gold text-white hover:bg-intellect-gold-hover transition-colors shadow-lg shadow-intellect-gold/20"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
