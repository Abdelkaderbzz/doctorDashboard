import { ScrollArea } from "@/components/ui/scroll-area"
import { Conversation } from "../types"

interface SidebarProps {
  conversations: Conversation[]
  selectedConversation: string
  onSelectConversation: (id: string) => void
}

export default function Sidebar({ conversations, selectedConversation, onSelectConversation }: any) {
  return (
    <div className="w-64 bg-white border-r h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Conversations</h2>
      </div>
      <ScrollArea >
        <ul>
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              className={`p-4 hover:bg-gray-100 cursor-pointer ${selectedConversation === conversation.id ? "bg-blue-100" : ""}`}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <h3 className="font-medium">{conversation.name}</h3>
              <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}

