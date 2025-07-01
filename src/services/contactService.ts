import { supabase, ContactRequest, EmailAlert } from "@/lib/supabase";

export class ContactService {
  // Créer une demande de contact
  static async createContactRequest(
    request: Omit<ContactRequest, "id" | "created_at" | "status">,
  ): Promise<ContactRequest | null> {
    try {
      const { data, error } = await supabase
        .from("contact_requests")
        .insert([{ ...request, status: "new" }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Erreur lors de la création de la demande:", error);
      return null;
    }
  }

  // Récupérer toutes les demandes de contact
  static async getAllContactRequests(): Promise<ContactRequest[]> {
    try {
      const { data, error } = await supabase
        .from("contact_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des demandes:", error);
      return [];
    }
  }

  // Mettre à jour le statut d'une demande
  static async updateContactRequestStatus(
    id: string,
    status: "new" | "contacted" | "closed",
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("contact_requests")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      return false;
    }
  }

  // Créer une alerte email
  static async createEmailAlert(
    alert: Omit<EmailAlert, "id" | "created_at">,
  ): Promise<EmailAlert | null> {
    try {
      const { data, error } = await supabase
        .from("email_alerts")
        .insert([alert])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Erreur lors de la création de l'alerte:", error);
      return null;
    }
  }

  // Récupérer les alertes email d'un utilisateur
  static async getUserEmailAlerts(userEmail: string): Promise<EmailAlert[]> {
    try {
      const { data, error } = await supabase
        .from("email_alerts")
        .select("*")
        .eq("user_email", userEmail)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des alertes:", error);
      return [];
    }
  }

  // Désactiver une alerte email
  static async deactivateEmailAlert(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("email_alerts")
        .update({ is_active: false })
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Erreur lors de la désactivation de l'alerte:", error);
      return false;
    }
  }
}
