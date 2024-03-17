"use client";
import { Button } from "@/components/button";
import { useEffect, useState } from "react";

export default function Home() {
  type Account = {
    id?: number;
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
      <h1 className="text-xl bg-gray-300">口座一覧</h1>
      <Button
        className="bg-sky-500"
        onClick={() => {
          setAccounts([{ id: undefined, name: "" }, ...accounts]);
        }}
      >
        新規作成
      </Button>
      <div className="container mx-auto">
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr className="text-sm font-semibold tracking-wide  bg-gray-300">
                <th className="px-4 py-3 border">名称</th>
                <th className="px-4 py-3 border">削除</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td className="px-4 py-3 border">
                    <input
                      type="text"
                      value={account.name}
                      className="w-full px-2 py-1 border rounded"
                      onChange={(e) => {
                        const newAccounts = accounts.map((acc) => {
                          if (acc.id === account.id) {
                            return { ...acc, name: e.target.value };
                          }
                          return acc;
                        });
                        setAccounts(newAccounts);
                      }}
                    />
                  </td>
                  <td className="px-4 py-3 border">
                    <Button
                      className="bg-red-500 "
                      onClick={() => {
                        setAccounts(
                          accounts.filter((acc) => acc.id !== account.id)
                        );
                      }}
                    >
                      削除
                    </Button>
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
