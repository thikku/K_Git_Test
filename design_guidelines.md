{
  "meta": {
    "app_name": "ColorCraft - AI Coloring Page Generator",
    "app_type": "Consumer web app (no auth)",
    "audience": ["Parents", "Teachers", "Kids 5-12", "Hobbyists"],
    "key_tasks": [
      "Enter prompt and generate black-and-white line art",
      "Pick from templates/categories",
      "Set complexity: simple | medium | detailed",
      "Preview and download as PNG/PDF",
      "Browse gallery of generated pages"
    ],
    "success_actions": [
      "First page generated and downloaded",
      "Repeat generations via templates",
      "Return visits to gallery"
    ]
  },

  "brand_personality": {
    "attributes": ["playful", "clean", "trustworthy", "creative", "child-friendly"],
    "design_style_fusion": "Bento Grid Layout + Minimalist functional UI with playful micro-animations; coral/tomato primary with black/white contrast; subtle paper-grain texture; light, airy spacing"
  },

  "color_system": {
    "notes": "Primary color must be light red in coral/tomato range (not pink). Support with black/white for high contrast. Gradients only in hero/section backgrounds under 20% viewport.",
    "palette_hex": {
      "primary_coral": "#FF6B5A", 
      "primary_coral_600": "#F25340",
      "primary_coral_300": "#FFA79D",
      "butter": "#FFE8A3",
      "mint": "#BFE8D0",
      "sky": "#B7E3FF",
      "ink": "#111111",
      "paper": "#FFFFFF",
      "paper_warm": "#FAFAF7",
      "stroke_light": "#D7D7D7"
    },
    "palette_hsl_tokens": {
      "--background": "60 20% 98%", 
      "--foreground": "0 0% 6%",
      "--card": "0 0% 100%",
      "--card-foreground": "0 0% 6%",
      "--primary": "8 100% 66%", 
      "--primary-foreground": "0 0% 100%",
      "--secondary": "50 100% 88%", 
      "--secondary-foreground": "0 0% 13%",
      "--muted": "0 0% 96%",
      "--muted-foreground": "0 0% 42%",
      "--accent": "195 100% 88%", 
      "--accent-foreground": "0 0% 12%",
      "--border": "0 0% 86%",
      "--input": "0 0% 86%",
      "--ring": "8 100% 66%",
      "--radius": "0.75rem"
    },
    "css_custom_properties_extend": {
      "--brand-coral-50": "8 100% 97%",
      "--brand-coral-100": "8 100% 92%",
      "--brand-coral-300": "8 100% 80%",
      "--brand-coral-500": "8 100% 66%",
      "--brand-coral-600": "8 85% 58%",
      "--ink": "0 0% 7%",
      "--paper": "60 20% 98%"
    },
    "gradient_presets": [
      {
        "name": "sunny-coral-hero",
        "type": "linear",
        "usage": "hero background only (<=20% viewport)",
        "stops": ["hsl(8 100% 96%) 0%", "hsl(45 100% 90%) 60%", "hsl(195 100% 92%) 100%"],
        "angle": "135deg"
      },
      {
        "name": "warm-paper-overlay",
        "type": "radial",
        "usage": "decorative blob behind heading",
        "stops": ["hsl(8 100% 92%) 0%", "transparent 70%"],
        "position": "at 20% 20%"
      }
    ],
    "enforcement": "Never use dark/saturated purple/pink gradients. Never gradient text blocks. If gradient >20% viewport or harms readability, fallback to solid paper_warm."
  },

  "typography": {
    "fonts": {
      "heading": "Fredoka",
      "body": "Figtree",
      "mono": "Source Code Pro"
    },
    "google_fonts_import": "<link href=\"https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Figtree:wght@400;500;600;700&display=swap\" rel=\"stylesheet\">",
    "usage": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight",
      "h2": "text-base md:text-lg font-semibold",
      "body": "text-sm md:text-base leading-7",
      "small": "text-xs text-muted-foreground"
    },
    "rules": [
      "Headlines use Fredoka with tighter line-height (1.1-1.2)",
      "Body uses Figtree for clarity",
      "Avoid all-caps in long labels; use Title Case for primary CTAs"
    ]
  },

  "spacing_radius_shadows": {
    "spacing_scale": "2–3x comfortable spacing. Base unit 8px: 4, 8, 12, 16, 24, 32, 48, 64",
    "radius": {
      "sm": "0.5rem",
      "md": "0.75rem",
      "lg": "1rem",
      "btn": "9999px"
    },
    "shadows": {
      "card": "0 8px 24px rgba(17,17,17,0.06)",
      "hover": "0 10px 30px rgba(17,17,17,0.10)",
      "focus": "0 0 0 3px hsl(8 100% 80% / 0.6)"
    }
  },

  "layout": {
    "grid_system": {
      "container": "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
      "columns": 12,
      "gutter": 16,
      "breakpoints": {
        "sm": 640,
        "md": 768,
        "lg": 1024,
        "xl": 1280
      }
    },
    "page_patterns": [
      {
        "page": "Home",
        "layout": "Z-Pattern hero (left copy, right preview) + bento cards for actions",
        "sections": [
          "Hero: headline, prompt CTA, soft gradient background",
          "Quick Actions: Generate from prompt, Browse Templates, View Gallery",
          "Popular Templates carousel"
        ]
      },
      {
        "page": "Generate",
        "layout": "Single-Column with sticky preview",
        "sections": [
          "Prompt input + complexity radio",
          "Generate button",
          "Live preview card (shows skeleton while loading)",
          "Download bar"
        ]
      },
      {
        "page": "Templates",
        "layout": "Bento grid of category cards, filter toolbar at top",
        "sections": [
          "Tabs: Animals, Fantasy, Vehicles, Seasons, Mandalas",
          "Grid of Template cards (3-4 cols on desktop)"
        ]
      },
      {
        "page": "Gallery",
        "layout": "Masonry-ish responsive grid using Cards",
        "sections": [
          "Toolbar: Sort by Newest/Popular, filter by Complexity",
          "Cards with preview, date, quick download"
        ]
      }
    ],
    "do_nots": [
      "Do not center-align the entire app container.",
      "Avoid using .App-header from App.css for layout; build with Tailwind utilities"
    ]
  },

  "components": {
    "button": {
      "component_path": "./components/ui/button",
      "variant_tokens": {
        "primary": "bg-[hsl(var(--primary))] text-white hover:bg-[hsl(8_85%_58%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]",
        "secondary": "bg-[hsl(var(--secondary))] text-foreground hover:bg-[hsl(50_90%_84%)]",
        "ghost": "bg-transparent text-foreground hover:bg-[hsl(var(--muted))]"
      },
      "shape": "pill/capsule (rounded-full)",
      "sizes": {
        "sm": "h-9 px-4 rounded-full",
        "md": "h-11 px-6 rounded-full",
        "lg": "h-12 px-8 rounded-full"
      },
      "micro": "Scale 1.02 on hover, 0.98 on active; transition only colors/opacity/box-shadow"
    },
    "inputs": {
      "prompt": {
        "component_path": "./components/ui/textarea",
        "classes": "w-full min-h-28 rounded-lg border bg-white/90 placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]",
        "attributes": {"data-testid": "prompt-textarea"}
      },
      "complexity": {
        "component_path": "./components/ui/radio-group",
        "classes": "flex gap-3",
        "options": ["simple", "medium", "detailed"],
        "attributes": {"data-testid": "complexity-selector"}
      },
      "category_select": {
        "component_path": "./components/ui/select",
        "attributes": {"data-testid": "category-select"}
      },
      "slider_detail": {
        "component_path": "./components/ui/slider",
        "note": "Optional fine control if needed",
        "attributes": {"data-testid": "detail-slider"}
      }
    },
    "cards": {
      "template_card": {
        "component_path": "./components/ui/card",
        "classes": "group relative overflow-hidden rounded-xl border bg-card hover:shadow-lg",
        "hover": "translate-y-[-2px]",
        "attributes": {"data-testid": "template-select-card"}
      },
      "gallery_card": {
        "component_path": "./components/ui/card",
        "classes": "relative rounded-xl border bg-white",
        "attributes": {"data-testid": "gallery-item-card"}
      }
    },
    "navigation": {
      "component_path": "./components/ui/navigation-menu",
      "classes": "sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b",
      "attributes": {"data-testid": "primary-nav"}
    },
    "preview": {
      "dialog": {
        "component_path": "./components/ui/dialog",
        "attributes": {"data-testid": "preview-dialog"}
      },
      "skeleton": {
        "component_path": "./components/ui/skeleton",
        "classes": "h-[420px] w-full rounded-lg"
      }
    },
    "toast": {
      "component_path": "./components/ui/sonner",
      "usage": "import { Toaster, toast } from './components/ui/sonner'",
      "attributes": {"data-testid": "global-toaster"}
    },
    "misc": {
      "tabs": "./components/ui/tabs",
      "tooltip": "./components/ui/tooltip",
      "popover": "./components/ui/popover",
      "carousel": "./components/ui/carousel",
      "badge": "./components/ui/badge",
      "pagination": "./components/ui/pagination"
    }
  },

  "pages_and_routes": {
    "files_js": [
      "src/pages/HomePage.js",
      "src/pages/GeneratePage.js",
      "src/pages/TemplatesPage.js",
      "src/pages/GalleryPage.js",
      "src/components/DownloadBar.js",
      "src/components/PromptForm.js",
      "src/components/PreviewPane.js"
    ],
    "routing_notes": "Use React Router; no auth gates. Keep routes simple: /, /generate, /templates, /gallery"
  },

  "example_snippets": {
    "index_css_tokens_patch": "@layer base { :root { --background: 60 20% 98%; --foreground: 0 0% 6%; --primary: 8 100% 66%; --secondary: 50 100% 88%; --accent: 195 100% 88%; --ring: 8 100% 66%; --radius: 0.75rem; } }",
    "hero_section": "<section class=\"relative\"> <div class=\"absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_20%_10%,hsl(8_100%_96%)_0%,transparent_60%),linear-gradient(135deg,hsl(8_100%_96%)_0%,hsl(45_100%_90%)_60%,hsl(195_100%_92%)_100%)]\"></div> <div class=\"mx-auto max-w-7xl px-4 py-16 sm:py-24\"> <h1 class=\"font-bold font-[Fredoka] text-4xl sm:text-5xl lg:text-6xl\">Make printable coloring pages in seconds</h1> <p class=\"mt-4 text-sm md:text-base text-muted-foreground\">Type an idea, pick complexity, preview, download.</p> <form class=\"mt-8 flex flex-col md:flex-row gap-3\" data-testid=\"generate-form\"> <textarea class=\"w-full min-h-24 rounded-lg border bg-white/90 focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]\" placeholder=\"e.g., friendly dinosaur in a jungle\" data-testid=\"prompt-textarea\"></textarea> <button class=\"h-12 px-6 rounded-full bg-[hsl(var(--primary))] text-white hover:bg-[hsl(8_85%_58%)]\" data-testid=\"generate-form-submit-button\">Generate</button> </form> </div> </section>",
    "download_bar_js": "export default function DownloadBar({ onDownloadPng, onDownloadPdf }) { return (<div className=\"sticky bottom-4 mx-auto max-w-3xl rounded-full bg-white/90 backdrop-blur border shadow p-2 flex items-center gap-2\" data-testid=\"download-bar\"> <button className=\"h-10 px-5 rounded-full bg-[hsl(var(--primary))] text-white\" onClick={onDownloadPng} data-testid=\"download-png-button\">Download PNG</button> <button className=\"h-10 px-5 rounded-full bg-black text-white\" onClick={onDownloadPdf} data-testid=\"download-pdf-button\">Download PDF</button> </div> ); }"
  },

  "micro_interactions_motion": {
    "libraries": ["framer-motion"],
    "install": "npm i framer-motion",
    "patterns": [
      "Buttons: hover: scale-105, active: scale-98 (transform only), shadow intensifies",
      "Cards: translate-y-[-2px] on hover with subtle shadow",
      "Hero parallax: move decorative crayons at different speeds using useScroll",
      "Skeletons for image generation while loading",
      "Entrance fade/slide-up for sections using motion.div"
    ],
    "framer_snippet": "import { motion, useScroll, useTransform } from 'framer-motion'; function ParallaxCrayon({ yFrom = -20, yTo = 20, children }) { const { scrollYProgress } = useScroll(); const y = useTransform(scrollYProgress, [0, 1], [yFrom, yTo]); return <motion.div style={{ y }}>{children}</motion.div>; }"
  },

  "accessibility": {
    "rules": [
      "All interactive elements must have visible focus outline with 3:1 contrast minimum",
      "Maintain WCAG AA contrast; coral foreground only on white/very light backgrounds",
      "Touch targets >= 44x44px; large line-height for labels",
      "Use aria-live for generation status messages",
      "Provide ALT text for previews and template thumbnails"
    ],
    "keyboard": [
      "Tab order: nav -> primary actions -> forms -> gallery items",
      "Esc closes preview dialog"
    ]
  },

  "testing_data_testids": {
    "convention": "kebab-case describing role, stable across refactors",
    "examples": [
      "primary-nav",
      "generate-form",
      "generate-form-submit-button",
      "prompt-textarea",
      "complexity-selector",
      "template-select-card",
      "gallery-item-card",
      "download-bar",
      "download-png-button",
      "download-pdf-button",
      "preview-dialog",
      "error-toast-message"
    ]
  },

  "iconography": {
    "library": "lucide-react",
    "usage": "import { Download, Image as ImageIcon, Wand2, Grid3X3 } from 'lucide-react'",
    "note": "Avoid emoji icons; use Lucide or FontAwesome CDN if needed"
  },

  
  "images_urls": [
    {
      "url": "https://images.unsplash.com/photo-1567727014928-5f4aa30c4c15?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "hero-decor",
      "description": "Overhead markers on white desk for playful hero background"
    },
    {
      "url": "https://images.unsplash.com/photo-1618810741895-c0eb18eea601?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "how-it-works",
      "description": "Playful stationery shot for How it works section"
    },
    {
      "url": "https://images.unsplash.com/photo-1608120621607-2f2eb25b85d3?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "gallery-empty-state",
      "description": "Colored pencils tray for empty gallery state card"
    },
    {
      "url": "https://images.unsplash.com/photo-1632132142885-3752d64bcfc0?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "templates-banner",
      "description": "Crayons in holder for Templates page banner strip"
    }
  ],

  "component_path": {
    "button": "./components/ui/button",
    "textarea": "./components/ui/textarea",
    "radio_group": "./components/ui/radio-group",
    "select": "./components/ui/select",
    "slider": "./components/ui/slider",
    "card": "./components/ui/card",
    "dialog": "./components/ui/dialog",
    "skeleton": "./components/ui/skeleton",
    "navigation_menu": "./components/ui/navigation-menu",
    "tabs": "./components/ui/tabs",
    "tooltip": "./components/ui/tooltip",
    "popover": "./components/ui/popover",
    "carousel": "./components/ui/carousel",
    "badge": "./components/ui/badge",
    "pagination": "./components/ui/pagination",
    "sonner": "./components/ui/sonner"
  },

  "downloads_and_export": {
    "options": ["PNG", "PDF"],
    "rules": [
      "Preview must show 1-bit or black stroke on white for print clarity",
      "Include 0.5in margins in PDF",
      "Offer A4 and Letter sizes"
    ],
    "implementation_hints": {
      "png": "Use generated image blob; <a download> with object URL",
      "pdf": "Use jspdf or browser print. Keep vectors when possible"
    },
    "sample_pdf_js": "import jsPDF from 'jspdf'; export function downloadPdf(imgDataUrl) { const doc = new jsPDF({ unit: 'pt', format: 'a4' }); const margin = 36; const pageW = doc.internal.pageSize.getWidth(); const pageH = doc.internal.pageSize.getHeight(); doc.addImage(imgDataUrl, 'PNG', margin, margin, pageW - margin*2, pageH - margin*2); doc.save('coloring-page.pdf'); }"
  },

  "template_and_gallery": {
    "template_card": "Use Card with image top, label, and badge for complexity. Add button: 'Use this'",
    "gallery_card": "Include mini actions: quick preview (Dialog), download, and date label"
  },

  "noise_and_textures": {
    "paper_noise_css": ".paper-noise:before { content: ''; position: absolute; inset: 0; pointer-events: none; background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"300\" height=\"300\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.04\"/></svg>'); background-repeat: repeat; }",
    "usage": "Apply to large, non-content backgrounds only (hero wrappers, banners)"
  },

  "instructions_to_main_agent": [
    "Update tailwind tokens in src/index.css to the provided palette_hsl_tokens (do not change dark tokens unless adding theme toggle later)",
    "Do not center the app container; use container utilities and left-aligned content",
    "Use shadcn/ui imports exclusively for inputs, dropdowns, dialog, toast",
    "Implement HomePage hero with the sunny-coral-hero gradient (<=20% viewport)",
    "Add Framer Motion for parallax and entrances; no 'transition: all' anywhere",
    "All interactive elements and key info must include data-testid using kebab-case",
    "Buttons use capsule shape and defined variants; ensure WCAG AA contrast",
    "Templates grid: 2 cols on mobile, 3 cols on md, 4 cols on lg",
    "Gallery: responsive grid with Masonry feel using variable row heights; keep captions below thumbnails",
    "Complexity selector uses radio-group with three options; default medium",
    "Show skeleton while generation is in-flight; on error show sonner toast",
    "Preview uses Dialog with zoomable image and prominent Download bar",
    "No HTML-native dropdowns/alerts; always use shadcn counterpart",
    "Avoid purple/pink gradients entirely; keep to coral/butter/sky light tones"
  ]
}


<General UI UX Design Guidelines>  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
</General UI UX Design Guidelines>