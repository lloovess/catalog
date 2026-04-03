import { Platform } from './types';

export const defaultPlatforms: Platform[] = [
  {
    id: '1',
    title: 'Intellect Core (LMS)',
    description: 'Главная образовательная среда. Здесь хранятся все ваши курсы, домашние задания, расписание и статистика успеваемости.',
    url: 'https://lms.intellectpro.school',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    features: ['Видеоуроки', 'Тестирование', 'Аналитика прогресса'],
    courseCategories: ['Программирование', 'Дизайн', 'Маркетинг', 'Менеджмент']
  },
  {
    id: '2',
    title: 'Intellect Code',
    description: 'Интерактивная платформа для практики программирования. Пишите код прямо в браузере с автоматической проверкой решений.',
    url: 'https://code.intellectpro.school',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    features: ['Онлайн-компилятор', 'Алгоритмические задачи', 'Рейтинг студентов'],
    courseCategories: ['Frontend', 'Backend', 'Алгоритмы', 'Базы данных']
  },
  {
    id: '3',
    title: 'Intellect Live',
    description: 'Платформа для проведения интерактивных вебинаров, мастер-классов и индивидуальных онлайн-встреч с менторами.',
    url: 'https://live.intellectpro.school',
    imageUrl: 'https://images.unsplash.com/photo-1588196749597-9ff0464b83cb?q=80&w=800&auto=format&fit=crop',
    features: ['HD Трансляции', 'Интерактивный чат', 'Записи занятий'],
    courseCategories: ['Мастер-классы', 'Q&A Сессии', 'Воркшопы']
  },
  {
    id: '4',
    title: 'Intellect Library',
    description: 'Обширная электронная библиотека школы. Доступ к методичкам, книгам, статьям и дополнительным материалам.',
    url: 'https://library.intellectpro.school',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop',
    features: ['Умный поиск', 'Подборки', 'Офлайн доступ'],
    courseCategories: ['Литература', 'Статьи', 'Методички', 'Исследования']
  }
];
