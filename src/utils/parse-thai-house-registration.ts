export function parseThaiHouseRegistrationText(text: string): Record<string, any> {
  const lines = text.split(/\n/).map(line => line.trim()).filter(Boolean);
  const result: Record<string, any> = {
    document_type: "House Registration (partial)",
    header: {},
    house_details_section_1: {},
    house_details_section_2: {}
  };

  // จัดเก็บข้อมูลเบื้องต้น
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Header
    if (line.includes("รายการเกี่ยวกับบ้าน")) {
      result.header["report_title"] = "รายการเกี่ยวกับการบ้าน";
    } else if (line.includes("เล่มที่")) {
      result.header["page_number"] = lines[i + 1] || "";
      i++;
    }

    // Section 1
    else if (line.includes("เลขรหัสประจําบ้าน")) {
      result.house_details_section_1["house_id_number"] = lines[i + 1] || "";
      i++;
    } else if (line.includes("รายการที่อยู่")) {
      result.house_details_section_1["details_address"] = line.replace("รายการที่อยู่", "").trim();
    } else if (line.includes("สํานักทะเบียน")) {
      result.house_details_section_1["registration_location_amphoe"] = line.replace("สํานักทะเบียน", "").trim();
    } else if (line.match(/\d{4}-\d{6}-\d/)) {
      result.house_details_section_1["house_id_number"] = line;
    } else if (line.includes("ตาบล")) {
      result.house_details_section_1["registration_location_tambon"] = line;
    } else if (line.includes("ชื่อหมู่บ้าน")) {
      result.house_details_section_1["house_name"] = lines[i + 1] || "";
      i++;
    } else if (line.includes("ประเภทบ้าน")) {
      result.house_details_section_1["house_category"] = line.replace("ประเภทบ้าน", "").trim();
    } else if (line.includes("ลักษณะบ้าน")) {
      result.house_details_section_1["house_type"] = lines[i + 1] || "";
      i++;
    } else if (line.includes("ลงชื่อ")) {
      result.house_details_section_1["signatory_name"] = lines[i + 1]?.replace("(", "").replace(")", "").trim();
      i++;
    } else if (line.includes("นายทะเบียน")) {
      result.house_details_section_1["registrar_name"] = "นายทะเบียน";
    } else if (line.includes("วันเดือนปีที่พิมพ์ทะเบียนบ้าน")) {
      result.house_details_section_1["registration_date"] = lines[i + 1] || "";
      i++;
    }

    // Section 2
    else if (line.includes("รายการบุคคลในบ้าน")) {
      result.house_details_section_2["list_of_person_in_house"] = "รายการบุคคลในบ้านของสมุดทะเบียนบ้าน";
    } else if (line.includes("รายการบุคคล") && lines[i + 1]?.match(/\d{4}-\d{6}-\d/)) {
      result.house_details_section_2["house_id_number_repeat"] = lines[i + 1];
      i++;
    } else if (line.includes("ล่าดับที")) {
      result.house_details_section_2["sequence_number"] = line.replace("ล่าดับที", "").trim();
    } else if (line.startsWith("ชื่อ")) {
      result.house_details_section_2["name_th"] = line.replace("ชื่อ", "").trim();
    } else if (line.includes("เลขประจําตัวประชาชน")) {
      result.house_details_section_2["id_card_number"] = line.replace("เลขประจําตัวประชาชน", "").trim();
    } else if (line.includes("สถานภาพ")) {
      result.house_details_section_2["status"] = line.replace("สถานภาพ", "").trim();
    } else if (line.includes("สัญชาติ") && !result.house_details_section_2["nationality"]) {
      result.house_details_section_2["nationality"] = "สัญชาติ ไทย";
    } else if (line.includes("เพศ")) {
      result.house_details_section_2["gender"] = line.replace("เพศ", "").trim();
    } else if (line.includes("เกิดเมื่อ")) {
      result.house_details_section_2["date_of_birth"] = line.replace("เกิดเมื่อ", "").trim();
    } else if (line.includes("มารดาผู้ให้กำเนิด")) {
      result.house_details_section_2["relation_to_house_owner"] = line.replace("มารดาผู้ให้กำเนิด ชื่อ", "").trim();
    } else if (line.includes("บิดาผู้ให้กำเนิด")) {
      result.house_details_section_2["house_owner_name"] = line.replace("บิดาผู้ให้กำเนิด ชื่อ", "").trim();
    } else if (line.includes("มาจาก")) {
      result.house_details_section_2["moved_in_from"] = line.trim();
    } else if (line.includes("เข้ามาอยู่ในบ้านนี้เมื่อ")) {
      result.house_details_section_2["moved_in_date"] = line.replace("เข้ามาอยู่ในบ้านนี้เมื่อ", "").trim();
    } else if (line.includes("ไปที่")) {
      result.house_details_section_2["status_footer"] = "ไม่ไป";
    } else if (line.includes("ลงชื่อ")) {
      result.house_details_section_2["signatory_name_2"] = lines[i + 1]?.replace("(", "").replace(")", "").trim();
      i++;
    } else if (line.includes("นายทะเบียน")) {
      result.house_details_section_2["registrar_name_2"] = "นายทะเบียน";
    }

    i++;
  }

  return result;
}