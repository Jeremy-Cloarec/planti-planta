"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import HomeChild from "./ui/HomeChild"

const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeChild />
    </QueryClientProvider>
  );
}
