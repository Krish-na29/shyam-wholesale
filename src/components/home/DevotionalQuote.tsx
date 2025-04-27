
import { Bell, Flower } from "lucide-react";

export const DevotionalQuote = () => {
  return (
    <section className="py-16 bg-devotional-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Bell className="h-10 w-10 text-devotional-orange animate-slow-spin" />
              <Flower className="h-6 w-6 text-devotional-red absolute -top-2 -right-2" />
            </div>
          </div>
          
          <blockquote className="mb-6">
            <p className="text-2xl md:text-3xl text-devotional-maroon italic font-light leading-relaxed">
              "जैसे ईश्वर को शुद्ध मन से पूजते हैं, वैसे ही शुद्ध वस्त्रों से सजाते हैं।"
            </p>
          </blockquote>
          
          <p className="text-lg text-devotional-orange font-medium">
            — Ancient Devotional Wisdom
          </p>
          
          <div className="mt-8">
            <div className="w-20 h-1 bg-devotional-orange/50 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
