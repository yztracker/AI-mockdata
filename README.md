# Mock API Generator

This project is a dynamic mock data API generator that uses Next.js and Google's Gemini AI model to create custom mock data APIs.

## Features

- Dynamically generate mock data based on user input.
- Supports multiple languages (Traditional Chinese, English, Japanese).
- Customizable data entry count (1-50 entries).
- Generate temporary API endpoints to access mock data.
- Data automatically expires after 1 hour.
- Uses Vercel Postgres for data storage.

## Tech Stack

- Frontend: Next.js, React
- Backend: Next.js API Routes
- Database: Vercel Postgres
- AI Model: Google Gemini AI

## Quick Start

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

## Usage

1. Describe the data structure you need in the text area.
2. Choose the number of data entries required.
3. Select the data language (Traditional Chinese, English, or Japanese).
4. Click the "Generate Data" button.
5. View the generated data and temporary API URL.

## Deployment

This project can be easily deployed to Vercel. Simply connect the repository to your Vercel account and ensure the correct environment variables are set.

## Contributing

Pull Requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
