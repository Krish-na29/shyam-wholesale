import { Layout } from "@/components/layout/Layout";
import { Bell, Flower } from "lucide-react";
const About = () => {
  return <Layout>
      <div className="bg-devotional-cream py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-devotional-maroon text-center">About Shyam Wholesale Mart</h1>
          <div className="flex justify-center mt-4">
            <div className="w-20 h-1 bg-devotional-orange rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img alt="Shyam Wholesale Mart Shop" src="/lovable-uploads/9a623be2-f577-4999-82ba-e40c97f6e92a.jpg" className="rounded-lg shadow-lg w-full h-96 object-fill" />
          </div>
          <div>
            <div className="flex items-center mb-4">
              <Bell className="h-6 w-6 text-devotional-red mr-2" />
              <h2 className="text-2xl font-bold text-devotional-maroon">Our Story</h2>
            </div>
            <p className="text-devotional-maroon/80 mb-4">Shyam Wholesale Mart began its journey in 2023 with a heartfelt mission: to provide the purest, most authentic vastras and accessories for deities to devotees across India.</p>
            <p className="text-devotional-maroon/80 mb-4">Founded by Vipul Agrawal, a devoted bhakt of Lord Shyam, our small shop was born from his personal quest to find genuinely traditional and high-quality vastras for his home mandir. What started as a humble venture with a handful of handcrafted items has quickly grown into a trusted name for devotional products.</p>
            <p className="text-devotional-maroon/80">Today, we are proud to serve temples and individual devotees alike, staying true to our core values of authenticity, purity, and devotion that inspired our beginnings.

          </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 lg:order-1">
            <div className="flex items-center mb-4">
              <Flower className="h-6 w-6 text-devotional-red mr-2" />
              <h2 className="text-2xl font-bold text-devotional-maroon">Our Spiritual Inspiration</h2>
            </div>
            <p className="text-devotional-maroon/80 mb-4">
              At the heart of Shyam Wholesale Mart is our deep reverence for divine traditions. We believe that adorning the deities with the purest of vastras is not just a ritual but a profound form of bhakti (devotion).
            </p>
            <p className="text-devotional-maroon/80 mb-4">
              Each product in our collection is crafted with spiritual intention. Our artisans work in a serene environment, often chanting mantras while they create these sacred items. This infuses our products with positive spiritual energy.
            </p>
            <p className="text-devotional-maroon/80">
              We follow traditional Vedic standards for purity, ensuring that all materials used are sattvic (pure) and sourced ethically. This spiritual foundation guides every aspect of our business.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <img alt="Spiritual Craftsmen at Work" src="/lovable-uploads/3711b6bf-086a-4b10-abc1-a33099932d48.jpg" className="rounded-lg shadow-lg w-full h-96 object-cover" />
          </div>
        </div>
        
        <div className="bg-devotional-lightOrange/30 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-devotional-maroon text-center mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-devotional-orange text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-devotional-maroon mb-2">Purity</h3>
              <p className="text-devotional-maroon/70">
                We ensure that all our products are made from the purest materials, sourced ethically and processed traditionally.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-devotional-orange text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-devotional-maroon mb-2">Authenticity</h3>
              <p className="text-devotional-maroon/70">
                Our designs and crafting techniques stay true to ancient traditions, preserving the sacred art forms.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-devotional-orange text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-devotional-maroon mb-2">Service</h3>
              <p className="text-devotional-maroon/70">
                We view our work as seva (service) to the divine and to our community of devotees, not merely as business.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-devotional-maroon mb-4">Our Local Roots</h2>
          <p className="text-devotional-maroon/80 max-w-3xl mx-auto mb-8">
            Based in the heart of Mathura, the birthplace of Lord Krishna, our location deeply influences our work. We collaborate with local artisans, many of whom come from families that have been creating devotional items for generations. This not only helps preserve traditional craftsmanship but also supports our local community.
          </p>
          <div className="bg-devotional-cream p-6 rounded-lg inline-block">
            <blockquote className="italic text-lg text-devotional-maroon/90">
              "हमारा संकल्प है कि हर घर के मंदिर में शुद्ध और पवित्र वस्त्र पहुंचे।"
            </blockquote>
            <p className="text-devotional-orange mt-2">— Shri Vipul Agrawal, Founder</p>
          </div>
        </div>
      </div>
    </Layout>;
};
export default About;