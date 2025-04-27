
import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { ProductSlider } from "@/components/home/ProductSlider";
import { DevotionalQuote } from "@/components/home/DevotionalQuote";
import { Categories } from "@/components/home/Categories";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Categories />
      <DevotionalQuote />
      <ProductSlider />
    </Layout>
  );
};

export default Index;
