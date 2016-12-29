
export const breakpoints = {
  xs: 480,
  sm: 767,
  md: 992,
  lg: 1200,
  xlg: 1400,
}


// Returns the css zoom attribute used for resizing the pitch constellation and xyPad
export const getZoom = () => {
  const w = window.innerWidth;
  const {xs, sm, md, lg, xlg} = breakpoints;
  let zoom = 1;
  if (w < sm) {
    zoom = 0.5
  } else if (w < md) {
    zoom = 0.8
  } else if (w < lg) {
    zoom = 0.9
  } else if (w < xlg) {
    zoom = 1
  } else {
    zoom = 1.5
  }
  return zoom;
}