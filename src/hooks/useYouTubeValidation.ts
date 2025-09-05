import { useState, useEffect } from 'react'
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

  const checkUrl = async () => {
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
  }

  useEffect(() => {
    checkUrl()
  }, [])

  return {
    isValidYouTube,
    isLoading,
    currentUrl,
    checkUrl
  }
}
