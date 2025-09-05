import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { useState } from 'react'
import styles from './modal.module.css'

const YTWarningPopup = () => {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={styles.dialogContainer}>
          <div>
            <DialogPanel>
              <DialogTitle></DialogTitle>
              <Description></Description>
              <div>
                <button onClick={() => setIsOpen(false)}>Ok</button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
    </>
  )
}

export default YTWarningPopup