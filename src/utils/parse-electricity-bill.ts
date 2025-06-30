export function parseMEAElectricityBillText(text: string): Record<string, any> {
  const lines = text.split(/\n/).map(line => line.trim()).filter(Boolean);

  const result: Record<string, any> = {
    document_type: "Metropolitan Electricity Authority Bill"
  };

  const rawText = lines.join(" ");
  result["system_version"] = (rawText.match(/TS An [^\s]+/) || [])[0] || "";
  result["website"] = (rawText.match(/http[^\s]+/) || [])[0] || "";
  result["contact"] = (rawText.match(/MEA Call center \d+/) || [])[0] || "";

  const barcodeMatch = rawText.match(/\d{44,}/);
  if (barcodeMatch) {
    result["barcode_value"] = barcodeMatch[0];
  }

  const accountDetails = { 
    ca_ref_no: "",
    installation_no: "",
    mru_no: "",
    invoice_no: "",
    type: ""
  };

  const customerInfo = {
    name: "",
    address: "",
    premise_type: ""
  };

  const meterReading = {
    billing_date: "",
    last_meter_reading: "",
    previous_meter_reading: "",
    units_consumed: "",
    multiplier: ""
  };

  const chargeDetails = {
    electricity_charge_description: "",
    electricity_charge_amount: 0,
    service_charge: 0,
    ft_charge_per_unit: 0,
    ft_charge_total: 0,
    discount: 0,
    total_before_vat: 0,
    vat_7_percent: 0,
    total_current_bill: 0
  };

  const paymentInfo = {
    previous_unpaid_bill: 0,
    total_amount_due: 0,
    due_date: ""
  };

  const paymentHistory: any[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes("ชื่อผู้ใช้ไฟฟ้า")) {
      customerInfo.name = line.replace("ชื่อผู้ใช้ไฟฟ้า (Name)", "").trim();
    } else if (line.includes("สถานที่ใช้ไฟฟ้า")) {
      customerInfo.address = line.replace("สถานที่ใช้ไฟฟ้า (Premise)", "").trim();
    } else if (line.includes("รหัสเครื่องวัด")) {
      accountDetails.ca_ref_no = lines[i + 1]?.trim() || "";
    } else if (line.includes("Installation")) {
      accountDetails.installation_no = lines[i + 1]?.trim() || "";
    } else if (line.includes("MRU")) {
      accountDetails.mru_no = lines[i + 1]?.trim() || "";
    } else if (line.includes("Invoice No")) {
      const match = line.match(/(\d{5,})/g);
      if (match) accountDetails.invoice_no = match[0];
    } else if (line.includes("ประเภท")) {
      const match = line.match(/(\d+\.\d+)/);
      if (match) accountDetails.type = match[0];
    } else if (line.includes("Meter Reading Date")) {
      meterReading.billing_date = lines[i + 1]?.trim() || "";
      meterReading.last_meter_reading = lines[i + 2]?.trim() || "";
      meterReading.previous_meter_reading = lines[i + 3]?.trim() || "";
      meterReading.units_consumed = lines[i + 4]?.trim() || "";
      meterReading.multiplier = "1";
    } else if (line.includes("ค่าพลังงานไฟฟ้าประจำเดือน")) {
      chargeDetails.electricity_charge_description = line;
      chargeDetails.electricity_charge_amount = parseFloat(lines[i + 1] || "0");
      chargeDetails.service_charge = parseFloat(lines[i + 2] || "0");
      chargeDetails.ft_charge_total = parseFloat(lines[i + 3] || "0");
      chargeDetails.discount = parseFloat(lines[i + 4] || "0");
      chargeDetails.total_before_vat = parseFloat(lines[i + 5] || "0");
      chargeDetails.vat_7_percent = parseFloat(lines[i + 6] || "0");
      chargeDetails.total_current_bill = parseFloat(lines[i + 7] || "0");
    } else if (line.includes("ค่าไฟฟ้าค้างช่างะเดือนก่อน")) {
      paymentInfo.previous_unpaid_bill = parseFloat(lines[i + 1] || "0");
    } else if (line.includes("รวมเงินที่ต้องชำระทั้งสิ้น")) {
      paymentInfo.total_amount_due = parseFloat(lines[i + 1] || "0");
    } else if (line.includes("โปรดชำาระนับตั้งแต่วันที่")) {
      paymentInfo.due_date = lines[i + 1]?.trim() || "";
    } else if (line.match(/^\d{2}\/\d{2}\/\d{2}$/) && lines[i + 1]?.match(/^\d{2}\/\d{2}\/\d{2}$/)) {
      const billingDate = line;
      const readingDate = lines[i + 1];
      const units = parseInt(lines[i + 2]) || null;
      paymentHistory.push({
        billing_date: billingDate,
        reading_date: readingDate,
        units_consumed: units
      });
    } else if (line.includes("โทร.")) {
      const telMatch = line.match(/โทร\.\s*([\d]+)/);
      result["bank_transfer_details"] = {
        bank_name: "ธ.กสิกรไทย",
        account_number: telMatch ? telMatch[1] : ""
      };
    }
  }

  result["customer_information"] = customerInfo;
  result["account_details"] = accountDetails;
  result["meter_reading"] = meterReading;
  result["charge_details"] = chargeDetails;
  result["payment_information"] = paymentInfo;
  result["payment_history"] = paymentHistory;

  return result;
}