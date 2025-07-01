import { supabase, Agent } from "@/lib/supabase";

export class AgentService {
  // Récupérer tous les agents
  static async getAllAgents(): Promise<Agent[]> {
    try {
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .order("province", { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des agents:", error);
      return [];
    }
  }

  // Récupérer un agent par ID
  static async getAgentById(id: string): Promise<Agent | null> {
    try {
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'agent:", error);
      return null;
    }
  }

  // Récupérer les agents par province
  static async getAgentsByProvince(province: string): Promise<Agent[]> {
    try {
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .eq("province", province);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des agents par province:",
        error,
      );
      return [];
    }
  }

  // Créer un nouvel agent
  static async createAgent(
    agent: Omit<Agent, "id" | "created_at" | "updated_at">,
  ): Promise<Agent | null> {
    try {
      const { data, error } = await supabase
        .from("agents")
        .insert([agent])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Erreur lors de la création de l'agent:", error);
      return null;
    }
  }

  // Mettre à jour un agent
  static async updateAgent(
    id: string,
    updates: Partial<Agent>,
  ): Promise<Agent | null> {
    try {
      const { data, error } = await supabase
        .from("agents")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'agent:", error);
      return null;
    }
  }

  // Supprimer un agent
  static async deleteAgent(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from("agents").delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'agent:", error);
      return false;
    }
  }
}
