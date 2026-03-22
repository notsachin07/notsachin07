# Portfolio Website Specification

## Project Overview
- **Project Name**: Portfolio Website
- **Type**: Interactive Portfolio Web Application
- **Core Functionality**: A premium, award-winning caliber portfolio showcasing skills, projects, and experience with cutting-edge animations and 3D elements
- **Target Users**: Recruiters, hiring managers, potential clients

## Tech Stack
- Next.js 14+ (App Router)
- Tailwind CSS
- GSAP + ScrollTrigger
- Anime.js
- Three.js
- Lenis (smooth scrolling)
- Framer Motion

## UI/UX Specification

### Layout Structure
- **Header**: Fixed navigation with logo, menu items, blur background on scroll
- **Hero Section**: Full viewport height with 3D element and animated text
- **About Section**: Split layout (text + image with parallax)
- **Skills Section**: Animated circular indicators
- **Projects Section**: Horizontal scroll gallery
- **Experience Section**: Sticky timeline
- **Contact Section**: Minimal form with micro-interactions
- **Footer**: Simple footer with social links

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Color Palette
- **Background**: #0a0a0a (near black)
- **Surface**: #141414 (dark gray)
- **Primary**: #ffffff (white)
- **Accent**: #6366f1 (indigo)
- **Accent Secondary**: #ec4899 (pink)
- **Text Primary**: #ffffff
- **Text Secondary**: #a1a1aa (gray)
- **Border**: #27272a (dark border)

### Typography
- **Font Family**: "Sora" (headings), "DM Sans" (body)
- **Hero Title**: 80px (desktop), 48px (mobile)
- **Section Titles**: 48px (desktop), 32px (mobile)
- **Body Text**: 18px
- **Small Text**: 14px

### Spacing System
- Section padding: 120px vertical (desktop), 80px (mobile)
- Container max-width: 1400px
- Grid gap: 32px

## Animation Specifications

### Smooth Scrolling
- Lenis with GSAP ScrollTrigger sync
- Scroll duration: 1.2
- Smooth touch: true
- Lerp: 0.1

### Hero Section Animations
- 3D sphere with custom shader (gradient distortion)
- Float animation: translateY oscillation (3s duration)
- Text split animation: stagger 0.05s per character
- Scale up on load: 0.8 → 1
- Fade in duration: 1.2s with ease: "power4.out"

### Scroll Animations (GSAP ScrollTrigger)
- Section reveal: y: 100 → 0, opacity: 0 → 1
- Duration: 1s
- Ease: "power3.out"
- Trigger: "top 80%"

### Parallax Effects
- Speed factor: 0.5
- Direction: vertical

### Skills Animations (Anime.js)
- Circular progress: 0 → skill percentage
- Duration: 1.5s
- Easing: "easeOutElastic(1, 0.5)"
- Hover: scale 1.1 with glow effect

### Project Cards
- Hover: translateY -10px, scale 1.02
- Shader tilt effect on mouse move
- Duration: 0.3s

### Experience Timeline
- Sticky section with scroll progress
- Line draws as user scrolls
- Cards fade in sequentially

### Micro-interactions
- Button hover: scale 1.05, glow
- Input focus: border color change, label float
- Link hover: underline animation

## Component Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── Three/
│       ├── HeroSphere.tsx
│       └── ParticleField.tsx
├── hooks/
│   ├── useSmoothScroll.ts
│   ├── useGsapAnimation.ts
│   └── useInView.ts
├── utils/
│   └── animations.ts
└── shaders/
    ├── gradientDistortion.ts
    └── particleVertex.glsl
```

## Functionality Specification

### Core Features
1. **Smooth Scroll**: Lenis integration with proper GSAP sync
2. **3D Hero**: Three.js sphere with custom GLSL shader
3. **Scroll Triggers**: All sections animate on scroll
4. **Parallax**: Image/element parallax on scroll
5. **Sticky Sections**: Experience timeline with sticky behavior
6. **Interactive Cards**: Project cards with tilt/shader effects
7. **Progress Indicators**: Animated skill visualizations
8. **Form Interactions**: Input focus animations

### Performance Requirements
- Lazy load Three.js components
- Use `next/dynamic` for heavy components
- Optimize shader code
- Use `will-change` sparingly
- Debounce scroll events

## Acceptance Criteria
- [ ] Smooth scrolling feels fluid and premium
- [ ] Hero 3D element renders without blocking main thread
- [ ] All sections animate on scroll without jank
- [ ] Parallax effects are smooth
- [ ] Skills animate on viewport entry
- [ ] Project cards have hover effects
- [ ] Experience timeline is sticky and animates
- [ ] Form has micro-interactions
- [ ] Fully responsive on all breakpoints
- [ ] No console errors or warnings
- [ ] Lighthouse performance score > 80
