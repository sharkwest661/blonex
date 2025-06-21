export default function ListingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Listings will be loaded here */}
        <div className="text-center text-gray-500 col-span-full">
          Listings will be displayed here once the components are implemented.
        </div>
      </div>
    </div>
  );
}
