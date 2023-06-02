import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const ProductsPage = lazy(() => import("../pages/products/ProductsPage"));

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ProductsPage />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
