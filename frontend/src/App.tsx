import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainContent from "./components/MainContent";
import SideBar from "./components/SideBar";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <SideBar />

        {/* Main Content */}
        <div className="w-full flex flex-col">
          <Routes>
            <Route path="/" element={<MainContent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
