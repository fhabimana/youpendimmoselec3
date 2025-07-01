import { useState, useEffect } from "react";
import { PropertyService } from "@/services/propertyService";
import { Property } from "@/lib/supabase";

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PropertyService.getAllProperties();
      setProperties(data);
    } catch (err) {
      setError("Erreur lors du chargement des propriétés");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const searchProperties = async (filters: {
    location?: string;
    property_type?: string;
    min_price?: number;
    max_price?: number;
    bedrooms?: number;
    bathrooms?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const data = await PropertyService.searchProperties(filters);
      setProperties(data);
    } catch (err) {
      setError("Erreur lors de la recherche");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refreshProperties = () => {
    fetchProperties();
  };

  return {
    properties,
    loading,
    error,
    searchProperties,
    refreshProperties,
  };
};

export const useProperty = (id: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await PropertyService.getPropertyById(id);
        setProperty(data);
      } catch (err) {
        setError("Erreur lors du chargement de la propriété");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  return { property, loading, error };
};
