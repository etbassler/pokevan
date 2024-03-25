export const tailwindBreakpoint = (
  xs: number,
  sm: number,
  md: number,
  lg: number,
  xl: number,
  xxl: number
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
