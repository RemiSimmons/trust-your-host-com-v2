import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GeneralSettingsForm } from "@/components/admin/general-settings-form"
import { EmailSettingsForm } from "@/components/admin/email-settings-form"
import { PaymentSettingsForm } from "@/components/admin/payment-settings-form"
import { SecuritySettingsForm } from "@/components/admin/security-settings-form"
import { IntegrationsSettings } from "@/components/admin/integrations-settings"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">Configure platform settings, integrations, and security options</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettingsForm />
        </TabsContent>

        <TabsContent value="email">
          <EmailSettingsForm />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentSettingsForm />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettingsForm />
        </TabsContent>

        <TabsContent value="integrations">
          <IntegrationsSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
