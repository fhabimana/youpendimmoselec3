import { createClient } from "@supabase/supabase-js";

// Configuration temporaire - sera remplacée par les vraies clés
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://your-project.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour la base de données
export interface Property {
  id: string;
  title: string;
  price: number;
  currency: string;
  location: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  area_unit: string;
  parking: number;
  images: string[];
  description: string;
  features: string[];
  virtual_tour?: string;
  status: "available" | "sold" | "reserved";
  property_type: "house" | "apartment" | "villa" | "land" | "commercial";
  created_at: string;
  updated_at: string;
  agent_id?: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  province: string;
  position: string;
  experience: string;
  specialties: string[];
  properties_sold: number;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  user_type: "owner" | "admin" | "agent";
  created_at: string;
  updated_at: string;
}

export interface ContactRequest {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  message: string;
  property_id?: string;
  agent_id?: string;
  status: "new" | "contacted" | "closed";
  created_at: string;
}

export interface EmailAlert {
  id: string;
  user_email: string;
  name: string;
  location?: string;
  property_type?: string;
  min_price?: number;
  max_price?: number;
  frequency: "daily" | "weekly" | "instant";
  is_active: boolean;
  created_at: string;
}
