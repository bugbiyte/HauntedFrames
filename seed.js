require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./models/movies');

const movies = [
  // bloody-sad
  {
    title: 'Hereditary',
    year: 2018,
    poster: 'https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZTU4LWJlMmEtMWI5MDk3MjlmZjFjXkEyXkFqcGdeQXVyNTc4MzMyMzU@._V1_SX300.jpg',
    description: 'A grieving family is haunted by tragedy and sinister secrets after the death of their secretive grandmother.',
    mood: ['bloody-sad'],
  },
  {
    title: 'The Babadook',
    year: 2014,
    poster: 'https://m.media-amazon.com/images/M/MV5BMTg0NTIzMjQ1NV5BMl5BanBnXkFtZTgwNTgyMTQ0MjE@._V1_SX300.jpg',
    description: 'A single mother and her son are plagued by grief — and the creature that feeds on it.',
    mood: ['bloody-sad'],
  },
  {
    title: 'Midsommar',
    year: 2019,
    poster: 'https://m.media-amazon.com/images/M/MV5BMTZiZDQ0ZmMtMzYxYy00NjA1LWFhY2QtNzBhNzFjMzQ5MzI0XkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SX300.jpg',
    description: 'A couple travels to Sweden for a midsummer festival that grows increasingly disturbing.',
    mood: ['bloody-sad', 'sick-and-surreal'],
  },

  // freaky-but-chic
  {
    title: 'Suspiria',
    year: 2018,
    poster: 'https://m.media-amazon.com/images/M/MV5BNzY3NjY4NTYtOWFhZS00ZTQ5LTg1YjUtMzE2MmZlOGM2ZDliXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    description: 'An American dance student joins a prestigious Berlin academy with dark, witchy secrets.',
    mood: ['freaky-but-chic'],
  },
  {
    title: 'Jennifer\'s Body',
    year: 2009,
    poster: 'https://m.media-amazon.com/images/M/MV5BMTU1MDUwNjQ5MF5BMl5BanBnXkFtZTcwMTQzMjIyMg@@._V1_SX300.jpg',
    description: 'A high school cheerleader becomes possessed and starts feeding on boys in her small town.',
    mood: ['freaky-but-chic', 'bloody-humour'],
  },
  {
    title: 'Raw',
    year: 2016,
    poster: 'https://m.media-amazon.com/images/M/MV5BNTJmMDM0NzYtNGZiYy00YWViLWI3YTAtYzY4NWEzYjJkZGRlXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg',
    description: 'A young vegetarian veterinary student discovers a dangerous, cannibalistic hunger during hazing week.',
    mood: ['freaky-but-chic'],
  },

  // twisted-and-unholy
  {
    title: 'Midsommar',
    year: 2019,
    poster: 'https://m.media-amazon.com/images/M/MV5BMTZiZDQ0ZmMtMzYxYy00NjA1LWFhY2QtNzBhNzFjMzQ5MzI0XkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SX300.jpg',
    description: 'Folk horror drenched in sunlight — where a cult turns ritual into something beautifully wrong.',
    mood: ['twisted-and-unholy'],
  },
  {
    title: 'The VVitch',
    year: 2015,
    poster: 'https://m.media-amazon.com/images/M/MV5BMTUyNzkwMzAxOF5BMl5BanBnXkFtZTgwMzc1OTk1NjE@._V1_SX300.jpg',
    description: 'A Puritan family in 1630s New England is torn apart by an ancient evil lurking in the woods.',
    mood: ['twisted-and-unholy'],
  },
  {
    title: 'Annihilation',
    year: 2018,
    poster: 'https://m.media-amazon.com/images/M/MV5BMjM2MDQ2NTMzMV5BMl5BanBnXkFtZTgwMzE4NDQzNTM@._V1_SX300.jpg',
    description: 'A biologist enters a mysterious quarantine zone where nature has mutated into something terrifying.',
    mood: ['twisted-and-unholy', 'sick-and-surreal'],
  },

  // strange-and-possessed
  {
    title: 'The Exorcist',
    year: 1973,
    poster: 'https://m.media-amazon.com/images/M/MV5BYWFlZGY2NDktY2ZjOS00ZWNkLTg0ZDAtZDY4MTM1ODU4ZjljXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    description: 'A mother desperately seeks help when her young daughter becomes possessed by a demonic force.',
    mood: ['strange-and-possessed'],
  },
  {
    title: 'Rosemary\'s Baby',
    year: 1968,
    poster: 'https://m.media-amazon.com/images/M/MV5BNzkwODFjNzItYzZkNy00MDgwLWJmNWItNGQxNGUwNGQxZjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    description: 'A young pregnant woman begins to suspect that her neighbors and husband have a sinister plan for her baby.',
    mood: ['strange-and-possessed'],
  },
  {
    title: 'Hereditary',
    year: 2018,
    poster: 'https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZTU4LWJlMmEtMWI5MDk3MjlmZjFjXkEyXkFqcGdeQXVyNTc4MzMyMzU@._V1_SX300.jpg',
    description: 'Grief and demonic possession unravel a family from the inside out.',
    mood: ['strange-and-possessed'],
  },

  // bloody-humour
  {
    title: 'Tucker and Dale vs Evil',
    year: 2010,
    poster: 'https://m.media-amazon.com/images/M/MV5BMTQyNjQ3MTUyNl5BMl5BanBnXkFtZTcwNjAyNjIyMw@@._V1_SX300.jpg',
    description: 'Two good-natured hillbillies are mistaken for killers by a group of college students.',
    mood: ['bloody-humour'],
  },
  {
    title: 'Shaun of the Dead',
    year: 2004,
    poster: 'https://m.media-amazon.com/images/M/MV5BMTg5Mjk2NDMtZTk0Ny00YTQ0LWIzYWEtMWI5MGQ0Mjg1OTNkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    description: 'A slacker and his flatmate try to survive a zombie apocalypse — mostly by going to the pub.',
    mood: ['bloody-humour'],
  },
  {
    title: 'What We Do in the Shadows',
    year: 2014,
    poster: 'https://m.media-amazon.com/images/M/MV5BMjExMDE4NzE0N15BMl5BanBnXkFtZTgwNzUxODk1MjE@._V1_SX300.jpg',
    description: 'A documentary crew follows four vampire flatmates navigating modern life in Wellington.',
    mood: ['bloody-humour'],
  },

  // bloody-sad (extra)
  {
    title: 'A Ghost Story',
    year: 2017,
    poster: 'https://m.media-amazon.com/images/M/MV5BMjAyOTM4MzQxMV5BMl5BanBnXkFtZTgwMDkzNzM1MjI@._V1_SX300.jpg',
    description: 'A recently deceased man returns as a sheet-draped ghost to watch over his grieving partner.',
    mood: ['bloody-sad'],
  },
  {
    title: 'The Others',
    year: 2001,
    poster: 'https://m.media-amazon.com/images/M/MV5BYjAyMmFjNzEtMTAxYi00ZGM2LWIyMmEtNDQ1ZmI0NzExOTkzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    description: 'A woman living in a darkened old house with her children believes the home is haunted.',
    mood: ['bloody-sad', 'strange-and-possessed'],
  },
  {
    title: 'Relic',
    year: 2020,
    poster: 'https://m.media-amazon.com/images/M/MV5BZWVhMTZmMzMtMDYzMC00NTUwLWE3OGYtZDYzMjIzMTYzNGZlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
    description: 'A daughter and granddaughter travel to their family home to find their elderly mother has gone missing.',
    mood: ['bloody-sad'],
  },
  {
    title: 'The Autopsy of Jane Doe',
    year: 2016,
    poster: 'https://m.media-amazon.com/images/M/MV5BNDZhMTA0NDctNjlhNy00ODRhLWFmMzktZjlhM2JhZjJhZTFhXkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_SX300.jpg',
    description: 'A father and son uncover disturbing secrets while conducting an autopsy on an unidentified woman.',
    mood: ['bloody-sad', 'twisted-and-unholy'],
  },

  // freaky-but-chic (extra)
  {
    title: 'Black Swan',
    year: 2010,
    poster: 'https://m.media-amazon.com/images/M/MV5BNzY2NzI4OTE5MF5BMl5BanBnXkFtZTcwMjMyNDY4Mw@@._V1_SX300.jpg',
    description: 'A ballet dancer\'s obsession with perfection pushes her into madness as she inhabits her dark role.',
    mood: ['freaky-but-chic', 'sick-and-surreal'],
  },
  {
    title: 'Neon Demon',
    year: 2016,
    poster: 'https://m.media-amazon.com/images/M/MV5BMTQ3OTMyNjMtYmY1Mi00N2QzLTk5MTAtNjI4NGZiYzNlMDYzXkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_SX300.jpg',
    description: 'A young aspiring model moves to LA where beauty-obsessed rivals will stop at nothing to have her glow.',
    mood: ['freaky-but-chic'],
  },
  {
    title: 'Crimes of the Future',
    year: 2022,
    poster: 'https://m.media-amazon.com/images/M/MV5BNjI1NTYxMmEtMzgwOC00YmM5LWFhMTAtYmFlNzZkNmJlN2UyXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg',
    description: 'In a near-future world where surgery is the new art form, a performance artist grows new organs.',
    mood: ['freaky-but-chic', 'sick-and-surreal'],
  },

  // twisted-and-unholy (extra)
  {
    title: 'Midsommar Director\'s Cut',
    year: 2019,
    poster: 'https://m.media-amazon.com/images/M/MV5BMTZiZDQ0ZmMtMzYxYy00NjA1LWFhY2QtNzBhNzFjMzQ5MzI0XkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SX300.jpg',
    description: 'Extended cut — more ritual, more dread, more sunlit horror.',
    mood: ['twisted-and-unholy'],
  },
  {
    title: 'Ari Aster\'s Beau is Afraid',
    year: 2023,
    poster: 'https://m.media-amazon.com/images/M/MV5BNDkzNTQ0NTgtNGYxYS00MDZmLTkzMmItOGNkMmNiOGZkODkzXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
    description: 'A paranoid man\'s journey home becomes an odyssey of terrifying and surreal misfortune.',
    mood: ['twisted-and-unholy', 'sick-and-surreal'],
  },
  {
    title: 'Lamb',
    year: 2021,
    poster: 'https://m.media-amazon.com/images/M/MV5BNzQzNGZmMzEtMGUzOS00OTkxLTgwMzEtNzMxOTAxNmYwZmFhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
    description: 'A childless couple in Iceland make an unsettling discovery — and decide to raise it as their own.',
    mood: ['twisted-and-unholy'],
  },
  {
    title: 'Saint Maud',
    year: 2019,
    poster: 'https://m.media-amazon.com/images/M/MV5BNmVjY2ZhZTMtMzdiNC00MTNkLWJkNzktMDcwODI3ZGMyM2Q0XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg',
    description: 'A deeply religious nurse becomes obsessed with saving the soul of her dying patient.',
    mood: ['twisted-and-unholy', 'strange-and-possessed'],
  },

  // strange-and-possessed (extra)
  {
    title: 'The Conjuring',
    year: 2013,
    poster: 'https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_SX300.jpg',
    description: 'Paranormal investigators help a family terrorised by a dark presence in their new home.',
    mood: ['strange-and-possessed'],
  },
  {
    title: 'Insidious',
    year: 2010,
    poster: 'https://m.media-amazon.com/images/M/MV5BNzk1OTI5NzkzN15BMl5BanBnXkFtZTcwNTI5NDUyNA@@._V1_SX300.jpg',
    description: 'A couple discover their comatose son is a vessel for demons trying to enter the physical world.',
    mood: ['strange-and-possessed'],
  },
  {
    title: 'The Witch in the Window',
    year: 2018,
    poster: 'https://m.media-amazon.com/images/M/MV5BNjk2OTQ3OGUtYmI1Yy00MTM3LTgxNjktODg5MzFjMjJkYzlhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    description: 'A father and son renovating a Vermont farmhouse find that the previous owner still lingers.',
    mood: ['strange-and-possessed'],
  },

  // bloody-humour (extra)
  {
    title: 'Get Out',
    year: 2017,
    poster: 'https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc1MTI@._V1_SX300.jpg',
    description: 'A Black man visits his white girlfriend\'s family estate — and uncovers something deeply sinister.',
    mood: ['bloody-humour', 'twisted-and-unholy'],
  },
  {
    title: 'Ready or Not',
    year: 2019,
    poster: 'https://m.media-amazon.com/images/M/MV5BMjMxNDMzMTE0N15BMl5BanBnXkFtZTgwNzM4OTM3NzM@._V1_SX300.jpg',
    description: 'A woman must survive the night after her new in-laws try to hunt her as part of a wedding ritual.',
    mood: ['bloody-humour'],
  },
  {
    title: 'Scream',
    year: 1996,
    poster: 'https://m.media-amazon.com/images/M/MV5BMjA2NjU5MTg5OF5BMl5BanBnXkFtZTgwOTkyMzQxMDE@._V1_SX300.jpg',
    description: 'A killer targeting teenagers is well-versed in horror movie rules — and so are his victims.',
    mood: ['bloody-humour'],
  },
  {
    title: 'Cabin in the Woods',
    year: 2012,
    poster: 'https://m.media-amazon.com/images/M/MV5BMTAxNDM3NTk3NTNeQTJeQWpwZ15BbWU4MDgwMzg3NjMx._V1_SX300.jpg',
    description: 'Five friends at a remote cabin have no idea they\'re pawns in a larger, very sinister game.',
    mood: ['bloody-humour', 'twisted-and-unholy'],
  },

  // sick-and-surreal
  {
    title: 'Eraserhead',
    year: 1977,
    poster: 'https://m.media-amazon.com/images/M/MV5BMTQxMzk5OTk5N15BMl5BanBnXkFtZTcwMjU1NjkwNA@@._V1_SX300.jpg',
    description: 'A man living in an industrial wasteland must care for his severely deformed child in this fever-dream nightmare.',
    mood: ['sick-and-surreal'],
  },
  {
    title: 'Mandy',
    year: 2018,
    poster: 'https://m.media-amazon.com/images/M/MV5BNmU3YTUwNGQtMTA5NS00MWZiLWJlZjEtMDIzNGFhNGFjNWQwXkEyXkFqcGdeQXVyNTc4MzMyMzU@._V1_SX300.jpg',
    description: 'A man embarks on a blood-soaked rampage after a deranged cult murders his wife in the psychedelic 1980s.',
    mood: ['sick-and-surreal'],
  },
  {
    title: 'Possessor',
    year: 2020,
    poster: 'https://m.media-amazon.com/images/M/MV5BZjAzOWQzZGYtNWIwMy00NDQ4LTk2OWQtNGQ1NWIxNDEwZjk2XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg',
    description: 'An assassin uses brain-implant technology to possess other people\'s bodies — until one host fights back.',
    mood: ['sick-and-surreal'],
  },
  // sick-and-surreal (extra)
  {
    title: 'Under the Skin',
    year: 2013,
    poster: 'https://m.media-amazon.com/images/M/MV5BMTU3NTk0ODAxNl5BMl5BanBnXkFtZTgwNzE2NDkzMTE@._V1_SX300.jpg',
    description: 'An alien seductress stalks Scotland, luring men into a dark void beneath her skin.',
    mood: ['sick-and-surreal'],
  },
  {
    title: 'Men',
    year: 2022,
    poster: 'https://m.media-amazon.com/images/M/MV5BZTAzZjI0NTctMjllNy00MTZmLWEzZDktYzhhZDhmZmRlMTU1XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg',
    description: 'After a personal tragedy, a woman retreats to the English countryside — where something ancient stalks her.',
    mood: ['sick-and-surreal', 'twisted-and-unholy'],
  },
  {
    title: 'Titane',
    year: 2021,
    poster: 'https://m.media-amazon.com/images/M/MV5BZDQzMTI0NTQtNGEwNy00NmM2LWIwNGItMzVhMjQ5NmMzYzkzXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
    description: 'A woman with a titanium plate in her skull goes on the run — and finds unexpected family.',
    mood: ['sick-and-surreal', 'freaky-but-chic'],
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected');

  await Movie.deleteMany({});
  console.log('🗑️  Cleared existing movies');

  await Movie.insertMany(movies);
  console.log(`🎬 Seeded ${movies.length} movies`);

  await mongoose.disconnect();
  console.log('👋 Done');
}

seed().catch(err => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
