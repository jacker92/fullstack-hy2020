import React from "react";
import { TotalProps } from './types';

export const Total: React.FC<TotalProps> = (props) => {
    return (
        <div>
            Number of exercises {props.sum}
        </div>
    );
};
