import { supabase, User } from "@/lib/supabase";

export class AuthService {
  // Inscription
  static async signUp(
    email: string,
    password: string,
    fullName: string,
    userType: "owner" | "admin" | "agent" = "owner",
  ) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            user_type: userType,
          },
        },
      });

      if (error) throw error;

      // Créer l'entrée dans la table users
      if (data.user) {
        await supabase.from("users").insert([
          {
            id: data.user.id,
            email,
            full_name: fullName,
            user_type: userType,
          },
        ]);
      }

      return { data, error: null };
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      return { data: null, error };
    }
  }

  // Connexion
  static async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      return { data: null, error };
    }
  }

  // Déconnexion
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      return { error };
    }
  }

  // Récupérer l'utilisateur actuel
  static async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) throw error;

      if (user) {
        // Récupérer les informations complètes de l'utilisateur
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (userError) throw userError;
        return { user: userData, error: null };
      }

      return { user: null, error: null };
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      return { user: null, error };
    }
  }

  // Réinitialiser le mot de passe
  static async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error(
        "Erreur lors de la réinitialisation du mot de passe:",
        error,
      );
      return { error };
    }
  }

  // Mettre à jour le profil utilisateur
  static async updateProfile(
    userId: string,
    updates: Partial<User>,
  ): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      return null;
    }
  }

  // Écouter les changements d'authentification
  static onAuthStateChange(callback: (user: any) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null);
    });
  }
}
