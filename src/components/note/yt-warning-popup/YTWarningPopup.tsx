import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'
import { MESSAGES } from '../../../constants/messages'
import styles from './modal.module.css'

interface YTWarningPopupProps {
  isOpen: boolean
  onClose: () => void
}

const YTWarningPopup = ({ isOpen, onClose }: YTWarningPopupProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className={styles.dialogContainer}>
      <DialogPanel className={styles.dialogPanel}>
        <DialogTitle className={styles.dialogTitle}>
          {MESSAGES.WARNINGS.NOT_YOUTUBE_TITLE}
        </DialogTitle>
        <Description className={styles.dialogDescription}>
          {MESSAGES.WARNINGS.NOT_YOUTUBE_MESSAGE}
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