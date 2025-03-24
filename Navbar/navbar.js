document.addEventListener("DOMContentLoaded", function () {
    // Load Navbar
    fetch("../Navbar/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
            
            // Highlight active page
            highlightActiveLink();

            // Now that navbar is loaded, add event listener for Logout button
            const logoutButton = document.querySelector("#logout-btn");
            if (logoutButton) {
                logoutButton.addEventListener("click", showLogoutConfirmation);
            }
        })
        .catch(error => console.error("Error loading navbar:", error));
});

// Function to highlight active page in Navbar
function highlightActiveLink() {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        if (link.getAttribute("href").includes(currentPage)) {
            link.classList.add("active"); // Add active class
        }
    });
}

// Function to show logout confirmation modal
function showLogoutConfirmation() {
    // Prevent duplicate modals
    if (document.querySelector(".modal-overlay")) return;

    // Create confirmation box elements
    let modal = document.createElement("div");
    modal.innerHTML = `
        <div class="logout-modal">
            <p>Are you sure you want to logout?</p>
            <button id="confirm-logout">Yes</button>
            <button id="cancel-logout">No</button>
        </div>
    `;
    modal.classList.add("modal-overlay");

    // Append to body
    document.body.appendChild(modal);

    // Add event listeners
    document.getElementById("confirm-logout").addEventListener("click", function () {
        window.location.href = "../Login/login.html"; // Redirect to login
    });

    document.getElementById("cancel-logout").addEventListener("click", function () {
        modal.remove(); // Close modal
    });
}
