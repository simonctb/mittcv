# MittCV.se

En enkel webbapp där du kan skapa ett modernt CV och personligt brev med **live-förhandsgranskning** och möjlighet att ladda ner resultatet som bild (PNG, kan sedan göras om till PDF).

---

## Struktur

```text
/
├── index.html
├── style.css
├── script.js
└── (ev. images/)

<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MittCV.se</title>

    <!-- Open Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="style.css" />
</head>

<body>

    <!-- HEADER -->
    <header class="header" id="siteHeader">
        <div class="header-inner">
            <div class="logo">
                <img src="https://thumbs.dreamstime.com/z/gammal-skrivmaskin-5949055.jpg" class="logo-icon" alt="Skrivmaskin">
                <span class="logo-text">MITTCV.SE</span>
            </div>
        </div>
    </header>

    <!-- STARTSIDA -->
    <section id="home" class="page active">
        <div class="hero">
            <div class="hero-left">
                <p class="eyebrow">Modern karriär · Klassisk känsla</p>
                <h1>Skapa ett modernt CV och personligt brev på några minuter.</h1>
                <p class="intro-text">
                    Fyll i fälten – förhandsgranskningen uppdateras live på höger sida. När du är nöjd laddar du ner
                    ditt färdiga dokument.
                </p>

                <div class="button-row">
                    <button class="main-btn" onclick="navigate('cvForm')">Skapa CV</button>
                    <button class="main-btn secondary" onclick="navigate('pbForm')">Skapa personligt brev</button>
                </div>
            </div>

            <div class="hero-right">
                <div class="hero-preview-card">
                    <div class="hero-preview-heading">
                        <div class="hero-preview-avatar"></div>
                        <div>
                            <div class="hero-preview-name">Ditt Namn</div>
                            <div class="hero-preview-title">Din titel</div>
                        </div>
                    </div>
                    <div class="hero-preview-line"></div>
                    <p class="hero-preview-text">
                        Ett stilrent CV och ett genomtänkt personligt brev gör att du sticker ut redan innan intervjun har börjat.
                    </p>
                </div>
            </div>
        </div>

        <!-- INFO-RUTOR OM CV & PERSONLIGT BREV -->
        <div class="info-row">
            <div class="info-block">
                <h2>Vad gör ett CV för dig?</h2>
                <p>
                    CV:t är din överblick. Här visar du din utbildning, arbetslivserfarenhet och dina färdigheter
                    på ett strukturerat sätt.
                </p>
                <p>
                    Ett bra CV är lätt att skanna för rekryteraren och gör det enkelt att se varför just du är rätt för tjänsten.
                </p>
            </div>

            <div class="info-block">
                <h2>Vad gör ett personligt brev?</h2>
                <p>
                    Det personliga brevet är din röst. Här berättar du vem du är, vad som driver dig och varför du söker just det här jobbet.
                </p>
                <p>
                    Med ett genomtänkt brev blir du mer än bara punkter på ett papper – du blir en person de vill träffa.
                </p>
            </div>
        </div>
    </section>

    <!-- CV: FORM + LIVE PREVIEW -->
    <section id="cvForm" class="page">

        <h2>Skapa ditt CV</h2>
        <p class="section-intro">
            Skriv in dina uppgifter till vänster. Förhandsgranskningen till höger uppdateras automatiskt.
        </p>

        <div class="editor-area">

            <!-- FORM VÄNSTER -->
            <div class="editor-left">

                <label for="cv_name">Namn</label>
                <input type="text" id="cv_name" placeholder="Ditt namn">

                <label for="cv_title">Titel</label>
                <input type="text" id="cv_title" placeholder="Ex. Digital marknadsförare">

                <label for="cv_profile">Profil</label>
                <textarea id="cv_profile" placeholder="Kort sammanfattning av vem du är och vad du söker..."></textarea>

                <label for="cv_exp">Erfarenhet</label>
                <textarea id="cv_exp" placeholder="Tidigare roller, arbetsplatser och ansvarsområden..."></textarea>

                <label for="cv_edu">Utbildning</label>
                <textarea id="cv_edu" placeholder="Utbildningar, kurser och certifikat..."></textarea>

                <label for="cv_skills">Färdigheter</label>
                <textarea id="cv_skills" placeholder="Ex. Kommunikation, projektledning, Google Analytics..."></textarea>

                <label for="cv_languages">Språk</label>
                <textarea id="cv_languages" placeholder="Ex. Svenska (flytande), Engelska (mycket bra)..."></textarea>

                <label for="cv_img">Bild</label>
                <input type="file" id="cv_img" accept="image/*">

                <div class="form-actions">
                    <button class="main-btn" onclick="downloadPDF('cvPreviewPaper')">Ladda ner CV som PNG/PDF</button>
                    <button class="ghost-btn" onclick="navigate('home')">Till startsidan</button>
                </div>
            </div>

            <!-- PREVIEW HÖGER -->
            <div class="editor-right">
                <div id="cvPreviewPaper" class="preview-paper cv-paper">
                    <img id="cv_img_preview" class="preview-img" style="display:none;" alt="Profilbild">

                    <h2 id="cv_prev_name">Ditt namn</h2>
                    <p id="cv_prev_title" class="muted"></p>

                    <h3>Profil</h3>
                    <p id="cv_prev_profile" class="preview-section"></p>

                    <h3>Erfarenhet</h3>
                    <p id="cv_prev_exp" class="preview-section"></p>

                    <h3>Utbildning</h3>
                    <p id="cv_prev_edu" class="preview-section"></p>

                    <h3>Färdigheter</h3>
                    <p id="cv_prev_skills" class="preview-section"></p>

                    <h3>Språk</h3>
                    <p id="cv_prev_languages" class="preview-section"></p>
                </div>
            </div>
        </div>

    </section>

    <!-- PERSONLIGT BREV: FORM + LIVE PREVIEW -->
    <section id="pbForm" class="page">

        <h2>Skapa ditt personliga brev</h2>
        <p class="section-intro">
            Beskriv vem du är, vad du gjort och varför du söker tjänsten. Brevet uppdateras live till höger.
        </p>

        <div class="editor-area">

            <!-- FORM VÄNSTER -->
            <div class="editor-left">

                <label for="pb_name">Namn</label>
                <input type="text" id="pb_name" placeholder="Ditt namn">

                <label for="pb_age">Ålder</label>
                <input type="text" id="pb_age" placeholder="Ex. 27 år">

                <label for="pb_interests">Intressen</label>
                <textarea id="pb_interests" placeholder="Vad gillar du att göra på fritiden?"></textarea>

                <label for="pb_story">Bakgrund</label>
                <textarea id="pb_story" placeholder="Kort om din resa, tidigare jobb och studier..."></textarea>

                <label for="pb_why">Varför söker du jobbet?</label>
                <textarea id="pb_why" placeholder="Vad lockar med tjänsten och varför passar du?"></textarea>

                <label for="pb_img">Bild</label>
                <input type="file" id="pb_img" accept="image/*">

                <div class="form-actions">
                    <button class="main-btn" onclick="downloadPDF('pbPreviewPaper')">Ladda ner brevet som PNG/PDF</button>
                    <button class="ghost-btn" onclick="navigate('home')">Till startsidan</button>
                </div>
            </div>

            <!-- PREVIEW HÖGER -->
            <div class="editor-right">
                <div id="pbPreviewPaper" class="preview-paper letter-paper">
                    <img id="pb_img_preview" class="preview-img" style="display:none;" alt="Profilbild">

                    <h2 id="pb_prev_name">Ditt namn</h2>
                    <p id="pb_prev_age" class="muted"></p>

                    <h3>Intressen</h3>
                    <p id="pb_prev_interests" class="preview-section"></p>

                    <h3>Bakgrund</h3>
                    <p id="pb_prev_story" class="preview-section"></p>

                    <h3>Varför jag söker tjänsten</h3>
                    <p id="pb_prev_why" class="preview-section"></p>
                </div>
            </div>
        </div>

    </section>

    <!-- FOOTER -->
    <footer class="footer">
        <p>© 2025 MittCV.se</p>

        <div class="footer-icons">
            <a href="https://www.facebook.com" target="_blank" class="footer-icon">
                <img src="https://cdn-icons-png.flaticon.com/512/145/145802.png" alt="Facebook">
            </a>
            <a href="https://www.instagram.com" target="_blank" class="footer-icon">
                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram">
            </a>
        </div>
    </footer>

    <!-- HTML2CANVAS FÖR NEDLADDNING -->
    <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
    <script src="script.js"></script>
</body>
</html>

/* GLOBALT */

* {
    box-sizing: border-box;
}

body {
    font-family: "Open Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: #e7dfd4; /* beige/grå/brun */
    margin: 0;
    color: #222222;
}

/* HEADER */

.header {
    background: #264a33;          /* skogsgrön */
    border-bottom: 3px solid #1f3b29;
    cursor: pointer;
}

.header-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 12px 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
    display: inline-flex;
    align-items: center;
    gap: 12px;
}

.logo-icon {
    width: 46px;
    height: 46px;
    object-fit: cover;
    border-radius: 4px;
}

.logo-text {
    font-family: "Open Sans", sans-serif;
    color: #ffffff;
    font-size: 22px;
    letter-spacing: 0.35em;
    font-weight: 700;
    text-transform: uppercase;
}

/* SIDOR */

.page {
    display: none;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 24px 80px;
}

.page.active {
    display: block;
}

/* HERO */

.hero {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    gap: 40px;
    align-items: center;
}

.eyebrow {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #666;
}

.hero-left h1 {
    font-size: 34px;
    line-height: 1.25;
    margin-top: 8px;
    margin-bottom: 14px;
    font-weight: 700;
}

.intro-text {
    font-size: 15px;
    color: #555;
    max-width: 520px;
}

/* Hero preview-kort */

.hero-right {
    display: flex;
    justify-content: center;
    align-items: center;
}

.hero-preview-card {
    background: radial-gradient(circle at top, #ffffff 0, #f3f3f3 50%, #e7e7e7 100%);
    border-radius: 24px;
    padding: 22px 24px 24px;
    box-shadow: 0 18px 40px rgba(0,0,0,0.18);
    max-width: 340px;
    width: 100%;
}

.hero-preview-heading {
    display: flex;
    align-items: center;
    gap: 14px;
}

.hero-preview-avatar {
    width: 52px;
    height: 52px;
    border-radius: 999px;
    background: linear-gradient(135deg, #d0d0d0, #f5f5f5);
}

.hero-preview-name {
    font-weight: 600;
}

.hero-preview-title {
    font-size: 13px;
    color: #666;
}

.hero-preview-line {
    height: 1px;
    background: #dddddd;
    margin: 14px 0;
}

.hero-preview-text {
    margin: 0;
    font-size: 13px;
    color: #444;
}

/* INFO-RUTOR */

.info-row {
    margin-top: 60px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 28px;
}

.info-block {
    background: #ffffff;
    border-radius: 16px;
    padding: 24px 22px;
    box-shadow: 0 12px 28px rgba(0,0,0,0.08);
}

.info-block h2 {
    margin-top: 0;
    font-size: 20px;
    margin-bottom: 10px;
}

.info-block p {
    font-size: 14px;
    color: #555;
}

/* KNAPPAR */

.button-row {
    margin-top: 26px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.main-btn {
    border: none;
    border-radius: 999px;
    padding: 12px 22px;
    font-size: 15px;
    font-weight: 600;
    background: #0f8b4a;
    color: #ffffff;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 10px 24px rgba(11,155,85,0.35);
    transition: transform 0.14s ease, box-shadow 0.14s ease, background 0.14s ease;
}

.main-btn.secondary {
    background: #ffffff;
    color: #0f8b4a;
    box-shadow: 0 4px 14px rgba(0,0,0,0.1);
    border: 1px solid rgba(11,155,85,0.6);
}

.main-btn:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 16px 32px rgba(11,155,85,0.5);
    background: #0d753e;
}

.main-btn.secondary:hover {
    background: #e9faf2;
}

.ghost-btn {
    background: transparent;
    border: none;
    color: #444;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
    margin-left: 4px;
}

/* FORM-SIDOR */

.section-intro {
    margin-top: 0;
    margin-bottom: 22px;
    color: #555;
    font-size: 14px;
}

.editor-area {
    display: flex;
    gap: 30px;
    align-items: flex-start;
}

.editor-left {
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.editor-right {
    width: 60%;
}

/* Inputs */

label {
    font-size: 14px;
    font-weight: 600;
}

input,
textarea {
    width: 100%;
    padding: 11px 12px;
    border-radius: 14px;
    border: 1px solid #bcbcbc;
    font-size: 14px;
    background: #ffffff;
    transition: border-color 0.14s ease, box-shadow 0.14s ease, background 0.14s ease;
}

textarea {
    min-height: 110px;
    resize: vertical;
}

input::placeholder,
textarea::placeholder {
    color: #a0a0a0;
}

input:focus,
textarea:focus {
    outline: none;
    border-color: #0f8b4a;
    box-shadow: 0 0 0 2px rgba(15,139,74,0.2);
}

/* PREVIEW-PAPPER */

.preview-paper {
    background: #ffffff;
    border-radius: 20px;
    padding: 28px 26px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.15);
    min-height: 400px;
}

.cv-paper h2,
.letter-paper h2 {
    margin-top: 0;
}

.preview-img {
    width: 120px;
    height: 120px;
    border-radius: 14px;
    object-fit: cover;
    margin-bottom: 18px;
}

.preview-section {
    margin-top: 4px;
    font-size: 14px;
    color: #333;
}

.muted {
    color: #777;
    font-size: 13px;
    margin-top: -4px;
}

/* FORM-ACTIONS */

.form-actions {
    margin-top: 18px;
}

/* FOOTER */

.footer {
    background: #264a33;
    color: #ffffff;
    padding: 18px 20px;
    text-align: center;
}

.footer-icons {
    margin-top: 6px;
}

.footer-icon img {
    width: 26px;
    margin: 0 6px;
}

/* RESPONSIVT */

@media (max-width: 900px) {
    .hero {
        grid-template-columns: 1fr;
    }

    .editor-area {
        flex-direction: column;
    }

    .editor-left,
    .editor-right {
        width: 100%;
    }

    .preview-paper {
        margin-top: 20px;
    }
}

// SPA-navigation
function navigate(pageId) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

// Klickbar header -> startsidan
document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("siteHeader");
    if (header) {
        header.addEventListener("click", () => navigate("home"));
    }

    // Bind live-fält när DOM finns
    setupLiveBindings();
    setupImagePreviews();
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
