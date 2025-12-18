// SPA-navigation
function navigate(pageId) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

// Klickbar header -> startsidan (MEN: klick på meny ska inte trigga header-klick)
document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("siteHeader");
    if (header) {
        header.addEventListener("click", (e) => {
            // Om man klickar på menyområdet, låt det hanteras av menyn
            const menuWrap = document.getElementById("menuWrap");
            if (menuWrap && menuWrap.contains(e.target)) return;
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "signup_submit",
  country: (typeof country !== "undefined" ? country : "")
});


            navigate("home");
        });
    }

    // Bind live-fält när DOM finns
    setupLiveBindings();
    setupImagePreviews();

    // Menu + templates + account
    setupDropdownMenu();
    setupTemplateModal();
    populateCountries();

    setupAccountUI();
    setupFeedbackPopup();
});

function nl2br(str) {
    return str.replace(/\n/g, "<br>");
}

// Koppla input -> preview
function bindLive(inputId, previewId, prefix = "", suffix = "") {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    if (!input || !preview) return;

    const update = () => {
        const value = input.value.trim();
        if (!value) {
            preview.innerHTML = "";
        } else {
            preview.innerHTML = prefix + nl2br(value) + suffix;
        }
    };

    input.addEventListener("input", update);
    update(); // initial
}

function setupLiveBindings() {
    // CV
    bindLive("cv_name", "cv_prev_name");
    bindLive("cv_title", "cv_prev_title");
    bindLive("cv_profile", "cv_prev_profile");
    bindLive("cv_exp", "cv_prev_exp");
    bindLive("cv_edu", "cv_prev_edu");
    bindLive("cv_skills", "cv_prev_skills");
    bindLive("cv_languages", "cv_prev_languages");

    // Personligt brev
    bindLive("pb_name", "pb_prev_name");
    bindLive("pb_age", "pb_prev_age", "Ålder: ");
    bindLive("pb_interests", "pb_prev_interests");
    bindLive("pb_story", "pb_prev_story");
    bindLive("pb_why", "pb_prev_why");
}

// Bildförhandsvisning
function liveImage(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    if (!input || !preview) return;

    input.addEventListener("change", () => {
        const file = input.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            preview.src = url;
            preview.style.display = "block";
        } else {
            preview.src = "";
            preview.style.display = "none";
        }
    });
}

function setupImagePreviews() {
    liveImage("cv_img", "cv_img_preview");
    liveImage("pb_img", "pb_img_preview");
}

// Nedladdning (PNG-baserad, kan användas som PDF-underlag)
function downloadPDF(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    html2canvas(element, { scale: 2 }).then(canvas => {
        const link = document.createElement("a");
        link.download = "mitt-dokument.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

/* ---------------------------
   DROPDOWN MENU
---------------------------- */
function setupDropdownMenu() {
    const btn = document.getElementById("menuBtn");
    const menu = document.getElementById("siteMenu");
    if (!btn || !menu) return;

    const openMenu = () => {
        menu.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
    };

    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (menu.classList.contains("open")) closeMenu();
        else openMenu();
    });

    menu.addEventListener("click", (e) => {
        const item = e.target.closest("[data-nav]");
        if (!item) return;
        const pageId = item.getAttribute("data-nav");
        closeMenu();
        navigate(pageId);
    });

    document.addEventListener("click", (e) => {
        const wrap = document.getElementById("menuWrap");
        if (wrap && !wrap.contains(e.target)) closeMenu();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });
}

/* ---------------------------
   CV-EXEMPEL MODAL
---------------------------- */
function setupTemplateModal() {
  const modal = document.getElementById("templateModal");
  const modalBody = document.getElementById("modalBody");
  const grid = document.getElementById("templatesGrid");
  if (!modal || !modalBody || !grid) return;

  const templates = {
    classic: `
      <div class="cv-full cv-full--classic">
        <header class="cv-full__top">
          <div>
            <h2>Alex Andersson</h2>
            <p class="cv-full__meta">Projektledare • Stockholm • alex@email.com • 070-123 45 67</p>
          </div>
        </header>

        <div class="cv-full__grid">
          <section>
            <h3>Profil</h3>
            <p>Strukturerad projektledare med 6+ år inom tech. Driver projekt från discovery till release med fokus på tydlig kommunikation, prioritering och leverans.</p>

            <h3>Erfarenhet</h3>

            <div class="cv-full__job">
              <div class="cv-full__row">
                <strong>Nordic Digital</strong>
                <span class="cv-full__muted">2022–nu</span>
              </div>
              <div class="cv-full__muted">Projektledare</div>
              <ul>
                <li>Ledde 2 tvärfunktionella team (design, dev, QA).</li>
                <li>Förbättrade lead time med 28% genom tydligare sprintplanering.</li>
                <li>Levererade 12+ releaser/år med stabil kvalitet.</li>
              </ul>
            </div>

            <div class="cv-full__job">
              <div class="cv-full__row">
                <strong>BrightOps</strong>
                <span class="cv-full__muted">2019–2022</span>
              </div>
              <div class="cv-full__muted">Junior projektledare</div>
              <ul>
                <li>Koordinerade roadmap och stakeholder-uppföljning.</li>
                <li>Införde enklare uppföljning av scope och risk.</li>
              </ul>
            </div>
          </section>

          <aside class="cv-full__side">
            <h3>Kompetenser</h3>
            <ul>
              <li>Agile / Scrum</li>
              <li>Roadmaps & prioritering</li>
              <li>Stakeholder management</li>
              <li>Budget & scope</li>
            </ul>

            <h3>Utbildning</h3>
            <p><strong>Systemvetenskap</strong><br><span class="cv-full__muted">Stockholms universitet • 2016–2019</span></p>

            <h3>Språk</h3>
            <ul>
              <li>Svenska (modersmål)</li>
              <li>Engelska (flytande)</li>
            </ul>
          </aside>
        </div>
      </div>
    `,

    modern: `
      <div class="cv-full cv-full--modern">
        <header class="cv-full__top cv-full__top--split">
          <div>
            <h2>Samira Ali</h2>
            <p class="cv-full__meta">UX/UI Designer • Göteborg • samira@email.com • 073-555 12 34</p>
          </div>
          <div class="cv-full__pill">Portfolio: samira.design</div>
        </header>

        <section class="cv-full__block">
          <h3>Profil</h3>
          <p>Product designer med 5 år inom SaaS & e-handel. Bygger design systems, gör research och omvandlar insikter till flöden som ökar konvertering.</p>

          <div class="cv-full__chips">
            <span class="chip">Figma</span>
            <span class="chip">Design systems</span>
            <span class="chip">Research</span>
            <span class="chip">Prototyping</span>
            <span class="chip">A/B-test</span>
          </div>
        </section>

        <div class="cv-full__grid">
          <section>
            <h3>Erfarenhet</h3>

            <div class="cv-full__job">
              <div class="cv-full__row">
                <strong>Breeze</strong>
                <span class="cv-full__muted">2023–nu</span>
              </div>
              <div class="cv-full__muted">Product Designer</div>
              <ul>
                <li>Ökade checkout-konvertering med 11% via omdesign + A/B-test.</li>
                <li>Skapade komponentbibliotek som minskade UI-inkonsekvens.</li>
                <li>Ledde 15+ användartester och förbättrade onboarding.</li>
              </ul>
            </div>

            <div class="cv-full__job">
              <div class="cv-full__row">
                <strong>Shoply</strong>
                <span class="cv-full__muted">2020–2023</span>
              </div>
              <div class="cv-full__muted">UX Designer</div>
              <ul>
                <li>Gjorde research, wireframes och prototyper för nya flöden.</li>
                <li>Förbättrade navigering som sänkte supportärenden.</li>
              </ul>
            </div>
          </section>

          <aside class="cv-full__side">
            <h3>Verktyg</h3>
            <ul>
              <li>Figma, FigJam</li>
              <li>Maze / Hotjar</li>
              <li>Notion / Jira</li>
            </ul>

            <h3>Utbildning</h3>
            <p><strong>Interaktionsdesign</strong><br><span class="cv-full__muted">Chalmers • 2017–2020</span></p>

            <h3>Språk</h3>
            <ul>
              <li>Svenska (modersmål)</li>
              <li>Engelska (flytande)</li>
            </ul>
          </aside>
        </div>
      </div>
    `,

    bold: `
      <div class="cv-full cv-full--bold">
        <header class="cv-full__top cv-full__top--split">
          <div>
            <h2>Oskar Lind</h2>
            <p class="cv-full__meta">Account Executive • Malmö • oskar@email.com • 072-222 33 44</p>
          </div>
          <div class="cv-full__kpi">
            <div class="cv-full__kpiNum">+34%</div>
            <div class="cv-full__kpiLbl">YoY Sales</div>
          </div>
        </header>

        <div class="cv-full__grid">
          <section>
            <h3>Resultatprofil</h3>
            <ul>
              <li>Ökade pipeline från 2.1M → 3.0M på 12 månader.</li>
              <li>Stängde 18 enterprise-affärer (B2B SaaS).</li>
              <li>Lyfte NPS från 42 → 58 med tydligare onboarding.</li>
            </ul>

            <h3>Erfarenhet</h3>

            <div class="cv-full__job">
              <div class="cv-full__row">
                <strong>Kraft Sales</strong>
                <span class="cv-full__muted">2021–nu</span>
              </div>
              <div class="cv-full__muted">Account Executive</div>
              <ul>
                <li>Ansvarar för nykund + upsell i SMB/Enterprise.</li>
                <li>Förhandlar avtal och bygger långsiktiga relationer.</li>
              </ul>
            </div>

            <div class="cv-full__job">
              <div class="cv-full__row">
                <strong>NorthCom</strong>
                <span class="cv-full__muted">2018–2021</span>
              </div>
              <div class="cv-full__muted">Sales Development Representative</div>
              <ul>
                <li>Byggde pipeline via prospektering och kvalificering.</li>
                <li>Arbetade tätt med marketing kring kampanjer.</li>
              </ul>
            </div>
          </section>

          <aside class="cv-full__side">
            <h3>Styrkor</h3>
            <ul>
              <li>Prospektering & discovery</li>
              <li>Förhandling & closing</li>
              <li>Account planning</li>
              <li>CRM (HubSpot/Salesforce)</li>
            </ul>

            <h3>Utbildning</h3>
            <p><strong>Företagsekonomi</strong><br><span class="cv-full__muted">Lunds universitet • 2015–2018</span></p>

            <h3>Språk</h3>
            <ul>
              <li>Svenska (modersmål)</li>
              <li>Engelska (flytande)</li>
            </ul>
          </aside>
        </div>
      </div>
    `
  };

  const openModal = (templateKey) => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    modalBody.innerHTML = templates[templateKey] || `<p>Hittade ingen template: ${templateKey}</p>`;
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modalBody.innerHTML = "";
    document.body.style.overflow = "";
  };

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".template-thumb");
    if (!btn) return;
    const key = btn.getAttribute("data-template");
    openModal(key);
  });

  modal.addEventListener("click", (e) => {
    if (e.target && e.target.getAttribute("data-modal-close") === "true") closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
}


/* ---------------------------
   COUNTRIES (Signup dropdown)
---------------------------- */
function populateCountries() {
    const select = document.getElementById("signup_country");
    if (!select) return;

    const countries = [
        "Afghanistan","Albanien","Algeriet","Andorra","Angola","Argentina","Armenien","Australien","Azerbajdzjan",
        "Bahamas","Bahrain","Bangladesh","Barbados","Belgien","Belize","Benin","Bhutan","Bolivia","Bosnien och Hercegovina",
        "Botswana","Brasilien","Brunei","Bulgarien","Burkina Faso","Burundi",
        "Chile","Colombia","Costa Rica","Cypern","Danmark","Djibouti","Dominikanska republiken",
        "Ecuador","Egypten","El Salvador","Elfenbenskusten","Eritrea","Estland","Eswatini","Etiopien",
        "Fiji","Filippinerna","Finland","Frankrike",
        "Gabon","Gambia","Georgien","Ghana","Grekland","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana",
        "Haiti","Honduras","Hongkong","Indien","Indonesien","Irak","Iran","Irland","Island","Israel","Italien",
        "Jamaica","Japan","Jemen","Jordanien",
        "Kambodja","Kamerun","Kanada","Kap Verde","Kazakstan","Kenya","Kina","Kirgizistan","Kiribati","Komorerna",
        "Kongo-Brazzaville","Kongo-Kinshasa","Kosovo","Kroatien","Kuba","Kuwait","Laos","Lesotho","Lettland","Libanon",
        "Liberia","Libyen","Liechtenstein","Litauen","Luxemburg",
        "Madagaskar","Malawi","Malaysia","Maldiverna","Mali","Malta","Marocko","Marshallöarna","Mauretanien","Mauritius",
        "Mexiko","Mikronesien","Moldavien","Monaco","Mongoliet","Montenegro","Mozambique","Myanmar",
        "Namibia","Nauru","Nederländerna","Nepal","Nicaragua","Niger","Nigeria","Nordkorea","Nordmakedonien","Norge","Nya Zeeland",
        "Oman",
        "Pakistan","Palau","Panama","Papua Nya Guinea","Paraguay","Peru","Polen","Portugal",
        "Qatar",
        "Rumänien","Rwanda","Ryssland",
        "Saint Kitts och Nevis","Saint Lucia","Saint Vincent och Grenadinerna","Samoa","San Marino","São Tomé och Príncipe",
        "Saudiarabien","Schweiz","Senegal","Serbien","Seychellerna","Sierra Leone","Singapore","Slovakien","Slovenien",
        "Somalia","Spanien","Sri Lanka","Storbritannien","Sudan","Surinam","Sverige","Sydafrika","Sydkorea","Sydsudan","Syrien",
        "Tadzjikistan","Taiwan","Tanzania","Thailand","Tjeckien","Togo","Tonga","Trinidad och Tobago","Tunisien","Turkiet","Turkmenistan","Tuvalu",
        "Tyskland",
        "Uganda","Ukraina","Ungern","Uruguay","USA","Uzbekistan",
        "Vanuatu","Vatikanstaten","Venezuela","Vietnam",
        "Zambia","Zimbabwe","Österrike"
    ];

    // Rensa ev. gamla (behåll första placeholder-optionen)
    const keepFirst = select.querySelector("option[value='']");
    select.innerHTML = "";
    if (keepFirst) select.appendChild(keepFirst);

    countries.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        select.appendChild(opt);
    });
}

/* ---------------------------
   Account UI (demo only)
   (Här är bara UI/placeholder, ingen riktig auth)
---------------------------- */
function setupAccountUI() {
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            const email = (document.getElementById("login_email") || {}).value || "";
            const pass = (document.getElementById("login_password") || {}).value || "";
            const note = document.getElementById("loginNote");

            if (!email.trim() || !pass.trim()) {
                if (note) note.textContent = "Fyll i både email och lösenord.";
                return;
            }
            if (note) note.textContent = "Inloggning är en demo i front-end. Koppla mot backend/auth när ni är redo.";
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener("click", () => {
            const email = (document.getElementById("signup_email") || {}).value || "";
            const pass = (document.getElementById("signup_password") || {}).value || "";
            const country = (document.getElementById("signup_country") || {}).value || "";
            const note = document.getElementById("signupNote");

            if (!email.trim() || !pass.trim() || !country.trim()) {
                if (note) note.textContent = "Fyll i email, lösenord och välj land.";
                return;
            }
            if (pass.trim().length < 8) {
                if (note) note.textContent = "Lösenordet behöver vara minst 8 tecken.";
                return;
            }
            if (note) note.textContent = "Konto-skapande är en demo i front-end. Koppla mot backend/auth när ni är redo.";
        });
    }
}
/* ---------------------------
   FEEDBACK POPUP (faces)
---------------------------- */
function setupFeedbackPopup() {
    const pop = document.getElementById("feedbackPop");
    const closeBtn = document.getElementById("feedbackClose");
    const thanks = document.getElementById("feedbackThanks");
    if (!pop || !closeBtn || !thanks) return;

    const STORAGE_KEY = "mittcv_feedback_v1";

    // Om redan svarat: visa inte igen
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return;

    // Visa efter liten delay (så den inte hoppar in direkt)
    setTimeout(() => {
        pop.classList.add("is-open");
        pop.setAttribute("aria-hidden", "false");
    }, 1500);

    // Stäng
    closeBtn.addEventListener("click", () => {
        pop.classList.remove("is-open");
        pop.setAttribute("aria-hidden", "true");
    });

    // Klick på ansikten
    pop.addEventListener("click", (e) => {
        const btn = e.target.closest(".face-btn");
        if (!btn) return;

        const rating = btn.getAttribute("data-rating"); // "dåligt" | "medel" | "bra"
        localStorage.setItem(STORAGE_KEY, rating);

        // (valfritt) skicka event till GTM/GA via dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "mittcv_feedback",
            feedback_rating: rating
        });

        thanks.textContent = "Tack! 🙌";
        setTimeout(() => {
            pop.classList.remove("is-open");
            pop.setAttribute("aria-hidden", "true");
        }, 900);
    });
}
/* === FEEDBACK POPUP FAILSAFE (copy/paste) === */
(function () {
  const STORAGE_KEY = "mittcv_feedback_v1";

  function openPopup() {
    const pop = document.getElementById("feedbackPop");
    if (!pop) {
      console.warn("feedbackPop saknas i HTML (id='feedbackPop').");
      return;
    }
    pop.classList.add("is-open");
    pop.setAttribute("aria-hidden", "false");
  }

  function closePopup() {
    const pop = document.getElementById("feedbackPop");
    if (!pop) return;
    pop.classList.remove("is-open");
    pop.setAttribute("aria-hidden", "true");
  }

  function init() {
    const pop = document.getElementById("feedbackPop");
    if (!pop) {
      console.warn("feedbackPop saknas i HTML (id='feedbackPop').");
      return;
    }

    // Om redan svarat: visa inte
    if (localStorage.getItem(STORAGE_KEY)) return;

    // Stängknapp
    const closeBtn = document.getElementById("feedbackClose");
    if (closeBtn) closeBtn.addEventListener("click", closePopup);

    // Klick på ansikten
    pop.addEventListener("click", (e) => {
      const btn = e.target.closest(".face-btn");
      if (!btn) return;

      const rating = btn.getAttribute("data-rating") || "";

      localStorage.setItem(STORAGE_KEY, rating);

      // GTM event (säker)
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "mittcv_feedback",
        feedback_rating: rating
      });

      const thanks = document.getElementById("feedbackThanks");
      if (thanks) thanks.textContent = "Tack! 🙌";

      setTimeout(closePopup, 900);
    });

    // Visa efter liten delay
    setTimeout(openPopup, 1200);
  }

  // Kör när allt är laddat (robust även om DOMContentLoaded redan passerat)
  window.addEventListener("load", () => {
    try { init(); } catch (err) { console.error("Feedback popup error:", err); }
  });
})();
(function () {
  const STORAGE_KEY = "mittcv_feedback_v1";

  function showThanks() {
    const faces = document.querySelector("#feedbackPop .feedback-faces");
    const thanks = document.getElementById("feedbackThanks");
    if (faces) faces.classList.add("is-hidden");
    if (thanks) thanks.textContent = "Tack för ditt svar!";
  }

  function openPopupIfNeeded() {
    const pop = document.getElementById("feedbackPop");
    if (!pop) return;

    // om redan svarat: visa inte popup (eller visa tack om du vill)
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return;

    pop.classList.add("is-open");
    pop.setAttribute("aria-hidden", "false");
  }

  window.addEventListener("load", () => {
    const pop = document.getElementById("feedbackPop");
    if (!pop) return;

    // Visa popup (om inte redan svarat)
    setTimeout(openPopupIfNeeded, 800);

    // Stängknapp
    const closeBtn = document.getElementById("feedbackClose");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        pop.classList.remove("is-open");
        pop.setAttribute("aria-hidden", "true");
      });
    }

    // Klick på ansikten
    pop.addEventListener("click", (e) => {
      const btn = e.target.closest(".face-btn");
      if (!btn) return;

      const rating = btn.getAttribute("data-rating"); // dåligt | medel | bra
      if (!rating) return;

      // spara
      localStorage.setItem(STORAGE_KEY, rating);

      // skicka data (GTM)
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "mittcv_feedback",
        feedback_rating: rating
      });

      // UI: göm emojis och visa tack
      showThanks();

      // valfritt: stäng efter 1.5s
      setTimeout(() => {
        pop.classList.remove("is-open");
        pop.setAttribute("aria-hidden", "true");
      }, 1500);
    });
  });
})();







