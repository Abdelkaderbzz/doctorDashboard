import type { FormEvent } from "react";
import type { Message } from "../types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatAreaProps {
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  conversation: any;
}

export default function ChatArea({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  conversation,
}: ChatAreaProps) {
  console.log({ conversation });
  return (
    <div className="flex flex-col basis-[100%]">
      <div className="bg-white border-b p-4">
        <h2 className="text-xl font-semibold">{conversation?.name}</h2>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <ScrollArea className="">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.role === "patient" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg max-w-[70%] ${
                  message.role === "patient"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
          <Input
            className="flex-grow"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}
