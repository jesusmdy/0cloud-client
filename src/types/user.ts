export interface User {
  display_name: string;
  email: string;
  user_id: string;
  storage: {
    allocated: number
    available: number
  }
}