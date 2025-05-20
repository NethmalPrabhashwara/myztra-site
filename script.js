// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Loader fade out
  const loaderWrapper = document.querySelector(".loader-wrapper");
  if (loaderWrapper) {
    setTimeout(() => {
      loaderWrapper.style.opacity = "0";
      loaderWrapper.style.pointerEvents = "none";
      setTimeout(() => loaderWrapper.remove(), 500);
    }, 1500);
  }

  // Magnet effect for nav links
  const magnets = document.querySelectorAll(".magnet");
  magnets.forEach(magnet => {
    magnet.style.transition = "transform 0.3s ease";

    magnet.addEventListener("mousemove", e => {
      const rect = magnet.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      // Magnet effect strength
      const strength = 20;

      const moveX = (x / rect.width) * strength;
      const moveY = (y / rect.height) * strength;

      magnet.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    magnet.addEventListener("mouseleave", () => {
      magnet.style.transform = "translate(0, 0)";
    });
  });

  // Custom cursor
  const cursor = document.querySelector(".custom-cursor");
  if (cursor) {
    document.addEventListener("mousemove", e => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    // Enlarge cursor on magnet hover (also handled by CSS sibling selector)
    magnets.forEach(magnet => {
      magnet.addEventListener("mouseenter", () => {
        cursor.style.width = "40px";
        cursor.style.height = "40px";
        cursor.style.borderColor = "#89c9ff";
      });
      magnet.addEventListener("mouseleave", () => {
        cursor.style.width = "28px";
        cursor.style.height = "28px";
        cursor.style.borderColor = "#6cf";
      });
    });
  }

  // Audio toggle
  const audioToggle = document.getElementById("audio-toggle");
  const ambience = document.getElementById("ambience");

  if (audioToggle && ambience) {
    audioToggle.addEventListener("click", () => {
      if (ambience.paused) {
        ambience.play();
        audioToggle.textContent = "🔊";
      } else {
        ambience.pause();
        audioToggle.textContent = "🔈";
      }
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem("myztra-theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
      themeToggle.textContent = "☀️";
    } else {
      themeToggle.textContent = "🌙";
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      if (document.body.classList.contains("dark-theme")) {
        themeToggle.textContent = "☀️";
        localStorage.setItem("myztra-theme", "dark");
      } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("myztra-theme", "light");
      }
    });
  }

  // Load blog post content dynamically on post.html
  if (window.location.pathname.includes("post.html")) {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("id");
    const postContent = document.getElementById("post-content");

    const posts = {
      "1": {
        title: "Understanding the Origins of The Bloop",
        content: `
          <h2>Understanding the Origins of The Bloop</h2>
          <p>The Bloop is a mysterious ultra-low-frequency sound detected in the Pacific Ocean in 1997. Scientists have theorized that it could be linked to massive icequakes or giant sea creatures, but its true source remains unconfirmed.</p>
          <p>The sound was captured by the U.S. National Oceanic and Atmospheric Administration (NOAA) and is known for its powerful amplitude and unique frequency characteristics. It has inspired many oceanic legends and paranormal speculation.</p>
          <h3>Theories and Investigations</h3>
          <ul>
            <li><strong>Icequake Hypothesis:</strong> Many researchers believe the sound originated from the cracking and fracturing of Antarctic icebergs.</li>
            <li><strong>Marine Animal Theory:</strong> Some have speculated the sound could come from unknown large marine animals.</li>
            <li><strong>Underwater Volcanic Activity:</strong> Volcanic activity underwater might also generate such sounds.</li>
          </ul>
          <p>Despite extensive studies, no conclusive evidence has pinpointed the exact cause, keeping The Bloop shrouded in mystery.</p>
        `
      },
      "2": {
        title: "Top 5 Unsolved Paranormal Mysteries",
        content: `
          <h2>Top 5 Unsolved Paranormal Mysteries</h2>
          <p>Paranormal phenomena continue to fascinate and perplex. Here are five of the most enduring mysteries that remain unsolved:</p>
          <ol>
            <li><strong>The Dyatlov Pass Incident:</strong> The mysterious deaths of nine hikers in the Ural Mountains under strange and unexplained circumstances.</li>
            <li><strong>The Taos Hum:</strong> A low-frequency humming noise heard by residents of Taos, New Mexico, with no identified source.</li>
            <li><strong>The Mothman:</strong> Sightings of a winged creature in Point Pleasant, West Virginia, often linked to impending disasters.</li>
            <li><strong>The Skinwalker Ranch:</strong> A location in Utah reputed for paranormal activity and UFO sightings.</li>
            <li><strong>The Bell Witch:</strong> A poltergeist legend from Tennessee involving a haunting in the early 1800s.</li>
          </ol>
          <p>These mysteries inspire ongoing investigations and countless theories but remain officially unresolved.</p>
        `
      },
      "3": {
        title: "Conspiracy Theories That Turned Out to Be True",
        content: `
          <h2>Conspiracy Theories That Turned Out to Be True</h2>
          <p>Not all conspiracy theories are baseless. Some have been confirmed over time by evidence and official disclosures:</p>
          <ul>
            <li><strong>MK-Ultra:</strong> The CIA's secret mind control experiments conducted on unwitting subjects.</li>
            <li><strong>COINTELPRO:</strong> FBI surveillance and infiltration of political groups.</li>
            <li><strong>Watergate:</strong> The Nixon administration’s illegal activities and cover-ups.</li>
            <li><strong>Operation Northwoods:</strong> Proposed false flag operations to justify military actions.</li>
          </ul>
          <p>These cases reveal how some conspiracies can stem from real covert operations and government secrets.</p>
        `
      }
    };

    if (postId && posts[postId]) {
      postContent.innerHTML = posts[postId].content;
      document.title = `Myztra | ${posts[postId].title}`;
    } else {
      postContent.innerHTML = "<h2>Post Not Found</h2><p>Sorry, the post you are looking for does not exist.</p>";
    }
  }
});
