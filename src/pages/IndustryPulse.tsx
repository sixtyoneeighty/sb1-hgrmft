import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../components/PageHeader';
import { Newspaper, ExternalLink, AlertCircle } from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

interface NewsSource {
  url: string;
  name: string;
}

export default function IndustryPulse() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const sources: NewsSource[] = [
          {
            url: 'https://blog.openai.com/rss/',
            name: 'OpenAI'
          },
          {
            url: 'https://blog.anthropic.com/rss.xml',
            name: 'Anthropic'
          },
          {
            url: 'https://blog.google/technology/ai/rss/',
            name: 'Google AI'
          },
          {
            url: 'https://ai.meta.com/blog/rss/',
            name: 'Meta AI'
          },
          {
            url: 'https://huggingface.co/blog/feed.xml',
            name: 'Hugging Face'
          },
          {
            url: 'https://mistral.ai/feed.xml',
            name: 'Mistral AI'
          },
          {
            url: 'https://blogs.nvidia.com/ai/feed/',
            name: 'NVIDIA AI'
          },
          {
            url: 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml',
            name: 'The Verge AI'
          }
        ];

        // Using RSS2JSON API with API key
        const API_KEY = 'kpzs0qljzlvwyu2kxpxbmfagxflqkqbrhsqmhqbj';
        
        const fetchPromises = sources.map(async (source) => {
          try {
            // Try RSS2JSON API first
            const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}&api_key=${API_KEY}`;
            const response = await fetch(rss2jsonUrl);
            
            if (!response.ok) {
              throw new Error(`RSS2JSON failed for ${source.name}`);
            }
            
            const data = await response.json();
            
            if (data.status !== 'ok' || !Array.isArray(data.items)) {
              throw new Error(`Invalid response for ${source.name}`);
            }
            
            // Map the items and ensure all required fields are present
            return data.items
              .filter((item: any) => item.title && item.link) // Only include items with required fields
              .map((item: any) => ({
                title: item.title,
                link: item.link,
                pubDate: item.pubDate || new Date().toISOString(),
                source: source.name
              }));
          } catch (error) {
            // Try fallback using CORS proxy
            try {
              const corsProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(source.url)}`;
              const proxyResponse = await fetch(corsProxyUrl);
              
              if (!proxyResponse.ok) {
                console.error(`Failed to fetch ${source.name} feed:`, error);
                return [];
              }
              
              const text = await proxyResponse.text();
              const parser = new DOMParser();
              const xml = parser.parseFromString(text, 'text/xml');
              const items = Array.from(xml.querySelectorAll('item'));
              
              return items.map(item => ({
                title: item.querySelector('title')?.textContent || 'Untitled',
                link: item.querySelector('link')?.textContent || '#',
                pubDate: item.querySelector('pubDate')?.textContent || new Date().toISOString(),
                source: source.name
              }));
            } catch (proxyError) {
              console.error(`Failed to fetch ${source.name} feed using proxy:`, proxyError);
              return [];
            }
          }
        });

        const results = await Promise.all(fetchPromises);
        const allNews = results
          .flat()
          .filter(item => item.title && item.link) // Additional validation
          .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

        if (allNews.length === 0) {
          setError('No news items available at the moment. Please try again later.');
        } else {
          setNews(allNews);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Helmet>
        <title>Industry Pulse | sixtyoneeighty</title>
        <meta
          name="description"
          content="Stay updated with the latest AI news and insights from leading companies like OpenAI, Anthropic, Google AI, Meta AI, and more."
        />
        <meta property="og:title" content="Industry Pulse | sixtyoneeighty" />
        <meta
          property="og:description"
          content="Stay updated with the latest AI news and insights from leading companies like OpenAI, Anthropic, Google AI, Meta AI, and more."
        />
        <meta property="og:image" content="https://sixtyoneeightyai.com/og-image.png" />
        <meta property="og:url" content="https://sixtyoneeightyai.com/industry-pulse" />
      </Helmet>

      <div className="pt-24 pb-16">
        <PageHeader
          title="Industry Pulse"
          subtitle="Stay updated with the latest AI news and insights from leading AI companies and research labs."
          className="mb-16"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <p className="text-gray-300 text-lg">{error}</p>
              <button
                onClick={() => {
                  setLoading(true);
                  setError(null);
                  window.location.reload();
                }}
                className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white transition"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {news.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Newspaper className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-purple-400 font-medium uppercase">
                          {item.source}
                        </span>
                        <span className="text-sm text-gray-400">
                          {new Date(item.pubDate).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition">
                        {item.title}
                      </h3>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}