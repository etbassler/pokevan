export const tailwindBreakpoint = (
  xs: string | number,
  sm: string | number,
  md: string | number,
  lg: string | number,
  xl: string | number,
  xxl: string | number
) => {
  const width = window.innerWidth;
  if (width >= 1536) {
    return xxl;
  } else if (width >= 1280) {
    return xl;
  } else if (width >= 1024) {
    return lg;
  } else if (width >= 768) {
    return md;
  } else if (width >= 640) {
    return sm;
  } else {
    return xs;
  }
};
