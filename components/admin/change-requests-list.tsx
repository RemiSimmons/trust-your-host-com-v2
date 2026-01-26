'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Check, X, Clock, AlertTriangle } from 'lucide-react'
import { approveChangeRequest, rejectChangeRequest } from '@/app/admin/change-requests/actions'
import { useRouter } from 'next/navigation'

interface ChangeRequest {
  id: string
  property_id: string
  requested_changes: Record<string, any>
  current_values: Record<string, any>
  requested_at: string
  property: {
    id: string
    name: string
    slug: string
    location: any
    property_type: string
    capacity: any
  }
  host: {
    id: string
    full_name: string
    email: string
  }
}

interface ChangeRequestsListProps {
  requests: ChangeRequest[]
}

export function ChangeRequestsList({ requests }: ChangeRequestsListProps) {
  const router = useRouter()
  const [selectedRequest, setSelectedRequest] = useState<ChangeRequest | null>(null)
  const [adminNotes, setAdminNotes] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  async function handleApprove() {
    if (!selectedRequest) return
    
    setIsProcessing(true)
    try {
      const result = await approveChangeRequest(selectedRequest.id, adminNotes)
      if (result.success) {
        alert('Change request approved! Property updated.')
        setSelectedRequest(null)
        setAdminNotes('')
        router.refresh()
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      alert('Failed to approve change request')
    } finally {
      setIsProcessing(false)
    }
  }

  async function handleReject() {
    if (!selectedRequest) return
    if (!adminNotes.trim()) {
      alert('Please provide a reason for rejection')
      return
    }
    
    setIsProcessing(true)
    try {
      const result = await rejectChangeRequest(selectedRequest.id, adminNotes)
      if (result.success) {
        alert('Change request rejected. Host will be notified.')
        setSelectedRequest(null)
        setAdminNotes('')
        router.refresh()
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      alert('Failed to reject change request')
    } finally {
      setIsProcessing(false)
    }
  }

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Pending Requests</h3>
          <p className="text-muted-foreground">
            All property change requests have been reviewed
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{request.property.name}</CardTitle>
                  <CardDescription>
                    Requested by {request.host.full_name} ({request.host.email})
                  </CardDescription>
                </div>
                <Badge variant="secondary">
                  <Clock className="h-3 w-3 mr-1" />
                  Pending
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Requested Changes Summary */}
              <div>
                <p className="text-sm font-semibold mb-2">Requested Changes:</p>
                <div className="grid gap-2">
                  {Object.entries(request.requested_changes).map(([field, value]) => (
                    <div key={field} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="font-medium capitalize">{field.replace(/_/g, ' ')}:</span>
                        <div className="mt-1 p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded border border-yellow-200 dark:border-yellow-800">
                          {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  variant="default" 
                  onClick={() => setSelectedRequest(request)}
                  className="flex-1"
                >
                  Review Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Review Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Property Change Request</DialogTitle>
            <DialogDescription>
              Compare current values with requested changes
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6">
              {/* Property Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Property Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><strong>Name:</strong> {selectedRequest.property.name}</div>
                  <div><strong>Type:</strong> {selectedRequest.property.property_type}</div>
                  <div>
                    <strong>Location:</strong> {selectedRequest.property.location.city}, {selectedRequest.property.location.state}
                  </div>
                  <div>
                    <strong>Requested:</strong> {new Date(selectedRequest.requested_at).toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              {/* Side-by-Side Comparison */}
              <div className="space-y-4">
                <h3 className="font-semibold">Comparison</h3>
                {Object.entries(selectedRequest.requested_changes).map(([field, newValue]) => {
                  const currentValue = selectedRequest.current_values?.[field] || 
                                      selectedRequest.property[field as keyof typeof selectedRequest.property]
                  
                  return (
                    <div key={field} className="grid md:grid-cols-2 gap-4 p-4 border rounded-lg">
                      <div>
                        <p className="text-sm font-semibold mb-2 text-muted-foreground">Current</p>
                        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
                          <p className="text-sm font-mono">
                            {typeof currentValue === 'object' 
                              ? JSON.stringify(currentValue, null, 2)
                              : String(currentValue || 'N/A')}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-2 text-yellow-600">Requested</p>
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded border border-yellow-200 dark:border-yellow-800">
                          <p className="text-sm font-mono">
                            {typeof newValue === 'object'
                              ? JSON.stringify(newValue, null, 2)
                              : String(newValue)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Admin Notes */}
              <div>
                <Label htmlFor="admin-notes">Admin Notes (Optional for approval, Required for rejection)</Label>
                <Textarea
                  id="admin-notes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about this review decision..."
                  rows={3}
                  className="mt-2"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="default"
                  onClick={handleApprove}
                  disabled={isProcessing}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve & Apply Changes
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  disabled={isProcessing || !adminNotes.trim()}
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject Request
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
