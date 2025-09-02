// Critical CSS for immediate loading - prevents FOUC and navigation issues
export function getCriticalCSS(): string {
  return `
<style id="critical-css">
/* Critical CSS for Navigation and Layout - Loaded Immediately */

/* Reset and Base Styles */
*,:before,:after {
  box-sizing: border-box;
  border: 0 solid #e5e7eb;
}

html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}

body {
  margin: 0;
  line-height: inherit;
  background-color: #eff6ff;
  color: #1e3a8a;
}

/* Navigation Critical Styles */
nav {
  background-color: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
  border-bottom: 1px solid #e5e7eb;
}

.nav-container {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .nav-container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .nav-container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

/* Logo Styles */
.logo-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: opacity 150ms cubic-bezier(0.4,0,0.2,1);
}

.logo-link:hover {
  opacity: 0.8;
}

.logo-icon {
  color: #2563eb;
  font-size: 1.5rem;
  transition: transform 150ms cubic-bezier(0.4,0,0.2,1);
}

.logo-link:hover .logo-icon {
  transform: scale(1.1);
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e3a8a;
}

.logo-tagline {
  font-size: 0.75rem;
  color: #2563eb;
  display: none;
}

@media (min-width: 640px) {
  .logo-tagline {
    display: block;
  }
}

/* Navigation Menu Styles */
.nav-menu {
  display: none;
  align-items: center;
  justify-content: center;
  flex: 1;
}

@media (min-width: 1024px) {
  .nav-menu {
    display: flex;
  }
}

.nav-menu-items {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-menu-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #1e40af;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 150ms cubic-bezier(0.4,0,0.2,1);
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: relative;
}

.nav-menu-button:hover,
.nav-menu-button:focus {
  color: #2563eb;
  background-color: #eff6ff;
  outline: none;
}

.nav-menu-button:focus {
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.3);
}

/* Dropdown Styles */
.nav-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid #e5e7eb;
  opacity: 0;
  visibility: hidden;
  transition: all 200ms cubic-bezier(0.4,0,0.2,1);
  z-index: 50;
  min-width: 200px;
}

.nav-menu-button:hover + .nav-dropdown,
.nav-dropdown:hover {
  opacity: 1;
  visibility: visible;
}

/* Auth Section */
.nav-auth {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.auth-button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 150ms cubic-bezier(0.4,0,0.2,1);
  text-decoration: none;
  border: none;
  cursor: pointer;
}

.auth-button-primary {
  background: linear-gradient(to right, #2563eb, #1d4ed8);
  color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.auth-button-primary:hover {
  background: linear-gradient(to right, #1d4ed8, #1e40af);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}

.auth-button-secondary {
  color: #2563eb;
  border: 1px solid #bfdbfe;
  background-color: transparent;
}

.auth-button-secondary:hover {
  background-color: #eff6ff;
  border-color: #93c5fd;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: block;
  padding: 0.5rem;
  color: #1e40af;
  background-color: transparent;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 150ms cubic-bezier(0.4,0,0.2,1);
}

@media (min-width: 1024px) {
  .mobile-menu-btn {
    display: none;
  }
}

.mobile-menu-btn:hover,
.mobile-menu-btn:focus {
  color: #2563eb;
  background-color: #eff6ff;
  outline: none;
}

.mobile-menu-btn:focus {
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.3);
}

/* Mobile Menu */
.mobile-menu {
  display: none;
  background-color: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  border-bottom: 1px solid #e5e7eb;
}

@media (max-width: 1023px) {
  .mobile-menu.show {
    display: block;
  }
}

/* Hero Section Critical Styles */
.hero-section {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e3a8a 100%);
  color: #ffffff;
  padding: 4rem 0;
  position: relative;
  overflow: hidden;
}

.hero-container {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  text-align: center;
  position: relative;
  z-index: 10;
}

.hero-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  max-width: 64rem;
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 640px) {
  .hero-title {
    font-size: 3rem;
  }
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 3.75rem;
  }
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 4.5rem;
  }
}

/* Utility Classes */
.hidden {
  display: none !important;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.space-x-2 > :not([hidden]) ~ :not([hidden]) {
  margin-left: 0.5rem;
}

.space-x-3 > :not([hidden]) ~ :not([hidden]) {
  margin-left: 0.75rem;
}

.rounded {
  border-radius: 0.25rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.transition-colors {
  transition: color, background-color, border-color 150ms cubic-bezier(0.4,0,0.2,1);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border-width: 0;
}

.focus\\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

/* Chatbot Widget Critical Styles */
#chatbot-widget {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 50;
}

#chatbot-toggle {
  background-color: #2563eb;
  color: #ffffff;
  padding: 1rem;
  border-radius: 9999px;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
  transition: all 150ms cubic-bezier(0.4,0,0.2,1);
  border: none;
  cursor: pointer;
}

#chatbot-toggle:hover {
  background-color: #1d4ed8;
}

#chatbot-toggle:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.3);
}

#chatbot-window {
  position: absolute;
  bottom: 4rem;
  right: 0;
  width: 20rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid #e5e7eb;
}

/* Animation Classes */
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Ensure content is visible during loading */
main {
  min-height: 100vh;
}

/* Loading state improvements */
.loading-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Force show navigation elements */
nav, .nav-container, .nav-content, .logo-link, .nav-auth, .mobile-menu-btn {
  display: flex !important;
}

.nav-menu {
  display: flex !important;
}

@media (max-width: 1023px) {
  .nav-menu {
    display: none !important;
  }
}

</style>
  `;
}