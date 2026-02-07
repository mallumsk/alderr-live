let isBillingYes = true;
      let isWorkUs = true;

      function setToggle(group, val) {
        if (group === "billing") {
          isBillingYes = val;
          document.getElementById("btn-bill-yes").className = val
            ? "px-6 py-1 text-sm font-bold rounded-full bg-maroon text-white"
            : "px-6 py-1 text-sm font-bold rounded-full text-maroon";
          document.getElementById("btn-bill-no").className = !val
            ? "px-6 py-1 text-sm font-bold rounded-full bg-maroon text-white"
            : "px-6 py-1 text-sm font-bold rounded-full text-maroon";
        } else {
          isWorkUs = val;
          document.getElementById("btn-work-us").className = val
            ? "px-6 py-1 text-sm font-bold rounded-full bg-maroon text-white"
            : "px-6 py-1 text-sm font-bold rounded-full text-maroon";
          document.getElementById("btn-work-you").className = !val
            ? "px-6 py-1 text-sm font-bold rounded-full bg-maroon text-white"
            : "px-6 py-1 text-sm font-bold rounded-full text-maroon";
        }
      }

      function calculateAndShow() {
        const providers =
          parseFloat(document.getElementById("providers").value) || 0;
        const collections =
          parseFloat(document.getElementById("collections").value) || 0;
        const visits = parseFloat(document.getElementById("visits").value) || 1;
        const wantEMR = document.getElementById("emrCheck").checked;
        const wantOversight = document.getElementById("oversightCheck").checked;

        // Spreadsheet Constants
        const currSoftBase = 1198;
        const currBillRate = 0.029;
        const currPayrollBase = 200;
        const actEMRRate = 400;
        const actClearFee = 190;
        const actBillRate = 3.5;
        const actOverRate = 0.01;

        // Calculate CURRENT
        const currSoft = currSoftBase;
        const currBill = isBillingYes ? collections * currBillRate : 0;
        const currPay = currPayrollBase;
        const currTotal = currSoft + currBill + currPay;

        // Calculate activPractice
        const actEMR = wantEMR ? providers * actEMRRate : 0;
        const actClear = actClearFee;
        const actBill = isWorkUs ? visits * actBillRate : 0;
        const actPay = 200; // Carry over fixed payroll exception
        const actOver = wantOversight ? collections * actOverRate : 0;
        const actTotal = actEMR + actClear + actBill + actPay + actOver;

        // Calculate Savings
        const savings = currTotal - actTotal;
        const totalSavingsPerc = (savings / (currTotal || 1)) * 100;

        // UI Formatting
        const f = (n) =>
          "$ " +
          Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 0 });
        const f2 = (n) =>
          "$ " +
          Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2 });

        // Set UI Values
        document.getElementById("res-currSoft").innerText = f(currSoft);
        document.getElementById("res-currBill").innerText = f(currBill);
        document.getElementById("res-currPay").innerText = f(currPay);
        document.getElementById("res-currTotal").innerText = f(currTotal);
        document.getElementById("res-currPerc").innerText =
          ((currTotal / collections) * 100).toFixed(1) + "%";
        document.getElementById("res-currClaim").innerText = f2(
          currTotal / visits
        );

        document.getElementById("res-actEMR").innerText = f(actEMR);
        document.getElementById("res-actClear").innerText = f(actClear);
        document.getElementById("res-actBill").innerText = f(actBill);
        document.getElementById("res-actPay").innerText = f(actPay);
        document.getElementById("res-actTotal").innerText = f(actTotal);
        document.getElementById("res-actPerc").innerText =
          ((actTotal / collections) * 100).toFixed(1) + "%";
        document.getElementById("res-actClaim").innerText = f2(
          actTotal / visits
        );

        document.getElementById("res-savAmt").innerText = f(savings);
        document.getElementById("res-savClaim").innerText = f2(
          savings / visits
        );
        document.getElementById("res-savPercColl").innerText =
          ((savings / collections) * 100).toFixed(1) + "%";
        document.getElementById("res-savTotalPerc").innerText =
          Math.round(totalSavingsPerc) + "%";

        document.getElementById("input-screen").classList.add("hidden");
        document.getElementById("result-screen").classList.remove("hidden");
        window.scrollTo(0, 1400);
      }

      function goBack() {
        document.getElementById("result-screen").classList.add("hidden");
        document.getElementById("input-screen").classList.remove("hidden");
        window.scrollTo(120, 1400);
      }