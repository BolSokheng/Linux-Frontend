document.addEventListener("DOMContentLoaded", function() {
  const products = [
    { name: "Centella Sunscreen", quantity: 160 ,img:"../IMAGES/centella.png"},
    { name: "Centella Sunscreen", quantity: 160 ,img:"../IMAGES/centella.png"},
    { name: "IUNIK Sunscreen", quantity: 143,img:"../IMAGES/centella.png"},
    { name: "IUNIK Sunscreen", quantity: 143,img:"../IMAGES/centella.png" },
    { name: "IUNIK Sunscreen", quantity: 143,img:"../IMAGES/centella.png" },
    { name: "IUNIK Sunscreen", quantity: 143 ,img:"../IMAGES/centella.png"},
  ];
   
  const productContainer = document.getElementById("product-container");
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

  const stockAlertList = document.getElementById("stock-alert-list");
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

  const exportReportList = document.getElementById("export-report-list");
  exportReports.forEach(report => {
    const reportItem = `
      <li class="list-group-item">
        <span>ExportID: ${report.id} | Date: ${report.date}</span>
        <span><i class="fa-solid fa-eye fa-sm"></i></span>
      </li>
    `;
    exportReportList.innerHTML += reportItem;
  });
});