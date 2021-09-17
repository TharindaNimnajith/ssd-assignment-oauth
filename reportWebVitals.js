const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(
      ({
         getCLS,
         getFID,
         getFCP,
         getLCP,
         getTFB
       }) => {
        getCLS(onPerfEntry)
        getFID(onPerfEntry)
        getFCP(onPerfEntry)
        getLCP(onPerfEntry)
        getTFB(onPerfEntry)
      })
  }
}

export default reportWebVitals
