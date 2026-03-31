import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/edit" element={<div>Edit</div>} />
        <Route path="/users" element={<div>Home</div>} />
        <Route path="*" element={<div>NotFound</div>} />
      </Routes>
    </>
  );
}

export default App;
