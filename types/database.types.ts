export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      bill_user_relation: {
        Row: {
          amount_to_pay: number;
          bill_id: number;
          id: number;
          is_paid: boolean;
          user_id: string;
        };
        Insert: {
          amount_to_pay: number;
          bill_id: number;
          id?: number;
          is_paid: boolean;
          user_id: string;
        };
        Update: {
          amount_to_pay?: number;
          bill_id?: number;
          id?: number;
          is_paid?: boolean;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bill_user_relation_bill_id_fkey";
            columns: ["bill_id"];
            isOneToOne: false;
            referencedRelation: "bills";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bill_user_relation_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      bills: {
        Row: {
          amount: number;
          created_at: string;
          created_by: string;
          currency: string;
          group_id: number | null;
          id: number;
          note: string | null;
        };
        Insert: {
          amount: number;
          created_at?: string;
          created_by: string;
          currency: string;
          group_id?: number | null;
          id?: number;
          note?: string | null;
        };
        Update: {
          amount?: number;
          created_at?: string;
          created_by?: string;
          currency?: string;
          group_id?: number | null;
          id?: number;
          note?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "bills_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bills_group_id_fkey";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "groups";
            referencedColumns: ["id"];
          },
        ];
      };
      group_members: {
        Row: {
          group_id: number;
          id: number;
          user_id: string;
        };
        Insert: {
          group_id: number;
          id?: number;
          user_id: string;
        };
        Update: {
          group_id?: number;
          id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "groups";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "group_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      groups: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
