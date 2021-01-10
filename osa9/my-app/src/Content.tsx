import React from "react";
import { ContentProps } from './types';

export const Content: React.FC<ContentProps> = (props) => {
    return (
        <div>
            {props.courseParts.map(course => (
                <p key={course.name}>
                    {course.name} {course.exerciseCount}
                </p>
            ))}
        </div>
    );
};
