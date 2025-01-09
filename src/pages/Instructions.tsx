import Navigation from "../components/Navigation";

const Instructions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Instructions</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 italic">Instructions content will be added here.</p>
        </div>
      </main>
    </div>
  );
};

export default Instructions;