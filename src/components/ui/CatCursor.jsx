import { useEffect } from 'react';

export default function CatCursor() {
  useEffect(() => {
    if (document.getElementById('oneko-cat')) return;

    const catEl = document.createElement('div');
    catEl.id = 'oneko-cat';
    catEl.style.width = '32px';
    catEl.style.height = '32px';
    catEl.style.position = 'fixed';
    catEl.style.pointerEvents = 'none';
    catEl.style.backgroundImage = "url('/oneko.gif')";
    catEl.style.imageRendering = 'pixelated';
    catEl.style.zIndex = '9999';
    document.body.appendChild(catEl);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let frameCount = 0;
    
    // Easing positions
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;

    let catState = "idle";
    let stateFrame = 0;
    let speed = 10; // Classic 10px speed step

    let spriteSets = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
      scratchWallN: [[0, 0], [0, 1]],
      scratchWallS: [[-7, -1], [-6, -2]],
      scratchWallE: [[-2, -2], [-2, -3]],
      scratchWallW: [[-4, 0], [-4, -1]],
      tired: [[-3, -2]],
      sleeping: [[-2, 0], [-2, -1]],
      N: [[-1, -2], [-1, -3]],
      NE: [[0, -2], [0, -3]],
      E: [[-3, 0], [-3, -1]],
      SE: [[-5, -1], [-5, -2]],
      S: [[-6, -3], [-7, -2]],
      SW: [[-5, -3], [-6, -1]],
      W: [[-4, -2], [-4, -3]],
      NW: [[-1, 0], [-1, -1]],
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Scroll listener for mobile
    let targetScrollX = 16;
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      const clampedPercent = Math.min(Math.max(0, scrollPercent), 1);
      
      // Calculate target horizontal position
      const minX = 16;
      const maxX = window.innerWidth - 24;
      targetScrollX = minX + (maxX - minX) * clampedPercent;
    };

    function init() {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (isMobile) {
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // init position
        currentX = targetScrollX;
        catEl.style.bottom = '16px';
        catEl.style.top = 'auto';
      } else {
        document.addEventListener("mousemove", handleMouseMove);
        // Start cat at center of screen
        currentX = window.innerWidth / 2;
        currentY = window.innerHeight / 2;
        mouseX = currentX;
        mouseY = currentY;
        catEl.style.top = `${currentY - 16}px`;
      }
      window.requestAnimationFrame(frame);
    }

    let lastSpriteUpdateTimestamp = 0;

    function frame(timestamp) {
      if (!document.getElementById('oneko-cat')) return; // Stop animation loop if unmounted
      
      window.requestAnimationFrame(frame);
      if (!lastSpriteUpdateTimestamp) lastSpriteUpdateTimestamp = timestamp;

      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      // Calculate sprite tick (10 FPS)
      const shouldTickSprite = (timestamp - lastSpriteUpdateTimestamp >= 100);
      if (shouldTickSprite) {
        lastSpriteUpdateTimestamp = timestamp;
        stateFrame++;
      }

      if (isMobile) {
        // Mobile behavior: Follow scroll X smoothly (60 FPS position updates)
        let dx = targetScrollX - currentX;
        let absDx = Math.abs(dx);

        // Check if we should wake up
        if (absDx > 1.0 && catState !== "chasing" && catState !== "alert") {
          catState = "alert";
          stateFrame = 0;
        }

        if (catState === "alert") {
          setSprite("alert", 0);
          if (shouldTickSprite && stateFrame >= 3) {
            catState = "chasing";
            stateFrame = 0;
          }
        } else if (catState === "chasing") {
          // Responsive velocity easing
          let step = dx * 0.1;
          const maxSpeed = 10;
          if (Math.abs(step) > maxSpeed) {
            step = Math.sign(step) * maxSpeed;
          }
          currentX += step;

          // Animating the sprite legs at ~10 FPS
          if (shouldTickSprite) {
            frameCount++;
            const direction = dx > 0 ? "E" : "W";
            setSprite(direction, frameCount);
          }

          if (Math.abs(targetScrollX - currentX) <= 1.0) {
            currentX = targetScrollX;
            catState = "idle";
            stateFrame = 0;
          }
        } else {
          // Stopped (Idle) - snap exactly to target
          currentX = targetScrollX;

          // Idle animations cycle at 10 FPS
          if (shouldTickSprite) {
            if (catState === "idle") {
              setSprite("idle", 0);
              if (stateFrame >= 10) {
                // Determine next idle action
                if (Math.random() < 0.5) {
                  catState = "scratchSelf";
                } else {
                  catState = "tired";
                }
                stateFrame = 0;
              }
            } else if (catState === "scratchSelf") {
              setSprite("scratchSelf", stateFrame);
              if (stateFrame >= 10) {
                catState = "tired";
                stateFrame = 0;
              }
            } else if (catState === "tired") {
              setSprite("tired", 0);
              if (stateFrame >= 4) {
                catState = "sleeping";
                stateFrame = 0;
              }
            } else if (catState === "sleeping") {
              setSprite("sleeping", Math.floor(stateFrame / 4));
            }
          }
        }
        
        catEl.style.left = `${currentX - 16}px`;
      } else {
        // Desktop behavior: Classic constant-speed chase at 10 FPS
        if (!shouldTickSprite) return;

        let dx = mouseX - currentX;
        let dy = mouseY - currentY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Check if we should wake up
        if (distance >= 48 && catState !== "chasing" && catState !== "alert") {
          catState = "alert";
          stateFrame = 0;
        }

        if (catState === "alert") {
          setSprite("alert", 0);
          if (stateFrame >= 3) {
            catState = "chasing";
            stateFrame = 0;
          }
        } else if (catState === "chasing") {
          if (distance < 48) {
            catState = "idle";
            stateFrame = 0;
            setSprite("idle", 0);
          } else {
            // Running towards cursor at constant speed
            currentX += (dx / distance) * speed;
            currentY += (dy / distance) * speed;

            // Clamp values
            currentX = Math.min(Math.max(16, currentX), window.innerWidth - 16);
            currentY = Math.min(Math.max(16, currentY), window.innerHeight - 16);

            // Determine direction
            let direction = "";
            let xDiff = currentX - mouseX;
            let yDiff = currentY - mouseY;

            if (yDiff / distance > 0.5) direction = "N";
            else if (yDiff / distance < -0.5) direction = "S";

            if (xDiff / distance > 0.5) direction += "W";
            else if (xDiff / distance < -0.5) direction += "E";

            frameCount++;
            setSprite(direction || "E", frameCount);

            catEl.style.left = `${currentX - 16}px`;
            catEl.style.top = `${currentY - 16}px`;
            catEl.style.bottom = 'auto'; // ensure top-based position on desktop
          }
        } else {
          // Idle states
          if (catState === "idle") {
            setSprite("idle", 0);
            if (stateFrame >= 10) {
              // Determine next idle action
              let availableIdleAnimations = ["sleeping", "scratchSelf"];
              if (currentX < 32) availableIdleAnimations.push("scratchWallW");
              if (currentY < 32) availableIdleAnimations.push("scratchWallN");
              if (currentX > window.innerWidth - 32) availableIdleAnimations.push("scratchWallE");
              if (currentY > window.innerHeight - 32) availableIdleAnimations.push("scratchWallS");
              
              let selected = availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)];
              if (selected === "sleeping") {
                catState = "tired"; // yawn first
              } else {
                catState = selected;
              }
              stateFrame = 0;
            }
          } else if (catState === "scratchSelf") {
            setSprite("scratchSelf", stateFrame);
            if (stateFrame >= 10) {
              catState = "tired";
              stateFrame = 0;
            }
          } else if (catState.startsWith("scratchWall")) {
            setSprite(catState, stateFrame);
            if (stateFrame >= 10) {
              catState = "tired";
              stateFrame = 0;
            }
          } else if (catState === "tired") {
            setSprite("tired", 0);
            if (stateFrame >= 4) {
              catState = "sleeping";
              stateFrame = 0;
            }
          } else if (catState === "sleeping") {
            setSprite("sleeping", Math.floor(stateFrame / 4));
          }
        }
      }
    }

    function setSprite(name, frame) {
      const sprite = spriteSets[name][frame % spriteSets[name].length];
      catEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    init();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      const el = document.getElementById('oneko-cat');
      if (el) el.remove();
    };
  }, []);

  return null;
}
