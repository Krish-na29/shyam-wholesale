import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export const Hero = () => {
  return <section className="py-12 md:py-20 devotional-gradient">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8 animate-devotional-fade">
            <h1 className="text-4xl md:text-5xl font-bold text-devotional-maroon mb-4">
              Buy Divine Vastra for Bhagwan
            </h1>
            <p className="text-xl text-devotional-maroon/80 mb-4 hindi">
              मंदिर के लिए शुद्ध वस्त्र – सीधा श्याम होलसेल मार्ट से
            </p>
            <p className="text-lg text-devotional-maroon/70 mb-6 hindi">
              पूजा में हो पवित्रता, वस्त्र हों शुद्धता वाले
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-devotional-orange hover:bg-devotional-red text-white">
                <Link to="/shop">
                  Explore Vastra Collection
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-devotional-orange text-devotional-maroon hover:bg-devotional-lightOrange">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 animate-devotional-fade" style={{
          animationDelay: "0.2s"
        }}>
            <div className="relative">
              <img alt="Divine Vastras" style={{
              height: "400px"
            }} src="/lovable-uploads/963ec325-1b8c-408f-a784-26025adf0cc4.png" className="rounded-lg shadow-lg w-full object-contain" />
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-md animate-glow">
                <p className="text-devotional-maroon font-bold">100% Pure &amp; Authentic</p>
                <p className="text-devotional-orange text-sm">Hand-crafted with devotion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};