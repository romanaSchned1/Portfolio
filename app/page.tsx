'use client'

import { useEffect } from 'react'
import Navigation from '@/components/Navigation'
import About from '@/components/About'
import Work from '@/components/Work'
import Timeline from '@/components/Timeline'
import Contact from '@/components/Contact'

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for navigation
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.hash) {
        e.preventDefault()
        const element = document.querySelector(target.hash)
        if (element) {
          window.scrollTo({
            top: (element as HTMLElement).offsetTop - 70,
            behavior: 'smooth'
          })
        }
      }
    }

    const navLinks = document.querySelectorAll('.nav-links a')
    navLinks.forEach(link => {
      (link as HTMLElement).addEventListener('click', handleNavClick)
    })

    return () => {
      navLinks.forEach(link => {
        (link as HTMLElement).removeEventListener('click', handleNavClick)
      })
    }
  }, [])

  return (
    <main>
      <Navigation />
      <About />
      <Timeline />
      <Work />
      <Contact />
    </main>
  )
}

