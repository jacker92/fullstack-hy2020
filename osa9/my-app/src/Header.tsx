import React from "react";
import { HeaderProps } from './types';

export const Header: React.FC<HeaderProps> = (props) => {
    return (
        <div>
            {props.name}
        </div>
    );
};
