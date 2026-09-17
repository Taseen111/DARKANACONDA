/* DARKANACONDA PROJECT CALCULATOR — V23
   Single-source pricing, deterministic package/service modes,
   accessible controls, and no inline JavaScript requirements.
*/
(function () {
  "use strict";

  var fallback = {
    currency: "AUD",
    completeBuildPrice: 3498,
    maintenanceMonthly: 99,
    packages: {
      starter: { key: "starter", label: "Starter", name: "Landing Page", price: 499, included: ["mobile","contact","basic-seo","performance","design"] },
      business: { key: "business", label: "Business", name: "Business Website", price: 999, included: ["mobile","contact","basic-seo","performance","design","whatsapp","maps","five-pages","performance-optimisation","security","business-structure","analytics"] },
      custom: { key: "custom", label: "Custom", name: "Custom Solution", price: 0, included: [] }
    },
    standaloneServices: {
      "website-redesign": { id: "website-redesign", name: "Website Redesign", price: 699, recurring: false },
      "mobile-responsive-design": { id: "mobile", name: "Mobile Responsive Design", price: 299, recurring: false },
      "basic-seo": { id: "basic-seo", name: "Basic SEO", price: 199, recurring: false },
      "website-maintenance": { id: "website-maintenance", name: "Website Maintenance", price: 99, recurring: true }
    },
    plannerOptions: [
      {id:"mobile",name:"Mobile Responsive Design",price:299},{id:"contact",name:"Contact / Enquiry System",price:50},
      {id:"basic-seo",name:"Basic SEO Setup",price:50},{id:"performance",name:"Fast Performance",price:25},
      {id:"design",name:"Professional Design",price:75},{id:"whatsapp",name:"WhatsApp Integration",price:50},
      {id:"maps",name:"Google Maps Integration",price:25},{id:"five-pages",name:"Up to 5 Pages",price:150},
      {id:"performance-optimisation",name:"Performance Optimisation",price:75},{id:"security",name:"Basic Security",price:50},
      {id:"business-structure",name:"Business Structure",price:75},{id:"analytics",name:"Analytics Setup",price:75},
      {id:"additional-page",name:"Additional Website Page",price:100},{id:"website-redesign",name:"Website Redesign",price:699},
      {id:"advanced-seo",name:"Advanced SEO",price:300},{id:"ecommerce",name:"E-commerce",price:500},
      {id:"booking",name:"Booking System",price:200},{id:"copywriting",name:"Copywriting",price:150},
      {id:"photography",name:"Professional Photography",price:250},{id:"integrations",name:"Advanced Integrations",price:300}
    ]
  };

  var pricing = window.DA_PRICING;
  if (!pricing || !pricing.packages || !Array.isArray(pricing.plannerOptions)) pricing = fallback;
  if (!pricing.standaloneServices) pricing.standaloneServices = fallback.standaloneServices;

  var packages = pricing.packages;
  var services = pricing.plannerOptions;
  var params = new URLSearchParams(window.location.search);
  var requestedPackage = params.get("package");
  var requestedService = params.get("service");
  var standalone = pricing.standaloneServices || {};
  var serviceMode = standalone[requestedService] ? requestedService : null;

  function readPackage() {
    try {
      var stored = sessionStorage.getItem("daPackage");
      if (requestedPackage && packages[requestedPackage]) return requestedPackage;
      if (stored && packages[stored]) return stored;
    } catch (e) {}
    return "business";
  }

  var packageKey = readPackage();
  if (!serviceMode) {
    try { sessionStorage.setItem("daPackage", packageKey); } catch (e) {}
  }

  var options = document.getElementById("options");
  var totalEl = document.getElementById("total");
  var breakdown = document.getElementById("breakdown");
  var baseName = document.getElementById("baseName");
  var intro = document.getElementById("packageIntro");
  var nextBtn = document.getElementById("nextBtn");
  var selectionStep = document.getElementById("selectionStep");

  if (!options || !totalEl || !breakdown || !baseName || !intro || !nextBtn) return;

  function money(value) {
    return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(Number(value) || 0);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c];
    });
  }

  function addRow(item, included, checked) {
    var row = document.createElement("div");
    row.className = "project-option" + (included ? " is-included" : " is-extra") + (checked ? " is-selected" : "");
    row.dataset.id = item.id;
    row.dataset.name = item.name;
    row.dataset.price = String(item.price);
    row.dataset.kind = included ? "included" : "extra";
    row.tabIndex = 0;
    row.setAttribute("role", "checkbox");
    row.setAttribute("aria-checked", String(checked));

    row.innerHTML = '<label><input type="checkbox"' + (checked ? " checked" : "") + '><span class="custom-check" aria-hidden="true">✓</span><span class="project-option-name">' + escapeHtml(item.name) + '</span></label><strong>' + (included ? "Included" : "+" + money(item.price)) + '</strong>';

    var input = row.querySelector("input");

    function sync() {
      row.classList.toggle("is-selected", input.checked);
      row.setAttribute("aria-checked", String(input.checked));
    }

    // The label owns native checkbox toggling. Only clicks outside the label toggle the row.
    row.addEventListener("click", function (event) {
      if (event.target.closest("label")) return;
      input.checked = !input.checked;
      sync();
      update();
    });

    row.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target === input) return;
      event.preventDefault();
      input.checked = !input.checked;
      sync();
      update();
    });

    input.addEventListener("change", function () {
      sync();
      update();
    });

    options.appendChild(row);
  }

  function selectedRows() {
    return Array.from(options.querySelectorAll(".project-option")).filter(function (row) {
      return row.querySelector("input").checked;
    }).map(function (row) {
      return { id: row.dataset.id, name: row.dataset.name, price: Number(row.dataset.price) || 0, included: row.dataset.kind === "included" };
    });
  }

  function saveEstimate(data) {
    try { sessionStorage.setItem("daEstimate", JSON.stringify(data)); } catch (e) {}
  }

  function update() {
    var all = selectedRows();
    var extras = all.filter(function (item) { return !item.included; });
    var extraTotal = extras.reduce(function (sum, item) { return sum + item.price; }, 0);
    var allSelected = all.length === services.length;
    var lines = [];

    if (serviceMode) {
      var svc = standalone[serviceMode];
      var total = svc.price + extraTotal;
      lines.push('<div class="project-line"><span>' + escapeHtml(svc.name) + (svc.recurring ? " (monthly)" : "") + '</span><strong>' + money(svc.price) + (svc.recurring ? " /mo" : "") + '</strong></div>');
      extras.forEach(function (item) { lines.push('<div class="project-line"><span>' + escapeHtml(item.name) + '</span><strong>+ ' + money(item.price) + '</strong></div>'); });
      breakdown.innerHTML = lines.join("");
      totalEl.textContent = money(total) + (svc.recurring ? " /mo" : "") + " AUD";
      saveEstimate({ version:23, mode:"service", serviceKey:serviceMode, serviceName:svc.name, basePrice:svc.price, recurring:svc.recurring, selectedServices:all, total:total, totalLabel:money(total) + (svc.recurring ? " /mo" : "") + " AUD" });
      return;
    }

    var pkg = packages[packageKey] || packages.business;
    var oneTime;
    if (allSelected) oneTime = Number(pricing.completeBuildPrice) || 3498;
    else if (packageKey === "custom") oneTime = extraTotal;
    else oneTime = Number(pkg.price) + extraTotal;

    if (packageKey === "custom") {
      lines.push('<div class="project-line"><span>Custom Solution</span><strong>' + (all.length ? money(oneTime) : "Let’s Talk") + '</strong></div>');
    } else {
      lines.push('<div class="project-line"><span>' + escapeHtml(pkg.label + " — " + pkg.name) + '</span><strong>' + money(pkg.price) + '</strong></div>');
    }

    extras.forEach(function (item) { lines.push('<div class="project-line"><span>' + escapeHtml(item.name) + '</span><strong>+ ' + money(item.price) + '</strong></div>'); });

    var unchecked = (pkg.included || []).filter(function (id) { return !all.some(function (item) { return item.id === id; }); });
    if (unchecked.length) lines.push('<div class="project-line project-included-removed"><span>Included features unchecked</span><strong>' + unchecked.length + '</strong></div>');
    if (allSelected) lines.push('<div class="project-line"><span>All 20 project services selected</span><strong>Same total: ' + money(pricing.completeBuildPrice) + '</strong></div>');

    breakdown.innerHTML = lines.join("");
    totalEl.textContent = packageKey === "custom" && all.length === 0 ? "Let’s Talk" : money(oneTime) + " AUD";
    saveEstimate({ version:23, mode:"package", packageKey:packageKey, packageLabel:pkg.label, packageName:pkg.name, basePrice:Number(pkg.price)||0, includedServices:pkg.included||[], selectedServices:all, allServicesSelected:allSelected, completeBuildPrice:Number(pricing.completeBuildPrice)||3498, total:oneTime, totalLabel:packageKey === "custom" && all.length === 0 ? "Let's Talk" : money(oneTime) + " AUD" });
  }

  if (serviceMode) {
    var svc = standalone[serviceMode];
    baseName.textContent = svc.name;
    intro.textContent = svc.recurring ? "You selected Website Maintenance at the advertised monthly price. It is already selected below. Add any additional project services you need." : "You selected this service at its advertised starting price. It is already selected below. Add any additional project services you need.";
    if (selectionStep) selectionStep.textContent = "1. Service selected";
    services.forEach(function (item) { if (item.id !== svc.id) addRow(item, false, false); });
    addRow(svc, true, true);
  } else {
    var pkg = packages[packageKey] || packages.business;
    baseName.textContent = pkg.name;
    intro.textContent = packageKey === "custom" ? "Choose any of the 20 project services. Custom has no included package features." : "Your " + pkg.label + " package includes the blue features below. Add anything else you need.";
    var included = new Set(pkg.included || []);
    services.forEach(function (item) { addRow(item, included.has(item.id), included.has(item.id)); });
  }

  update();
  nextBtn.addEventListener("click", function () { window.location.href = "project-details.html"; });
})();
