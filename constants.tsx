
import { Course } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Psicología',
    description: 'Entiende el desarrollo emocional y cognitivo desde la primera infancia hasta la pre-adolescencia.',
    instructor: 'Dra. Sugey Bedoya',
    price: 49.99,
    rating: 4.9,
    students: 1250,
    image: '/Ferrari.png',
    category: 'Infantil',
    modules: [
      {
        id: 'm1',
        title: 'Fundamentos del Desarrollo',
        lessons: [
          { id: 'l1', title: 'Introducción al desarrollo infantil', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '10:00', description: 'Bases de la psicología evolutiva.' },
          { id: 'l2', title: 'Teorías del apego', videoUrl: 'https://www.w3schools.com/html/movie.mp4', duration: '15:30', description: 'Bowlby y Ainsworth en la práctica.' }
        ]
      },
      {
        id: 'm2',
        title: 'Intervención Lúdica',
        lessons: [
          { id: 'l3', title: 'Terapia de juego', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '20:15', description: 'Herramientas prácticas para consultorio.' }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Gestión de la Ansiedad',
    description: 'Técnicas basadas en evidencia para manejar el estrés y la ansiedad en el entorno laboral y personal.',
    instructor: 'Lic. Roberto Gómez',
    price: 35.00,
    rating: 4.7,
    students: 840,
    image: '/Fit_Brain.jpg',
    category: 'Bienestar',
    modules: [
      {
        id: 'm3',
        title: 'Entendiendo la Ansiedad',
        lessons: [
          { id: 'l4', title: 'Fisiología del estrés', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '12:00', description: 'El eje HHA.' }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Mindfulness para Terapeutas',
    description: 'Aprende a aplicar la atención plena en tus sesiones terapéuticas para mejorar la alianza y el autocuidado.',
    instructor: 'Dra. Sugey Mendoza',
    price: 59.99,
    rating: 4.8,
    students: 620,
    image: '/Liderate.jpg',
    category: 'Profesional',
    modules: [
      {
        id: 'm4',
        title: 'Prácticas de Meditación',
        lessons: [
          { id: 'l5', title: 'Introducción al Mindfulness', videoUrl: 'https://www.w3schools.com/html/movie.mp4', duration: '08:45', description: 'Conceptos básicos.' }
        ]
      }
    ]
  }
];
