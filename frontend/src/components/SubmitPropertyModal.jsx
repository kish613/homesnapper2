import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { MapPin, Camera, Shield, CheckCircle2 } from 'lucide-react'
import { addSubmission, isDuplicateAddress, loadState, saveState } from '@/lib/state.js'

export default function SubmitPropertyModal({ open, onOpenChange, onSubmitted }) {
  const [step, setStep] = useState(1)
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [coords, setCoords] = useState(null)
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')
  const [dup, setDup] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) {
      navigator.geolocation?.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {},
        { enableHighAccuracy: false, timeout: 3000 }
      )
    }
  }, [open])

  useEffect(() => {
    const state = loadState()
    setDup(isDuplicateAddress(state, address))
  }, [address])

  function reset() {
    setStep(1)
    setAddress('')
    setNotes('')
    setImageFile(null)
    setCoords(null)
    setAgree(false)
    setError('')
    setDup(false)
    setSaving(false)
  }

  function close() {
    onOpenChange?.(false)
    setTimeout(reset, 200)
  }

  function next() {
    setError('')
    if (step === 1) {
      if (!imageFile) return setError('Please add at least one photo.')
      setStep(2)
    } else if (step === 2) {
      if (!address.trim()) return setError('Please enter the property address.')
      setStep(3)
    } else if (step === 3) {
      if (!agree) return setError('Please confirm the safety & compliance notice.')
      handleSubmit()
    }
  }

  async function handleSubmit() {
    setSaving(true)
    try {
      const sub = addSubmission({ address, notes, imageName: imageFile?.name || null, coords })
      onSubmitted?.(sub)
      close()
    } catch (e) {
      setError('Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => v === false && close()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Submit a Property</DialogTitle>
          <DialogDescription>Spot. Snap. Earn. Takes under a minute.</DialogDescription>
        </DialogHeader>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-4" aria-label="Submission steps">
          {[1,2,3].map((s) => (
            <div key={s} className="flex-1 flex items-center">
              <div className={`size-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${step >= s ? 'bg-homesnapper-teal' : 'bg-gray-300'}`}>{s}</div>
              {s < 3 && <div className={`h-1 flex-1 mx-2 ${step > s ? 'bg-homesnapper-orange' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <Label htmlFor="photo" className="sr-only">Photo</Label>
            <Card className="mb-3">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Camera className="text-homesnapper-teal" />
                  <div>
                    <p className="font-semibold">Add a photo</p>
                    <p className="text-sm text-gray-500">On mobile, you can open the camera.</p>
                  </div>
                </div>
                <Input id="photo" type="file" accept="image/*" capture="environment" className="mt-3" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                {imageFile && <p className="text-sm mt-2">Selected: {imageFile.name}</p>}
              </CardContent>
            </Card>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="size-4" />
              {coords ? <span>Location captured • {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</span> : <span>Capturing your location…</span>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="123 Example St, City" value={address} onChange={(e) => setAddress(e.target.value)} aria-invalid={dup} />
            {dup && <p className="text-sm text-red-600 mt-1">This address was already submitted.</p>}
            <Label htmlFor="notes" className="mt-4">Notes (optional)</Label>
            <Textarea id="notes" placeholder="Any details that help verify it’s empty/derelict" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="flex items-center gap-3 p-3 rounded-md bg-gray-50 border">
              <Shield className="text-homesnapper-teal" />
              <div>
                <p className="font-semibold">Safety & Compliance</p>
                <ul className="text-sm text-gray-600 list-disc pl-4">
                  <li>Do not trespass or enter private property.</li>
                  <li>Take photos from public areas only.</li>
                  <li>No faces or number plates in frame where possible.</li>
                </ul>
              </div>
            </div>
            <label className="flex items-center gap-2 mt-3 text-sm">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
              I understand and agree.
            </label>
          </div>
        )}

        {error && <p role="alert" className="text-red-600 text-sm">{error}</p>}

        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={close}>Cancel</Button>
          <Button onClick={next} disabled={saving}>
            {step < 3 ? 'Next' : (saving ? 'Submitting…' : 'Submit')}
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-3 flex items-center gap-1"><CheckCircle2 className="size-3" /> Your upload includes timestamp and (if permitted) GPS for verification.</p>
      </DialogContent>
    </Dialog>
  )
}

