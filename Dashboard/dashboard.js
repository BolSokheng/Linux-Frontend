document.addEventListener("DOMContentLoaded", function () {
  const productContainer = document.getElementById("product-container");
  const stockAlertList = document.getElementById("stock-alert-list");
  const exportReportList = document.getElementById("export-report-list");
  const popupOrder = document.querySelector(".order");
  const closePopup = document.querySelector(".fa-circle-xmark");
  const submitPopup = document.querySelector(".export-button");
  const popupExportReport = document.querySelector(".order-container");
  const closeExport = document.querySelector(".close-export");

  popupOrder.style.display = "none";
  popupExportReport.style.display = "none";

  const products = [
      { name: "Centella Sunscreen", quantity: 160, img: "../IMAGES/centella.png" },
      { name: "Centella Sunscreen", quantity: 160, img: "../IMAGES/centella.png" },
      { name: "IUNIK Sunscreen", quantity: 143, img: "../IMAGES/centella.png" },
      { name: "IUNIK Sunscreen", quantity: 143, img: "../IMAGES/centella.png" },
      { name: "IUNIK Sunscreen", quantity: 143, img: "../IMAGES/centella.png" },
      { name: "IUNIK Sunscreen", quantity: 143, img: "../IMAGES/centella.png" },
  ];

  products.forEach(product => {
      const card = `
          <div class="col-6 col-md-3 col-lg-2"> 
              <div class="card text-center p-2">
                  <img src="${product.img}" class="card-img-top mx-auto" alt="${product.name}">
                  <div class="card-body p-1">
                      <h6 class="card-title">${product.name}</h6>
                      <p class="card-text text-success">Imported: ${product.quantity}</p>
                  </div>
              </div>
          </div>
      `;
      productContainer.innerHTML += card;
  });

  const stockAlerts = [
      { name: "Product A", remain: 10 },
      { name: "Product B", remain: 15 },
      { name: "Product C", remain: 16 },
      { name: "Product D", remain: 16 },
      { name: "Product E", remain: 19 }
  ];

  stockAlerts.forEach(item => {
      const listItem = `
          <li class="list-group-item">
              <span>${item.name} (Remaining: ${item.remain})</span>
              <span class="badge bg-danger">!</span>
          </li>
      `;
      stockAlertList.innerHTML += listItem;
  });

  const exportReports = [
      { id: "001", date: "01/03/2025" },
      { id: "002", date: "01/03/2025" },
      { id: "003", date: "01/03/2025" },
      { id: "004", date: "01/03/2025" },
      { id: "005", date: "01/03/2025" },
  ];

  exportReports.forEach(report => {
      const reportItem = document.createElement("li");
      reportItem.classList.add("list-group-item");
      reportItem.innerHTML = `
          <span>ExportID: ${report.id} | Date: ${report.date}</span>
          <span class="view-report"><i class="fa-solid fa-eye fa-sm" data-id="${report.id}"></i></span>
      `;
      exportReportList.appendChild(reportItem);
  });

  

  document.addEventListener("click", function (event) {
      if (event.target.classList.contains("fa-eye")) {
          popupOrder.style.display = "block";
          popupOrder.style.position = "fixed";
          popupOrder.style.top = "50%";
          popupOrder.style.left = "50%";
          popupOrder.style.transform = "translate(-50%, -50%)";
          popupOrder.style.zIndex = "1000";
      }
  });

  closePopup.addEventListener("click", function () {
      popupOrder.style.display = "none";
  });

  submitPopup.addEventListener("click", function () {

    popupOrder.style.display = "none";

    popupExportReport.style.display = "block";
    popupExportReport.style.position = "fixed";
    popupExportReport.style.top = "50%";
    popupExportReport.style.left = "50%";
    popupExportReport.style.transform = "translate(-50%, -50%)";
    popupExportReport.style.zIndex = "1000";
  });

  closeExport.addEventListener("click", function () {
      popupExportReport.style.display = "none";
  });




  // document.addEventListener("click", function (event) {
  //   if (event.target.classList.contains("export-button")) {
  //       popupExportReport.style.display = "block";
  //       popupExportReport.style.position = "fixed";
  //       popupExportReport.style.top = "50%";
  //       popupExportReport.style.left = "50%";
  //       popupExportReport.style.transform = "translate(-50%, -50%)";
  //       popupExportReport.style.zIndex = "1000";
  //   }
  // });
});
