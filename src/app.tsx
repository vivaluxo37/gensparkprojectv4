// Clean, modular main application file - Complete architectural refactor
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';
import type { Bindings } from './types';

// Import all route modules in order of specificity (most specific first)
import { authRoutes } from './routes/authRoutes';
import { apiRoutes } from './routes/apiRoutes';
import { brokerRoutes } from './routes/brokerRoutes';
import { pageRoutes } from './routes/pageRoutes';

// Import CSS
import './styles.css';

const app = new Hono<{ Bindings: Bindings }>();

// Global middleware
// Enable CORS for all API routes
app.use('/api/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Serve static files properly
app.use('/static/*', serveStatic({ 
  root: './dist'
}));

// Function to inline CSS directly into HTML
const getInlineCSS = async () => {
  try {
    const { readFile } = await import('fs/promises');
    const cssContent = await readFile('./dist/static/styles.css', 'utf-8');
    return `<style>${cssContent}</style>`;
  } catch (error) {
    console.error('Error reading CSS file:', error);
    return '<style>/* CSS file not found */</style>';
  }
};

// Inline CSS route - return hardcoded comprehensive CSS (no file reading needed)
app.get('/inline-css', (c) => {
  const comprehensiveCSS = `*,:before,:after{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content:""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}html{scroll-behavior:smooth}body{--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1));font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";--tw-text-opacity:1;color:rgb(17 24 39 / var(--tw-text-opacity, 1))}h1,h2,h3,h4,h5,h6{font-weight:600}h1{font-size:2.25rem;line-height:2.5rem}@media (min-width: 1024px){h1{font-size:3rem;line-height:1}}h2{font-size:1.875rem;line-height:2.25rem}@media (min-width: 1024px){h2{font-size:2.25rem;line-height:2.5rem}}h3{font-size:1.5rem;line-height:2rem}@media (min-width: 1024px){h3{font-size:1.875rem;line-height:2.25rem}}h4{font-size:1.25rem;line-height:1.75rem}@media (min-width: 1024px){h4{font-size:1.5rem;line-height:2rem}}h5{font-size:1.125rem;line-height:1.75rem}@media (min-width: 1024px){h5{font-size:1.25rem;line-height:1.75rem}}h6{font-size:1rem;line-height:1.5rem}@media (min-width: 1024px){h6{font-size:1.125rem;line-height:1.75rem}}p{font-size:1rem;line-height:1.5rem;line-height:1.625}a{--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity, 1));transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.2s}a:hover{--tw-text-opacity:1;color:rgb(29 78 216 / var(--tw-text-opacity, 1))}button,input,textarea,select{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.2s}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.visible{visibility:visible}.invisible{visibility:hidden}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.sticky{position:sticky}.inset-0{inset:0}.bottom-0{bottom:0}.bottom-16{bottom:4rem}.bottom-6{bottom:1.5rem}.left-0{left:0}.left-4{left:1rem}.right-0{right:0}.right-4{right:1rem}.right-6{right:1.5rem}.top-0{top:0}.top-20{top:5rem}.top-4{top:1rem}.z-10{z-index:10}.z-50{z-index:50}.col-span-3{grid-column:span 3 / span 3}.col-span-full{grid-column:1 / -1}.mx-2{margin-left:.5rem;margin-right:.5rem}.mx-auto{margin-left:auto;margin-right:auto}.my-1{margin-top:.25rem;margin-bottom:.25rem}.my-2{margin-top:.5rem;margin-bottom:.5rem}.my-8{margin-top:2rem;margin-bottom:2rem}.mb-1{margin-bottom:.25rem}.mb-12{margin-bottom:3rem}.mb-16{margin-bottom:4rem}.mb-2{margin-bottom:.5rem}.mb-3{margin-bottom:.75rem}.mb-4{margin-bottom:1rem}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.ml-0{margin-left:0}.ml-1{margin-left:.25rem}.ml-2{margin-left:.5rem}.ml-3{margin-left:.75rem}.ml-4{margin-left:1rem}.mr-1{margin-right:.25rem}.mr-2{margin-right:.5rem}.mr-3{margin-right:.75rem}.mr-4{margin-right:1rem}.mt-1{margin-top:.25rem}.mt-12{margin-top:3rem}.mt-16{margin-top:4rem}.mt-2{margin-top:.5rem}.mt-3{margin-top:.75rem}.mt-4{margin-top:1rem}.mt-6{margin-top:1.5rem}.mt-8{margin-top:2rem}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.grid{display:grid}.hidden{display:none}.h-10{height:2.5rem}.h-12{height:3rem}.h-16{height:4rem}.h-2{height:.5rem}.h-20{height:5rem}.h-24{height:6rem}.h-4{height:1rem}.h-40{height:10rem}.h-5{height:1.25rem}.h-6{height:1.5rem}.h-64{height:16rem}.h-8{height:2rem}.h-96{height:24rem}.h-full{height:100%}.max-h-32{max-height:8rem}.max-h-40{max-height:10rem}.max-h-48{max-height:12rem}.max-h-64{max-height:16rem}.max-h-80{max-height:20rem}.min-h-screen{min-height:100vh}.w-10{width:2.5rem}.w-12{width:3rem}.w-16{width:4rem}.w-2{width:.5rem}.w-20{width:5rem}.w-24{width:6rem}.w-4{width:1rem}.w-48{width:12rem}.w-5{width:1.25rem}.w-56{width:14rem}.w-6{width:1.5rem}.w-64{width:16rem}.w-72{width:18rem}.w-8{width:2rem}.w-80{width:20rem}.w-full{width:100%}.min-w-full{min-width:100%}.max-w-2xl{max-width:42rem}.max-w-3xl{max-width:48rem}.max-w-4xl{max-width:56rem}.max-w-5xl{max-width:64rem}.max-w-6xl{max-width:72rem}.max-w-7xl{max-width:80rem}.max-w-lg{max-width:32rem}.max-w-md{max-width:28rem}.max-w-none{max-width:none}.max-w-xs{max-width:20rem}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.cursor-pointer{cursor:pointer}.resize{resize:both}.list-inside{list-style-position:inside}.list-decimal{list-style-type:decimal}.list-disc{list-style-type:disc}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-0{gap:0px}.gap-1{gap:.25rem}.gap-12{gap:3rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}.gap-6{gap:1.5rem}.gap-8{gap:2rem}.space-x-1>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(.25rem * var(--tw-space-x-reverse));margin-left:calc(.25rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(.5rem * var(--tw-space-x-reverse));margin-left:calc(.5rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-3>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(.75rem * var(--tw-space-x-reverse));margin-left:calc(.75rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-4>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(1rem * var(--tw-space-x-reverse));margin-left:calc(1rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-6>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(1.5rem * var(--tw-space-x-reverse));margin-left:calc(1.5rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-8>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(2rem * var(--tw-space-x-reverse));margin-left:calc(2rem * calc(1 - var(--tw-space-x-reverse)))}.space-y-1>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.25rem * var(--tw-space-y-reverse))}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem * var(--tw-space-y-reverse))}.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.75rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.75rem * var(--tw-space-y-reverse))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem * var(--tw-space-y-reverse))}.space-y-6>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.5rem * var(--tw-space-y-reverse))}.space-y-8>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(2rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(2rem * var(--tw-space-y-reverse))}.divide-y>:not([hidden])~:not([hidden]){--tw-divide-y-reverse:0;border-top-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)));border-bottom-width:calc(1px * var(--tw-divide-y-reverse))}.divide-gray-100>:not([hidden])~:not([hidden]){--tw-divide-opacity:1;border-color:rgb(243 244 246 / var(--tw-divide-opacity, 1))}.divide-gray-200>:not([hidden])~:not([hidden]){--tw-divide-opacity:1;border-color:rgb(229 231 235 / var(--tw-divide-opacity, 1))}.overflow-auto{overflow:auto}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.overflow-y-auto{overflow-y:auto}.whitespace-nowrap{white-space:nowrap}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:1rem}.rounded-3xl{border-radius:1.5rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-md{border-radius:.375rem}.rounded-xl{border-radius:.75rem}.border{border-width:1px}.border-2{border-width:2px}.border-4{border-width:4px}.border-8{border-width:8px}.border-b{border-bottom-width:1px}.border-b-2{border-bottom-width:2px}.border-l{border-left-width:1px}.border-l-2{border-left-width:2px}.border-r{border-right-width:1px}.border-r-2{border-right-width:2px}.border-t{border-top-width:1px}.border-t-2{border-top-width:2px}.border-blue-100{--tw-border-opacity:1;border-color:rgb(219 234 254 / var(--tw-border-opacity, 1))}.border-blue-200{--tw-border-opacity:1;border-color:rgb(191 219 254 / var(--tw-border-opacity, 1))}.border-blue-300{--tw-border-opacity:1;border-color:rgb(147 197 253 / var(--tw-border-opacity, 1))}.border-blue-400{--tw-border-opacity:1;border-color:rgb(96 165 250 / var(--tw-border-opacity, 1))}.border-blue-500{--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity, 1))}.border-blue-600{--tw-border-opacity:1;border-color:rgb(37 99 235 / var(--tw-border-opacity, 1))}.border-gray-100{--tw-border-opacity:1;border-color:rgb(243 244 246 / var(--tw-border-opacity, 1))}.border-gray-200{--tw-border-opacity:1;border-color:rgb(229 231 235 / var(--tw-border-opacity, 1))}.border-gray-300{--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity, 1))}.border-gray-400{--tw-border-opacity:1;border-color:rgb(156 163 175 / var(--tw-border-opacity, 1))}.border-gray-500{--tw-border-opacity:1;border-color:rgb(107 114 128 / var(--tw-border-opacity, 1))}.border-transparent{border-color:transparent}.bg-blue-50{--tw-bg-opacity:1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}.bg-blue-100{--tw-bg-opacity:1;background-color:rgb(219 234 254 / var(--tw-bg-opacity, 1))}.bg-blue-200{--tw-bg-opacity:1;background-color:rgb(191 219 254 / var(--tw-bg-opacity, 1))}.bg-blue-300{--tw-bg-opacity:1;background-color:rgb(147 197 253 / var(--tw-bg-opacity, 1))}.bg-blue-400{--tw-bg-opacity:1;background-color:rgb(96 165 250 / var(--tw-bg-opacity, 1))}.bg-blue-500{--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity, 1))}.bg-blue-600{--tw-bg-opacity:1;background-color:rgb(37 99 235 / var(--tw-bg-opacity, 1))}.bg-blue-700{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity, 1))}.bg-blue-800{--tw-bg-opacity:1;background-color:rgb(30 64 175 / var(--tw-bg-opacity, 1))}.bg-blue-900{--tw-bg-opacity:1;background-color:rgb(30 58 138 / var(--tw-bg-opacity, 1))}.bg-gray-50{--tw-bg-opacity:1;background-color:rgb(249 250 251 / var(--tw-bg-opacity, 1))}.bg-gray-100{--tw-bg-opacity:1;background-color:rgb(243 244 246 / var(--tw-bg-opacity, 1))}.bg-gray-200{--tw-bg-opacity:1;background-color:rgb(229 231 235 / var(--tw-bg-opacity, 1))}.bg-gray-300{--tw-bg-opacity:1;background-color:rgb(209 213 219 / var(--tw-bg-opacity, 1))}.bg-gray-400{--tw-bg-opacity:1;background-color:rgb(156 163 175 / var(--tw-bg-opacity, 1))}.bg-gray-500{--tw-bg-opacity:1;background-color:rgb(107 114 128 / var(--tw-bg-opacity, 1))}.bg-gray-600{--tw-bg-opacity:1;background-color:rgb(75 85 99 / var(--tw-bg-opacity, 1))}.bg-gray-700{--tw-bg-opacity:1;background-color:rgb(55 65 81 / var(--tw-bg-opacity, 1))}.bg-gray-800{--tw-bg-opacity:1;background-color:rgb(31 41 55 / var(--tw-bg-opacity, 1))}.bg-gray-900{--tw-bg-opacity:1;background-color:rgb(17 24 39 / var(--tw-bg-opacity, 1))}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.bg-transparent{background-color:transparent}.bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}.bg-gradient-to-br{background-image:linear-gradient(to bottom right,var(--tw-gradient-stops))}.shadow{--tw-shadow:0 1px 3px 0 rgb(0 0 0 / .1),0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px rgb(0 0 0 / .1),0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-xl{--tw-shadow:0 20px 25px -5px rgb(0 0 0 / .1),0 8px 10px -6px rgb(0 0 0 / .1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-sm{--tw-shadow:0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px rgb(0 0 0 / .1),0 2px 4px -2px rgb(0 0 0 / .1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.text-xs{font-size:.75rem;line-height:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-4xl{font-size:2.25rem;line-height:2.5rem}.text-5xl{font-size:3rem;line-height:1}.text-6xl{font-size:3.75rem;line-height:1}.font-thin{font-weight:100}.font-extralight{font-weight:200}.font-light{font-weight:300}.font-normal{font-weight:400}.font-medium{font-weight:500}.font-semibold{font-weight:600}.font-bold{font-weight:700}.font-extrabold{font-weight:800}.font-black{font-weight:900}.text-blue-50{--tw-text-opacity:1;color:rgb(239 246 255 / var(--tw-text-opacity, 1))}.text-blue-100{--tw-text-opacity:1;color:rgb(219 234 254 / var(--tw-text-opacity, 1))}.text-blue-200{--tw-text-opacity:1;color:rgb(191 219 254 / var(--tw-text-opacity, 1))}.text-blue-300{--tw-text-opacity:1;color:rgb(147 197 253 / var(--tw-text-opacity, 1))}.text-blue-400{--tw-text-opacity:1;color:rgb(96 165 250 / var(--tw-text-opacity, 1))}.text-blue-500{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity, 1))}.text-blue-600{--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.text-blue-700{--tw-text-opacity:1;color:rgb(29 78 216 / var(--tw-text-opacity, 1))}.text-blue-800{--tw-text-opacity:1;color:rgb(30 64 175 / var(--tw-text-opacity, 1))}.text-blue-900{--tw-text-opacity:1;color:rgb(30 58 138 / var(--tw-text-opacity, 1))}.text-gray-50{--tw-text-opacity:1;color:rgb(249 250 251 / var(--tw-text-opacity, 1))}.text-gray-100{--tw-text-opacity:1;color:rgb(243 244 246 / var(--tw-text-opacity, 1))}.text-gray-200{--tw-text-opacity:1;color:rgb(229 231 235 / var(--tw-text-opacity, 1))}.text-gray-300{--tw-text-opacity:1;color:rgb(209 213 219 / var(--tw-text-opacity, 1))}.text-gray-400{--tw-text-opacity:1;color:rgb(156 163 175 / var(--tw-text-opacity, 1))}.text-gray-500{--tw-text-opacity:1;color:rgb(107 114 128 / var(--tw-text-opacity, 1))}.text-gray-600{--tw-text-opacity:1;color:rgb(75 85 99 / var(--tw-text-opacity, 1))}.text-gray-700{--tw-text-opacity:1;color:rgb(55 65 81 / var(--tw-text-opacity, 1))}.text-gray-800{--tw-text-opacity:1;color:rgb(31 41 55 / var(--tw-text-opacity, 1))}.text-gray-900{--tw-text-opacity:1;color:rgb(17 24 39 / var(--tw-text-opacity, 1))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.text-black{--tw-text-opacity:1;color:rgb(0 0 0 / var(--tw-text-opacity, 1))}.hover\\:bg-blue-50:hover{--tw-bg-opacity:1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}.hover\\:bg-blue-100:hover{--tw-bg-opacity:1;background-color:rgb(219 234 254 / var(--tw-bg-opacity, 1))}.hover\\:bg-blue-600:hover{--tw-bg-opacity:1;background-color:rgb(37 99 235 / var(--tw-bg-opacity, 1))}.hover\\:bg-blue-700:hover{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity, 1))}.hover\\:bg-gray-50:hover{--tw-bg-opacity:1;background-color:rgb(249 250 251 / var(--tw-bg-opacity, 1))}.hover\\:bg-gray-100:hover{--tw-bg-opacity:1;background-color:rgb(243 244 246 / var(--tw-bg-opacity, 1))}.hover\\:text-blue-600:hover{--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.hover\\:text-blue-700:hover{--tw-text-opacity:1;color:rgb(29 78 216 / var(--tw-text-opacity, 1))}.hover\\:text-gray-900:hover{--tw-text-opacity:1;color:rgb(17 24 39 / var(--tw-text-opacity, 1))}.hover\\:opacity-80:hover{opacity:.8}.focus\\:bg-blue-100:focus{--tw-bg-opacity:1;background-color:rgb(219 234 254 / var(--tw-bg-opacity, 1))}.focus\\:text-blue-600:focus{--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.focus\\:ring-4:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:not-sr-only:focus{position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.group:hover .group-hover\\:scale-110{--tw-scale-x:1.1;--tw-scale-y:1.1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){.sm\\:block{display:block}.sm\\:hidden{display:none}.sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:text-sm{font-size:.875rem;line-height:1.25rem}}@media (min-width: 768px){.md\\:block{display:block}.md\\:flex{display:flex}.md\\:hidden{display:none}.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.md\\:px-8{padding-left:2rem;padding-right:2rem}}@media (min-width: 1024px){.lg\\:block{display:block}.lg\\:flex{display:flex}.lg\\:hidden{display:none}.lg\\:px-8{padding-left:2rem;padding-right:2rem}.lg\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.lg\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.lg\\:text-lg{font-size:1.125rem;line-height:1.75rem}}@media (min-width: 1280px){.xl\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.xl\\:grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}}@media (min-width: 1536px){.\\32xl\\:grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}.\\32xl\\:grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}}`;
  
  c.header('Content-Type', 'text/plain');
  c.header('Cache-Control', 'public, max-age=3600');
  return c.text(comprehensiveCSS);
});

// CSS serving route (fallback)
app.get('/static/styles.css', async (c) => {
  try {
    const { readFile } = await import('fs/promises');
    const cssContent = await readFile('./dist/static/styles.css', 'utf-8');
    
    c.header('Content-Type', 'text/css');
    c.header('Cache-Control', 'public, max-age=3600');
    return c.text(cssContent);
  } catch (error) {
    console.error('Error serving CSS:', error);
    return c.text('/* CSS file not found */', 404);
  }
});

// Legacy data endpoint for backward compatibility
app.get('/data/brokers.json', async (c) => {
  try {
    const { DB } = c.env;
    console.log('Testing database connection...');
    
    // First test basic database connection
    const tables = await DB.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    console.log('Available tables:', tables);
    
    const brokers = await DB.prepare(`
      SELECT 
        id, name, slug, rating, logo_url, website_url, 
        min_deposit_usd, max_leverage, spread_type, is_regulated,
        demo_account, mobile_app, copy_trading, social_trading, headquarters
      FROM brokers
      ORDER BY rating DESC
      LIMIT 5
    `).all();

    console.log('Found brokers:', brokers.results?.length || 0);

    return c.json({
      success: true,
      brokers: brokers.results || [],
      count: brokers.results?.length || 0,
      last_updated: new Date().toISOString(),
      debug: {
        tables: tables.results,
        env_keys: Object.keys(c.env)
      }
    });
  } catch (error) {
    console.error('Data brokers error:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to fetch broker data', 
      message: error.message,
      debug: {
        env_keys: Object.keys(c.env)
      }
    }, 500);
  }
});

// Simple test endpoint to debug database connection
app.get('/test/db', async (c) => {
  try {
    const { DB } = c.env;
    const result = await DB.prepare("SELECT 1 as test").first();
    return c.json({ success: true, result, env: Object.keys(c.env) });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Mount all route modules in order of specificity
// 1. Authentication routes (most specific API routes)
app.route('/', authRoutes);

// 2. Core API routes (recommendations, search, stats, chatbot)
app.route('/', apiRoutes);

// 3. Page routes with specific broker review routes (PRIORITIZED for SEO)
app.route('/', pageRoutes);

// 4. Broker-specific routes (includes /api/brokers, generic /reviews/*, /api/compare)
app.route('/', brokerRoutes);

// Error handling middleware
app.onError((err, c) => {
  console.error('Application error:', err);
  
  if (c.req.url.includes('/api/')) {
    return c.json({ 
      success: false, 
      error: 'Internal server error',
      message: err.message 
    }, 500);
  }
  
  return c.html(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Error - BrokerAnalysis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <div class="min-h-screen flex items-center justify-center px-4">
            <div class="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
                <div class="text-red-600 text-6xl mb-4">⚠️</div>
                <h1 class="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
                <p class="text-gray-600 mb-6">We're experiencing technical difficulties. Please try again later.</p>
                <a href="/" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                    Go Home
                </a>
                <div class="mt-4 text-xs text-gray-400">
                    Error: ${err.message}
                </div>
            </div>
        </div>
    </body>
    </html>
  `, 500);
});

// 404 handler
app.notFound((c) => {
  const isApiRequest = c.req.url.includes('/api/');
  
  if (isApiRequest) {
    return c.json({ 
      success: false, 
      error: 'Endpoint not found',
      path: c.req.path
    }, 404);
  }
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Page Not Found - BrokerAnalysis</title>
        <meta name="description" content="The page you're looking for doesn't exist. Explore our forex broker reviews and comparisons.">
        <link href="/static/styles.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-6xl mx-auto px-4">
                <div class="flex justify-between items-center py-4">
                    <div class="flex items-center">
                        <a href="/" class="text-2xl font-bold text-gray-900">
                            <i class="fas fa-chart-line text-blue-600 mr-2"></i>
                            BrokerAnalysis
                        </a>
                    </div>
                    <div class="hidden md:flex items-center space-x-8">
                        <a href="/reviews" class="text-gray-700 hover:text-blue-600 transition-colors">Reviews</a>
                        <a href="/compare" class="text-gray-700 hover:text-blue-600 transition-colors">Compare</a>
                        <a href="/simulator" class="text-gray-700 hover:text-blue-600 transition-colors">Calculator</a>
                        <a href="/about" class="text-gray-700 hover:text-blue-600 transition-colors">About</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- 404 Content -->
        <div class="min-h-screen flex items-center justify-center px-4">
            <div class="max-w-md w-full text-center">
                <div class="text-blue-600 text-8xl mb-8">🔍</div>
                <h1 class="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <h2 class="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                <p class="text-gray-600 mb-8">
                    The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
                </p>
                
                <div class="space-y-4">
                    <a href="/" class="block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        <i class="fas fa-home mr-2"></i>
                        Go to Homepage
                    </a>
                    <a href="/reviews" class="block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold border border-blue-600 hover:bg-blue-50 transition-colors">
                        <i class="fas fa-star mr-2"></i>
                        Browse Broker Reviews
                    </a>
                    <a href="/compare" class="block bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors">
                        <i class="fas fa-balance-scale mr-2"></i>
                        Compare Brokers
                    </a>
                </div>

                <div class="mt-8 text-sm text-gray-500">
                    <p>Looking for something specific? Try our search or browse popular pages:</p>
                    <div class="flex flex-wrap justify-center gap-2 mt-2">
                        <a href="/reviews/ic-markets" class="text-blue-600 hover:underline">IC Markets</a>
                        <span>•</span>
                        <a href="/reviews/pepperstone" class="text-blue-600 hover:underline">Pepperstone</a>
                        <span>•</span>
                        <a href="/brokers/australia" class="text-blue-600 hover:underline">Australian Brokers</a>
                        <span>•</span>
                        <a href="/simulator" class="text-blue-600 hover:underline">Cost Calculator</a>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `, 404);
});

export default app;