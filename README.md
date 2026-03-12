# BlueRitt Login — TypeScript + React + Tailwind CSS

A production-grade authentication system (Login & Signup) converted from Figma design, now fully powered by **TypeScript** and integrated with official **Google reCAPTCHA**.

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── AuthLayout.tsx       # Background + logo + footer wrapper
│   │   ├── LoginCard.tsx        # Card container with heading
│   │   ├── LoginForm.tsx        # Form with all fields
│   │   ├── ReCaptchaWidget.tsx  # Official Google reCAPTCHA integration
│   │   └── index.ts             # Barrel exports
│   └── ui/
│       ├── BlueRittLogo.tsx     # Reusable logo component
│       ├── InputField.tsx       # Reusable input with icon support
│       ├── PrimaryButton.tsx    # Gradient CTA button
│       └── index.ts             # Barrel exports
├── hooks/
│   ├── useLoginForm.ts          # Form state, validation, submission logic
│   └── useSignupForm.ts         # Signup logic with reCAPTCHA verification
├── pages/
│   ├── LoginPage.tsx            # Top-level page (AuthLayout + LoginCard)
│   └── SignupPage.tsx            # Top-level page (AuthLayout + SignupCard)
├── App.tsx
└── index.css                    # Tailwind directives + DM Sans font
```

---

## 🚀 Setup

```bash
# Install dependencies
npm install

# Dev server
npm run dev
```

---

## ✨ Features

- **TypeScript Implementation**: Fully typed components and hooks for robust development.
- **Official reCAPTCHA**: Integrated with `react-google-recaptcha` (Dark Theme).
- **Modern UI**: Smooth gradients, ambient glows, and responsive layout.
- **Form Validation**: Real-time validation for email, password, and required fields.

---

## 📱 Responsive

- Mobile: Full width card with horizontal padding
- Tablet+: Centered, max-width `28rem` card
- All touch targets ≥ 44px
