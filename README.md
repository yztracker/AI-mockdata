# Mock API Generator

**Languages**: [English](#english) | [繁體中文](#繁體中文)

---

## English

### Project Overview
This project is a dynamic mock data API generator that uses Next.js and Google's Gemini AI model to create custom mock data APIs.

### Features
- Dynamically generate mock data based on user input.
- Supports multiple languages (Traditional Chinese, English).
- Customizable data entry count (1-50 entries).
- Generate temporary API endpoints to access mock data.
- Data automatically expires after 1 hour.
- Uses Vercel Postgres for data storage.

### Tech Stack
- Frontend: Next.js, React
- Backend: Next.js API Routes
- Database: Vercel Postgres
- AI Model: Google Gemini AI

### Quick Start
1. Clone this repository
   ```
   git clone https://github.com/your-username/mock-api-generator.git
   ```

2. Install dependencies
   ```
   cd mock-api-generator
   npm install
   ```

3. Set up environment variables
   Create a `.env.local` file and add the following:
   ```
   POSTGRES_URL=your_postgres_connection_string
   GOOGLE_API_KEY=your_google_api_key
   ```

4. Run the development server
   ```
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser

### Usage
1. Describe the data structure you need in the text area.
2. Choose the number of data entries required.
3. Select the data language (Traditional Chinese, English, or Japanese).
4. Click the "Generate Data" button.
5. View the generated data and temporary API URL.

### Deployment
This project can be easily deployed to Vercel. Simply connect the repository to your Vercel account and ensure the correct environment variables are set.

### Contributing
Pull Requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License
[MIT](https://choosealicense.com/licenses/mit/)

---

## 繁體中文

### 專案概覽
這個專案是一個動態模擬資料 API 生成器，使用 Next.js 和 Google 的 Gemini AI 模型來創建自定義的模擬資料 API。

### 功能特點
- 根據用戶輸入動態生成模擬資料。
- 支持多種語言（繁體中文、英文）。
- 可自定義資料數量（1-50條）。
- 生成臨時 API 端點以訪問模擬資料。
- API資料自動過期（1小時後）。
- 使用 Vercel Postgres 進行資料存儲。

### 技術
- 前端：Next.js, React
- 後端：Next.js API Routes
- 資料庫：Vercel Postgres
- AI 模型：Google Gemini AI

### 快速開始
1. clone此儲存庫
   ```
   git clone https://github.com/your-username/mock-api-generator.git
   ```

2. 安裝
   ```
   cd mock-api-generator
   npm install
   ```

3. 設置環境變量
   創建一個 `.env.local` 文件並添加以下內容：
   ```
   POSTGRES_URL=your_postgres_connection_string
   GOOGLE_API_KEY=your_google_api_key
   ```

4. 運行開發服務器
   ```
   npm run dev
   ```

5. 在瀏覽器中打開 `http://localhost:3000`

### 使用方法
1. 在文本區域中描述您需要的資料結構。
2. 選擇所需的資料條目數量。
3. 選擇資料語言（繁體中文、英文或日文）。
4. 點擊 "生成資料" 按鈕。
5. 查看生成的資料和臨時 API URL。

### 部署
本專案可以輕鬆部署到 Vercel。只需將github repo連接到您的 Vercel 帳戶，並確保設置了正確的環境變量。

### 貢獻
歡迎提交 Pull Requests。對於重大更改，請先開 issue 討論您想要改變的內容。

### 授權
[MIT](https://choosealicense.com/licenses/mit/)
