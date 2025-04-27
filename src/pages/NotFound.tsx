import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="flex justify-center mb-6">
            <Bell className="h-16 w-16 text-devotional-orange/40" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-devotional-maroon">404</h1>
          <p className="text-xl text-devotional-maroon/70 mb-6">
            माफ़ कीजिये! हमें यह पृष्ठ नहीं मिला।
            <br />
            <span className="text-base">Oops! Page not found.</span>
          </p>
          <Button asChild className="bg-devotional-orange hover:bg-devotional-red text-white px-6">
            <Link to="/">
              वापस मुख्य पृष्ठ पर जाएँ
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
