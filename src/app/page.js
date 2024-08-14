"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { SiThreads } from "react-icons/si";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [dataCount, setDataCount] = useState(1);
  const [language, setLanguage] = useState("繁體中文"); // 新增語言選擇
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
          body: JSON.stringify({ userInput, dataCount, language }),
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
    <div className="w-full px-8 py-4 bg-gray-900 text-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-300">
          Mock Data Generator
        </h1>
        <nav className="flex items-center space-x-4">
          <a
            href="https://github.com/yztracker/mockapi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-300"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.threads.net/@jimmy.ai.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-300"
          >
            <SiThreads size={24} />
          </a>
          <Link href="/about" className="text-gray-300 hover:text-blue-300">
            關於我
          </Link>
        </nav>
      </header>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label
            htmlFor="userInput"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            描述您需要的數據結構：
          </label>
          <textarea
            id="userInput"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full p-2 border rounded bg-gray-800 text-gray-100 border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            rows="4"
            placeholder="例如：我需要一個包含公司名稱、成立時間和產品列表的數據結構"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dataCount"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            生成的資料筆數（1-50）：
          </label>
          <input
            type="number"
            id="dataCount"
            value={dataCount}
            onChange={(e) =>
              setDataCount(
                Math.min(50, Math.max(1, parseInt(e.target.value) || 1))
              )
            }
            className="w-full p-2 border rounded bg-gray-800 text-gray-100 border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            min="1"
            max="50"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            資料語言：
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border rounded bg-gray-800 text-gray-100 border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="繁體中文">繁體中文</option>
            <option value="英文">英文</option>
            <option value="日文">日文</option>
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          {isLoading ? "生成中..." : "生成資料"}
        </button>
      </form>

      {generatedData && (
        <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-100">
              生成的資料
            </h3>
            {remainingTime !== null && (
              <p className="mt-1 text-sm text-gray-300">
                過期時間: {Math.floor(remainingTime / 60)}:
                {(remainingTime % 60).toString().padStart(2, "0")}
              </p>
            )}
          </div>
          <div className="border-t border-gray-700">
            <dl>
              <div className="bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-300">API URL</dt>
                <dd className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2">
                  <Link
                    href={apiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    {apiUrl}
                  </Link>
                </dd>
              </div>
              <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-300">資料</dt>
                <dd className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2">
                  <pre className="whitespace-pre-wrap bg-gray-900 p-2 rounded">
                    {JSON.stringify(generatedData, null, 2)}
                  </pre>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      <footer className="mt-8 text-center text-sm text-gray-400">
        <p>一個熱愛開發的獨立開發者，如果有更多AI應用需求歡迎聯繫我</p>
        <p>
          Email:{" "}
          <a
            href="mailto:handless.ai@gmail.com"
            className="text-blue-400 hover:text-blue-300"
          >
            handless.ai@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}
