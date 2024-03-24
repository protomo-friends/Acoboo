"use client";
import { Button } from "@/components/button";
import { useState } from "react";

type Transaction = {
  id: number;
  name: string;
  eventType: "income" | "expense";
  category: { id: number; name: string };
  account: { id: number; name: string };
  amount: number;
};

export default function Home() {
  const [transactions, setTransactinos] = useState([
    {
      id: 1,
      name: "m1",
      eventType: "income",
      category: { id: 1, name: "c1" },
      account: { id: 1, name: "a1" },
      amount: 1011,
    },
  ]);
  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, current) => sum + current.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, current) => sum + current.amount, 0);

  return (
    <div>
      <h1 className="text-xl bg-gray-300">入出金一覧</h1>
      <Button className="bg-sky-500">新規作成</Button>
      <div className="container mx-auto">
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr className="text-sm font-semibold tracking-wide  bg-gray-300">
                <th className="px-4 py-3 border">口座</th>
                <th className="px-4 py-3 border">カテゴリー</th>
                <th className="px-4 py-3 border">説明</th>
                <th className="px-4 py-3 border">金額</th>
                <th className="px-4 py-3 border">削除</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-4 py-3 border">
                    <input
                      type="text"
                      value={transaction.account.name}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="px-4 py-3 border">
                    <input
                      type="text"
                      value={transaction.category.name}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="px-4 py-3 border">
                    <input
                      type="text"
                      value={transaction.name}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="px-4 py-3 border">
                    <input
                      type="text"
                      value={transaction.amount}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="px-4 py-3 border">
                    <Button className="bg-red-500 ">削除</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
