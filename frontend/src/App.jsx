import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Camera, MapPin, Gift, PoundSterling, Users, Star, ChevronRight, Award, Eye, Home } from 'lucide-react'
import homesnapperLogo from './assets/homesnapper-logo.png'
import './App.css'

function App() {
  const colors = {
    teal: '#1E6A81',
    orange: '#F98D29',
    gold: '#F2C23E',
    darkGrey: '#2D3748',
    lightGrey: '#F7FAFC',
    white: '#FFFFFF'
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav 
        className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
        style={{ borderBottomColor: colors.teal }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <img src={homesnapperLogo} alt="HomeSnapper" className="h-16 w-auto" />
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-600">Spot. Snap. Earn.</p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-2">
                <div className="relative group">
                  <a
                    href="#how-it-works"
                    className="px-3 py-2 text-lg font-semibold text-homesnapper-teal transition-colors"
                  >
                    How It Works
                  </a>
                  <span className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] bg-gradient-to-r from-homesnapper-teal to-homesnapper-orange scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </div>
                <div className="relative group">
                  <a
                    href="#reviews"
                    className="px-3 py-2 text-lg font-semibold text-homesnapper-teal transition-colors"
                  >
                    Reviews
                  </a>
                  <span className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] bg-gradient-to-r from-homesnapper-teal to-homesnapper-orange scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </div>
                <div className="relative group">
                  <a
                    href="#faq"
                    className="px-3 py-2 text-lg font-semibold text-homesnapper-teal transition-colors"
                  >
                    FAQ
                  </a>
                  <span className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] bg-gradient-to-r from-homesnapper-teal to-homesnapper-orange scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </div>
                <Button
                  className="ml-3 px-5 py-2 rounded-full font-semibold text-white shadow-sm hover:opacity-95 transition"
                  style={{ backgroundColor: colors.orange }}
                >
                  Submit Property
                </Button>
              </div>
            </div>
            <div className="md:hidden">
              <Button className="px-4 py-2 rounded-full font-semibold text-white" style={{ backgroundColor: colors.orange }}>
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div className="h-[3px] bg-gradient-to-r from-homesnapper-teal via-homesnapper-gold to-homesnapper-orange" />
      </nav>

      {/* Hero Section - Clean and Professional */}
      <section className="relative py-20 lg:py-32 overflow-hidden" 
               style={{background: `linear-gradient(135deg, ${colors.teal} 0%, #2563eb 100%)`}}>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content */}
            <div className="text-white">
              
              {/* Trust Badge */}
              <div className="inline-block mb-6">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                  <span className="text-white font-semibold">
                    Since 2024, we've paid our spotters over £1,250,000
                  </span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="block">That empty house</span>
                <span className="block">you walk past?</span>
                <span className="block font-black" style={{color: colors.gold}}>
                  It could be worth thousands.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl font-medium text-white/90 mb-8 leading-relaxed">
                Spot a derelict or empty property, and we'll give you a{' '}
                <span className="font-bold" style={{color: colors.gold}}>£50 Amazon voucher</span>{' '}
                and up to{' '}
                <span className="font-bold" style={{color: colors.gold}}>£2,000</span>{' '}
                if we buy and sell it.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="text-lg font-semibold px-8 py-4 rounded-lg text-white hover:opacity-90 transition-opacity shadow-lg" 
                        style={{backgroundColor: colors.orange}}>
                  <Camera className="mr-2 h-5 w-5" />
                  Submit a Property Now
                </Button>
                
                <Button className="text-lg font-semibold px-8 py-4 rounded-lg border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-colors" 
                        style={{backgroundColor: 'transparent'}}>
                  <Eye className="mr-2 h-5 w-5" />
                  Learn How It Works
                </Button>
              </div>
            </div>

            {/* Right Column - Benefit Cards */}
            <div className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full" style={{backgroundColor: colors.orange}}>
                      <Gift className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Instant Reward</h3>
                      <p className="text-white/80">£50 Amazon Voucher</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full" style={{backgroundColor: colors.gold}}>
                      <PoundSterling className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Sale Commission</h3>
                      <p className="text-white/80">Up to £2,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full" style={{backgroundColor: colors.teal}}>
                      <Home className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Community Impact</h3>
                      <p className="text-white/80">Help revitalize neighborhoods</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Clean and Clear */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{color: colors.teal}}>
              How It Works
            </h2>
            <div className="w-24 h-1 mx-auto mb-6 rounded-full" style={{backgroundColor: colors.orange}}></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to turn your keen eye into cash rewards
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-lg" 
                     style={{backgroundColor: colors.teal}}>
                  <MapPin className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" 
                     style={{backgroundColor: colors.orange}}>
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{color: colors.teal}}>
                Spot
              </h3>
              <p className="text-gray-600 leading-relaxed">
                You spot an empty or derelict property while walking around your neighborhood.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-lg" 
                     style={{backgroundColor: colors.orange}}>
                  <Camera className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" 
                     style={{backgroundColor: colors.teal}}>
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{color: colors.orange}}>
                Snap
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Take a photo, get the address, and submit it through our simple form.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-lg" 
                     style={{backgroundColor: colors.gold}}>
                  <Award className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" 
                     style={{backgroundColor: colors.orange}}>
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{color: colors.gold}}>
                Earn
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Receive a £50 voucher if our criteria are met, and up to £2,000 when the property sells.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="text-lg font-semibold px-8 py-4 rounded-lg text-white hover:opacity-90 transition-opacity shadow-lg" 
                    style={{backgroundColor: colors.orange}}>
              Start Spotting Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{color: colors.teal}}>
              Join Thousands of Successful Spotters
            </h2>
            <p className="text-xl text-gray-600">
              Real people earning real money by spotting empty properties
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" style={{color: colors.gold}} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "I spotted a derelict house on my morning walk and earned £1,750 when HomeSnapper successfully 
                  purchased and renovated it. The process was transparent and professional throughout."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" 
                       style={{backgroundColor: colors.teal}}>
                    S
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold" style={{color: colors.teal}}>Sarah M.</p>
                    <p className="text-gray-500">Manchester</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" style={{color: colors.gold}} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "The £50 voucher came through within days of my submission being approved. Three months later, 
                  I received another £2,000 when the property sold. Incredible!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" 
                       style={{backgroundColor: colors.orange}}>
                    J
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold" style={{color: colors.teal}}>James K.</p>
                    <p className="text-gray-500">Birmingham</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" style={{color: colors.gold}} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "I love that I'm helping to revitalize my community while earning money. The dashboard shows me 
                  exactly where my submissions are in the process."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" 
                       style={{backgroundColor: colors.gold}}>
                    M
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold" style={{color: colors.teal}}>Maria L.</p>
                    <p className="text-gray-500">London</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 text-white relative overflow-hidden" 
               style={{background: `linear-gradient(135deg, ${colors.teal} 0%, ${colors.orange} 100%)`}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Turn Your Daily Walks Into Cash?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of spotters who are already earning rewards and helping revitalize 
            communities across the UK.
          </p>
          <Button className="text-xl font-semibold px-10 py-5 rounded-lg bg-white hover:bg-gray-100 transition-colors shadow-lg" 
                  style={{color: colors.teal}}>
            <Camera className="mr-3 h-6 w-6" />
            Submit Your First Property
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <img src={homesnapperLogo} alt="HomeSnapper" className="h-12 w-auto mb-4 filter brightness-0 invert" />
              <p className="text-gray-400 leading-relaxed">
                Connecting property spotters with opportunities to earn rewards while revitalizing communities.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">How It Works</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Submit a Property</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Your Submissions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Earn Rewards</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 HomeSnapper. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

