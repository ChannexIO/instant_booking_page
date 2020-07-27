import { CheckOutlined } from "@ant-design/icons";

const DEFAULT_ICON = CheckOutlined;

const FACILITY_ICONS_BY_CODE = {
};

export default function getFacilityIconByCode(code) {
  const icon = FACILITY_ICONS_BY_CODE[code] || DEFAULT_ICON;

  return icon;
}