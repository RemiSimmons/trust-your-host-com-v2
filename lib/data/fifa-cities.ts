export interface FifaCity {
  id: string;
  name: string;
  displayName: string;
  emoji: string;
  stadium: {
    officialName: string;
    fifaName: string;
    capacity: number;
    matchesHosted: number;
    rounds: string[];
    address?: string;
    coordinates?: [number, number];
  };
  matches: Array<{
    date: string; // ISO format: "2026-06-15"
    round: string;
    time?: string;
  }>;
  neighborhoods: Array<{
    name: string;
    distanceKm: number;
    description: string;
    avgPriceRange?: string;
    transit: string[];
  }>;
  highlights: {
    attractions: string[];
    diningAreas: string[];
    nightlifeDistricts: string[];
    uniqueExperiences: string[];
  };
  practical: {
    airport: {
      code: string;
      name: string;
      distanceKm: number;
    };
    secondaryAirports?: Array<{
      code: string;
      distanceKm: number;
    }>;
    hotelRateNote: string;
    bestMonths: string[];
    transportTips: string[];
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    topSearchPhrases: string[];
    longTailKeywords: string[];
  };
  heroImage: string;
  propertyCount: number;
}

export const fifaCities: FifaCity[] = [
  {
    id: "new-york-new-jersey",
    name: "New York",
    displayName: "New York / New Jersey",
    emoji: "🗽",
    stadium: {
      officialName: "MetLife Stadium",
      fifaName: "New York / New Jersey Stadium",
      capacity: 87157,
      matchesHosted: 8,
      rounds: ["Group Stage", "Round of 32", "Round of 16", "Final"],
    },
    matches: [
      { date: "2026-06-13", round: "Group Stage" },
      { date: "2026-06-16", round: "Group Stage" },
      { date: "2026-07-19", round: "Final" },
    ],
    neighborhoods: [
      {
        name: "East Rutherford, NJ",
        distanceKm: 1,
        description: "Suburban area directly surrounding the stadium with limited walkable nightlife but very quick access on event days.",
        transit: ["Shuttle buses", "Rideshare zones", "Regional rail via Secaucus Junction"],
      },
      {
        name: "Secaucus, NJ",
        distanceKm: 8,
        description: "Hotel‑heavy suburb popular for stadium events with easy highway and rail access into Manhattan.",
        transit: ["NJ Transit rail to Secaucus Junction", "Event shuttles", "Buses toward MetLife"],
      },
      {
        name: "Jersey City, NJ (Waterfront)",
        distanceKm: 16,
        description: "Vibrant waterfront with skyline views, bars, and restaurants, offering a good balance of nightlife and access to Manhattan.",
        transit: ["PATH trains to Manhattan", "NJ Transit rail/bus connections to the Meadowlands"],
      },
      {
        name: "Midtown Manhattan, NY",
        distanceKm: 14,
        description: "Dense hotel and entertainment core with Broadway, Times Square, and major transit hubs.",
        transit: ["NJ Transit trains from Penn Station to Secaucus/Meadowlands", "Special event rail service"],
      },
      {
        name: "Hoboken, NJ",
        distanceKm: 13,
        description: "Lively, walkable waterfront neighborhood with bars and young local crowd and strong transit links.",
        transit: ["PATH to Manhattan", "NJ Transit from Hoboken Terminal toward Secaucus/Meadowlands"],
      },
    ],
    highlights: {
      attractions: [
        "Statue of Liberty & Ellis Island",
        "Times Square",
        "Central Park",
        "Empire State Building",
        "Metropolitan Museum of Art",
      ],
      diningAreas: [
        "Midtown (Broadway / Hell's Kitchen)",
        "SoHo & Greenwich Village",
        "Williamsburg (Brooklyn)",
        "Jersey City Waterfront",
      ],
      nightlifeDistricts: [
        "Lower East Side",
        "Meatpacking District",
        "Williamsburg",
        "Hoboken Waterfront",
      ],
      uniqueExperiences: [
        "Staten Island Ferry skyline ride",
        "High Line park walk",
        "Neighborhood food tours (Chinatown, Little Italy, Queens)",
        "Rooftop bars with Hudson River views",
      ],
    },
    practical: {
      airport: {
        code: "EWR",
        name: "Newark Liberty International Airport",
        distanceKm: 16,
      },
      secondaryAirports: [
        { code: "LGA", distanceKm: 24 },
        { code: "JFK", distanceKm: 40 },
      ],
      hotelRateNote: "World Cup and Final dates are seeing 200–400% price surges, with many chain hotels above $1,000 per night near the final weekend.",
      bestMonths: ["April", "May", "September", "October"],
      transportTips: [
        "Use NJ Transit special event trains from New York Penn Station or Secaucus to the Meadowlands.",
        "Avoid driving directly to the stadium without prepaid parking; traffic is intense on game days.",
        "Base in Manhattan, Jersey City, or Hoboken for broader dining/nightlife and take rail/shuttle on match days.",
      ],
    },
    seo: {
      metaTitle: "FIFA World Cup 2026 in New York - Vacation Rentals & Hotels",
      metaDescription: "Find perfect vacation rentals for FIFA 2026 in New York. 8 matches including the Final at MetLife Stadium. Book direct, save on fees. Properties starting from $200/night.",
      topSearchPhrases: [
        "New York World Cup 2026 accommodation",
        "hotels near MetLife Stadium World Cup",
        "vacation rentals New York New Jersey World Cup",
        "places to stay near MetLife Stadium",
        "New York World Cup fan accommodation",
      ],
      longTailKeywords: [
        "vacation rentals near MetLife Stadium New York",
        "affordable World Cup stays in New Jersey near stadium",
        "family friendly rentals near New York New Jersey Stadium",
        "New York World Cup 2026 apartments with easy stadium access",
        "Jersey City waterfront stays with train to MetLife Stadium",
      ],
    },
    heroImage: "/fifa-cities/new-york-new-jersey.jpg",
    propertyCount: 0,
  },
  {
    id: "miami-gardens",
    name: "Miami",
    displayName: "Miami Gardens",
    emoji: "🌴",
    stadium: {
      officialName: "Hard Rock Stadium",
      fifaName: "Miami Stadium",
      capacity: 65326,
      matchesHosted: 6,
      rounds: ["Group Stage", "Round of 32", "Round of 16"],
    },
    matches: [
      { date: "2026-06-19", round: "Group Stage" },
    ],
    neighborhoods: [
      {
        name: "Miami Gardens",
        distanceKm: 1,
        description: "Suburban residential area immediately around the stadium with limited walkability but fastest access on game days.",
        transit: ["Event shuttles", "Rideshare", "Park‑and‑ride lots", "Local buses to Metrorail hubs"],
      },
      {
        name: "Aventura",
        distanceKm: 11,
        description: "Upscale area with large malls, condos, and hotels catering to shoppers and cruise travelers.",
        transit: ["Broward/Miami‑Dade buses", "Rideshare"],
      },
      {
        name: "North Miami Beach",
        distanceKm: 11,
        description: "Diverse residential and commercial corridor between the beaches and stadium with mid‑range lodging.",
        transit: ["Local buses", "Rideshare (20–30 minute drives on match days)"],
      },
      {
        name: "Downtown Miami / Brickell",
        distanceKm: 26,
        description: "High‑rise core with nightlife, waterfront parks, and direct access to transit and airport.",
        transit: ["Metrorail", "Metromover", "Buses to northern hubs, then bus/rideshare to stadium"],
      },
      {
        name: "Miami Beach (South Beach)",
        distanceKm: 30,
        description: "Iconic beachfront district known for nightlife, Art Deco hotels, and restaurants.",
        transit: ["Buses", "Rideshare (allow extra time for causeway and event traffic)"],
      },
    ],
    highlights: {
      attractions: [
        "South Beach & Ocean Drive",
        "Wynwood Walls street art district",
        "Little Havana (Calle Ocho)",
        "Vizcaya Museum and Gardens",
        "Bayside Marketplace & Bayfront Park",
      ],
      diningAreas: [
        "Brickell",
        "Wynwood",
        "South Beach",
        "Coconut Grove",
      ],
      nightlifeDistricts: [
        "South Beach",
        "Wynwood",
        "Brickell",
      ],
      uniqueExperiences: [
        "Everglades airboat tours",
        "Cuban coffee and live music in Little Havana",
        "Art walks and breweries in Wynwood",
        "Sunset cruises from Biscayne Bay",
      ],
    },
    practical: {
      airport: {
        code: "MIA",
        name: "Miami International Airport",
        distanceKm: 24,
      },
      secondaryAirports: [
        { code: "FLL", distanceKm: 23 },
      ],
      hotelRateNote: "Major‑event nights can push mid‑range hotels in the metro area into the USD 500–900+ range, with beachfront and luxury properties much higher.",
      bestMonths: ["December", "January", "February", "March"],
      transportTips: [
        "Staying in Miami Gardens or Aventura minimizes travel time but offers fewer walkable attractions.",
        "Use rideshare or designated shuttles; parking sells out early on match days.",
        "Factor in heavy traffic if coming from the beaches or downtown during peak hours.",
      ],
    },
    seo: {
      metaTitle: "FIFA World Cup 2026 in Miami - Vacation Rentals & Hotels",
      metaDescription: "Find perfect vacation rentals for FIFA 2026 in Miami. 6 matches at Hard Rock Stadium. Book direct, save on fees. Properties starting from $180/night.",
      topSearchPhrases: [
        "Miami World Cup 2026 accommodation",
        "places to stay near Hard Rock Stadium",
        "Miami Gardens World Cup vacation rentals",
        "hotels near Hard Rock Stadium Miami",
        "Miami World Cup fan lodging",
      ],
      longTailKeywords: [
        "vacation rentals near Hard Rock Stadium Miami Gardens",
        "Miami World Cup 2026 stays with beach access",
        "family friendly Miami rentals near World Cup stadium",
        "affordable apartments near Hard Rock Stadium for World Cup",
        "Miami Gardens homes with parking for World Cup matches",
      ],
    },
    heroImage: "/fifa-cities/miami-gardens.jpg",
    propertyCount: 0,
  },
  {
    id: "atlanta",
    name: "Atlanta",
    displayName: "Atlanta",
    emoji: "🍑",
    stadium: {
      officialName: "Mercedes-Benz Stadium",
      fifaName: "Atlanta Stadium",
      capacity: 75000,
      matchesHosted: 8,
      rounds: ["Group Stage", "Round of 32", "Round of 16"],
    },
    matches: [
      { date: "2026-06-18", round: "Group Stage" },
    ],
    neighborhoods: [
      {
        name: "Downtown Atlanta",
        distanceKm: 0.5,
        description: "Central business and convention district directly around the stadium with large hotels and walkable access.",
        transit: ["GWCC/CNN Center MARTA station", "Dome MARTA station (beside the stadium)"],
      },
      {
        name: "Midtown",
        distanceKm: 3,
        description: "Lively arts and dining hub with high‑rises, Piedmont Park, and major attractions.",
        transit: ["MARTA rail (North–South line) connects Midtown stations directly to stadium‑area stops"],
      },
      {
        name: "Old Fourth Ward / Inman Park",
        distanceKm: 4,
        description: "Trendy BeltLine neighborhoods with bars, food halls, and walkable streets.",
        transit: ["MARTA rail plus short rideshare", "BeltLine and bike/scooter options toward downtown"],
      },
      {
        name: "Westside / Georgia Tech",
        distanceKm: 3,
        description: "Rapidly developing district with breweries, eateries, and loft‑style housing.",
        transit: ["Buses", "Scooters", "Short rideshare trips", "Some walkable routes to the stadium"],
      },
      {
        name: "Buckhead",
        distanceKm: 10,
        description: "Upscale district with luxury shopping, hotels, and nightlife.",
        transit: ["MARTA rail from Buckhead/Lindbergh to downtown stations near the stadium"],
      },
    ],
    highlights: {
      attractions: [
        "Georgia Aquarium",
        "World of Coca‑Cola",
        "Centennial Olympic Park",
        "Atlanta BeltLine",
        "Martin Luther King Jr. National Historical Park",
      ],
      diningAreas: [
        "Midtown",
        "Inman Park / Krog Street Market",
        "West Midtown",
        "Buckhead Village",
      ],
      nightlifeDistricts: [
        "Midtown",
        "Edgewood Avenue",
        "Buckhead",
      ],
      uniqueExperiences: [
        "BeltLine walking and brewery hopping",
        "Civil rights history tours",
        "Battery Atlanta (Braves entertainment district)",
        "Live music venues across Midtown and East Atlanta",
      ],
    },
    practical: {
      airport: {
        code: "ATL",
        name: "Hartsfield–Jackson Atlanta International Airport",
        distanceKm: 16,
      },
      hotelRateNote: "World Cup dates are seeing sharp increases; Atlanta is among host cities with 300%+ rate spikes compared to typical summer pricing.",
      bestMonths: ["March", "April", "May", "September", "October"],
      transportTips: [
        "Stay near MARTA rail for car‑free access; trains run directly from ATL airport to downtown and Midtown.",
        "Downtown stays offer easy walking to the stadium but quieter evenings than Midtown.",
        "Avoid driving/parking downtown on match days unless you prebook a garage.",
      ],
    },
    seo: {
      metaTitle: "FIFA World Cup 2026 in Atlanta - Vacation Rentals & Hotels",
      metaDescription: "Find perfect vacation rentals for FIFA 2026 in Atlanta. 8 matches at Mercedes-Benz Stadium. Book direct, save on fees. Properties starting from $150/night.",
      topSearchPhrases: [
        "Atlanta World Cup 2026 accommodation",
        "vacation rentals near Mercedes Benz Stadium",
        "hotels near Mercedes Benz Stadium Atlanta",
        "Atlanta downtown World Cup stays",
        "Atlanta World Cup fan lodging",
      ],
      longTailKeywords: [
        "Midtown Atlanta rentals with MARTA access to Mercedes Benz Stadium",
        "family friendly Atlanta vacation rentals near World Cup stadium",
        "walkable hotels near Mercedes Benz Stadium for World Cup matches",
        "Atlanta BeltLine apartments for World Cup 2026 visitors",
        "Buckhead luxury stays with easy transit to Mercedes Benz Stadium",
      ],
    },
    heroImage: "/fifa-cities/atlanta.jpg",
    propertyCount: 0,
  },
  {
    id: "boston",
    name: "Boston",
    displayName: "Boston area (Foxborough)",
    emoji: "🦞",
    stadium: {
      officialName: "Gillette Stadium",
      fifaName: "Boston Stadium",
      capacity: 65878,
      matchesHosted: 6,
      rounds: ["Group Stage", "Round of 32"],
    },
    matches: [],
    neighborhoods: [
      {
        name: "Foxborough",
        distanceKm: 0.5,
        description: "Small town surrounding the stadium with Patriot Place shopping, dining, and limited lodging.",
        transit: ["Special event trains from Boston", "Shuttles", "Driving and parking common"],
      },
      {
        name: "Mansfield",
        distanceKm: 12,
        description: "Suburban community with additional hotels and easy highway access.",
        transit: ["Commuter rail", "Car", "Shuttle options may operate on major event days"],
      },
      {
        name: "Providence, RI Downtown",
        distanceKm: 40,
        description: "Compact city center with hotels, restaurants, and walkable streets south of the stadium.",
        transit: ["Commuter rail and highway", "Match‑day trains or buses expected between Providence and Foxborough"],
      },
      {
        name: "Boston Back Bay",
        distanceKm: 45,
        description: "Elegant central Boston neighborhood with brownstones, shopping, and dining.",
        transit: ["MBTA commuter rail from Back Bay/South Station to Foxboro for select events", "Highway driving"],
      },
      {
        name: "Boston Seaport / Downtown",
        distanceKm: 46,
        description: "Modern waterfront and financial core with many hotels and nightlife options.",
        transit: ["Commuter rail from South Station", "Buses", "Rideshare"],
      },
    ],
    highlights: {
      attractions: [
        "Freedom Trail",
        "Faneuil Hall & Quincy Market",
        "Boston Common & Public Garden",
        "Boston Harbor & seaport",
        "Museum of Fine Arts",
      ],
      diningAreas: [
        "North End (Italian district)",
        "Back Bay",
        "Seaport District",
        "Cambridge (Harvard Square and Kendall)",
      ],
      nightlifeDistricts: [
        "Faneuil Hall / Quincy Market",
        "Seaport",
        "Lansdowne Street near Fenway Park",
      ],
      uniqueExperiences: [
        "Red Sox game or Fenway Park tour (if in season)",
        "Harbor cruises and whale watching",
        "Historic pub crawls along the Freedom Trail",
        "Day trips to Cape Cod or Salem",
      ],
    },
    practical: {
      airport: {
        code: "BOS",
        name: "Logan International Airport",
        distanceKm: 56,
      },
      hotelRateNote: "Hotel rates in both Boston and Providence increase significantly on major match days; expect event‑level pricing similar to playoff games and concerts.",
      bestMonths: ["May", "June", "September", "October"],
      transportTips: [
        "Match‑day commuter trains from Boston to Foxboro are the most convenient car‑free option.",
        "Staying in Boston gives more sightseeing and dining, but requires 45–60 minutes travel to the stadium.",
        "Driving to Gillette is common; prebook parking and plan for post‑match traffic delays.",
      ],
    },
    seo: {
      metaTitle: "FIFA World Cup 2026 in Boston - Vacation Rentals & Hotels",
      metaDescription: "Find perfect vacation rentals for FIFA 2026 in Boston. 6 matches at Gillette Stadium. Book direct, save on fees. Properties starting from $180/night.",
      topSearchPhrases: [
        "Boston World Cup 2026 accommodation",
        "places to stay near Gillette Stadium",
        "Foxborough World Cup vacation rentals",
        "hotels near Gillette Stadium Boston",
        "Boston World Cup fan lodging",
      ],
      longTailKeywords: [
        "vacation rentals near Gillette Stadium Foxborough for World Cup",
        "Boston Back Bay hotels with train to Gillette Stadium",
        "family friendly rentals between Boston and Foxborough World Cup",
        "Providence RI stays for World Cup matches at Gillette Stadium",
        "affordable hotels near Boston Stadium World Cup 2026",
      ],
    },
    heroImage: "/fifa-cities/boston.jpg",
    propertyCount: 0,
  },
  {
    id: "philadelphia",
    name: "Philadelphia",
    displayName: "Philadelphia",
    emoji: "🔔",
    stadium: {
      officialName: "Lincoln Financial Field",
      fifaName: "Philadelphia Stadium",
      capacity: 67594,
      matchesHosted: 6,
      rounds: ["Group Stage", "Round of 32"],
    },
    matches: [
      { date: "2026-06-19", round: "Group Stage" },
    ],
    neighborhoods: [
      {
        name: "South Philadelphia (Stadium District)",
        distanceKm: 0.5,
        description: "Area around the sports complex with event‑focused bars and easy walking access to the stadium.",
        transit: ["SEPTA Broad Street Line to NRG Station directly serves the sports complex"],
      },
      {
        name: "Center City",
        distanceKm: 5,
        description: "Downtown core with most of the city's hotels, dining, and shopping.",
        transit: ["SEPTA Broad Street Line runs from Center City stations to NRG Station in minutes"],
      },
      {
        name: "Old City",
        distanceKm: 6,
        description: "Historic neighborhood with cobblestone streets, Independence Hall, and nightlife.",
        transit: ["Subway and buses connect to the Broad Street Line for stadium access"],
      },
      {
        name: "Rittenhouse Square",
        distanceKm: 5,
        description: "Upscale residential and commercial area with restaurants and boutique hotels centered around a park.",
        transit: ["Short walk to Broad Street Line or rideshare to the stadium district"],
      },
      {
        name: "University City",
        distanceKm: 7,
        description: "College neighborhood with budget‑friendly eats and lodging near major universities.",
        transit: ["Trolleys", "Regional rail", "Buses connect through Center City to the Broad Street Line"],
      },
    ],
    highlights: {
      attractions: [
        "Independence Hall & Liberty Bell",
        "Philadelphia Museum of Art & Rocky Steps",
        "Reading Terminal Market",
        "Old City historic district",
        "Spruce Street Harbor Park (seasonal)",
      ],
      diningAreas: [
        "Reading Terminal and Center City",
        "South Philadelphia (Italian Market and cheesesteak spots)",
        "Fishtown",
        "Rittenhouse area",
      ],
      nightlifeDistricts: [
        "Fishtown",
        "Old City",
        "South Street",
      ],
      uniqueExperiences: [
        "Cheesesteak tastings at iconic sandwich shops",
        "Street art and mural tours",
        "Riverside pop‑up parks and beer gardens in summer",
        "Live music venues in Fishtown and South Street",
      ],
    },
    practical: {
      airport: {
        code: "PHL",
        name: "Philadelphia International Airport",
        distanceKm: 13,
      },
      hotelRateNote: "Rates near Center City and the stadium district increase sharply on match days, with popular hotels pricing similarly to playoff weekends and major concerts.",
      bestMonths: ["April", "May", "September", "October"],
      transportTips: [
        "Staying along the Broad Street Line makes match‑day travel simple and avoids parking hassles.",
        "Center City offers the widest range of food and nightlife while keeping a short subway ride to the stadium.",
        "Driving to the sports complex is feasible but garages fill early on high‑demand days.",
      ],
    },
    seo: {
      metaTitle: "FIFA World Cup 2026 in Philadelphia - Vacation Rentals & Hotels",
      metaDescription: "Find perfect vacation rentals for FIFA 2026 in Philadelphia. 6 matches at Lincoln Financial Field. Book direct, save on fees. Properties starting from $160/night.",
      topSearchPhrases: [
        "Philadelphia World Cup 2026 accommodation",
        "hotels near Lincoln Financial Field",
        "vacation rentals near Philadelphia stadium",
        "places to stay near Lincoln Financial Field World Cup",
        "Philadelphia World Cup fan lodging",
      ],
      longTailKeywords: [
        "South Philadelphia rentals walking distance to Lincoln Financial Field",
        "Center City hotels with subway to World Cup matches",
        "family friendly vacation rentals near Philadelphia Stadium 2026",
        "affordable apartments near Lincoln Financial Field for World Cup",
        "Philadelphia Old City stays with easy transit to stadium",
      ],
    },
    heroImage: "/fifa-cities/philadelphia.jpg",
    propertyCount: 0,
  },
  {
    id: "kansas-city",
    name: "Kansas City",
    displayName: "Kansas City",
    emoji: "🏈",
    stadium: {
      officialName: "GEHA Field at Arrowhead Stadium",
      fifaName: "Kansas City Stadium",
      capacity: 76640,
      matchesHosted: 6,
      rounds: ["Group Stage", "Round of 32", "Quarterfinal"],
    },
    matches: [
      { date: "2026-06-20", round: "Group Stage" },
    ],
    neighborhoods: [
      {
        name: "Stadium / Truman Sports Complex Area",
        distanceKm: 1,
        description: "Sports complex area with limited walkable amenities but quickest access for driving fans.",
        transit: ["Event shuttles", "Rideshare", "City buses with transfers from downtown"],
      },
      {
        name: "Downtown Kansas City",
        distanceKm: 11,
        description: "Central business and entertainment district with hotels, arenas, and streetcar.",
        transit: ["Buses and rideshare connect downtown to the stadium via I‑70"],
      },
      {
        name: "Crossroads Arts District",
        distanceKm: 11,
        description: "Trendy area with galleries, breweries, and lofts just south of downtown.",
        transit: ["Streetcar and buses to downtown plus rideshare to the stadium"],
      },
      {
        name: "Power & Light District",
        distanceKm: 11,
        description: "Bar and entertainment hub popular with sports fans for pre‑ and post‑game outings.",
        transit: ["Streetcar and buses, then rideshare to the stadium"],
      },
      {
        name: "Country Club Plaza",
        distanceKm: 16,
        description: "Upscale shopping and dining district with Spanish‑style architecture.",
        transit: ["Buses and rideshare (allow 20–30 minutes to reach the sports complex)"],
      },
    ],
    highlights: {
      attractions: [
        "National WWI Museum and Memorial",
        "Nelson‑Atkins Museum of Art",
        "Country Club Plaza",
        "Union Station",
        "Kansas City barbecue restaurants",
      ],
      diningAreas: [
        "Power & Light District",
        "Crossroads Arts District",
        "Country Club Plaza",
        "Westport",
      ],
      nightlifeDistricts: [
        "Power & Light District",
        "Westport",
        "Crossroads",
      ],
      uniqueExperiences: [
        "Sampling classic Kansas City BBQ joints",
        "First Fridays art walks in Crossroads",
        "Riding the free KC Streetcar through downtown",
        "Jazz clubs and live music venues",
      ],
    },
    practical: {
      airport: {
        code: "MCI",
        name: "Kansas City International Airport",
        distanceKm: 48,
      },
      hotelRateNote: "Kansas City is among the markets with the steepest projected hotel price jumps for World Cup dates, with large percentage increases over typical summer averages.",
      bestMonths: ["May", "June", "September", "October"],
      transportTips: [
        "Most visitors will drive or rideshare to the stadium; public transit is limited compared with some host cities.",
        "Staying downtown or in Power & Light balances nightlife with manageable travel times to the sports complex.",
        "Prebook parking for matches and budget extra time for highway congestion.",
      ],
    },
    seo: {
      metaTitle: "FIFA World Cup 2026 in Kansas City - Vacation Rentals & Hotels",
      metaDescription: "Find perfect vacation rentals for FIFA 2026 in Kansas City. 6 matches at GEHA Field at Arrowhead Stadium. Book direct, save on fees. Properties starting from $130/night.",
      topSearchPhrases: [
        "Kansas City World Cup 2026 accommodation",
        "places to stay near Arrowhead Stadium",
        "vacation rentals near GEHA Field",
        "hotels near Kansas City World Cup stadium",
        "Kansas City World Cup fan lodging",
      ],
      longTailKeywords: [
        "Kansas City vacation rentals with easy drive to Arrowhead Stadium",
        "downtown KC hotels near Power and Light for World Cup",
        "family friendly rentals near Kansas City Stadium 2026",
        "affordable stays near GEHA Field at Arrowhead for World Cup",
        "Kansas City BBQ district stays with shuttle to stadium",
      ],
    },
    heroImage: "/fifa-cities/kansas-city.jpg",
    propertyCount: 0,
  },
  {
    id: "dallas",
    name: "Dallas",
    displayName: "Dallas–Fort Worth (Arlington)",
    emoji: "🤠",
    stadium: {
      officialName: "AT&T Stadium",
      fifaName: "Dallas Stadium",
      capacity: 92967,
      matchesHosted: 9,
      rounds: ["Group Stage", "Round of 32", "Quarterfinal", "Semifinal"],
    },
    matches: [
      { date: "2026-06-20", round: "Group Stage" },
    ],
    neighborhoods: [
      {
        name: "Arlington Entertainment District",
        distanceKm: 1,
        description: "Area around AT&T Stadium and Globe Life Field with hotels, bars, and attractions geared to sports fans.",
        transit: ["Event shuttles", "Rideshare", "Parking", "Limited rail service directly to the stadium"],
      },
      {
        name: "Downtown Arlington",
        distanceKm: 3,
        description: "Small city center with restaurants, breweries, and mid‑range lodging.",
        transit: ["Local buses and rideshare to the stadium district"],
      },
      {
        name: "Downtown Dallas",
        distanceKm: 30,
        description: "Skyscraper‑filled core with museums, hotels, and rail connections.",
        transit: ["Regional rail plus rideshare or game‑day shuttles toward Arlington"],
      },
      {
        name: "Fort Worth Downtown / Stockyards nearby",
        distanceKm: 26,
        description: "Western‑flavored city center near historic Stockyards and cultural district.",
        transit: ["Highways and rideshare", "Event buses may connect major hotels to matches"],
      },
      {
        name: "Las Colinas / Irving",
        distanceKm: 20,
        description: "Business district between Dallas and Arlington with lakeside hotels and DART light rail links.",
        transit: ["Light rail to Dallas plus rideshare or bus connections to stadium"],
      },
    ],
    highlights: {
      attractions: [
        "AT&T Stadium tours",
        "Six Flags Over Texas (Arlington)",
        "Dealey Plaza and Sixth Floor Museum (Dallas)",
        "Fort Worth Stockyards",
        "Dallas Arts District and museums",
      ],
      diningAreas: [
        "Deep Ellum (Dallas)",
        "Bishop Arts District",
        "Fort Worth Sundance Square",
        "Arlington Entertainment District",
      ],
      nightlifeDistricts: [
        "Deep Ellum",
        "Uptown Dallas",
        "Fort Worth Stockyards",
      ],
      uniqueExperiences: [
        "Texas BBQ and steakhouse crawls",
        "Rodeo and cowboy culture in Fort Worth",
        "Live music venues in Deep Ellum",
        "Stadium and ballpark tours on non‑match days",
      ],
    },
    practical: {
      airport: {
        code: "DFW",
        name: "Dallas–Fort Worth International Airport",
        distanceKm: 23,
      },
      secondaryAirports: [
        { code: "DAL", distanceKm: 32 },
      ],
      hotelRateNote: "With nine matches, the Dallas–Arlington area is expected to have sustained high demand, with nightly rates far above standard summer pricing in the entertainment district.",
      bestMonths: ["March", "April", "October", "November"],
      transportTips: [
        "Staying in Arlington eliminates long game‑day commutes but offers less urban nightlife than Dallas or Fort Worth.",
        "If basing in Dallas or Fort Worth, consider group shuttles or shared rides to reduce parking costs.",
        "Summer heat is intense; plan for extra travel time and hydration when walking near the stadium.",
      ],
    },
    seo: {
      metaTitle: "FIFA World Cup 2026 in Dallas - Vacation Rentals & Hotels",
      metaDescription: "Find perfect vacation rentals for FIFA 2026 in Dallas. 9 matches including Semifinal at AT&T Stadium. Book direct, save on fees. Properties starting from $140/night.",
      topSearchPhrases: [
        "Dallas World Cup 2026 accommodation",
        "places to stay near AT&T Stadium",
        "Arlington World Cup vacation rentals",
        "hotels near Dallas World Cup stadium",
        "Dallas Fort Worth World Cup fan lodging",
      ],
      longTailKeywords: [
        "vacation rentals walking distance to AT&T Stadium Arlington",
        "family friendly Arlington homes near World Cup stadium",
        "Dallas Deep Ellum hotels with shuttle to AT&T Stadium",
        "affordable stays near Dallas Stadium for World Cup matches",
        "Fort Worth Stockyards rentals with easy drive to AT&T Stadium",
      ],
    },
    heroImage: "/fifa-cities/dallas.jpg",
    propertyCount: 0,
  },
  {
    id: "houston",
    name: "Houston",
    displayName: "Houston",
    emoji: "🚀",
    stadium: {
      officialName: "NRG Stadium",
      fifaName: "Houston Stadium",
      capacity: 72220,
      matchesHosted: 7,
      rounds: ["Group Stage", "Round of 32", "Round of 16"],
    },
    matches: [
      { date: "2026-06-21", round: "Group Stage" },
    ],
    neighborhoods: [
      {
        name: "NRG / Texas Medical Center Area",
        distanceKm: 1,
        description: "Zone around the stadium and massive medical complex with many hotels and apartments.",
        transit: ["METRORail Red Line stops at or near the stadium and connects to downtown"],
      },
      {
        name: "Museum District",
        distanceKm: 6,
        description: "Leafy cultural area with museums and Hermann Park.",
        transit: ["METRORail Red Line offers quick rides to NRG and downtown"],
      },
      {
        name: "Midtown",
        distanceKm: 8,
        description: "Lively neighborhood with bars, restaurants, and mid‑rise apartments just south of downtown.",
        transit: ["METRORail links Midtown stations directly to NRG and downtown"],
      },
      {
        name: "Downtown Houston",
        distanceKm: 10,
        description: "Business and entertainment core with arenas, hotels, and tunnels.",
        transit: ["METRORail Red Line from downtown to NRG", "Buses", "Rideshare"],
      },
      {
        name: "Galleria / Uptown",
        distanceKm: 13,
        description: "Major shopping district with high‑rise hotels and dining.",
        transit: ["Primarily car or rideshare (allow extra time during rush hours)"],
      },
    ],
    highlights: {
      attractions: [
        "Space Center Houston",
        "Houston Museum of Natural Science",
        "Museum of Fine Arts Houston",
        "Houston Zoo & Hermann Park",
        "Buffalo Bayou Park",
      ],
      diningAreas: [
        "Montrose",
        "Midtown",
        "Downtown (Main Street area)",
        "Galleria / Uptown",
      ],
      nightlifeDistricts: [
        "Midtown",
        "Washington Avenue corridor",
        "Downtown",
      ],
      uniqueExperiences: [
        "Space Center tours and NASA exhibits",
        "International food scene reflecting Houston's diverse communities",
        "Bayou kayaking or biking trails",
        "Rooftop bars with skyline views",
      ],
    },
    practical: {
      airport: {
        code: "IAH",
        name: "George Bush Intercontinental Airport",
        distanceKm: 50,
      },
      secondaryAirports: [
        { code: "HOU", distanceKm: 22 },
      ],
      hotelRateNote: "Houston shows some of the highest projected percentage increases in nightly hotel rates for World Cup dates, especially around NRG and central districts.",
      bestMonths: ["March", "April", "October", "November"],
      transportTips: [
        "Choose lodging along the METRORail Red Line for easy car‑free stadium access.",
        "Parking at NRG is plentiful but can be costly and time‑consuming after matches.",
        "Summer heat and humidity are intense; consider indoor connections or short rideshare hops.",
      ],
    },
    seo: {
      metaTitle: "FIFA World Cup 2026 in Houston - Vacation Rentals & Hotels",
      metaDescription: "Find perfect vacation rentals for FIFA 2026 in Houston. 7 matches at NRG Stadium. Book direct, save on fees. Properties starting from $120/night.",
      topSearchPhrases: [
        "Houston World Cup 2026 accommodation",
        "places to stay near NRG Stadium",
        "Houston vacation rentals near World Cup stadium",
        "hotels near NRG Stadium World Cup",
        "Houston World Cup fan lodging",
      ],
      longTailKeywords: [
        "vacation rentals walking distance to NRG Stadium Houston",
        "Houston Medical Center apartments for World Cup fans",
        "family friendly rentals near Houston Stadium 2026",
        "Midtown Houston hotels with rail to NRG Stadium",
        "affordable Houston stays along METRORail for World Cup",
      ],
    },
    heroImage: "/fifa-cities/houston.jpg",
    propertyCount: 0,
  },
  {
    id: "seattle",
    name: "Seattle",
    displayName: "Seattle",
    emoji: "🌲",
    stadium: {
      officialName: "Lumen Field",
      fifaName: "Seattle Stadium",
      capacity: 68000,
      matchesHosted: 6,
      rounds: ["Group Stage", "Round of 32"],
    },
    matches: [
      { date: "2026-06-26", round: "Group Stage" },
    ],
    neighborhoods: [
      {
        name: "SoDo / Stadium District",
        distanceKm: 0.5,
        description: "Industrial‑meets‑entertainment area surrounding the stadiums with bars and event parking.",
        transit: ["Link light rail", "Commuter rail stop at Stadium/King Street stations"],
      },
      {
        name: "Pioneer Square",
        distanceKm: 1,
        description: "Historic district with brick buildings, pubs, and galleries just north of the stadium.",
        transit: ["Walkable to the stadium", "Light rail and buses converge at nearby hubs"],
      },
      {
        name: "Downtown Seattle",
        distanceKm: 1.5,
        description: "Central business district with hotels, shopping, and waterfront access.",
        transit: ["Light rail", "Buses", "Streetcar connect through downtown to Stadium station"],
      },
      {
        name: "Belltown",
        distanceKm: 3,
        description: "Trendy area with restaurants, bars, and waterfront views north of downtown.",
        transit: ["Short rideshare or bus ride", "Walkable if you enjoy longer city walks"],
      },
      {
        name: "Capitol Hill",
        distanceKm: 3.5,
        description: "Lively, artsy neighborhood known for nightlife and dining.",
        transit: ["Light rail and buses link Capitol Hill station to downtown and the stadium area"],
      },
    ],
    highlights: {
      attractions: [
        "Pike Place Market",
        "Space Needle and Seattle Center",
        "Seattle Waterfront and ferries",
        "Chihuly Garden and Glass",
        "Kerry Park viewpoint",
      ],
      diningAreas: [
        "Pike Place / Downtown",
        "Capitol Hill",
        "Belltown",
        "Ballard",
      ],
      nightlifeDistricts: [
        "Capitol Hill",
        "Belltown",
        "Pioneer Square",
      ],
      uniqueExperiences: [
        "Ferry rides across Puget Sound",
        "Coffee shop hopping in Seattle's original café scene",
        "Day trips to nearby islands or mountains",
        "Craft brewery and cidery tours",
      ],
    },
    practical: {
      airport: {
        code: "SEA",
        name: "Seattle–Tacoma International Airport",
        distanceKm: 19,
      },
      hotelRateNote: "Seattle's central hotels already run at premium pricing; expect World Cup nights to command substantial surcharges near downtown and the stadium district.",
      bestMonths: ["June", "July", "August", "September"],
      transportTips: [
        "Link light rail connects the airport directly to downtown and Stadium station.",
        "Staying in Pioneer Square, downtown, or SoDo allows walking access to matches.",
        "Parking near the stadium is limited and expensive; transit and walking are preferred.",
      ],
    },
    seo: {
      metaTitle: "FIFA World Cup 2026 in Seattle - Vacation Rentals & Hotels",
      metaDescription: "Find perfect vacation rentals for FIFA 2026 in Seattle. 6 matches at Lumen Field. Book direct, save on fees. Properties starting from $170/night.",
      topSearchPhrases: [
        "Seattle World Cup 2026 accommodation",
        "places to stay near Lumen Field",
        "Seattle vacation rentals near stadium",
        "hotels near Lumen Field World Cup",
        "Seattle World Cup fan lodging",
      ],
      longTailKeywords: [
        "vacation rentals walking distance to Lumen Field Seattle",
        "Pioneer Square apartments for World Cup 2026 visitors",
        "family friendly Seattle stays near stadium district",
        "Seattle downtown hotels with easy walk to Lumen Field",
        "affordable Seattle rentals along light rail for World Cup",
      ],
    },
    heroImage: "/fifa-cities/seattle.jpg",
    propertyCount: 0,
  },
  {
    id: "san-francisco",
    name: "San Francisco",
    displayName: "San Francisco Bay Area (Santa Clara)",
    emoji: "🌉",
    stadium: {
      officialName: "Levi's Stadium",
      fifaName: "San Francisco Stadium",
      capacity: 68500,
      matchesHosted: 6,
      rounds: ["Group Stage", "Round of 32", "Quarterfinal"],
    },
    matches: [
      { date: "2026-06-21", round: "Group Stage" },
    ],
    neighborhoods: [
      {
        name: "Santa Clara (Great America / Stadium Area)",
        distanceKm: 0.5,
        description: "Immediate area around the stadium with hotels, offices, and amusement park.",
        transit: ["Caltrain", "VTA light rail", "Buses serve the stadium on event days"],
      },
      {
        name: "Downtown San Jose",
        distanceKm: 15,
        description: "Urban core of Silicon Valley with hotels, restaurants, and nightlife.",
        transit: ["Caltrain and light rail connect to Santa Clara", "Rideshare common for late‑night returns"],
      },
      {
        name: "Sunnyvale",
        distanceKm: 13,
        description: "Suburban city with tech campuses and mid‑range lodging between Santa Clara and Mountain View.",
        transit: ["Caltrain and buses", "Short drives to the stadium"],
      },
      {
        name: "Mountain View",
        distanceKm: 20,
        description: "Walkable downtown with restaurants and access to tech campuses.",
        transit: ["Caltrain and VTA light rail provide regional connectivity"],
      },
      {
        name: "San Francisco (SoMa / Financial District)",
        distanceKm: 70,
        description: "Major tourism and business hub offering dense attractions and nightlife far north of the stadium.",
        transit: ["Caltrain from San Francisco to South Bay plus connecting services (travel times often exceed one hour each way)"],
      },
    ],
    highlights: {
      attractions: [
        "Golden Gate Bridge (San Francisco)",
        "Fisherman's Wharf & Pier 39",
        "Alcatraz Island tours",
        "Downtown San Jose & Tech Museum",
        "Winchester Mystery House (San Jose)",
      ],
      diningAreas: [
        "San Francisco SoMa and North Beach",
        "San Jose Downtown and Santana Row",
        "Palo Alto University Avenue",
        "Mountain View Castro Street",
      ],
      nightlifeDistricts: [
        "San Francisco Mission District and SoMa",
        "San Jose Downtown",
        "Palo Alto and Mountain View corridors",
      ],
      uniqueExperiences: [
        "Silicon Valley campus visits and tech museums",
        "Bay cruises and island tours from San Francisco",
        "Wine country day trips to Napa or Sonoma",
        "Cycling or hiking with bay and mountain views",
      ],
    },
    practical: {
      airport: {
        code: "SJC",
        name: "San Jose Mineta International Airport",
        distanceKm: 10,
      },
      secondaryAirports: [
        { code: "SFO", distanceKm: 55 },
        { code: "OAK", distanceKm: 60 },
      ],
      hotelRateNote: "Bay Area hotel prices are high even in normal years; analysis shows some of the largest percentage World Cup surcharges near Levi's Stadium.",
      bestMonths: ["April", "May", "September", "October"],
      transportTips: [
        "Consider basing in Santa Clara, San Jose, or Sunnyvale for shorter stadium commutes.",
        "Caltrain and VTA light rail are valuable on match days; check special event schedules.",
        "Driving and parking near Levi's Stadium is possible but heavily regulated; prebook where available.",
      ],
    },
    seo: {
      metaTitle: "FIFA World Cup 2026 in San Francisco - Vacation Rentals & Hotels",
      metaDescription: "Find perfect vacation rentals for FIFA 2026 in San Francisco Bay Area. 6 matches at Levi's Stadium. Book direct, save on fees. Properties starting from $190/night.",
      topSearchPhrases: [
        "San Francisco Bay Area World Cup 2026 accommodation",
        "places to stay near Levi's Stadium",
        "Santa Clara World Cup vacation rentals",
        "hotels near Levi's Stadium World Cup",
        "San Jose World Cup fan lodging",
      ],
      longTailKeywords: [
        "vacation rentals walking distance to Levi's Stadium Santa Clara",
        "San Jose downtown hotels with light rail to Levi's Stadium",
        "family friendly Bay Area rentals near World Cup stadium",
        "affordable Silicon Valley stays for World Cup 2026 matches",
        "San Francisco city stays with Caltrain access to Levi's Stadium",
      ],
    },
    heroImage: "/fifa-cities/san-francisco.jpg",
    propertyCount: 0,
  },
  {
    id: "los-angeles",
    name: "Los Angeles",
    displayName: "Los Angeles",
    emoji: "🌟",
    stadium: {
      officialName: "SoFi Stadium",
      fifaName: "Los Angeles Stadium",
      capacity: 70000,
      matchesHosted: 8,
      rounds: ["Group Stage", "Round of 32", "Quarterfinal"],
    },
    matches: [
      { date: "2026-06-15", round: "Group Stage" },
      { date: "2026-06-16", round: "Group Stage" },
    ],
    neighborhoods: [
      {
        name: "Inglewood",
        distanceKm: 1,
        description: "Neighborhood surrounding SoFi Stadium with a growing number of hotels and game‑day venues.",
        transit: ["K Line", "Shuttle buses serve SoFi", "Rideshare common for late‑night returns"],
      },
      {
        name: "Culver City",
        distanceKm: 7,
        description: "Central Westside hub with restaurants, studios, and mid‑range lodging.",
        transit: ["Metro E Line rail plus buses and rideshare to SoFi", "Drives to Rose Bowl via freeways"],
      },
      {
        name: "Downtown Los Angeles",
        distanceKm: 19,
        description: "Revitalized city center with high‑rise hotels, arenas, and nightlife.",
        transit: ["Multiple Metro rail lines and buses", "Transfers needed for both stadiums plus rideshare segments"],
      },
      {
        name: "Pasadena",
        distanceKm: 35,
        description: "Charming city with Old Town shopping and dining adjacent to the Rose Bowl.",
        transit: ["Metro L Line light rail to Old Pasadena", "Shuttles or walks to the Rose Bowl on event days"],
      },
      {
        name: "Santa Monica",
        distanceKm: 20,
        description: "Beachfront city with a walkable downtown, pier, and many hotels.",
        transit: ["Metro E Line rail to downtown LA plus transfers", "Many visitors rely on rideshare to stadiums"],
      },
    ],
    highlights: {
      attractions: [
        "Santa Monica Pier and Beach",
        "Hollywood Walk of Fame & TCL Chinese Theatre",
        "Griffith Observatory and Hollywood Sign viewpoints",
        "Getty Center",
        "Venice Beach Boardwalk",
      ],
      diningAreas: [
        "Downtown LA (Arts District and Historic Core)",
        "Koreatown",
        "Santa Monica and Venice",
        "Pasadena Old Town",
      ],
      nightlifeDistricts: [
        "Hollywood",
        "Downtown LA",
        "Koreatown",
        "West Hollywood",
      ],
      uniqueExperiences: [
        "Studio tours in Burbank or Hollywood",
        "Hikes in Griffith Park with skyline and sign views",
        "Beach biking from Santa Monica to Venice",
        "Food truck and multicultural dining scene across the city",
      ],
    },
    practical: {
      airport: {
        code: "LAX",
        name: "Los Angeles International Airport",
        distanceKm: 6,
      },
      secondaryAirports: [
        { code: "BUR", distanceKm: 32 },
        { code: "LGB", distanceKm: 32 },
      ],
      hotelRateNote: "Greater LA has vast hotel inventory, but prices around Inglewood, Pasadena, and major tourist areas climb steeply for match days, especially for centrally located and beachfront properties.",
      bestMonths: ["April", "May", "September", "October"],
      transportTips: [
        "Metro rail and buses help but the region remains car‑centric; budget for rideshare or rental cars especially at night.",
        "Staying near SoFi in Inglewood or near the Rose Bowl in Pasadena minimizes event‑day travel stress.",
        "Traffic can be heavy at almost any time; allow generous buffers around match kickoff and security checks.",
      ],
    },
    seo: {
      metaTitle: "FIFA World Cup 2026 in Los Angeles - Vacation Rentals & Hotels",
      metaDescription: "Find perfect vacation rentals for FIFA 2026 in Los Angeles. 8 matches at SoFi Stadium. Book direct, save on fees. Properties starting from $180/night.",
      topSearchPhrases: [
        "Los Angeles World Cup 2026 accommodation",
        "places to stay near SoFi Stadium",
        "Pasadena World Cup vacation rentals near Rose Bowl",
        "hotels near SoFi Stadium World Cup",
        "LA World Cup fan lodging",
      ],
      longTailKeywords: [
        "vacation rentals walking distance to SoFi Stadium Inglewood",
        "Pasadena Old Town rentals near Rose Bowl Stadium World Cup",
        "family friendly LA rentals with easy access to SoFi and Rose Bowl",
        "affordable Los Angeles World Cup stays near Metro lines",
        "Santa Monica beach hotels with transit to SoFi Stadium matches",
      ],
    },
    heroImage: "/fifa-cities/los-angeles.jpg",
    propertyCount: 0,
  },
];

export const fifaCitiesMap = new Map(
  fifaCities.map(city => [city.id, city])
);

export function getCityById(id: string): FifaCity | undefined {
  return fifaCitiesMap.get(id);
}

export function getCityByName(name: string): FifaCity | undefined {
  return fifaCities.find(city => 
    city.name.toLowerCase() === name.toLowerCase() ||
    city.displayName.toLowerCase() === name.toLowerCase()
  );
}
