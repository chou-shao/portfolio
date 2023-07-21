const products = [
  {
    id: 1,
    sku: 'SHO-001',
    imageUrl: '/images/nike-air-force-1.jpg',
    brandName: 'Nike',
    productName: 'Air Force One',
    productLink: 'air-force-one',
    price: 110.00,
    description: "The Nike Air Force 1 '07 continues to radiate brilliance, taking the original basketball classic to new heights with modern twists: reinforced stitching, sleek finishing, and just the right flair for a standout look.",
    materials: 'Leather, Foam, Rubber',
    madeIn: 'China',
    isExclusive: false,
    availableSizes: [
      { size: 'US 7', isAvailable: true },
      { size: 'US 8', isAvailable: true },
      { size: 'US 9', isAvailable: true },
      { size: 'US 10', isAvailable: true },
      { size: 'US 11', isAvailable: true },
      { size: 'US 12', isAvailable: true }
    ]
  },
  {
    id: 2,
    sku: 'SHO-002',
    imageUrl: '/images/nike-dunk-low-retro.jpg',
    brandName: 'Nike',
    productName: 'Dunk Low Retro',
    productLink: 'dunk-low-retro',
    price: 135.00,
    description: "Born for the basketball court and embraced by urban culture, this iconic sneaker makes a comeback with timeless features and a retro basketball aesthetic. Infused with the spirit of the '80s, its cushioned, low-profile collar ensures versatile style and comfort, wherever you go.",
    materials: 'Leather, Foam, Rubber',
    madeIn: 'Vietnam',
    isExclusive: false,
    availableSizes: [
      { size: 'US 7', isAvailable: true },
      { size: 'US 8', isAvailable: true },
      { size: 'US 9', isAvailable: true },
      { size: 'US 10', isAvailable: true },
      { size: 'US 11', isAvailable: true },
      { size: 'US 12', isAvailable: true }
    ]
  },
  {
    id: 3,
    sku: "SHO-003",
    imageUrl: '/images/yeezy-sfy.jpg',
    brandName: 'Yeezy',
    productName: 'Boost 350 V2 Semi Frozen Yellow',
    productLink: 'boost-350-v2-semi-frozen-yellow',
    price: 220.00,
    description: "During the 2017 holiday season, adidas quenched the thirst of sneaker enthusiasts with the release of the visually striking Semi Frozen Yellow Yeezy Boost 350 V2. The vivid Semi Frozen Yellow tone is beautifully juxtaposed by interwoven grey stripes on the Primeknit upper, with the prominent 'SPLY-350' branding in bold red. A gum rubber outsole provides the finishing touch to this unconventional color scheme. The Yeezy Boost 350 V2 'Semi Frozen Yellow' stands out as one of the most unforgettable colorways of the model, owing to its distinctive color combination.",
    materials: 'Primeknit, Eva Foam',
    madeIn: 'China',
    isExclusive: false,
    availableSizes: [
      { size: 'US 7', isAvailable: true },
      { size: 'US 8', isAvailable: false },
      { size: 'US 9', isAvailable: false },
      { size: 'US 10', isAvailable: false },
      { size: 'US 11', isAvailable: true },
      { size: 'US 12', isAvailable: true }
    ]
  },
  {
    id: 4,
    sku: "SHO-004",
    imageUrl: '/images/nike-off-white-aj1-1.jpg',
    brandName: 'Nike x Off-White',
    productName: 'Air Jordan 1',
    productLink: 'air-jordan-1',
    price: 6000,
    description: "The Air Jordan 1 Retro High Off White White is a sneaker model that features a monochromatic white color scheme. Crafted from a combination of white leather and mesh materials, the upper of the shoe showcases the iconic Swoosh logo on both sides, complemented by blue detailing. Additionally, the sneakers are adorned with the signature Wings emblems on the ankle areas. Adding to the unique design, the shoes include orange pull tabs, black 'AIR' text on the midsoles, and black 'Off-White™ for NIKE' lettering on the side panels.",
    materials: 'Leather, Rubber, Cotton',
    madeIn: 'China',
    isExclusive: true,
    availableSizes: [
      { size: 'US 7', isAvailable: false },
      { size: 'US 8', isAvailable: true },
      { size: 'US 9', isAvailable: false },
      { size: 'US 10', isAvailable: true },
      { size: 'US 11', isAvailable: false },
      { size: 'US 12', isAvailable: true }
    ]
  },
];

const getProductByLink = (productLink) => {
  return products.find(product => product.productLink === productLink);
};

function getExclusiveProducts() {
  return products.filter(product => product.isExclusive);
}

function getNonExclusiveProducts() {
  return products.filter(product => !product.isExclusive);
}

module.exports = {
  products,
  getProductByLink,
  getExclusiveProducts,
  getNonExclusiveProducts
}