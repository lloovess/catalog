import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Edit2, Trash2, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { Platform } from '../types';

interface PlatformCardProps {
  platform: Platform;
  isAdmin: boolean;
  onEdit: (p: Platform) => void;
  onDelete: (id: string) => void;
  index: number;
}

export function PlatformCard({ platform, isAdmin, onEdit, onDelete, index }: PlatformCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-intellect-dark/20 group-hover:bg-transparent transition-colors z-10"></div>
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7 }}
          src={platform.imageUrl} 
          alt={platform.title}
          className="w-full h-full object-cover"
        />
        
        {/* Admin Controls Overlay */}
        <AnimatePresence>
          {isAdmin && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-3 right-3 z-20 flex gap-2"
            >
              <button 
                onClick={() => onEdit(platform)}
                className="p-2 bg-white/90 hover:bg-white text-intellect-blue rounded-lg shadow-sm backdrop-blur-sm transition-colors"
                title="Редактировать"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={() => onDelete(platform.id)}
                className="p-2 bg-white/90 hover:bg-red-50 text-red-500 rounded-lg shadow-sm backdrop-blur-sm transition-colors"
                title="Удалить"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-intellect-dark mb-3">{platform.title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">
          {platform.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {platform.features.map((feature, i) => (
            <span key={i} className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md border border-gray-100">
              {feature}
            </span>
          ))}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-2 pb-5 space-y-4 border-t border-gray-100 mt-2">
                {platform.courseCategories && platform.courseCategories.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                      <BookOpen size={14} className="text-intellect-gold" />
                      Категории курсов
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {platform.courseCategories.map((cat, i) => (
                        <span key={i} className="text-xs text-intellect-light bg-intellect-blue/5 px-2.5 py-1 rounded-md border border-intellect-blue/10">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-gray-50">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-1.5 w-full py-2 text-sm font-medium text-intellect-light hover:text-intellect-dark transition-colors"
          >
            {isExpanded ? 'Скрыть детали' : 'Подробнее'}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </button>

          <a 
            href={platform.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-intellect-dark hover:bg-intellect-blue text-white rounded-xl font-medium transition-colors group/btn shadow-md shadow-intellect-dark/10"
          >
            <span>Перейти на платформу</span>
            <ExternalLink size={16} className="text-intellect-gold group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
