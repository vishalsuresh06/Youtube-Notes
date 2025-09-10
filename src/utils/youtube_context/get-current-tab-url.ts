export const getCurrentTabUrl = async (): Promise<string | null> => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    return tab?.url || null
  } catch (error) {
    console.error("Error getting current tab URL:", error)
    return null
  }
}
