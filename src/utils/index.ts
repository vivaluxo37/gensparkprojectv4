// Utility functions for the broker analysis platform

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export function capitalizeWords(str: string): string {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

export function getCurrentDomain(request?: Request): string {
  // If we have a request object, extract the domain from it
  if (request) {
    const url = new URL(request.url);
    return `${url.protocol}//${url.host}`;
  }
  
  // Fallback to production domain for static generation
  return 'https://brokeranalysis.com';
}

export function generateMetaTags(
  title: string,
  description: string,
  keywords?: string,
  canonical?: string,
  ogImage?: string,
  request?: Request
): string {
  const domain = getCurrentDomain(request);
  const fullCanonical = canonical?.startsWith('http') ? canonical : `${domain}${canonical || ''}`;
  const fullOgImage = ogImage?.startsWith('http') ? ogImage : `${domain}${ogImage || '/static/images/brokeranalysis-og-image.png'}`;
  
  return `
    <title>${title}</title>
    <meta name="description" content="${description}">
    ${keywords ? `<meta name="keywords" content="${keywords}">` : ''}
    ${canonical ? `<link rel="canonical" href="${fullCanonical}">` : ''}
    
    <!-- Open Graph -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:type" content="website">
    ${canonical ? `<meta property="og:url" content="${fullCanonical}">` : ''}
    <meta property="og:image" content="${fullOgImage}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${fullOgImage}">
  `;
}

export function generateStructuredData(data: any): string {
  return `<script type="application/ld+json">${JSON.stringify(data, null, 2)}</script>`;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function generatePagination(
  currentPage: number,
  totalPages: number,
  baseUrl: string
): string {
  if (totalPages <= 1) return '';

  const pages: string[] = [];
  const showPages = 5; // Show 5 page numbers
  
  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
  let endPage = Math.min(totalPages, startPage + showPages - 1);
  
  if (endPage - startPage < showPages - 1) {
    startPage = Math.max(1, endPage - showPages + 1);
  }

  // Previous button
  if (currentPage > 1) {
    pages.push(`
      <a href="${baseUrl}?page=${currentPage - 1}" 
         class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
        Previous
      </a>
    `);
  }

  // Page numbers
  for (let i = startPage; i <= endPage; i++) {
    const isActive = i === currentPage;
    pages.push(`
      <a href="${baseUrl}?page=${i}" 
         class="px-3 py-2 leading-tight ${
           isActive 
             ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700' 
             : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
         }">
        ${i}
      </a>
    `);
  }

  // Next button
  if (currentPage < totalPages) {
    pages.push(`
      <a href="${baseUrl}?page=${currentPage + 1}" 
         class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
        Next
      </a>
    `);
  }

  return `
    <nav aria-label="Pagination Navigation" class="flex justify-center mt-8">
      <ul class="inline-flex -space-x-px">
        ${pages.map(page => `<li>${page}</li>`).join('')}
      </ul>
    </nav>
  `;
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function formatDate(date: Date | string, format: 'short' | 'long' | 'relative' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  switch (format) {
    case 'long':
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    case 'relative':
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - d.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
      return `${Math.floor(diffDays / 365)} years ago`;
    default:
      return d.toLocaleDateString('en-US');
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  waitFor: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => func(...args), waitFor);
  };
}