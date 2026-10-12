tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "error-container": "rgb(var(--c-error-container) / <alpha-value>)", "surface-container-highest": "rgb(var(--c-surface-container-highest) / <alpha-value>)",
        "on-primary-container": "rgb(var(--c-on-primary-container) / <alpha-value>)", "tertiary": "rgb(var(--c-tertiary) / <alpha-value>)",
        "on-tertiary-fixed-variant": "rgb(var(--c-on-tertiary-fixed-variant) / <alpha-value>)", "primary": "rgb(var(--c-primary) / <alpha-value>)",
        "surface-container-high": "rgb(var(--c-surface-container-high) / <alpha-value>)", "primary-fixed": "rgb(var(--c-primary-fixed) / <alpha-value>)",
        "on-surface-variant": "rgb(var(--c-on-surface-variant) / <alpha-value>)", "on-secondary-fixed": "rgb(var(--c-on-secondary-fixed) / <alpha-value>)",
        "on-secondary-fixed-variant": "rgb(var(--c-on-secondary-fixed-variant) / <alpha-value>)", "secondary-fixed-dim": "rgb(var(--c-secondary-fixed-dim) / <alpha-value>)",
        "secondary-container": "rgb(var(--c-secondary-container) / <alpha-value>)", "tertiary-fixed-dim": "rgb(var(--c-tertiary-fixed-dim) / <alpha-value>)",
        "tertiary-fixed": "rgb(var(--c-tertiary-fixed) / <alpha-value>)", "outline-variant": "rgb(var(--c-outline-variant) / <alpha-value>)",
        "surface-container-low": "rgb(var(--c-surface-container-low) / <alpha-value>)", "surface-bright": "rgb(var(--c-surface-bright) / <alpha-value>)",
        "inverse-on-surface": "rgb(var(--c-inverse-on-surface) / <alpha-value>)", "surface-container-lowest": "rgb(var(--c-surface-container-lowest) / <alpha-value>)",
        "on-tertiary": "rgb(var(--c-on-tertiary) / <alpha-value>)", "secondary": "rgb(var(--c-secondary) / <alpha-value>)", "error": "rgb(var(--c-error) / <alpha-value>)",
        "background": "rgb(var(--c-background) / <alpha-value>)", "surface": "rgb(var(--c-surface) / <alpha-value>)", "tertiary-container": "rgb(var(--c-tertiary-container) / <alpha-value>)",
        "on-primary-fixed": "rgb(var(--c-on-primary-fixed) / <alpha-value>)", "on-primary-fixed-variant": "rgb(var(--c-on-primary-fixed-variant) / <alpha-value>)",
        "on-error-container": "rgb(var(--c-on-error-container) / <alpha-value>)", "on-secondary-container": "rgb(var(--c-on-secondary-container) / <alpha-value>)",
        "on-background": "rgb(var(--c-on-background) / <alpha-value>)", "surface-dim": "rgb(var(--c-surface-dim) / <alpha-value>)", "inverse-primary": "rgb(var(--c-inverse-primary) / <alpha-value>)",
        "secondary-fixed": "rgb(var(--c-secondary-fixed) / <alpha-value>)", "outline": "rgb(var(--c-outline) / <alpha-value>)", "on-secondary": "rgb(var(--c-on-secondary) / <alpha-value>)",
        "inverse-surface": "rgb(var(--c-inverse-surface) / <alpha-value>)", "on-error": "rgb(var(--c-on-error) / <alpha-value>)", "surface-container": "rgb(var(--c-surface-container) / <alpha-value>)",
        "on-tertiary-fixed": "rgb(var(--c-on-tertiary-fixed) / <alpha-value>)", "on-primary": "rgb(var(--c-on-primary) / <alpha-value>)", "surface-tint": "rgb(var(--c-surface-tint) / <alpha-value>)",
        "primary-fixed-dim": "rgb(var(--c-primary-fixed-dim) / <alpha-value>)", "primary-container": "rgb(var(--c-primary-container) / <alpha-value>)", "on-surface": "rgb(var(--c-on-surface) / <alpha-value>)",
        "on-tertiary-container": "rgb(var(--c-on-tertiary-container) / <alpha-value>)", "surface-variant": "rgb(var(--c-surface-variant) / <alpha-value>)"
      },
      borderRadius: { DEFAULT: "0.25rem", lg: "0.5rem", xl: "0.75rem", full: "9999px" },
      spacing: {
        "space-2xl": "6rem", "space-xs": "0.375rem", "space-xl": "3.5rem",
        "gutter": "1.5rem", "margin": "1.25rem", "space-sm": "0.75rem",
        "space-lg": "2rem", "margin-desktop": "4rem", "gutter-desktop": "2.5rem",
        "space-md": "1.25rem"
      },
      fontFamily: Object.fromEntries(
        ["label-caps","label-md","body-sm","headline-xl","display-hero","display-hero-mobile",
         "body-lg","body-md","headline-md","headline-sm","headline-xl-mobile"]
          .map(k => [k, ["Plus Jakarta Sans"]])
      ),
      fontSize: {
        "label-caps": ["11px", { lineHeight: "16px", letterSpacing: "0.08em", fontWeight: "600" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "500" }],
        "body-sm": ["13px", { lineHeight: "20px", fontWeight: "400" }],
        "headline-xl": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "display-hero": ["64px", { lineHeight: "72px", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-hero-mobile": ["36px", { lineHeight: "44px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "400" }],
        "body-md": ["15px", { lineHeight: "24px", letterSpacing: "-0.005em", fontWeight: "400" }],
        "headline-md": ["24px", { lineHeight: "32px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "headline-sm": ["18px", { lineHeight: "26px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-xl-mobile": ["28px", { lineHeight: "36px", letterSpacing: "-0.02em", fontWeight: "600" }]
      }
    }
  }
};
