
export const checkYoutubeUrl = (url: string): boolean => {
  if (!url) return false
  
  const youtubePatterns = [
    'youtube.com/watch',     // Standard watch URLs
    'youtu.be/',             // Short URLs
    'youtube.com/embed/',    // Embedded videos
    'youtube.com/v/',        // Direct video URLs
    'm.youtube.com/watch',   // Mobile YouTube
    'www.youtube.com/watch', // www prefix
  ]
  
  return youtubePatterns.some(pattern => url.includes(pattern))
}