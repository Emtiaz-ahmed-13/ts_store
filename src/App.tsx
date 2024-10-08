import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainContent from "./components/MainContent";
import Sidebar from "./components/SideBar";
import ProductPage from "./components/ProductPage";
import TopSeller from "./components/TopSeller";
import PopularBlogs from "./components/PopularBlogs";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="rounded w-full  flex justify-between flex-wrap">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
          <div>
            <TopSeller />
            <PopularBlogs />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
