import React from "react"

import LoginPage from "./login/LoginPage"

import "./global.module.css"

const sidepanel = () => {
  return (
    <div>
      <LoginPage
        onLogin={() => {
          chrome.runtime.sendMessage({ type: "LOGIN" })
        }}
        onLoginWithDifferentAccount={() => {
          chrome.runtime.sendMessage({ type: "LOGIN_WITH_DIFFERENT_ACCOUNT" })
        }}
        lastUser={null}
        isLoading={false}
      />
    </div>
  )
}

export default sidepanel
