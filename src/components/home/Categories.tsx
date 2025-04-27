import { Link } from "react-router-dom";
const categories = [{
  id: 1,
  image: "/lovable-uploads/3381f38a-c77d-4cf1-8e9d-cfa30567d551.png",
  path: "/shop?category=krishna"
}, {
  id: 2,
  image: "/lovable-uploads/6f420bd7-411f-424b-a630-3457f8402773.png",
  path: "/shop?category=ganpati"
}, {
  id: 3,
  image: "/lovable-uploads/d7647892-9567-4852-a52e-6446f024a997.png",
  path: "/shop?category=shiv"
}, {
  id: 4,
  image: "/lovable-uploads/05bdbaf1-258d-452a-b7c0-421eaff58d99.png",
  path: "/shop?category=accessories"
}];
export const Categories = () => {
  return <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-devotional-maroon mb-2">
            Divine Categories
          </h2>
          <p className="text-devotional-maroon/70 max-w-2xl mx-auto">
            Explore our collection of authentic and pure vastra for different deities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => <Link key={category.id} to={category.path} className="group overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl relative">
              <div className="h-60 overflow-hidden">
                <img src={category.image} alt="Category" className="w-full h-full transition-transform duration-500 group-hover:scale-110 object-fill" />
              </div>
            </Link>)}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/shop?category=festival" className="inline-block px-6 py-3 bg-devotional-cream text-devotional-maroon border border-devotional-orange/30 rounded-lg hover:bg-devotional-lightOrange transition-colors">
            Special Festival Collections
          </Link>
        </div>
      </div>
    </section>;
};