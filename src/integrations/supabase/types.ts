export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      certificates: {
        Row: {
          course_slug: string
          id: string
          issued_at: string
          serial: string
          user_id: string
        }
        Insert: {
          course_slug: string
          id?: string
          issued_at?: string
          serial?: string
          user_id: string
        }
        Update: {
          course_slug?: string
          id?: string
          issued_at?: string
          serial?: string
          user_id?: string
        }
        Relationships: []
      }
      course_videos: {
        Row: {
          course_slug: string
          created_at: string
          created_by: string | null
          description: string
          duration: string
          highlights: string[]
          id: string
          position: number
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          course_slug: string
          created_at?: string
          created_by?: string | null
          description?: string
          duration?: string
          highlights?: string[]
          id?: string
          position?: number
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          course_slug?: string
          created_at?: string
          created_by?: string | null
          description?: string
          duration?: string
          highlights?: string[]
          id?: string
          position?: number
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          amount_cents: number
          completed_at: string | null
          course_slug: string
          created_at: string
          currency: string
          id: string
          payment_provider: string
          payment_reference: string | null
          status: string
          user_id: string
        }
        Insert: {
          amount_cents?: number
          completed_at?: string | null
          course_slug: string
          created_at?: string
          currency?: string
          id?: string
          payment_provider?: string
          payment_reference?: string | null
          status?: string
          user_id: string
        }
        Update: {
          amount_cents?: number
          completed_at?: string | null
          course_slug?: string
          created_at?: string
          currency?: string
          id?: string
          payment_provider?: string
          payment_reference?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      lesson_answers: {
        Row: {
          body: string
          created_at: string
          id: string
          question_id: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          question_id: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          question_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "lesson_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_notes: {
        Row: {
          body: string
          course_slug: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
          video_id: string
        }
        Insert: {
          body?: string
          course_slug: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
          video_id: string
        }
        Update: {
          body?: string
          course_slug?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
          video_id?: string
        }
        Relationships: []
      }
      lesson_questions: {
        Row: {
          body: string
          course_slug: string
          created_at: string
          id: string
          user_id: string
          video_id: string
        }
        Insert: {
          body: string
          course_slug: string
          created_at?: string
          id?: string
          user_id: string
          video_id: string
        }
        Update: {
          body?: string
          course_slug?: string
          created_at?: string
          id?: string
          user_id?: string
          video_id?: string
        }
        Relationships: []
      }
      live_messages: {
        Row: {
          body: string
          created_at: string
          display_name: string
          id: string
          kind: string
          session_id: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          display_name?: string
          id?: string
          kind?: string
          session_id: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          display_name?: string
          id?: string
          kind?: string
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "live_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      live_sessions: {
        Row: {
          cover_url: string | null
          created_at: string
          description: string
          duration_minutes: number
          id: string
          is_live: boolean
          slug: string
          starts_at: string
          stream_url: string | null
          teacher: string
          title: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          description?: string
          duration_minutes?: number
          id?: string
          is_live?: boolean
          slug: string
          starts_at?: string
          stream_url?: string | null
          teacher?: string
          title: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          description?: string
          duration_minutes?: number
          id?: string
          is_live?: boolean
          slug?: string
          starts_at?: string
          stream_url?: string | null
          teacher?: string
          title?: string
        }
        Relationships: []
      }
      practice_days: {
        Row: {
          created_at: string
          day: string
          id: string
          minutes: number
          user_id: string
        }
        Insert: {
          created_at?: string
          day?: string
          id?: string
          minutes?: number
          user_id: string
        }
        Update: {
          created_at?: string
          day?: string
          id?: string
          minutes?: number
          user_id?: string
        }
        Relationships: []
      }
      practice_submissions: {
        Row: {
          course_slug: string
          created_at: string
          feedback: string | null
          id: string
          note: string | null
          status: string
          storage_path: string
          test_id: string
          user_id: string
        }
        Insert: {
          course_slug: string
          created_at?: string
          feedback?: string | null
          id?: string
          note?: string | null
          status?: string
          storage_path: string
          test_id: string
          user_id: string
        }
        Update: {
          course_slug?: string
          created_at?: string
          feedback?: string | null
          id?: string
          note?: string | null
          status?: string
          storage_path?: string
          test_id?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string
          email: string | null
          id: string
        }
        Insert: {
          created_at?: string
          display_name?: string
          email?: string | null
          id: string
        }
        Update: {
          created_at?: string
          display_name?: string
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      site_visits: {
        Row: {
          created_at: string
          id: string
          path: string
          referrer: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          path: string
          referrer?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          path?: string
          referrer?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      test_attempts: {
        Row: {
          answers: Json
          course_slug: string
          created_at: string
          id: string
          kind: string
          score: number
          test_id: string
          total: number
          user_id: string
        }
        Insert: {
          answers?: Json
          course_slug: string
          created_at?: string
          id?: string
          kind?: string
          score?: number
          test_id: string
          total?: number
          user_id: string
        }
        Update: {
          answers?: Json
          course_slug?: string
          created_at?: string
          id?: string
          kind?: string
          score?: number
          test_id?: string
          total?: number
          user_id?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_key: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_key: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_key?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      video_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          course_slug: string
          created_at: string
          id: string
          user_id: string
          video_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          course_slug: string
          created_at?: string
          id?: string
          user_id: string
          video_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          course_slug?: string
          created_at?: string
          id?: string
          user_id?: string
          video_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "teacher" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "teacher", "student"],
    },
  },
} as const
