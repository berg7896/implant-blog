// ============================================================
// BROWARD COUNTY CITIES + NEARBY - ~45 locations
// Each has: slug, name, county, distance from Coral Springs, zip, nearby landmarks
// ============================================================

module.exports = [
  // === CORE BROWARD - Close to Coral Springs ===
  { slug: 'coral-springs', name: 'Coral Springs', county: 'Broward', zip: '33065', distance: '0 min', nearby: 'Sawgrass Expressway, Coral Square Mall' },
  { slug: 'coconut-creek', name: 'Coconut Creek', county: 'Broward', zip: '33073', distance: '10 min', nearby: 'Promenade at Coconut Creek, Butterfly World' },
  { slug: 'parkland', name: 'Parkland', county: 'Broward', zip: '33076', distance: '10 min', nearby: 'Pine Trails Park, Terramar Park' },
  { slug: 'margate', name: 'Margate', county: 'Broward', zip: '33063', distance: '10 min', nearby: 'Calypso Cove Aquatic Facility' },
  { slug: 'tamarac', name: 'Tamarac', county: 'Broward', zip: '33321', distance: '15 min', nearby: 'Woodmont Natural Area, Colony West Golf Club' },
  { slug: 'north-lauderdale', name: 'North Lauderdale', county: 'Broward', zip: '33068', distance: '12 min', nearby: 'Hampton Pines Park' },
  { slug: 'lauderhill', name: 'Lauderhill', county: 'Broward', zip: '33313', distance: '15 min', nearby: 'Lauderhill Mall, Central Broward Regional Park' },

  // === CENTRAL BROWARD ===
  { slug: 'sunrise', name: 'Sunrise', county: 'Broward', zip: '33323', distance: '18 min', nearby: 'Sawgrass Mills Mall, BB&T Center, Amerant Bank Arena' },
  { slug: 'plantation', name: 'Plantation', county: 'Broward', zip: '33317', distance: '20 min', nearby: 'Plantation Preserve, Broward Mall, Westfield Broward' },
  { slug: 'lauderdale-lakes', name: 'Lauderdale Lakes', county: 'Broward', zip: '33319', distance: '15 min', nearby: 'Vincent Torres Park' },
  { slug: 'oakland-park', name: 'Oakland Park', county: 'Broward', zip: '33334', distance: '20 min', nearby: 'Funky Buddha Brewery district' },
  { slug: 'wilton-manors', name: 'Wilton Manors', county: 'Broward', zip: '33305', distance: '22 min', nearby: 'Wilton Drive, Richardson Historic Park' },

  // === EAST BROWARD / COASTAL ===
  { slug: 'fort-lauderdale', name: 'Fort Lauderdale', county: 'Broward', zip: '33301', distance: '25 min', nearby: 'Las Olas Blvd, Fort Lauderdale Beach, Galleria Mall' },
  { slug: 'pompano-beach', name: 'Pompano Beach', county: 'Broward', zip: '33060', distance: '20 min', nearby: 'Pompano Beach Pier, Festival Flea Market' },
  { slug: 'deerfield-beach', name: 'Deerfield Beach', county: 'Broward', zip: '33441', distance: '18 min', nearby: 'Deerfield Beach Pier, Quiet Waters Park' },
  { slug: 'lighthouse-point', name: 'Lighthouse Point', county: 'Broward', zip: '33064', distance: '20 min', nearby: 'Cap\'s Place, Hillsboro Inlet' },
  { slug: 'lauderdale-by-the-sea', name: 'Lauderdale-by-the-Sea', county: 'Broward', zip: '33308', distance: '25 min', nearby: 'Anglin\'s Fishing Pier' },

  // === WEST BROWARD ===
  { slug: 'weston', name: 'Weston', county: 'Broward', zip: '33326', distance: '25 min', nearby: 'Weston Town Center, Markham Park, Everglades nearby' },
  { slug: 'davie', name: 'Davie', county: 'Broward', zip: '33314', distance: '22 min', nearby: 'Nova Southeastern University, Bergeron Rodeo Grounds' },
  { slug: 'cooper-city', name: 'Cooper City', county: 'Broward', zip: '33328', distance: '25 min', nearby: 'Brian Piccolo Park, Embassy Creek Trail' },
  { slug: 'southwest-ranches', name: 'Southwest Ranches', county: 'Broward', zip: '33330', distance: '28 min', nearby: 'Country Estates, Rolling Oaks' },

  // === SOUTH BROWARD ===
  { slug: 'pembroke-pines', name: 'Pembroke Pines', county: 'Broward', zip: '33024', distance: '28 min', nearby: 'C.B. Smith Park, Pembroke Lakes Mall' },
  { slug: 'miramar', name: 'Miramar', county: 'Broward', zip: '33023', distance: '30 min', nearby: 'Miramar Regional Park, Ansin Sports Complex' },
  { slug: 'hollywood', name: 'Hollywood', county: 'Broward', zip: '33020', distance: '30 min', nearby: 'Hollywood Beach Broadwalk, Seminole Hard Rock' },
  { slug: 'hallandale-beach', name: 'Hallandale Beach', county: 'Broward', zip: '33009', distance: '35 min', nearby: 'Gulfstream Park, Village at Gulfstream' },
  { slug: 'dania-beach', name: 'Dania Beach', county: 'Broward', zip: '33004', distance: '28 min', nearby: 'IGFA Fishing Hall of Fame, Dania Pointe' },
  { slug: 'west-park', name: 'West Park', county: 'Broward', zip: '33023', distance: '32 min', nearby: 'near Hollywood and Pembroke Park' },
  { slug: 'pembroke-park', name: 'Pembroke Park', county: 'Broward', zip: '33023', distance: '30 min', nearby: 'near Hallandale and Hollywood' },

  // === NEARBY PALM BEACH COUNTY (High Value) ===
  { slug: 'boca-raton', name: 'Boca Raton', county: 'Palm Beach', zip: '33431', distance: '22 min', nearby: 'Mizner Park, Town Center Mall, FAU' },
  { slug: 'delray-beach', name: 'Delray Beach', county: 'Palm Beach', zip: '33444', distance: '30 min', nearby: 'Atlantic Avenue, Pineapple Grove' },
  { slug: 'boynton-beach', name: 'Boynton Beach', county: 'Palm Beach', zip: '33435', distance: '35 min', nearby: 'Boynton Beach Inlet' },

  // === NEARBY MIAMI-DADE (Close Border) ===
  { slug: 'aventura', name: 'Aventura', county: 'Miami-Dade', zip: '33180', distance: '35 min', nearby: 'Aventura Mall, Turnberry Isle' },
  { slug: 'miami-gardens', name: 'Miami Gardens', county: 'Miami-Dade', zip: '33056', distance: '30 min', nearby: 'Hard Rock Stadium' },
  { slug: 'north-miami-beach', name: 'North Miami Beach', county: 'Miami-Dade', zip: '33162', distance: '35 min', nearby: 'Oleta River State Park' },

  // === UNINCORPORATED / CENSUS-DESIGNATED PLACES ===
  { slug: 'the-crossings', name: 'The Crossings', county: 'Broward', zip: '33351', distance: '8 min', nearby: 'near Coral Springs, university area' },
  { slug: 'north-andrews-gardens', name: 'North Andrews Gardens', county: 'Broward', zip: '33309', distance: '18 min', nearby: 'near Oakland Park and Fort Lauderdale' },
  { slug: 'broadview-park', name: 'Broadview Park', county: 'Broward', zip: '33311', distance: '18 min', nearby: 'near Lauderhill and Plantation' },
  { slug: 'palm-aire', name: 'Palm Aire', county: 'Broward', zip: '33069', distance: '15 min', nearby: 'Palm Aire Country Club, near Pompano Beach' },
  { slug: 'hillsboro-pines', name: 'Hillsboro Pines', county: 'Broward', zip: '33442', distance: '15 min', nearby: 'near Deerfield Beach' },
  { slug: 'country-estates', name: 'Country Estates', county: 'Broward', zip: '33073', distance: '10 min', nearby: 'near Coconut Creek and Parkland' },
];
