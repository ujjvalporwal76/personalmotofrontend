import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import Productpage from "./components/ProductPage/Productpage";
import Loginpage from "./components/LoginPage/Loginpage";
import Signuppage from "./components/SignUpPage/Signuppage";
import Sellerpage from "./components/SellerPage/Sellerpage";
import Watchedadspage from "./components/Watchedadsearchpage/Watchedadspage";
import Watchedsearchpage from "./components/Watchedadsearchpage/Watchedsearchpage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Statisticspage from "./components/UserPages/StatisticsPage/Statisticspage";
import Createadpage from "./components/CreateAdPage/Createadpage";
import Advertisementspage from "./components/UserPages/AdvertisementsPage/Advertisementspage";
import Newspage from "./components/UserPages/NewsPage/Newspage";
import Paymentspage from "./components/UserPages/PaymentsPage/Paymentspage";
import Settingspage from "./components/UserPages/SettingsPage/Settingspage";
import Logoutpage from "./components/LogOutPage/Logoutpage";
import Paymentfail from "./components/PaymentPage/Paymentfail";
import Paymentpass from "./components/PaymentPage/Paymentpass";
import Adplanpage from "./components/AdPlanPage/Adplanpage";
import { ProtectedRoute } from "./ProtectedRoute/Protectroute";
import { AuthProvider } from "./ContextAPI/AuthProvider";
import { Toaster } from "react-hot-toast";

import Searchresultpage from "./components/SearchResult/Searchresultpage";
import Createadpagemotor from "./components/CreateAdPage/Createadpagemotor";
import Createadpageparts from "./components/CreateAdPage/Createadpageparts";
import Createadpagetruck from "./components/CreateAdPage/Createadpagetruck";
import Home from "./Pages/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="product/:productId" element={<Productpage />} />
          <Route path="search" element={<Searchresultpage />} />
          <Route path="signup" element={<Signuppage />} />
          <Route path="login" element={<Loginpage />} />
          <Route path="start-selling" element={<Sellerpage />} />

          <Route path="create-ad-page/personal" element={<Createadpage />} />
          <Route
            path="create-ad-page/motorcycle"
            element={<Createadpagemotor />}
          />
          <Route
            path="create-ad-page/parts/:subPart"
            element={<Createadpageparts />}
          />
          <Route
            path="create-ad-page/trucks/:subTruck"
            element={<Createadpagetruck />}
          />
          <Route path="/category/:categoryName" element={<App />} />

          <Route element={<ProtectedRoute />}>
            <Route path="watched-page-ads" element={<Watchedadspage />} />
            <Route
              path="watched-page-searches"
              element={<Watchedsearchpage />}
            />

            <Route path="myaccount-statistics" element={<Statisticspage />} />
            <Route
              path="myaccount-advertisements/:adsId"
              element={<Advertisementspage />}
            />
            <Route path="myaccount-news/:newsId" element={<Newspage />} />
            <Route
              path="myaccount-payments/:paymentsId"
              element={<Paymentspage />}
            />
            <Route
              path="myaccount-settings/:settingsId"
              element={<Settingspage />}
            />
            <Route path="payment/fail" element={<Paymentfail />} />
            <Route path="payment/success" element={<Paymentpass />} />
            <Route
              path="create-ad-page/:category/:subCategory/payment/adplanselect/:adId"
              element={<Adplanpage />}
            />
            <Route
              path="create-ad-page/:category/payment/adplanselect/:adId"
              element={<Adplanpage />}
            />
          </Route>
          <Route path="logout" element={<Logoutpage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </AuthProvider>
);
