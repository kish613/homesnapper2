import { useEffect, useMemo, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { loadState, ensureReferralCode, saveState } from '@/lib/state.js'
import { Users } from 'lucide-react'

export default function ReferralsPanel() {
  const [state, setState] = useState(() => ensureReferralCode(loadState()))
  useEffect(() => { saveState(state) }, [state])
  const link = useMemo(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('ref', state.referrals?.code)
    return url.toString()
  }, [state.referrals?.code])

  function copy() {
    navigator.clipboard.writeText(link)
  }

  return (
    <section aria-labelledby="referrals-title" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="referrals-title" className="text-3xl font-bold text-homesnapper-teal mb-6">Invite & Earn</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Users className="text-homesnapper-teal" />
                <div>
                  <p className="font-semibold">Share your link</p>
                  <p className="text-sm text-gray-600">You both get £2 when your friend submits their first valid property.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <input readOnly value={link} className="flex-1 md:w-96 border rounded px-3 py-2 text-sm" aria-label="Referral link" />
                <Button onClick={copy}>Copy</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

