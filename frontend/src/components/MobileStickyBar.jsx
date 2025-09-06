import { Button } from '@/components/ui/button.jsx'
import { Camera, Info } from 'lucide-react'

export default function MobileStickyBar({ onSubmitClick }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur border-t shadow-lg md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-3">
        <Button className="w-full" style={{ backgroundColor: 'var(--homesnapper-orange)', color: 'white' }} onClick={onSubmitClick}>
          <Camera className="mr-2" /> Snap & Submit
        </Button>
        <a href="#how-it-works" className="w-full">
          <Button className="w-full" variant="outline">
            <Info className="mr-2" /> How it works
          </Button>
        </a>
      </div>
    </div>
  )
}
