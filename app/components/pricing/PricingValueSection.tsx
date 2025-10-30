/**
 * ============================================================================
 * PRICING VALUE SECTION COMPONENT
 * ============================================================================
 * 
 * Comprehensive value proposition showcasing platform features and benefits.
 * Uses centralized data from lib files for consistency.
 */

'use client';

import { Heading } from '@/app/components/ui/Heading';
import { Text } from '@/app/components/ui/Text';
import { Card } from '@/app/components/ui/Card';
import { IconBox } from '@/app/components/ui/IconBox';
import { FEATURES } from '@/app/lib/featuresData';

export function PricingValueSection() {
    return (
        <div className="mb-16">
            {/* Section Heading */}
            <div className="text-center mb-12">
                <Heading
                    as="h2"
                    size="display-md"
                    align="center"
                    className="mb-4"
                >
                    Why Choose Our Platform?
                </Heading>

                <Text
                    size="xl"
                    variant="muted"
                    align="center"
                    maxWidth="3xl"
                    centered
                    className="mb-4"
                >
                    Professional invoice templates designed specifically for UK businesses.
                    VAT compliant, industry-specific fields, and ready to use in minutes.
                </Text>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {FEATURES.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <Card
                            key={index}
                            variant="default"
                            padding="md"

                            animate

                        >
                            <IconBox
                                icon={<Icon className="w-6 h-6" />}
                                variant="primary"
                                size="md"
                                className="mb-4"
                            />

                            <Heading
                                as="h3"
                                size="md"
                                className="mb-2"
                                animate={false}
                            >
                                {feature.title}
                            </Heading>

                            <Text
                                size="sm"
                                variant="muted"
                                leading="relaxed"
                            >
                                {feature.description}
                            </Text>
                        </Card>
                    );
                })}
            </div>

            {/* Additional Value Points */}
            <Card variant="gradient" padding="lg" className="text-center">
                <Heading
                    as="h3"
                    size="lg"
                    variant="white"
                    align="center"
                    className="mb-3"
                    animate={false}
                >
                    Built for UK Businesses
                </Heading>

                <Text
                    size="base"
                    variant="white"
                    align="center"
                    maxWidth="2xl"
                    centered
                    className="text-white/90"
                >
                    Every feature is designed with UK regulations in mind. VAT compliance, CIS deductions,
                    HMRC requirements, and industry-specific fields come standard. Plus, our UK-based
                    support team understands your business needs.
                </Text>
            </Card>
        </div>
    );
}
