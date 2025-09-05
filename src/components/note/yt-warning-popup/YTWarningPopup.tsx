import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'
import styles from './modal.module.css'

interface YTWarningPopupProps {
  isOpen: boolean
  onClose: () => void
}

const YTWarningPopup = ({ isOpen, onClose }: YTWarningPopupProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className={styles.dialogContainer}>
      <DialogPanel className={styles.dialogPanel}>
        <DialogTitle className={styles.dialogTitle}>Not a YouTube video</DialogTitle>
        <Description className={styles.dialogDescription}>
          You can only create new notes on YouTube videos
        </Description>
        <div className={styles.buttonContainer}>
          <button onClick={onClose} className={styles.okButton}>
            OK
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  )
}

export default YTWarningPopup