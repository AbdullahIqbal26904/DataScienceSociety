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
import EditRegistration from './components/dataverse/EditRegistration';
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
    }, 2500); // Short artificial delay for loading effect

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
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Main loader container */}
        <div className="relative z-10 flex flex-col items-center">
          {/* DNA/Data helix animation */}
          <div className="relative w-24 h-24 mb-8">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400/50 animate-spin" style={{ animationDuration: '1.5s' }}></div>
            
            {/* Middle rotating ring - opposite direction */}
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-blue-400 border-l-blue-400/50 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
            
            {/* Inner rotating ring */}
            <div className="absolute inset-4 rounded-full border-2 border-transparent border-t-purple-400 border-r-purple-400/50 animate-spin" style={{ animationDuration: '1s' }}></div>
            
            {/* Center pulsing dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse shadow-lg shadow-cyan-500/50"></div>
            </div>

            {/* Orbiting dots */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDelay: '1s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDelay: '2s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
            </div>
          </div>

          {/* Brand text */}
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
            Data Science Society
          </h1>

          {/* Loading bar */}
          <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full animate-loading-bar"></div>
          </div>

          {/* Loading text with typing effect */}
          <p className="text-sm text-slate-400 tracking-widest uppercase">
            <span className="inline-block animate-pulse">Initializing</span>
            <span className="inline-block animate-bounce mx-1" style={{ animationDelay: '0.1s' }}>.</span>
            <span className="inline-block animate-bounce mx-1" style={{ animationDelay: '0.2s' }}>.</span>
            <span className="inline-block animate-bounce mx-1" style={{ animationDelay: '0.3s' }}>.</span>
          </p>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

        <style>{`
          @keyframes loading-bar {
            0% { width: 0%; margin-left: 0; }
            50% { width: 70%; margin-left: 0; }
            100% { width: 0%; margin-left: 100%; }
          }
          .animate-loading-bar {
            animation: loading-bar 1.5s ease-in-out infinite;
          }
        `}</style>
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
          <Route path="/register" element={
            <main className="relative w-full min-h-screen">
              <BackgroundManager />
              <div className="relative z-10">
                <HxDRegistration />
              </div>
            </main>

          } />
          <Route path="/edit" element={<EditRegistration />} />
          <Route path="/*" element={
            <main className="relative w-full min-h-screen">
              <BackgroundManager />
              <div className="max-w-screen-2xl mx-auto relative z-10">
                <Navbar />
                <div className="h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
                  <div id="hero" className="min-h-screen w-full flex items-center">
                    <HeroSection />
                  </div>

                  <div id="about" className="min-h-screen w-full flex items-center justify-center">
                    <div className="w-full px-4">
                      <AboutUs />
                    </div>
                  </div>

                  <div id="events" className="min-h-screen w-full flex items-center justify-center">
                    <div className="w-full">
                      <Events />
                    </div>
                  </div>

                  <div id="dataverse" className="min-h-screen w-full">
                    <DataverseSection />
                  </div>

                  <div id="gallery" className="min-h-screen w-full">
                    <Gallery />
                  </div>

                  <div id="contact" className="min-h-screen w-full">
                    <Contact />
                  </div>

                  <div className="w-full">
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

