import { CheckOutlined } from "@ant-design/icons";

const DEFAULT_ICON = CheckOutlined;

const BED_ICONS_BY_CODE = {
};

export default function getBedIconByCode(code) {
  const icon = BED_ICONS_BY_CODE[code] || DEFAULT_ICON;

  return icon;
}