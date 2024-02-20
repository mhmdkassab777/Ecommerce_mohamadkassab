import Login from "./login/Login";
import Products from "./products/Products"
import MainLayout from "./layouts/MainLayout";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";

const App= ()=> {
  return (
  <>
<MainLayout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Products/>} />
        <Route path="*" element={<>Not Found</>} />
      </Routes>
</MainLayout>
   </>
  );
}

export default App;
