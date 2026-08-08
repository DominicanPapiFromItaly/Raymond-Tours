document.getElementById("contactForm").addEventListener("submit", function() {
  setTimeout(() => {
    document.getElementById("contactForm").style.display = "none";

    const msg = document.getElementById("thankyou");
    msg.style.display = "block";
    msg.classList.add("slide-in");
  }, 600);
});