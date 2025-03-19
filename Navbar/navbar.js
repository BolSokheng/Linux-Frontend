// document.addEventListener("DOMContentLoaded", function() {
//     // Sample Best Imported Products
//     const products = [
//       { name: "Centella Sunscreen", quantity: 160 },
//       { name: "Beauty of Joseon Serum", quantity: 154 },
//       { name: "Beauty of Joseon Sunscreen", quantity: 150 },
//       { name: "IUNIK Sunscreen", quantity: 143 },
//     ];
  
//     const productContainer = document.getElementById("product-container");
//     products.forEach(product => {
//       const card = `
//         <div class="col-6 col-md-3 col-lg-2"> <!-- Wrap each card in a column -->
//           <div class="card text-center p-2">
//             <img src="https://via.placeholder.com/60" class="card-img-top mx-auto" alt="${product.name}">
//             <div class="card-body p-1">
//               <h6 class="card-title">${product.name}</h6>
//               <p class="card-text text-success">Imported: ${product.quantity}</p>
//             </div>
//           </div>
//         </div>
//       `;
//       productContainer.innerHTML += card; // Append the column div, not just the card
//     });

  
//     // Sample Stock Alerts
//     const stockAlerts = [
//       { name: "Product A", remain: 10 },
//       { name: "Product B", remain: 15 },
//       { name: "Product C", remain: 16 },
//       { name: "Product D", remain: 16 },
//       { name: "Product E", remain: 19 }
//     ];
  
//     const stockAlertList = document.getElementById("stock-alert-list");
//     stockAlerts.forEach(item => {
//       const listItem = `
//         <li class="list-group-item">
//           <span>${item.name} (Remaining: ${item.remain})</span>
//           <span class="badge bg-danger">!</span>
//         </li>
//       `;
//       stockAlertList.innerHTML += listItem;
//     });
  
//     // Sample Export Reports
//     const exportReports = [
//       { id: "001", date: "01/03/2025" },
//       { id: "002", date: "01/03/2025" },
//       { id: "003", date: "01/03/2025" },
//       { id: "004", date: "01/03/2025" },
//       { id: "005", date: "01/03/2025" },
//     ];
  
//     const exportReportList = document.getElementById("export-report-list");
//     exportReports.forEach(report => {
//       const reportItem = `
//         <li class="list-group-item">
//           <span>ExportID: ${report.id} | Date: ${report.date}</span>
//           <button class="btn btn-sm btn-outline-dark"><i class="bi bi-eye"></i></button>
//         </li>
//       `;
//       exportReportList.innerHTML += reportItem;
//     });
//   });


document.addEventListener("DOMContentLoaded", function () {
  fetch("../Navbar/navbar.html") // Adjust path if needed
      .then(response => response.text())
      .then(data => {
          document.getElementById("navbar-container").innerHTML = data;
      })
      .catch(error => console.error("Error loading navbar:", error));
});
