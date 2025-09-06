import { Card, CardContent } from '@/components/ui/card.jsx'

const BOUNTIES = [
  { area: 'Brixton SW9', multiplier: 2.0, notes: 'High demand for empties' },
  { area: 'Leeds LS11', multiplier: 1.5, notes: 'Derelict terraces focus' },
  { area: 'Manchester M14', multiplier: 1.8, notes: 'Student areas in summer' },
]

export default function BountiesPanel() {
  return (
    <section aria-labelledby="bounty-title" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="bounty-title" className="text-3xl font-bold text-homesnapper-teal mb-6">Coverage & Bounties</h2>
        <p className="text-gray-600 mb-4">Earn more in hot zones. Submissions from these areas pay a multiplier.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {BOUNTIES.map((b) => (
            <Card key={b.area}>
              <CardContent className="p-5">
                <div className="flex items-baseline justify-between">
                  <p className="font-semibold">{b.area}</p>
                  <span className="text-homesnapper-orange font-bold">×{b.multiplier.toFixed(1)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{b.notes}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

