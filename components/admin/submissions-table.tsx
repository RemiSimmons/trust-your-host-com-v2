'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { approvePropertySubmission, rejectPropertySubmission } from '@/app/admin/submissions/actions'
import { Eye, CheckCircle, XCircle, Loader2, ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface Submission {
  id: string
  host_name: string
  host_email: string
  host_phone: string | null
  property_name: string
  external_booking_url: string
  city: string
  state: string | null
  country: string
  street_address: string | null
  postal_code: string | null
  full_address: {
    street: string
    city: string
    state: string
    postal_code: string
    country: string
  } | null
  experiences: string[]
  property_type: string
  image_urls: string[]
  description: string
  nightly_rate_min: number
  nightly_rate_max: number
  max_guests: number
  amenities: string[]
  available_for_fifa_2026: boolean
  listed_on_platforms: string[] | null
  other_platforms: string | null
  typical_response_hours: number | null
  status: string
  created_at: string
}

export function SubmissionsTable({ submissions }: { submissions: Submission[] }) {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')

  async function handleApprove(submissionId: string) {
    if (!confirm('Are you sure you want to approve this property? This will create a host account and start their 60-day trial.')) {
      return
    }

    setIsApproving(true)
    try {
      console.log('Starting approval for submission:', submissionId)
      const result = await approvePropertySubmission(submissionId)
      
      if (result.error) {
        console.error('Approval failed:', result.error)
        alert(`Error: ${result.error}`)
        setIsApproving(false)
      } else {
        console.log('Approval successful, property ID:', result.propertyId)
        alert('Property approved successfully! The page will now reload.')
        setIsDialogOpen(false)
        window.location.reload()
      }
    } catch (error) {
      console.error('Unexpected error during approval:', error)
      alert(`Unexpected error: ${error}`)
      setIsApproving(false)
    }
  }

  async function handleReject(submissionId: string) {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection')
      return
    }

    setIsRejecting(true)
    try {
      console.log('Starting rejection for submission:', submissionId)
      const result = await rejectPropertySubmission(submissionId, rejectionReason)
      
      if (result.error) {
        console.error('Rejection failed:', result.error)
        alert(`Error: ${result.error}`)
        setIsRejecting(false)
      } else {
        console.log('Rejection successful')
        alert('Property rejected successfully! The page will now reload.')
        setShowRejectDialog(false)
        setIsDialogOpen(false)
        setRejectionReason('')
        window.location.reload()
      }
    } catch (error) {
      console.error('Unexpected error during rejection:', error)
      alert(`Unexpected error: ${error}`)
      setIsRejecting(false)
    }
  }

  if (submissions.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground">No pending submissions</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property Name</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>FIFA 2026</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">{submission.property_name}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{submission.host_name}</div>
                    <div className="text-muted-foreground">{submission.host_email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {submission.city}, {submission.state || submission.country}
                </TableCell>
                <TableCell>
                  {new Date(submission.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {submission.available_for_fifa_2026 && (
                    <Badge variant="secondary">⚽ FIFA</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedSubmission(submission)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedSubmission && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedSubmission.property_name}</DialogTitle>
                <DialogDescription>
                  Review this property submission
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Host Information */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">Host Information</h3>
                    <dl className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <dt className="text-muted-foreground">Name</dt>
                        <dd className="font-medium">{selectedSubmission.host_name}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Email</dt>
                        <dd className="font-medium">{selectedSubmission.host_email}</dd>
                      </div>
                      {selectedSubmission.host_phone && (
                        <div>
                          <dt className="text-muted-foreground">Phone</dt>
                          <dd className="font-medium">{selectedSubmission.host_phone}</dd>
                        </div>
                      )}
                    </dl>
                  </CardContent>
                </Card>

                {/* Property Details */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">Property Details</h3>
                    <dl className="space-y-3 text-sm">
                      <div>
                        <dt className="text-muted-foreground">Website</dt>
                        <dd className="font-medium">
                          <a 
                            href={selectedSubmission.external_booking_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1"
                          >
                            {selectedSubmission.external_booking_url}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground font-semibold">Full Address</dt>
                        <dd className="font-medium">
                          {selectedSubmission.full_address ? (
                            <div className="space-y-0.5">
                              <div>{selectedSubmission.full_address.street}</div>
                              <div>
                                {selectedSubmission.full_address.city}, {selectedSubmission.full_address.state} {selectedSubmission.full_address.postal_code}
                              </div>
                              <div>{selectedSubmission.full_address.country}</div>
                            </div>
                          ) : (
                            <div>
                              {selectedSubmission.city}, {selectedSubmission.state} {selectedSubmission.country}
                            </div>
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Property Type</dt>
                        <dd className="font-medium capitalize">{selectedSubmission.property_type}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Nightly Rate</dt>
                        <dd className="font-medium">
                          ${selectedSubmission.nightly_rate_min} - ${selectedSubmission.nightly_rate_max}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Max Guests</dt>
                        <dd className="font-medium">{selectedSubmission.max_guests}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Experience Categories</dt>
                        <dd className="flex flex-wrap gap-2 mt-1">
                          {selectedSubmission.experiences.map(exp => (
                            <Badge key={exp} variant="secondary">{exp}</Badge>
                          ))}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Amenities</dt>
                        <dd className="flex flex-wrap gap-2 mt-1">
                          {selectedSubmission.amenities.map(amenity => (
                            <Badge key={amenity} variant="outline">{amenity}</Badge>
                          ))}
                        </dd>
                      </div>
                      {selectedSubmission.available_for_fifa_2026 && (
                        <div>
                          <Badge>⚽ Available for FIFA World Cup 2026</Badge>
                        </div>
                      )}
                    </dl>
                  </CardContent>
                </Card>

                {/* Optional Information (if provided) */}
                {(selectedSubmission.listed_on_platforms?.length || selectedSubmission.other_platforms || selectedSubmission.typical_response_hours) && (
                  <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-3 text-blue-900 dark:text-blue-100">Optional Information</h3>
                      <dl className="space-y-3 text-sm">
                        {selectedSubmission.listed_on_platforms && selectedSubmission.listed_on_platforms.length > 0 && (
                          <div>
                            <dt className="text-muted-foreground">Currently Listed On</dt>
                            <dd className="flex flex-wrap gap-2 mt-1">
                              {selectedSubmission.listed_on_platforms.map(platform => (
                                <Badge key={platform} variant="secondary">{platform}</Badge>
                              ))}
                            </dd>
                          </div>
                        )}
                        {selectedSubmission.other_platforms && (
                          <div>
                            <dt className="text-muted-foreground">Other Platforms</dt>
                            <dd className="font-medium">{selectedSubmission.other_platforms}</dd>
                          </div>
                        )}
                        {selectedSubmission.typical_response_hours && (
                          <div>
                            <dt className="text-muted-foreground">Typical Response Time</dt>
                            <dd className="font-medium">
                              Within {selectedSubmission.typical_response_hours} {selectedSubmission.typical_response_hours === 1 ? 'hour' : 'hours'}
                            </dd>
                          </div>
                        )}
                      </dl>
                    </CardContent>
                  </Card>
                )}

                {/* Description */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">Description</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {selectedSubmission.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Images */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">Property Images</h3>
                    
                    {/* Image Preview Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                      {selectedSubmission.image_urls.map((url, index) => (
                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={url}
                            alt={`Property image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Clickable Image URLs for Download */}
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Image URLs (Click to open/download):</h4>
                      <div className="space-y-2">
                        {selectedSubmission.image_urls.map((url, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground font-mono">Image {index + 1}:</span>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center gap-1 break-all"
                            >
                              {url.length > 60 ? `${url.substring(0, 60)}...` : url}
                              <ExternalLink className="h-3 w-3 flex-shrink-0" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setShowRejectDialog(true)}
                    disabled={isApproving || isRejecting}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleApprove(selectedSubmission.id)}
                    disabled={isApproving || isRejecting}
                  >
                    {isApproving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Approving...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve & Start Trial
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Submission</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this property
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rejection_reason">Rejection Reason</Label>
              <Textarea
                id="rejection_reason"
                rows={4}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Explain why this property cannot be approved..."
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => selectedSubmission && handleReject(selectedSubmission.id)}
                disabled={isRejecting}
              >
                {isRejecting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Rejecting...
                  </>
                ) : (
                  'Reject Submission'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
