export function BrandMark() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    // The parent link supplies the accessible name.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${basePath}/images/brand/mc.svg`}
      width="38"
      height="28"
      alt=""
    />
  );
}
