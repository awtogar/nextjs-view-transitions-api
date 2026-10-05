# Eksperimen View Transitions API di Next.js

Repo ini tempat gue nyoba fitur View Transitions API di Next.js (masih eksperimental). Tujuannya bikin transisi antar halaman yang halus tanpa library berat kayak Framer Motion atau GSAP. Cukup pakai fitur bawaan browser dan CSS.

## Setup

Fitur ini masih eksperimental, jadi harus dinyalain manual di config Next.js.

Buka [`next.config.mjs`](./next.config.mjs), lalu pastikan isinya begini:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
```

## Cara bikin transisinya

### 1. Bungkus halaman pakai `<ViewTransition>`

Biar transisinya jalan di setiap pindah rute, bungkus semua konten halaman pakai komponen `<ViewTransition>` bawaan React di [`app/template.jsx`](./app/template.jsx).

Kenapa `template.jsx` dan bukan `layout.js`? Karena `template` di-mount ulang tiap pindah rute, sedangkan `layout` nggak.

```jsx
// app/template.jsx
"use client";
import { ViewTransition } from "react";

export default function Template({ children }) {
  return (
    // Kasih class khusus waktu halaman masuk (enter) dan keluar (exit)
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
```

### 2. Bikin elemen yang tetap diam (contoh: Navbar)

Kalau ada elemen yang nggak mau ikut beranimasi, misalnya Navbar yang posisinya nempel di atas, kasih `viewTransitionName` khusus ke elemen itu.

Di [`components/Navbar.jsx`](./components/Navbar.jsx):

```jsx
<nav className="navbar" style={{ viewTransitionName: "navbar" }}>
  {/* Isi Navbar */}
</nav>
```

Terus di [`app/globals.css`](./app/globals.css), matiin animasi default-nya dan kasih z-index tinggi biar tetap di atas:

```css
::view-transition-group(navbar) {
  animation: none;
  z-index: 100;
}
```

### 3. Atur animasi transisinya

Pas `<ViewTransition>` jalan, Next.js/React nambahin pseudo-element ke DOM. Animasinya kita atur lewat CSS di [`app/globals.css`](./app/globals.css).

Pakai `::view-transition-old` buat halaman yang keluar, dan `::view-transition-new` buat halaman yang masuk:

```css
::view-transition-old(.page-exit) {
  animation: 1000ms cubic-bezier(0.75, 0, 0.1, 1) both page-out;
}
::view-transition-new(.page-enter) {
  animation: 1000ms cubic-bezier(0.75, 0, 0.1, 1) both page-in;
}
```

## Variasi animasi keyframe

Di [`app/keyframe.css`](./app/keyframe.css) udah ada beberapa contoh animasi yang bisa dicoba.

### Cara ganti animasi

1. Buka [`app/keyframe.css`](./app/keyframe.css).
2. Di sana ada banyak variasi `@keyframes page-out` dan `@keyframes page-in` (misalnya *Diagonal Reveal*, *Horizontal Slide*, *Skew Editorial*, dan lainnya).
3. Copy satu set `@keyframes` yang kamu suka.
4. Paste ke bagian bawah [`app/globals.css`](./app/globals.css), gantiin `@keyframes` yang lama.

---

**Catatan buat nanti:**
Kalau View Transitions udah stabil (nggak eksperimental lagi) di versi Next.js / React berikutnya, cek lagi apakah config di `next.config.mjs` masih perlu, atau ada perubahan sintaks di komponen `<ViewTransition>`.