import React, { useState, useEffect } from 'react'
import NoteEditor from './NoteEditor'
import { checkYoutubeUrl, getCurrentTabUrl } from '../../utils'
import { YTWarningPopup } from './index'

interface NewNoteProps {
    onBack: () => void
}

const NewNote = ({ onBack }: NewNoteProps) => {
  const [showWarning, setShowWarning] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUrl = async () => {
      const currentTabUrl = await getCurrentTabUrl()
      const isYouTube = currentTabUrl ? checkYoutubeUrl(currentTabUrl) : false
      setShowWarning(!isYouTube)
      setIsLoading(false)
    }
    
    checkUrl()
  }, [])

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        background: '#111111',
        color: '#e2e8f0',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
      }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ fontSize: '16px', color: '#94a3b8' }}>
            Checking URL...
          </p>
        </div>
      </div>
    )
  }

  if (showWarning) {
    return (
      <>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          background: '#111111',
          color: '#e2e8f0',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
        }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: '600' }}>
              Not a YouTube video
            </h2>
            <p style={{ marginBottom: '24px', fontSize: '16px', color: '#94a3b8' }}>
              You can only create new notes on YouTube videos
            </p>
            <button 
              onClick={onBack}
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      </>
    )
  }

  return <NoteEditor onBack={onBack} />
}

export default NewNote