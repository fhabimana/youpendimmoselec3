import PropertyCard from "./PropertyCard";

const PropertiesSection = () => {
  const properties = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$250.000",
      title: "Maison Moderne",
      bedrooms: 4,
      bathrooms: 3,
      area: "350 m²",
      location: "Gombe, Kinshasa",
      latitude: -4.3194,
      longitude: 15.3074,
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$150.000",
      title: "Maison Contemporaine",
      bedrooms: 3,
      bathrooms: 2,
      area: "250 m²",
      location: "Bandalungwa, Kinshasa",
      latitude: -4.3803,
      longitude: 15.2736,
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$220.000",
      title: "Maison Familiale",
      bedrooms: 4,
      bathrooms: 3,
      area: "520 m²",
      location: "Lemba, Kinshasa",
      latitude: -4.4022,
      longitude: 15.2872,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            PROPRIÉTÉS EN VENTE
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de propriétés disponibles à la vente dans
            les meilleurs quartiers de Kinshasa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              image={property.image}
              price={property.price}
              title={property.title}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              area={property.area}
              location={property.location}
              latitude={property.latitude}
              longitude={property.longitude}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
