// window.addEventListener("load", function () {
//         const path = window.location.pathname;
//         console.log("The current path is: " + path); // Debugging line
//         const logoImg = document.getElementById("main-logo");

//         if (path.includes("activpatient")) {
//           logoImg.src = "https://webdemo.alderr.com/images/subpage1/header_ap_logo.svg"; // Path to AP logo
//           logoImg.alt = "ActivePatient";
//         } else if (path.includes("activpractice")) {
//           logoImg.src = "https://webdemo.alderr.com/images/subpage1/header_apt_logo.svg"; // Path to APT logo
//           logoImg.alt = "ActivPractice";
//         } else if (path.includes("activwork")) {
//           logoImg.src = "https://webdemo.alderr.com/images/subpage1/header_aw_logo.svg"; // Path to AW logo
//           logoImg.alt = "ActivWork";
//         } else if (path.includes("activbenefits")) {
//           logoImg.src = "https://webdemo.alderr.com/images/subpage1/header_ab_logo.svg"; // Path to AB logo
//           logoImg.alt = "Activbenefits";
//         } else {
//           logoImg.src = "https://webdemo.alderr.com/images/subpage1/header_alderr_logo.svg"; // default logo
//         }
//       });


 

// **** working version with DOMContentLoaded ****

console.log("ALDER LOG: Script started.");

function updateMyLogo() {
    const path = window.location.pathname.toLowerCase();
    const logoImg = document.getElementById('main-logo');

    if (!logoImg) {
        console.log("ALDER LOG: main-logo not found yet, retrying...");
        return;
    }

    console.log("ALDER LOG: Path detected as: " + path);

    // Absolute paths ensure it works on server subfolders
    const baseUrl = "https://webdemo.alderr.com/images/subpage1/";
    
    if (path.includes('activpatient')) {
        logoImg.src = baseUrl + "header_ap_logo.svg";
        logoImg.alt = "ActivePatient";
    } else if (path.includes('activpractice')) {
        logoImg.src = baseUrl + "header_apt_logo.svg";
        logoImg.alt = "ActivPractice";
    } else if (path.includes('activwork')) {
        logoImg.src = baseUrl + "header_aw_logo.svg";
        logoImg.alt = "ActivWork";
    }
     else if (path.includes('actibenefits')) {
        logoImg.src = baseUrl + "header_ab_logo.svg";
        logoImg.alt = "Activbenefits";
    } else {
        logoImg.src = baseUrl + "header_alderr_logo.svg";
        
    }
    console.log("ALDER LOG: Logo updated to: " + logoImg.src);
}

// Check if document is already ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log("ALDER LOG: Page already loaded. Running immediately.");
    updateMyLogo();
} else {
    console.log("ALDER LOG: Waiting for DOMContentLoaded...");
    document.addEventListener('DOMContentLoaded', updateMyLogo);
}


// **** working version with logo images ****




 
// console.log("ALDER LOG: Script started for logo and link update.");

// function updateMyLogo() {
//     const path = window.location.pathname.toLowerCase();
//     const logoImg = document.getElementById('main-logo');
//     const logoLink = document.getElementById('logo-link'); // Get the link

//     if (!logoImg || !logoLink) {
//         return; // Wait until both elements are found
//     }

//     const baseUrl = "https://webdemo.alderr.com/";
 
    
//     if (path.includes('activpatient')) {
//         logoImg.src = baseUrl + "images/subpage1/header_ap_logo.svg";
//         logoLink.href = baseUrl + "activpatient/ap-home.html"; // Link to ActivPatient home
//     } 
//     else if (path.includes('activpractice')) {
//         logoImg.src = baseUrl + "images/subpage1/header_apt_logo.svg";
//         logoLink.href = baseUrl + "activpractice/apt-home.html"; // Link to ActivPractice home
//     } 
//     else if (path.includes('activwork')) {
//         logoImg.src = baseUrl + "images/subpage1/header_aw_logo.svg";
//         logoLink.href = baseUrl + "activwork/aw-home.html"; // Link to ActivWork home
//     } 
//     else {
//         logoImg.src = baseUrl + "images/subpage1/header_alderr_logo.svg";
//         logoLink.href = baseUrl; // Link to main website home
//     }
// }

// // Keep the same "Instant-Run" logic you have now
// if (document.readyState === 'complete' || document.readyState === 'interactive') {
//     updateMyLogo();
// } else {
//     document.addEventListener('DOMContentLoaded', updateMyLogo);
// }