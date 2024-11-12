import { Level } from 'src/enums/level.enum';
import { Specialization } from 'src/enums/specializations.enum';

export const coursesMock = [
  {
    title: 'Travellers Course',
    language: 'Inglés',
    image:
      'https://cdn01.alison-static.net/courses/1288/alison_courseware_intro_1288.jpg',
    specialization: Specialization.TRAVEL,
    level: Level.PRE_INTERMEDIATE,
    category: 'Basic',
    createdAt: new Date('2024-11-05T00:00:00.000Z'),
    brief_description:
      'Domina el inglés para viajar sin preocupaciones. Aprende frases clave y vocabulario práctico para explorar el mundo con confianza.',
    general_description:
      'El "Travellers Course" es la elección ideal para personas que desean aprovechar al máximo sus viajes internacionales al hablar inglés con confianza. Este curso combina lecciones interactivas, ejercicios prácticos y simulaciones reales para enseñarte cómo comunicarte en situaciones específicas como aeropuertos, transporte público, restaurantes, y hoteles. También aprenderás a hacer preguntas, expresar necesidades y manejar situaciones inesperadas, como pedir ayuda o encontrar servicios médicos. Al finalizar el curso, estarás preparado para disfrutar de tus viajes sin preocuparte por las barreras del idioma.',
  },
  {
    title: 'Business English',
    language: 'Inglés',
    image:
      'https://thinkinginenglish.blog/wp-content/uploads/2021/05/img_0258.jpg',
    specialization: Specialization.WORK,
    level: Level.ADVANCED,
    category: 'Premium',
    createdAt: new Date('2024-10-15T00:00:00.000Z'),
    brief_description:
      'Mejora tu inglés profesional y destaca en el trabajo. Aprende a negociar, redactar correos y brillar en reuniones internacionales.',
    general_description:
      'El curso "Business English" está pensado para aquellos profesionales que necesitan usar el inglés como herramienta clave en el ámbito laboral. Este programa incluye módulos para perfeccionar habilidades de comunicación escrita, como la redacción de correos formales y documentos corporativos, así como sesiones prácticas de comunicación oral para reuniones, llamadas y presentaciones. Además, te ayudará a adquirir un vocabulario específico para áreas como marketing, finanzas y recursos humanos. También aprenderás estrategias para negociar de manera efectiva y manejar diferencias culturales en un entorno globalizado. Es el curso perfecto para destacar en el mundo de los negocios internacionales.',
  },
  {
    title: 'Italian for Travellers',
    language: 'Italiano',
    image:
      'https://onlineitalianclasses.com/wp-content/uploads/2021/10/Travel-To-Italy-1.jpg',
    specialization: Specialization.TRAVEL,
    level: Level.ELEMENTARY,
    category: 'Basic',
    createdAt: new Date('2024-10-07T00:00:00.000Z'),
    brief_description:
      'Haz que tu viaje a Italia sea inolvidable. Aprende frases clave para interactuar con locales y disfrutar al máximo.',
    general_description:
      'El curso "Italian for Travellers" está diseñado para ofrecerte las herramientas lingüísticas básicas necesarias para desenvolverte con facilidad durante tus viajes a Italia. A través de lecciones enfocadas en escenarios cotidianos, como pedir comida en restaurantes, realizar compras en mercados locales o reservar alojamientos, este curso te enseñará las frases y el vocabulario más útiles. Además, incluye ejercicios prácticos para mejorar tu pronunciación y comprensión auditiva, ayudándote a interactuar con confianza en cualquier situación que surja mientras exploras la rica cultura italiana.',
  },
  {
    title: 'German Conversation',
    language: 'Aleman',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSusHXnoZeAM6NmJ9OMAS2JKX98zGvMzgzgzA&s',
    specialization: Specialization.CONVERSATIONAL,
    level: Level.ELEMENTARY,
    category: 'Basic',
    createdAt: new Date('2024-10-20T00:00:00.000Z'),
    brief_description:
      'Habla alemán desde el primer día. Aprende frases simples y practica conversaciones esenciales para la vida diaria.',
    general_description:
      'El curso "German Conversation" está diseñado para principiantes que desean empezar a hablar alemán de forma práctica y efectiva. Aprenderás cómo estructurar frases simples, formular preguntas básicas y responder de manera clara en situaciones del día a día. Además, este curso incluye actividades interactivas, como diálogos simulados y juegos de rol, para que practiques con confianza desde el principio. Ideal para aquellos que planean viajar, trabajar o interactuar con hablantes nativos de alemán.',
  },
  {
    title: 'French Legal Language',
    language: 'Frances',
    image:
      'https://cursa-json-routes.s3.amazonaws.com/texts/byId/1000492/imgs/35.jpg',
    specialization: Specialization.LEGAL,
    level: Level.PROFICIENCY,
    category: 'Premium',
    createdAt: new Date('2024-11-03T00:00:00.000Z'),
    brief_description:
      'Domina el francés jurídico. Aprende vocabulario técnico y habilidades clave para destacar en el ámbito legal internacional.',
    general_description:
      'El curso "French Legal Language" es una inmersión avanzada en el francés jurídico, ideal para abogados, traductores y estudiantes de derecho que desean destacar en su campo. Este programa aborda temas como la redacción de contratos, interpretación de leyes, preparación de documentos legales y participación en procedimientos judiciales. Además, aprenderás expresiones y términos clave para comunicarte eficazmente con clientes y colegas en el ámbito legal. Las lecciones incluyen casos prácticos y simulaciones de audiencias, asegurando que adquieras las competencias necesarias para desenvolverte con fluidez en un entorno profesional exigente.',
  },
];
