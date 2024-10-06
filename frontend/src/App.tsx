import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainContent from "./components/MainContent";
import SideBar from "./components/SideBar";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <SideBar /> {/* Sidebar takes up defined width */}
        {/* Main Content */}
        <div className="flex-1">
          {" "}
          {/* Main content takes the remaining space */}
          <Routes>
            <Route path="/" element={<MainContent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
