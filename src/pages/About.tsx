import React from 'react';
import { Brain as BrainIcon, Code, LineChart, MessageSquare } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../components/PageHeader';

const values = [
  {
    icon: BrainIcon,
    title: 'Global Perspective, Local Impact',
    description: 'Our distributed team brings diverse insights from different corners of the world, ensuring solutions that work across cultures and markets.'
  },
  {
    icon: Code,
    title: 'Size-Proud',
    description: 'Small by choice, focused by design. Our lean team structure ensures direct communication and exceptional attention to every project.'
  },
  {
    icon: LineChart,
    title: 'Tech-Agnostic Innovation',
    description: 'We choose the right tools for your specific needs, not our preferences. Our solutions are built on merit, not market trends.'
  },
  {
    icon: MessageSquare,
    title: 'Straight Shooters',
    description: 'We believe in radical honesty. Sometimes that means recommending less than you asked for, because your success is our priority.'
  }
];

function About() {
  return (
    <>
      <Helmet>
        <title>About Us | sixtyoneeighty</title>
        <meta
          name="description"
          content="We're not your typical tech consultants - and we're pretty proud of that. Learn about our unique approach to AI solutions."
        />
        <meta property="og:title" content="About Us | sixtyoneeighty" />
        <meta
          property="og:description"
          content="We're not your typical tech consultants - and we're pretty proud of that. Learn about our unique approach to AI solutions."
        />
        <meta property="og:image" content="https://sixtyoneeightyai.com/og-image.png" />
        <meta property="og:url" content="https://sixtyoneeightyai.com/about" />
      </Helmet>

      <div className="pt-24 pb-16">
        <PageHeader
          title="About Us"
          subtitle="We're not your typical tech consultants - and we're pretty proud of that."
          className="mb-16"
        />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-300">
                  We're a band of AI enthusiasts who decided to ditch the corporate playbook and build something different. Scattered across the country but connected by our passion for technology and a shared belief that there's always a better way to do things, we created sixtyoneeighty. Born from friendship and a shared frustration with one-size-fits-all solutions, we combined our diverse backgrounds and expertise to create a company that puts relationships first - both with each other and our clients. Located across different time zones, we bring global perspectives to local challenges.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">What Makes Us Different?</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>We're real people who speak human: No corporate buzzwords or tech jargon (unless you're into that)</li>
                  <li>We're size-proud: Being a small team means you get our undivided attention and best work</li>
                  <li>We're tech-agnostic: Whether it's Claude, GPT, Gemini, or Llama, we choose what works best for YOU</li>
                  <li>We're straight shooters: If something won't benefit your business, we'll tell you</li>
                  <li>We're rebels with a plan: We may not follow the conventional playbook, but we always deliver results</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">Our Approach</h2>
                <p className="text-gray-300">
                  Think of us as your tech-savvy friends who happen to be AI experts. We start every project with a conversation - not a sales pitch. We believe in understanding your business inside and out, because the best solutions come from really getting what makes your operation tick.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://i.imgur.com/Bv5y99M.jpg"
                alt="Team collaboration"
                className="w-full h-[400px] object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent rounded-lg" />
            </div>
          </div>
        </section>

        <section className="bg-gray-800/50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">What Sets Us Apart</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700"
                  >
                    <Icon className="h-8 w-8 text-purple-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;