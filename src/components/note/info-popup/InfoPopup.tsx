import React from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import styles from './info.module.css'

interface InfoPopupProps {
  open: boolean;
  onClose: () => void;
}

const InfoPopup = ({ open, onClose }: InfoPopupProps) => {
  return (
    <>
        <Dialog open={open} onClose={onClose} className={styles.dialogContainer}>
            <div className={styles.dialogPanelContainer}>
                <DialogPanel className={styles.dialogPanel}>
                    <DialogTitle className={styles.dialogTitle}>Note Shortcuts</DialogTitle>
                    <Description className={styles.dialogDescription}>A list of helpful shortcuts</Description>
                    <hr/>
                    <div className={styles.listContainer}>
                        <ul className={styles.shortcutList}>
                            <li className={styles.listTitle}>Add Timestamp</li>
                            <li className={styles.listTitle}>Auto Save</li>
                        </ul>
                    </div>
                    <button className={styles.closeButton} onClick={onClose}>Close</button>
                </DialogPanel>
            </div>
        </Dialog>
    </>
  )
}

export default InfoPopup
