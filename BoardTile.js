import React, {useCallback} from "react";

export default function BoardTile({onClick, index, className, children}) {
    const handleClick = useCallback(() => onClick(index), [onClick, index]);

    return (
        <button onClick={handleClick} className={className}>{children}</button>
    )
}