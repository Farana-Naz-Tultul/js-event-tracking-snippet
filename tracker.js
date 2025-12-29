(function () {
      // --- Mock GTM-style rules (Tags + Triggers) ---
  const trackingConfig = {
    events: [
      { name: "signup_click", trigger: "click", selector: "[data-track='signup_button']" },
      { name: "learn_more_click", trigger: "click", selector: "[data-track='learn_more']" },
      { name: "lead_submit", trigger: "submit", selector: "#leadForm" }
    ]
  };

  // --- Mock GTM Data Layer ---
  window.dataLayer = window.dataLayer || [];

  function pushToDataLayer(event) {
    window.dataLayer.push(event);
    console.log("[DataLayer]", event);
  }

  const Tracker = {
    config: {
      endpoint: "http://localhost:3000/track",
      clientId: "demo-client-123",
      debug: true
    },

    sendEvent(eventType, data = {}) {
      const payload = {
        eventType,
        clientId: this.config.clientId,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        data
      };

      if (this.config.debug) {
        console.log("[Tracker Debug]", payload);
      }

      fetch(this.config.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(error => {
        console.error("Tracking Error:", error);
      });
    },

    trackPageView() {
      this.sendEvent("page_view");
    },

    //Replacing wwith new GTM method//
    /*
    trackClicks() {
      document.addEventListener("click", event => {
        const target = event.target.closest("[data-track]");
        if (!target) return;

        this.sendEvent("click", {
          element: target.tagName,
          label: target.getAttribute("data-track")
        });
      });
    },

    trackFormSubmits() {
      document.addEventListener("submit", event => {
        const form = event.target;
        if (!form.matches("#leadForm")) return;

        event.preventDefault(); // prevent page reload (demo only)

        const emailInput = form.querySelector('input[name="email"]');

        this.sendEvent("form_submit", {
          formId: form.id,
          emailProvided: Boolean(emailInput && emailInput.value)
        });
      });
    },
    */

    trackEvents() {
      // Click triggers
      document.addEventListener("click", event => {
        trackingConfig.events.forEach(rule => {
          if (rule.trigger !== "click") return;

          const match = event.target.closest(rule.selector);
          if (!match) return;

          const payload = {
            event: rule.name,
            element: match.tagName,
            label: match.getAttribute("data-track") || null,
            timestamp: new Date().toISOString()
          };

          pushToDataLayer(payload);
          this.sendEvent(rule.name, payload);
        });
      });

      // Submit triggers
      document.addEventListener("submit", event => {
        trackingConfig.events.forEach(rule => {
          if (rule.trigger !== "submit") return;
          if (!event.target.matches(rule.selector)) return;

          event.preventDefault(); // demo only

          const emailInput = event.target.querySelector('input[name="email"]');

          const payload = {
            event: rule.name,
            formId: event.target.id,
            emailProvided: Boolean(emailInput && emailInput.value),
            timestamp: new Date().toISOString()
          };

          pushToDataLayer(payload);
          this.sendEvent(rule.name, payload);
        });
      });
    },


    init() {
      this.trackPageView();
      this.trackEvents();
    }
  };

  Tracker.init();
})();
