
import { Warrior, ModuleId, Level } from './types.ts';

export const WARRIORS: Record<ModuleId, Warrior> = {
  color: { id: 'color', name: 'ARTE', title: 'Guerrera del Color', subject: 'Pintura', color: '#ec4899', gradient: 'from-pink-400 to-rose-600', description: 'Crea obras maestras.', icon: 'fa-palette' },
  math: { id: 'math', name: 'TÉCNICA', title: 'Maestra de Números', subject: 'Matemáticas', color: '#8b5cf6', gradient: 'from-violet-400 to-purple-700', description: 'Desafíos mentales.', icon: 'fa-calculator' },
  english: { id: 'english', name: 'LENGUA', title: 'Guerrera de Idiomas', subject: 'Inglés', color: '#3b82f6', gradient: 'from-blue-400 to-indigo-700', description: 'Traduce y aprende.', icon: 'fa-language' },
  geo: { id: 'geo', name: 'GEOGRAFÍA', title: 'Exploradora', subject: 'Mapas', color: '#fbbf24', gradient: 'from-amber-300 to-yellow-600', description: 'Viaja por el mapa.', icon: 'fa-globe-americas' },
  reading: { id: 'reading', name: 'LECTORA', title: 'Cuentacuentos', subject: 'Lectura', color: '#9c27b0', gradient: 'from-fuchsia-400 to-purple-800', description: 'Historias mágicas.', icon: 'fa-book-open' },
  science: { id: 'science', name: 'NATURALEZA', title: 'Científica', subject: 'Ciencias', color: '#10b981', gradient: 'from-emerald-400 to-teal-600', description: 'Descubre la vida.', icon: 'fa-leaf' },
};

// --- CONTENIDO DE LENGUA (INGLÉS): 50 PALABRAS ---
const ENGLISH_WORDS = [
  {q: "Apple", a: "Manzana", p: "ápel", v: "fa-apple-alt"}, {q: "Dog", a: "Perro", p: "dog", v: "fa-dog"},
  {q: "Cat", a: "Gato", p: "cat", v: "fa-cat"}, {q: "Sun", a: "Sol", p: "san", v: "fa-sun"},
  {q: "Moon", a: "Luna", p: "mun", v: "fa-moon"}, {q: "Star", a: "Estrella", p: "star", v: "fa-star"},
  {q: "Book", a: "Libro", p: "buk", v: "fa-book"}, {q: "House", a: "Casa", p: "háus", v: "fa-home"},
  {q: "Tree", a: "Árbol", p: "tri", v: "fa-tree"}, {q: "Water", a: "Agua", p: "uóter", v: "fa-tint"},
  {q: "Bird", a: "Pájaro", p: "berd", v: "fa-kiwi-bird"}, {q: "Milk", a: "Leche", p: "milk", v: "fa-glass-whiskey"},
  {q: "Bread", a: "Pan", p: "bred", v: "fa-bread-slice"}, {q: "Fish", a: "Pez", p: "fish", v: "fa-fish"},
  {q: "Red", a: "Rojo", p: "red", v: "fa-circle"}, {q: "Blue", a: "Azul", p: "blu", v: "fa-circle"},
  {q: "Green", a: "Verde", p: "grin", v: "fa-circle"}, {q: "Yellow", a: "Amarillo", p: "iélou", v: "fa-circle"},
  {q: "Pink", a: "Rosa", p: "pink", v: "fa-circle"}, {q: "Orange", a: "Naranja", p: "óranch", v: "fa-circle"},
  {q: "One", a: "Uno", p: "uán", v: "fa-1"}, {q: "Two", a: "Dos", p: "tu", v: "fa-2"},
  {q: "Three", a: "Tres", p: "tri", v: "fa-3"}, {q: "Four", a: "Cuatro", p: "for", v: "fa-4"},
  {q: "Five", a: "Cinco", p: "fáiv", v: "fa-5"}, {q: "Big", a: "Grande", p: "big", v: "fa-expand"},
  {q: "Small", a: "Pequeño", p: "smól", v: "fa-compress"}, {q: "Happy", a: "Feliz", p: "hápi", v: "fa-smile"},
  {q: "Sad", a: "Triste", p: "sad", v: "fa-frown"}, {q: "Mother", a: "Madre", p: "máder", v: "fa-female"},
  {q: "Father", a: "Padre", p: "fáder", v: "fa-male"}, {q: "Sister", a: "Hermana", p: "síster", v: "fa-user"},
  {q: "Brother", a: "Hermano", p: "bráder", v: "fa-user"}, {q: "Hand", a: "Mano", p: "jand", v: "fa-hand-paper"},
  {q: "Foot", a: "Pie", p: "fut", v: "fa-shoe-prints"}, {q: "Head", a: "Cabeza", p: "jed", v: "fa-user-circle"},
  {q: "Eyes", a: "Ojos", p: "áis", v: "fa-eye"}, {q: "Mouth", a: "Boca", p: "máuz", v: "fa-comment-dots"},
  {q: "Ear", a: "Oreja", p: "íar", v: "fa-deaf"}, {q: "Nose", a: "Nariz", p: "nóus", v: "fa-nose"},
  {q: "Cloud", a: "Nube", p: "kláud", v: "fa-cloud"}, {q: "Rain", a: "Lluvia", p: "réin", v: "fa-cloud-rain"},
  {q: "Snow", a: "Nieve", p: "snóu", v: "fa-snowflake"}, {q: "Cold", a: "Frío", p: "kóuld", v: "fa-icicles"},
  {q: "Hot", a: "Calor", p: "jot", v: "fa-fire"}, {q: "Car", a: "Coche", p: "kar", v: "fa-car"},
  {q: "Ball", a: "Pelota", p: "bol", v: "fa-baseball-ball"}, {q: "Cake", a: "Pastel", p: "kéik", v: "fa-birthday-cake"},
  {q: "Pen", a: "Pluma", p: "pen", v: "fa-pen"}, {q: "Door", a: "Puerta", p: "dor", v: "fa-door-open"}
];

// --- CONTENIDO DE LENGUA (INGLÉS): 50 EXPRESIONES ---
const ENGLISH_PHRASES = [
  {q: "Hello", a: "Hola", p: "jelóu"}, {q: "Goodbye", a: "Adiós", p: "gudbái"},
  {q: "Thank you", a: "Gracias", p: "zánk iu"}, {q: "Please", a: "Por favor", p: "plis"},
  {q: "How are you?", a: "¿Cómo estás?", p: "jáu ár iu"}, {q: "I am fine", a: "Estoy bien", p: "ái am fáin"},
  {q: "What is your name?", a: "¿Cómo te llamas?", p: "uót is iór néim"}, {q: "My name is Jana", a: "Mi nombre es Jana", p: "mái néim is yana"},
  {q: "I love you", a: "Te quiero", p: "ái lav iu"}, {q: "I am hungry", a: "Tengo hambre", p: "ái am jángri"},
  {q: "Good morning", a: "Buenos días", p: "gud mórning"}, {q: "Good night", a: "Buenas noches", p: "gud náit"},
  {q: "Where is it?", a: "¿Dónde está?", p: "uér is it"}, {q: "Let's go", a: "Vamos", p: "lets góu"},
  {q: "I am happy", a: "Soy feliz", p: "ái am hápi"}, {q: "Excuse me", a: "Disculpa", p: "ekskiús mi"},
  {q: "I'm sorry", a: "Lo siento", p: "aim sóri"}, {q: "Nice to meet you", a: "Gusto en conocerte", p: "náis tu mit iu"},
  {q: "You're welcome", a: "De nada", p: "iúr uélkom"}, {q: "How old are you?", a: "¿Cuántos años tienes?", p: "jáu óuld ár iu"},
  {q: "I am eight", a: "Tengo ocho", p: "ái am éit"}, {q: "Look at this", a: "Mira esto", p: "luk at dis"},
  {q: "I like pink", a: "Me gusta el rosa", p: "ái láik pink"}, {q: "Can I play?", a: "¿Puedo jugar?", p: "kan ái pléi"},
  {q: "Yes, please", a: "Sí, por favor", p: "ies plis"}, {q: "No, thanks", a: "No, gracias", p: "nóu zanks"},
  {q: "I am ready", a: "Estoy lista", p: "ái am rédi"}, {q: "Come here", a: "Ven aquí", p: "kam jíar"},
  {q: "Sit down", a: "Siéntate", p: "sit dáun"}, {q: "Stand up", a: "Levántate", p: "stand ap"},
  {q: "Open the book", a: "Abre el libro", p: "óupen de buk"}, {q: "Close your eyes", a: "Cierra los ojos", p: "klóus iór áis"},
  {q: "I don't know", a: "No lo sé", p: "ái dóunt nóu"}, {q: "Help me", a: "Ayúdame", p: "jelp mi"},
  {q: "Wait a minute", a: "Espera un minuto", p: "uéit a mínit"}, {q: "Hurry up", a: "Date prisa", p: "jári ap"},
  {q: "It's cold", a: "Hace frío", p: "its kóuld"}, {q: "It's hot", a: "Hace calor", p: "its jot"},
  {q: "I'm tired", a: "Estoy cansada", p: "aim táiard"}, {q: "Let's dance", a: "A bailar", p: "lets dans"},
  {q: "I am a girl", a: "Soy una niña", p: "ái am a guerl"}, {q: "What is this?", a: "¿Qué es esto?", p: "uót is dis"},
  {q: "Listen to me", a: "Escúchame", p: "lísen tu mi"}, {q: "Be quiet", a: "Silencio", p: "bi kuáiet"},
  {q: "See you later", a: "Nos vemos luego", p: "si iu léitar"}, {q: "I missed you", a: "Te extrañé", p: "ái mist iu"},
  {q: "It's a secret", a: "Es un secreto", p: "its a síkret"}, {q: "I'm bored", p: "aim bórd", a: "Estoy aburrida"},
  {q: "Happy birthday", a: "Feliz cumpleaños", p: "jápi bérzdei"}, {q: "Give me a hug", a: "Dame un abrazo", p: "guiv mi a jag"}
];

// --- CONTENIDO DE LECTURA: 25 CUENTOS CORTOS ---
const READING_DB = [
  {
    title: "El Gato Pixel",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "Pixel era un gato que vivía dentro de una computadora. En lugar de cazar ratones, cazaba virus y errores. Sus pelos eran de colores neón y sus ojos brillaban como pantallas. Un día, Pixel encontró un error gigante que impedía a una niña jugar. Con un salto valiente, Pixel borró el error y la niña pudo ganar su partida. Desde entonces, Pixel es el guardián de los videojuegos.",
    questions: [
      {question: "¿Qué cazaba el gato Pixel?", options: ["Ratones", "Virus y errores", "Pájaros"], correct: 1},
      {question: "¿De qué colores eran sus pelos?", options: ["Blancos", "Neón", "Negros"], correct: 1}
    ]
  },
  {
    title: "La Estrella Bailarina",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "Luma era la estrella más pequeña del cielo, pero la que mejor bailaba. Mientras las otras estrellas estaban quietas, Luma hacía giros y piruetas. La Luna siempre le pedía que hiciera un baile especial para los niños que no podían dormir. Cuando Luma bailaba, su luz se volvía de colores pastel, calmando a todos en la Tierra. Por eso, si ves una estrella titilar mucho, es Luma dando un concierto.",
    questions: [
      {question: "¿Quién era Luma?", options: ["Un planeta", "Una estrella", "Un cometa"], correct: 1},
      {question: "¿Qué hacía Luma para calmar a los niños?", options: ["Cantar", "Bailar", "Dormir"], correct: 1}
    ]
  },
  {
    title: "El Dragón Burbuja",
    author: "Academia Jana",
    estimatedTime: "3 min",
    content: "Burbu no era un dragón normal. En lugar de fuego, cuando abría la boca salían pompas de jabón gigantes. Sus hermanos dragones se reían de él porque no podía quemar nada. Pero un día, hubo un gran incendio en el bosque. Burbu sopló y sopló miles de burbujas de agua que apagaron el fuego rápidamente. Los animales del bosque lo nombraron héroe y ahora todos quieren jugar con sus burbujas mágicas.",
    questions: [
      {question: "¿Qué salía de la boca de Burbu?", options: ["Fuego", "Agua", "Burbujas"], correct: 2},
      {question: "¿Qué salvó Burbu con sus burbujas?", options: ["Un castillo", "El bosque", "Un tesoro"], correct: 1}
    ]
  },
  {
    title: "El Robot Pintor",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "Artie era un pequeño robot con pinceles en lugar de dedos. Vivía en una galería de arte vacía y gris. Un día, decidió que el mundo necesitaba color. Usando su batería solar, pintó arcoíris en las paredes y nubes de colores en el techo. Cuando la gente entró, se quedaron maravillados. Artie descubrió que el arte es la mejor forma de compartir alegría.",
    questions: [
      {question: "¿Qué tenía Artie en sus dedos?", options: ["Cables", "Pinceles", "Lápices"], correct: 1},
      {question: "¿Cómo se sintió la gente al ver el arte?", options: ["Triste", "Enojada", "Maravillada"], correct: 2}
    ]
  },
  {
    title: "La Hada del Jardín",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "Rosa era una hada que cuidaba las flores. Su secreto era cantarles cada mañana. Una pequeña margarita estaba marchita y triste. Rosa voló hacia ella y le cantó su canción más dulce. Al instante, la margarita abrió sus pétalos y brilló más que ninguna otra. Rosa aprendió que el cariño y la música pueden hacer milagros en la naturaleza.",
    questions: [
      {question: "¿Qué hacía Rosa para cuidar las flores?", options: ["Bailar", "Cantar", "Regar"], correct: 1},
      {question: "¿Qué flor estaba marchita?", options: ["Rosa", "Margarita", "Tulipán"], correct: 1}
    ]
  },
  {
    title: "El Viaje al Planeta Caramelo",
    author: "Academia Jana",
    estimatedTime: "3 min",
    content: "Valentina construyó un cohete de cartón que funcionaba con sueños. Al cerrar los ojos, despegó hacia el Planeta Caramelo. Allí, las nubes eran de algodón de azúcar y los ríos de chocolate caliente. Valentina conoció a los ositos de goma, que eran los habitantes del lugar. Después de jugar toda la tarde, regresó a casa con un sabor muy dulce en el corazón.",
    questions: [
      {question: "¿De qué era el cohete?", options: ["Metal", "Cartón", "Plástico"], correct: 1},
      {question: "¿De qué eran los ríos?", options: ["Agua", "Chocolate", "Leche"], correct: 1}
    ]
  },
  {
    title: "La Ballena de Cristal",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "En lo profundo del océano vivía una ballena hecha de cristal. Cuando el sol atravesaba el agua, ella proyectaba miles de arcoíris en el fondo marino. Todos los peces pequeños se reunían a su alrededor para ver el espectáculo. La ballena de cristal era muy tímida, pero ver a los peces felices le daba valor para seguir brillando.",
    questions: [
      {question: "¿De qué estaba hecha la ballena?", options: ["Hielo", "Cristal", "Espejos"], correct: 1},
      {question: "¿Qué proyectaba la ballena?", options: ["Sombras", "Arcoíris", "Luz blanca"], correct: 1}
    ]
  },
  {
    title: "El Libro Mágico de Jana",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "Jana encontró un libro que no tenía letras, solo dibujos que se movían. Al tocar un dibujo de un bosque, el libro empezó a oler a pinos y flores. Al tocar un dibujo de un mar, sintió la brisa fresca. Jana descubrió que ella podía crear las historias simplemente imaginándolas. Ese libro era la entrada a su propia creatividad infinita.",
    questions: [
      {question: "¿Qué tenía el libro en lugar de letras?", options: ["Fotos", "Dibujos que se mueven", "Nada"], correct: 1},
      {question: "¿Qué descubrió Jana sobre el libro?", options: ["Que era viejo", "Que era la entrada a su creatividad", "Que no funcionaba"], correct: 1}
    ]
  },
  {
    title: "El Conejo de la Luna",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "Se dice que en la Luna vive un conejo que prepara pasteles de arroz. Cada noche, cuando la Luna está llena, se puede ver su silueta trabajando. Él usa una cuchara de plata y un tazón de oro. Los pasteles que hace son tan brillantes que iluminan las noches más oscuras. Si pides un deseo al ver al conejo, él enviará un destello de suerte a tu casa.",
    questions: [
      {question: "¿Dónde vive el conejo?", options: ["En el Sol", "En la Luna", "En Marte"], correct: 1},
      {question: "¿Qué usa el conejo para cocinar?", options: ["Cuchara de madera", "Cuchara de plata", "Cuchara de plástico"], correct: 1}
    ]
  },
  {
    title: "La Orquesta de la Selva",
    author: "Academia Jana",
    estimatedTime: "3 min",
    content: "El león tocaba el tambor, el elefante la trompa y los monos las maracas. Cada noche hacían un concierto bajo el gran árbol. Un día, una lluvia fuerte mojó todos sus instrumentos. Estaban muy tristes, hasta que descubrieron que las gotas de agua contra las hojas hacían una música hermosa. Aprendieron que la naturaleza siempre tiene su propia melodía.",
    questions: [
      {question: "¿Qué instrumento tocaba el león?", options: ["Guitarra", "Tambor", "Piano"], correct: 1},
      {question: "¿Qué descubrieron al final?", options: ["Que no podían tocar", "Que la naturaleza tiene su melodía", "Que querían dormir"], correct: 1}
    ]
  },
  {
    title: "El Unicornio de Nubes",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "Nieve era un unicornio que podía caminar sobre las nubes. Su cuerno era de color rosa neón y su cola era un arcoíris. Ayudaba al viento a mover las nubes para que lloviera donde las plantas tenían sed. Nieve amaba saltar de nube en nube, dejando un rastro de purpurina mágica que los niños veían desde abajo como estrellas fugaces.",
    questions: [
      {question: "¿Sobre qué caminaba Nieve?", options: ["Agua", "Nubes", "Fuego"], correct: 1},
      {question: "¿De qué color era su cuerno?", options: ["Dorado", "Rosa neón", "Azul"], correct: 1}
    ]
  },
  {
    title: "El Tren de los Sueños",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "Cada noche, a las ocho en punto, el Tren de los Sueños sale de la estación de la Imaginación. Sus vagones son camas suaves y sus ruedas no hacen ruido. El maquinista es un búho sabio que sabe exactamente a dónde quiere viajar cada niño. Algunos van al espacio, otros al fondo del mar, pero todos despiertan con una sonrisa al día siguiente.",
    questions: [
      {question: "¿A qué hora sale el tren?", options: ["Seis", "Ocho", "Diez"], correct: 1},
      {question: "¿Quién es el maquinista?", options: ["Un búho", "Un gato", "Un niño"], correct: 0}
    ]
  },
  {
    title: "La Niña y el Mar",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "Marina vivía en una casa frente al mar. Cada tarde hablaba con los delfines que saltaban cerca de la orilla. Ellos le contaban historias sobre ciudades hundidas y tesoros de perlas. A cambio, Marina les lanzaba canciones que escribía en la arena. El mar era su mejor amigo y siempre le traía caracolas hermosas para su colección.",
    questions: [
      {question: "¿Con quién hablaba Marina?", options: ["Tiburones", "Delfines", "Peces"], correct: 1},
      {question: "¿Qué le traía el mar a Marina?", options: ["Peces", "Caracolas", "Algas"], correct: 1}
    ]
  },
  {
    title: "El Misterio del Bosque Azul",
    author: "Academia Jana",
    estimatedTime: "3 min",
    content: "En el centro del bosque había un árbol que daba manzanas azules. Los animales decían que quien comiera una manzana entendería el lenguaje de los árboles. El zorro decidió probar una y, de repente, escuchó a los robles susurrar secretos sobre el clima. El zorro compartió este don con los demás animales para proteger el bosque de las tormentas.",
    questions: [
      {question: "¿De qué color eran las manzanas?", options: ["Rojas", "Azules", "Verdes"], correct: 1},
      {question: "¿Qué entendió el zorro al comer la manzana?", options: ["El lenguaje humano", "El lenguaje de los árboles", "Nada"], correct: 1}
    ]
  },
  {
    title: "La Súper Jana",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "Jana descubrió que tenía un súper poder: su risa podía arreglar juguetes rotos. Un día, el oso de peluche de su hermano perdió un brazo. Jana le dio un fuerte abrazo y soltó una carcajada. Al instante, el peluche estaba como nuevo. Desde entonces, Jana recorre su casa repartiendo risas y arreglando todo lo que está triste o estropeado.",
    questions: [
      {question: "¿Cuál era el súper poder de Jana?", options: ["Volar", "Su risa arregla cosas", "Correr rápido"], correct: 1},
      {question: "¿Qué le pasaba al oso de peluche?", options: ["Estaba sucio", "Perdió un brazo", "No tenía ojos"], correct: 1}
    ]
  },
  {
    title: "El Sol que no quería dormir",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "Un día el Sol decidió que no quería irse a descansar. La Luna estaba muy preocupada porque los animales necesitaban dormir. Hablaron con el Sol y le explicaron que si él no descansaba, las estrellas no podrían salir a brillar. El Sol comprendió que todos tienen su turno y se fue a dormir, dejando que la Luna cuidara la noche con su luz suave.",
    questions: [
      {question: "¿Por qué estaba preocupada la Luna?", options: ["Porque tenía frío", "Porque el Sol no quería dormir", "Porque se perdió"], correct: 1},
      {question: "¿Qué aprendió el Sol?", options: ["Que no debe brillar", "Que todos tienen su turno", "Que debe dormir siempre"], correct: 1}
    ]
  },
  {
    title: "El Castillo de Galleta",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "En el reino del Azúcar había un castillo cuyas paredes eran de galleta de chocolate y las ventanas de caramelo transparente. La reina era una fresa gigante que amaba invitar a todos a merendar. Pero había una regla: ¡nadie podía comerse las paredes del castillo! Preferían usar los árboles de regaliz para sus postres diarios.",
    questions: [
      {question: "¿De qué eran las paredes del castillo?", options: ["Pan", "Galleta de chocolate", "Piedra"], correct: 1},
      {question: "¿Quién era la reina?", options: ["Una naranja", "Una fresa gigante", "Una uva"], correct: 1}
    ]
  },
  {
    title: "La Tortuga Veloz",
    author: "Academia Jana",
    estimatedTime: "3 min",
    content: "Tita era una tortuga que quería ser corredora. Todos los animales se reían porque ella era muy lenta. Tita no se rindió y entrenó cada día. Al final del año, hubo una carrera de obstáculos. Mientras los demás corrían rápido y chocaban, Tita iba despacio pero segura. Logró llegar a la meta sin un solo rasguño, ganando el premio a la constancia.",
    questions: [
      {question: "¿Qué quería ser Tita?", options: ["Nadadora", "Corredora", "Doctora"], correct: 1},
      {question: "¿Por qué ganó el premio?", options: ["Por ser rápida", "Por su constancia", "Por suerte"], correct: 1}
    ]
  },
  {
    title: "El Inventor de Colores",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "Había un hombre que vivía en un mundo blanco y negro. Él pasaba los días mezclando jugos de frutas y flores. Un día logró crear el primer frasco de pintura roja. Luego la azul y la amarilla. Al esparcirlas por el mundo, los pájaros se volvieron alegres y las flores empezaron a oler mejor. El inventor se sintió muy orgulloso de haber traído la luz al mundo.",
    questions: [
      {question: "¿Cómo era el mundo al principio?", options: ["Colorido", "Blanco y negro", "Rojo"], correct: 1},
      {question: "¿Qué usaba para crear colores?", options: ["Piedras", "Jugos de frutas y flores", "Arena"], correct: 1}
    ]
  },
  {
    title: "La Nube que lloraba Limonada",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "Lulú era una nube muy especial: cuando estaba triste, llovía limonada dulce en lugar de agua. Los granjeros estaban encantados porque sus limones crecían ya azucarados. Pero Lulú quería ser una nube normal. Habló con el arcoíris y este le regaló un poco de su luz. Desde entonces, Lulú llueve agua fresca, pero a veces, por diversión, lanza algunas gotas de sabor.",
    questions: [
      {question: "¿Qué llovía Lulú?", options: ["Agua", "Limonada dulce", "Zumo de naranja"], correct: 1},
      {question: "¿Quién ayudó a Lulú?", options: ["El Sol", "El Arcoíris", "La Luna"], correct: 1}
    ]
  },
  {
    title: "El Pingüino que quería Volar",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "Pipo el pingüino miraba a las gaviotas y soñaba con las nubes. Sus amigos le decían que los pingüinos nadan, no vuelan. Pipo encontró unas tablas de madera y se fabricó unas alas. Saltó desde un iceberg y, aunque no voló hacia arriba, se deslizó por el aire hacia el mar como un planeador. Pipo descubrió que hay muchas formas de volar, incluso bajo el agua.",
    questions: [
      {question: "¿Qué quería hacer Pipo?", options: ["Nadar", "Volar", "Correr"], correct: 1},
      {question: "¿Qué descubrió Pipo?", options: ["Que no puede volar", "Que hay muchas formas de volar", "Que le gusta el hielo"], correct: 1}
    ]
  },
  {
    title: "La Biblioteca de los Árboles",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "En el corazón del bosque, los árboles no daban frutos, sino libros. Las hojas eran páginas y las raíces guardaban historias antiguas de la tierra. Los animales iban allí a estudiar para aprender a cuidar el bosque. El búho era el bibliotecario y se aseguraba de que nadie arrancara una hoja sin haber terminado de leer la anterior.",
    questions: [
      {question: "¿Qué daban los árboles?", options: ["Manzanas", "Libros", "Nueces"], correct: 1},
      {question: "¿Quién era el bibliotecario?", options: ["Un oso", "Un búho", "Un zorro"], correct: 1}
    ]
  },
  {
    title: "El Dragón Comilón",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "Draco era un dragón que solo comía espinacas. Sus amigos dragones comían piedras y fuego, pero Draco decía que las espinacas le daban fuerza verde. Gracias a su dieta, sus alas eran las más fuertes del reino. Cuando hubo que rescatar a un gatito de la montaña más alta, Draco fue el único que tuvo energía para subir y bajar diez veces.",
    questions: [
      {question: "¿Qué comía Draco?", options: ["Piedras", "Espinacas", "Fuego"], correct: 1},
      {question: "¿De qué color era su fuerza?", options: ["Roja", "Verde", "Azul"], correct: 1}
    ]
  },
  {
    title: "El Zapatero de Duendes",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "Un hombre hacía zapatos para los duendes del bosque. Estos zapatos eran tan pequeños que cabían en un dedal. Pero tenían magia: hacían que quien los usara caminara sin hacer ruido. Gracias a estos zapatos, los duendes podían recolectar bayas sin que los gigantes los descubrieran. El zapatero siempre recibía a cambio pepitas de oro puro.",
    questions: [
      {question: "¿Para quién eran los zapatos?", options: ["Gigantes", "Duendes", "Niños"], correct: 1},
      {question: "¿Qué poder tenían los zapatos?", options: ["Volar", "Caminar sin ruido", "Ser invisibles"], correct: 1}
    ]
  },
  {
    title: "La Cueva de los Ecos",
    author: "Academia Jana",
    estimatedTime: "2 min",
    content: "Había una cueva donde los ecos no repetían lo que decías, sino lo que pensabas. Si entrabas con miedo, la cueva te devolvía ruidos oscuros. Pero si entrabas feliz, la cueva te cantaba canciones alegres. Jana entró pensando en lo mucho que amaba a su familia y la cueva se llenó de una luz cálida y sonidos de abrazos. La cueva era un espejo de tu propio corazón.",
    questions: [
      {question: "¿Qué repetía la cueva?", options: ["Lo que decías", "Lo que pensabas", "Nada"], correct: 1},
      {question: "¿De qué era un espejo la cueva?", options: ["De tu cara", "De tu corazón", "De la realidad"], correct: 1}
    ]
  }
];

// ==== GEOGRAFÍA: 100 DESAFÍOS ÚNICOS ====
const GEO_CHALLENGES = [
  {id: 1, question: "¿Qué país tiene forma de bota? 🥾", options: ["Italia", "España", "Francia"], answer: 0, hint: "Está en Europa y tiene forma de zapato alto."},
  {id: 2, question: "Capital de Argentina: 🇦🇷", options: ["Buenos Aires", "Lima", "Santiago"], answer: 0, hint: "Su nombre significa 'Vientos Buenos'."},
  {id: 3, question: "¿En qué continente está el Amazonas?", options: ["América", "África", "Asia"], answer: 0, hint: "Donde está Brasil y Colombia."},
  {id: 4, question: "¿Qué animal vive en Australia? 🦘", options: ["Canguro", "León", "Oso polar"], answer: 0, hint: "Salta mucho y tiene una bolsa."},
  {id: 5, question: "Une la bandera: 🇯🇵", options: ["Japón", "China", "Corea"], answer: 0, hint: "Es el país del sol naciente."},
  {id: 6, question: "¿Qué océano está al oeste de América?", options: ["Pacífico", "Atlántico", "Índico"], answer: 0, hint: "Es el océano más grande del mundo."},
  {id: 7, question: "Desierto más grande del mundo: 🏜️", options: ["Sahara", "Atacama", "Gobi"], answer: 0, hint: "Está en el norte de África."},
  {id: 8, question: "Monte más alto del mundo: 🏔️", options: ["Everest", "Kilimanjaro", "Aconcagua"], answer: 0, hint: "Está en la cordillera del Himalaya."},
  {id: 9, question: "¿Qué país es? 🇲🇽", options: ["México", "Brasil", "Colombia"], answer: 0, hint: "Famoso por sus tacos y sombreros."},
  {id: 10, question: "Capital de Francia: 🇫🇷", options: ["París", "Londres", "Berlín"], answer: 0, hint: "Donde está la Torre Eiffel."},
  {id: 11, question: "Río más largo del mundo: 🌊", options: ["Nilo", "Amazonas", "Misisipi"], answer: 1, hint: "Cruza la selva sudamericana."},
  {id: 12, question: "¿En qué continente está España?", options: ["Europa", "África", "Asia"], answer: 0, hint: "Al sur de Francia."},
  {id: 13, question: "Isla más grande del mundo: 🏝️", options: ["Groenlandia", "Australia", "Madagascar"], answer: 0, hint: "Está muy al norte y tiene mucho hielo."},
  {id: 14, question: "¿Qué país es? 🇨🇦", options: ["Canadá", "Estados Unidos", "Rusia"], answer: 0, hint: "Su hoja símbolo es el arce."},
  {id: 15, question: "Capital de Italia: 🇮🇹", options: ["Roma", "Madrid", "Atenas"], answer: 0, hint: "Famosa por el Coliseo."},
  {id: 16, question: "¿Qué animal es símbolo de China? 🐼", options: ["Panda", "Tigre", "Dragón"], answer: 0, hint: "Come bambú."},
  {id: 17, question: "Capital de Japón: 🇯🇵", options: ["Tokio", "Pekín", "Seúl"], answer: 0, hint: "Una ciudad muy tecnológica."},
  {id: 18, question: "¿En qué país está la Torre Eiffel?", options: ["Francia", "Italia", "Inglaterra"], answer: 0, hint: "Famoso por sus quesos y panes largos."},
  {id: 19, question: "Océano más grande: 🌏", options: ["Pacífico", "Atlántico", "Índico"], answer: 0, hint: "Baña las costas de Asia y América."},
  {id: 20, question: "¿Qué país es? 🇧🇷", options: ["Brasil", "Argentina", "Chile"], answer: 0, hint: "Hablan portugués."},
  {id: 21, question: "Capital de Alemania: 🇩🇪", options: ["Berlín", "París", "Londres"], answer: 0, hint: "Una ciudad histórica de Europa central."},
  {id: 22, question: "¿Dónde viven los pingüinos? 🐧", options: ["Antártida", "África", "Asia"], answer: 0, hint: "En el polo sur."},
  {id: 23, question: "¿Qué país tiene pirámides? 🇪🇬", options: ["Egipto", "México", "Perú"], answer: 0, hint: "Famoso por los faraones."},
  {id: 24, question: "Capital de Rusia: 🇷🇺", options: ["Moscú", "Kiev", "Varsovia"], answer: 0, hint: "Una ciudad muy fría en el este."},
  {id: 25, question: "¿Qué continente es? 🗺️", options: ["África", "Europa", "Asia"], answer: 0, hint: "Tiene forma de oreja grande."},
  {id: 26, question: "¿Dónde está el Gran Cañón?", options: ["Estados Unidos", "México", "Canadá"], answer: 0, hint: "En el estado de Arizona."},
  {id: 27, question: "Capital de Inglaterra: 🏴󠁧󠁢󠁥󠁮󠁧󠁿", options: ["Londres", "Manchester", "Liverpool"], answer: 0, hint: "Donde está el Big Ben."},
  {id: 28, question: "¿Qué país es? 🇦🇺", options: ["Australia", "Nueva Zelanda", "Indonesia"], answer: 0, hint: "Es una isla-continente."},
  {id: 29, question: "Mar más grande: 🏖️", options: ["Mediterráneo", "Caribe", "Rojo"], answer: 0, hint: "Separa Europa de África."},
  {id: 30, question: "Capital de China: 🇨🇳", options: ["Pekín", "Shanghái", "Hong Kong"], answer: 0, hint: "Centro político de China."},
  {id: 31, question: "¿Dónde viven los canguros?", options: ["Australia", "África", "Sudamérica"], answer: 0, hint: "País con muchos animales únicos."},
  {id: 32, question: "¿Qué país es? 🇮🇳", options: ["India", "Pakistán", "Bangladés"], answer: 0, hint: "Famoso por el Taj Mahal."},
  {id: 33, question: "Capital de Egipto: 🇪🇬", options: ["El Cairo", "Alejandría", "Luxor"], answer: 0, hint: "Cerca del río Nilo."},
  {id: 34, question: "¿Qué continente es el más frío? ❄️", options: ["Antártida", "Ártico", "Europa"], answer: 0, hint: "Todo blanco de nieve."},
  {id: 35, question: "¿Dónde está el desierto del Sahara?", options: ["África", "Asia", "Australia"], answer: 0, hint: "Ocupa casi todo el norte de este continente."},
  {id: 36, question: "Capital de México: 🇲🇽", options: ["Ciudad de México", "Guadalajara", "Monterrey"], answer: 0, hint: "Una de las ciudades más grandes del mundo."},
  {id: 37, question: "¿Qué país tiene la bandera? 🇺🇸", options: ["Estados Unidos", "Reino Unido", "Francia"], answer: 0, hint: "Barras y estrellas."},
  {id: 38, question: "¿Dónde viven los leones? 🦁", options: ["África", "Asia", "América"], answer: 0, hint: "En la sabana africana."},
  {id: 39, question: "Capital de Brasil: 🇧🇷", options: ["Brasilia", "Río de Janeiro", "Sao Paulo"], answer: 0, hint: "Construida en forma de avión."},
  {id: 40, question: "¿Qué continente es el más grande?", options: ["Asia", "África", "América"], answer: 0, hint: "Donde vive más de la mitad del mundo."},
  {id: 41, question: "¿Dónde está el río Amazonas?", options: ["Sudamérica", "África", "Asia"], answer: 0, hint: "En la mayor selva del mundo."},
  {id: 42, question: "Capital de Canadá: 🇨🇦", options: ["Ottawa", "Toronto", "Vancouver"], answer: 0, hint: "En el norte de América."},
  {id: 43, question: "¿Qué país tiene la Torre de Pisa?", options: ["Italia", "Francia", "España"], answer: 0, hint: "Famoso por la pasta."},
  {id: 44, question: "¿Dónde viven los osos polares? 🐻‍❄️", options: ["Ártico", "Antártida", "Europa"], answer: 0, hint: "En el polo norte."},
  {id: 45, question: "Capital de España: 🇪🇸", options: ["Madrid", "Barcelona", "Valencia"], answer: 0, hint: "En el centro de la península."},
  {id: 46, question: "¿Qué país es? 🇰🇷", options: ["Corea del Sur", "Japón", "China"], answer: 0, hint: "Cuna del K-Pop."},
  {id: 47, question: "¿Dónde está el monte Everest?", options: ["Asia", "África", "Europa"], answer: 0, hint: "Cerca de Nepal e India."},
  {id: 48, question: "Capital de Perú: 🇵🇪", options: ["Lima", "Cuzco", "Arequipa"], answer: 0, hint: "En la costa del Pacífico."},
  {id: 49, question: "¿Qué país tiene la bandera? 🇬🇧", options: ["Reino Unido", "Australia", "Nueva Zelanda"], answer: 0, hint: "La bandera Union Jack."},
  {id: 50, question: "¿Dónde viven los elefantes? 🐘", options: ["África y Asia", "América", "Europa"], answer: 0, hint: "En dos continentes lejanos."},
  {id: 51, question: "Capital de Chile: 🇨🇱", options: ["Santiago", "Buenos Aires", "Lima"], answer: 0, hint: "Un país muy largo y angosto."},
  {id: 52, question: "¿Qué país es? 🇿🇦", options: ["Sudáfrica", "Egipto", "Kenia"], answer: 0, hint: "En el extremo sur de África."},
  {id: 53, question: "¿Dónde está la Gran Muralla?", options: ["China", "Japón", "Corea"], answer: 0, hint: "Se ve desde el espacio."},
  {id: 54, question: "Capital de Colombia: 🇨🇴", options: ["Bogotá", "Medellín", "Cali"], answer: 0, hint: "País del café."},
  {id: 55, question: "¿Qué continente es? 🗺️", options: ["Oceanía", "Europa", "Asia"], answer: 0, hint: "Muchas islas pequeñas."},
  {id: 56, question: "¿Dónde viven los koalas? 🐨", options: ["Australia", "Nueva Zelanda", "Indonesia"], answer: 0, hint: "Comen eucalipto."},
  {id: 57, question: "Capital de Venezuela: 🇻🇪", options: ["Caracas", "Maracaibo", "Valencia"], answer: 0, hint: "En el norte de Sudamérica."},
  {id: 58, question: "¿Qué país es? 🇳🇿", options: ["Nueva Zelanda", "Australia", "Fiyi"], answer: 0, hint: "País de los kiwis."},
  {id: 59, question: "¿Dónde está el lago Titicaca?", options: ["Perú y Bolivia", "Chile", "Argentina"], answer: 0, hint: "En los Andes."},
  {id: 60, question: "Capital de Portugal: 🇵🇹", options: ["Lisboa", "Oporto", "Madrid"], answer: 0, hint: "Al lado de España."},
  {id: 61, question: "¿Qué animal es de la India? 🐅", options: ["Tigre", "León", "Jaguar"], answer: 0, hint: "El felino más grande."},
  {id: 62, question: "Capital de Grecia: 🇬🇷", options: ["Atenas", "Roma", "Estambul"], answer: 0, hint: "Cuna de las olimpiadas."},
  {id: 63, question: "¿Qué país es? 🇸🇪", options: ["Suecia", "Noruega", "Dinamarca"], answer: 0, hint: "Un país nórdico con mucha nieve."},
  {id: 64, question: "¿Dónde viven los camellos? 🐪", options: ["Desiertos", "Bosques", "Montañas"], answer: 0, hint: "En lugares secos y calurosos."},
  {id: 65, question: "Capital de Turquía: 🇹🇷", options: ["Ankara", "Estambul", "Esmirna"], answer: 0, hint: "Entre Europa y Asia."},
  {id: 66, question: "¿Qué país tiene la bandera? 🇳🇴", options: ["Noruega", "Suecia", "Finlandia"], answer: 0, hint: "Famoso por sus fiordos."},
  {id: 67, question: "¿Dónde está el canal de Panamá?", options: ["Panamá", "México", "Colombia"], answer: 0, hint: "Une dos océanos."},
  {id: 68, question: "Capital de Cuba: 🇨🇺", options: ["La Habana", "Santiago de Cuba", "Camagüey"], answer: 0, hint: "Una isla en el Caribe."},
  {id: 69, question: "¿Qué país es? 🇦🇪", options: ["Emiratos Árabes", "Arabia Saudita", "Qatar"], answer: 0, hint: "Donde está Dubái."},
  {id: 70, question: "¿Dónde viven los pingüinos emperador?", options: ["Antártida", "África", "Australia"], answer: 0, hint: "Solo en el lugar más frío."},
  {id: 71, question: "Capital de Tailandia: 🇹🇭", options: ["Bangkok", "Phuket", "Chiang Mai"], answer: 0, hint: "En el sudeste asiático."},
  {id: 72, question: "¿Qué país tiene la bandera? 🇩🇰", options: ["Dinamarca", "Suecia", "Noruega"], answer: 0, hint: "Cuna de los Lego."},
  {id: 73, question: "¿Dónde está el volcán Fuji?", options: ["Japón", "China", "Corea"], answer: 0, hint: "Símbolo de Japón."},
  {id: 74, question: "Capital de Argentina: 🇦🇷", options: ["Buenos Aires", "Córdoba", "Rosario"], answer: 0, hint: "Famosa por el tango."},
  {id: 75, question: "¿Qué animal es de Australia? 🐨", options: ["Koala", "Panda", "Elefante"], answer: 0, hint: "Duerma mucho en los árboles."},
  {id: 76, question: "Capital de Ecuador: 🇪🇨", options: ["Quito", "Guayaquil", "Cuenca"], answer: 0, hint: "En la línea ecuatorial."},
  {id: 77, question: "¿Qué país es? 🇵🇱", options: ["Polonia", "Alemania", "República Checa"], answer: 0, hint: "En el corazón de Europa."},
  {id: 78, question: "¿Dónde viven los flamencos? 🦩", options: ["Lagunas", "Bosques", "Montañas"], answer: 0, hint: "En aguas poco profundas."},
  {id: 79, question: "Capital de Marruecos: 🇲🇦", options: ["Rabat", "Casablanca", "Marrakech"], answer: 0, hint: "En el norte de África."},
  {id: 80, question: "¿Qué país tiene la bandera? 🇨🇭", options: ["Suiza", "Austria", "Alemania"], answer: 0, hint: "Famoso por chocolates y relojes."},
  {id: 81, question: "¿Dónde está el río Nilo?", options: ["África", "Asia", "Europa"], answer: 0, hint: "Cruzaba el antiguo Egipto."},
  {id: 82, question: "Capital de Uruguay: 🇺🇾", options: ["Montevideo", "Punta del Este", "Salto"], answer: 0, hint: "Al lado de Argentina."},
  {id: 83, question: "¿Qué país es? 🇻🇳", options: ["Vietnam", "Tailandia", "Camboya"], answer: 0, hint: "En el sudeste de Asia."},
  {id: 84, question: "¿Dónde viven los gorilas? 🦍", options: ["África", "Asia", "América"], answer: 0, hint: "En las selvas centrales de África."},
  {id: 85, question: "Capital de Israel: 🇮🇱", options: ["Jerusalén", "Tel Aviv", "Haifa"], answer: 0, hint: "Ciudad santa."},
  {id: 86, question: "¿Qué país tiene la bandera? 🇦🇹", options: ["Austria", "Alemania", "Suiza"], answer: 0, hint: "País de los Alpes."},
  {id: 87, question: "¿Dónde está el desierto de Atacama?", options: ["Chile", "Perú", "Bolivia"], answer: 0, hint: "El lugar más seco del mundo."},
  {id: 88, question: "Capital de Filipinas: 🇵🇭", options: ["Manila", "Cebú", "Davao"], answer: 0, hint: "Un archipiélago en Asia."},
  {id: 89, question: "¿Qué país es? 🇳🇱", options: ["Países Bajos", "Bélgica", "Alemania"], answer: 0, hint: "Famoso por sus tulipanes."},
  {id: 90, question: "¿Dónde viven los lobos? 🐺", options: ["Bosques", "Desiertos", "Océanos"], answer: 0, hint: "En los bosques del hemisferio norte."},
  {id: 91, question: "Capital de Suecia: 🇸🇪", options: ["Estocolmo", "Gotemburgo", "Malmö"], answer: 0, hint: "Construida sobre islas."},
  {id: 92, question: "¿Qué país tiene la bandera? 🇧🇪", options: ["Bélgica", "Francia", "Alemania"], answer: 0, hint: "Famoso por sus gofres."},
  {id: 93, question: "¿Dónde está el lago Baikal?", options: ["Rusia", "China", "Mongolia"], answer: 0, hint: "El lago más profundo del mundo."},
  {id: 94, question: "Capital de Noruega: 🇳🇴", options: ["Oslo", "Bergen", "Trondheim"], answer: 0, hint: "Muy al norte de Europa."},
  {id: 95, question: "¿Qué país es? 🇮🇪", options: ["Irlanda", "Reino Unido", "Islandia"], answer: 0, hint: "La isla esmeralda."},
  {id: 96, question: "¿Dónde viven los delfines? 🐬", options: ["Océanos", "Ríos", "Lagos"], answer: 0, hint: "En todas las aguas del mundo."},
  {id: 97, question: "Capital de Finlandia: 🇫🇮", options: ["Helsinki", "Turku", "Tampere"], answer: 0, hint: "País más feliz del mundo."},
  {id: 98, question: "¿Qué país tiene la bandera? 🇨🇿", options: ["República Checa", "Eslovaquia", "Polonia"], answer: 0, hint: "Famoso por su cristal."},
  {id: 99, question: "¿Dónde está el monte Kilimanjaro?", options: ["Tanzania", "Kenia", "Uganda"], answer: 0, hint: "En África."},
  {id: 100, question: "Capital de Australia: 🇦🇺", options: ["Canberra", "Sídney", "Melbourne"], answer: 0, hint: "Suele confundirse con Sídney."}
];

// ==== CIENCIA/NATURALEZA: CATEGORÍAS PARA BÚSQUEDA ====
const SCIENCE_OBJECTS = [
  {id: 'ice', icon: 'fa-snowflake', label: 'Hielo', desc: 'El agua se congela a 0 grados.'},
  {id: 'ear', icon: 'fa-ear-listen', label: 'Oído', desc: 'Nos permite escuchar música y ruidos.'},
  {id: 'worm', icon: 'fa-bug', label: 'Oruga', desc: 'Se convierte en una linda mariposa.'},
  {id: 'earth', icon: 'fa-globe-americas', label: 'Tierra', desc: 'Nuestro planeta es el tercero del sol.'},
  {id: 'tiger', icon: 'fa-cat', label: 'Tigre', desc: 'Un animal carnívoro y muy fuerte.'},
  {id: 'sun', icon: 'fa-sun', label: 'Sol', desc: 'Da energía a todas las plantas.'},
  {id: 'heart', icon: 'fa-heart', label: 'Corazón', desc: 'Bombea la sangre por todo el cuerpo.'},
  {id: 'eye', icon: 'fa-eye', label: 'Ojo', desc: 'Nos permite ver los colores.'},
  {id: 'saturn', icon: 'fa-ring', label: 'Saturno', desc: 'Tiene anillos gigantes de hielo.'},
  {id: 'snow', icon: 'fa-snowflake', label: 'Nieve', desc: 'Cae en invierno cuando hace mucho frío.'},
  {id: 'chicken', icon: 'fa-egg', label: 'Gallina', desc: 'Un ave que pone huevos deliciosos.'},
  {id: 'rabbit', icon: 'fa-carrot', label: 'Conejo', desc: 'Le encantan las zanahorias frescas.'},
  {id: 'leaf', icon: 'fa-leaf', label: 'Hoja', desc: 'Parte de la planta que respira.'},
  {id: 'whale', icon: 'fa-fish', label: 'Ballena', desc: 'El mamífero más grande del mar.'},
  {id: 'leg', icon: 'fa-walking', label: 'Pierna', desc: 'Sostiene nuestro cuerpo al caminar.'},
  {id: 'seed', icon: 'fa-seedling', label: 'Semilla', desc: 'De aquí nace una nueva planta.'},
  {id: 'microscope', icon: 'fa-microscope', label: 'Microscopio', desc: 'Sirve para ver cosas muy pequeñas.'},
  {id: 'telescope', icon: 'fa-telescope', label: 'Telescopio', desc: 'Sirve para ver las estrellas.'},
  {id: 'beaker', icon: 'fa-vial', label: 'Vaso', desc: 'Usado en laboratorios para mezclas.'},
  {id: 'atom', icon: 'fa-atom', label: 'Átomo', desc: 'La parte más pequeña de la materia.'}
];

const MATH_OBJS = ['🍎', '🍪', '🐶', '🚗', '⭐️', '🧁', '🍦', '🎈', '🧸', '🍭', '🍓', '🍕', '🚲', '🐱', '🦖'];

export const LEVELS: Level[] = (() => {
  const levels: Level[] = [];
  const modules: ModuleId[] = ['color', 'math', 'english', 'geo', 'reading', 'science'];
  
  modules.forEach(mod => {
    for (let i = 1; i <= 100; i++) {
      let l: any = { 
        id: `${mod}_${i}`, 
        moduleId: mod, 
        index: i, 
        objective: mod.toUpperCase() + " • Misión #" + i,
        help: "¡Tú puedes, Jana!" 
      };
      
      if (mod === 'math') {
        l.type = 'math-master';
        const v1 = Math.floor(i / 10) + 2;
        const v2 = (i % 8) + 1;
        const obj = MATH_OBJS[i % MATH_OBJS.length];
        l.storyProblem = `Si tienes ${v1} ${obj} y tu amigo te regala ${v2} ${obj} más... ¿Cuántos tienes en total?`;
        l.visualHint = `${obj.repeat(v1)} + ${obj.repeat(v2)}`;
        l.answer = v1 + v2;
      } 
      else if (mod === 'english') {
        l.type = 'quiz';
        const item = i <= 50 ? ENGLISH_WORDS[(i-1) % ENGLISH_WORDS.length] : ENGLISH_PHRASES[(i-51) % ENGLISH_PHRASES.length];
        l.question = item.q;
        l.answer = item.a;
        l.visual = (item as any).v || 'fa-comment';
        l.options = [
          {text: item.a, isCorrect: true},
          {text: "Otra respuesta", isCorrect: false}
        ];
        l.englishData = { pronunciation: (item as any).p };
      }
      else if (mod === 'reading') {
        l.type = 'reading-adventure';
        const story = READING_DB[(i-1) % READING_DB.length];
        l.readingData = story;
        l.objective = "Comprensión Lectora";
      }
      else if (mod === 'color') {
        l.type = 'paint';
        l.visual = i % 3 === 0 ? 'fa-star' : i % 3 === 1 ? 'fa-heart' : 'fa-sun';
      }
      else if (mod === 'science') {
        l.type = 'science-lab';
        // Generar 3-5 objetos aleatorios para buscar
        const itemCount = 3 + (i % 3);
        const hiddenItems = [];
        const usedIndices = new Set();
        
        for (let j = 0; j < itemCount; j++) {
          let objIdx;
          do { objIdx = Math.floor(Math.random() * SCIENCE_OBJECTS.length); } while (usedIndices.has(objIdx));
          usedIndices.add(objIdx);
          
          const baseObj = SCIENCE_OBJECTS[objIdx];
          hiddenItems.push({
            ...baseObj,
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 80
          });
        }
        
        l.scientificData = { hiddenItems };
        l.objective = "Expedición Científica";
      }
      else if (mod === 'geo') {
        l.type = 'quiz';
        const geo = GEO_CHALLENGES[(i-1) % GEO_CHALLENGES.length];
        l.question = geo.question;
        l.options = geo.options.map((opt, idx) => ({
          text: opt,
          isCorrect: idx === geo.answer
        }));
        l.answer = geo.options[geo.answer];
        l.hints = [geo.hint || "¡Confía en tu instinto!"];
        l.visual = 'fa-globe-americas';
      }
      else {
        l.type = 'quiz';
        l.question = "¿Listo para este reto?";
        l.options = [{text: "¡Sí!", isCorrect: true}, {text: "¡Claro!", isCorrect: false}];
        l.answer = "¡Buen trabajo!";
      }
      levels.push(l);
    }
  });
  return levels;
})();

export const MOTIVATIONAL_QUOTES = ["¡Eres brillante, Jana!", "¡Objetivo cumplido!", "¡Sigue así!", "¡Increíble trabajo!"];
