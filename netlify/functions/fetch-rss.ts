import { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
  const { url } = JSON.parse(event.body || '{}');
  const API_KEY = process.env.RSS2JSON_API_KEY;

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'URL is required' })
    };
  }

  try {
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}&api_key=${API_KEY}&count=20&order_by=pubDate`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error fetching RSS:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch RSS feed' })
    };
  }
};

export { handler };
