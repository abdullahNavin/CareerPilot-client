"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestInterviewReply } from "@/lib/dashboard";
import { Send, Bot, User, Mic, PlaySquare, StopCircle, Sparkles } from "lucide-react";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

export default function InterviewPracticePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi there. I am your AI interview coach. Tell me the role you are targeting and whether you want a behavioral or technical mock interview."
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: userMessage };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);
    setError("");

    try {
      const response = await requestInterviewReply(userMessage);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.summary ?? response.recommendations?.[0] ?? "The interview service returned without a message."
        }
      ]);
    } catch {
      setError("We could not reach the interview AI service.");
    } finally {
      setIsTyping(false);
    }
  };

  const toggleRecording = () => {
    const nextRecording = !isRecording;
    setIsRecording(nextRecording);

    if (nextRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInput("I once worked with a developer who kept missing deadlines, so I reset the plan with smaller checkpoints and clearer ownership.");
      }, 3000);
    }
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-10rem)] max-w-6xl flex-col space-y-6">
      <section className="surface-subtle relative overflow-hidden px-6 py-6 md:px-8">
        <div className="hero-wash pointer-events-none absolute inset-0 opacity-90" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <Badge variant="premium" className="gap-1.5 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Backend interview chat
            </Badge>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Interview Practice</h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">
                Messages now go through the backend interview endpoint so they also become part of your saved AI activity.
              </p>
            </div>
          </div>
          <div className="metric-tile max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Chat route</p>
            <p className="mt-3 text-3xl font-semibold">Live</p>
            <p className="mt-1 text-sm text-muted-foreground">Connected to `/ai/interview-chat`.</p>
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Session Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <p className="text-sm font-medium">Status</p>
              <Badge variant="success" className="animate-pulse">Connected</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Messages</p>
              <p className="font-mono text-3xl font-bold">{messages.length}</p>
            </div>
            <div className="space-y-2 border-t border-border/60 pt-4">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <PlaySquare className="mr-2 h-4 w-4" />
                New Session
              </Button>
              <Button variant="destructive" className="w-full justify-start" size="sm">
                <StopCircle className="mr-2 h-4 w-4" />
                End Interview
              </Button>
            </div>
          </CardContent>
        </Card>

        <GlassCard className="flex min-h-0 flex-col overflow-hidden border-border/50">
          <div className="flex-1 space-y-6 overflow-y-auto p-6" ref={scrollRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${msg.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {msg.role === "assistant" ? <Bot size={18} /> : <User size={18} />}
                </div>
                <div
                  className={`max-w-[80%] rounded-[1.5rem] px-5 py-3 text-sm leading-6 ${msg.role === "assistant"
                    ? "border border-border bg-card/75 text-foreground"
                    : "bg-gradient-cta text-white"
                    }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot size={18} />
                </div>
                <div className="flex items-center gap-1 rounded-[1.5rem] border border-border bg-card/75 px-5 py-4">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0ms" }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "150ms" }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border/60 bg-background/40 p-4 backdrop-blur-md">
            <div className="flex items-end gap-2">
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                className={`h-12 w-12 shrink-0 rounded-full ${isRecording ? "animate-pulse" : ""}`}
                onClick={toggleRecording}
              >
                <Mic size={20} />
              </Button>
              <Input
                placeholder="Type your response or use the mic..."
                className="h-12 rounded-full border-border/60 bg-background px-6"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && void handleSend()}
              />
              <Button
                size="icon"
                className="bg-gradient-cta h-12 w-12 shrink-0 rounded-full border-0 hover:opacity-90"
                onClick={() => void handleSend()}
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
