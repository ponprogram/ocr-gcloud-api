export function parseThaiIDCardText(text: string): Record<string, string> {
    // const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    const lines = text
        .split(/\n(?:\d{0,2})/) // แยกด้วย \n, \n1, \n2, ..., \n10
        .map(line => line.trim())
        .filter(Boolean);

    const result: Record<string, string> = {};
    let index = 0;

    while (index < lines.length) {
        const line = lines[index];

        if (line.includes("เลขประจำตัวประชาชน")) {
            result["id_number"] = line.replace("เลขประจำตัวประชาชน", "").trim();
        } else if (line.includes("ชื่อตัวและชื่อสกุล")) {
            result["name_th"] = line.replace("ชื่อตัวและชื่อสกุล", "").trim();
            result["name_en"] = lines[index + 1]?.replace("Name", "").trim() || "";
            result["last_name_en"] = lines[index + 2]?.replace("Last name", "").trim() || "";
            index += 2;
        } else if (line.includes("เกิดวันที่")) {
            result["dob_th"] = line.replace("เกิดวันที่", "").trim();
            result["dob_en"] = lines[index + 1]?.replace("Date of Birth", "").trim() || "";
            index += 1;
        } else if (line.startsWith("ที่อยู่")) {
            result["address_line1"] = line.replace("ที่อยู่", "").trim();
            result["address_line2"] = lines[index + 1]?.trim() || "";
            index += 1;
        } else if (line.includes("วันออกบัตร")) {
            result["issued_date_th"] = line.replace("วันออกบัตร", "").trim();
            result["issued_date_en"] = lines[index + 1]?.replace("Date", "").replace("of", "").replace("issue", "").trim() || "";
            index += 1;
        } else if (line.includes("วันบัตรหมดอายุ")) {
            result["expiry_date_th"] = line.replace("วันบัตรหมดอายุ", "").trim();
            result["expiry_date_en"] = lines[index + 1]?.trim() || "";
            index += 1;
        } else if (line.match(/\d{4}-\d{2}-\d{2}/)) {
            result["reference_code"] = line.trim();
        } else if (line.includes("สำเนาถูกต้อง")) {
            result["is_copy"] = "true";
        }

        index++;
    }
    return result;
}
