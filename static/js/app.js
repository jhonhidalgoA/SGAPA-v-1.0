document.addEventListener("DOMContentLoaded", function() {
  let btn = document.querySelector(".icon");
  let sidebar = document.querySelector(".sidebar");

  if (btn && sidebar) {
    btn.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });
  }

  let arrows = document.querySelectorAll(".arrow");
  for (var i = 0; i < arrows.length; i++) {
    arrows[i].addEventListener("click", (e) => {
      let arrowParent = e.target.parentElement.parentElement;
      arrowParent.classList.toggle("show");
    });
  }

  const mail = document.querySelector(".mail");
  if (mail) {
    mail.addEventListener("click", () => {
      const submenu = mail.querySelector(".mail__submenu");
      if (submenu) {
        if (submenu.style.display === "block") {
          submenu.style.display = "none";
        } else {
          submenu.style.display = "block";
        }
      }
    });
  }

  const socialToggle = document.querySelector(".social-toggle");
  const socialMenu = document.querySelector(".social");
  if (socialToggle && socialMenu) {
    socialToggle.addEventListener("click", () => {
      socialMenu.classList.toggle("active"); // Alterna la clase "active"
    });
  }

  const profileToggle = document.querySelector(".profile-toggle");
  const profileMenu = document.querySelector(".profile");
  if (profileToggle && profileMenu) {
    profileToggle.addEventListener("click", () => {
      profileMenu.classList.toggle("active"); // Alterna la clase "active"
    });
  }
});
