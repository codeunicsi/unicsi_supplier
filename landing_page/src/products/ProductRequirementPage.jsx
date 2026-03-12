// components/products/ManageProductsPage.jsx
import ProductCard from "../components/ProductCard";
import FiltersBar from "./FiltersBar";

const MOCK_PRODUCTS = [
  {
    product_id: "1",
    title: "Desktop Punching Bag",
    price: 499,
    orders: 31,
    images: [
      "https://images.unsplash.com/photo-1545959570-a94084071b5d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1504216056051-c91e5843e7c8?w=400&h=300&fit=crop",
    ],
  },
  {
    product_id: "2",
    title: "Cooling Pet Mat",
    price: 300,
    orders: 24,
    images: [
      "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&h=300&fit=crop",
    ],
  },
  {
    product_id: "3",
    title: "Cat Water Fountain",
    price: 500,
    orders: 31,
    images: [
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop",
    ],
  },
  {
    product_id: "4",
    title: "Minimalist Desk Lamp",
    price: 299,
    orders: 18,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=300&fit=crop",
    ],
  },
  {
    product_id: "5",
    title: "Vegetable Chopper Pro",
    price: 300,
    orders: 31,
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    ],
  },
  {
    product_id: "6",
    title: "Teeth Whitening Strips",
    price: 199,
    orders: 42,
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=300&fit=crop",
    ],
  },
  {
    product_id: "7",
    title: "Makeup Organizer Stand",
    price: 649,
    orders: 15,
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop",
    ],
  },
  {
    product_id: "8",
    title: "Hair Volumizer Brush",
    price: 799,
    orders: 27,
    images: [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=300&fit=crop",
    ],
  },
  {
    product_id: "9",
    title: "Smart Sensor Trash Can",
    price: 1299,
    orders: 9,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
    ],
  },
  {
    product_id: "10",
    title: "Portable LED Ring Light",
    price: 449,
    orders: 56,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1533090368676-1fd25485db88?w=400&h=300&fit=crop",
    ],
  },
  {
    product_id: "11",
    title: "Bamboo Cutting Board Set",
    price: 349,
    orders: 33,
    images: [
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=300&fit=crop",
    ],
  },
  {
    product_id: "12",
    title: "Resistance Band Kit",
    price: 599,
    orders: 48,
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop",
    ],
  },
];

export default function ManageProductsPage() {
  return (
    <div className="">
      <h1 className="text-xl font-bold mb-2">Product Requirement</h1>
      <p className="text-gray-600 mb-4">
        Manage all your product requirements from here.
      </p>
      <FiltersBar type="manage-product-requirements" />
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
