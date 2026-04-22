const products = [
  {
    id: 1,
    name: "Premium Backpack",
    price: 849,
    oldPrice: 1299,
    category: "bag",
    rating: 4.5,
    stock: 10,
    img: "bag.png"
  },

  {
    id: 2,
    name: "Luxury Watch",
    price: 499,
    oldPrice: 999,
    category: "watch",
    rating: 4.2,
    stock: 15,
    img: "watch.png"
  },

  {
    id: 3,
    name: "Trendy Sneakers",
    price: 999,
    oldPrice: 1999,
    category: "shoes",
    rating: 4.7,
    stock: 8,
    img: "sneakers.png"
  },

  {
    id: 4,
    name: "Stylish Sunglasses",
    price: 299,
    oldPrice: 599,
    category: "accessories",
    rating: 4.3,
    stock: 20,
    img: "sunglasses.png"
  },

  {
    id: 5,
    name: "Wireless Earbuds",
    price: 799,
    oldPrice: 1499,
    category: "electronics",
    rating: 4.6,
    stock: 12,
    img: "earbuds.png"
  },

  {
    id: 6,
    name: "Casual T-Shirt",
    price: 349,
    oldPrice: 699,
    category: "clothing",
    rating: 4.1,
    stock: 25,
    img: "tshirt.png"
  }
];

function getProductById(id) {
  return products.find(p => p.id === id);
}

function getByCategory(cat) {
  return products.filter(p => p.category === cat);
}

function getTopRated() {
  return products.filter(p => p.rating >= 4.5);
}