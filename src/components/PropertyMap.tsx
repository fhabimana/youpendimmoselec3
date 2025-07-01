interface PropertyMapProps {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  price: string;
  zoom?: number;
  height?: string;
}

const PropertyMap = ({
  latitude,
  longitude,
  title,
  address,
  price,
  zoom = 15,
  height = "400px",
}: PropertyMapProps) => {
  // URL pour OpenStreetMap avec marqueur
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;

  return (
    <div className="w-full" style={{ height }}>
      {/* Informations de la propriété au-dessus de la carte */}
      <div className="bg-brand-blue text-white p-3 rounded-t-lg">
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-blue-100 text-xs">{address}</p>
        <p className="font-bold text-sm">{price}</p>
      </div>

      {/* Carte intégrée */}
      <iframe
        src={mapUrl}
        width="100%"
        height="350"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Localisation de ${title}`}
        className="rounded-b-lg"
      />

      {/* Coordonnées */}
      <div className="bg-gray-50 p-2 text-xs text-gray-600 text-center rounded-b-lg">
        Coordonnées: {latitude.toFixed(6)}, {longitude.toFixed(6)}
      </div>
    </div>
  );
};

export default PropertyMap;
