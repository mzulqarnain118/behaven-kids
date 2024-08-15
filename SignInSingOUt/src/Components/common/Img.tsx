export default function Img({
  src,
  className,
  alt,
  width,
  type,
  ...others
}: any) {
  return (
    <img
      alt={alt}
      style={{
        width: type == "icon" ? "48px" : type == "smallIcon" ? "12px" : width,
      }}
      src={src}
      className={type === "logo" ? className : null}
      loading={"lazy"}
      {...others}
    />
  );
}
