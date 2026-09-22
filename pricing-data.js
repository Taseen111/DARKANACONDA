/* DARKANACONDA — pricing source of truth (V20)
   Package prices and project-planner option values are intentionally separate:
   package prices are bundle prices; option values are the planner's component values.
   All 20 planner options selected => $3,498 one-time for every route.
   Website Maintenance is recurring and is not part of the one-time total.
*/
window.DA_PRICING = {
  currency: 'AUD',
  completeBuildPrice: 3498,
  maintenanceMonthly: 99,
  packages: {
    starter: {
      key: 'starter', label: 'Starter', name: 'Landing Page', price: 499,
      included: ['mobile','contact','basic-seo','performance','design']
    },
    business: {
      key: 'business', label: 'Business', name: 'Business Website', price: 999,
      included: ['mobile','contact','basic-seo','performance','design','whatsapp','maps','five-pages','performance-optimisation','security','business-structure','analytics']
    },
    custom: {
      key: 'custom', label: 'Custom', name: 'Custom Solution', price: 0,
      included: []
    }
  },
  // Exactly 20 selectable project-planner options.
  // The first 5 sum to $499; the next 7 add $500, making Business $999.
  // The final 8 add $2,499, making the complete catalogue $3,498.
  plannerOptions: [
    { id:'mobile', name:'Mobile Responsive Design', price:299 },
    { id:'contact', name:'Contact / Enquiry System', price:50 },
    { id:'basic-seo', name:'Basic SEO Setup', price:50 },
    { id:'performance', name:'Fast Performance', price:25 },
    { id:'design', name:'Professional Design', price:75 },
    { id:'whatsapp', name:'WhatsApp Integration', price:50 },
    { id:'maps', name:'Google Maps Integration', price:25 },
    { id:'five-pages', name:'Up to 5 Pages', price:150 },
    { id:'performance-optimisation', name:'Performance Optimisation', price:75 },
    { id:'security', name:'Basic Security', price:50 },
    { id:'business-structure', name:'Business Structure', price:75 },
    { id:'analytics', name:'Analytics Setup', price:75 },
    { id:'additional-page', name:'Additional Website Page', price:100 },
    { id:'website-redesign', name:'Website Redesign', price:699 },
    { id:'advanced-seo', name:'Advanced SEO', price:300 },
    { id:'ecommerce', name:'E-commerce', price:500 },
    { id:'booking', name:'Booking System', price:200 },
    { id:'copywriting', name:'Copywriting', price:150 },
    { id:'photography', name:'Professional Photography', price:250 },
    { id:'integrations', name:'Advanced Integrations', price:300 }
  ],

  publicServices: [
    { name:'Business Websites', price:999, path:'services/business-websites.html' },
    { name:'Landing Pages', price:499, path:'services/landing-pages.html' },
    { name:'Website Redesign', price:699, path:'services/website-redesign.html' },
    { name:'Mobile Responsive Design', price:299, path:'services/mobile-responsive-design.html' },
    { name:'Basic SEO', price:199, path:'services/basic-seo.html' },
    { name:'Website Maintenance', price:99, recurring:true, path:'services/website-maintenance.html' },
    { name:'Landing Page', price:499, path:'project-calculator.html?package=starter' },
    { name:'Business Website', price:999, path:'project-calculator.html?package=business' },
    { name:'Custom Solutions', price:0, custom:true, path:'project-calculator.html?package=custom' }
  ]
};
