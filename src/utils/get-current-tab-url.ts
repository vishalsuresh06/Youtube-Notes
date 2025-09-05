export const getCurrentTabUrl = async (): Promise<string | null> => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab?.url || null;
  } catch (error) {
    // Silently handle errors - extension might not have tabs permission
    return null;
  }
};
