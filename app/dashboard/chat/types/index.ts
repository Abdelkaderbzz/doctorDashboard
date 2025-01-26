export interface Conversation {
    id: string
    name: string
    lastMessage: string
    messages: Message[]
  }
  
  export interface Message {
    id: string
    role: "doctor" | "patient"
    content: string
  }
  
  