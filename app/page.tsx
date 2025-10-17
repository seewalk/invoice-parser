'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Star,
  FileText,
  Sparkles,
  BarChart3,
  Rocket,
  ChevronDown,
  Menu,
  X,
  Upload,
  CheckCheck,
  Download,
  AlertCircle,
} from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Hero Section */}
      <HeroSection opacity={opacity} scale={scale} />

      {/* Social Proof Bar */}
      <SocialProofBar />

      {/* Problem Section */}
      <ProblemSection />

      {/* Solution/How It Works */}
      <HowItWorksSection />

      {/* Features Grid */}
      <FeaturesSection />

      {/* Benefits/ROI Calculator */}
      <ROISection />

      {/* Pricing */}
      <PricingSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />

      {/* Final CTA */}
      <FinalCTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

// Navigation Component
function Navigation({ mobileMenuOpen, setMobileMenuOpen }: any) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">InvoiceParse.ai</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-primary-600 transition">
              Features
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-primary-600 transition">
              Pricing
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-primary-600 transition">
              Reviews
            </a>
            <a href="#faq" className="text-gray-700 hover:text-primary-600 transition">
              FAQ
            </a>
            <button className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all hover:-translate-y-0.5">
              Start Free Trial
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t py-4 space-y-4"
          >
            <a href="#features" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
              Features
            </a>
            <a href="#pricing" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
              Pricing
            </a>
            <a href="#testimonials" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
              Reviews
            </a>
            <a href="#faq" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
              FAQ
            </a>
            <div className="px-4">
              <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-full">
                Start Free Trial
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection({ opacity, scale }: any) {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-200 rounded-full blur-3xl opacity-20 animate-pulse-slow" />

      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto text-center relative z-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-2 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-medium text-primary-700">
            Join 500+ businesses saving 20 hours per week
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
        >
          From PDF to Profit
          <br />
          <span className="gradient-text">in 30 Seconds</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
        >
          Stop wasting 4-5 hours daily on manual invoice entry. AI-powered automation extracts,
          structures, and integrates your supplier invoices automatically.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <span className="text-lg font-semibold text-gray-700">90% Faster</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <span className="text-lg font-semibold text-gray-700">99% Accurate</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <span className="text-lg font-semibold text-gray-700">Zero Setup</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
        >
          <button className="group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-center space-x-2">
            <span>Start Free Trial - 10 Invoices Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="bg-white text-primary-700 border-2 border-primary-200 px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-50 transition-all hover:-translate-y-1 flex items-center justify-center space-x-2">
            <span>Watch 2-Min Demo</span>
          </button>
        </motion.div>

        {/* Hero Image / Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="glass-effect rounded-2xl shadow-2xl p-8 border border-gray-200">
            <DemoVisualization />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16"
        >
          <ChevronDown className="w-8 h-8 text-gray-400 mx-auto animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Demo Visualization Component
function DemoVisualization() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className={`flex items-center space-x-3 ${step >= 0 ? 'opacity-100' : 'opacity-30'} transition-opacity`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 0 ? 'bg-primary-600' : 'bg-gray-300'}`}>
            <Upload className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold">Upload Invoice</span>
        </div>
        <ArrowRight className="w-6 h-6 text-gray-400" />
        <div className={`flex items-center space-x-3 ${step >= 1 ? 'opacity-100' : 'opacity-30'} transition-opacity`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-600' : 'bg-gray-300'}`}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold">AI Processing</span>
        </div>
        <ArrowRight className="w-6 h-6 text-gray-400" />
        <div className={`flex items-center space-x-3 ${step >= 2 ? 'opacity-100' : 'opacity-30'} transition-opacity`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`}>
            <CheckCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold">Verified Data</span>
        </div>
        <ArrowRight className="w-6 h-6 text-gray-400" />
        <div className={`flex items-center space-x-3 ${step >= 3 ? 'opacity-100' : 'opacity-30'} transition-opacity`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-green-600' : 'bg-gray-300'}`}>
            <Download className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold">Auto-Export</span>
        </div>
      </div>
      <div className="bg-gradient-to-r from-primary-100 to-accent-100 rounded-lg p-6 text-left">
        <p className="text-sm text-gray-600 mb-2">Sample Invoice Data:</p>
        <div className="space-y-1 text-sm font-mono">
          <div>Supplier: <span className="text-primary-700 font-semibold">Sysco Foods Ltd</span></div>
          <div>Invoice #: <span className="text-primary-700 font-semibold">INV-2024-10847</span></div>
          <div>Items: <span className="text-primary-700 font-semibold">47 line items extracted</span></div>
          <div>Total: <span className="text-primary-700 font-semibold">£2,847.39</span></div>
          <div className="pt-2 text-green-600 font-semibold flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Processed in 4.2 seconds ⚡</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Social Proof Bar
function SocialProofBar() {
  return (
    <section className="py-12 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 mb-8 text-sm uppercase tracking-wide">
          Trusted by Leading Businesses
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
          {['Restaurant Group', 'Sysco Partner', 'US Foods', 'Costco Business', 'QuickBooks Certified'].map((brand) => (
            <div key={brand} className="text-xl font-bold text-gray-400">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Problem Section
function ProblemSection() {
  const problems = [
    {
      icon: Clock,
      title: '4-5 Hours Wasted Daily',
      description: 'Your team spends more time typing invoices than running the business. Every invoice takes 10-15 minutes of manual data entry.',
    },
    {
      icon: AlertCircle,
      title: 'Costly Data Entry Errors',
      description: 'Human mistakes in pricing, quantities, and SKUs lead to inventory discrepancies and budget overruns that eat into profits.',
    },
    {
      icon: TrendingUp,
      title: 'Delayed Stock Booking',
      description: 'Late invoice processing means inaccurate inventory, missed reorder points, and unhappy customers due to stock-outs.',
    },
    {
      icon: Users,
      title: 'Staff Burnout',
      description: 'Repetitive manual work kills morale. Your valuable team members deserve better than being human data entry machines.',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Still Processing Invoices <span className="text-red-600">Manually?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every minute spent on manual invoice entry is money lost. Here's what it's really costing you:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-red-100"
            >
              <problem.icon className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{problem.title}</h3>
              <p className="text-gray-600 leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Cost Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-xl border-2 border-red-200"
        >
          <h3 className="text-2xl font-bold text-center mb-6">💸 Your Real Cost Calculator</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-gray-600 mb-2">Invoices per Week</p>
              <p className="text-4xl font-bold text-red-600">80</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Hours Wasted per Week</p>
              <p className="text-4xl font-bold text-red-600">20</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Annual Cost (£25/hr)</p>
              <p className="text-4xl font-bold text-red-600">£26,000</p>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-6">
            <strong>That's the salary of a full-time employee</strong> just for data entry! 😱
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Upload Your Invoice',
      description: 'Drag & drop PDFs, images, or email invoices directly to our platform. Works with any supplier format.',
      icon: Upload,
    },
    {
      number: '02',
      title: 'AI Extracts Everything',
      description: 'Our AI reads line items, prices, quantities, dates, and categorizes products automatically in seconds.',
      icon: Sparkles,
    },
    {
      number: '03',
      title: 'Review & Approve',
      description: 'Quick visual review with 99% accuracy. Edit anything if needed, or approve with one click.',
      icon: CheckCheck,
    },
    {
      number: '04',
      title: 'Auto-Integrate',
      description: 'Data flows directly to QuickBooks, Xero, your POS, or inventory system. Zero manual entry.',
      icon: Zap,
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            How It Works - <span className="gradient-text">Stupid Simple</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From chaos to clarity in 4 simple steps. No technical skills required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-transparent -z-10" />
              )}

              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-6xl font-bold text-primary-200 mb-2">{step.number}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video/Demo CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 inline-flex items-center space-x-2">
            <span>See It In Action - Watch Demo</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Processing',
      description: 'Process invoices in under 5 seconds. 90% faster than manual entry.',
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'SOC 2 Type II compliant. Your data is encrypted and protected 24/7.',
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'Track spending trends, supplier performance, and cost savings automatically.',
    },
    {
      icon: CheckCheck,
      title: '99% Accuracy Guaranteed',
      description: 'AI learns from corrections. Gets smarter with every invoice processed.',
    },
    {
      icon: TrendingUp,
      title: 'Auto-Integration',
      description: 'Syncs with QuickBooks, Xero, POS systems, and inventory management.',
    },
    {
      icon: Users,
      title: 'Multi-User Collaboration',
      description: 'Team approval workflows, role permissions, and activity tracking.',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features That <span className="gradient-text">Just Work</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to automate invoice processing, nothing you don't.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ROI Section
function ROISection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            The ROI is <span className="text-green-600">Ridiculous</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See exactly how much time and money you'll save every single month.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-xl text-center"
          >
            <div className="text-5xl font-bold text-green-600 mb-2">20</div>
            <div className="text-xl font-semibold text-gray-900 mb-2">Hours Saved</div>
            <div className="text-gray-600">per week on average</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-xl text-center"
          >
            <div className="text-5xl font-bold text-green-600 mb-2">£2,000</div>
            <div className="text-xl font-semibold text-gray-900 mb-2">Monthly Savings</div>
            <div className="text-gray-600">in labor costs alone</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl text-center"
          >
            <div className="text-5xl font-bold text-green-600 mb-2">98%</div>
            <div className="text-xl font-semibold text-gray-900 mb-2">Error Reduction</div>
            <div className="text-gray-600">fewer costly mistakes</div>
          </motion.div>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            {/* Manual Process */}
            <div className="p-8 bg-red-50 border-r border-gray-200">
              <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
                <X className="w-6 h-6 mr-2" />
                Manual Process
              </h3>
              <ul className="space-y-4">
                {[
                  '10-15 minutes per invoice',
                  'Prone to human errors',
                  'Delayed stock updates',
                  'Staff burnout & turnover',
                  'No spending insights',
                  'Manual data export',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* With InvoiceParse.ai */}
            <div className="p-8 bg-green-50">
              <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                With InvoiceParse.ai
              </h3>
              <ul className="space-y-4">
                {[
                  '30 seconds per invoice ⚡',
                  '99% accuracy guaranteed',
                  'Real-time auto-updates',
                  'Team focuses on growth',
                  'Smart analytics dashboard',
                  'Auto-sync to all systems',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Pricing Section
function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '0',
      period: 'forever',
      description: 'Perfect for trying out the platform',
      features: [
        '10 invoices per month',
        'Manual upload only',
        'JSON/CSV export',
        'Email support (48hr)',
        '1 user account',
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Professional',
      price: '29',
      period: 'per month',
      description: 'For single-location businesses',
      features: [
        '200 invoices per month',
        'API access',
        'Email support (24hr)',
        '3 user accounts',
        'QuickBooks & Xero integration',
        'Standard supplier patterns',
        'Mobile app access',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Business',
      price: '99',
      period: 'per month',
      description: 'For multi-location operations',
      features: [
        '1,000 invoices per month',
        'Priority API access',
        'Phone + email support',
        '10 user accounts',
        'All integrations',
        'Custom supplier patterns (5)',
        'Batch processing',
        'Approval workflows',
        'Analytics dashboard',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start free. Scale as you grow. Cancel anytime. No hidden fees.
          </p>
          <div className="inline-flex items-center space-x-4 bg-gray-100 rounded-full p-1">
            <button className="px-6 py-2 rounded-full bg-white shadow-sm font-semibold">
              Monthly
            </button>
            <button className="px-6 py-2 rounded-full text-gray-600">
              Annual <span className="text-green-600">(Save 25%)</span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-2xl scale-105 border-4 border-primary-400'
                  : 'bg-white border-2 border-gray-200'
              } relative`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-accent-400 text-white px-4 py-1 rounded-full text-sm font-bold">
                    ⭐ MOST POPULAR
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    plan.popular ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm ${
                    plan.popular ? 'text-primary-100' : 'text-gray-600'
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center">
                  <span
                    className={`text-xl ${
                      plan.popular ? 'text-primary-100' : 'text-gray-600'
                    }`}
                  >
                    £
                  </span>
                  <span
                    className={`text-5xl font-bold ${
                      plan.popular ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {plan.price}
                  </span>
                </div>
                <p
                  className={`text-sm mt-1 ${
                    plan.popular ? 'text-primary-100' : 'text-gray-600'
                  }`}
                >
                  {plan.period}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle
                      className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${
                        plan.popular ? 'text-accent-300' : 'text-green-500'
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        plan.popular ? 'text-primary-50' : 'text-gray-700'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-full font-semibold transition-all hover:-translate-y-1 ${
                  plan.popular
                    ? 'bg-white text-primary-700 shadow-lg hover:shadow-xl'
                    : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-12 text-white"
        >
          <Rocket className="w-16 h-16 mx-auto mb-4 text-accent-400" />
          <h3 className="text-3xl font-bold mb-4">Need Enterprise-Level Solutions?</h3>
          <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
            Unlimited invoices, custom ML training, white-label options, dedicated support, and more.
          </p>
          <button className="bg-accent-400 text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent-500 transition-all hover:-translate-y-1 shadow-xl">
            Contact Sales for Custom Pricing
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Maria Thompson',
      role: 'Operations Manager',
      company: '8-Location Restaurant Group, Manchester',
      image: '👩‍💼',
      quote:
        "InvoiceParse.ai saved us 6 hours per week and cut our data entry errors by 95%. We used to dread invoice day - now it's completely automated. Best £29/month we've ever spent!",
      rating: 5,
    },
    {
      name: 'David Chen',
      role: 'Inventory Manager',
      company: 'Food Distribution Warehouse, Birmingham',
      image: '👨‍💼',
      quote:
        'We process 500+ invoices weekly. This tool processes them in under 2 minutes total. It paid for itself in the first week. The QuickBooks integration is flawless.',
      rating: 5,
    },
    {
      name: 'Sarah Patel',
      role: 'Practice Manager',
      company: 'Accounting Firm (50 Restaurant Clients), London',
      image: '👩‍💻',
      quote:
        "Game-changer for our practice. We now offer invoice processing as a value-add service to all restaurant clients. They love it, and it's become a competitive advantage for us.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Loved by <span className="gradient-text">Real Businesses</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join 500+ businesses who've reclaimed their time and sanity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <div className="text-4xl mr-4">{testimonial.image}</div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-primary-600">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
            <div className="text-gray-600">Active Businesses</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">50K+</div>
            <div className="text-gray-600">Invoices Processed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Customer Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime SLA</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How accurate is the AI invoice parsing?',
      answer:
        'Our AI achieves 99% accuracy on average. It learns from corrections and improves over time. For the rare 1% of edge cases, you can quickly review and approve with one click.',
    },
    {
      question: 'Which invoice formats are supported?',
      answer:
        'We support PDFs, images (JPG, PNG), and scanned documents from any supplier. Our AI is trained on 20+ major food service suppliers like Sysco, US Foods, Costco, Restaurant Depot, and handles custom supplier formats too.',
    },
    {
      question: 'How long does it take to set up?',
      answer:
        'Literally 5 minutes. Sign up, upload your first invoice, and you are done. No complex configuration, no IT team needed. If you want integrations (QuickBooks, Xero, etc.), those take an additional 2-3 minutes via OAuth.',
    },
    {
      question: 'Can I integrate with my existing systems?',
      answer:
        'Yes! We integrate with QuickBooks, Xero, most POS systems (Toast, Square, Lightspeed), and inventory management tools (MarketMan, BlueCart, Restaurant365). We also provide REST API and webhooks for custom integrations.',
    },
    {
      question: 'What if the AI makes a mistake?',
      answer:
        'Our review interface makes corrections super easy. Click the field, edit, and save. The AI learns from your correction and gets better. Plus, all changes are logged for audit trails.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Absolutely. We use bank-level AES-256 encryption, are SOC 2 Type II compliant, GDPR compliant, and host on secure AWS infrastructure. Your invoices are encrypted at rest and in transit. We never share your data.',
    },
    {
      question: 'Can I cancel anytime?',
      answer:
        'Yes, cancel anytime with one click. No contracts, no cancellation fees, no questions asked. You can export all your data before leaving.',
    },
    {
      question: 'Do you offer phone support?',
      answer:
        'Business and Enterprise plans include priority phone support. Professional plans get 24-hour email support. Free tier gets 48-hour email support. Enterprise customers get a dedicated account manager.',
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know. Still have questions? We're here to help.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary-600 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6"
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center space-x-2">
            <span>Contact our support team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="text-4xl sm:text-6xl font-extrabold mb-6 leading-tight">
          Ready to Stop Wasting Time on Invoices?
        </h2>
        <p className="text-xl sm:text-2xl mb-8 text-primary-100">
          Join 500+ businesses saving 20 hours per week. Start your free trial today - no credit card required.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button className="group bg-white text-primary-700 px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-1 flex items-center justify-center space-x-2">
            <span>Start Free Trial - 10 Invoices Free</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="bg-primary-800 border-2 border-white text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-primary-900 transition-all hover:-translate-y-1">
            Schedule a Demo
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-primary-100">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Setup in 5 minutes</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// Footer
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
                <a href="#features" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  API Documentation
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
                  Careers
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
              <li>
                <a href="#" className="hover:text-white transition">
                  GDPR
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
          <p>© 2024 InvoiceParse.ai by Sseniseb. All rights reserved.</p>
          <p className="mt-2">Made with ❤️ for businesses who deserve better invoice processing.</p>
        </div>
      </div>
    </footer>
  );
}
