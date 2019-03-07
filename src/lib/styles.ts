// This doesn't match page widths because we want
// some pages to be smaller than mobile sizes on desktop.
export const MEDIA_QUERIES = {
  isMobile: '(max-width: 600px), (max-height: 420px)',
  // Add 0.02 to width so it doesn't overlap with mobile width, this is bootstrap's approach
  isNotMobile: '(min-width: 600.02px) and (min-height: 420.02px)',
};
