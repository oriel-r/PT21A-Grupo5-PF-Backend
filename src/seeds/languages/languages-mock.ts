import { Language } from 'src/language/entities/language.entity';
import { DeepPartial } from 'typeorm';

export const languagesMock: DeepPartial<Language[]> = [
  {
    path: 'english',
    name: 'Inglés',
    image_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGVqP2bP_-DHLAjJcXSRD6xsSY0z1xXVT2Ng&s',
    flag_url:
      'https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg',
    general_description:
      'El inglés es uno de los idiomas más influyentes y extendidos en el mundo, y su importancia abarca numerosos ámbitos, desde el académico hasta el profesional. Es el idioma más común para la comunicación internacional. En viajes, negocios y encuentros culturales, el inglés permite la interacción entre personas de diferentes países y culturas, facilitando el intercambio de ideas y la cooperación global. Entonces, el inglés es el idioma principal en tecnología e informática. Con esto podrás postular a muchas universidades y programas internacionales, muchos de los cuales se imparten en inglés, sin importar el país.',
    brief_description:
      'Domina el idioma universal. Aprende inglés y desbloquea oportunidades globales en educación, negocios y cultura. Habla el idioma que conecta al mundo y lleva tu perfil profesional al siguiente nivel.',
    country_photo_url:
      'https://i.pinimg.com/564x/bf/d4/0e/bfd40ef29056e3e1fc86edc3253e399b.jpg',
  },
  {
    path: 'italian',
    name: 'Italiano',
    image_url:
      'https://www.advantagelearningcenter.com/wp-content/uploads/2018/07/italian-language-1.jpg',
    flag_url:
      'https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg',
    general_description:
      'El italiano es una lengua rica en historia y cultura, ampliamente hablada en Italia y Suiza, así como en comunidades italianas alrededor del mundo. Aunque no es tan universal como el inglés o el español, su relevancia es notable en áreas como el arte, la moda, la música y la gastronomía, en las cuales Italia es un referente mundial. Conocer el italiano permite acceder a una vasta herencia literaria y artística, además de facilitar la comunicación en contextos internacionales, especialmente en la Unión Europea. Además, el dominio del italiano puede abrir puertas en sectores como el turismo, la investigación en historia del arte y los estudios culturales, haciendo del idioma una herramienta valiosa para quienes buscan ampliar sus oportunidades en estos ámbitos.',
    brief_description:
      'Vive la pasión del arte, la moda y la gastronomía. Aprende italiano y conéctate con el corazón de la cultura europea. Abre puertas a un mundo lleno de oportunidades en turismo, arte e historia.',
    country_photo_url:
      'https://i.pinimg.com/564x/d3/0a/3d/d30a3de079f7cb27459b6928d93d4087.jpg',
  },
  {
    path: 'french',
    name: 'Francés',
    image_url:
      'https://ih1.redbubble.net/image.4731398653.5486/raf,360x360,075,t,fafafa:ca443f4786.jpg',
    flag_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOEkldyTcvNaaBeUwX6_pI_lb8dS5SXvT9Bw&s',
    general_description:
      'El francés es una lengua de gran relevancia global, hablada en diversos continentes y siendo oficial en numerosos países, como Francia, Canadá, Suiza, Bélgica y varias naciones africanas. Es uno de los idiomas más influyentes en diplomacia, relaciones internacionales y cooperación cultural, ya que es una de las lenguas oficiales de organismos como la ONU, la Unión Europea y la UNESCO. Además de ser un idioma clave en los negocios y el turismo, el francés permite acceder a un legado cultural rico en literatura, filosofía, cine y artes. Dominar el francés abre oportunidades académicas y profesionales en países francófonos y en áreas como las ciencias sociales, la moda, el arte y la gastronomía, siendo una herramienta invaluable para quienes buscan una conexión con la cultura y la historia de estas regiones.',
    brief_description:
      'Conéctate con el idioma del romance y la diplomacia. Aprende francés para destacar en negocios, cultura y relaciones internacionales. Vive la esencia de la moda, el arte y la historia.',
    country_photo_url:
      'https://i.pinimg.com/564x/50/93/be/5093be3e848f1ba3440373ca2a9c04c0.jpg',
  },
  {
    path: 'portuguese',
    name: 'Portugués',
    image_url:
      'https://thumbs.dreamstime.com/b/vector-illustration-speech-bubbles-portuguese-language-flag-portugal-two-hand-drawn-doodle-national-written-name-109521238.jpg',
    flag_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCA7br_h6baPj_MPX0sQL0jtsbUTQ2aCANUg&s',
    general_description:
      'El portugués es uno de los idiomas más hablados en el mundo, especialmente en países de América del Sur, África y Europa, siendo el idioma oficial en Brasil, Portugal, Angola, Mozambique y varios otros países. Su importancia radica en su creciente uso en negocios, educación y cultura, especialmente en Brasil, la economía más grande de América Latina. Al igual que el inglés, el portugués facilita la comunicación en una amplia gama de ámbitos internacionales, desde el turismo hasta la diplomacia y los intercambios comerciales. Dominar el portugués abre las puertas a múltiples oportunidades académicas y profesionales en países lusófonos y permite una mayor comprensión de su rica herencia cultural y literaria.',
    brief_description:
      'Descubre el idioma que conecta continentes. Aprende portugués y accede a oportunidades en negocios, turismo y cultura en los vibrantes países lusófonos.',
    country_photo_url:
      'https://i.pinimg.com/564x/26/ca/33/26ca33021ddb71e01f817d59e59d2196.jpg',
  },
  {
    path: 'german',
    name: 'Alemán',
    image_url:
      'https://ecdn.teacherspayteachers.com/thumbitem/Words-Phrases-in-German-Speech-Bubble-Poster-Set-Flash-Cards-1115478-1652192621/original-1115478-1.jpg',
    flag_url:
      'https://cdn.britannica.com/82/65482-050-E43AB312/Flag-detail-Germany-crest.jpg',
    general_description:
      'El alemán es uno de los idiomas más importantes de Europa, siendo oficial en Alemania, Austria, Suiza, Luxemburgo y Liechtenstein, y hablado por millones de personas en todo el mundo. Como lengua de una de las economías más fuertes del mundo, el alemán es fundamental en el comercio, la ingeniería y las ciencias, especialmente en sectores como la automoción, la tecnología y la investigación. Además, Alemania es un destino académico destacado, ofreciendo numerosas oportunidades de estudio en universidades de alto nivel que enseñan en alemán. Dominar este idioma abre puertas a diversas oportunidades en el ámbito profesional y cultural, facilitando el acceso a un rico legado literario, musical y filosófico que incluye grandes figuras de la historia intelectual europea.',
    brief_description:
      'Impulsa tu carrera en la economía líder de Europa. Aprende alemán y accede a oportunidades en ingeniería, tecnología y estudios académicos de primer nivel.',
    country_photo_url:
      'https://i.pinimg.com/236x/5f/2d/f2/5f2df2028c29cf6774fbe5faa720f442.jpg',
  },
  {
    path: 'chinese',
    name: 'Chino Mandarín',
    image_url:
      'https://www.shutterstock.com/image-vector/hello-chinese-ni-hao-speech-260nw-1877186812.jpg',
    flag_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQequvUVjcEv1hl7r1Q3_XkwJ90XOOi76RvfQ&s',
    general_description:
      'El chino mandarín es el idioma más hablado del mundo, siendo la lengua oficial de China y Taiwán y uno de los idiomas oficiales de Singapur y Naciones Unidas. Como lengua principal de una de las economías más grandes y de más rápido crecimiento, el mandarín es esencial en áreas de comercio, tecnología e innovación. China es un actor clave en sectores como la manufactura, la inteligencia artificial y el comercio internacional, lo que hace del mandarín una herramienta valiosa en el ámbito profesional global. Además, aprender chino mandarín abre puertas a una cultura milenaria rica en filosofía, literatura y arte, permitiendo un acceso más profundo a las tradiciones y al pensamiento chino. Dominar este idioma brinda la oportunidad de conectarse con más de mil millones de personas y facilita el acceso a un mercado dinámico, así como a múltiples oportunidades académicas y culturales en Asia y en el mundo.',
    brief_description:
      'Conviértete en parte del futuro global. Aprende chino mandarín y abre las puertas al comercio, la tecnología y una cultura milenaria con un idioma hablado por miles de millones.',
    country_photo_url:
      'https://i.pinimg.com/564x/af/6a/ed/af6aed7a7b967ab9a22d32f815ab2b0b.jpg',
  },
];