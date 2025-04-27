import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Bell } from "lucide-react";
const Contact = () => {
  return <Layout>
      <div className="bg-devotional-cream py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-devotional-maroon text-center">Contact Us</h1>
          <div className="flex justify-center mt-4">
            <div className="w-20 h-1 bg-devotional-orange rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="card-devotional p-6 mb-8">
              <div className="flex items-center mb-6">
                <Bell className="h-6 w-6 text-devotional-red mr-2" />
                <h2 className="text-2xl font-bold text-devotional-maroon">Get In Touch</h2>
              </div>
              <p className="text-devotional-maroon/80 mb-6">
                Have questions about our products or need assistance with your order? We're here to help. Fill out the form and we'll get back to you soon.
              </p>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-devotional-maroon/80 mb-1">
                      Name
                    </label>
                    <Input id="name" placeholder="Your Name" className="border-devotional-orange/30 focus:border-devotional-orange focus:ring-devotional-orange" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-devotional-maroon/80 mb-1">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your Email" className="border-devotional-orange/30 focus:border-devotional-orange focus:ring-devotional-orange" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm text-devotional-maroon/80 mb-1">
                    Subject
                  </label>
                  <Input id="subject" placeholder="Subject" className="border-devotional-orange/30 focus:border-devotional-orange focus:ring-devotional-orange" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm text-devotional-maroon/80 mb-1">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Your Message" rows={6} className="border-devotional-orange/30 focus:border-devotional-orange focus:ring-devotional-orange" />
                </div>
                
                <Button type="submit" className="bg-devotional-orange hover:bg-devotional-red text-white w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
          
          <div>
            <div className="card-devotional p-6 mb-8">
              <h2 className="text-2xl font-bold text-devotional-maroon mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-devotional-lightOrange/50 p-3 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-devotional-maroon" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-devotional-maroon mb-1">Phone & WhatsApp</h3>
                    <p className="text-devotional-maroon/80">+91 9301280090</p>
                    <p className="text-sm text-devotional-maroon/60 mt-1">Monday to Sunday, 9am to 9pm</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-devotional-lightOrange/50 p-3 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-devotional-maroon" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-devotional-maroon mb-1">Email</h3>
                    <p className="text-devotional-maroon/80">shyamwholesalemart@gmail.com</p>
                    <p className="text-sm text-devotional-maroon/60 mt-1">
                      We aim to respond within 24 hours
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-devotional-lightOrange/50 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-devotional-maroon" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-devotional-maroon mb-1">Store Location</h3>
                    <p className="text-devotional-maroon/80">
                      vandana road, near anunay convent school, Sakti, Chhattisgarh 495689
                    </p>
                    <p className="text-sm text-devotional-maroon/60 mt-1">Store Hours: 9am to 9pm (All days)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card-devotional overflow-hidden">
              <div className="aspect-video">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d333.2701057553257!2d82.96393748598233!3d22.025970229607143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a270be4dc19bc4b%3A0x5a8f907fd5b85d67!2zU2h5YW0gd2hvbGVzYWxlIE1hcnQgKOCktuCljeCkr-CkvuCkriDgpK7gpL7gpLDgpY3gpJ8gKQ!5e0!3m2!1sen!2sin!4v1745220808529!5m2!1sen!2sin" width="100%" height="100%" style={{
                border: 0
              }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Store Location Map" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};
export default Contact;