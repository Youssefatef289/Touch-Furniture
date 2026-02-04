# Touch Furniture - Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The website will open at `http://localhost:3000`

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Project Structure

```
touch-furniture/
├── src/
│   ├── components/
│   │   ├── sections/        # Page sections (Hero, Collections, etc.)
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── Footer.jsx       # Footer component
│   │   ├── LoadingScreen.jsx
│   │   └── ScrollToTop.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Collections.jsx
│   │   ├── Products.jsx
│   │   ├── About.jsx
│   │   ├── Gallery.jsx
│   │   └── Contact.jsx
│   ├── context/
│   │   └── ThemeContext.jsx  # Dark mode context
│   ├── styles/
│   │   └── index.css        # Global styles
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── image/                   # Image assets
├── public/                  # Static files
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
```

## Features Implemented

✅ Modern React.js setup with Vite
✅ React Router for navigation
✅ Tailwind CSS for styling
✅ Framer Motion for animations
✅ Dark mode toggle
✅ Responsive design (mobile, tablet, desktop)
✅ Hero slider with auto-play
✅ Featured collections section
✅ Products/Best sellers section
✅ About section
✅ Gallery with lightbox
✅ Why Choose Us section
✅ Testimonials slider
✅ Contact form with Google Maps
✅ Footer with newsletter
✅ Loading screen
✅ Scroll-to-top button
✅ SEO-friendly structure
✅ Lazy loading images

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme.

### Images
Replace images in the `/image` folder with your own furniture images.

### Content
Update text content in the respective component files.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- All images are lazy-loaded for better performance
- Dark mode preference is saved in localStorage
- The website is fully responsive and works on all devices
- All animations are optimized for smooth performance

