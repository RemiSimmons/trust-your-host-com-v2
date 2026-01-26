import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersTable } from "@/components/admin/users-table"
import { UserStatsCards } from "@/components/admin/user-stats-cards"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

export default function UsersManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts, roles, and permissions</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <UserStatsCards />

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="guests">Guests</TabsTrigger>
          <TabsTrigger value="hosts">Hosts</TabsTrigger>
          <TabsTrigger value="admins">Admins</TabsTrigger>
          <TabsTrigger value="suspended">Suspended</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <UsersTable filter="all" />
        </TabsContent>

        <TabsContent value="guests" className="space-y-4">
          <UsersTable filter="guests" />
        </TabsContent>

        <TabsContent value="hosts" className="space-y-4">
          <UsersTable filter="hosts" />
        </TabsContent>

        <TabsContent value="admins" className="space-y-4">
          <UsersTable filter="admins" />
        </TabsContent>

        <TabsContent value="suspended" className="space-y-4">
          <UsersTable filter="suspended" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
