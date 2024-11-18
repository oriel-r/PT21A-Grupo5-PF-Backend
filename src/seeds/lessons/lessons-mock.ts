import { CreateLessonDto } from 'src/lessons/dto/create-lesson.dto';

export const lessonsMock: Partial<CreateLessonDto>[] = [
  // Curso de Viajeros
  {
    title: 'Introducción a los saludos en inglés',
    content:
      'Aprende los saludos básicos en inglés para presentarte durante tus viajes.',
    course: 'Curso de Viajeros',
  },
  {
    title: 'Vocabulario esencial para viajar',
    content:
      'Esta lección incluye palabras y frases importantes para desenvolverte en países de habla inglesa.',
    course: 'Curso de Viajeros',
  },
  {
    title: 'Conversaciones básicas con los locales',
    content:
      'Descubre habilidades simples para conectar con personas locales durante tus viajes.',
    course: 'Curso de Viajeros',
  },

  // Inglés para Negocios
  {
    title: 'Fundamentos de inglés profesional',
    content:
      'Aprende vocabulario clave para situaciones laborales y presentaciones de negocios.',
    course: 'Inglés para Negocios',
  },
  {
    title: 'Redacción de correos electrónicos profesionales',
    content:
      'Conoce la estructura y el lenguaje necesarios para escribir correos electrónicos formales en inglés.',
    course: 'Inglés para Negocios',
  },
  {
    title: 'Networking y conversaciones casuales',
    content:
      'Domina frases y términos esenciales para crear conexiones profesionales.',
    course: 'Inglés para Negocios',
  },

  // Italiano para Viajeros
  {
    title: 'Saludos básicos en italiano',
    content:
      'Aprende a saludar y presentarte en italiano para desenvolverte mejor en tus viajes.',
    course: 'Italiano para Viajeros',
  },
  {
    title: 'Cómo pedir comida en italiano',
    content:
      'Esta lección incluye frases comunes para ordenar comida y bebida en restaurantes italianos.',
    course: 'Italiano para Viajeros',
  },
  {
    title: 'Pidiendo y entendiendo direcciones',
    content:
      'Aprende las frases esenciales para solicitar y comprender direcciones en italiano.',
    course: 'Italiano para Viajeros',
  },

  // Conversación en Alemán
  {
    title: 'Frases básicas en alemán',
    content: 'Comienza a hablar alemán con frases y expresiones simples para el día a día.',
    course: 'Conversación en Alemán',
  },
  {
    title: 'Hablar sobre actividades diarias',
    content:
      'Aprende vocabulario útil para hablar de tus rutinas y pasatiempos en alemán.',
    course: 'Conversación en Alemán',
  },
  {
    title: 'Describiendo personas y lugares',
    content:
      'Esta lección te enseña el vocabulario necesario para describir personas y ubicaciones.',
    course: 'Conversación en Alemán',
  },

  // Francés Jurídico
  {
    title: 'Introducción al francés legal',
    content:
      'Familiarízate con términos y frases clave utilizadas en contextos legales en francés.',
    course: 'Francés Jurídico',
  },
  {
    title: 'Vocabulario de contratos en francés',
    content:
      'Aprende las palabras esenciales para hablar sobre contratos y acuerdos en francés.',
    course: 'Francés Jurídico',
  },
  {
    title: 'Terminología común en tribunales',
    content:
      'Conoce los términos más usados en procedimientos legales en francés.',
    course: 'Francés Jurídico',
  },

  // Portugués para Principiantes
  {
    title: 'Saludos básicos en portugués',
    content:
      'Descubre cómo saludar e introducirte en portugués de manera sencilla.',
    course: 'Portugués para Principiantes',
  },
  {
    title: 'Frases esenciales para el día a día',
    content:
      'Aprende expresiones útiles para desenvolverte en situaciones cotidianas en portugués.',
    course: 'Portugués para Principiantes',
  },
  {
    title: 'Hablando sobre familia y amigos',
    content:
      'Conoce las palabras y frases para describir a tus seres queridos en portugués.',
    course: 'Portugués para Principiantes',
  },

  // Conversación en Inglés
  {
    title: 'Iniciar una conversación en inglés',
    content:
      'Explora formas sencillas y efectivas para comenzar una conversación en inglés.',
    course: 'Conversación en Inglés',
  },
  {
    title: 'Hablar de tus pasatiempos',
    content:
      'Aprende vocabulario y expresiones para compartir tus intereses y hobbies.',
    course: 'Conversación en Inglés',
  },
  {
    title: 'Cómo expresar opiniones',
    content:
      'Descubre frases útiles para expresar tus ideas y puntos de vista en inglés.',
    course: 'Conversación en Inglés',
  },

  // Certificado de Italiano
  {
    title: 'Introducción al examen de certificación',
    content:
      'Conoce la estructura y las secciones del examen del Certificado Italiano.',
    course: 'Certificado de Italiano',
  },
  {
    title: 'Repaso de gramática italiana',
    content:
      'Revisa los temas gramaticales más importantes para superar el examen.',
    course: 'Certificado de Italiano',
  },
  {
    title: 'Prácticas de escucha y conversación',
    content:
      'Fortalece tus habilidades auditivas y de conversación en italiano para el examen.',
    course: 'Certificado de Italiano',
  },

  // Alemán Avanzado para Negocios
  {
    title: 'Vocabulario empresarial avanzado en alemán',
    content:
      'Aprende términos avanzados para usar en contextos laborales y profesionales en alemán.',
    course: 'Alemán Avanzado para Negocios',
  },
  {
    title: 'Redacción de cartas formales',
    content:
      'Conoce la estructura y el estilo para escribir cartas empresariales en alemán.',
    course: 'Alemán Avanzado para Negocios',
  },
  {
    title: 'Presentaciones profesionales en alemán',
    content:
      'Domina las habilidades necesarias para realizar presentaciones en entornos empresariales.',
    course: 'Alemán Avanzado para Negocios',
  },

  // Francés para Viajeros
  {
    title: 'Saludos esenciales en francés',
    content:
      'Aprende a saludar y presentarte en francés para viajar con mayor confianza.',
    course: 'Francés para Viajeros',
  },
  {
    title: 'Cómo pedir en cafeterías y restaurantes',
    content:
      'Conoce las frases necesarias para pedir comida y bebidas en francés.',
    course: 'Francés para Viajeros',
  },
  {
    title: 'Compras y negociación en francés',
    content:
      'Aprende vocabulario clave para ir de compras y negociar precios durante tus viajes.',
    course: 'Francés para Viajeros',
  },
];
