import { 
  Place, 
  TourPackage, 
  TourGuide, 
  Hotel, 
  Restaurant, 
  CulinaryDish, 
  RealEstateProperty, 
  Product, 
  Review,
  Booking,
  Order,
  Enquiry
} from '../types';

export const SAMPLE_PLACES: Place[] = [
  {
    id: 'place-1',
    name: 'Isla Saona & Natural Swimming Pool',
    location: 'Bayahíbe, La Romana Province',
    state: 'La Romana / Cotubanamá',
    rating: 4.9,
    reviewCount: 3420,
    description: 'The crown jewel of the Dominican Republic, Isla Saona is a protected tropical paradise in Cotubanamá National Park. Famous for pristine white-sand palm beaches, crystal turquoise waters, and shallow natural waist-deep sandbars populated by giant red cushion starfish.',
    highlights: ['Natural Pool Waist-Deep Sandbar', 'Giant Cushion Starfish Sanctuary', 'Mano Juan Fishing Village', 'Catuano Channel Mangroves'],
    openingHours: 'Excursions depart 08:00 AM – 06:00 PM Daily',
    entryFee: 'National Park Permit $10 USD (Included in tours)',
    images: [
      '/assets/images/hero_isla_saona_caribbean_1793268342016.jpg',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Nature',
    coords: { x: 65, y: 72 },
    mapAddress: 'Parque Nacional Cotubanamá, Bayahíbe, La Romana 23000',
    relatedPlaceIds: ['place-2', 'place-4']
  },
  {
    id: 'place-2',
    name: 'Altos de Chavón & Roman Amphitheatre',
    location: 'La Romana, Dominican Republic',
    state: 'La Romana',
    rating: 4.88,
    reviewCount: 2890,
    description: 'A breathtaking 16th-century Mediterranean artisan village handcrafted from local coral stone perched 300 feet above the dramatic Río Chavón gorge. Features a 5,000-seat Grecian-style outdoor amphitheater inaugurated by Frank Sinatra, cobblestone alleys, and the Archaeological Regional Museum.',
    highlights: ['5,000-Seat Grecian Stone Amphitheater', 'Río Chavón Panoramic Overlook', 'St. Stanislaus Stone Chapel', 'Regional Pre-Columbian Museum'],
    openingHours: '08:00 AM – 09:00 PM Daily',
    entryFee: '$25 USD for non-residents (Free for resort guests)',
    images: [
      '/assets/images/altos_de_chavon_village_1793268343997.jpg',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Heritage',
    coords: { x: 42, y: 38 },
    mapAddress: 'Altos de Chavón, Casa de Campo, La Romana 22000',
    relatedPlaceIds: ['place-1', 'place-3']
  },
  {
    id: 'place-3',
    name: 'Cueva de las Maravillas (Cave of Wonders)',
    location: 'Carretera La Romana - San Pedro',
    state: 'La Romana',
    rating: 4.85,
    reviewCount: 1650,
    description: 'An ancient subterranean limestone cavern stretching 800 meters underground, featuring hundreds of authentic Taíno petroglyphs and pictographs dating back thousands of years. Illuminated with state-of-the-art eco-ramps and a serene subterranean mirror lake.',
    highlights: ['Taíno Indigenous Cave Art & Petroglyphs', 'Subterranean Mirror Lagoon', 'Iguana Sanctuary Park', 'Accessible Wheelchair Ramps'],
    openingHours: '09:00 AM – 05:00 PM (Closed Mondays)',
    entryFee: '$10 USD per adult / $5 USD children',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
      '/assets/images/altos_de_chavon_village_1793268343997.jpg'
    ],
    category: 'Spiritual',
    coords: { x: 25, y: 35 },
    mapAddress: 'Autovía del Este Km 16, La Romana 22000',
    relatedPlaceIds: ['place-2']
  },
  {
    id: 'place-4',
    name: 'Isla Catalina & The Wall Coral Drop-off',
    location: 'La Romana Coast Offshore',
    state: 'La Romana',
    rating: 4.92,
    reviewCount: 2120,
    description: 'An uninhabited 9.6-square-kilometer Caribbean island sanctuary famous for "The Wall" (El Muro) — a jaw-dropping submarine cliff plunging 100+ meters into the abyss encrusted with black coral, sea turtles, and vibrant tropical reef fish.',
    highlights: ['The Wall Coral Cliff Diving', 'The Aquarium Snorkeling Reef', 'Private White Sand Beach Club', 'Captain Kidd Pirate Shipwreck Trail'],
    openingHours: 'Catamaran excursions depart 08:30 AM – 05:00 PM',
    entryFee: '$120 USD (Full-day diving & snorkeling charter)',
    images: [
      '/assets/images/hero_isla_saona_caribbean_1793268342016.jpg',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Adventure',
    coords: { x: 38, y: 78 },
    mapAddress: 'Isla Catalina Offshore Marine Reserve, La Romana Port'
  }
];

export const SAMPLE_PACKAGES: TourPackage[] = [
  {
    id: 'pkg-1',
    name: 'Saona Island VIP Catamaran, Lobster Lunch & Starfish Lagoon',
    destination: 'Bayahíbe & Isla Saona, La Romana',
    pricePerPerson: 135,
    duration: 'Full Day (8 Hours)',
    rating: 4.96,
    reviewCount: 840,
    description: 'Cruise the sapphire Caribbean Sea aboard a luxury sailing catamaran to Isla Saona. Swim in the turquoise natural pools with giant starfish, enjoy an open bar with aged Dominican rum, and savor freshly grilled lobster on private Canto de la Playa sands.',
    images: [
      '/assets/images/hero_isla_saona_caribbean_1793268342016.jpg',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    itinerary: [
      { day: 1, title: 'Hotel Pickup in La Romana / Bayahíbe', details: 'Private air-conditioned transfer from your villa or resort to Bayahíbe Marina harbor.' },
      { day: 2, title: 'Sailing Catamaran & Caribbean Open Bar', details: 'Sail across the Caribbean Sea with merengue music, refreshing cocktails, and tropical fruits.' },
      { day: 3, title: 'Natural Pool & Starfish Sandbar', details: 'Anchor in waist-deep crystalline waters to observe giant red cushion starfish in their natural habitat.' },
      { day: 4, title: 'Isla Saona VIP Beach & Grilled Lobster', details: 'Private beach lounge beds, grilled Caribbean spiny lobster, tostones, and coconut rice buffet.' },
      { day: 5, title: 'Speedboat Return via Mangroves', details: 'Thrilling speedboat ride along Catuano channel mangroves back to Bayahíbe with sunset photo stops.' }
    ],
    inclusions: [
      'Roundtrip private transport from La Romana / Casa de Campo / Bayahíbe',
      'Luxury catamaran sail & return high-speed boat',
      'Gourmet beach buffet with fresh grilled Caribbean lobster',
      'Open bar featuring premium Dominican rum & local beer',
      'Cotubanamá National Park ecological entrance permits',
      'Certified marine guide & snorkel equipment'
    ],
    exclusions: [
      'Gratuities for catamaran crew',
      'Souvenir photos & drone video package'
    ],
    departureDates: ['2026-11-12', '2026-11-18', '2026-11-25', '2026-12-05', '2026-12-20'],
    meetingPoint: 'Bayahíbe Public Pier / Resort Lobby Pickup in La Romana',
    cancellationPolicy: 'Free cancellation up to 24 hours prior to departure with 100% refund.',
    guideId: 'guide-1'
  },
  {
    id: 'pkg-2',
    name: 'Altos de Chavón Cultural Tour & Río Chavón Riverboat Cruise',
    destination: 'Casa de Campo & Río Chavón, La Romana',
    pricePerPerson: 95,
    duration: '5 Hours',
    rating: 4.89,
    reviewCount: 520,
    description: 'Immerse yourself in Mediterranean stone architecture, artisanal pottery workshops, and St. Stanislaus Church at Altos de Chavón, followed by an authentic riverboat cruise along the lush tropical canyon where Apocalypse Now was filmed.',
    images: [
      '/assets/images/altos_de_chavon_village_1793268343997.jpg',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    itinerary: [
      { day: 1, title: 'Guided Architectural Walk of Altos de Chavón', details: 'Explore the 16th-century replica village designed by Roberto Coppa and stone craftsmen.' },
      { day: 2, title: 'Frank Sinatra Roman Amphitheater', details: 'Stand in the center of the world-famous 5,000-seat amphitheater.' },
      { day: 3, title: 'Pre-Columbian Taíno Archaeological Museum', details: 'Curated overview of indigenous Taíno artifacts, pottery, and ritual cemí stones.' },
      { day: 4, title: 'Río Chavón Mississippi Paddleboat Cruise', details: 'Gentle river cruise surrounded by 300-foot tropical canyon walls, wild herons, and mangrove trees.' }
    ],
    inclusions: [
      'Entry fees to Altos de Chavón and Museum',
      '1.5-hour private Río Chavón riverboat cruise',
      'Dominican coffee & artisan chocolate tasting',
      'English & Spanish bilingual historical guide'
    ],
    exclusions: ['Lunch', 'Personal shopping purchases'],
    departureDates: ['2026-11-14', '2026-11-21', '2026-12-02', '2026-12-16'],
    meetingPoint: 'Altos de Chavón Main Stone Plaza, La Romana',
    cancellationPolicy: 'Full refund up to 48 hours before the excursion.',
    guideId: 'guide-2'
  },
  {
    id: 'pkg-3',
    name: 'Catalina Island "The Wall" Diving & Marine Sanctuary',
    destination: 'Isla Catalina, La Romana Marine Reserve',
    pricePerPerson: 120,
    duration: '6 Hours',
    rating: 4.94,
    reviewCount: 460,
    description: 'Experience the Caribbean’s most celebrated underwater drop-off. Snorkel or scuba dive "The Wall" with sea turtles, stingrays, and yellowtail snappers, followed by Caribbean barbecue at Isla Catalina VIP beach.',
    images: [
      '/assets/images/hero_isla_saona_caribbean_1793268342016.jpg',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80'
    ],
    itinerary: [
      { day: 1, title: 'Marina La Romana Departure', details: 'Board comfortable twin-engine dive catamaran at La Romana Port.' },
      { day: 2, title: 'Dive Spot 1: The Wall (El Muro)', details: 'Drop-off from 5m down to 40m+ with pristine coral formations and marine life.' },
      { day: 3, title: 'Dive Spot 2: The Aquarium (El Acuario)', details: 'Shallow 8m coral garden with trumpet fish, lobsters, and elkhorn coral.' },
      { day: 4, title: 'Catalina Beach BBQ & Relaxation', details: 'Grilled Caribbean chicken, pork, salads, fresh tropical fruits, and open bar.' }
    ],
    inclusions: ['Complete snorkel gear (Scuba tanks for certified divers)', 'Marine park fee', 'Buffet lunch & Caribbean rum bar'],
    exclusions: ['Wetsuit rental', 'Underwater camera hire'],
    departureDates: ['2026-11-15', '2026-11-28', '2026-12-10', '2026-12-24'],
    meetingPoint: 'Marina de La Romana Tourist Terminal',
    cancellationPolicy: 'Free cancellation up to 48 hours prior to charter.',
    guideId: 'guide-3'
  },
  {
    id: 'pkg-4',
    name: 'Cueva de las Maravillas & Organic Cacao Plantation Safari',
    destination: 'Autovía del Este, La Romana Countryside',
    pricePerPerson: 85,
    duration: '4.5 Hours',
    rating: 4.91,
    reviewCount: 310,
    description: 'Venture 25 meters underground into limestone subterranean galleries featuring hundreds of pre-Columbian Taíno pictographs and stalactite formations, followed by an artisanal Dominican chocolate and aged rum tasting at a heritage plantation.',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80'
    ],
    itinerary: [
      { day: 1, title: 'Hotel Pickup & Scenic Countryside Drive', details: 'Air-conditioned safari truck through eastern sugarcane fields.' },
      { day: 2, title: 'Guided Cavern Walk & Taíno Rock Art', details: 'Illuminated ramps exploring mirror-lake cavern rooms and ancient indigenous art.' },
      { day: 3, title: 'Artisan Cacao Mill & Rum Tasting', details: 'Sample fresh cacao pulp, 100% dark Dominican chocolate, and aged Barceló Imperial rum.' }
    ],
    inclusions: [
      'Roundtrip transport from La Romana / Casa de Campo',
      'National Natural Monument entrance ticket',
      'Certified speleological bilingual guide',
      'Artisan chocolate & aged rum tasting flight'
    ],
    exclusions: ['Personal souvenir purchases'],
    departureDates: ['2026-11-16', '2026-11-23', '2026-12-04', '2026-12-18'],
    meetingPoint: 'Hotel Lobby / Cueva de las Maravillas Visitor Center',
    cancellationPolicy: 'Free cancellation up to 24 hours prior to safari.',
    guideId: 'guide-2'
  }
];

export const SAMPLE_GUIDES: TourGuide[] = [
  {
    id: 'guide-1',
    name: 'Carlos Santana Morales',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    languages: ['Spanish', 'English', 'French'],
    serviceAreas: ['La Romana', 'Bayahíbe', 'Isla Saona', 'Cotubanamá'],
    rating: 4.96,
    reviewCount: 285,
    perDayFee: 110,
    bio: 'Born in La Romana and licensed by the Dominican Ministry of Tourism (MITUR). With 12 years piloting catamarans and leading private excursions to Saona and Bayahíbe, I share authentic island folklore, marine biology, and hidden mangrove channels.',
    phone: '+1 (809) 556-2910',
    email: 'carlos.santana@oneplace.do',
    experienceYears: 12,
    verified: true
  },
  {
    id: 'guide-2',
    name: 'Elena Rodríguez Almonte',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    languages: ['Spanish', 'English', 'Italian'],
    serviceAreas: ['Altos de Chavón', 'Casa de Campo', 'Cueva de las Maravillas'],
    rating: 4.94,
    reviewCount: 340,
    perDayFee: 125,
    bio: 'Specialist in Caribbean colonial history and Taíno archaeology. I guide private walking tours through Altos de Chavón stone plazas and Cueva de las Maravillas, detailing indigenous mythology and Dominican artisan arts.',
    phone: '+1 (809) 813-4412',
    email: 'elena.rodriguez@oneplace.do',
    experienceYears: 10,
    verified: true
  },
  {
    id: 'guide-3',
    name: 'Mateo Peña Castillo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    languages: ['Spanish', 'English', 'German'],
    serviceAreas: ['Isla Catalina', 'Bayahíbe Reefs', 'St. George Shipwreck'],
    rating: 4.91,
    reviewCount: 190,
    perDayFee: 95,
    bio: 'PADI Master Scuba Diver and marine conservationist based in Bayahíbe. Expert in Caribbean reef restoration, stingray monitoring, and deep-wall drift diving along Catalina Island.',
    phone: '+1 (809) 757-8890',
    email: 'mateo.diving@oneplace.do',
    experienceYears: 9,
    verified: true
  }
];

export const SAMPLE_HOTELS: Hotel[] = [
  {
    id: 'hotel-1',
    name: 'Casa de Campo Resort & Villas',
    location: 'La Romana, Dominican Republic',
    priceRange: '$520 – $1,800 USD',
    pricePerNight: 580,
    rating: 4.97,
    reviewCount: 1140,
    description: 'The Dominican Republic’s premier 7,000-acre luxury destination. Boasts Pete Dye’s legendary Teeth of the Dog golf course, private white-sand Minitas Beach Club, international equestrian polo fields, world-class marina, and Altos de Chavón artisan village.',
    images: [
      '/assets/images/casa_de_campo_villa_caribbean_1793268344505.jpg',
      '/assets/images/altos_de_chavon_village_1793268343997.jpg',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Pete Dye Teeth of the Dog Golf', 'Private Minitas Beach Club', 'Equestrian Center & Polo', 'Full-Service Yacht Marina', 'Chavón Spa & Wellness Sanctuary', 'Personal 4-Passenger Touring Cart'],
    coords: { x: 44, y: 46 },
    address: 'Carretera La Romana - Higüey, La Romana 22000'
  },
  {
    id: 'hotel-2',
    name: 'Dreams Dominicus La Romana Resort & Spa',
    location: 'Bayahíbe Beach, La Romana',
    priceRange: '$290 – $650 USD',
    pricePerNight: 320,
    rating: 4.9,
    reviewCount: 780,
    description: 'An Italian-inspired beachfront luxury resort situated right on the blue-flag waters of Dominicus Beach. Features 4 pristine swimming pools, Dreams Spa by Pevonia, gourmet à la carte dining without reservations, and sunset catamaran charters.',
    images: [
      '/assets/images/hero_isla_saona_caribbean_1793268342016.jpg',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Blue Flag White Sand Beach', '4 Infinity & Lagoon Pools', 'Pevonia Luxury Spa', '8 Gourmet Dining Venues', 'Catamaran & Kayak Center'],
    coords: { x: 62, y: 64 },
    address: 'Playa Dominicus, Bayahíbe, La Romana 23000'
  },
  {
    id: 'hotel-3',
    name: 'Hilton La Romana All-Inclusive Adult Resort',
    location: 'Bayahíbe Coast, La Romana',
    priceRange: '$280 – $580 USD',
    pricePerNight: 310,
    rating: 4.88,
    reviewCount: 650,
    description: 'Nestled between a tranquil Caribbean cove and lush tropical forest. Known for breathtaking flaming sunsets, an expansive infinity pool, seaside open-air pavilions, and dive departures to Catalina Island.',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Oceanfront Infinity Pool', 'Scuba Dive Center', 'Hydrotherapy Circuit Spa', 'Caribbean Rum Tasting Bar'],
    coords: { x: 58, y: 56 },
    address: 'Playa Bayahíbe, La Romana 23000'
  }
];

export const SAMPLE_RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'La Casita Marina & Seafood Atelier',
    cuisine: 'Caribbean Seafood & Spanish Tapas',
    location: 'Marina Casa de Campo, La Romana',
    openingHours: '12:00 PM – 11:30 PM',
    rating: 4.91,
    reviewCount: 1420,
    images: [
      '/assets/images/casa_de_campo_villa_caribbean_1793268344505.jpg',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80'
    ],
    address: 'Paseo del Mar, Marina Casa de Campo, La Romana 22000',
    coords: { x: 46, y: 52 },
    signatureDishes: ['Paella Marinera de Mariscos', 'Chillo Entero Frito al Ajillo (Red Snapper)', 'Mofongo de Camarones', 'Langosta Caribeña a la Plancha'],
    priceLevel: '$$$$'
  },
  {
    id: 'rest-2',
    name: 'Chiquita Bar & Seafood Grill (Bayahíbe)',
    cuisine: 'Authentic Dominican Coastal Catch',
    location: 'Playa Bayahíbe Beachfront',
    openingHours: '11:00 AM – 10:00 PM',
    rating: 4.86,
    reviewCount: 980,
    images: [
      '/assets/images/hero_isla_saona_caribbean_1793268342016.jpg',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80'
    ],
    address: 'Calle La Bahía, Bayahíbe, La Romana 23000',
    coords: { x: 60, y: 62 },
    signatureDishes: ['Pescado al Coco de Samaná', 'Tostones Rellenos de Cangrejo', 'Chicharrón de Pollo Dominicano', 'Piña Colada en Coco Natural'],
    priceLevel: '$$'
  },
  {
    id: 'rest-3',
    name: 'El Mesón Dominicano (Downtown La Romana)',
    cuisine: 'Traditional Dominican Criollo & Sancocho',
    location: 'Centro Ciudad, La Romana',
    openingHours: '11:30 AM – 10:00 PM',
    rating: 4.82,
    reviewCount: 820,
    images: [
      '/assets/images/altos_de_chavon_village_1793268343997.jpg'
    ],
    address: 'Calle Castillo Márquez, La Romana 22000',
    coords: { x: 36, y: 40 },
    signatureDishes: ['Sancocho Dominicano de 7 Carnes', 'La Bandera Dominicana', 'Chivo Liniero Guisado con Yuca', 'Dulce de Leche Cortada'],
    priceLevel: '$$'
  }
];

export const SAMPLE_DISHES: CulinaryDish[] = [
  {
    id: 'dish-1',
    name: 'La Bandera Dominicana (National Heritage Dish)',
    regionalOrigin: 'Dominican Republic',
    description: 'The soul of Dominican cuisine: flavorful braised beef or chicken, fluffy white rice, savory stewed red kidney beans (habichuelas), served with golden crispy fried plantains (tostones) and fresh avocado.',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae7be?auto=format&fit=crop&w=800&q=80',
    recommendedSpots: ['El Mesón Dominicano, La Romana', 'La Casita Marina', 'Doña Pura Bayahíbe'],
    vegetarian: false,
    priceApprox: 14
  },
  {
    id: 'dish-2',
    name: 'Sancocho de Siete Carnes (Seven-Meat Feast Stew)',
    regionalOrigin: 'Dominican Republic',
    description: 'A legendary celebration stew slow-cooked with seven cuts of meat, yuca, green plantains, yautía, sweet corn on the cob, fresh cilantro, and sour orange juice. Traditional for festive gatherings.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    recommendedSpots: ['El Mesón Dominicano', 'Restaurante El Rincón Criollo'],
    vegetarian: false,
    priceApprox: 22
  },
  {
    id: 'dish-3',
    name: 'Mofongo de Chicharrón con Camarones al Ajillo',
    regionalOrigin: 'La Romana Coast',
    description: 'Green plantains fried and mashed in a wooden pilón mortar with garlic, olive oil, and crispy pork cracklings (chicharrón), topped with wild Caribbean pink shrimp in a savory garlic broth.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    recommendedSpots: ['La Casita Marina, Casa de Campo', 'Chiquita Bar & Grill'],
    vegetarian: false,
    priceApprox: 18
  },
  {
    id: 'dish-4',
    name: 'Mangú con Los Tres Golpes (Dominican Breakfast)',
    regionalOrigin: 'Dominican Republic',
    description: 'Velvety boiled green plantains whipped with farm butter, crowned with tangy pickled red onions (escabeche), served with the classic "Three Hits": fried Dominican salami, crispy fried cheese (queso frito), and sunny-side eggs.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    recommendedSpots: ['Café del Sol, Altos de Chavón', 'Lago Restaurant, Casa de Campo'],
    vegetarian: false,
    priceApprox: 12
  }
];

export const SAMPLE_PROPERTIES: RealEstateProperty[] = [
  {
    id: 'prop-1',
    title: '4 BHK Luxury Villa In Provident Ocean Park Square For Sale',
    propertyType: 'Luxury Villa',
    saleOrRent: 'Sale',
    price: 650000,
    priceFormatted: '$650,000 USD (₹ 65 Lacs eq.)',
    area: '5,900 Sq. Ft.',
    sqftNumber: 5900,
    location: 'Barranca Este, Casa de Campo, La Romana',
    shortDetails: '4 Bedrooms · 5 Baths · Private Oceanfront Pool · Boat Berth',
    status: 'Available',
    liveViewers: 3,
    badgeTag: 'Exclusive Deal',
    localityHint: 'Suggested property in nearby locality · Barranca Este',
    estimatedEmi: 'EMI: $3,254/Month',
    images: [
      '/assets/images/casa_de_campo_villa_caribbean_1793268344505.jpg',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80'
    ],
    bedrooms: 4,
    bathrooms: 5,
    furnishing: 'Fully Designer Furnished with Imported Coralina & Teak',
    description: 'An ultra-exclusive Caribbean oceanfront sanctuary inside Casa de Campo. Designed with double-height vaulted wood ceilings, infinity-edge swimming pool overlooking the Caribbean Sea, private tropical gazebo, chef show kitchen, separate staff quarters, and golf cart garages.',
    mediator: {
      name: 'Ramón Valdez de la Mota',
      phone: '+1 (809) 523-2270',
      company: 'Casa de Campo Real Estate & Luxury Advisory',
      experience: '18 Years in Luxury Caribbean Portfolios'
    },
    coords: { x: 45, y: 48 }
  },
  {
    id: 'prop-2',
    title: '2 BHK Flat In Provident Park Squarepark One For Sale',
    propertyType: 'Apartment',
    saleOrRent: 'Sale',
    price: 500000,
    priceFormatted: '$500,000 USD (₹ 50 Lacs eq.)',
    area: '1,590 Sq. Ft.',
    sqftNumber: 1590,
    location: 'Near Talaghattapura metro station, Jyotipuram, Kanakapura road',
    shortDetails: '2 Bedrooms · 2 Baths · Panoramic View · Balcony',
    status: 'Available',
    liveViewers: 2,
    badgeTag: 'Exclusive Deal',
    localityHint: 'Suggested property in nearby locality · Metro Corridor',
    estimatedEmi: 'EMI: $2,410/Month',
    images: [
      '/assets/images/altos_de_chavon_village_1793268343997.jpg',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    bedrooms: 2,
    bathrooms: 2,
    furnishing: 'Designer Turnkey Furnished with Stone Accents',
    description: 'Dramatic multi-level penthouse overlooking Dye Fore golf course and the winding Río Chavón. Features open-concept living, vaulted ceilings, coral stone bathrooms, and access to private community infinity pools.',
    mediator: {
      name: 'Carmen Betances',
      phone: '+1 (809) 556-9191',
      company: 'La Romana Premier Realty & Concierge',
      experience: '14 Years in Altos de Chavón Properties'
    },
    coords: { x: 42, y: 39 }
  },
  {
    id: 'prop-3',
    title: '3 BHK Beachfront Marina Condominium in Bayahíbe',
    propertyType: 'Apartment',
    saleOrRent: 'Sale',
    price: 340000,
    priceFormatted: '$340,000 USD',
    area: '1,850 Sq. Ft.',
    sqftNumber: 1850,
    location: 'Bayahíbe Marina, La Romana Coast',
    shortDetails: '3 Bedrooms · 2 Baths · Direct Caribbean Sunset Balcony',
    status: 'Available',
    liveViewers: 5,
    badgeTag: 'Verified Listing',
    localityHint: 'Suggested property in nearby locality · Bayahíbe Port',
    estimatedEmi: 'EMI: $1,680/Month',
    images: [
      '/assets/images/hero_isla_saona_caribbean_1793268342016.jpg',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80'
    ],
    bedrooms: 3,
    bathrooms: 2,
    furnishing: 'Modern Caribbean Coastal Decor',
    description: 'Charming beachfront residence steps from catamaran departures to Isla Saona and top seafood restaurants. High rental yield potential through international vacation charters.',
    mediator: {
      name: 'José Miguel Cedeño',
      phone: '+1 (809) 833-0104',
      company: 'Bayahíbe Coast & Island Realty',
      experience: '11 Years'
    },
    coords: { x: 61, y: 63 }
  },
  {
    id: 'prop-4',
    title: 'Vista Chavón Elevated Plot for Custom Caribbean Mansion',
    propertyType: 'Land Plot',
    saleOrRent: 'Sale',
    price: 1250000,
    priceFormatted: '$1,250,000 USD',
    area: '37,000 Sq. Ft. (0.85 Acres)',
    sqftNumber: 37000,
    location: 'Vista Chavón, Casa de Campo, La Romana',
    shortDetails: 'Direct Ocean & River View · Cleared Title · Architectural Permits Ready',
    status: 'Exclusive',
    liveViewers: 4,
    badgeTag: 'Prime Plot',
    localityHint: 'Suggested property in nearby locality · Vista Chavón Ridge',
    estimatedEmi: 'EMI: $6,120/Month',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      '/assets/images/casa_de_campo_villa_caribbean_1793268344505.jpg'
    ],
    description: 'A prized elevated building site in Casa de Campo offering unobstructed vistas where the turquoise Caribbean meets Río Chavón gorge. Prime location for a custom private luxury estate.',
    mediator: {
      name: 'Ramón Valdez de la Mota',
      phone: '+1 (809) 523-2270',
      company: 'Casa de Campo Real Estate & Luxury Advisory',
      experience: '18 Years'
    },
    coords: { x: 46, y: 44 }
  }
];

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Artisan Dominican Blue Larimar Pendant in Sterling Silver',
    category: 'Handicrafts',
    price: 165,
    originalPrice: 210,
    discountPercent: 21,
    rating: 4.98,
    reviewCount: 380,
    images: [
      '/assets/images/dominican_larimar_cigar_craft_1793268344267.jpg',
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Larimar is found in only one place on Earth: the mountains of the Dominican Republic. This AAA-grade volcanic pectolite stone displays vivid sky-blue and Caribbean turquoise ocean swirls, set by hand in solid 925 sterling silver filigree with a 20-inch box chain.',
    variants: ['Caribbean Sky Blue (22mm)', 'Deep Ocean Turquoise (28mm)', 'Oval Teardrop Cut'],
    inStock: true,
    artisanStory: 'Mined ethically in Barahona and crafted by master gem cutters at Altos de Chavón School of Design.'
  },
  {
    id: 'prod-2',
    name: 'Hand-Rolled La Romana Robusto Cigars (Cedar Box of 10)',
    category: 'Handicrafts',
    price: 180,
    originalPrice: 225,
    discountPercent: 20,
    rating: 4.95,
    reviewCount: 520,
    images: [
      '/assets/images/dominican_larimar_cigar_craft_1793268344267.jpg',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'La Romana is home to the world’s most prestigious cigar ateliers. Rolled by master tabaqueros using aged Dominican Piloto Cubano long-fillers wrapped in a silky Connecticut shade wrapper. Notes of cedar, roasted coffee, and creamy vanilla.',
    variants: ['Box of 10 Robustos', 'Box of 25 Toros', 'Master Artisan Sampler'],
    inStock: true,
    artisanStory: 'Cured and rolled in La Romana following over a century of traditional Dominican tobacco mastery.'
  },
  {
    id: 'prod-3',
    name: 'Ron Barceló Imperial Onyx & Dominican Cask Blend',
    category: 'Spices & Teas',
    price: 75,
    originalPrice: 95,
    discountPercent: 21,
    rating: 4.92,
    reviewCount: 440,
    images: [
      '/assets/images/dominican_larimar_cigar_craft_1793268344267.jpg',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Aged up to 10 years in heavy-charred ex-bourbon white oak barrels and filtered through authentic Dominican onyx stones. Delivers rich mahogany color with aromas of toasted oak, dried cherries, tobacco leaves, and bitter cocoa.',
    variants: ['750ml Gift Decanter', '1.75L Reserve Edition'],
    inStock: true,
    artisanStory: 'Produced from 100% pure Dominican sugar cane juice in the historic sugar cane plains of eastern Dominican Republic.'
  },
  {
    id: 'prod-4',
    name: 'Organic Hispaniola Single-Origin Cacao & Chocolate Box',
    category: 'Wellness & Pottery',
    price: 38,
    originalPrice: 48,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 290,
    images: [
      '/assets/images/dominican_larimar_cigar_craft_1793268344267.jpg'
    ],
    description: 'Organic single-origin 70% dark chocolate bars crafted from ancestral Dominican Criollo cacao beans, roasted with sea salt from Cabo Rojo and pure vanilla bean.',
    variants: ['4-Bar Tasting Flight', 'Artisan Cacao Butter & Truffle Box'],
    inStock: true,
    artisanStory: 'Harvested from certified organic family cooperatives in the lush eastern Dominican foothills.'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    targetId: 'pkg-1',
    targetType: 'package',
    authorName: 'Michael Sterling',
    rating: 5,
    date: '14 Oct 2026',
    comment: 'The Saona VIP catamaran excursion from Bayahíbe was perfection! Swimming with starfish in the natural lagoon while sipping rum cocktails was unforgettable. The grilled lobster lunch on the beach was world-class.',
    helpfulCount: 48
  },
  {
    id: 'rev-2',
    targetId: 'place-2',
    targetType: 'place',
    authorName: 'Valeria Gómez',
    rating: 5,
    date: '20 Oct 2026',
    comment: 'Altos de Chavón is like stepping into a fairytale Mediterranean village in the Caribbean. The panoramic views of the Chavón river gorge left us speechless.',
    helpfulCount: 35
  },
  {
    id: 'rev-3',
    targetId: 'hotel-1',
    targetType: 'hotel',
    authorName: 'David H. Brooks',
    rating: 5,
    date: '08 Oct 2026',
    comment: 'Casa de Campo is unmatched. Playing Teeth of the Dog along the Caribbean crashing waves and taking our golf cart down to Minitas Beach made this our best family vacation.',
    helpfulCount: 52
  },
  {
    id: 'rev-4',
    targetId: 'prod-1',
    targetType: 'product',
    authorName: 'Sophie Dubois',
    rating: 5,
    date: '22 Sep 2026',
    comment: 'The Larimar pendant is genuinely breathtaking. The natural turquoise and white cloud patterns reflect the exact color of the water at Saona Island.',
    helpfulCount: 19
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'OP-PKG-98241',
    packageId: 'pkg-1',
    packageName: 'Saona Island VIP Catamaran, Lobster Lunch & Starfish Lagoon',
    destination: 'Bayahíbe & Isla Saona, La Romana',
    image: '/assets/images/hero_isla_saona_caribbean_1793268342016.jpg',
    travelDate: '2026-11-20',
    guestsCount: 2,
    totalAmount: 270,
    bookingDate: '2026-10-25',
    status: 'Upcoming',
    guestDetails: {
      fullName: 'Alejandro De La Cruz',
      email: 'alejandro.delacruz@oneplace.do',
      phone: '+1 (809) 556-8821'
    },
    paymentMethod: 'Credit Card (Visa / Mastercard)'
  },
  {
    id: 'OP-PKG-77192',
    packageId: 'pkg-2',
    packageName: 'Altos de Chavón Cultural Tour & Río Chavón Riverboat Cruise',
    destination: 'Altos de Chavón & Río Chavón',
    image: '/assets/images/altos_de_chavon_village_1793268343997.jpg',
    travelDate: '2026-09-18',
    guestsCount: 2,
    totalAmount: 190,
    bookingDate: '2026-08-15',
    status: 'Completed',
    guestDetails: {
      fullName: 'Alejandro De La Cruz',
      email: 'alejandro.delacruz@oneplace.do',
      phone: '+1 (809) 556-8821'
    },
    paymentMethod: 'Amex Reserve'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'OP-ORD-48192',
    date: '2026-10-22',
    items: [
      {
        product: SAMPLE_PRODUCTS[0],
        quantity: 1,
        selectedVariant: 'Caribbean Sky Blue (22mm)'
      },
      {
        product: SAMPLE_PRODUCTS[2],
        quantity: 1,
        selectedVariant: '750ml Gift Decanter'
      }
    ],
    subtotal: 240,
    shipping: 15,
    tax: 12,
    total: 267,
    status: 'Shipped',
    address: {
      fullName: 'Alejandro De La Cruz',
      addressLine: 'Villa Palmeras 14, Los Altos',
      city: 'Casa de Campo, La Romana',
      postalCode: '22000',
      phone: '+1 (809) 556-8821'
    },
    paymentMethod: 'Credit Card'
  }
];

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'ENQ-9102',
    type: 'property',
    targetId: 'prop-1',
    targetName: 'Villa Las Palmas: Oceanfront Luxury Estate in Casa de Campo',
    submittedAt: '2026-10-24',
    customerName: 'Alejandro De La Cruz',
    customerPhone: '+1 (809) 556-8821',
    customerEmail: 'alejandro.delacruz@oneplace.do',
    message: 'Interested in a private tour of the villa this Saturday. Please share recent title deed confirmation and marina mooring specifications.',
    status: 'Mediator Contacted'
  },
  {
    id: 'ENQ-8821',
    type: 'guide',
    targetId: 'guide-1',
    targetName: 'Carlos Santana Morales',
    submittedAt: '2026-10-26',
    customerName: 'Alejandro De La Cruz',
    customerPhone: '+1 (809) 556-8821',
    customerEmail: 'alejandro.delacruz@oneplace.do',
    message: 'Looking for a private 40ft catamaran charter to Isla Saona for our family anniversary next month.',
    status: 'Received'
  }
];
