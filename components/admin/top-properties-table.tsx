import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

const topProperties = [
  {
    id: "1",
    name: "Lux Mountain Villa",
    location: "Aspen, CO",
    revenue: "$45,230",
    bookings: 23,
    rating: 4.9,
    growth: "+15%",
  },
  {
    id: "2",
    name: "Beachfront Paradise",
    location: "Malibu, CA",
    revenue: "$38,450",
    bookings: 19,
    rating: 4.8,
    growth: "+22%",
  },
  {
    id: "3",
    name: "Downtown Loft",
    location: "NYC, NY",
    revenue: "$32,890",
    bookings: 31,
    rating: 4.7,
    growth: "+8%",
  },
  {
    id: "4",
    name: "Desert Oasis",
    location: "Sedona, AZ",
    revenue: "$29,670",
    bookings: 17,
    rating: 4.9,
    growth: "+18%",
  },
  {
    id: "5",
    name: "Lake House Retreat",
    location: "Tahoe, CA",
    revenue: "$27,340",
    bookings: 15,
    rating: 4.8,
    growth: "+12%",
  },
]

export function TopPropertiesTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Properties</CardTitle>
        <CardDescription>Highest revenue generators this month</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Growth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topProperties.map((property, index) => (
              <TableRow key={property.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="h-6 w-6 rounded-full p-0 flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <span className="font-medium">{property.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{property.location}</TableCell>
                <TableCell className="font-semibold">{property.revenue}</TableCell>
                <TableCell>{property.bookings}</TableCell>
                <TableCell>
                  <Badge variant="outline">{property.rating} ★</Badge>
                </TableCell>
                <TableCell>
                  <span className="flex items-center text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {property.growth}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
