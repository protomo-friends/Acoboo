"use client";
import { useEffect, useState } from "react";

export default function Home() {
  type Account = {
    id: number;
    name: string;
  };
  const [accounts, setAccounts] = useState<Account[]>([]);
  useEffect(() => {
    setAccounts([
      { id: 1, name: "口座1" },
      { id: 2, name: "口座2" },
    ]);
  }, []);

  return (
    <div>
      <button className="bg-sky-500 border">新規作成</button>
      <div className="container mx-auto">
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr className="text-sm font-semibold tracking-wide  bg-gray-100">
                <th className="px-4 py-3 border">名称</th>
                <th className="px-4 py-3 border">削除</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {accounts.map((account) => {
                return (
                  <>
                    <tr>
                      <td className="px-4 py-3 border">{account.name}</td>
                      <td className="px-4 py-3 border text-red-600 hover:text-red-900 cursor-pointer">
                        削除
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
