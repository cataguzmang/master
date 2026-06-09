export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          business_id: string
          created_at: string | null
          event_type: string
          id: string
          product_id: string | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          event_type: string
          id?: string
          product_id?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          event_type?: string
          id?: string
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          brand_color: string | null
          created_at: string | null
          description: string | null
          id: string
          logo_url: string | null
          name: string
          owner_id: string
          slug: string
          whatsapp: string | null
        }
        Insert: {
          brand_color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          owner_id: string
          slug: string
          whatsapp?: string | null
        }
        Update: {
          brand_color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          owner_id?: string
          slug?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          business_id: string
          id: string
          name: string
          position: number | null
        }
        Insert: {
          business_id: string
          id?: string
          name: string
          position?: number | null
        }
        Update: {
          business_id?: string
          id?: string
          name?: string
          position?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          business_id: string
          category_id: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          id: string
          image_url: string | null
          is_available: boolean | null
          is_featured: boolean | null
          name: string
          price: number | null
        }
        Insert: {
          business_id: string
          category_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          is_featured?: boolean | null
          name: string
          price?: number | null
        }
        Update: {
          business_id?: string
          category_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          is_featured?: boolean | null
          name?: string
          price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

type PublicSchema = Database["public"]

export type Business = PublicSchema["Tables"]["businesses"]["Row"]
export type BusinessInsert = PublicSchema["Tables"]["businesses"]["Insert"]
export type BusinessUpdate = PublicSchema["Tables"]["businesses"]["Update"]

export type Category = PublicSchema["Tables"]["categories"]["Row"]
export type CategoryInsert = PublicSchema["Tables"]["categories"]["Insert"]

export type Product = PublicSchema["Tables"]["products"]["Row"]
export type ProductInsert = PublicSchema["Tables"]["products"]["Insert"]
export type ProductUpdate = PublicSchema["Tables"]["products"]["Update"]
