// Filter configuration for experience categories
// Universal filters apply to all 12 experiences
// Experience-specific filters are unique to each experience type

export const filterConfig = {
  // ============================================
  // UNIVERSAL FILTERS (apply to all experiences)
  // ============================================

  // Guests: Range 1-16, Default: 2
  guests: {
    min: 1,
    max: 16,
    default: 2,
    type: "increment-decrement", // Use increment/decrement selector
  },

  // Price Range: $50-$10000, Default: $50-$500
  priceRange: {
    label: "Typical Nightly Rate",
    min: 50,
    max: 10000,
    default: [50, 500],
    type: "dual-thumb-slider", // Use dual-thumb slider
  },

  // Property Type: Radio buttons, single select
  propertyTypes: [
    { id: "entire-home", label: "Entire Home" },
    { id: "private-room", label: "Private Room" },
    { id: "shared-space", label: "Shared Space" },
    { id: "unique-specialty", label: "Unique/Specialty Stay" },
  ],
  propertyTypeDefault: null, // No default selection

  // Booking Platform: Checkboxes, multi-select
  bookingPlatforms: [
    { 
      id: "direct-booking", 
      label: "Direct Booking Site ⭐", 
      defaultSelected: true // Pre-selected by default
    },
    { id: "airbnb", label: "Airbnb", defaultSelected: false },
    { id: "vrbo", label: "VRBO", defaultSelected: false },
    { id: "booking-com", label: "Booking.com", defaultSelected: false },
    { id: "other-platform", label: "Other Platform", defaultSelected: false },
  ],
  bookingPlatformNote: "⭐ TrustYourHost specializes in hosts with direct booking sites",

  // Location Radius: Radio buttons, single select
  locationRadius: [
    { id: "25-miles", label: "Within 25 miles", value: 25 },
    { id: "50-miles", label: "Within 50 miles", value: 50, default: true }, // Default
    { id: "100-miles", label: "Within 100 miles", value: 100 },
    { id: "any-distance", label: "Any distance", value: null },
  ],
  locationRadiusDefault: "50-miles",

  // Amenities: Checkboxes, 2-column layout
  amenities: [
    { id: "wifi", label: "WiFi" },
    { id: "full-kitchen", label: "Full Kitchen" },
    { id: "free-parking", label: "Free Parking" },
    { id: "pet-friendly", label: "Pet Friendly" },
    { id: "washer-dryer", label: "Washer/Dryer" },
    { id: "air-conditioning", label: "Air Conditioning" },
    { id: "pool", label: "Pool" },
    { id: "hot-tub", label: "Hot Tub" },
    { id: "ev-charging", label: "EV Charging" },
  ],
  amenitiesLayout: "2-column", // 2-column layout

  // ============================================
  // EXPERIENCE-SPECIFIC FILTERS
  // ============================================

  experienceFilters: {
    mountainRetreats: {
      title: 'Mountain Retreats',
      icon: '🏔️',
      propertyTypes: [
        'Chalet',
        'Cabin',
        'Lodge',
        'A-Frame',
        'Ski Condo',
        'Mountain Home',
        'Tiny Home'
      ],
      specificFilters: [
        'Ski-in/Ski-out Access',
        'Hiking Trails on Property',
        'Mountain/Valley Views',
        'Hot Tub/Jacuzzi',
        'Fireplace',
        'Secluded/Private Location',
        'High Elevation (5000ft+)',
        'Snow Activities Nearby'
      ]
    },

    beachfrontParadise: {
      title: 'Beachfront Paradise',
      icon: '🏖️',
      propertyTypes: [
        'Beach House',
        'Villa',
        'Cottage',
        'Bungalow',
        'Condo',
        'Beach Cabin',
        'Unique Stay'
      ],
      specificFilters: [
        'Direct Beach Access',
        'Oceanfront/Ocean View',
        'Beach Within Walking Distance',
        'Water Sports Equipment',
        'Outdoor Shower',
        'Beach Chairs/Umbrellas Included',
        'Kayak/Paddleboard Available',
        'Beachside Deck/Patio'
      ]
    },

    urbanAdventures: {
      title: 'Urban Adventures',
      icon: '🏙️',
      propertyTypes: [
        'Apartment',
        'Loft',
        'Penthouse',
        'Studio',
        'Townhouse',
        'Converted Space',
        'Boutique Stay'
      ],
      specificFilters: [
        'Downtown/City Center',
        'Public Transit Access',
        'Walking Distance to Attractions',
        'Restaurants/Cafes Nearby',
        'Nightlife District',
        'Gym/Fitness Center',
        'Rooftop Access',
        'City/Skyline Views'
      ]
    },

    forestGetaways: {
      title: 'Forest Getaways',
      icon: '🌲',
      propertyTypes: [
        'Cabin',
        'Treehouse',
        'A-Frame',
        'Yurt',
        'Log Home',
        'Earth Home',
        'Tiny Home'
      ],
      specificFilters: [
        'Surrounded by Forest',
        'Wildlife Viewing Opportunities',
        'Hiking Trails Nearby',
        'Fire Pit/Campfire Area',
        'Off-Grid/Secluded',
        'Creek/Stream on Property',
        'Treehouse or Log Cabin',
        'Nature Photography Spots'
      ]
    },

    tropicalEscapes: {
      title: 'Tropical Escapes',
      icon: '🌴',
      propertyTypes: [
        'Villa',
        'Bungalow',
        'Beach House',
        'Palapa',
        'Island Home',
        'Resort Suite',
        'Tiki Hut'
      ],
      specificFilters: [
        'Private Pool',
        'Tropical Garden/Landscaping',
        'Ocean Breeze/Coastal',
        'Outdoor Living Spaces',
        'Hammock/Lounging Areas',
        'Snorkeling/Diving Nearby',
        'Island Location',
        'Tiki Bar/Outdoor Kitchen'
      ]
    },

    countryHomes: {
      title: 'Country Homes',
      icon: '🌾',
      propertyTypes: [
        'Farmhouse',
        'Cottage',
        'Ranch House',
        'Barn Conversion',
        'Country Estate',
        'Homestead',
        'Rural Retreat'
      ],
      specificFilters: [
        'Farm/Ranch Setting',
        'Large Outdoor Spaces',
        'Garden/Orchard Access',
        'Farm Animals on Property',
        'Barn/Outbuildings',
        'Stargazing/Dark Skies',
        'Peaceful/Quiet Environment',
        'Fishing Pond/Lake'
      ]
    },

    privateSanctuaries: {
      title: 'Private Sanctuaries',
      icon: '🏡',
      propertyTypes: [
        'Estate',
        'Villa',
        'Manor',
        'Private Residence',
        'Luxury Home',
        'Compound',
        'Gated Property'
      ],
      specificFilters: [
        'Completely Private Property',
        'Gated Entry/Security',
        'No Shared Spaces',
        'Spa/Wellness Amenities',
        'Meditation/Yoga Space',
        'Luxury Finishes/High-End',
        'Private Chef Available',
        'Concierge Services'
      ]
    },

    adventureOutdoor: {
      title: 'Adventure & Outdoor Recreation',
      icon: '⛰️',
      propertyTypes: [
        'Base Camp Cabin',
        'Lodge',
        'Glamping Tent',
        'Yurt',
        'Adventure Cabin',
        'Outdoor Retreat',
        'Wilderness Home'
      ],
      specificFilters: [
        'Near National/State Park',
        'Rock Climbing Access',
        'Mountain Biking Trails',
        'Water Sports/Activities',
        'Zip-lining Nearby',
        'Gear Storage/Bike Racks',
        'Guide Services Available',
        'ATV/Off-Road Trails'
      ]
    },

    vineyardAgritourism: {
      title: 'Vineyard and Agritourism',
      icon: '🍇',
      propertyTypes: [
        'Vineyard Estate',
        'Farm Cottage',
        'Wine Country Villa',
        'Farmhouse',
        'Converted Barn',
        'Chateau',
        'Casita'
      ],
      specificFilters: [
        'On-site Vineyard/Winery',
        'Wine Tasting Available',
        'Farm-to-Table Experience',
        'Cooking Classes Offered',
        'Harvest/Seasonal Activities',
        'Winery Tours',
        'Olive Grove/Fruit Orchards',
        'Agricultural Education'
      ]
    },

    familyFriendly: {
      title: 'Family-Friendly Homes',
      icon: '👨‍👩‍👧‍👦',
      propertyTypes: [
        'Family Home',
        'Vacation House',
        'Cottage',
        'Lakehouse',
        'Villa',
        'Large Cabin',
        'Resort Home'
      ],
      specificFilters: [
        'Cribs/High Chairs Available',
        'Toys/Games Provided',
        'Fenced Yard/Safe Outdoor',
        'Shallow/Kid-Safe Pool',
        'Near Parks/Playgrounds',
        'Board Games/Kids Books',
        'Baby-Proofed/Childproofed',
        'Bunk Beds/Kids Rooms'
      ]
    },

    festivalEvent: {
      title: 'Festival and Event Destinations',
      icon: '🎪',
      propertyTypes: [
        'Group House',
        'Event Rental',
        'Large Villa',
        'Festival Lodging',
        'Shared Home',
        'Party House',
        'Venue Nearby'
      ],
      specificFilters: [
        'Near Festival/Event Venues',
        'Large Group Capacity (10+)',
        'Ample Parking for Multiple Cars',
        'Walking Distance to Venue',
        'Shuttle Service Available',
        'Early Check-in Options',
        'Flexible Booking Policies',
        'Event Calendar/Local Info'
      ]
    },

    uniqueThemed: {
      title: 'Unique and Themed Stays',
      icon: '🎨',
      propertyTypes: [
        'Treehouse',
        'Castle',
        'Lighthouse',
        'Tiny Home',
        'Container Home',
        'Dome Home',
        'Historic Building',
        'Artist Loft'
      ],
      specificFilters: [
        'Historic Property/Heritage',
        'Architectural Significance',
        'Themed Decor/Design',
        'Artist Studio/Creative Space',
        'Converted Space (Barn/Church)',
        'Instagram-Worthy/Photogenic',
        'One-of-a-Kind Design',
        'Cultural/Regional Character'
      ]
    }
  },

  // Title to key mapping for backward compatibility
  experienceTitleToKey: {
    "Mountain Retreats": "mountainRetreats",
    "Beachfront Paradise": "beachfrontParadise",
    "Urban Adventures": "urbanAdventures",
    "Forest Getaways": "forestGetaways",
    "Tropical Escapes": "tropicalEscapes",
    "Country Homes": "countryHomes",
    "Private Sanctuaries": "privateSanctuaries",
    "Adventure & Outdoor Recreation": "adventureOutdoor",
    "Vineyard and Agritourism": "vineyardAgritourism",
    "Family-Friendly Homes": "familyFriendly",
    "Festival and Event Destinations": "festivalEvent",
    "Unique and Themed Stays": "uniqueThemed",
  },

  // Helper function to get experience-specific filters
  getExperienceFilters: function(experienceTitle) {
    // Support both title lookup and direct key lookup
    const key = this.experienceTitleToKey[experienceTitle] || experienceTitle;
    const experience = this.experienceFilters[key];
    
    if (!experience) return [];
    
    // Convert specificFilters array to checkbox format
    return experience.specificFilters.map((filter, index) => ({
      id: filter.toLowerCase().replace(/[^\w]+/g, '-'),
      label: filter
    }));
  },

  // Helper function to get property types for an experience
  getExperiencePropertyTypes: function(experienceTitle) {
    const key = this.experienceTitleToKey[experienceTitle] || experienceTitle;
    const experience = this.experienceFilters[key];
    
    if (!experience) return [];
    
    // Convert propertyTypes array to checkbox format
    return experience.propertyTypes.map((type, index) => ({
      id: type.toLowerCase().replace(/[^\w]+/g, '-'),
      label: type
    }));
  },

  // Helper function to get full experience config
  getExperienceConfig: function(experienceTitle) {
    const key = this.experienceTitleToKey[experienceTitle] || experienceTitle;
    return this.experienceFilters[key] || null;
  },

  // Helper function to get default filter values
  getDefaultFilters: function() {
    return {
      guests: this.guests.default,
      priceRange: this.priceRange.default,
      propertyType: this.propertyTypeDefault,
      bookingPlatforms: this.bookingPlatforms
        .filter(platform => platform.defaultSelected)
        .map(platform => platform.id),
      locationRadius: this.locationRadiusDefault,
      amenities: [],
      experienceSpecific: [], // Will be populated based on selected experience
    };
  },
};
