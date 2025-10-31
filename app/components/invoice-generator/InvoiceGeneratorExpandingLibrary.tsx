import { Heading } from '@/app/components/ui/Heading';
import { Text } from '@/app/components/ui/Text';
import { Badge } from '@/app/components/ui/Badge';
import { Card } from '@/app/components/ui/Card';
import { IconBox } from '@/app/components/ui/IconBox';
import { 
  Cpu, 
  Heart, 
  Leaf, 
  Video, 
  PawPrint, 
  GraduationCap, 
  Briefcase 
} from 'lucide-react';
import { 
  additionalIndustries, 
  getAdditionalTemplateCount, 
  getAdditionalIndustryCount 
} from '@/app/lib/additionalInvoiceTemplateLibrary';

/**
 * InvoiceGeneratorExpandingLibrary Component
 * 
 * SEO-optimized component showcasing expanded template library
 * Presents new templates as actively available (not "coming soon")
 * Builds topical authority and internal linking opportunities
 */

interface IndustryPreview {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  templateCount: number;
  categories: string[];
}

export default function InvoiceGeneratorExpandingLibrary() {
  const totalNewTemplates = getAdditionalTemplateCount();
  const totalNewIndustries = getAdditionalIndustryCount();

  // Map industry icons
  const industryIcons: Record<string, React.ReactNode> = {
    digitalServices: <Cpu className="w-6 h-6" />,
    healthWellness: <Heart className="w-6 h-6" />,
    sustainableBusiness: <Leaf className="w-6 h-6" />,
    creativeMedia: <Video className="w-6 h-6" />,
    petServices: <PawPrint className="w-6 h-6" />,
    education: <GraduationCap className="w-6 h-6" />,
    professionalServices: <Briefcase className="w-6 h-6" />
  };

  // Build industry previews with template counts
  const industryPreviews: IndustryPreview[] = Object.entries(additionalIndustries).map(
    ([industryId, industry]) => {
      // Count templates in this industry
      let templateCount = 0;
      const categoryNames: string[] = [];

      Object.values(industry.categories).forEach(category => {
        categoryNames.push(category.name);
        Object.values(category.subCategories).forEach(subCategory => {
          templateCount += subCategory.templates.length;
        });
      });

      return {
        id: industryId,
        name: industry.name,
        description: industry.description,
        icon: industryIcons[industryId] || <Briefcase className="w-6 h-6" />,
        templateCount,
        categories: categoryNames
      };
    }
  );

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="success" size="lg" className="mb-4" animate={false}>
            Library Expansion
          </Badge>
          
          <Heading as="h2" size="display-sm" className="mb-4" animate={false}>
            {totalNewTemplates} Additional Professional Invoice Templates
          </Heading>
          
          <Text size="lg" variant="muted" className="mb-6" animate={false}>
            Our invoice template library now includes {totalNewIndustries} additional specialized industries. 
            Each template is professionally designed with industry-specific fields, compliance standards, 
            and best practices to help you create accurate, compliant invoices.
          </Text>

          <div className="flex items-center justify-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Industry-Specific Fields</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Compliance Standards</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Free to Use</span>
            </div>
          </div>
        </div>

        {/* Industry Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industryPreviews.map((industry) => (
            <Card 
              key={industry.id} 
              variant="hover" 
              elevation="lg" 
              padding="lg" 
              animate={false}
              className="hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Industry Icon */}
              <IconBox
                icon={industry.icon}
                variant="primary"
                styleVariant="gradient"
                size="lg"
                rounded="lg"
                className="mb-4"
                animate={false}
              />

              {/* Industry Name & Template Count */}
              <div className="flex items-start justify-between mb-3">
                <Heading as="h3" size="xl" className="flex-1" animate={false}>
                  {industry.name}
                </Heading>
                <Badge variant="secondary" size="sm" animate={false}>
                  {industry.templateCount} {industry.templateCount === 1 ? 'Template' : 'Templates'}
                </Badge>
              </div>

              {/* Description */}
              <Text size="sm" variant="muted" className="mb-4" animate={false}>
                {industry.description}
              </Text>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200">
                {industry.categories.slice(0, 3).map((category, idx) => (
                  <span 
                    key={idx}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {category}
                  </span>
                ))}
                {industry.categories.length > 3 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                    +{industry.categories.length - 3} more
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Card 
            variant="gradient" 
            padding="xl" 
            animate={false}
            className="max-w-2xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
          >
            <Heading as="h3" size="lg" className="mb-4 text-white" animate={false}>
              All Templates Include
            </Heading>
            
            <div className="grid sm:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{totalNewTemplates + 132}</div>
                <div className="text-indigo-100 text-sm">Total Templates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{totalNewIndustries + 10}</div>
                <div className="text-indigo-100 text-sm">Industries Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-indigo-100 text-sm">Free Forever</div>
              </div>
            </div>

            <Text size="sm" className="mt-6 text-indigo-100" animate={false}>
              Every template includes customizable fields, VAT calculations, payment terms, 
              and professional formatting. Download instantly as PDF or print-ready format.
            </Text>
          </Card>
        </div>

      </div>
    </section>
  );
}
