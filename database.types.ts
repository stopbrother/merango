export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      party_member: {
        Row: {
          id: string
          joined_date_time: string
          party_id: string
          profile_id: string
        }
        Insert: {
          id?: string
          joined_date_time?: string
          party_id?: string
          profile_id?: string
        }
        Update: {
          id?: string
          joined_date_time?: string
          party_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "party_member_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "party_recruit"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "party_member_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "party_recruit_sort"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "party_member_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      party_recruit: {
        Row: {
          created_by: string
          created_date_time: string
          description: string
          id: string
          party_type: Database["public"]["Enums"]["party_type_enum"]
          raised_date_time: string | null
          title: string
          updated_date_time: string | null
        }
        Insert: {
          created_by?: string
          created_date_time?: string
          description?: string
          id?: string
          party_type?: Database["public"]["Enums"]["party_type_enum"]
          raised_date_time?: string | null
          title?: string
          updated_date_time?: string | null
        }
        Update: {
          created_by?: string
          created_date_time?: string
          description?: string
          id?: string
          party_type?: Database["public"]["Enums"]["party_type_enum"]
          raised_date_time?: string | null
          title?: string
          updated_date_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "party_recruit_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string
          full_name: string
          id: string
          intro: string | null
          job: string | null
          level: number | null
          social_name: string | null
          updated_at: string | null
          username: string
          website: string | null
        }
        Insert: {
          avatar_url: string
          full_name: string
          id: string
          intro?: string | null
          job?: string | null
          level?: number | null
          social_name?: string | null
          updated_at?: string | null
          username: string
          website?: string | null
        }
        Update: {
          avatar_url?: string
          full_name?: string
          id?: string
          intro?: string | null
          job?: string | null
          level?: number | null
          social_name?: string | null
          updated_at?: string | null
          username?: string
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      party_recruit_sort: {
        Row: {
          created_by: string | null
          created_date_time: string | null
          description: string | null
          id: string | null
          party_type: Database["public"]["Enums"]["party_type_enum"] | null
          raised_date_time: string | null
          sort_time: string | null
          title: string | null
          updated_date_time: string | null
        }
        Insert: {
          created_by?: string | null
          created_date_time?: string | null
          description?: string | null
          id?: string | null
          party_type?: Database["public"]["Enums"]["party_type_enum"] | null
          raised_date_time?: string | null
          sort_time?: never
          title?: string | null
          updated_date_time?: string | null
        }
        Update: {
          created_by?: string | null
          created_date_time?: string | null
          description?: string | null
          id?: string | null
          party_type?: Database["public"]["Enums"]["party_type_enum"] | null
          raised_date_time?: string | null
          sort_time?: never
          title?: string | null
          updated_date_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "party_recruit_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      party_type_enum: "hunt" | "quest" | "boss"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      party_type_enum: ["hunt", "quest", "boss"],
    },
  },
} as const
