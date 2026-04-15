import { Route, Routes } from "react-router-dom";

export default function Navigate() {
  return (
    <Routes>
      <Route path="/" element={<div>Hello, click to Edit or Users</div>} />
      <Route path="/edit" element={<div>Edit</div>} />
      <Route path="/users" element={<div>Users</div>} />
      <Route path="*" element={<div>NotFound</div>} />
    </Routes>
  );
}
