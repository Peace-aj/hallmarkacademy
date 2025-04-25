export const ITEMS_PER_PAGE = 10;

type RouteAccessMap = {
    [key: string]: string[];
}

export const routeAccessMap: RouteAccessMap = {
    "/super(.*)": ["super"],
    "/management(.*)": ["management"],
    "/admin(.*)": ["admin"],
    "/student(.*)": ["student"],
    "/teacher(.*)": ["teacher"],
    "/parent(.*)": ["parent"],
    "/teachers": ["super", "management", "admin", "teacher"],
    "/students": ["super", "management", "admin", "teacher"],
    "/parents": ["super", "management", "admin", "teacher"],
    "/subjects": ["super", "management", "admin",],
    "/classes": ["super", "management", "admin", "teacher"],
    "/exams": ["admin", "teacher", "student", "parent"],
    "/assignments": ["admin", "teacher", "student", "parent"],
    "/results": ["admin", "teacher", "student", "parent"],
    "/attendance": ["admin", "teacher", "student", "parent"],
    "/events": ["admin", "teacher", "student", "parent"],
    "/announcements": ["admin", "teacher", "student", "parent"],
}