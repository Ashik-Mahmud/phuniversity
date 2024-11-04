import { IUser } from "@/redux/features/auth/auth.types";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/store";
import getDecodeToken from "@/utils/getDecodeToken";
import { useEffect, useState } from "react";

const useGetUserByToken = () => {
  const [user, setUser] = useState<IUser>();

  const token = useAppSelector(useCurrentToken);
  useEffect(() => {
    if (token) {
      const userInfo = getDecodeToken(token!) as IUser;
      setUser(userInfo as IUser);
    }
  }, [token]);
  return user;
};

export default useGetUserByToken;
