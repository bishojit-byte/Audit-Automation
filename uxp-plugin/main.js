// Adobe Photoshop UXP Extension - Smart QC & File Lock Logic
const { app, core } = require("photoshop");

document.getElementById("btn-fetch-order").addEventListener("click", async () => {
  const orderId = document.getElementById("order-id-input").value;
  if (!orderId) {
    app.showAlert("Please enter a valid Order ID");
    return;
  }

  try {
    // 1. Fetch Order Instructions & Specs from Central API
    const response = await fetch(`https://api.tistaapp.com/v1/orders/${orderId}`);
    const data = await response.json();
    
    // 2. Perform Auto Technical Inspection on active Photoshop Document
    const activeDoc = app.activeDocument;
    const isDPIValid = activeDoc.resolution === 300;
    const isRGBValid = activeDoc.mode === "RGBColorMode";
    const hasClippingPath = activeDoc.pathItems && activeDoc.pathItems.length > 0;

    console.log("Auto Inspection Results:", { isDPIValid, isRGBValid, hasClippingPath });

    // 3. Render Instruction Checklist
    renderChecklist(data.instructions);
  } catch (err) {
    console.error("Error fetching order specs:", err);
  }
});

// Enforce File Completion Lock
function updateCompletionLockStatus(allPassed) {
  const btnComplete = document.getElementById("btn-complete-order");
  if (allPassed) {
    btnComplete.removeAttribute("disabled");
    btnComplete.innerText = "Pass QC & Upload to Dropbox";
  } else {
    btnComplete.setAttribute("disabled", "true");
    btnComplete.innerText = "QC Locked (Complete Checklist First)";
  }
}
