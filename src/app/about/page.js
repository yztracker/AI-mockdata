import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { SiThreads } from "react-icons/si";

export default function About() {
  return (
    <div className="w-full px-8 py-4 bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-300">關於我</h1>
      <p className="mb-4">
        我是一個熱愛開發的獨立開發者，專注於創建創新的 AI 應用。
      </p>
      <p className="mb-4">
        如果您有任何 AI 應用需求或想討論合作機會，歡迎聯繫我。
      </p>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-blue-200">聯絡方式：</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="mr-2">📧</span>
            Email:{" "}
            <a
              href="mailto:handless.ai@gmail.com"
              className="ml-1 text-blue-400 hover:text-blue-300"
            >
              handless.ai@gmail.com
            </a>
          </li>
          <li className="flex items-center">
            <FaGithub className="mr-2" />
            GitHub:{" "}
            <a
              href="https://github.com/yztracker"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-blue-400 hover:text-blue-300"
            >
              yztracker
            </a>
          </li>
          <li className="flex items-center">
            <SiThreads className="mr-2" />
            Threads:{" "}
            <a
              href="https://www.threads.net/@jimmy.ai.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-blue-400 hover:text-blue-300"
            >
              @jimmy.ai.dev
            </a>
          </li>
        </ul>
      </div>
      <Link href="/" className="text-blue-400 hover:text-blue-300">
        返回首頁
      </Link>
    </div>
  );
}
