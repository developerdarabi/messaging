/// <reference types="vite-plugin-svgr/client" />
import WhateverIcon from "../assets/app_logo.svg?react";

export default function AppLogo({ className }) {
    return (
        <div className={`${className}`}>
            <WhateverIcon  width={150} height={150}/>
        </div>
    )
}
