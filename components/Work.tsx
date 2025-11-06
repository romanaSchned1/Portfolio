export default function Work() {
  const images = [
    "/pics/bildercollage/IMG_8148.jpeg",
    "/pics/bildercollage/IMG_5536.jpeg",
    "/pics/bildercollage/IMG_6462.jpeg",
    "/pics/bildercollage/IMG_8411.jpeg",
    "/pics/bildercollage/IMG_2230.jpeg",
    "/pics/bildercollage/IMG_3211.jpeg",
    "/pics/bildercollage/IMG_4933.jpeg",
    "/pics/bildercollage/IMG_7783.jpeg",
    "/pics/bildercollage/IMG_1265.jpeg",
    "/pics/bildercollage/IMG_1406.jpeg",
    "/pics/bildercollage/IMG_0332.JPEG",
    "/pics/bildercollage/IMG_7326.jpeg",
    "/pics/bildercollage/IMG_9637.jpeg",
    "/pics/bildercollage/IMG_1395.jpeg",
    "/pics/bildercollage/IMG_2261.jpeg",
    "/pics/bildercollage/DSC_0293.jpg",
    "/pics/bildercollage/DSC_0405.jpg",
    "/pics/bildercollage/DSC_0534.jpg",
    "/pics/bildercollage/DSC_0163.jpg",
    "/pics/bildercollage/DSC_9952.JPG"
  ]

  return (
    <section id="work">
      <h2 className="section-title">Photo Collage</h2>
      <div className="projects-grid">
        {images.map((image, index) => {
          const fileName = image.split('/').pop()?.replace(/\.[^/.]+$/, '') || `Image ${index + 1}`
          return (
            <div key={index} className="project-card">
              <img 
                src={image} 
                alt={fileName}
                style={{width: '100%', height: '300px', objectFit: 'cover'}}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

