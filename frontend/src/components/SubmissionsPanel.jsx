import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { loadState, advanceSubmission, Status } from '@/lib/state.js'
import { ChevronRight, Eye } from 'lucide-react'

function Timeline({ history }) {
  return (
    <ol className="relative border-l pl-4">
      {history.map((h, idx) => (
        <li key={idx} className="mb-3">
          <div className="absolute -left-[6px] top-1 size-3 rounded-full bg-homesnapper-orange" />
          <p className="text-sm font-medium">{h.status}</p>
          <p className="text-xs text-gray-500">{new Date(h.at).toLocaleString()}</p>
        </li>
      ))}
    </ol>
  )
}

export default function SubmissionsPanel() {
  const [state, setState] = useState(loadState())
  useEffect(() => {
    const i = setInterval(() => setState(loadState()), 1500)
    return () => clearInterval(i)
  }, [])

  function simulateProgress(id, current) {
    if (current === Status.RECEIVED) advanceSubmission(id, Status.IN_REVIEW)
    else if (current === Status.IN_REVIEW) advanceSubmission(id, Status.CONTACTED)
    else if (current === Status.CONTACTED) advanceSubmission(id, Status.CLOSED)
    setState(loadState())
  }

  const subs = state.submissions || []

  return (
    <section aria-labelledby="subs-title" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="subs-title" className="text-3xl font-bold text-homesnapper-teal mb-6">Track Your Submissions</h2>
        {subs.length === 0 && <p className="text-gray-600">No submissions yet. Start by submitting a property.</p>}
        <div className="grid md:grid-cols-2 gap-6">
          {subs.map((s) => (
            <Card key={s.id}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{s.address}</p>
                    <p className="text-xs text-gray-500">Submitted {new Date(s.createdAt).toLocaleString()}</p>
                  </div>
                  <span className="text-sm px-2 py-1 rounded bg-gray-100">{s.status}</span>
                </div>
                <div className="mt-3">
                  <Timeline history={s.history} />
                </div>
                <div className="flex justify-end mt-3">
                  <Button size="sm" variant="outline" onClick={() => simulateProgress(s.id, s.status)}>Advance Status</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

