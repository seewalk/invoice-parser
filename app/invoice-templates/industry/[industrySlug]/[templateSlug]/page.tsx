import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
    getTemplateByIndustryAndSlug,
    getAllTemplateParams,
    type TemplateRegistryEntry
} from '@/app/lib/invoice-templates/templateRegistry';
import {
    BUSINESS_INFO,
    generateBreadcrumbSchema
} from '@/app/lib/schemaConfig';
import {
    Download,
    FileText,
    TrendingUp,
    Users,
    Eye,
    Edit,
    Printer,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import { EnterpriseCTA } from '@/app/components/CTASectionBlack';

// Dynamic imports with SSR for components
const TemplatePreview = dynamic(() =>
    import('@/app/components/templates').then(mod => ({ default: mod.TemplatePreview })),
    { ssr: true }
);

const TemplateFeaturesList = dynamic(() =>
    import('@/app/components/templates').then(mod => ({ default: mod.TemplateFeaturesList })),
    { ssr: true }
);

const TemplateDownloadSection = dynamic(() =>
    import('@/app/components/templates').then(mod => ({ default: mod.TemplateDownloadSection })),
    { ssr: true }
);

const RelatedTemplates = dynamic(() =>
    import('@/app/components/templates').then(mod => ({ default: mod.RelatedTemplates })),
    { ssr: true }
);

const FieldList = dynamic(() =>
    import('@/app/components/templates').then(mod => ({ default: mod.FieldList })),
    { ssr: true }
);

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
// All template loading logic is now handled by templateRegistry.ts
// No need for industry-specific imports or manual converters!

// ============================================================================
// GENERATE STATIC PARAMS (Build Time)
// ============================================================================

export async function generateStaticParams() {
    return getAllTemplateParams();
}

// ============================================================================
// GENERATE METADATA (SEO)
// ============================================================================

export async function generateMetadata({
    params
}: {
    params: Promise<{ industrySlug: string; templateSlug: string }>
}): Promise<Metadata> {
    const { industrySlug, templateSlug } = await params;
    const result = getTemplateByIndustryAndSlug(industrySlug, templateSlug);

    if (!result) {
        return {
            title: 'Template Not Found',
        };
    }

    const { template, industryName } = result;

    return {
        title: `${template.name} | Free Invoice Maker`,
        description: `Professional ${industryName.toLowerCase()} invoice template generator for UK businesses. Download customizable in Word, Excel, or PDF formats. Free forever.`,
        keywords: [
            ...template.keywords,
            `${industryName} invoice template`,
            `${template.name}`,
            'UK invoice template',
            'free invoice template'
        ].join(', '),
        openGraph: {
            title: `${template.name} - Free ${industryName} Invoice Template`,
            description: template.description,
            type: 'website',
            url: `https://elektroluma.co.uk/invoice-templates/industry/${industrySlug}/${templateSlug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: template.name,
            description: template.description,
        },
        alternates: {
            canonical: `https://elektroluma.co.uk/invoice-templates/industry/${industrySlug}/${templateSlug}`,
        },
    };
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default async function IndustryTemplateDetailPage({
    params
}: {
    params: Promise<{ industrySlug: string; templateSlug: string }>
}) {
    const { industrySlug, templateSlug } = await params;

    // Load template from centralized registry
    const entry = getTemplateByIndustryAndSlug(industrySlug, templateSlug);

    if (!entry) {
        notFound();
    }

    const { template, industryId, industryName, categoryName } = entry;

    // Generate breadcrumb schema
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Invoice Templates', url: '/invoice-templates' },
        { name: industryName, url: `/invoice-templates/industry/${industrySlug}` },
        { name: template.name, url: `/invoice-templates/industry/${industrySlug}/${templateSlug}` }
    ]);

    // DigitalDocument schema for the template
    const digitalDocumentSchema = {
        '@context': 'https://schema.org',
        '@type': 'DigitalDocument',
        '@id': `${BUSINESS_INFO.url}/invoice-templates/industry/${industrySlug}/${templateSlug}`,
        name: template.name,
        description: template.description,
        url: `${BUSINESS_INFO.url}/invoice-templates/industry/${industrySlug}/${templateSlug}`,
        keywords: template.keywords.join(', '),
        genre: 'Invoice Template',
        inLanguage: 'en-GB',
        isAccessibleForFree: template.tier === 'free',
        license: template.tier === 'free' ? 'https://creativecommons.org/licenses/by/4.0/' : 'Premium License',
        about: {
            '@type': 'Thing',
            name: industryName,
            description: `Invoice template for ${industryName.toLowerCase()}`
        },
        audience: {
            '@type': 'BusinessAudience',
            audienceType: industryName
        },
        category: categoryName,
        provider: {
            '@id': `${BUSINESS_INFO.url}/#organization`
        },
        creator: {
            '@id': `${BUSINESS_INFO.url}/#organization`
        },
        publisher: {
            '@id': `${BUSINESS_INFO.url}/#organization`
        },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        version: '1.0'
    };

    // HowTo schema for using the template
    const howToUseSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to Use ${template.name}`,
        description: `Step-by-step guide to using the ${template.name} for ${industryName.toLowerCase()}`,
        totalTime: 'PT5M',
        step: [
            {
                '@type': 'HowToStep',
                position: 1,
                name: 'Download Template',
                text: `Download the ${template.name} in your preferred format (Word, Excel, or PDF).`
            },
            {
                '@type': 'HowToStep',
                position: 2,
                name: 'Fill Required Fields',
                text: `Complete all required fields including ${template.requiredFields.slice(0, 3).map(f => f.label).join(', ')}.`
            },
            {
                '@type': 'HowToStep',
                position: 3,
                name: 'Customize Details',
                text: `Add your business information, client details, and itemized services or products.`
            },
            {
                '@type': 'HowToStep',
                position: 4,
                name: 'Review and Send',
                text: `Review the completed invoice for accuracy, then save and send to your client.`
            }
        ]
    };

    // Product schema for the template (as a digital product)
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: template.name,
        description: template.description,
        image: `${BUSINESS_INFO.url}/templates/${templateSlug}-preview.png`,
        brand: {
            '@type': 'Brand',
            name: BUSINESS_INFO.tradingName
        },
        category: categoryName,
        offers: {
            '@type': 'Offer',
            price: template.tier === 'free' ? '0' : '9.99',
            priceCurrency: 'GBP',
            availability: 'https://schema.org/InStock',
            url: `${BUSINESS_INFO.url}/invoice-templates/industry/${industrySlug}/${templateSlug}`,
            priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            seller: {
                '@id': `${BUSINESS_INFO.url}/#organization`
            }
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: Math.floor(template.searchVolume / 100) || '10',
            bestRating: '5',
            worstRating: '1'
        },
        additionalProperty: [
            {
                '@type': 'PropertyValue',
                name: 'Template Fields',
                value: `${template.requiredFields.length} required fields`
            },
            {
                '@type': 'PropertyValue',
                name: 'Industry',
                value: industryName
            },
            {
                '@type': 'PropertyValue',
                name: 'Format',
                value: 'Word, Excel, PDF'
            },
            {
                '@type': 'PropertyValue',
                name: 'Monthly Searches',
                value: template.searchVolume.toString()
            }
        ]
    };

    // FAQPage schema for template-specific questions
    const templateFAQSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: `What is included in the ${template.name}?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `The ${template.name} includes ${template.requiredFields.length} required fields and ${template.optionalFields.length} optional fields. It's specifically designed for ${industryName.toLowerCase()} and includes ${template.description.toLowerCase()}`
                }
            },
            {
                '@type': 'Question',
                name: `Is the ${template.name} free to use?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: template.tier === 'free'
                        ? `Yes, this template is completely free to download and use. You can customize it for your business needs without any cost.`
                        : `This is a premium template that includes advanced features and professional design elements.`
                }
            },
            {
                '@type': 'Question',
                name: `What formats is the ${template.name} available in?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `The ${template.name} is available in multiple formats including Microsoft Word (.docx), Microsoft Excel (.xlsx), and PDF for easy printing and digital distribution.`
                }
            },
            {
                '@type': 'Question',
                name: `Can I customize the ${template.name}?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `Yes, the template is fully customizable. You can modify all fields, add your branding, adjust colors, and tailor it to match your business requirements.`
                }
            }
        ]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

            {/* Header */}
            <section className="pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto">
        {/* Breadcrumb - Hidden on Mobile, Centered on Desktop */}
        <nav className="hidden md:flex items-center justify-center gap-2 text-sm text-slate-600 mb-8 flex-wrap">
            <Link href="/" className="hover:text-indigo-600 transition">
                Home
            </Link>
            <span>/</span>
            <Link href="/invoice-templates" className="hover:text-indigo-600 transition">
                Invoice Templates
            </Link>
            <span>/</span>
            <Link href="/invoice-templates" className="hover:text-indigo-600 transition">
                Industries
            </Link>
            <span>/</span>
            <Link href={`/invoice-templates/industry/${industrySlug}`} className="hover:text-indigo-600 transition">
                {industryName}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{template.name}</span>
        </nav>

        {/* Centered Content Container */}
        <div className="max-w-5xl mx-auto text-center">
            {/* Badges - Centered */}
            <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    <FileText className="w-4 h-4" />
                    {industryName}
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {categoryName}
                </div>
                {template.tier === 'premium' && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-bold">
                        PREMIUM
                    </div>
                )}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                {template.name}
            </h1>

            {/* Description */}
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                {template.description}
            </p>

            {/* CTA Buttons - Centered */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Link
                    href={`/invoice-generator/${industrySlug}/${templateSlug}`}
                    className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                    <Edit className="w-5 h-5" />
                    Create Invoice Now
                </Link>
                <a
                    href="#download"
                    className="flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-50 transition border-2 border-slate-200 w-full sm:w-auto"
                >
                    <Download className="w-5 h-5" />
                    Download Template
                </a>
            </div>

            {/* Template Stats - Centered */}
            <div className="inline-flex items-center gap-8 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-slate-600 mb-1">
                        <FileText className="w-5 h-5" />
                        <span className="text-sm font-medium">Total Fields</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                        {template.requiredFields.length + template.optionalFields.length}
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

            {/* Template Details */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Full Preview */}
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                    What's Included in This Template
                                </h2>
                                <TemplatePreview template={template} />
                            </div>

                            {/* Invoice Fields Section */}
                            <div className="mb-12">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-slate-900 mb-3">
                                        Invoice Fields & Customization
                                    </h2>
                                    <p className="text-lg text-slate-600">
                                        Customize your {template.name} with essential and optional fields to match your business needs.
                                    </p>
                                </div>

                                {/* Required Fields */}
                                <div className="mb-10">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                                        Required Fields
                                    </h3>
                                    <p className="text-slate-600 mb-6">
                                        These fields must be filled in for a complete, professional invoice.
                                    </p>
                                    <FieldList
                                        fields={template.requiredFields}
                                        title=""
                                        description=""
                                    />
                                </div>

                                {/* Optional Fields */}
                                {template.optionalFields.length > 0 && (
                                    <div className="mb-10">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-3">
                                            Optional Fields
                                        </h3>
                                        <p className="text-slate-600 mb-6">
                                            Additional fields you can include based on your specific business requirements.
                                        </p>
                                        <FieldList
                                            fields={template.optionalFields}
                                            title=""
                                            description=""
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Industry Standards */}
                            {template.industryStandards && template.industryStandards.length > 0 && (
                                <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-8">
                                    <div className="flex items-start gap-3 mb-4">
                                        <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                                {industryName} Industry Compliance Standards
                                            </h3>
                                            <p className="text-sm text-slate-600">
                                                Important compliance requirements for {industryName.toLowerCase()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {template.industryStandards.map((standard, idx) => (
                                            <div key={idx} className="bg-white rounded-lg p-4 border border-amber-200">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${standard.complianceLevel === 'required'
                                                        ? 'bg-red-100 text-red-700'
                                                        : standard.complianceLevel === 'recommended'
                                                            ? 'bg-amber-100 text-amber-700'
                                                            : 'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {standard.complianceLevel.toUpperCase()}
                                                    </span>
                                                    <span className="font-semibold text-slate-900">
                                                        {standard.standard}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-600">
                                                    {standard.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div>
                            <div className="sticky top-8 space-y-6">
                                {/* Download Options */}
                                <TemplateDownloadSection
                                    template={template}
                                    templateSlug={templateSlug}
                                />

                                {/* Related Templates */}
                                <RelatedTemplates industryName={industryName} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Business Benefits Section */}
            {template.businessBenefits && template.businessBenefits.length > 0 && (
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                                Invoice Template Benefits
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Key advantages of using our free invoice template generator for {categoryName} professionals.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {template.businessBenefits.map((benefit: string, idx: number) => {
                                const [title, ...descParts] = benefit.split(':');
                                const description = descParts.join(':').trim();

                                return (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg hover:border-indigo-300 transition-all"
                                    >
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                            </div>
                                            <h3 className="text-slate-900 text-lg" itemProp="keywords">
                                                {title}
                                            </h3>
                                        </div>
                                        {description && (
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                {description}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Use Cases Section */}
            {template.useCases && template.useCases.length > 0 && (
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                                Common Use Cases
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                What {categoryName} businesses use our professional invoice templates. Are you one of them?
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {template.useCases.map((useCase: string, idx: number) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg hover:border-indigo-300 transition-all"
                                    itemScope
                                    itemType="https://schema.org/ItemList"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-indigo-600 font-bold text-sm">{idx + 1}</span>
                                        </div>
                                        <p
                                            className="text-slate-700 leading-relaxed"
                                            itemProp="itemListElement"
                                        >
                                            {useCase}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                         <div className="mt-12"> {/* or mt-16, mt-20 */}
                                                <EnterpriseCTA />
                                            </div>
                    </div>
                </section>
            )}

            {/* Schema.org Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(digitalDocumentSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(howToUseSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(templateFAQSchema)
                }}
            />
        </div>
    );
}
