'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, FileText } from 'lucide-react';
import comprehensiveFAQs, {
    faqCategories,
    getFAQsByCategory,
    searchFAQs,
    getCategoriesWithCounts,
    type FAQ,
} from '../lib/faqData';
import FinalCTASection from '../components/FinalCTASection';
import PageHero from '../components/PageHero';

export default function FAQPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Get filtered FAQs based on category and search
    const filteredFAQs = (() => {
        let faqs = selectedCategory === 'All' ? comprehensiveFAQs : getFAQsByCategory(selectedCategory);

        if (searchQuery.trim()) {
            faqs = searchFAQs(searchQuery);
            // Further filter by category if not "All"
            if (selectedCategory !== 'All') {
                faqs = faqs.filter((faq) => faq.category === selectedCategory);
            }
        }

        return faqs;
    })();

    const categoriesWithCounts = getCategoriesWithCounts();

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
         
            {/* Hero Section */}
            <PageHero
                badge="Complete Invoice Processing Knowledge Base"
                title={
                    <>
                        Invoice Processing
                        <br />
                        <span className="gradient-text"> Knowledge Center</span>
                    </>
                }
                description="Everything you need to know about invoice automation, processing, formats, integration, security, and ROI. Your complete guide to modern accounts payable."
                size="default"
            >
                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-8 mb-12">
                    <div className="bg-white rounded-xl px-6 py-3 shadow-lg">
                        <div className="text-3xl font-bold text-primary-600 mb-1">{comprehensiveFAQs.length}</div>
                        <div className="text-sm text-gray-600">Expert Answers</div>
                    </div>
                    <div className="bg-white rounded-xl px-6 py-3 shadow-lg">
                        <div className="text-3xl font-bold text-primary-600 mb-1">{faqCategories.length}</div>
                        <div className="text-sm text-gray-600">Categories</div>
                    </div>
                    <div className="bg-white rounded-xl px-6 py-3 shadow-lg">
                        <div className="text-3xl font-bold text-primary-600 mb-1">200+</div>
                        <div className="text-sm text-gray-600">Keywords Covered</div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search invoice processing questions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-lg"
                            aria-label="Search FAQs"
                        />
                    </div>
                </div>
            </PageHero>

            {/* Category Filter Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                            <Filter className="w-6 h-6 mr-2 text-primary-600" />
                            Browse by Category
                        </h2>
                        <div className="text-sm text-gray-600">
                            {filteredFAQs.length} {filteredFAQs.length === 1 ? 'result' : 'results'}
                        </div>
                    </div>

                    {/* Category Pills */}
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${selectedCategory === 'All'
                                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            All Topics ({comprehensiveFAQs.length})
                        </button>
                        {faqCategories.map((category) => {
                            const count = categoriesWithCounts.find((c) => c.category === category.name)?.count || 0;
                            return (
                                <button
                                    key={category.name}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all ${selectedCategory === category.name
                                            ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {category.icon} {category.name} ({count})
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ Content Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Show selected category info */}
                    {selectedCategory !== 'All' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-12 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 border border-primary-200"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                {faqCategories.find((c) => c.name === selectedCategory)?.icon}{' '}
                                {selectedCategory}
                            </h2>
                            <p className="text-lg text-gray-700">
                                {faqCategories.find((c) => c.name === selectedCategory)?.description}
                            </p>
                        </motion.div>
                    )}

                    {/* FAQs List */}
                    {filteredFAQs.length > 0 ? (
                        <div className="space-y-4">
                            {filteredFAQs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full text-left p-6 flex justify-between items-start hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex-1 pr-4">
                                            <h3 className="font-semibold text-gray-900 text-lg mb-2">{faq.question}</h3>
                                            {/* Category badge */}
                                            <span className="inline-block text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                                                {faq.category}
                                            </span>
                                        </div>
                                        <ChevronDown
                                            className={`w-5 h-5 text-primary-600 flex-shrink-0 transition-transform mt-1 ${openIndex === index ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-6 border-t border-gray-100"
                                        >
                                            <div className="pt-6">
                                                <p className="text-gray-700 leading-relaxed text-lg mb-4">{faq.answer}</p>

                                                {/* Keywords */}
                                                {faq.keywords && faq.keywords.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                                            Related Topics:
                                                        </span>
                                                        {faq.keywords.map((keyword, i) => (
                                                            <span
                                                                key={i}
                                                                className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                                                            >
                                                                {keyword}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Search volume indicator */}
                                                {faq.searchVolume && faq.searchVolume > 100 && (
                                                    <div className="mt-4 flex items-center text-xs text-gray-500">
                                                        <TrendingUp className="w-3 h-3 mr-1" />
                                                        High-demand topic ({faq.searchVolume}+ monthly searches)
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        // No results
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16"
                        >
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">No results found</h3>
                            <p className="text-gray-600 mb-6">
                                Try adjusting your search or browse all categories
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('All');
                                }}
                                className="bg-primary-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors"
                            >
                                Reset Filters
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            <FinalCTASection variant="faq" />


            {/* Footer - Reuse from main page or create simplified */}
            <Footer />
        </main>
    );
}

// Import TrendingUp for search volume indicator
import { TrendingUp } from 'lucide-react';

// Simplified Footer component
function Footer() {
    return (
        <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold">InvoiceParse.ai</span>
                        </div>
                        <p className="text-slate-400 text-sm">
                            AI-powered invoice processing for restaurants and warehouses.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="font-bold mb-4">Product</h3>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li>
                                <a href="/#features" className="hover:text-white transition">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="/pricing" className="hover:text-white transition">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="/faq" className="hover:text-white transition">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="/parser" className="hover:text-white transition">
                                    Try Demo
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-bold mb-4">Company</h3>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li>
                                <a href="#" className="hover:text-white transition">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-bold mb-4">Legal</h3>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li>
                                <a href="#" className="hover:text-white transition">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition">
                                    Security
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
                    <p>© 2024 InvoiceParse.ai by Sseniseb. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}