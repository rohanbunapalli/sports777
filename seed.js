const mongoose = require('mongoose');
const Sport = require('./models/Sport');
const Item = require('./models/Item');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sports_website_db';

const sportsData = [
  {
    name: 'Cricket',
    description: 'A bat-and-ball game played between two teams of eleven players on a field.',
    importance: 'Highly popular in India. Fosters teamwork, fitness, and strategic thinking.',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1600'
  },
  {
    name: 'Football',
    description: 'A team sport played with a spherical ball between two teams of 11 players.',
    importance: 'The most popular sport globally. Improves cardiovascular health, teamwork, and agility.',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1600'
  },
  {
    name: 'Tennis',
    description: 'A racket sport played individually against a single opponent or between two teams of two players.',
    importance: 'Excellent for cardiovascular health, eye-hand coordination, and overall body strength.',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e11D?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1622279457486-62dcc4a631d6?auto=format&fit=crop&q=80&w=1600'
  },
  {
    name: 'Basketball',
    description: 'A team sport where two teams of five players compete to shoot a ball through the defender\'s hoop.',
    importance: 'Improves balance, coordination, and endurance. Builds muscle strength and promotes teamwork.',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1600'
  },
  {
    name: 'Badminton',
    description: 'A racquet sport played using racquets to hit a shuttlecock across a net.',
    importance: 'Increases heart rate, builds core strength, and improves reflexes.',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1572624535303-3112bd222cd6?auto=format&fit=crop&q=80&w=1600'
  },
  {
    name: 'Hockey',
    description: 'A team sport in which players attempt to score goals using sticks.',
    importance: 'Enhances stamina, speed, and lower body strength. Great for hand-eye coordination.',
    image: 'https://images.unsplash.com/photo-1628178652422-bbf4c1ea7981?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?auto=format&fit=crop&q=80&w=1600'
  },
  {
    name: 'Table Tennis',
    description: 'Players hit a lightweight ball back and forth across a table using small solid rackets.',
    importance: 'Improves mental acuity, burns calories, and is easy on the joints.',
    image: 'https://images.unsplash.com/photo-1534158914592-062992fbe000?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&q=80&w=1600'
  },
  {
    name: 'Volleyball',
    description: 'A team sport in which two teams of six players are separated by a net.',
    importance: 'Strengthens upper body, arms, and shoulders. Improves agility, balance, and coordination.',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&q=80&w=1600'
  },
  {
    name: 'Baseball',
    description: 'A bat-and-ball game played between two opposing teams who take turns batting and fielding.',
    importance: 'Develops overall fitness, hand-eye coordination, and fast decision-making skills.',
    image: 'https://images.unsplash.com/photo-1508344928928-7137b29de216?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1448318440207-ef1893eb8ac0?auto=format&fit=crop&q=80&w=1600'
  },
  {
    name: 'Swimming',
    description: 'An individual or team racing sport that requires the use of one\'s entire body to move through water.',
    importance: 'A full-body workout that improves cardiovascular fitness without stress on the joints.',
    image: 'https://images.unsplash.com/photo-1530549387799-d10fb9d07df3?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1519315901367-f34bf91587af?auto=format&fit=crop&q=80&w=1600'
  }
];

const itemsDataMap = {
  'Cricket': [
    { name: 'Cricket Bat', description: 'Used to hit the ball', price: 150, image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=400' },
    { name: 'Cricket Ball', description: 'A hard, solid ball used to play cricket', price: 20, image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&q=80&w=400' },
    { name: 'Batting Gloves', description: 'Protective gloves for batsman', price: 35, image: 'https://images.unsplash.com/photo-1631481878950-89196dcb2184?auto=format&fit=crop&q=80&w=400' },
    { name: 'Leg Pads', description: 'Protect the legs from impact', price: 80, image: 'https://images.unsplash.com/photo-1631627961917-0d588a4e3fa3?auto=format&fit=crop&q=80&w=400' }
  ],
  'Football': [
    { name: 'Football', description: 'Spherical ball used in the game', price: 30, image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&q=80&w=400' },
    { name: 'Football Cleats', description: 'Footwear with studs for grip', price: 120, image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=400' },
    { name: 'Shin Guards', description: 'Protects the shins', price: 25, image: 'https://images.unsplash.com/photo-1600679472829-3044539ce8ed?auto=format&fit=crop&q=80&w=400' },
    { name: 'Goalkeeper Gloves', description: 'Gloves for the goalkeeper', price: 40, image: 'https://images.unsplash.com/photo-1551000670-aa6203cf90f8?auto=format&fit=crop&q=80&w=400' }
  ],
  'Tennis': [
    { name: 'Tennis Racket', description: 'Used to strike the tennis ball', price: 150, image: 'https://images.unsplash.com/photo-1617083934555-bac67a6d8fc0?auto=format&fit=crop&q=80&w=400' },
    { name: 'Tennis Balls', description: 'Felt covered rubber balls (Can of 3)', price: 10, image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e11d?auto=format&fit=crop&q=80&w=400' },
    { name: 'Tennis Shoes', description: 'Specialized shoes for the court', price: 110, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=400' }
  ],
  'Basketball': [
    { name: 'Basketball', description: 'Orange synthetic/leather ball', price: 45, image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=400' },
    { name: 'Basketball Shoes', description: 'High-top sneakers for ankle support', price: 130, image: 'https://images.unsplash.com/photo-1588667368551-7892b1a13bc5?auto=format&fit=crop&q=80&w=400' },
    { name: 'Arm Sleeve', description: 'Compression sleeve for shooting arm', price: 15, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=400' }
  ],
  'Badminton': [
    { name: 'Badminton Racket', description: 'Lightweight racket', price: 80, image: 'https://images.unsplash.com/photo-1582885938883-9b84b659c258?auto=format&fit=crop&q=80&w=400' },
    { name: 'Shuttlecock', description: 'Feathered or plastic projectile (Tube of 6)', price: 25, image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=400' },
    { name: 'Badminton Net', description: 'Net for court', price: 40, image: 'https://images.unsplash.com/photo-1621255551351-46067b57cd67?auto=format&fit=crop&q=80&w=400' }
  ],
  'Hockey': [
    { name: 'Hockey Stick', description: 'Used to hit the puck/ball', price: 100, image: 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&q=80&w=400' },
    { name: 'Hockey Ball', description: 'Heavy solid ball', price: 15, image: 'https://images.unsplash.com/photo-1628178652422-bbf4c1ea7981?auto=format&fit=crop&q=80&w=400' },
    { name: 'Hockey Helmet', description: 'Protective headgear', price: 90, image: 'https://images.unsplash.com/photo-1601646274719-2166946924b1?auto=format&fit=crop&q=80&w=400' }
  ],
  'Table Tennis': [
    { name: 'Table Tennis Racket', description: 'Wooden paddle with rubber surface', price: 40, image: 'https://images.unsplash.com/photo-1620803522295-d6d71f544520?auto=format&fit=crop&q=80&w=400' },
    { name: 'Table Tennis Balls', description: 'Lightweight celluloid balls (Box of 6)', price: 8, image: 'https://images.unsplash.com/photo-1534158914592-062992fbe000?auto=format&fit=crop&q=80&w=400' },
    { name: 'Table Tennis Net', description: 'Portable net', price: 20, image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&q=80&w=400' }
  ],
  'Volleyball': [
    { name: 'Volleyball', description: 'Leather or synthetic ball', price: 35, image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=400' },
    { name: 'Knee Pads', description: 'Protection for knees when diving', price: 25, image: 'https://images.unsplash.com/photo-1582260661642-1268b8e8f8ce?auto=format&fit=crop&q=80&w=400' },
    { name: 'Volleyball Net', description: 'Standard net', price: 60, image: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&q=80&w=400' }
  ],
  'Baseball': [
    { name: 'Baseball Bat', description: 'Wooden or metal club', price: 80, image: 'https://images.unsplash.com/photo-1508344928928-7137b29de216?auto=format&fit=crop&q=80&w=400' },
    { name: 'Baseball Glove', description: 'Leather fielding glove', price: 60, image: 'https://images.unsplash.com/photo-1555026909-548ebfc47d79?auto=format&fit=crop&q=80&w=400' },
    { name: 'Baseball', description: 'Small ball with red stitching', price: 10, image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&q=80&w=400' },
    { name: 'Batting Helmet', description: 'Protective headgear', price: 45, image: 'https://images.unsplash.com/photo-1448318440207-ef1893eb8ac0?auto=format&fit=crop&q=80&w=400' }
  ],
  'Swimming': [
    { name: 'Swimming Goggles', description: 'Protects eyes underwater', price: 20, image: 'https://images.unsplash.com/photo-1584981156534-727cdd6e86fb?auto=format&fit=crop&q=80&w=400' },
    { name: 'Swim Cap', description: 'Silicone cap to reduce drag', price: 12, image: 'https://images.unsplash.com/photo-1530549387799-d10fb9d07df3?auto=format&fit=crop&q=80&w=400' },
    { name: 'Kickboard', description: 'Buoyant board for training', price: 25, image: 'https://images.unsplash.com/photo-1519315901367-f34bf91587af?auto=format&fit=crop&q=80&w=400' }
  ]
};

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Sport.deleteMany({});
    await Item.deleteMany({});
    console.log('Cleared existing data');

    // Insert Sports
    const createdSports = await Sport.insertMany(sportsData);
    console.log(`Inserted ${createdSports.length} sports`);

    // Insert Items
    let itemsToInsert = [];
    for (const sport of createdSports) {
      const spItems = itemsDataMap[sport.name] || [];
      const itemsWithSportId = spItems.map(item => ({
        ...item,
        sportId: sport._id
      }));
      itemsToInsert = [...itemsToInsert, ...itemsWithSportId];
    }

    if (itemsToInsert.length > 0) {
      await Item.insertMany(itemsToInsert);
      console.log(`Inserted ${itemsToInsert.length} sport items`);
    }

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
