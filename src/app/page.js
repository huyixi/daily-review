import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: reviews } = await supabase
    .from("daily_reviews")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">每日回顾</h1>
      <form className="mb-4">
        <textarea
          className="w-full p-2 border rounded"
          placeholder="输入你的回顾..."
        />
        <button className="mt-2 w-full bg-blue-500 text-white p-2 rounded">
          提交
        </button>
      </form>
      <ul>
        {reviews?.map((review) => (
          <li key={review.id} className="border-b py-2">
            {review.content}
          </li>
        ))}
      </ul>
    </main>
  );
}
