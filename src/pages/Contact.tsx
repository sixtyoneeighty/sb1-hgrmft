import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, Clock, Send, MessageCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { submitContactForm } from '../api/contact';

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
  contactMethod: string;
  timezone: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: 'custom-ai',
    message: '',
    contactMethod: 'email',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitContactForm(formData);
      alert('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: 'custom-ai',
        message: '',
        contactMethod: 'email',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });
    } catch (error: any) {
      console.error('Error sending message:', error);
      alert(`Failed to send message: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | sixtyoneeighty</title>
        <meta name="description" content="Ready to break some rules and build something amazing? Let's explore what's possible with AI for your business." />
        <meta property="og:title" content="Contact Us | sixtyoneeighty" />
        <meta property="og:description" content="Ready to break some rules and build something amazing? Let's explore what's possible with AI for your business." />
        <meta property="og:image" content="https://sixtyoneeightyai.com/og-image.png" />
        <meta property="og:url" content="https://sixtyoneeightyai.com/contact" />
      </Helmet>

      <div className="pt-24 pb-16">
        <PageHeader
          title="Turn Your Business Up to Eleven with AI"
          subtitle="Ready to break some rules and build something amazing? Let's explore what's possible."
          className="mb-16"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-purple-500 mt-1" />
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">Phone</h4>
                      <p className="text-gray-400">213-866-8010</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-purple-500 mt-1" />
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">Email</h4>
                      <p className="text-gray-400">contact@sixtyoneeightyai.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MessageCircle className="h-6 w-6 text-purple-500 mt-1" />
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">WhatsApp</h4>
                      <a 
                        href="https://wa.me/19187982012"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-400 transition"
                      >
                        +1 918-798-2012
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-purple-500 mt-1" />
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">Response Time</h4>
                      <p className="text-gray-400">We typically respond within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="custom-ai">Custom AI Development</option>
                      <option value="strategic">Strategic Consulting</option>
                      <option value="creative">Creative Services</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Contact Method
                    </label>
                    <select
                      id="contactMethod"
                      name="contactMethod"
                      value={formData.contactMethod}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Time Zone
                    </label>
                    <input
                      type="text"
                      id="timezone"
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <Button type="submit" icon={Send} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}