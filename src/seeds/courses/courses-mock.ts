import { Level } from 'src/enums/level.enum';
import { Specialization } from 'src/enums/specializations.enum';

export const coursesMock = [
  {
    title: 'Travellers Course',
    language: 'Ingles',
    image:
      'https://cdn01.alison-static.net/courses/1288/alison_courseware_intro_1288.jpg',
    specialization: Specialization.TRAVEL,
    level: Level.PRE_INTERMEDIATE,
    category: 'Basic',
    createdAt: new Date('2024-11-05T00:00:00.000Z'),
  },
  {
    title: 'Business English',
    language: 'Ingles',
    image:
      'https://thinkinginenglish.blog/wp-content/uploads/2021/05/img_0258.jpg',
    specialization: Specialization.WORK,
    level: Level.ADVANCED,
    category: 'Premium',
    createdAt: new Date('2024-10-15T00:00:00.000Z'),
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
  },
  {
    title: 'Portuguese for Beginners',
    language: 'Portugues',
    image: 'https://www.learn-portuguese-now.com/images/portuguese-lessons.png',
    specialization: Specialization.GENERAL,
    level: Level.ELEMENTARY,
    category: 'Basic',
    createdAt: new Date('2024-10-22T00:00:00.000Z'),
  },
  {
    title: 'English Conversation',
    language: 'Ingles',
    image: 'https://www.bcci.edu.au/images/conversation.jpg',
    specialization: Specialization.CONVERSATIONAL,
    level: Level.ADVANCED,
    category: 'Basic',
    createdAt: new Date('2024-10-06T00:00:00.000Z'),
  },
  {
    title: 'Italian First Certificate',
    language: 'Italiano',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlo9hnZbiJlvcuNruHzhil8hF7ZzquNvBDxw&s',
    specialization: Specialization.WORK,
    level: Level.UPPER_INTERMEDIATE,
    category: 'Premium',
    createdAt: new Date('2024-11-04T00:00:00.000Z'),
  },
  {
    title: 'Advanced Business German',
    language: 'Aleman',
    image:
      'https://i.ytimg.com/vi/eD2b5jt7Qr8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA1BIALtxTYdkYN_YU7yY0xjoii9Q',
    specialization: Specialization.WORK,
    level: Level.ADVANCED,
    category: 'Premium',
    createdAt: new Date('2024-10-04T00:00:00.000Z'),
  },
  {
    title: 'French for Travellers',
    language: 'Frances',
    image:
      'https://oliversfrance.com/wp-content/uploads/2020/11/Slide-1-Updated.jpg',
    specialization: Specialization.TRAVEL,
    level: Level.PRE_INTERMEDIATE,
    category: 'Basic',
    createdAt: new Date('2024-11-06T00:00:00.000Z'),
  },
];
