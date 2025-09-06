import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { loadState, withdraw } from '@/lib/state.js'
import { PoundSterling, Gift } from 'lucide-react'

export default function WalletPanel() {
  const [state, setState] = useState(loadState())
  useEffect(() => {
    const i = setInterval(() => setState(loadState()), 1000)
    return () => clearInterval(i)
  }, [])
  const balance = state.wallet?.balance || 0

  function handleWithdraw(method) {
    const ok = withdraw(10, method)
    setState(loadState())
    if (!ok) alert('Need at least £10 to withdraw.')
  }

  return (
    <section aria-labelledby="wallet-title" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="wallet-title" className="text-3xl font-bold text-homesnapper-teal mb-6">Your Wallet</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <PoundSterling className="text-homesnapper-teal" />
                <div>
                  <p className="text-gray-600">Current balance</p>
                  <p className="text-3xl font-bold">£{balance.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button onClick={() => handleWithdraw('Amazon Voucher')} disabled={balance < 10}>
                  <Gift className="mr-2" /> £10 Amazon
                </Button>
                <Button variant="outline" onClick={() => handleWithdraw('PayPal')} disabled={balance < 10}>PayPal £10</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <p className="font-semibold mb-2">History</p>
              <ul className="space-y-2 max-h-60 overflow-auto">
                {(state.wallet?.history || []).slice().reverse().map((h) => (
                  <li key={h.id} className="flex justify-between text-sm">
                    <span>{h.note}</span>
                    <span className={h.amount >= 0 ? 'text-emerald-600' : 'text-red-600'}>{h.amount >= 0 ? '+' : ''}£{h.amount.toFixed(2)}</span>
                  </li>
                ))}
                {(!state.wallet?.history || state.wallet.history.length === 0) && <li className="text-gray-500 text-sm">No activity yet.</li>}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

