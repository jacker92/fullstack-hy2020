import React from "react";
import { ContentProps, PartProps } from './types';
import { assertNever } from "./utils";

export const Content: React.FC<ContentProps> = (props) => {
    return (
        <div>
            {props.courseParts.map(course => (
                <Part key={course.name} course={course} />
            ))}
        </div>
    );
};

export const Part: React.FC<PartProps> = ({ course }) => {

    switch (course.name) {
        case "Fundamentals":
            return (
                <div>
                    <p key={course.name}>
                        {course.name} {course.description} {course.exerciseCount}
                    </p>
                </div>
            )
        case "Deeper type usage":
            return (
                <div>
                    <p key={course.name}>
                        {course.name} {course.description} {course.exerciseSubmissionLink}  {course.exerciseCount}
                    </p>
                </div>
            )
        case "Using props to pass data":
            return (
                <div>
                    <p key={course.name}>
                        {course.name} {course.groupProjectCount} {course.exerciseCount}
                    </p>
                </div>
            )
        case "My Own Course Part":
            return (
                <div>
                    <p key={course.name}>
                        {course.name} {course.foo} {course.exerciseCount}
                    </p>
                </div>
            )
        default:
            assertNever(course)
            break;
    }
    return (<div></div>)
}
