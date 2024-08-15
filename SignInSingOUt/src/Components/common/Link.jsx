import { Link as RouterLink } from "react-router-dom";

export default function Link({ label, to, style }) {
  return <RouterLink style={style} to={to}>{` ${label} `}</RouterLink>;
}
