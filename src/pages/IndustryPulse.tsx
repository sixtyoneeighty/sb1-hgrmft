import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { Newspaper, ExternalLink } from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

export default function IndustryPulse() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Using RSS2JSON API to convert RSS feeds to JSON
        const sources = [
          'https://blog.openai.com/rss/',
          'https://blog.anthropic.com/rss.xml',
          'https://blog.google/technology/ai/rss/',
          'https://ai.meta.com/blog/rss/',
          'https://huggingface.co/blog/feed.xml',
          'https://mistral.ai/feed.xml',
          'https://blogs.nvidia.com/ai/feed/',
          'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml'
        ];

        const fetchPromises = sources.map(async (source) => {
          const response = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source)}`
          );
          const data = await response.json();
          return data.items?.map((item: any) => ({
            ...item,
            source: new URL(source).hostname.replace('www.', '').split('.')[0]
          }));
        });

        const results = await Promise.all(fetchPromises);
        const allNews = results.flat().sort((a, b) => 
          new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );

        setNews(allNews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
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