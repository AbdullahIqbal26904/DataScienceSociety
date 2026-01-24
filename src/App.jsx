import React, { useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Events from './components/events/Events';
import Projects from './components/projects/Projects';
import { useDispatch, useSelector } from 'react-redux';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import BackgroundManager from './components/background/BackgroundManager';
import HeroSection from './components/hero/HeroSection';
import Navbar from './components/navbar/Navbar';
import DataverseSection from './components/dataverse/DataverseSection';
import HxDRegistration from './components/dataverse/HxDRegistration';
import AboutUs from './components/about/AboutUs';
import Gallery from './components/gallery/Gallery';
import { setshowloader, setInitialData } from './redux/features/portfolioSlice';
export default function App() {
  const { society, showloader } = useSelector((state) => state.allCart);
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();
  
  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // Only animate elements once
    });
  }, []);
  
  useEffect(() => {
    // Initialize with static data instead of API fetch
    setTimeout(() => {
      dispatch(setInitialData());
      dispatch(setshowloader(false));
    }, 1500); // Short artificial delay for loading effect
    
    // Add a global error handler for critical application errors only
    const handleError = (event) => {
      // Log the error for debugging
      console.error('Global error:', event.error);
      
      // Check if this is a critical error that should disable the app
      const errorString = event.error ? event.error.toString() : '';
      const isCriticalError = 
        errorString.includes('Out of memory') ||
        errorString.includes('Cannot read properties of undefined') ||
        errorString.includes('Maximum call stack size exceeded');
      
      // Only set hasError for truly critical errors
      if (isCriticalError) {
        setHasError(true);
      }
    };
    
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [dispatch]);
  if (showloader) {
    // Display loading screen or spinner
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Animated Loader */}
        <div className="relative flex items-center justify-center w-20 h-20">
          <div className="absolute w-20 h-20 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
          <div className="absolute w-16 h-16 border-4 border-t-transparent border-secondary rounded-full animate-spin-reverse"></div>
        </div>

        {/* Loading Text */}
        <p className="mt-4 text-lg font-semibold tracking-wide text-gray-300 animate-pulse">
          Loading, please wait...
        </p>
      </div>
    );

  } else if (hasError) {
    // Show a simple fallback UI if the app encounters an error
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="mb-4 text-center">We encountered an error loading the website.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
        >
          Reload Page
        </button>
      </div>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/register" element={<HxDRegistration />} />
          <Route path="/*" element={
            <main className="relative w-full h-screen">
              <BackgroundManager />
              <div className="max-w-screen-2xl mx-auto relative z-10">
                <Navbar />
                <div className="snap-y snap-mandatory h-screen overflow-y-auto overflow-x-hidden">
                  <div id="hero" className="snap-start min-h-screen w-full flex items-center">
                    <HeroSection />
                  </div>
            
                  <div id="about" className="snap-start min-h-screen w-full flex items-center justify-center">
                    <div className="w-full px-4">
                      <AboutUs />
                    </div>
                  </div>
            
                  <div id="events" className="snap-start min-h-screen w-full flex items-center justify-center">
                    <div className="w-full">
                      <Events />
                    </div>
                  </div>
            
                  <div id="dataverse" className="snap-start min-h-screen w-full">
                    <DataverseSection />
                  </div>
            
                  <div id="projects" className="snap-start min-h-screen w-full">
                    <Projects />
                  </div>
            
                  <div id="gallery" className="snap-start min-h-screen w-full">
                    <Gallery />
                  </div>
            
                  <div id="contact" className="snap-start min-h-screen w-full">
                    <Contact />
                  </div>
            
                  <div className="snap-start w-full">
                    <Footer />
                  </div>
                </div>
              </div>
            </main>
          } />
        </Routes>
      </Router>
    )
  }
}

