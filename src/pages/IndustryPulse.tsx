import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { Newspaper, ExternalLink } from 'lucide';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

interface FeedSource {
  url: string;
  type: 'rss' | 'json';
}

export default function IndustryPulse() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const sources: FeedSource[] = [
          { url: 'https://openai.com/blog/rss.xml', type: 'rss' },
          { url: 'https://blog.anthropic.com/rss.xml', type: 'rss' },
          { url: 'https://blog.google/technology/ai/rss/', type: 'rss' },
          { url: 'https://ai.meta.com/blog/rss/', type: 'rss' },
          { url: 'https://huggingface.co/blog/feed.xml', type: 'rss' },
          { url: 'https://mistral.ai/feed.xml', type: 'rss' },
          { url: 'https://blogs.nvidia.com/ai/feed/', type: 'rss' },
          { url: 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml', type: 'rss' },
          { url: 'https://www.wired.com/feed/tag/ai/latest/rss', type: 'rss' },
          { url: 'https://msrc.microsoft.com/blog/tags/artificial-intelligence/feed', type: 'json' }
        ];

        const fetchPromises = sources.map(async (source) => {
          try {
            if (source.type === 'rss') {
              const response = await fetch(
                `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`
              );
              const data = await response.json();
              
              if (data.status === 'ok' && Array.isArray(data.items)) {
                return data.items?.map((item: any) => ({
                  title: item.title || 'Untitled',
                  link: item.link || '#',
                  pubDate: item.pubDate || new Date().toISOString(),
                  source: new URL(source.url).hostname.replace('www.', '').split('.')[0]
                }));
              }
            } else {
              // Handle JSON feed
              const response = await fetch(source.url);
              const data = await response.json();
              
              // Adjust this mapping based on the actual JSON structure
              return data.items?.map((item: any) => ({
                title: item.title || 'Untitled',
                link: item.url || '#',
                pubDate: item.date_published || new Date().toISOString(),
                source: 'microsoft' // or extract from URL as needed
              })) || [];
            }
            return [];
          } catch (err) {
            console.warn(`Failed to fetch from ${source.url}:`, err);
            return [];
          }
        });

        const results = await Promise.all(fetchPromises);
        const allNews = results
          .flat()
          .filter(item => item.title && item.link) // Filter out any invalid items
          .sort((a, b) => 
            new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
          );

        if (allNews.length === 0) {
          setError('No news items available at the moment.');
        } else {
          setNews(allNews);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to load news feed. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="pt-24 pb-16">
      <PageHeader
        title="Industry Pulse"
        subtitle="Stay updated with the latest AI news and insights from leading companies and publications."
        className="mb-16"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-gray-400 py-12">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {news.map((item, index) => (
              <a
                key={`${item.source}-${index}`}
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
                  <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition" />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}