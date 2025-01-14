import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="container mx-auto py-8 px-4 mt-16 flex-grow">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>About Us</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-5xl mx-auto mt-8">
          <h1 className="text-4xl font-khand text-primary mb-8 text-center">About Tournament Draft League</h1>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3].map((founder) => (
              <Card key={founder} className="border-secondary/20">
                <CardHeader>
                  <CardTitle className="font-khand text-2xl text-center">Founder {founder}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4" />
                  <p className="text-gray-600">Coming soon...</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;