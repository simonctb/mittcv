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
