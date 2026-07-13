/**
 * SEO Service
 * This service handles advanced SEO features for the FL Sculptures platform
 */

const SEOService = {
  /**
   * Generate structured data (JSON-LD) for the page
   */
  generateStructuredData(type, data) {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    };
    
    // Add or update JSON-LD script tag
    let scriptTag = document.getElementById('structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'structured-data';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    
    scriptTag.textContent = JSON.stringify(structuredData);
  },
  
  /**
   * Generate product structured data
   */
  generateProductSchema(product) {
    this.generateStructuredData('Product', {
      name: product.name,
      description: product.description,
      image: product.image,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'EUR',
        availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: window.location.href
      },
      category: product.category,
      brand: {
        '@type': 'Brand',
        name: 'FL Sculptures'
      },
      manufacturer: {
        '@type': 'Person',
        name: 'FL'
      }
    });
  },
  
  /**
   * Generate organization structured data
   */
  generateOrganizationSchema() {
    this.generateStructuredData('Organization', {
      name: 'FL Sculptures',
      url: window.location.origin,
      logo: window.location.origin + '/logo.png',
      description: 'Contemporary sculpture gallery and artist studio',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'FR'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'contact@fl-sculptures.com'
      }
    });
  },
  
  /**
   * Generate website structured data
   */
  generateWebsiteSchema() {
    this.generateStructuredData('WebSite', {
      name: 'FL Sculptures',
      url: window.location.origin,
      description: 'Contemporary sculpture gallery featuring unique bronze, stone, and wood artworks',
      potentialAction: {
        '@type': 'SearchAction',
        target: window.location.origin + '/collection.html?search={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    });
  },
  
  /**
   * Generate breadcrumb structured data
   */
  generateBreadcrumbSchema(items) {
    const breadcrumbItems = items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }));
    
    this.generateStructuredData('BreadcrumbList', {
      itemListElement: breadcrumbItems
    });
  },
  
  /**
   * Update page meta tags dynamically
   */
  updateMetaTags(title, description, keywords, image = null) {
    document.title = title;
    
    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;
    
    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords;
    
    // Update Open Graph tags
    this.updateOGTag('title', title);
    this.updateOGTag('description', description);
    if (image) {
      this.updateOGTag('image', image);
    }
    
    // Update Twitter Card tags
    this.updateTwitterTag('title', title);
    this.updateTwitterTag('description', description);
    if (image) {
      this.updateTwitterTag('image', image);
    }
  },
  
  /**
   * Update Open Graph tag
   */
  updateOGTag(property, content) {
    let tag = document.querySelector(`meta[property="og:${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', `og:${property}`);
      document.head.appendChild(tag);
    }
    tag.content = content;
  },
  
  /**
   * Update Twitter Card tag
   */
  updateTwitterTag(name, content) {
    let tag = document.querySelector(`meta[name="twitter:${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', `twitter:${name}`);
      document.head.appendChild(tag);
    }
    tag.content = content;
  },
  
  /**
   * Add canonical URL
   */
  setCanonicalUrl(url) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  },
  
  /**
   * Generate sitemap XML (for manual use or export)
   */
  generateSitemap(pages) {
    const currentDate = new Date().toISOString().split('T')[0];
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq || 'monthly'}</changefreq>
    <priority>${page.priority || 0.5}</priority>
  </url>`).join('\n')}
</urlset>`;
    
    return sitemap;
  },
  
  /**
   * Generate robots.txt content
   */
  generateRobotsTxt() {
    return `User-agent: *
Allow: /
Disallow: /account.html
Disallow: /checkout.html

Sitemap: ${window.location.origin}/sitemap.xml`;
  },
  
  /**
   * Track page view (for analytics integration)
   */
  trackPageView(pageName) {
    // This can be extended with Google Analytics or other tracking
    console.log('Page view tracked:', pageName);
    
    // Store page view in localStorage for analytics
    const pageViews = JSON.parse(localStorage.getItem('fl_pageViews')) || {};
    pageViews[pageName] = (pageViews[pageName] || 0) + 1;
    localStorage.setItem('fl_pageViews', JSON.stringify(pageViews));
  },
  
  /**
   * Track event (for analytics integration)
   */
  trackEvent(category, action, label = null, value = null) {
    const event = {
      category,
      action,
      label,
      value,
      timestamp: new Date().toISOString()
    };
    
    console.log('Event tracked:', event);
    
    // Store event in localStorage for analytics
    const events = JSON.parse(localStorage.getItem('fl_events')) || [];
    events.push(event);
    localStorage.setItem('fl_events', JSON.stringify(events));
  }
};
