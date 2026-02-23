# Portfolio React

Modern, responsive portfolio website built with React, TypeScript, and Vite. Features dark mode, multi-language support (English/Spanish), and a professional design.

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS Modules** - Component styling

## ✨ Features

- 🌓 Dark Mode / Light Mode toggle with localStorage persistence
- 🌍 Multi-language support (English/Spanish) with Context API
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- ♿ Accessible and SEO-friendly
- 🎨 Modern, professional UI
- 🔄 React Router for client-side navigation
- 📊 Complete portfolio sections: Home, About, Experience, Skills, Projects, Contact

## 📁 Project Structure

```
portfolio-react/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/       # Reusable components
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── pages/           # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── context/         # Context providers
│   │   └── LanguageContext.tsx
│   ├── hooks/          # Custom hooks
│   │   └── useTheme.ts
│   ├── i18n/           # Translations
│   │   └── translations.json
│   ├── data/           # Profile data
│   │   └── profile.json
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.ts
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📦 Deployment to GitHub Pages

### Method 1: Using GitHub Actions (Recommended)

1. **Create `.github/workflows/deploy.yml`**:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. **Update `vite.config.ts`** (already configured):
   ```typescript
   base: '/portfolio-react/',
   ```

3. **Push to GitHub** - The workflow will automatically deploy.

### Method 2: Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to `package.json`**:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Configure GitHub Pages**:
   - Go to repository Settings > Pages
   - Source: `gh-pages` branch
   - Save

## 🎨 Customization

### Update Profile Information

Edit `src/data/profile.json` with your information.

### Modify Translations

Edit `src/i18n/translations.json` to update text content.

### Change Theme Colors

Modify CSS variables in `src/index.css`:
```css
:root {
  --accent: #3b82f6;
  --accent-hover: #2563eb;
  /* ... */
}
```

## 📸 Screenshots

<!-- Add screenshots here -->
- Home page
- About section
- Experience timeline
- Skills showcase
- Projects gallery
- Contact form

## 👤 Author

**Tomas Tutor Onetto**
- Email: tomas2000tutor@gmail.com
- Phone: +54 2224 445207
- Location: San Vicente, Buenos Aires, Argentina

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with React and Vite
- Icons and emojis for UI elements
- Modern CSS for styling

