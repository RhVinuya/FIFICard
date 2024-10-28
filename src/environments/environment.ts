export const environment = {
  production: false,
  paypalCurrency: 'PHP',
  paypalClientId: 'AQW1wB3h__RDiIOYHpk_1QLpcrPT5sH0GBWemRc3ycpVohV-dqzNwWtSDuvsaUcVH3Ipam9zwYlNy_nB',
  stripe: {
    enable: true,
    publish: "pk_test_04NqaZryqxUuqCsGYdsSAXgT00Ro4Gy5kx",
    pass: "sk_test_51FPpNZCwtCGHnjTln7DmBVNvoaZOEVW1VexB4NIt9C0rYqT2SthuqbSjbUM8RYgYnyhatDEJZcVzKAyF4Kz6FFCy00WCZLSbOz",
    live: false
  },
  paymongo: {
    enable: false,
    publicKey: "pk_test_mn35mjjh1a15atCp4pLBdoDD",
    secretKey: "sk_test_EZAHKnEJPJucTkS4V5geZeMM",
    live: false
  },
  firebase: {
    projectId: 'fifi-greetings',
    appId: '1:592228815811:web:ae07898d9c86884e7d2376',
    storageBucket: 'fifi-greetings.appspot.com',
    apiKey: 'AIzaSyAXyVSWDyzk34XbS2ozI8Rs55oekR7Ox6A',
    authDomain: 'fifi-greetings.firebaseapp.com',
    messagingSenderId: '592228815811',
    measurementId: "G-BN0LKLNJY2"
  },
  storage: 'FIBEIGREETINGS-DEV-',
  cardevents: [
    "Birthday",
    "Anniversary",
    "Wedding",
    "Thank you",
    "Sympathy",
    "Pet",
    "Friendship",
    "Baby",
    "Congratulations",
    "Get well",
    "Baptism",
    "Confirmation",
    "Retirement",
    "Graduation",
    "Mother’s day",
    "Father’s day",
    "Grandparent’s day",
    "First communion",
    "Parents day",
    "Teachers",
    "Thanksgiving",
    "Halloween",
    "Christmas",
    "New year",
    "Valentines",
    "Easter",
  ],
  stickerevents: [
    "Individual",
    "Occasions",
    "Events",
    "Wildlife and Nature",
    "Places",
    "Arts",
    "Animals",
    "Letters and Quotes",
    "Sports",
    "Food and Drinks",
    "Family",
    "Toys"
  ],
  postcardevents: [
    "Corporate",
    "Minimal Designs",
    "Occasions",
    "Events",
    "Nature",
    "Travel, Scenery and Places",
    "Arts",
    "Animals",
    "Emotions and Feelings",
    "Family and Friends",
    "Letter and Quotes",
  ],
  giftscategories: [
    "Flowers",
    "Bath and Body",
    "Stuffed Toys",
    "Apparels",
    "Perfumery and Fragrances",
    "Mugs and Teacups",
    "Fruit Baskets",
    "Gift Sets",
    "Candies and Chocolates",
    "Candles"
  ],
  giftsrecipients: [
    "For All",
    "For Him",
    "For Her",
    "For Kids and Tennagers",
  ],
  imagetitles: [
    'Front',
    'Inside',
    'Outside',
    'Side by Side',
    'Back',
    'Envelope',
    'Sign & Send',
    'Stickers',
    'Other',
    'QR'
  ],
  gallerytitles: [
    'Front',
    'Sign & Send',
    'Inside',
    'Outside',
    'Back',
    'Envelope',
    'Stickers',
    'Other',
    'QR'
  ],
  us: ['us.fibeigreetings.com', 'fibeigreetings.us'],
  sg: ['sg.fibeigreetings.com', 'fibeigreetings.sg'],
  eventpriorities: [
    {
      title: 'Halloween', url: '/new/cards/Halloween'
    },
    {
      title: 'Birthday', url: '/new/cards/Birthday'
    },
    {
      title: 'Wedding', url: '/new/cards/Wedding'
    },
    {
      title: 'Anniversary', url: '/new/cards/Anniversary'
    }
  ],
  fontstyles: [
    'Open Sans',
    'Dancing Script',
    'Pacifico',
    'Satisfy',
    'Cookie',
    'Great Vibes',
    'Lora',
    'Lobster',
    'Playball',
    'Courgette',
    'Smooch',
    'Zen Loop'
  ],
  fontcolors: [
    { name: "Black", hex: '#000000' },
    { name: "Red", hex: '#800000' },
    { name: "Blue", hex: '#3A9BDC' },
    { name: "White", hex: '#F8F8FF' },
    { name: "Yellow", hex: '#FDD128' },
    { name: "Violet", hex: '#6B2D98' },
    { name: "Brown", hex: '#B87333' },
    { name: "Green", hex: '#228B22' }
  ],
  payments: {
    ph: {
      specialcode: true,
      card: true,
      gcash: false,
      paymaya: false,
      gcashupload: true
    },
    us: {
      specialcode: true,
      card: true,
      gcash: false,
      paymaya: false,
      gcashupload: false
    },
    sg: {
      specialcode: true,
      card: true,
      gcash: false,
      paymaya: false,
      gcashupload: false
    }
  },




  imageSize: {
    small: "_74x100",
    medium: "_278x220",
    large: "_282x400",
    xlarge: "_564x800"
  },
  redirect: [
    {
      host: "fibeimothersday.com",
      main: "/mother",
      logo: "/assets/images/logo_fibiemothersday.png",
      event: "mothers day"
    }
  ],
  ecardexpiry: 30,
  accounts: {
    facebook: {
      ph: "https://www.facebook.com/fibeigreetings",
      sg: "https://www.facebook.com/fibeigreetings",
      us: "https://www.facebook.com/fibeigreetings"
    },
    instagram: {
      ph: "https://www.instagram.com/fibeigreetings_",
      sg: "https://www.instagram.com/fibeigreetings_",
      us: "https://www.instagram.com/fibeigreetings_usa"
    },
    twitter: {
      ph: "https://twitter.com/fibeigreetings",
      sg: "https://twitter.com/fibeigreetings",
      us: "https://twitter.com/FiBeiUsaG"
    },
    tiktok: {
      ph: "https://www.tiktok.com/@fibeigreetings",
      sg: "https://www.tiktok.com/@fibeigreetings",
      us: "https://www.tiktok.com/@fibei.greetings.usa"
    },
    youtube: {
      ph: "https://www.youtube.com/channel/UCaxLPWhwZxDCxRX3ztHvPBQ",
      sg: "https://www.youtube.com/channel/UCaxLPWhwZxDCxRX3ztHvPBQ",
      us: "https://www.youtube.com/channel/UCauzeUZQ8Ikrlyy18uU9DHQ"
    },
    pinterest: {
      ph: "https://www.pinterest.ph/FibeiGreetings/_saved",
      sg: "https://www.pinterest.ph/FibeiGreetings/_saved",
      us: "https://www.pinterest.ph/FiBeiGreetingsUSA/"
    }
  },
  priority: [
    { event: "Anniversary", card: "E33L7gYiAiEXx7YLKyAE" },
    { event: "Baby", card: "XtC1VuuBvv5tfxyZuFEI" },
    { event: "Baptism", card: "rzxEhjxtl4eBgFSWUQSm" },
    { event: "Birthday", card: "iotaJMbxR8phd7Uh8SdF" },
    { event: "Confirmation", card: "i6xJ1XakHFzwFdSkMErz" },
    { event: "Congratulations", card: "CS3MMFn24HOZTI0A3Q9T" },
    { event: "Christmas", card: "wmhfAkj8bk8guHiTNSVr" },
    { event: "Easter", card: "31DyeAPhbEWzg2tJlcWV" },
    { event: "Father's Day", card: "LiwYo5NnmlP5p0zvWXNa" },
    { event: "Funny", card: "ak2nqMRb9ABuc0XsQJLY" },
    { event: "Friendship", card: "Qnj5FIRG7SoNCUebq59n" },
    { event: "First Communion", card: "RYoeXvbrFjozIkVfhmwZ" },
    { event: "Graduation", card: "nYoNrXpXMVPOcz96L5ck" },
    { event: "Grandparent's Day", card: "WCLhrBCaafCxOEEHqHsi" },
    { event: "Halloween", card: "LdiW6cdaiE17Tv30r1pp" },
    { event: "Just Because", card: "3QbOx4Oz7WgY6Nw9l1y2" },
    { event: "Love", card: "tCBGSYtgIYMvC0D98joP" },
    { event: "Love Your Enemy", card: "fixntvEM7JiSk39fQGd8" },
    { event: "Mother's Day", card: "EVtlw8aPQdoPkk0JIgtf" },
    { event: "Military Appreciation", card: "o6CM1YXs4BNOV0DUvnJC" },
    { event: "New Year", card: "NXkIhXGtCbjewu2PjbQS" },
    { event: "Parents Appreciation", card: "DGuT2e7pPgOw8jIRXsQo" },
    { event: "Pet", card: "tqtWd7FvHqOi5hL7384R" },
    { event: "Get Well", card: "advVx8q64nASYEm8zpWL" },
    { event: "Distress", card: "ZVshM1AVv0V6bC7d3sQe" },
    { event: "Retirement", card: "2aEVdwNRiQgridprYDFK" },
    { event: "Sympathy", card: "RgoYNKeW9JQvwuUhCttb" },
    { event: "Thinking of You", card: "qnT1C7Ln1UIIrH6E7mx4" },
    { event: "Teacher Appreciation", card: "t9u2vVsEtf61l03GKM1x" },
    { event: "Thank You", card: "oMiIb5vAgjSvXWnsSGK4" },
    { event: "Thanksgiving", card: "nOe47BVLbfKLhaeaj5Jm" },
    { event: "Valentine's Day", card: "flqgr5QWIQFFUhFOWfod" },
    { event: "Wedding", card: "KdWkQDLjxzFWjO6PfIJ8" },
  ]
};
