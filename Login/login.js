document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form from refreshing

        // Get input values
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        // Hardcoded credentials
        var correctUsername = "Admin";
        var correctPassword = "Admin123$$";

        // Check login credentials
        if (username === correctUsername && password === correctPassword) {
            window.location.href = "../Dashboard/dashboard.html"; // Redirect to Dashboard
        } else {
            alert("Invalid Username or Password. Please try again."); // Show alert only on failure
        }
    });
});
