const slides = document.querySelectorAll(".slide");

function prevSlide() {
    let prev = slides[0];

    if (prev.classList.contains("show_slide")) {
        prev = slides[slides.length - 1];
    }

    for (let slide of slides) {
        if (slide.classList.contains("show_slide")) {
            slide.classList.remove("show_slide");
            slide.style.display = "none";
            break;
        }

        prev = slide;
    }

    prev.classList.add("show_slide");
    prev.style.display = "block";
}

function nextSlide() {
    let next = slides[slides.length - 1];
    let check = false;

    if (next.classList.contains("show_slide")) {
        next = slides[0];
    }

    for (let slide of slides) {
        if (check) {
            next = slide;
            break;
        }

        if (slide.classList.contains("show_slide")) {
            slide.classList.remove("show_slide");
            slide.style.display = "none";
            check = true;
        }
    }

    next.classList.add("show_slide");
    next.style.display = "block";
}
