import { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import Header from "./components/Header";

import Drivers from "./pages/Drivers";
import DriverProfile from "./pages/DriverProfile";

import Tutors from "./pages/Tutors";
import TutorProfile from "./pages/TutorProfile";

import Nannies from "./pages/Nannies";
import NannyProfile from "./pages/NannyProfile";

import Caregivers from "./pages/Caregivers";
import CaregiverProfile from "./pages/CaregiverProfile";

import Housekeepers from "./pages/Housekeepers";
import HousekeeperProfile from "./pages/HousekeeperProfile";

import DogWalkers from "./pages/DogWalkers";
import DogWalkerProfile from "./pages/DogWalkerProfile";

import Register from "./pages/Register";
import Login from "./pages/Login";

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Support from "./pages/Support";
import About from "./pages/About";

import PostJob from "./pages/CreateJob";
import Jobs from "./pages/Jobs";
import MyJobs from "./pages/MyJobs";
import EditJob from "./pages/EditJob";

import MyProfile from "./pages/MyProfile";
import CreateSpecialistProfile from "./pages/CreateSpecialistProfile";
import EditSpecialistProfile from "./pages/EditSpecialistProfile";

import { useLanguage } from "./Context/LanguageContext";

import "./App.css";

const translations = {
  ka: {
    heroSmall:
      "ზრუნვა იწყება სწორი ადამიანის პოვნით",

    heroTitle:
      "იპოვე სანდო ადამიანი",

    heroTitleBlue:
      " შენს ოჯახზე ზრუნვისთვის",

    heroDescription:
      "მოძებნე გამოცდილი სპეციალისტები შენს ქალაქში — მარტივად, სწრაფად და უსაფრთხოდ.",

    chooseService:
      "რას ეძებ?",

    chooseCity:
      "აირჩიე ქალაქი",

    search:
      "ძიება",

    nanny:
      "ძიძა",

    elderly:
      "ხანდაზმულის მომვლელი",

    caregiver:
      "მომვლელი",

    driver:
      "მძღოლი",

    tutor:
      "ტუტორი / რეპეტიტორი",

    tutorShort:
      "ტუტორი",

    housekeeper:
      "სახლის დამხმარე",

    dogWalker:
      "ძაღლის გამსეირნებელი",

    tbilisi:
      "თბილისი",

    batumi:
      "ბათუმი",

    kutaisi:
      "ქუთაისი",

    rustavi:
      "რუსთავი",

    gori:
      "გორი",

    zugdidi:
      "ზუგდიდი",

    services:
      "ჩვენი სერვისები",

    servicesTitle:
      "როგორი დახმარება გჭირდება?",

    servicesDescription:
      "აირჩიე სასურველი კატეგორია და იპოვე შესაბამისი სპეციალისტი.",

    nannyDescription:
      "იპოვე სანდო ძიძა ბავშვის მოვლისთვის.",

    caregiverDescription:
      "იპოვე მზრუნველი ადამიანი ოჯახის წევრისთვის.",

    driverDescription:
      "იპოვე გამოცდილი და სანდო მძღოლი.",

    tutorDescription:
      "იპოვე მასწავლებელი და რეპეტიტორი.",

    housekeeperDescription:
      "იპოვე ადამიანი ყოველდღიური საქმეებისთვის.",

    dogWalkerDescription:
      "ძაღლის გასეირნება და მოვლა.",

    view:
      "ნახვა →",

    searchAlert:
      "გთხოვ, აირჩიე მომსახურება და ქალაქი.",
  },

  en: {
    heroSmall:
      "Care starts with finding the right person",

    heroTitle:
      "Find a trusted person",

    heroTitleBlue:
      " to care for your family",

    heroDescription:
      "Find experienced specialists in your city — easily, quickly and safely.",

    chooseService:
      "What are you looking for?",

    chooseCity:
      "Choose a city",

    search:
      "Search",

    nanny:
      "Nanny",

    elderly:
      "Elderly Caregiver",

    caregiver:
      "Caregiver",

    driver:
      "Driver",

    tutor:
      "Tutor / Teacher",

    tutorShort:
      "Tutor",

    housekeeper:
      "Housekeeper",

    dogWalker:
      "Dog Walker",

    tbilisi:
      "Tbilisi",

    batumi:
      "Batumi",

    kutaisi:
      "Kutaisi",

    rustavi:
      "Rustavi",

    gori:
      "Gori",

    zugdidi:
      "Zugdidi",

    services:
      "Our Services",

    servicesTitle:
      "What kind of help do you need?",

    servicesDescription:
      "Choose a category and find the right specialist.",

    nannyDescription:
      "Find a trusted nanny for childcare.",

    caregiverDescription:
      "Find a caring person for your family member.",

    driverDescription:
      "Find an experienced and trusted driver.",

    tutorDescription:
      "Find a teacher or private tutor.",

    housekeeperDescription:
      "Find help for everyday household tasks.",

    dogWalkerDescription:
      "Dog walking and pet care.",

    view:
      "View →",

    searchAlert:
      "Please choose a service and a city.",
  },

  ru: {
    heroSmall:
      "Забота начинается с поиска подходящего человека",

    heroTitle:
      "Найдите надежного человека",

    heroTitleBlue:
      " для заботы о вашей семье",

    heroDescription:
      "Найдите опытных специалистов в вашем городе — легко, быстро и безопасно.",

    chooseService:
      "Что вы ищете?",

    chooseCity:
      "Выберите город",

    search:
      "Поиск",

    nanny:
      "Няня",

    elderly:
      "Сиделка для пожилых",

    caregiver:
      "Сиделка",

    driver:
      "Водитель",

    tutor:
      "Репетитор",

    tutorShort:
      "Репетитор",

    housekeeper:
      "Помощник по дому",

    dogWalker:
      "Выгульщик собак",

    tbilisi:
      "Тбилиси",

    batumi:
      "Батуми",

    kutaisi:
      "Кутаиси",

    rustavi:
      "Рустави",

    gori:
      "Гори",

    zugdidi:
      "Зугдиди",

    services:
      "Наши услуги",

    servicesTitle:
      "Какая помощь вам нужна?",

    servicesDescription:
      "Выберите нужную категорию и найдите подходящего специалиста.",

    nannyDescription:
      "Найдите надежную няню для ухода за ребенком.",

    caregiverDescription:
      "Найдите заботливого человека для члена вашей семьи.",

    driverDescription:
      "Найдите опытного и надежного водителя.",

    tutorDescription:
      "Найдите учителя или репетитора.",

    housekeeperDescription:
      "Найдите помощника для повседневных домашних дел.",

    dogWalkerDescription:
      "Выгул собак и уход за питомцами.",

    view:
      "Посмотреть →",

    searchAlert:
      "Пожалуйста, выберите услугу и город.",
  },
};

function Home() {
  const navigate =
    useNavigate();

  const {
    language,
  } = useLanguage();

  const t =
    translations[language] ||
    translations.ka;

  const [
    selectedService,
    setSelectedService,
  ] = useState("");

  const [
    selectedCity,
    setSelectedCity,
  ] = useState("");

  const handleSearch = () => {
    if (
      !selectedService ||
      !selectedCity
    ) {
      alert(t.searchAlert);
      return;
    }

    const serviceRoutes = {
      nanny: "/nannies",
      elderly: "/caregivers",
      driver: "/drivers",
      tutor: "/tutors",
      home: "/housekeepers",
      dogwalker: "/dogwalker",
    };

    const route =
      serviceRoutes[
        selectedService
      ];

    if (route) {
      navigate(
        `${route}?city=${selectedCity}`
      );
    }
  };

  return (
    <div className="app">
      {/* HERO */}

      <main className="hero">
        <div className="hero-content">
          <p className="hero-small">
            {t.heroSmall}
          </p>

          <h1>
            {t.heroTitle}

            <span>
              {t.heroTitleBlue}
            </span>
          </h1>

          <p className="hero-description">
            {t.heroDescription}
          </p>

          {/* SEARCH */}

          <div className="search-box">
            <select
              value={
                selectedService
              }
              onChange={(e) =>
                setSelectedService(
                  e.target.value
                )
              }
            >
              <option
                value=""
                disabled
              >
                {t.chooseService}
              </option>

              <option value="nanny">
                👶 {t.nanny}
              </option>

              <option value="elderly">
                👵 {t.elderly}
              </option>

              <option value="driver">
                🚗 {t.driver}
              </option>

              <option value="tutor">
                📚 {t.tutor}
              </option>

              <option value="home">
                🏠 {t.housekeeper}
              </option>

              <option value="dogwalker">
                🐕 {t.dogWalker}
              </option>
            </select>

            <select
              value={
                selectedCity
              }
              onChange={(e) =>
                setSelectedCity(
                  e.target.value
                )
              }
            >
              <option
                value=""
                disabled
              >
                {t.chooseCity}
              </option>

              <option value="tbilisi">
                {t.tbilisi}
              </option>

              <option value="batumi">
                {t.batumi}
              </option>

              <option value="kutaisi">
                {t.kutaisi}
              </option>

              <option value="rustavi">
                {t.rustavi}
              </option>

              <option value="gori">
                {t.gori}
              </option>

              <option value="zugdidi">
                {t.zugdidi}
              </option>
            </select>

            <button
              className="search-btn"
              onClick={
                handleSearch
              }
            >
              {t.search}
            </button>
          </div>
        </div>
      </main>

      {/* SERVICES */}

      <section
        className="services"
        id="services"
      >
        <div className="services-title">
          <p>
            {t.services}
          </p>

          <h2>
            {t.servicesTitle}
          </h2>

          <span>
            {t.servicesDescription}
          </span>
        </div>

        <div className="service-cards">
          {/* NANNY */}

          <div className="service-card">
            <div className="service-icon">
              👶
            </div>

            <h3>
              {t.nanny}
            </h3>

            <p>
              {t.nannyDescription}
            </p>

            <Link
              to="/nannies"
              className="service-link"
            >
              {t.view}
            </Link>
          </div>

          {/* CAREGIVER */}

          <div className="service-card">
            <div className="service-icon">
              👵
            </div>

            <h3>
              {t.caregiver}
            </h3>

            <p>
              {t.caregiverDescription}
            </p>

            <Link
              to="/caregivers"
              className="service-link"
            >
              {t.view}
            </Link>
          </div>

          {/* DRIVER */}

          <div className="service-card">
            <div className="service-icon">
              🚗
            </div>

            <h3>
              {t.driver}
            </h3>

            <p>
              {t.driverDescription}
            </p>

            <Link
              to="/drivers"
              className="service-link"
            >
              {t.view}
            </Link>
          </div>

          {/* TUTOR */}

          <div className="service-card">
            <div className="service-icon">
              📚
            </div>

            <h3>
              {t.tutorShort}
            </h3>

            <p>
              {t.tutorDescription}
            </p>

            <Link
              to="/tutors"
              className="service-link"
            >
              {t.view}
            </Link>
          </div>

          {/* HOUSEKEEPER */}

          <div className="service-card">
            <div className="service-icon">
              🏠
            </div>

            <h3>
              {t.housekeeper}
            </h3>

            <p>
              {t.housekeeperDescription}
            </p>

            <Link
              to="/housekeepers"
              className="service-link"
            >
              {t.view}
            </Link>
          </div>

          {/* DOG WALKER */}

          <div className="service-card">
            <div className="service-icon">
              🐕
            </div>

            <h3>
              {t.dogWalker}
            </h3>

            <p>
              {t.dogWalkerDescription}
            </p>

            <Link
              to="/dogwalker"
              className="service-link"
            >
              {t.view}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <>
      {/* COMMON HEADER */}

      <Header />

      {/* ALL ROUTES */}

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        {/* DRIVERS */}

        <Route
          path="/drivers"
          element={<Drivers />}
        />

        <Route
          path="/drivers/:id"
          element={<DriverProfile />}
        />

        {/* TUTORS */}

        <Route
          path="/tutors"
          element={<Tutors />}
        />

        <Route
          path="/tutors/:id"
          element={<TutorProfile />}
        />

        {/* NANNIES */}

        <Route
          path="/nannies"
          element={<Nannies />}
        />

        <Route
          path="/nannies/:id"
          element={<NannyProfile />}
        />

        {/* CAREGIVERS */}

        <Route
          path="/caregivers"
          element={<Caregivers />}
        />

        <Route
          path="/caregivers/:id"
          element={<CaregiverProfile />}
        />

        {/* HOUSEKEEPERS */}

        <Route
          path="/housekeepers"
          element={<Housekeepers />}
        />

        <Route
          path="/housekeepers/:id"
          element={<HousekeeperProfile />}
        />

        {/* DOG WALKERS */}

        <Route
          path="/dogwalker"
          element={<DogWalkers />}
        />

        <Route
          path="/dogwalker/:id"
          element={<DogWalkerProfile />}
        />

        {/* JOBS */}

        <Route
          path="/post-job"
          element={<PostJob />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/my-jobs"
          element={<MyJobs />}
        />

        <Route
          path="/edit-job/:id"
          element={<EditJob />}
        />

        {/* USER */}

        <Route
          path="/my-profile"
          element={<MyProfile />}
        />

        <Route
          path="/create-specialist-profile"
          element={
            <CreateSpecialistProfile />
          }
        />

        <Route
          path="/edit-specialist/:id"
          element={
            <EditSpecialistProfile />
          }
        />

        {/* AUTH */}

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ABOUT */}

        <Route
          path="/about"
          element={<About />}
        />

        {/* LEGAL */}

        <Route
          path="/terms"
          element={<Terms />}
        />

        <Route
          path="/privacy"
          element={<Privacy />}
        />

        {/* SUPPORT */}

        <Route
          path="/support"
          element={<Support />}
        />
      </Routes>
    </>
  );
}

export default App;