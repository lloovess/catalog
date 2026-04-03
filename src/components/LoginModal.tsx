import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Простая проверка для демонстрации (в реальном приложении здесь будет запрос к API)
    if (username === 'admin' && password === 'admin') {
      setError('');
      setUsername('');
      setPassword('');
      onLogin();
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-intellect-dark text-white">
          <div className="flex items-center gap-3">
            <Lock size={20} className="text-intellect-gold" />
            <h2 className="text-xl font-serif font-semibold">Вход для администратора</h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Логин</label>
              <input 
                required
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-intellect-gold focus:border-intellect-gold outline-none transition-all"
                placeholder="Введите логин"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-intellect-gold focus:border-intellect-gold outline-none transition-all"
                placeholder="Введите пароль"
              />
            </div>

            <button 
              type="submit"
              className="w-full mt-2 px-6 py-2.5 rounded-lg font-medium bg-intellect-gold text-white hover:bg-intellect-gold-hover transition-colors shadow-lg shadow-intellect-gold/20"
            >
              Войти
            </button>
          </form>
          <div className="mt-6 text-center text-xs text-gray-400 bg-gray-50 p-3 rounded-lg border border-gray-100">
            Для демо-доступа используйте:<br/>
            Логин: <b className="text-gray-600">admin</b> | Пароль: <b className="text-gray-600">admin</b>
          </div>
        </div>
      </div>
    </div>
  );
}
