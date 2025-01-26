"use client";

import { useState } from "react";

import type { Conversation, Message } from "./types";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";

const initialConversations: Conversation[] = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "I don't want to feel this way anymore.",
    messages: [
      {
        id: "1",
        role: "doctor",
        content:
          "I see. So the drug use is a way to cope with the emotional pain from your dad's words?",
      },
      {
        id: "2",
        role: "patient",
        content:
          "Exactly. It's like the only way I can survive those moments. When I'm high, I don't care what he says. I don't care about anything. It's the only time I feel… free, I guess.",
      },
      {
        id: "3",
        role: "doctor",
        content:
          "That sounds really tough. Have you ever talked to anyone about how your dad treats you?",
      },
      {
        id: "4",
        role: "patient",
        content:
          "Not really. I mean, my mom knows, but she doesn't say much. She's scared of him too. I feel so trapped. I hate that I have to use drugs just to get through the day, but I don't know what else to do.",
      },
      {
        id: "5",
        role: "doctor",
        content:
          "I understand. It's not easy, but we can work on finding healthier ways to cope. You don't have to face this alone.",
      },
      {
        id: "6",
        role: "patient",
        content:
          "I just… I don't want to feel this way anymore. I want to be stronger, but it's so hard when it feels like the world is against me.",
      },
      {
        id: "7",
        role: "doctor",
        content:
          "You're already strong for being here and talking about this. Let's focus on building tools to handle these situations without relying on drugs. We'll take it step by step.",
      },
      {
        id: "8",
        role: "patient",
        content:
          "Okay… I'll try. I just want to feel like I'm worth something, you know?",
      },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    lastMessage: "Thank you for your help, doctor.",
    messages: [
      {
        id: "1",
        role: "doctor",
        content: "Hello Jane, how have you been since our last session?",
      },
      {
        id: "2",
        role: "patient",
        content:
          "I've been doing better, doctor. The exercises you suggested have really helped with my anxiety.",
      },
      {
        id: "3",
        role: "doctor",
        content:
          "That's great to hear, Jane. Can you tell me more about how you've been implementing them?",
      },
      {
        id: "4",
        role: "patient",
        content:
          "Well, I've been doing the deep breathing exercises every morning, and I've started journaling before bed. It's helping me process my thoughts.",
      },
      {
        id: "5",
        role: "doctor",
        content:
          "Excellent. Consistency is key with these practices. Have you noticed any changes in your daily life?",
      },
      {
        id: "6",
        role: "patient",
        content:
          "Yes, I feel more in control. I had a stressful situation at work last week, and I was able to handle it without panicking.",
      },
      {
        id: "7",
        role: "doctor",
        content:
          "That's a significant improvement, Jane. You should be proud of yourself. Let's discuss that situation and see what we can learn from it.",
      },
      {
        id: "8",
        role: "patient",
        content:
          "Thank you for your help, doctor. I feel like I'm making real progress.",
      },
    ],
  },
  {
    id: "3",
    name: "Mike Johnson",
    lastMessage: "When is our next appointment?",
    messages: [
      {
        id: "1",
        role: "patient",
        content:
          "Hi doctor, I hope you're doing well. I was wondering when our next appointment is scheduled?",
      },
      {
        id: "2",
        role: "doctor",
        content:
          "Hello Mike, it's good to hear from you. Our next appointment is scheduled for next Tuesday at 2 PM. How have you been feeling since our last session?",
      },
      {
        id: "3",
        role: "patient",
        content:
          "I've been okay, I guess. The new medication seems to be helping with my depression, but I'm still having trouble sleeping.",
      },
      {
        id: "4",
        role: "doctor",
        content:
          "I'm glad to hear the medication is helping. Let's discuss your sleep issues during our next session. Have you been practicing the sleep hygiene techniques we talked about?",
      },
      {
        id: "5",
        role: "patient",
        content:
          "I've tried, but it's been difficult to stick to a regular sleep schedule. My thoughts keep racing when I try to fall asleep.",
      },
      {
        id: "6",
        role: "doctor",
        content:
          "I understand, Mike. Sleep disturbances are common with depression. We'll work on some additional strategies in our next session. In the meantime, try to limit screen time before bed and maybe try some relaxation exercises.",
      },
      {
        id: "7",
        role: "patient",
        content:
          "Okay, I'll give that a try. Thanks, doctor. See you next Tuesday.",
      },
      {
        id: "8",
        role: "doctor",
        content: "You're welcome, Mike. Take care, and I'll see you then.",
      },
    ],
  },
];

export default function ChatPage() {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState<string>(
    conversations[0].id
  );
  const [messages, setMessages] = useState<Message[]>(
    conversations[0].messages
  );
  const [input, setInput] = useState("");

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    const selected = conversations.find((conv) => conv.id === id);
    if (selected) {
      setMessages(selected.messages);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: Message = {
        id: String(messages.length + 1),
        role: "patient",
        content: input.trim(),
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);

      // Update the conversation in the list
      const updatedConversations = conversations.map((conv) =>
        conv.id === selectedConversation
          ? { ...conv, messages: updatedMessages }
          : conv
      );
      setConversations(updatedConversations);

      setInput("");
    }
  };

  return (
    <div className="flex bg-gray-100 h-full w-full">
      <Sidebar
        conversations={conversations}
        selectedConversation={selectedConversation}
        onSelectConversation={handleSelectConversation}
      />
      <ChatArea
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        conversation={conversations.find(
          (conversation) => conversation.id === selectedConversation
        )}
      />
    </div>
  );
}
