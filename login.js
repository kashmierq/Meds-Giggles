document.getElementById("signin").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;

    if (email === "Medsgiggles@.gmail.com" && password === "meds") {
        document.getElementById("signin").textContent = "Login Successful! Welcome.";
        document.getElementById("email").textContent = "Medsgiggles@.gmail.com";
        document.getElementById("password").textContent = "meds";
         } else {
            document.getElementById("signin").textContent = "Invalid log in";
         }
        }
    );
