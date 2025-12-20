# GSAP Animation Guidelines for Benders Agency

This steering file provides comprehensive guidance for creating award-winning GSAP animations in this Next.js project.

## Installation & Setup

GSAP is already installed in this project. Always import what you need:

```typescript
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register plugins once (typically in useEffect or at component level)
gsap.registerPlugin(ScrollTrigger)
```

## Core Animation Methods

### gsap.to() - Animate TO values
```typescript
// Basic tween
gsap.to(".element", {
  x: 100,
  opacity: 1,
  duration: 1,
  ease: "power3.out"
})

// With callbacks
gsap.to(".element", {
  x: 100,
  duration: 1,
  onStart: () => console.log("started"),
  onComplete: () => console.log("done"),
  onUpdate: () => console.log("updating")
})
```

### gsap.from() - Animate FROM values
```typescript
gsap.from(".element", {
  y: 100,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out"
})
```

### gsap.fromTo() - Define both start and end
```typescript
gsap.fromTo(".element",
  { opacity: 0, y: 50 },  // from
  { opacity: 1, y: 0, duration: 1 }  // to
)
```

### gsap.set() - Instant property setting (no animation)
```typescript
gsap.set(".element", { opacity: 0, y: 100 })
```

## Timelines - Sequencing Animations

Timelines are essential for complex, coordinated animations:

```typescript
const tl = gsap.timeline({
  defaults: { duration: 0.8, ease: "power3.out" }
})

tl.to(".title", { y: 0, opacity: 1 })
  .to(".subtitle", { y: 0, opacity: 1 }, "-=0.4")  // overlap by 0.4s
  .to(".button", { scale: 1, opacity: 1 }, "<")    // start at same time as previous
  .to(".image", { clipPath: "inset(0%)" }, "+=0.2") // 0.2s after previous ends
```

### Position Parameters
- `"-=0.5"` - Start 0.5s before previous ends (overlap)
- `"+=0.5"` - Start 0.5s after previous ends (gap)
- `"<"` - Start at same time as previous
- `"<0.5"` - Start 0.5s after previous starts
- `2` - Start at absolute time 2s

## React Integration with useGSAP

**ALWAYS use useGSAP hook in React components** for proper cleanup:

```typescript
import { useGSAP } from "@gsap/react"

const MyComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // All GSAP code here is automatically cleaned up
    gsap.to(".element", { x: 100 })
    
    // ScrollTriggers are also cleaned up
    ScrollTrigger.create({
      trigger: ".section",
      start: "top center",
      onEnter: () => console.log("entered")
    })
  }, { 
    scope: containerRef,  // Scope selectors to this container
    dependencies: []      // Re-run when these change
  })

  return <div ref={containerRef}>...</div>
}
```

## gsap.context() - Manual Cleanup

For non-hook scenarios or complex setups:

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(".box", { x: 100 })
    ScrollTrigger.create({ ... })
  }, containerRef) // scope

  return () => ctx.revert() // cleanup all animations
}, [])
```

## gsap.matchMedia() - Responsive Animations

Create different animations for different screen sizes:

```typescript
useGSAP(() => {
  const mm = gsap.matchMedia()

  mm.add("(min-width: 1024px)", () => {
    // Desktop animations
    gsap.to(".hero", { x: 200, duration: 1 })
  })

  mm.add("(max-width: 1023px)", () => {
    // Mobile/tablet animations
    gsap.to(".hero", { y: 100, duration: 0.8 })
  })

  // Cleanup is automatic with useGSAP
}, { scope: containerRef })
```

## ScrollTrigger - Scroll-Based Animations

### Basic ScrollTrigger
```typescript
gsap.to(".element", {
  y: -100,
  scrollTrigger: {
    trigger: ".element",
    start: "top 80%",      // trigger top hits viewport 80%
    end: "bottom 20%",     // trigger bottom hits viewport 20%
    scrub: true,           // link animation to scroll position
    markers: true,         // debug markers (remove in production)
  }
})
```

### Scrub Options
- `scrub: true` - Instant scrub
- `scrub: 0.5` - 0.5s smoothing delay
- `scrub: 1` - 1s smoothing (smoother feel)

### Toggle Actions
```typescript
scrollTrigger: {
  toggleActions: "play pause resume reset"
  // onEnter onLeave onEnterBack onLeaveBack
}
```

Common patterns:
- `"play none none reverse"` - Play on enter, reverse on leave back
- `"play pause resume reset"` - Full control
- `"restart none none none"` - Restart every time

### Pinning Sections
```typescript
ScrollTrigger.create({
  trigger: ".section",
  start: "top top",
  end: "+=1000",           // pin for 1000px of scroll
  pin: true,
  pinSpacing: true,        // add space for pinned section
  anticipatePin: 1,        // reduce jank
})
```

### Batch Animations (Staggered reveals)
```typescript
ScrollTrigger.batch(".card", {
  onEnter: (elements) => {
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out"
    })
  },
  start: "top 85%"
})
```

## Performance Optimizations

### gsap.quickSetter() - High-frequency updates
For mousemove, scroll, or RAF loops:

```typescript
const xSetter = gsap.quickSetter(".cursor", "x", "px")
const ySetter = gsap.quickSetter(".cursor", "y", "px")

const handleMouseMove = (e: MouseEvent) => {
  xSetter(e.clientX)
  ySetter(e.clientY)
}
```

### gsap.quickTo() - Smooth interpolated updates
```typescript
const xTo = gsap.quickTo(".cursor", "x", { duration: 0.3, ease: "power3.out" })
const yTo = gsap.quickTo(".cursor", "y", { duration: 0.3, ease: "power3.out" })

const handleMouseMove = (e: MouseEvent) => {
  xTo(e.clientX)
  yTo(e.clientY)
}
```

### Will-Change & Force3D
```typescript
gsap.to(".element", {
  x: 100,
  force3D: true,  // Use 3D transforms for GPU acceleration
  willChange: "transform"  // Hint to browser
})
```

## Utility Functions

### gsap.utils.clamp()
```typescript
const clampedValue = gsap.utils.clamp(0, 100, value) // Keep between 0-100
```

### gsap.utils.mapRange()
```typescript
// Map scroll position (0-1000) to rotation (0-360)
const rotation = gsap.utils.mapRange(0, 1000, 0, 360, scrollY)
```

### gsap.utils.interpolate()
```typescript
const color = gsap.utils.interpolate("#ff0000", "#0000ff", 0.5) // Returns purple
```

### gsap.utils.wrap()
```typescript
const colors = ["red", "green", "blue"]
const getColor = gsap.utils.wrap(colors)
getColor(0) // "red"
getColor(3) // "red" (wraps around)
```

### gsap.utils.toArray()
```typescript
const elements = gsap.utils.toArray(".card") // Convert NodeList to Array
```

## Premium Animation Patterns

### Staggered Reveal
```typescript
gsap.from(".card", {
  y: 100,
  opacity: 0,
  duration: 0.8,
  stagger: {
    amount: 0.6,      // Total stagger time
    from: "start",    // or "end", "center", "edges", "random"
    ease: "power2.in"
  },
  ease: "power3.out"
})
```

### Text Split Animation
```typescript
// Animate each character
const chars = gsap.utils.toArray(".char")
gsap.from(chars, {
  y: 100,
  opacity: 0,
  rotateX: -90,
  stagger: 0.02,
  duration: 0.8,
  ease: "back.out(1.7)"
})
```

### Parallax Effect
```typescript
gsap.to(".parallax-bg", {
  y: () => window.innerHeight * 0.5,
  ease: "none",
  scrollTrigger: {
    trigger: ".section",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
})
```

### Magnetic Button Effect
```typescript
const handleMouseMove = (e: MouseEvent, button: HTMLElement) => {
  const rect = button.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  
  gsap.to(button, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3,
    ease: "power2.out"
  })
}

const handleMouseLeave = (button: HTMLElement) => {
  gsap.to(button, {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.5)"
  })
}
```

### Scroll Velocity Skew
```typescript
let lastScrollY = 0
let velocity = 0

const updateSkew = () => {
  velocity = (window.scrollY - lastScrollY) * 0.5
  velocity = gsap.utils.clamp(-30, 30, velocity)
  lastScrollY = window.scrollY
  
  gsap.to("[data-skew]", {
    skewY: velocity * 0.1,
    duration: 0.3,
    ease: "power2.out"
  })
  
  requestAnimationFrame(updateSkew)
}
```

## Easing Reference

### Power Eases (most common)
- `power1` - Subtle
- `power2` - Moderate (default feel)
- `power3` - Strong
- `power4` - Very strong

### Variants
- `.in` - Slow start, fast end
- `.out` - Fast start, slow end (most natural)
- `.inOut` - Slow start and end

### Special Eases
- `back.out(1.7)` - Overshoot and settle
- `elastic.out(1, 0.5)` - Bouncy elastic
- `bounce.out` - Bouncing ball
- `expo.out` - Exponential (very snappy)
- `circ.out` - Circular motion feel

### Custom Ease
```typescript
gsap.to(".element", {
  x: 100,
  ease: "M0,0 C0.5,0 0.5,1 1,1" // Custom bezier
})
```

## Best Practices for This Project

1. **Always use useGSAP hook** for React components
2. **Scope animations** to container refs to avoid selector conflicts
3. **Use scrub values** between 0.5-1.5 for smooth scroll animations
4. **Register plugins once** at the top of components
5. **Use gsap.set()** for initial states before animating
6. **Prefer transforms** (x, y, scale, rotation) over layout properties
7. **Use will-change sparingly** - only for heavy animations
8. **Test on mobile** - use matchMedia for responsive animations
9. **Remove markers** in production
10. **Use timelines** for coordinated multi-element animations

## Project-Specific Patterns

### Section Reveal Pattern (used in WorkSection, ContactSection)
```typescript
useGSAP(() => {
  gsap.set(titleRef.current, { y: 80, opacity: 0 })
  
  gsap.to(titleRef.current, {
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 85%",
      end: "top 55%",
      scrub: 1,
    },
  })
}, { scope: sectionRef, dependencies: [loading] })
```

### Card Stagger Pattern
```typescript
cardsRef.current.forEach((card, index) => {
  gsap.set(card, { y: 60, opacity: 0 })
  
  gsap.to(card, {
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: card,
      start: "top 95%",
      end: "top 70%",
      scrub: 0.8,
    },
  })
})
```

### Loading State Pattern
```typescript
useGSAP(() => {
  if (loading) return // Don't animate while loading
  
  // Animation code here
}, { scope: sectionRef, dependencies: [loading] })
```
