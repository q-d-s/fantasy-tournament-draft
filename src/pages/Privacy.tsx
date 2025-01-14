import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="container mx-auto py-8 px-4 mt-16 flex-grow">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>Privacy Policy</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-4xl mx-auto mt-8 prose">
          <h1 className="text-4xl font-khand text-primary mb-8">Privacy Policy</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-khand text-primary mb-4">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including when you:</p>
            <ul>
              <li>Create an account</li>
              <li>Join or create a league</li>
              <li>Participate in drafts</li>
              <li>Contact us for support</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-khand text-primary mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Process your transactions</li>
              <li>Send you updates about your leagues</li>
              <li>Improve our services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-khand text-primary mb-4">3. Information Sharing</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul>
              <li>Other league members (limited to necessary gameplay information)</li>
              <li>Service providers who assist in operating our platform</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;