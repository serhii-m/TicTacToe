import React from "react";

export default function PlayerIndicator({className, children}) {
    return (
        <p className={className}>{children}</p>
    )
}