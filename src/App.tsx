import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, GraduationCap, LogIn, LogOut } from 'lucide-react';
import { usePlatforms } from './hooks/usePlatforms';
import { PlatformModal } from './components/PlatformModal';
import { PlatformCard } from './components/PlatformCard';
import { LoginModal } from './components/LoginModal';
import { Platform } from './types';

export default function App() {
  const { platforms, isLoaded, addPlatform, updatePlatform, deletePlatform } = usePlatforms();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleEdit = (platform: Platform) => {
    setEditingPlatform(platform);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingPlatform(null);
    setIsModalOpen(true);
  };

  const handleSave = (platformData: any) => {
    if (platformData.id) {
      updatePlatform(platformData as Platform);
    } else {
      addPlatform(platformData);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту платформу?')) {
      deletePlatform(id);
    }
  };

  if (!isLoaded) return null;

  const allCategories = Array.from(
    new Set(platforms.flatMap(p => p.courseCategories || []))
  ).sort();

  const filteredPlatforms = selectedCategory
    ? platforms.filter(p => p.courseCategories?.includes(selectedCategory))
    : platforms;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-intellect-dark flex items-center justify-center text-intellect-gold">
              <GraduationCap size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl leading-tight text-intellect-dark tracking-wide">INTELLECT PRO</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-intellect-light font-semibold">School</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => isAdmin ? setIsAdmin(false) : setIsLoginModalOpen(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isAdmin 
                  ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' 
                  : 'bg-intellect-blue/5 text-intellect-blue hover:bg-intellect-blue/10'
              }`}
            >
              {isAdmin ? <LogOut size={16} /> : <LogIn size={16} />}
              <span className="hidden sm:inline">{isAdmin ? 'Выйти из панели' : 'Вход для админа'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-intellect-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-intellect-dark via-intellect-dark/80 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-intellect-blue/50 border border-intellect-light/30 text-intellect-gold text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-intellect-gold animate-pulse"></span>
            Единая образовательная экосистема
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight"
          >
            Платформы <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-intellect-gold to-yellow-200">
              Intellect Pro School
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl text-lg md:text-xl text-gray-300 mb-10 font-light"
          >
            Всё необходимое для эффективного обучения в одном месте. 
            Переходите к нужной платформе и продолжайте развиваться вместе с нами.
          </motion.p>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-intellect-dark mb-2">Каталог платформ</h2>
            <p className="text-gray-500">Выберите платформу для перехода</p>
          </div>
          
          <AnimatePresence>
            {isAdmin && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={handleAddNew}
                className="flex items-center gap-2 bg-intellect-gold hover:bg-intellect-gold-hover text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-intellect-gold/20"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Добавить платформу</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {allCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-intellect-dark text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Все категории
            </button>
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-intellect-dark text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          <AnimatePresence mode="popLayout">
            {filteredPlatforms.map((platform, index) => (
              <PlatformCard 
                key={platform.id}
                platform={platform}
                isAdmin={isAdmin}
                onEdit={handleEdit}
                onDelete={handleDelete}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>
        
        {filteredPlatforms.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
              <GraduationCap size={32} />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Ничего не найдено</h3>
            <p className="text-gray-500">
              {platforms.length === 0 
                ? (isAdmin ? 'Добавьте первую платформу.' : 'Платформы пока не добавлены.')
                : 'Нет платформ в выбранной категории.'}
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-intellect-dark text-gray-400 py-12 border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-intellect-gold">
              <GraduationCap size={18} />
            </div>
            <span className="font-serif font-bold text-white tracking-wide">INTELLECT PRO</span>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Intellect Pro School. Все права защищены.
          </p>
        </div>
      </footer>

      {/* Admin Modal */}
      <PlatformModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        platform={editingPlatform}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={() => {
          setIsAdmin(true);
          setIsLoginModalOpen(false);
        }}
      />
    </div>
  );
}
