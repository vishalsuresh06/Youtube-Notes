import { useState, useEffect, useCallback } from 'react'
import { checkYoutubeUrl, getCurrentTabUrl } from '../utils'

interface UseYouTubeValidationReturn {
  isValidYouTube: boolean
  isLoading: boolean
  currentUrl: string | null
  checkUrl: () => Promise<void>
}

export const useYouTubeValidation = (): UseYouTubeValidationReturn => {
  const [isValidYouTube, setIsValidYouTube] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUrl, setCurrentUrl] = useState<string | null>(null)

  const checkUrl = useCallback(async () => {
    setIsLoading(true)
    try {
      const url = await getCurrentTabUrl()
      setCurrentUrl(url)
      const isValid = url ? checkYoutubeUrl(url) : false
      setIsValidYouTube(isValid)
    } catch (error) {
      console.error('Failed to check URL:', error)
      setIsValidYouTube(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initial check
    checkUrl()

    // Listen for tab updates
    const handleTabUpdate = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
      // Only check if the tab became active or URL changed
      if (changeInfo.status === 'complete' || changeInfo.url) {
        checkUrl()
      }
    }

    const handleTabActivated = (activeInfo: chrome.tabs.TabActiveInfo) => {
      // Check when user switches to a different tab
      checkUrl()
    }

    // Add listeners
    chrome.tabs.onUpdated.addListener(handleTabUpdate)
    chrome.tabs.onActivated.addListener(handleTabActivated)

    // Cleanup listeners
    return () => {
      chrome.tabs.onUpdated.removeListener(handleTabUpdate)
      chrome.tabs.onActivated.removeListener(handleTabActivated)
    }
  }, [checkUrl])

  return {
    isValidYouTube,
    isLoading,
    currentUrl,
    checkUrl
  }
}
