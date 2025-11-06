document.addEventListener('DOMContentLoaded', () => {
    // Button click alert
    const clickBtn = document.getElementById('clickBtn');
    if (clickBtn) {
        clickBtn.addEventListener('click', () => {
            alert('Hello! You clicked the button.');
        });
    }

});

// Smooth scrolling for navigation
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Timeline-Projekte lokal definieren
    const projects = [
        {
            title: "Abstract Composition",
            description: "Explored aesthetics, form, and spatial balance by creating and arranging abstract 3D shapes in a digital environment. The composition focuses on the interplay of shapes and space to create a visually engaging abstract arrangement.",
            pic: "./pics/3D Portfolio/abstract_composition_Schned Romana.png",
            technology: ["Cinema4D", " Redshift", " Lighting & Rendering"]
        },
        {
            title: "Drivus Web (Carpooling Platform)",
            description: "A team-based Scrum project to develop a web application for ride-sharing. The application allows users to offer rides, search for available trips, and join carpools — all through a simple and user-friendly interface.",
            pic: "./pics/drivus.png",
            technology: ["Angular", " TypeScript", " Quarkus", " MySql", " SASS"]
        },
        {
            title: "Whisper of the Woods",
            description: "An interactive large-scale Unity game created as part of our diploma thesis for the Deep Space exhibition at the Ars Electronica Center in Linz, Austria. Players collaborate to save a magical tree by collecting energy objects and navigating projected forest platforms tracked in real space using Pharus Tracking and LiDAR sensors. Avoiding water hazards earns points, while falling reduces them. The project was showcased at the PANIC Festival 2025 in Linz.",
            pic: "./pics/MagicLake.mp4",
            technology: ["Unity", " C#", " Pharus Tracking", " LiDAR", " Cinema4D"]
        },
        {
            title: "Toad on the road",
            description: "A dynamic 3D racing journey through imaginative worlds—Candy World, Lava World, and Mario-inspired landscapes—full of obstacles, tunnels, and surprises, all leading back to the finish line.",
            pic: "./pics/3D Portfolio/toadOnTheRoad.mp4",
            technology: ["Cinema4D", " Redshift"]
        },
        {
            title: "Mix and Match",
            description: "A 3D interactive Unity game where players test their memory and reflexes by finding hidden items under shuffled cups. Correct guesses earn coins to unlock new items and cups, while wrong guesses cost lives that regenerate over time. Three difficulty levels—easy, medium, and hard—adjust cup count, item similarity, and shuffle speed, creating an engaging and dynamic challenge.",
            pic: "./pics/3D Portfolio/3DGame.png",
            technology: ["Unity", " C#"]
        }
        ,
        {
            title: "Parallax Animation",
            description: "A visually engaging parallax animation with historical physicists, creating depth and an immersive atmosphere.",
            pic: "./pics/Schned.mp4",
            technology: [" Adobe Premiere Pro", " Adobe Photoshop", " 2.5D Parallax"]
        }
    ];

    const timelineContainer = document.getElementById('timelineContainer');

    projects.forEach((project, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.classList.add('timeline-item');
        timelineItem.classList.add(index % 2 === 0 ? 'left' : 'right'); // links/rechts abwechselnd

        timelineItem.innerHTML = `
  <div class="content">
      <h3>${project.title}</h3>
      <img src="${project.pic}" alt="${project.title}">
      <p>${project.description}</p>
      <p class="technologies">
        <span class="tech-highlight"> ${project.technology} </span>
      </p>
  </div>
`;

        timelineContainer.appendChild(timelineItem);
    });
});


