"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Mic, PlaySquare, StopCircle } from "lucide-react";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

export default function InterviewPracticePage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Hi there! I'm your AI Interview Coach. To get started, please tell me what role you are interviewing for and whether you want a behavioral or technical mock interview." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev, 
        { 
          id: (Date.now() + 1).toString(), 
          role: "assistant", 
          content: "That's a great role to aim for. Let's start with a behavioral question. Can you tell me about a time when you had to deal with a difficult team member or client? How did you handle the situation, and what was the outcome?" 
        }
      ]);
    }, 1500);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
       // simulate voice recording ending after some time
       setTimeout(() => {
         if (isRecording) {
            setIsRecording(false);
            setInput("I once worked with a developer who constantly missed deadlines...");
         }
       }, 3000);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Interview Practice</h1>
        <p className="text-muted-foreground">Real-time mock interviews with context-aware AI feedback.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 flex-1 min-h-0">
        <div className="md:col-span-1 space-y-4 flex flex-col">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-lg">Session Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Status</p>
                <Badge variant="success" className="animate-pulse">Active Session</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Duration</p>
                <p className="text-2xl font-bold font-mono">12:45</p>
              </div>
              <div className="pt-4 space-y-2 border-t border-border">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <PlaySquare className="mr-2 h-4 w-4" /> New Session
                </Button>
                <Button variant="destructive" className="w-full justify-start" size="sm">
                  <StopCircle className="mr-2 h-4 w-4" /> End Interview
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <GlassCard className="md:col-span-3 flex flex-col h-full overflow-hidden border-border/50">
          <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                  {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm ${
                  msg.role === 'assistant' 
                    ? 'bg-muted/50 border border-border text-foreground' 
                    : 'bg-primary text-primary-foreground'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                  <Bot size={18} />
                </div>
                <div className="bg-muted/50 border border-border rounded-2xl px-5 py-4 flex gap-1 items-center">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-md">
            <div className="flex gap-2 items-end">
              <Button 
                variant={isRecording ? "destructive" : "outline"} 
                size="icon" 
                className={`shrink-0 h-12 w-12 rounded-full ${isRecording ? 'animate-pulse' : ''}`}
                onClick={toggleRecording}
              >
                <Mic size={20} />
              </Button>
              <Input 
                placeholder="Type your response or click mic to speak..." 
                className="h-12 bg-background border-border/50 rounded-full px-6"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button 
                size="icon" 
                className="shrink-0 h-12 w-12 rounded-full bg-[var(--gradient-cta)] hover:opacity-90 border-0"
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
              >
                <Send size={20} className="text-white" />
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
