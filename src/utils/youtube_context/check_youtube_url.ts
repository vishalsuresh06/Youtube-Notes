
export const checkYoutubeUrl = (url: string): boolean => {
  const youtubePatterns = [
    'youtube.com/watch',  // Standard watch URLs
    'youtu.be/',          // Short URLs
    'youtube.com/embed/', // Embedded videos
    'youtube.com/v/',     // Direct video URLs
  ]
  
  return youtubePatterns.some(pattern => url.includes(pattern))
}