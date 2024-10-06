import axios from "axios"; // Don't forget to import axios!
import { Tally1 } from "lucide-react";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { useFilter } from "./FilterContext";

// Define the interface for a product
interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
  rating: number; // Assuming rating is also part of the product
}

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keywords } =
    useFilter();

  const [products, setProducts] = useState<Product[]>([]); // Use Product type for products
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
        (currentPage - 1) * itemsPerPage
      }`;

      if (keywords) {
        url = `https://dummyjson.com/products/search?q=${keywords}`;
      }

      try {
        const response = await axios.get(url);
        setProducts(response.data.products); // Updated to access the correct path
        console.log(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error); // Proper error handling
      }
    };

    fetchProducts();
  }, [currentPage, keywords]);

  // Filter products based on category, price, and search query
  const getFilteredProducts = () => {
    let filteredProducts = products;

    // Filter by selected category
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by minimum price
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    // Filter by maximum price
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    // Filter by search query
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "cheap":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  };

  const filteredProducts = getFilteredProducts(); // Get the filtered products
  const totalProducts = 100; // Set this to the correct number from your API if available
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="xl-w-[55rem] lg:w-[48rem] xs:w-[28rem] p-5">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="relative mb-5 mt-5">
          <button
            className="border px-4 py-2 rounded-full flex items-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Tally1 className="mr-2" />
            {filter === "all"
              ? "Filter"
              : filter.charAt(0).toLowerCase() + filter.slice(1)}
          </button>
          {dropdownOpen && (
            <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setFilter("cheap");
                  setDropdownOpen(false);
                }}
              >
                Cheap
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setFilter("expensive");
                  setDropdownOpen(false);
                }}
              >
                Expensive
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setFilter("popular");
                  setDropdownOpen(false);
                }}
              >
                Popular
              </button>
            </div>
          )}
        </div>

        {/* Display filtered products */}
        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border px-4 py-2 mx-2 rounded-full"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages} // Corrected here
            className="border px-4 py-2 mx-2 rounded-full"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
