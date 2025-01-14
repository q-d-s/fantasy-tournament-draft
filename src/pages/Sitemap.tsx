import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";

const Sitemap = () => {
  const links = [
    { title: "Main Pages", items: [
      { name: "Home", path: "/" },
      { name: "Create League", path: "/leagues/create" },
      { name: "Find Leagues", path: "/leagues" },
      { name: "How to Play", path: "/instructions" },
    ]},
    { title: "Account", items: [
      { name: "Sign In", path: "/auth" },
      { name: "My Account", path: "/account" },
    ]},
    { title: "Information", items: [
      { name: "About Us", path: "/about" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Contact Us", path: "/about" },
    ]},
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="container mx-auto py-8 px-4 mt-16 flex-grow">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>Sitemap</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-4xl mx-auto mt-8">
          <h1 className="text-4xl font-khand text-primary mb-8">Sitemap</h1>
          
          <div className="grid md:grid-cols-3 gap-8">
            {links.map((section) => (
              <div key={section.title}>
                <h2 className="text-2xl font-khand text-primary mb-4">{section.title}</h2>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <Link 
                        to={item.path}
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sitemap;