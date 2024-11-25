import { Navigate, Outlet, useLocation } from "react-router-dom";

type Props = {
    roles: any
}

export default function CheckAuth({roles}: Props) {
    const user: any = null;
    const location = useLocation();

    if (!user) {
        return <Navigate to={"/auth/login"} state={location} />
    }

    if (!roles.includes(user.role)) {
        return <Navigate to={"/auth/unauthorised"} state={location} />
    }

    return <Outlet />
}
