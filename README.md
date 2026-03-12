# BlueRitt Login — React + Tailwind CSS

Figma design se convert kiya gaya production-grade login screen.

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── AuthLayout.jsx       # Background + logo + footer wrapper
│   │   ├── LoginCard.jsx        # Card container with heading
│   │   ├── LoginForm.jsx        # Form with all fields
│   │   ├── ReCaptchaWidget.jsx  # reCAPTCHA UI component
│   │   └── index.js             # Barrel exports
│   └── ui/
│       ├── BlueRittLogo.jsx     # Reusable logo component
│       ├── InputField.jsx       # Reusable input with icon support
│       ├── PrimaryButton.jsx    # Gradient CTA button
│       └── index.js             # Barrel exports
├── hooks/
│   └── useLoginForm.js          # Form state, validation, submission logic
├── pages/
│   └── LoginPage.jsx            # Top-level page (AuthLayout + LoginCard)
├── App.jsx
└── index.css                    # Tailwind directives + DM Sans font
tailwind.config.js               # Custom tokens (colors, shadows, fonts)
```

---

## 🚀 Setup

```bash
# Install dependencies
npm install

# Tailwind CSS v3
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Dev server
npm run dev
```

---

## 🎨 Design Tokens (tailwind.config.js)

| Token                  | Value                            |
|------------------------|----------------------------------|
| `brand-bg`             | `#070F1C` — Page background      |
| `brand-card`           | `#0C1829` — Card background      |
| `brand-border`         | `#1E3A5F` — Border color         |
| `brand-primary`        | `#E8572A` — Orange CTA           |
| `brand-accent`         | `#3B82F6` — Blue links           |
| `brand-textSecondary`  | `#8BA3C0` — Placeholder / labels |
| `brand-inputBg`        | `#0A1525` — Input background     |

---

## 🧩 Components Overview

### `AuthLayout`
Full-screen wrapper with animated ambient background glows, logo header, and copyright footer.

### `LoginCard`
Centered card with star icon, "Welcome back!" heading, and sign-up link.

### `LoginForm`
Connects to `useLoginForm` hook. Renders email, password, reCAPTCHA, support link, and submit button.

### `InputField`
Reusable input component. Accepts `icon`, `rightElement`, `error` props.

### `PrimaryButton`
Gradient button with loading spinner state and hover/active animations.

### `ReCaptchaWidget`
UI-only CAPTCHA widget. Replace with `react-google-recaptcha` for production.

---

## ♿ Accessibility

- All inputs have associated `<label>` elements
- Password toggle has `aria-label`
- CAPTCHA checkbox uses `role="checkbox"` and `aria-checked`
- Form uses `noValidate` with manual validation + `role="alert"` on errors
- Buttons have visible focus rings

---

## 📱 Responsive

- Mobile: Full width card with horizontal padding
- Tablet+: Centered, max-width `28rem` card
- All touch targets ≥ 44px
