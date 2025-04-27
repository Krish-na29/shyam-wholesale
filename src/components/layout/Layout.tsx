
import { ReactNode, useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Volume, VolumeX } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {

  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const visited = localStorage.getItem('hasVisitedShyamMart');
    if (!visited) {
      // Play welcome sound - using MP3 format which is widely supported
      const welcomeAudio = new Audio('/welcome-sound.mp3');
      welcomeAudio.volume = 0.2;
      welcomeAudio.play().catch(error => {
        console.error("Welcome audio playback failed:", error);
      });
      
      // Set the flag to prevent repeated playing
      localStorage.setItem('hasVisitedShyamMart', 'true');
      setHasVisited(true);
    } else {
      setHasVisited(true);
    }
  }, []);



  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
      

    </div>
  );
};
