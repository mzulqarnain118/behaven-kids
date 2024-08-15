import {
  StarRateRounded,
  YouTube,
  AddCircle,
  Search,
  Tag,
  StarBorderRounded,
  ArrowDropDown,
  Adb,
  MoreHorizRounded,
  Close,
  Menu,
  Clear,
  FiberManualRecord,
  Person,
  Delete,
  Add,
  Lock,
  ThumbUpAlt,
  ThumbUpOffAlt,
  MoreVert,
  Edit,
  PushPin,
  Email,
  Password,
  ArrowForward,
  ArrowForwardIos,
  Person2,
} from "@mui/icons-material";

const MuiIcon = ({
  name,
  IconColor,
  color,
  fontSize,
  bgColor,
  size,
  variant,
  width,
  height,
  onClick,
  disabled,
  className,
  sx,
}: any) => {
  const iconNames: any = {
    StarRateRounded,
    Search,
    YouTube,
    Menu,
    Lock,
    AddCircle,
    Tag,
    Clear,
    Add,
    Delete,
    StarBorderRounded,
    FiberManualRecord,
    ArrowDropDown,
    Adb,
    MoreHorizRounded,
    Close,
    Person,
    ThumbUpAlt,
    ThumbUpOffAlt,
    MoreVert,
    Edit,
    PushPin,
    Email,
    Password,
    ArrowForward,
    ArrowForwardIos,
    Person2,
  };
  const IconComponent: any = iconNames[name] || null;

  return (
    <IconComponent
      onClick={onClick}
      disabled={disabled}
      color={IconColor}
      className={`cursor ${className}}`}
      fontSize={size}
      variant={variant}
      sx={{
        color: !IconColor && (color || "inherit"),
        fontSize: fontSize,
        width: width,
        height: height,
        backgroundColor: bgColor,
        ...sx,
      }}
    />
  );
};
export default MuiIcon;
