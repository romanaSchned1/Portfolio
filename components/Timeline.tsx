'use client'

import { useEffect, useRef } from 'react'
import { projects } from '@/data/projects'

export default function Timeline() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean) as HTMLVideoElement[]

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Play when 50% of video is visible
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement
        if (entry.isIntersecting) {
          video.play().catch((error) => {
            // Autoplay was prevented, user interaction may be required
            console.log('Video autoplay prevented:', error)
          })
        } else {
          video.pause()
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    videos.forEach((video) => {
      observer.observe(video)
    })

    return () => {
      videos.forEach((video) => {
        observer.unobserve(video)
      })
    }
  }, [])

  return (
    <section id="timeline" className="timeline-section">
      <h2 className="section-title">Projects</h2>
      <div className="timeline" id="timelineContainer">
        {projects.map((project, index) => {
          const isLeft = index % 2 === 0
          const isVideo = project.pic.endsWith('.mp4')
          
          return (
            <div 
              key={index} 
              className={`timeline-item ${isLeft ? 'left' : 'right'}`}
            >
              <div className="content">
                <h3>{project.title}</h3>
                {isVideo ? (
                  <video 
                    ref={(el) => {
                      videoRefs.current[index] = el
                    }}
                    src={project.pic} 
                    muted
                    loop
                    playsInline
                    style={{width: '100%', borderRadius: '12px', margin: '1rem 0', boxShadow: '0 4px 10px rgba(0,0,0,0.2)'}}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img 
                    src={project.pic} 
                    alt={project.title}
                    style={{width: '100%', borderRadius: '12px', margin: '1rem 0', boxShadow: '0 4px 10px rgba(0,0,0,0.2)'}}
                  />
                )}
                <p>{project.description}</p>
                <p className="technologies">
                  <span className="tech-highlight">
                    {Array.isArray(project.technology) 
                      ? project.technology.join(', ') 
                      : project.technology}
                  </span>
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

