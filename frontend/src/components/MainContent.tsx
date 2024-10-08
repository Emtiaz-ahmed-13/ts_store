import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { useFilter } from "./FilterContext";
import { MdOutlineFilterList } from "react-icons/md";

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
  rating: number;
}

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
        (currentPage - 1) * itemsPerPage
      }`;

      if (keyword) {
        url = `https://dummyjson.com/products/search?q=${keyword}`;
      }

      try {
        const response = await axios.get(url);
        setProducts(response.data.products);
        console.log(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage, keyword]);

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

  const filteredProducts = getFilteredProducts();
  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - (currentPage - 1)));
    }
    if (currentPage + 2 > totalPages) {
      startPage = Math.max(1, startPage - (2 - (totalPages - currentPage)));
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }

    return buttons;
  };

  return (
    <section className="xl-w-[55rem] lg:w-[48rem] xs:w-[28rem] p-5">
      <div className=" sm:flex-row justify-between items-center">
        <div className="relative mb-5 mt-5">
          <button
            className="border px-4 py-2 rounded-full flex items"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <MdOutlineFilterList className="mr-2" />
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
        <div className="flex flex-col sm:flex-row justify-between  mt-5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border px-4 py-2 mx-2 rounded-full"
          >
            Previous
          </button>
          <div className="flex flex-wrap justify-center">
            {getPaginationButtons().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`border px-4 py-2 mx-1 rounded-full ${
                  page === currentPage ? "bg-black text-white" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
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
