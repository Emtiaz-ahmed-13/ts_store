import React from "react";
import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, image, price }) => {
  return (
    <div className="border p-4 rounded">
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} className="w-full h-32 object-cover" />
        <h3 className="text-lg font-bold mt-2">{title}</h3>
        <p className="text-gray-700">${price.toFixed(2)}</p>{" "}
        {/* Format price */}
      </Link>
    </div>
  );
};

export default BookCard;
