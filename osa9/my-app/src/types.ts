export interface ContentProps {
    courseParts: CoursePart[]
}

export interface HeaderProps {
    name: string
}

export interface TotalProps {
    sum: number
}

export interface PartProps {
    course: CoursePart
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface DescriptiveCoursePart extends CoursePartBase {
    description: string;
}

interface MyOwnCoursePart extends DescriptiveCoursePart {
    name: "My Own Course Part",
    foo: string;
}

interface CoursePartOne extends DescriptiveCoursePart {
    name: "Fundamentals";
    exerciseCount: 10,
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends DescriptiveCoursePart {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | MyOwnCoursePart;