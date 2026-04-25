const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
    const email = contactForm.querySelector('input[placeholder="Your Email"]').value;
    const company = contactForm.querySelector('input[placeholder="Company Name"]').value;
    const message = contactForm.querySelector("textarea").value;

    const subject = encodeURIComponent("New Inquiry - Apex Advisory");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:apexadvisoryy@gmail.com?subject=${subject}&body=${body}`;
  });
}