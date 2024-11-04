import { jwtDecode, JwtPayload } from "jwt-decode";
const getDecodeToken = (token: string) => {

    const decoded = jwtDecode<JwtPayload>(token);

    return decoded;
}

export default getDecodeToken;