"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// Define the Review type
interface Review {
  id: number;
  content: string;
  created_at: string;
}

export default function Home() {
  const [content, setContent] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);

  // 获取回顾数据
  async function fetchReviews() {
    const { data } = await supabase
      .from("daily_reviews")
      .select("*")
      .order("created_at", { ascending: false });
    setReviews(data || []);
  }

  // 组件加载时获取数据
  useEffect(() => {
    fetchReviews();
  }, []); // Empty dependency array means this runs once on mount

  // 处理提交
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    const { error } = await supabase
      .from("daily_reviews")
      .insert([{ content }]);
    if (error) {
      console.error("提交失败:", error.message);
      return;
    }

    setContent(""); // 清空输入框
    fetchReviews(); // 重新获取数据
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">每日回顾</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded"
          placeholder="输入你的回顾..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
        >
          提交
        </button>
      </form>
      <ul>
        {reviews.map((review) => (
          <li key={review.id} className="border-b py-2">
            {review.content}
          </li>
        ))}
      </ul>
    </main>
  );
}
