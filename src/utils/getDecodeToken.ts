import { jwtDecode, JwtPayload } from "jwt-decode";
const getDecodeToken = async (token: string) => {

    const decoded = jwtDecode<JwtPayload>(token);

    return decoded;
}

export default getDecodeToken;