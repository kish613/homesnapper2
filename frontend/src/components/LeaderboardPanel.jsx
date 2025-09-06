import { Card, CardContent } from '@/components/ui/card.jsx'

const MOCK_TOP = [
  { name: 'Alex P.', count: 18, earnings: 340 },
  { name: 'Sam R.', count: 15, earnings: 295 },
  { name: 'Lee T.', count: 12, earnings: 250 },
]

export default function LeaderboardPanel() {
  return (
    <section aria-labelledby="leader-title" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="leader-title" className="text-3xl font-bold text-homesnapper-teal mb-6">Top Spotters (This Month)</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {MOCK_TOP.map((p, i) => (
                <div key={p.name} className="grid grid-cols-12 items-center px-6 py-4">
                  <div className="col-span-1 text-2xl font-bold text-homesnapper-orange">#{i+1}</div>
                  <div className="col-span-7 md:col-span-8 font-semibold">{p.name}</div>
                  <div className="col-span-2 text-sm text-gray-600">{p.count} finds</div>
                  <div className="col-span-2 text-right font-semibold">£{p.earnings}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

