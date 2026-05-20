// src/data/categories.js

import {
  Smartphone,
  Laptop,
  Tablet,
  Camera,
  Tv,
  AirVent,
  Car,
  Bike,
  Home,
  Building2,
  BedDouble,
  Sofa,
  Shirt,
  Briefcase,
  Wrench,
  PawPrint,
  Baby,
  Map,
} from "lucide-react";

export const categories = [
  // ================= ELECTRONICS =================
  {
    slug: "electronics",
    label: "Electronics",
    icon: Smartphone,

    subCategories: [
      {
        slug: "used-mobile",
        label: "Mobiles",
        icon: Smartphone,

        fields: [
          "brand",
          "model",
          "storage",
          "ram",
          "condition",
          "color",
        ],
      },

      {
        slug: "used-laptop",
        label: "Laptops",
        icon: Laptop,

        fields: [
          "brand",
          "model",
          "processor",
          "ram",
          "storage",
          "condition",
        ],
      },

      {
        slug: "used-tablet",
        label: "Tablets",
        icon: Tablet,

        fields: [
          "brand",
          "model",
          "storage",
          "ram",
          "condition",
        ],
      },

      {
        slug: "camera",
        label: "Cameras",
        icon: Camera,

        fields: [
          "brand",
          "model",
          "cameraType",
          "condition",
        ],
      },

      {
        slug: "tv",
        label: "Televisions",
        icon: Tv,

        fields: [
          "brand",
          "screenSize",
          "tvType",
          "condition",
        ],
      },

      {
        slug: "ac",
        label: "Air Conditioners",
        icon: AirVent,

        fields: [
          "brand",
          "tonnage",
          "condition",
        ],
      },
    ],
  },

  // ================= VEHICLES =================
  {
    slug: "vehicles",
    label: "Vehicles",
    icon: Car,

    subCategories: [
      {
        slug: "used-car",
        label: "Cars",
        icon: Car,

        fields: [
          "brand",
          "model",
          "year",
          "fuelType",
          "kmsDriven",
          "ownership",
        ],
      },

      {
        slug: "used-bike",
        label: "Bikes",
        icon: Bike,

        fields: [
          "brand",
          "model",
          "year",
          "kmsDriven",
          "ownership",
        ],
      },

      {
        slug: "scooty",
        label: "Scooty",
        icon: Bike,

        fields: [
          "brand",
          "model",
          "year",
          "kmsDriven",
          "ownership",
        ],
      },
    ],
  },

  // ================= PROPERTIES =================
  {
    slug: "properties",
    label: "Properties",
    icon: Home,

    subCategories: [
      {
        slug: "house-sale",
        label: "House for Sale",
        icon: Home,

        fields: [
          "bhk",
          "bathrooms",
          "furnishing",
          "superArea",
          "parking",
        ],
      },

      {
        slug: "house-rent",
        label: "House for Rent",
        icon: Building2,

        fields: [
          "bhk",
          "bathrooms",
          "furnishing",
          "monthlyRent",
          "parking",
        ],
      },

      {
        slug: "flat-sale",
        label: "Flat for Sale",
        icon: Building2,

        fields: [
          "bhk",
          "bathrooms",
          "floor",
          "superArea",
          "parking",
        ],
      },

      {
        slug: "flat-rent",
        label: "Flat for Rent",
        icon: Building2,

        fields: [
          "bhk",
          "bathrooms",
          "monthlyRent",
          "furnishing",
        ],
      },

      {
        slug: "pg-hostel",
        label: "PG & Hostel",
        icon: BedDouble,

        fields: [
          "gender",
          "sharingType",
          "foodIncluded",
          "monthlyRent",
        ],
      },

      {
        slug: "land-plot",
        label: "Land & Plots",
        icon: Map,

        fields: [
          "plotArea",
          "facing",
          "boundaryWall",
        ],
      },
    ],
  },

  // ================= FURNITURE =================
  {
    slug: "furniture",
    label: "Furniture",
    icon: Sofa,

    subCategories: [
      {
        slug: "sofa",
        label: "Sofa",
        icon: Sofa,

        fields: [
          "material",
          "seats",
          "condition",
          "color",
        ],
      },

      {
        slug: "bed",
        label: "Beds",
        icon: BedDouble,

        fields: [
          "bedSize",
          "material",
          "storageIncluded",
          "condition",
        ],
      },

      {
        slug: "dining-table",
        label: "Dining Table",
        icon: Sofa,

        fields: [
          "material",
          "seats",
          "condition",
        ],
      },
    ],
  },

  // ================= FASHION =================
  {
    slug: "fashion",
    label: "Fashion",
    icon: Shirt,

    subCategories: [
      {
        slug: "mens-fashion",
        label: "Men's Fashion",
        icon: Shirt,

        fields: [
          "brand",
          "size",
          "condition",
          "color",
        ],
      },

      {
        slug: "womens-fashion",
        label: "Women's Fashion",
        icon: Shirt,

        fields: [
          "brand",
          "size",
          "condition",
          "color",
        ],
      },
    ],
  },

  // ================= JOBS & SERVICES =================
  {
    slug: "jobs-services",
    label: "Jobs & Services",
    icon: Briefcase,

    subCategories: [
      {
        slug: "jobs",
        label: "Jobs",
        icon: Briefcase,

        fields: [
          "jobRole",
          "salary",
          "experience",
          "companyName",
        ],
      },

      {
        slug: "services",
        label: "Services",
        icon: Wrench,

        fields: [
          "serviceType",
          "experience",
          "availability",
        ],
      },
    ],
  },

  // ================= PETS & KIDS =================
  {
    slug: "pets-kids",
    label: "Pets & Kids",
    icon: PawPrint,

    subCategories: [
      {
        slug: "pets",
        label: "Pets",
        icon: PawPrint,

        fields: [
          "petType",
          "breed",
          "age",
          "vaccinated",
        ],
      },

      {
        slug: "kids",
        label: "Kids Products",
        icon: Baby,

        fields: [
          "productType",
          "ageGroup",
          "condition",
        ],
      },
    ],
  },
];
// // src/data/categoryFields.js
// export const categoryData = {
//   cars: {
//     fields: [
//       { 
//         name: "Brand", 
//         type: "select", 
//         options: ["Maruti", "Hyundai", "Tata", "Honda", "Mahindra", "Toyota", "Kia", "Ford", "BMW", "Mercedes"]
//       },
//       { 
//         name: "Model", 
//         type: "select", 
//         dependsOn: "Brand", 
//         options: {
//           Maruti: ["Swift", "Baleno", "Dzire", "WagonR", "Ertiga", "Brezza"],
//           Hyundai: ["i20", "Creta", "Venue", "Verna", "i10", "Alcazar"],
//           Tata: ["Nexon", "Altroz", "Harrier", "Safari", "Punch", "Tiago"],
//           Honda: ["City", "Amaze", "WRV", "Jazz", "Civic"],
//           Mahindra: ["Scorpio", "XUV500", "Bolero", "Thar", "XUV700"],
//           Toyota: ["Fortuner", "Innova Crysta", "Glanza", "Camry", "Corolla"],
//           Kia: ["Seltos", "Sonet", "Carens"],
//           Ford: ["EcoSport", "Endeavour", "Figo"],
//           BMW: ["X1", "X5", "3 Series", "5 Series", "7 Series"],
//           Mercedes: ["C-Class", "E-Class", "GLA", "GLC", "GLE"]
//         }
//       },
//       { name: "Year", type: "text" },
//       { name: "Price", type: "text" },
//       { 
//         name: "Fuel Type", 
//         type: "select", 
//         options: ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"] 
//       },
//       { name: "Kilometers Driven", type: "text" },
//       { 
//         name: "Transmission", 
//         type: "select", 
//         options: ["Manual", "Automatic (AT)", "Automated Manual (AMT)", "Intelligent Manual Transmission (IMT)"] 
//       },
//       { 
//         name: "Number of Owners", 
//         type: "select", 
//         options: ["First Owner", "Second Owner", "Third Owner", "Fourth Owner+"] 
//       }
//     ]
//   },

//   motorcycles: {
//     fields: [
//       { 
//         name: "Vehicle Type",
//         type: "select",
//         options: ["Motorcycle", "Scooter", "Bicycle"]
//       },
//       { 
//         name: "Brand", 
//         type: "select", 
//         options: ["Hero", "Honda", "Yamaha", "Bajaj", "Royal Enfield", "KTM", "Suzuki", "TVS"]
//       },
//       { 
//         name: "Model", 
//         type: "select", 
//         dependsOn: "Brand", 
//         options: {
//           Hero: ["Splendor", "HF Deluxe", "Glamour", "Passion Pro"],
//           Honda: ["Shine", "Unicorn", "Activa", "Hornet 2.0"],
//           Yamaha: ["R15", "FZ", "MT-15", "Fascino"],
//           Bajaj: ["Pulsar 150", "Pulsar NS200", "Dominar 400", "Platina"],
//           RoyalEnfield: ["Classic 350", "Bullet 350", "Himalayan", "Meteor 350"],
//           KTM: ["Duke 200", "Duke 390", "RC 200", "RC 390"],
//           Suzuki: ["Gixxer", "Access 125", "Burgman Street"],
//           TVS: ["Apache RTR 160", "Apache RR310", "Jupiter", "Ntorq"]
//         }
//       },
//       { name: "Year", type: "text" },
//       { name: "Price", type: "text" },
//       { 
//         name: "Fuel Type", 
//         type: "select", 
//         options: ["Petrol", "Diesel", "CNG", "Electric", "None"] 
//       },
//       { name: "Kilometers Driven", type: "text" },
//       { 
//         name: "Number of Owners", 
//         type: "select", 
//         options: ["First Owner", "Second Owner", "Third Owner", "Fourth Owner+"] 
//       }
//     ]
//   },

//   scooters: {
//     fields: [
//       { 
//         name: "Brand", 
//         type: "select", 
//         options: ["Honda", "TVS", "Hero", "Suzuki", "Yamaha", "Bajaj"]
//       },
//       { 
//         name: "Model", 
//         type: "select", 
//         dependsOn: "Brand",
//         options: {
//           Honda: ["Activa 6G", "Dio", "Grazia"],
//           TVS: ["NTorq", "Scooty Pep+", "Jupiter"],
//           Hero: ["Maestro Edge", "Pleasure", "Destini 125"],
//           Suzuki: ["Access 125", "Burgman Street"],
//           Yamaha: ["FZ-S V3", "Ray ZR"],
//           Bajaj: ["Chetak", "Pulsar NS 125"]
//         }
//       },
//       { name: "Year", type: "text" },
//       { name: "Price", type: "text" },
//       { 
//         name: "Fuel Type", 
//         type: "select", 
//         options: ["Petrol", "Electric"] 
//       },
//       { name: "Kilometers Driven", type: "text" },
//       { 
//         name: "Number of Owners", 
//         type: "select", 
//         options: ["First Owner", "Second Owner", "Third Owner", "Fourth Owner+"] 
//       }
//     ]
//   },

//   "mobile-phones": {
//     fields: [
//       { 
//         name: "Brand", 
//         type: "select", 
//         options: ["Apple", "Samsung", "OnePlus", "Xiaomi", "Oppo", "Vivo", "Realme", "Google", "Motorola"]
//       },
//       { 
//         name: "Model", 
//         type: "select", 
//         dependsOn: "Brand", 
//         options: {
//           Apple: ["iPhone 13", "iPhone 13 Pro", "iPhone 14", "iPhone 14 Pro", "iPhone 15"],
//           Samsung: ["Galaxy S22", "Galaxy S23", "Galaxy A52", "Galaxy A73", "Galaxy M33", "Galaxy Z Fold 4"],
//           OnePlus: ["OnePlus 9", "OnePlus 9 Pro", "OnePlus 10T", "OnePlus Nord 2", "OnePlus Nord CE 2"],
//           Xiaomi: ["Redmi Note 10", "Redmi Note 11", "Mi 11X", "Mi 12 Pro"],
//           Oppo: ["Reno 6", "Reno 7", "F19 Pro", "A74"],
//           Vivo: ["V21", "V23", "Y20", "Y21"],
//           Realme: ["Realme 8", "Realme 9 Pro", "Realme GT Master"],
//           Google: ["Pixel 6", "Pixel 6a", "Pixel 7", "Pixel 7 Pro"],
//           Motorola: ["Moto G60", "Moto Edge 20", "Moto G71"]
//         }
//       },
//       { name: "Storage", type: "select", options: ["64GB", "128GB", "256GB", "512GB", "1TB"] },
//       { name: "Year", type: "text" },
//       { name: "Price", type: "text" }
//     ]
//   },

//   furniture: {
//     fields: [
//       { name: "Type", type: "select", options: ["Sofa", "Bed", "Dining Table", "Chair", "Cupboard", "Desk"] },
//       { name: "Material", type: "select", options: ["Wood", "Metal", "Plastic", "Leather", "Fabric"] },
//       { name: "Condition", type: "select", options: ["New", "Used - Like New", "Used - Good", "Used - Acceptable"] },
//       { name: "Price", type: "text" },
//       { name: "Year", type: "text" },
//     ]
//   },

//   realEstate: {
//     fields: [
//       { name: "Property Type", type: "select", options: ["Apartment", "Independent House", "Villa", "Plot", "Commercial"] },
//       { name: "Location", type: "text" },
//       { name: "Area (sq.ft)", type: "text" },
//       { name: "Bedrooms", type: "select", options: ["1BHK", "2BHK", "3BHK", "4BHK", "5BHK+"] },
//       { name: "Price", type: "text" },
//       { name: "Year Built", type: "text" },
//       { name: "Furnished", type: "select", options: ["Yes", "No", "Semi-Furnished"] }
//     ]
//   },

//   electronics: {
//     fields: [
//       { name: "Type", type: "select", options: ["Laptop", "TV", "Tablet", "Camera", "Headphones", "Speakers"] },
//       { name: "Brand", type: "text" },
//       { name: "Model", type: "text" },
//       { name: "Condition", type: "select", options: ["New", "Used"] },
//       { name: "Price", type: "text" },
//       { name: "Year", type: "text" },
//     ]
//   },

//   "home-appliances": {
//     fields: [
//       { name: "Type", type: "select", options: ["Refrigerator", "Washing Machine", "Microwave", "AC", "Water Purifier"] },
//       { name: "Brand", type: "text" },
//       { name: "Model", type: "text" },
//       { name: "Condition", type: "select", options: ["New", "Used"] },
//       { name: "Price", type: "text" },
//       { name: "Year", type: "text" },
//     ]
//   },

//   // jobs: {
//   //   fields: [
//   //     { name: "Role", type: "text" },
//   //     { name: "Company", type: "text" },
//   //     { name: "Experience Required", type: "text" },
//   //     { name: "Salary", type: "text" },
//   //     { name: "Location", type: "text" },
//   //     { name: "Year", type: "text" },
//   //   ]
//   // },

//   fashion: {
//     fields: [
//       { name: "Type", type: "select", options: ["Men", "Women", "Kids"] },
//       { name: "Category", type: "select", options: ["Clothing", "Footwear", "Accessories"] },
//       { name: "Brand", type: "text" },
//       { name: "Size", type: "text" },
//       { name: "Price", type: "text" },
//       { name: "Year", type: "text" },
//     ]
//   }
// };
