'use client'

import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Users, Home, Trophy } from "lucide-react"
import type { HelpFaqItem } from "@/lib/data/help-center-faqs"

type TabValue = "guests" | "hosts" | "fifa"

function getTabFromUrl(searchParams: ReturnType<typeof useSearchParams>): TabValue {
  const tab = searchParams.get("tab")
  if (tab === "hosts" || tab === "fifa") return tab
  return "guests"
}

interface HelpCenterTabsProps {
  guestFaqs: HelpFaqItem[]
  hostFaqs: HelpFaqItem[]
  fifaFaqs: HelpFaqItem[]
}

function FaqSection({ title, items }: { title: string; items: HelpFaqItem[] }) {
  return (
    <div className="mb-10 last:mb-0">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        {title}
      </h3>
      <Accordion type="single" collapsible className="w-full space-y-2">
        {items.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-gray-200 rounded-lg px-4 bg-white hover:border-orange-200 transition-colors"
          >
            <AccordionTrigger className="text-left hover:text-orange-600 hover:no-underline py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 text-base pb-4 whitespace-pre-line">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

function groupBySection(items: HelpFaqItem[]) {
  const groups: Record<string, HelpFaqItem[]> = {}
  for (const item of items) {
    if (!groups[item.section]) groups[item.section] = []
    groups[item.section].push(item)
  }
  return groups
}

/** Fallback for Suspense - shows guests tab while searchParams load */
export function HelpCenterTabsFallback({ guestFaqs, hostFaqs, fifaFaqs }: HelpCenterTabsProps) {
  const guestGroups = groupBySection(guestFaqs)
  const hostGroups = groupBySection(hostFaqs)

  return (
    <Tabs defaultValue="guests" className="w-full">
      <TabsList className="w-full md:w-auto grid grid-cols-3 h-auto p-1 gap-1 mb-8">
        <TabsTrigger value="guests" className="flex items-center gap-2 py-3 px-4">
          <Users className="h-4 w-4" />
          For Guests
        </TabsTrigger>
        <TabsTrigger value="hosts" className="flex items-center gap-2 py-3 px-4">
          <Home className="h-4 w-4" />
          For Hosts
        </TabsTrigger>
        <TabsTrigger value="fifa" className="flex items-center gap-2 py-3 px-4">
          <Trophy className="h-4 w-4" />
          FIFA 2026
        </TabsTrigger>
      </TabsList>

      <TabsContent value="guests" className="mt-0">
        <FaqSection title="Booking Process" items={guestGroups["Booking Process"] || []} />
        <FaqSection title="Safety & Trust" items={guestGroups["Safety & Trust"] || []} />
        <FaqSection title="FIFA 2026 Specific" items={guestGroups["FIFA 2026"] || []} />
      </TabsContent>

      <TabsContent value="hosts" className="mt-0">
        <FaqSection title="Getting Started" items={hostGroups["Getting Started"] || []} />
        <FaqSection title="Verification" items={hostGroups["Verification"] || []} />
        <FaqSection title="Platform Use" items={hostGroups["Platform Use"] || []} />
      </TabsContent>

      <TabsContent value="fifa" className="mt-0">
        <FaqSection title="FIFA 2026" items={fifaFaqs} />
      </TabsContent>
    </Tabs>
  )
}

export function HelpCenterTabs({ guestFaqs, hostFaqs, fifaFaqs }: HelpCenterTabsProps) {
  const searchParams = useSearchParams()
  const defaultTab = getTabFromUrl(searchParams)
  const guestGroups = groupBySection(guestFaqs)
  const hostGroups = groupBySection(hostFaqs)

  return (
    <Tabs key={defaultTab} defaultValue={defaultTab} className="w-full">
      <TabsList className="w-full md:w-auto grid grid-cols-3 h-auto p-1 gap-1 mb-8">
        <TabsTrigger value="guests" className="flex items-center gap-2 py-3 px-4">
          <Users className="h-4 w-4" />
          For Guests
        </TabsTrigger>
        <TabsTrigger value="hosts" className="flex items-center gap-2 py-3 px-4">
          <Home className="h-4 w-4" />
          For Hosts
        </TabsTrigger>
        <TabsTrigger value="fifa" className="flex items-center gap-2 py-3 px-4">
          <Trophy className="h-4 w-4" />
          FIFA 2026
        </TabsTrigger>
      </TabsList>

      <TabsContent value="guests" className="mt-0">
        <FaqSection title="Booking Process" items={guestGroups["Booking Process"] || []} />
        <FaqSection title="Safety & Trust" items={guestGroups["Safety & Trust"] || []} />
        <FaqSection title="FIFA 2026 Specific" items={guestGroups["FIFA 2026"] || []} />
      </TabsContent>

      <TabsContent value="hosts" className="mt-0">
        <FaqSection title="Getting Started" items={hostGroups["Getting Started"] || []} />
        <FaqSection title="Verification" items={hostGroups["Verification"] || []} />
        <FaqSection title="Platform Use" items={hostGroups["Platform Use"] || []} />
      </TabsContent>

      <TabsContent value="fifa" className="mt-0">
        <FaqSection title="FIFA 2026" items={fifaFaqs} />
      </TabsContent>
    </Tabs>
  )
}
