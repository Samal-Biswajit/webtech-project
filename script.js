document.addEventListener("DOMContentLoaded", function () {
  // --- Common Functions for all pages ---

  // Function to handle Back to Top Button
  function scrollFunction() {
    var mybutton = document.getElementById("backToTopBtn");
    if (mybutton) {
      // Check if the button exists on the page
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
  }

  // Function to scroll to the top of the document
  window.topFunction = function () {
    // Made global so onClick can find it
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  // Attach scroll function to window scroll event
  window.onscroll = function () {
    scrollFunction();
  };

  // --- Logic specific to registration.html ---
  if (document.body.id === "registration-page") {
    // Add id="registration-page" to your <body> tag in registration.html
    window.validateForm = function () {
      // Made global for onsubmit attribute
      let isValid = true;
      // Clear previous error messages
      document
        .querySelectorAll(".error-message")
        .forEach((span) => (span.textContent = ""));

      // Get form elements
      const name = document.getElementById("name");
      const studentId = document.getElementById("student-id");
      const password = document.getElementById("password");
      const email = document.getElementById("email");
      const age = document.getElementById("age");
      const genderRadios = document.getElementsByName("gender");
      const address = document.getElementById("address");
      const branch = document.getElementById("branch");
      const skillCheckboxes = document.getElementsByName("skills");
      const resumeFile = document.getElementById("resume");
      const photoFile = document.getElementById("photo");

      // --- Name Validation ---
      if (name && name.value.trim() === "") {
        document.getElementById("name-error").textContent = "Name is required.";
        isValid = false;
      }

      // --- Student ID Validation (9 digits) ---
      const idPattern = /^[0-9]{9}$/;
      if (studentId && studentId.value.trim() === "") {
        document.getElementById("id-error").textContent =
          "Student ID is required.";
        isValid = false;
      } else if (studentId && !idPattern.test(studentId.value.trim())) {
        document.getElementById("id-error").textContent =
          "ID must be 9 digits (numbers only).";
        isValid = false;
      }

      // --- Password Validation (min 6 chars) ---
      if (password && password.value.length < 6) {
        document.getElementById("password-error").textContent =
          "Password must be at least 6 characters.";
        isValid = false;
      }

      // --- Email Validation ---
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && email.value.trim() === "") {
        document.getElementById("email-error").textContent =
          "Email is required.";
        isValid = false;
      } else if (email && !emailPattern.test(email.value.trim())) {
        document.getElementById("email-error").textContent =
          "Please enter a valid email address.";
        isValid = false;
      }

      // --- Age Validation (numbers only) ---
      if (age && age.value.trim() !== "" && isNaN(age.value.trim())) {
        document.getElementById("age-error").textContent =
          "Age must be a number.";
        isValid = false;
      }

      // --- Gender Validation (at least one selected) ---
      let genderSelected = false;
      if (genderRadios.length > 0) {
        for (let i = 0; i < genderRadios.length; i++) {
          if (genderRadios[i].checked) {
            genderSelected = true;
            break;
          }
        }
      }
      if (!genderSelected) {
        document.getElementById("gender-error").textContent =
          "Please select your gender.";
        isValid = false;
      }

      // --- College Address Validation ---
      if (address && address.value.trim() === "") {
        document.getElementById("address-error").textContent =
          "College Address is required.";
        isValid = false;
      }

      // --- Branch Validation ---
      if (branch && branch.value === "") {
        document.getElementById("branch-error").textContent =
          "Please select your branch.";
        isValid = false;
      }

      // --- File Upload Validation (optional, basic check for existence and size) ---
      if (resumeFile && resumeFile.files.length > 0) {
        const fileSize = resumeFile.files[0].size / 1024 / 1024; // in MB
        if (fileSize > 5) {
          // e.g., limit to 5MB
          document.getElementById("resume-error").textContent =
            "Resume size exceeds 5MB limit.";
          isValid = false;
        }
      }
      if (photoFile && photoFile.files.length > 0) {
        const fileSize = photoFile.files[0].size / 1024 / 1024; // in MB
        if (fileSize > 2) {
          // e.g., limit to 2MB
          document.getElementById("photo-error").textContent =
            "Photo size exceeds 2MB limit.";
          isValid = false;
        }
      }

      if (!isValid) {
        alert("Please correct the errors in the form.");
      }
      return isValid;
    };
  }
});
