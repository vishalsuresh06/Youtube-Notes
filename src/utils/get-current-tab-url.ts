export const getCurrentTabUrl = async (): Promise<string | null> => {
  try {
    // For side panels, we need to get the active tab in the current window
    // but not the side panel itself
    const tabs = await chrome.tabs.query({ currentWindow: true })
    
    // Find the active tab (not the side panel)
    const activeTab = tabs.find(tab => tab.active && !tab.url?.includes('chrome-extension://'))
    
    if (activeTab?.url) {
      return activeTab.url
    }
    
    // Fallback: try the first tab that's not an extension page
    const nonExtensionTab = tabs.find(tab => 
      tab.url && 
      !tab.url.startsWith('chrome://') && 
      !tab.url.startsWith('chrome-extension://') &&
      !tab.url.startsWith('moz-extension://')
    )
    
    if (nonExtensionTab?.url) {
      return nonExtensionTab.url
    }
    return null
  } catch (error) {
    console.error('Error getting current tab URL:', error)
    return null
  }
}
