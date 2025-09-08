import React from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import styles from './info.module.css'

interface InfoPopupProps {
  open: boolean;
  onClose: () => void;
}

const InfoPopup = ({ open, onClose }: InfoPopupProps) => {
  return (
    <>
        <Dialog 
          open={open} 
          onClose={onClose} 
          className={styles.dialogContainer}
        >
            <div className={styles.dialogPanelContainer}>
                <DialogPanel className={styles.dialogPanel}>
                    <DialogTitle className={styles.dialogTitle}>Shortcuts</DialogTitle>
                    <div className={styles.shortcutList}>
                        <div className={styles.shortcutItem}>
                            <span className={styles.shortcutKey}>⌘T</span>
                            <div className={styles.shortcutContent}>
                                <span className={styles.shortcutName}>Timestamp</span>
                                <span className={styles.shortcutDescription}>Insert current video time</span>
                            </div>
                        </div>
                        <div className={styles.shortcutItem}>
                            <span className={styles.shortcutKey}>⌘S</span>
                            <div className={styles.shortcutContent}>
                                <span className={styles.shortcutName}>Save</span>
                                <span className={styles.shortcutDescription}>Save your notes instantly</span>
                            </div>
                        </div>
                        <div className={styles.shortcutItem}>
                            <span className={styles.shortcutKey}>⌘B</span>
                            <div className={styles.shortcutContent}>
                                <span className={styles.shortcutName}>Bold</span>
                                <span className={styles.shortcutDescription}>Format selected text</span>
                            </div>
                        </div>
                        <div className={styles.shortcutItem}>
                            <span className={styles.shortcutKey}>⌘I</span>
                            <div className={styles.shortcutContent}>
                                <span className={styles.shortcutName}>Italicise</span>
                                <span className={styles.shortcutDescription}>Emphasize selected text</span>
                            </div>
                        </div>
                        <div className={styles.shortcutItem}>
                            <span className={styles.shortcutKey}>⌘Y</span>
                            <div className={styles.shortcutContent}>
                                <span className={styles.shortcutName}>Youtube</span>
                                <span className={styles.shortcutDescription}>Quick access to YouTube</span>
                            </div>
                        </div>
                        <div className={styles.shortcutItem}>
                            <span className={styles.shortcutKey}>⌘←</span>
                            <div className={styles.shortcutContent}>
                                <span className={styles.shortcutName}>Dashboard</span>
                                <span className={styles.shortcutDescription}>Return to notes list</span>
                            </div>
                        </div>
                    </div>
                    <button className={styles.closeButton} onClick={onClose}>Close</button>
                </DialogPanel>
            </div>
        </Dialog>
    </>
  )
}

export default InfoPopup
