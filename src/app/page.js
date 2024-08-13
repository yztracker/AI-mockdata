"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [generatedData, setGeneratedData] = useState(null);
  const [apiUrl, setApiUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expirationTime, setExpirationTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    let timer;
    if (expirationTime) {
      timer = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, expirationTime - now);
        setRemainingTime(Math.floor(remaining / 1000));
        if (remaining <= 0) {
          clearInterval(timer);
          setGeneratedData(null);
          setApiUrl("");
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [expirationTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let retries = 3;
    while (retries > 0) {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userInput }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGeneratedData(data.data);
        setApiUrl(data.api_url);
        setExpirationTime(data.expirationTime);
        console.log(`API URL set to: ${data.api_url}`);
        break; // 成功時跳出循環
      } catch (error) {
        console.error("Error generating data:", error);
        retries--;
        if (retries === 0) {
          alert("無法生成數據，請稍後再試。");
        }
      }
    }
    setIsLoading(false);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mock Data Generator</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label
            htmlFor="userInput"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            描述您需要的數據結構：
          </label>
          <textarea
            id="userInput"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full p-2 border rounded text-gray-900 bg-white"
            rows="4"
            placeholder="例如：我需要一個包含公司名稱、成立時間和產品列表的數據結構"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          {isLoading ? "生成中..." : "生成資料"}
        </button>
      </form>

      {generatedData && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              生成的資料
            </h3>
            {remainingTime !== null && (
              <p className="mt-1 text-sm text-gray-500">
                過期時間: {Math.floor(remainingTime / 60)}:
                {(remainingTime % 60).toString().padStart(2, "0")}
              </p>
            )}
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">API URL</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <Link
                    href={apiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {apiUrl}
                  </Link>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">資料</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(generatedData, null, 2)}
                  </pre>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
