export interface ContentProps {
    courseParts: CoursePart[]
}

export interface HeaderProps {
    name: string
}

export interface TotalProps {
    sum: number
}

export interface CoursePart {
    name: string,
    exerciseCount: number
}