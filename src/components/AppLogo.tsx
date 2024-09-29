/// <reference types="vite-plugin-svgr/client" />
import WhateverIcon from "../assets/app_logo.svg?react";

export default function AppLogo({ className }: { className: string }) {
    return (
        <div className={`${className}`}>
            <WhateverIcon className="w-[250px] h-[250px]"/>
        </div>
    )
}
