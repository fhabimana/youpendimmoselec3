import { supabase, Property } from "@/lib/supabase";

export class PropertyService {
  // Récupérer toutes les propriétés
  static async getAllProperties(): Promise<Property[]> {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("status", "available")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des propriétés:", error);
      return [];
    }
  }

  // Récupérer une propriété par ID
  static async getPropertyById(id: string): Promise<Property | null> {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération de la propriété:", error);
      return null;
    }
  }

  // Rechercher des propriétés avec filtres
  static async searchProperties(filters: {
    location?: string;
    property_type?: string;
    min_price?: number;
    max_price?: number;
    bedrooms?: number;
    bathrooms?: number;
  }): Promise<Property[]> {
    try {
      let query = supabase
        .from("properties")
        .select("*")
        .eq("status", "available");

      if (filters.location) {
        query = query.ilike("location", `%${filters.location}%`);
      }
      if (filters.property_type) {
        query = query.eq("property_type", filters.property_type);
      }
      if (filters.min_price) {
        query = query.gte("price", filters.min_price);
      }
      if (filters.max_price) {
        query = query.lte("price", filters.max_price);
      }
      if (filters.bedrooms) {
        query = query.eq("bedrooms", filters.bedrooms);
      }
      if (filters.bathrooms) {
        query = query.eq("bathrooms", filters.bathrooms);
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Erreur lors de la recherche de propriétés:", error);
      return [];
    }
  }

  // Créer une nouvelle propriété
  static async createProperty(
    property: Omit<Property, "id" | "created_at" | "updated_at">,
  ): Promise<Property | null> {
    try {
      const { data, error } = await supabase
        .from("properties")
        .insert([property])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Erreur lors de la création de la propriété:", error);
      return null;
    }
  }

  // Mettre à jour une propriété
  static async updateProperty(
    id: string,
    updates: Partial<Property>,
  ): Promise<Property | null> {
    try {
      const { data, error } = await supabase
        .from("properties")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la propriété:", error);
      return null;
    }
  }

  // Supprimer une propriété
  static async deleteProperty(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from("properties").delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Erreur lors de la suppression de la propriété:", error);
      return false;
    }
  }

  // Récupérer les propriétés par agent
  static async getPropertiesByAgent(agentId: string): Promise<Property[]> {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("agent_id", agentId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des propriétés par agent:",
        error,
      );
      return [];
    }
  }
}
