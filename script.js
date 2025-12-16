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
  country: country
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

    const openModal = (templateKey) => {
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");

        // Bygg en “stor” förhandsvisning (enkel mock)
        const titleMap = {
            classic: "Klassisk CV-layout",
            modern: "Modern CV-layout",
            bold: "Tydlig CV-layout"
        };

        modalBody.innerHTML = `
            <div class="template-large">
                <h3>${titleMap[templateKey] || "CV-layout"}</h3>
                <div class="large-row"></div>
                <div class="large-row short"></div>
                <div class="large-row"></div>
                <div class="large-grid">
                    <div class="large-box"></div>
                    <div class="large-box"></div>
                </div>
            </div>
        `;
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

