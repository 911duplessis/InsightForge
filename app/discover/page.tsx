'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import type { DiscoveryFormData } from '@/types'

const TOTAL_STEPS = 11 // 0=contact, 1=company, 2=customers, 3=products, 4=revenue, 5=marketing, 6=operations, 7=competition, 8=challenges, 9=opportunities, 10=submit

const STEP_TITLES = [
  'Your Contact Info',
  'Company Overview',
  'Your Customers',
  'Products & Services',
  'Revenue & Finance',
  'Marketing & Sales',
  'Operations & Team',
  'Competition',
  'Your Challenges',
  'Your Opportunities',
  'Generating Your Blueprint',
]

const STEP_DESCRIPTIONS = [
  "Let's start with your details",
  'Tell us about your business',
  'Who do you serve?',
  'What do you offer?',
  'Follow the money',
  'Growth engine analysis',
  'Behind the scenes',
  'Know your battlefield',
  'What keeps you up at night?',
  'Your growth upside',
  '',
]

const initialFormData: DiscoveryFormData = {
  contact: {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    best_time_to_contact: '',
  },
  company: {
    company_name: '',
    industry: '',
    years_in_business: '',
    number_of_employees: '',
    annual_revenue_range: '',
    business_model: '',
    geographic_reach: '',
    company_description: '',
  },
  customers: {
    primary_customer_type: '',
    ideal_customer_profile: '',
    customer_acquisition_method: '',
    average_transaction_value: '',
    customer_retention_rate: '',
    biggest_customer_complaint: '',
    referral_rate: '',
  },
  products: {
    main_products_services: '',
    best_selling_product: '',
    unique_value_proposition: '',
    pricing_strategy: '',
    product_development_plans: '',
    underperforming_offerings: '',
  },
  revenue: {
    primary_revenue_sources: '',
    revenue_consistency: '',
    biggest_revenue_challenge: '',
    invoicing_collection_issues: '',
    profit_margin_estimate: '',
    financial_goals_12_months: '',
  },
  marketing: {
    current_marketing_channels: '',
    marketing_budget_monthly: '',
    best_performing_channel: '',
    worst_performing_channel: '',
    sales_process: '',
    close_rate_estimate: '',
    lead_generation_challenges: '',
  },
  operations: {
    biggest_operational_bottleneck: '',
    team_structure: '',
    technology_stack: '',
    outsourced_functions: '',
    quality_control_process: '',
    scalability_challenges: '',
  },
  competition: {
    main_competitors: '',
    competitive_advantages: '',
    competitive_disadvantages: '',
    market_position: '',
    competitor_pricing: '',
    differentiation_strategy: '',
  },
  challenges: {
    top_3_challenges: '',
    biggest_fear: '',
    past_failed_initiatives: '',
    resource_constraints: '',
    time_horizon: '',
  },
  opportunities: {
    untapped_opportunities: '',
    dream_outcome_12_months: '',
    biggest_growth_lever: '',
    ideal_partnership: '',
    expansion_plans: '',
    investment_readiness: '',
  },
}

type FormSection = keyof DiscoveryFormData

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">
        {label} {required && <span className="text-forge-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-forge-500 focus:border-transparent transition-all bg-white"
      />
    </div>
  )
}

function PhoneInput({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
}) {
  const parsed = value ? parsePhoneNumberFromString(value) : null
  const country = parsed?.isValid() ? parsed.country : null
  const regionNames = typeof Intl !== 'undefined' ? new Intl.DisplayNames(['en'], { type: 'region' }) : null
  const countryName = country && regionNames ? regionNames.of(country) : null

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">
        {label} {required && <span className="text-forge-500">*</span>}
      </label>
      <div className="relative">
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-forge-500 focus:border-transparent transition-all bg-white"
        />
        {countryName && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs font-medium text-forge-600 bg-forge-50 border border-forge-200 rounded-lg px-2 py-1 pointer-events-none">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {countryName}
          </span>
        )}
      </div>
    </div>
  )
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  required = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">
        {label} {required && <span className="text-forge-500">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-forge-500 focus:border-transparent transition-all bg-white resize-none"
      />
    </div>
  )
}

function Select({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">
        {label} {required && <span className="text-forge-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-forge-500 focus:border-transparent transition-all bg-white"
      >
        <option value="">Select an option...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}

export default function DiscoverPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<DiscoveryFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analysisStage, setAnalysisStage] = useState(0)

  const updateSection = <K extends FormSection>(
    section: K,
    field: keyof DiscoveryFormData[K],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const progressPercent = Math.round((step / (TOTAL_STEPS - 1)) * 100)

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setStep(10)
    setError(null)

    // Simulate staged analysis progress
    const stages = [
      'Saving your discovery data...',
      'Activating FORGE Framework™...',
      'Finding Reality (F)...',
      'Observing Patterns (O)...',
      'Revealing Opportunities (R)...',
      'Generating Solutions (G)...',
      'Building your Blueprint...',
    ]

    let currentStage = 0
    const stageInterval = setInterval(() => {
      if (currentStage < stages.length - 1) {
        currentStage++
        setAnalysisStage(currentStage)
      }
    }, 4000)

    try {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      clearInterval(stageInterval)

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }

      const data = await res.json()
      router.push(`/blueprint/${data.session_id}`)
    } catch (err) {
      clearInterval(stageInterval)
      setIsSubmitting(false)
      setStep(9)
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.')
    }
  }

  const analysisStageLabels = [
    'Saving your discovery data...',
    'Activating FORGE Framework™...',
    'Finding Reality (F)...',
    'Observing Patterns (O)...',
    'Revealing Opportunities (R)...',
    'Generating Solutions (G)...',
    'Building your Blueprint...',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-forge-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-forge-950 to-forge-800 text-white py-4 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">IF</span>
            </div>
            <span className="font-bold text-lg">InsightForge Discover™</span>
          </div>
          {step < 10 && (
            <span className="text-slate-300 text-sm">
              Step {step + 1} of {TOTAL_STEPS - 1}
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {step < 10 && (
        <div className="bg-forge-900 h-1.5">
          <div
            className="h-full bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Step 10: Analyzing */}
        {step === 10 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-forge-500 to-forge-700 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-forge-500/30">
              <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
            <h2 className="text-3xl font-bold text-forge-900 mb-3">
              Forging Your Blueprint
            </h2>
            <p className="text-slate-500 mb-10 max-w-md mx-auto">
              Our FORGE Framework™ AI is analyzing your business discovery data to generate
              your executive-grade strategic blueprint.
            </p>
            <div className="bg-white rounded-2xl border border-forge-100 shadow-xl p-8 max-w-md mx-auto">
              {analysisStageLabels.map((label, i) => (
                <div
                  key={label}
                  className={`flex items-center gap-3 py-2.5 transition-all ${
                    i < analysisStage
                      ? 'text-green-600'
                      : i === analysisStage
                      ? 'text-forge-600 font-medium'
                      : 'text-slate-300'
                  }`}
                >
                  {i < analysisStage ? (
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : i === analysisStage ? (
                    <div className="w-5 h-5 border-2 border-forge-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-slate-200 rounded-full flex-shrink-0" />
                  )}
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-slate-400 text-sm mt-8">
              This usually takes 30–60 seconds. Please don&apos;t close this window.
            </p>
          </div>
        )}

        {/* Step 0: Contact Info */}
        {step === 0 && (
          <FormShell
            title={STEP_TITLES[0]}
            description={STEP_DESCRIPTIONS[0]}
            onNext={handleNext}
            onBack={null}
            step={step}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={formData.contact.first_name}
                onChange={(v) => updateSection('contact', 'first_name', v)}
                placeholder="John"
                required
              />
              <Input
                label="Last Name"
                value={formData.contact.last_name}
                onChange={(v) => updateSection('contact', 'last_name', v)}
                placeholder="Smith"
                required
              />
            </div>
            <Input
              label="Email Address"
              value={formData.contact.email}
              onChange={(v) => updateSection('contact', 'email', v)}
              placeholder="john@yourbusiness.com"
              type="email"
              required
            />
            <PhoneInput
              label="Phone Number"
              value={formData.contact.phone}
              onChange={(v) => updateSection('contact', 'phone', v)}
              placeholder="+1 555 000 0000"
            />
            <Select
              label="Best Time to Contact"
              value={formData.contact.best_time_to_contact}
              onChange={(v) => updateSection('contact', 'best_time_to_contact', v)}
              options={['Morning (8am–12pm)', 'Afternoon (12pm–5pm)', 'Evening (5pm–8pm)', 'Anytime']}
            />
          </FormShell>
        )}

        {/* Step 1: Company */}
        {step === 1 && (
          <FormShell
            title={STEP_TITLES[1]}
            description={STEP_DESCRIPTIONS[1]}
            onNext={handleNext}
            onBack={handleBack}
            step={step}
          >
            <Input
              label="Company Name"
              value={formData.company.company_name}
              onChange={(v) => updateSection('company', 'company_name', v)}
              placeholder="Acme Corp"
              required
            />
            <Input
              label="Industry"
              value={formData.company.industry}
              onChange={(v) => updateSection('company', 'industry', v)}
              placeholder="e.g. Professional Services, E-commerce, SaaS"
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Years in Business"
                value={formData.company.years_in_business}
                onChange={(v) => updateSection('company', 'years_in_business', v)}
                options={['Less than 1 year', '1–2 years', '3–5 years', '6–10 years', '10+ years']}
                required
              />
              <Select
                label="Number of Employees"
                value={formData.company.number_of_employees}
                onChange={(v) => updateSection('company', 'number_of_employees', v)}
                options={['Solo (just me)', '2–5', '6–15', '16–50', '51–200', '200+']}
              />
            </div>
            <Select
              label="Annual Revenue Range"
              value={formData.company.annual_revenue_range}
              onChange={(v) => updateSection('company', 'annual_revenue_range', v)}
              options={[
                'Pre-revenue',
                'Under $100K',
                '$100K–$500K',
                '$500K–$1M',
                '$1M–$5M',
                '$5M–$20M',
                '$20M+',
              ]}
              required
            />
            <Select
              label="Primary Business Model"
              value={formData.company.business_model}
              onChange={(v) => updateSection('company', 'business_model', v)}
              options={[
                'B2B Services',
                'B2C Products',
                'B2B Products',
                'B2C Services',
                'SaaS / Subscription',
                'E-commerce',
                'Marketplace',
                'Franchise',
                'Consulting / Agency',
                'Other',
              ]}
            />
            <Select
              label="Geographic Reach"
              value={formData.company.geographic_reach}
              onChange={(v) => updateSection('company', 'geographic_reach', v)}
              options={['Local', 'Regional', 'National', 'International', 'Global']}
            />
            <TextArea
              label="Company Description"
              value={formData.company.company_description}
              onChange={(v) => updateSection('company', 'company_description', v)}
              placeholder="Briefly describe what your company does, who you serve, and what makes you different..."
              rows={4}
              required
            />
          </FormShell>
        )}

        {/* Step 2: Customers */}
        {step === 2 && (
          <FormShell
            title={STEP_TITLES[2]}
            description={STEP_DESCRIPTIONS[2]}
            onNext={handleNext}
            onBack={handleBack}
            step={step}
          >
            <Select
              label="Primary Customer Type"
              value={formData.customers.primary_customer_type}
              onChange={(v) => updateSection('customers', 'primary_customer_type', v)}
              options={['Individual Consumers', 'Small Businesses', 'Mid-Market Companies', 'Enterprise', 'Government', 'Non-Profit', 'Mixed']}
              required
            />
            <TextArea
              label="Describe Your Ideal Customer Profile"
              value={formData.customers.ideal_customer_profile}
              onChange={(v) => updateSection('customers', 'ideal_customer_profile', v)}
              placeholder="Age, role, company size, pain points, goals, budget range..."
              rows={3}
              required
            />
            <TextArea
              label="How Do You Acquire New Customers?"
              value={formData.customers.customer_acquisition_method}
              onChange={(v) => updateSection('customers', 'customer_acquisition_method', v)}
              placeholder="Referrals, Google Ads, cold outreach, social media, etc."
              rows={2}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Average Transaction Value"
                value={formData.customers.average_transaction_value}
                onChange={(v) => updateSection('customers', 'average_transaction_value', v)}
                placeholder="e.g. $500, $5,000, $50,000"
              />
              <Select
                label="Estimated Retention Rate"
                value={formData.customers.customer_retention_rate}
                onChange={(v) => updateSection('customers', 'customer_retention_rate', v)}
                options={['Under 40%', '40–60%', '60–75%', '75–85%', '85–95%', '95%+']}
              />
            </div>
            <TextArea
              label="What Is Your Customers' Biggest Complaint?"
              value={formData.customers.biggest_customer_complaint}
              onChange={(v) => updateSection('customers', 'biggest_customer_complaint', v)}
              placeholder="Be honest — what do customers complain about or leave for?"
              rows={2}
            />
            <Select
              label="What % of New Customers Come from Referrals?"
              value={formData.customers.referral_rate}
              onChange={(v) => updateSection('customers', 'referral_rate', v)}
              options={['Under 10%', '10–25%', '25–50%', '50–75%', '75%+']}
            />
          </FormShell>
        )}

        {/* Step 3: Products */}
        {step === 3 && (
          <FormShell
            title={STEP_TITLES[3]}
            description={STEP_DESCRIPTIONS[3]}
            onNext={handleNext}
            onBack={handleBack}
            step={step}
          >
            <TextArea
              label="List Your Main Products / Services"
              value={formData.products.main_products_services}
              onChange={(v) => updateSection('products', 'main_products_services', v)}
              placeholder="List each product or service with a brief description..."
              rows={4}
              required
            />
            <Input
              label="What Is Your Best-Selling Offering?"
              value={formData.products.best_selling_product}
              onChange={(v) => updateSection('products', 'best_selling_product', v)}
              placeholder="The product or service that drives the most revenue"
            />
            <TextArea
              label="What Is Your Unique Value Proposition?"
              value={formData.products.unique_value_proposition}
              onChange={(v) => updateSection('products', 'unique_value_proposition', v)}
              placeholder="Why do customers choose you over competitors?"
              rows={2}
              required
            />
            <TextArea
              label="Describe Your Pricing Strategy"
              value={formData.products.pricing_strategy}
              onChange={(v) => updateSection('products', 'pricing_strategy', v)}
              placeholder="How do you price? Value-based, cost-plus, competitor-matched, premium, etc."
              rows={2}
            />
            <TextArea
              label="Any Products/Services Underperforming?"
              value={formData.products.underperforming_offerings}
              onChange={(v) => updateSection('products', 'underperforming_offerings', v)}
              placeholder="What is not selling well and why?"
              rows={2}
            />
            <TextArea
              label="Future Product/Service Plans"
              value={formData.products.product_development_plans}
              onChange={(v) => updateSection('products', 'product_development_plans', v)}
              placeholder="Any new offerings you're planning or considering?"
              rows={2}
            />
          </FormShell>
        )}

        {/* Step 4: Revenue */}
        {step === 4 && (
          <FormShell
            title={STEP_TITLES[4]}
            description={STEP_DESCRIPTIONS[4]}
            onNext={handleNext}
            onBack={handleBack}
            step={step}
          >
            <TextArea
              label="What Are Your Primary Revenue Sources?"
              value={formData.revenue.primary_revenue_sources}
              onChange={(v) => updateSection('revenue', 'primary_revenue_sources', v)}
              placeholder="List your revenue streams ranked by size..."
              rows={3}
              required
            />
            <Select
              label="How Consistent Is Your Revenue?"
              value={formData.revenue.revenue_consistency}
              onChange={(v) => updateSection('revenue', 'revenue_consistency', v)}
              options={[
                'Highly seasonal / unpredictable',
                'Some seasonality, mostly stable',
                'Mostly consistent with some fluctuation',
                'Very consistent / recurring',
              ]}
            />
            <TextArea
              label="What Is Your Biggest Revenue Challenge?"
              value={formData.revenue.biggest_revenue_challenge}
              onChange={(v) => updateSection('revenue', 'biggest_revenue_challenge', v)}
              placeholder="Cash flow, pricing, losing deals, not enough leads, etc."
              rows={2}
              required
            />
            <TextArea
              label="Any Invoicing or Collection Issues?"
              value={formData.revenue.invoicing_collection_issues}
              onChange={(v) => updateSection('revenue', 'invoicing_collection_issues', v)}
              placeholder="Late payments, bad debt, scope creep, pricing disputes?"
              rows={2}
            />
            <Select
              label="Estimated Gross Profit Margin"
              value={formData.revenue.profit_margin_estimate}
              onChange={(v) => updateSection('revenue', 'profit_margin_estimate', v)}
              options={[
                "I don't know",
                'Under 20%',
                '20–35%',
                '35–50%',
                '50–65%',
                '65–80%',
                'Over 80%',
              ]}
            />
            <TextArea
              label="What Are Your Financial Goals for the Next 12 Months?"
              value={formData.revenue.financial_goals_12_months}
              onChange={(v) => updateSection('revenue', 'financial_goals_12_months', v)}
              placeholder="Revenue target, profit target, specific milestones..."
              rows={2}
              required
            />
          </FormShell>
        )}

        {/* Step 5: Marketing */}
        {step === 5 && (
          <FormShell
            title={STEP_TITLES[5]}
            description={STEP_DESCRIPTIONS[5]}
            onNext={handleNext}
            onBack={handleBack}
            step={step}
          >
            <TextArea
              label="Current Marketing Channels"
              value={formData.marketing.current_marketing_channels}
              onChange={(v) => updateSection('marketing', 'current_marketing_channels', v)}
              placeholder="Social media, email, SEO, paid ads, events, PR, content, etc."
              rows={3}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Monthly Marketing Budget"
                value={formData.marketing.marketing_budget_monthly}
                onChange={(v) => updateSection('marketing', 'marketing_budget_monthly', v)}
                options={[
                  '$0 (organic only)',
                  'Under $500',
                  '$500–$2,000',
                  '$2,000–$5,000',
                  '$5,000–$20,000',
                  '$20,000+',
                ]}
              />
              <Select
                label="Estimated Sales Close Rate"
                value={formData.marketing.close_rate_estimate}
                onChange={(v) => updateSection('marketing', 'close_rate_estimate', v)}
                options={['Under 10%', '10–20%', '20–35%', '35–50%', '50–70%', '70%+']}
              />
            </div>
            <Input
              label="Best Performing Marketing Channel"
              value={formData.marketing.best_performing_channel}
              onChange={(v) => updateSection('marketing', 'best_performing_channel', v)}
              placeholder="What generates the most quality leads?"
            />
            <Input
              label="Worst Performing Marketing Channel"
              value={formData.marketing.worst_performing_channel}
              onChange={(v) => updateSection('marketing', 'worst_performing_channel', v)}
              placeholder="What has wasted the most money with little return?"
            />
            <TextArea
              label="Describe Your Sales Process"
              value={formData.marketing.sales_process}
              onChange={(v) => updateSection('marketing', 'sales_process', v)}
              placeholder="From first contact to closed deal — what steps do leads go through?"
              rows={3}
            />
            <TextArea
              label="Biggest Lead Generation Challenges"
              value={formData.marketing.lead_generation_challenges}
              onChange={(v) => updateSection('marketing', 'lead_generation_challenges', v)}
              placeholder="Not enough leads, wrong leads, high cost per lead, etc."
              rows={2}
            />
          </FormShell>
        )}

        {/* Step 6: Operations */}
        {step === 6 && (
          <FormShell
            title={STEP_TITLES[6]}
            description={STEP_DESCRIPTIONS[6]}
            onNext={handleNext}
            onBack={handleBack}
            step={step}
          >
            <TextArea
              label="Biggest Operational Bottleneck"
              value={formData.operations.biggest_operational_bottleneck}
              onChange={(v) => updateSection('operations', 'biggest_operational_bottleneck', v)}
              placeholder="What single process slows you down the most?"
              rows={2}
              required
            />
            <TextArea
              label="Team Structure"
              value={formData.operations.team_structure}
              onChange={(v) => updateSection('operations', 'team_structure', v)}
              placeholder="Describe key roles: founders, employees, contractors, departments..."
              rows={3}
            />
            <TextArea
              label="Technology / Software Stack"
              value={formData.operations.technology_stack}
              onChange={(v) => updateSection('operations', 'technology_stack', v)}
              placeholder="CRM, project management, accounting, communication tools, etc."
              rows={2}
            />
            <TextArea
              label="What Do You Outsource?"
              value={formData.operations.outsourced_functions}
              onChange={(v) => updateSection('operations', 'outsourced_functions', v)}
              placeholder="Accounting, marketing, IT, customer service, fulfilment, etc."
              rows={2}
            />
            <TextArea
              label="Quality Control Process"
              value={formData.operations.quality_control_process}
              onChange={(v) => updateSection('operations', 'quality_control_process', v)}
              placeholder="How do you ensure consistent quality in your products/services?"
              rows={2}
            />
            <TextArea
              label="Biggest Scalability Challenge"
              value={formData.operations.scalability_challenges}
              onChange={(v) => updateSection('operations', 'scalability_challenges', v)}
              placeholder="What would break first if your business doubled in size overnight?"
              rows={2}
            />
          </FormShell>
        )}

        {/* Step 7: Competition */}
        {step === 7 && (
          <FormShell
            title={STEP_TITLES[7]}
            description={STEP_DESCRIPTIONS[7]}
            onNext={handleNext}
            onBack={handleBack}
            step={step}
          >
            <TextArea
              label="Who Are Your Main Competitors?"
              value={formData.competition.main_competitors}
              onChange={(v) => updateSection('competition', 'main_competitors', v)}
              placeholder="List your top 3–5 competitors by name or description..."
              rows={3}
              required
            />
            <TextArea
              label="Your Competitive Advantages"
              value={formData.competition.competitive_advantages}
              onChange={(v) => updateSection('competition', 'competitive_advantages', v)}
              placeholder="Where do you genuinely beat the competition?"
              rows={2}
            />
            <TextArea
              label="Your Competitive Disadvantages"
              value={formData.competition.competitive_disadvantages}
              onChange={(v) => updateSection('competition', 'competitive_disadvantages', v)}
              placeholder="Be honest — where does the competition beat you?"
              rows={2}
            />
            <Select
              label="Your Current Market Position"
              value={formData.competition.market_position}
              onChange={(v) => updateSection('competition', 'market_position', v)}
              options={[
                'Market leader',
                'Strong challenger',
                'Mid-market player',
                'Niche specialist',
                'New entrant',
                'Struggling to differentiate',
              ]}
            />
            <TextArea
              label="How Does Your Pricing Compare to Competitors?"
              value={formData.competition.competitor_pricing}
              onChange={(v) => updateSection('competition', 'competitor_pricing', v)}
              placeholder="Are you premium, mid-market, or budget? How do competitors price?"
              rows={2}
            />
            <TextArea
              label="Your Differentiation Strategy"
              value={formData.competition.differentiation_strategy}
              onChange={(v) => updateSection('competition', 'differentiation_strategy', v)}
              placeholder="What is your core strategy for standing out in the market?"
              rows={2}
            />
          </FormShell>
        )}

        {/* Step 8: Challenges */}
        {step === 8 && (
          <FormShell
            title={STEP_TITLES[8]}
            description={STEP_DESCRIPTIONS[8]}
            onNext={handleNext}
            onBack={handleBack}
            step={step}
          >
            <TextArea
              label="What Are Your Top 3 Business Challenges Right Now?"
              value={formData.challenges.top_3_challenges}
              onChange={(v) => updateSection('challenges', 'top_3_challenges', v)}
              placeholder="1. ...\n2. ...\n3. ..."
              rows={4}
              required
            />
            <TextArea
              label="What Is Your Biggest Fear About the Business?"
              value={formData.challenges.biggest_fear}
              onChange={(v) => updateSection('challenges', 'biggest_fear', v)}
              placeholder="What keeps you up at night? What scenario scares you most?"
              rows={2}
            />
            <TextArea
              label="Past Initiatives That Failed — What Happened?"
              value={formData.challenges.past_failed_initiatives}
              onChange={(v) => updateSection('challenges', 'past_failed_initiatives', v)}
              placeholder="What have you tried that didn't work? What did you learn?"
              rows={3}
            />
            <TextArea
              label="What Are Your Biggest Resource Constraints?"
              value={formData.challenges.resource_constraints}
              onChange={(v) => updateSection('challenges', 'resource_constraints', v)}
              placeholder="Capital, time, talent, technology, market access?"
              rows={2}
            />
            <Select
              label="Your Growth Time Horizon"
              value={formData.challenges.time_horizon}
              onChange={(v) => updateSection('challenges', 'time_horizon', v)}
              options={[
                'Immediate (next 90 days critical)',
                'Short-term (6–12 months)',
                'Medium-term (1–3 years)',
                'Long-term (3–5+ years)',
              ]}
            />
          </FormShell>
        )}

        {/* Step 9: Opportunities */}
        {step === 9 && (
          <FormShell
            title={STEP_TITLES[9]}
            description={STEP_DESCRIPTIONS[9]}
            onNext={null}
            onBack={handleBack}
            onSubmit={handleSubmit}
            step={step}
            isSubmitting={isSubmitting}
          >
            <TextArea
              label="What Untapped Opportunities Do You See?"
              value={formData.opportunities.untapped_opportunities}
              onChange={(v) => updateSection('opportunities', 'untapped_opportunities', v)}
              placeholder="Markets you haven't entered, products you could offer, partnerships, etc."
              rows={3}
              required
            />
            <TextArea
              label="What Is Your Dream Outcome in 12 Months?"
              value={formData.opportunities.dream_outcome_12_months}
              onChange={(v) => updateSection('opportunities', 'dream_outcome_12_months', v)}
              placeholder="Be specific — revenue, team size, market position, lifestyle..."
              rows={2}
              required
            />
            <TextArea
              label="What Do You Believe Is Your Biggest Growth Lever?"
              value={formData.opportunities.biggest_growth_lever}
              onChange={(v) => updateSection('opportunities', 'biggest_growth_lever', v)}
              placeholder="If you could only fix one thing, what would have the biggest impact?"
              rows={2}
            />
            <TextArea
              label="Ideal Strategic Partnership"
              value={formData.opportunities.ideal_partnership}
              onChange={(v) => updateSection('opportunities', 'ideal_partnership', v)}
              placeholder="What company, platform, or network would 10x your business if partnered with?"
              rows={2}
            />
            <TextArea
              label="Geographic or Market Expansion Plans"
              value={formData.opportunities.expansion_plans}
              onChange={(v) => updateSection('opportunities', 'expansion_plans', v)}
              placeholder="Any plans to expand to new markets, locations, or customer segments?"
              rows={2}
            />
            <Select
              label="Investment Readiness"
              value={formData.opportunities.investment_readiness}
              onChange={(v) => updateSection('opportunities', 'investment_readiness', v)}
              options={[
                'Not looking for investment',
                'Open to strategic investment',
                'Actively seeking investment',
                'Bootstrapped by choice',
                'Already have investors',
              ]}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}
          </FormShell>
        )}
      </div>
    </div>
  )
}

function FormShell({
  title,
  description,
  children,
  onNext,
  onBack,
  onSubmit,
  step,
  isSubmitting = false,
}: {
  title: string
  description: string
  children: React.ReactNode
  onNext: (() => void) | null
  onBack: (() => void) | null
  onSubmit?: () => void
  step: number
  isSubmitting?: boolean
}) {
  return (
    <div className="animate-slide-up">
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-forge-500 to-forge-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            {step + 1}
          </div>
          <span className="text-slate-400 text-sm font-medium">of 10</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="text-slate-500 mt-1">{description}</p>
      </div>

      {/* Form fields */}
      <div className="flex flex-col gap-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-6">
        {children}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        {onSubmit ? (
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 disabled:opacity-60 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg shadow-gold-500/20"
          >
            {isSubmitting ? 'Generating Blueprint...' : 'Generate My Blueprint →'}
          </button>
        ) : onNext ? (
          <button
            onClick={onNext}
            className="bg-gradient-to-r from-forge-500 to-forge-700 hover:from-forge-400 hover:to-forge-600 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-forge-500/20"
          >
            Continue →
          </button>
        ) : null}
      </div>
    </div>
  )
}
