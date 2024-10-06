import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const SideBar = () => {
  // Destructure the context values from the custom hook
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keywords,
    setKeywords,
  } = useFilter(); // Custom hook for the filter context

  const [categories, setCategories] = useState<string[]>([]);

  // Fetch categories from an API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.log("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  // Handlers for price input changes
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  // Handler for changing category
  const handleRadioCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Handler for keyword click
  const handleKeywordClick = (keyword: string) => {
    setKeywords([keyword]);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeywords([]);
  };

  return (
    <div className="w-64 p-5 h-screen">
      <div className="text-5xl font-bold mb-10 mt-4">React Store</div>

      <section>
        {/* Search input */}
        <input
          type="text"
          className="border-2 rounded px-2 sm:mb-0 w-full"
          placeholder="Search Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Price range inputs */}
        <div className="flex justify-center items-center mt-4">
          <input
            type="number"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            type="number"
            className="border-2 px-5 py-3 mb-3 w-full"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>

        {/* Categories section */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
          {/* Loop through categories */}
          {categories.map((category, index) => (
            <label key={index} className="block mb-3">
              <input
                type="radio"
                name="category"
                value={category}
                className="mr-2 w-[16px] h-[16px]"
                checked={selectedCategory === category}
                onChange={() => handleRadioCategoryChange(category)} // Update state when selected
              />
              {category.toUpperCase()}
            </label>
          ))}
        </div>

        {/* Keywords section */}
        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>
          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                className="block mb-2 px-4 py-2 w-full text-left border rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => handleKeywordClick(keyword)}
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Reset filters button */}
        <button
          className="w-full py-2 bg-black text-white rounded mt-5"
          onClick={handleResetFilters}
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default SideBar;
