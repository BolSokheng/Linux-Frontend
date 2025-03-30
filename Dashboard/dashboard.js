document.addEventListener("DOMContentLoaded",function(){
    updateMonthButton();
    fetchExportReport();
    fetchBestExportAndStockAlert();
});
const API_BASE = "http://localhost/Linux_backend/api/";
async function fetchExportReport() {
    try {
        const response = await fetch(API_BASE + "get_export.php");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const exports = await response.json();
        if (exports && exports.length) {
           displayExport(exports);
        } else {
            alert("No products found.");   
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        alert(`An error occurred: ${error.message}`);
}
}

//this is for display export 
function displayExport(exports) {
    const exportReportList = document.getElementById("export-report-list");
    exportReportList.innerHTML = ''; 
    [...exports].reverse().forEach(report => {
      const reportItem = document.createElement("li");
      reportItem.classList.add("list-group-item","mt-3" );
      reportItem.innerHTML = `
          <span>ExportID: ${report.exId} | Date: ${report.exportDate}</span>
          <span class="view-report"><i class="fa-solid fa-eye fa-sm" data-id=${report.exId} id="view-export-report"></i></span>
      `;
      exportReportList.appendChild(reportItem);
  });
  document.querySelectorAll("#view-export-report").forEach(icon => {
    icon.addEventListener("click", (event) => {
          const exId = event.target.dataset.id; 
        if (exId) {
            const selectedReport = exports.find(report => report.exId === exId);
            if (selectedReport) {
                displayExportReport(selectedReport);
            } else {
                console.error("Report not found for exId:", exId);
            }
        } else {
            console.error("exId is undefined");
        }
    });
});
}


//this function for view  a whole report 
let modal = null; 
function displayExportReport(product) {
    if (!product) { l
        console.error("No product data to display.");
        return;
    }
    if (!modal) {
        modal = new bootstrap.Modal(document.getElementById('exportReportModal'), {
            backdrop: 'static',
            keyboard: false
        });
    }
    modal.show();
    let tableRows = "";
    product.exportDetails.forEach((item) => {
        tableRows += `
            <tr>
                <td>${item.pId}</td>
                <td>${item.Pname}</td>
                <td>${item.exportQty}</td>
            </tr>
        `;
    });
    const exportReportContent = document.querySelector("#exportReportModal .modal-dialog");
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalContent.innerHTML = `
        <div class="modal-header d-block">
            <h3 class="text-center my-4 fw-bold">Export Report</h3> 
            <div class="mt-4">
                <h6 id="report-no">Report No.${product.exId}</h6>
                <h6 id="report-date">Date: ${product.exportDate}</h6> 
            </div>
        </div>
        <div class="modal-body">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th><th>Name</th><th>Qty</th>
                    </tr>
                </thead>
                <tbody id="export-report-body">
                    ${tableRows}
                </tbody>
            </table>
            <p>Total Items: <span id="export-total-items">${product.totalItems}</span></p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary rounded-2" id="closeModalButton" onclick="CloseExportReport()"> Close </button>
        </div>
    `;

    exportReportContent.innerHTML = ''; 
    exportReportContent.appendChild(modalContent);
}
//close export report modal 
function CloseExportReport() {
    if (modal) {
        modal.hide();
        document.getElementById('closeModalButton').style.display = 'none';
    }
}

//function for fetch stock alert
async function fetchBestExportAndStockAlert() {
    try {
        const response = await fetch(API_BASE + "get_dashboard.php");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data= await response.json();
        //for stockAlerts
        if (data.stockAlerts && data.stockAlerts.length > 0) {
            showStockAlerts(data.stockAlerts);
        } else {
            document.getElementById("stock-alert-list").innerHTML = `<p>No stock alerts.</p>`;
        }
        //for best exported
        if(data.bestExported && data.bestExported.length > 0){
            showBestExported(data.bestExported);
        }else{
            document.querySelector(".best-products #product-container").innerHTML = `<p>No stock alerts.</p>`;
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        alert(`An error occurred: ${error.message}`);
}
}
// function for show stock alert 
function showStockAlerts(stockAlerts) {
    const stockAlertsContainer = document.getElementById('stock-alert-list');
    stockAlertsContainer.innerHTML = '';
        let alertHTML = '';
        stockAlerts.forEach(item => {
            alertHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center mt-3">
                <span>${item.Pname} (Remaining: <span style="color: red">  ${item.stockQty} </span>)</span>
                    <span class="badge bg-danger">!</span>
                </li>
            `;
        });
        stockAlertsContainer.innerHTML = alertHTML;
}
//function to fetch best imported 
function showBestExported(bestExported) {
    let bestExportedContainer = document.querySelector(".best-products #product-container");
    bestExportedContainer.innerHTML = '';

    let bestExportedHTML = '';
    const textColors = ["#88C053", "#83C8C5", "#C090FF", "#AFD9FA"];
    bestExported.forEach((item, index) => {
        let color = textColors[index % textColors.length]; // Cycle through colors
        bestExportedHTML += `
        <div class="col-6 col-md-4 col-lg-3"> 
            <div class="card text-center p-2 d-flex flex-column flex-lg-row align-items-center" style="border-left: 5px solid ${color};">
                <div style="overflow: hidden; width: 40%;"> 
                    <img src="${item.img}" class="img-fluid" alt="${item.Pname}" style="scale:1.2"> 
                </div> 
                <div class="card-body p-1" style="width: 60%;">
                    <h6 class="card-title fw-bold" >${item.Pname}</h6>
                    <p class="card-text">Exported Quantity</p>
                    <h5 class="fw-bold" style="color: ${color};">${item.TotalExport}</h5>
                </div>
            </div>
        </div>
        `;
    });

    // Set the generated HTML content
    bestExportedContainer.innerHTML = bestExportedHTML;
}

//funciton to get the current month
function updateMonthButton() {
    const monthButton = document.querySelector(".btn-outline-secondary.btn-sm");

    // Get the current month name
    const currentDate = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const currentMonth = monthNames[currentDate.getMonth()]; // Get current month name
    monthButton.innerHTML = `<i class="fa-solid fa-calendar-days fa-sm"></i> ${currentMonth}`;
}
