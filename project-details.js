/* DARKANACONDA PROJECT DETAILS — V22 */
(function () {
  "use strict";

  var estimate = null;
  try { estimate = JSON.parse(sessionStorage.getItem("daEstimate") || "null"); } catch (e) {}

  if (!estimate) {
    window.location.href = "project-calculator.html?package=business";
    return;
  }

  var pricing = window.DA_PRICING || { plannerOptions: [] };
  var catalog = Array.isArray(pricing.plannerOptions) ? pricing.plannerOptions : [];
  var money = function (n) {
    return new Intl.NumberFormat("en-AU", {
      style:"currency", currency:"AUD", maximumFractionDigits:0
    }).format(Number(n) || 0);
  };

  var summaryPackage = document.getElementById("summaryPackage");
  var summaryTotal = document.getElementById("summaryTotal");
  var summaryServices = document.getElementById("summaryServices");
  var estimatedTotal = document.getElementById("estimatedTotal");
  var selectedPackage = document.getElementById("selectedPackage");
  var includedServices = document.getElementById("includedServices");
  var selectedIncludedServices = document.getElementById("selectedIncludedServices");
  var selectedServices = document.getElementById("selectedServices");

  if (summaryPackage) summaryPackage.textContent = estimate.packageName || estimate.serviceName || "Custom Solution";
  if (summaryTotal) summaryTotal.textContent = estimate.totalLabel || (money(estimate.total) + " AUD");

  var included = Array.isArray(estimate.includedServices) ? estimate.includedServices : [];
  var selected = Array.isArray(estimate.selectedServices) ? estimate.selectedServices : [];
  var selectedIncluded = selected.filter(function (x) { return x.included; }).map(function (x) { return x.name; });
  var extras = selected.filter(function (x) { return !x.included; });
  var rows = [];

  if (estimate.mode === "package" && estimate.packageKey !== "custom") {
    rows.push('<div class="summary-group"><strong>Included with package</strong></div>');
    included.forEach(function (id) {
      var item = catalog.find(function (x) { return x.id === id; });
      var label = item ? item.name : id;
      rows.push('<div class="summary-item included-item"><span class="summary-tick">✓</span><span>' +
        label + (selectedIncluded.indexOf(label) >= 0 ? "" : " <em>(unchecked — package price unchanged)</em>") +
        '</span></div>');
    });
  }

  if (estimate.mode === "service") {
    rows.push('<div class="summary-group"><strong>Selected service</strong></div>');
    rows.push('<div class="summary-item included-item"><span class="summary-tick">✓</span><span>' +
      (estimate.serviceName || "Selected service") + '</span></div>');
  }

  if (extras.length) {
    rows.push('<div class="summary-group"><strong>Additional services</strong></div>');
    extras.forEach(function (x) {
      rows.push('<div class="summary-item"><span>' + x.name + '</span><strong>+ ' +
        money(x.price) + (x.recurring ? "/mo" : "") + '</strong></div>');
    });
  }

  if (!rows.length) {
    rows.push('<div class="summary-item"><span>No additional services selected.</span></div>');
  }

  if (estimate.allServicesSelected) {
    rows.push('<div class="summary-group"><strong>Complete catalogue</strong></div><div class="summary-item"><span>All available services selected</span><strong>' +
      money(estimate.completeBuildPrice) + ' AUD</strong></div>');
  }

  if (summaryServices) summaryServices.innerHTML = rows.join("");
  if (estimatedTotal) estimatedTotal.value = estimate.totalLabel || (money(estimate.total) + " AUD");
  if (selectedPackage) selectedPackage.value = estimate.packageName || estimate.serviceName || "Custom Solution";
  if (includedServices) includedServices.value = included.map(function (id) {
    var item = catalog.find(function (x) { return x.id === id; });
    return item ? item.name : id;
  }).join(", ") || "None";
  if (selectedIncludedServices) selectedIncludedServices.value = selectedIncluded.join(", ") || "None";
  if (selectedServices) selectedServices.value = extras.map(function (x) {
    return x.name + " ($" + x.price + (x.recurring ? "/month" : "") + ")";
  }).join(", ") || "None";

  var form = document.getElementById("projectForm");
  if (!form) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    var status = document.getElementById("formStatus");
    if (!status) return;

    status.className = "project-status";
    status.textContent = "Sending…";

    try {
      var response = await fetch(form.action, {
        method:"POST",
        body:new FormData(form),
        headers:{Accept:"application/json"}
      });
      if (!response.ok) throw new Error("Form submission failed");

      status.className = "project-status project-success";
      status.textContent = "Thanks. Your project enquiry has been sent. We will review it and get back to you.";
      form.reset();
      sessionStorage.removeItem("daEstimate");
      sessionStorage.removeItem("daPackage");
    } catch (error) {
      status.className = "project-status project-error";
      status.textContent = "We could not send your enquiry right now. Please try again or contact us directly by email or WhatsApp.";
    }
  });
})();
