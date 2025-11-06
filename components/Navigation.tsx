'use client'

import { useEffect, useState } from 'react'

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('about')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const sections = ['about', 'timeline', 'work', 'contact']
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150 // Offset for fixed nav
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Check if we're near the bottom of the page (for contact section)
      const isNearBottom = scrollPosition + windowHeight >= documentHeight - 100
      
      if (isNearBottom) {
        const contactSection = document.getElementById('contact')
        if (contactSection) {
          setActiveSection('contact')
          return
        }
      }
      
      // Otherwise, check sections from bottom to top
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          // Check if section is in viewport or we've scrolled past its start
          if (scrollPosition >= sectionTop - 100) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (sections.includes(hash)) {
        setActiveSection(hash)
        // Also trigger scroll handler after a short delay to ensure correct state
        setTimeout(handleScroll, 100)
      }
    }

    // Check initial position and hash
    handleScroll()
    handleHashChange()
    
    const scrollHandler = handleScroll
    window.addEventListener('scroll', scrollHandler, { passive: true })
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('scroll', scrollHandler)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="site-nav">
      <div className={`nav-container ${isMenuOpen ? 'menu-open' : ''}`}>
        <h1 className="brand">Romana Schned</h1>
        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        {isMenuOpen && (
          <div 
            className="menu-overlay"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={handleLinkClick}>About</a></li>
          <li><a href="#timeline" className={activeSection === 'timeline' ? 'active' : ''} onClick={handleLinkClick}>Projects</a></li>
          <li><a href="#work" className={activeSection === 'work' ? 'active' : ''} onClick={handleLinkClick}>Photo Collage</a></li>
          <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={handleLinkClick}>Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

