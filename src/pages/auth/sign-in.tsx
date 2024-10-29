import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import TextInput from "../../components/ui/TextInput";
import { IUser, TUserRole } from "../../redux/features/auth/auth.types";
import { useOnLoginMutation } from "../../redux/features/auth/authApi";
import { onLogin } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useCurrentToken, useCurrentUser } from "../../redux/store";
import getDecodeToken from "../../utils/getDecodeToken";
import { getModifiedRole } from "../../utils/helper";

type Props = {};

const SignInPage = (props: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "admin123",
    },
  });

  const [login, { isLoading }] = useOnLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);
  const storedUser = useAppSelector(useCurrentUser);

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await login(data).unwrap();
      const token = response?.data?.accessToken;
      const user = await getDecodeToken(token);
      dispatch(onLogin({ user: user as IUser, token: token }));
      toast.success("Login success", {});
      if (user) {
        navigate(
          `/${getModifiedRole((user as IUser)?.role as TUserRole)}/overview`
        );
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Something went wrong with the code",
        {}
      );
    }
  };

  useEffect(() => {
    if (token && storedUser?.role) {
      navigate(`/${getModifiedRole(storedUser?.role as TUserRole)}/overview`);
    }
    return () => {};
  }, [token]);
  return (
    <div className="max-w-lg p-10 shadow mx-auto my-40">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-wrapper">
        <h2 className="text-2xl font-semibold mb-5">Login your account</h2>
        <div className="space-y-5">
          <div className="control">
            {/* <TextInput
              type="email"
              label="Email"
              required
              placeholder="Your email"
              register={register("email", {
                required: {
                  value: true,
                  message: "Please enter your email",
                },
                pattern: {
                  value: emailValidationRegex,
                  message: "Please enter valid email",
                },
              })}
              errorMessage={errors.email?.message}
            /> */}
            <TextInput
              type="text"
              label="ID"
              required
              placeholder="Your ID"
              register={register("id", {
                required: {
                  value: true,
                  message: "Please enter your ID",
                },
              })}
              errorMessage={errors.id?.message}
            />
          </div>
          <div className="control">
            <TextInput
              type="password"
              label="Password"
              required
              placeholder="Your Password"
              register={register("password", {
                required: {
                  value: true,
                  message: "Please enter your password",
                },
                // pattern: {
                //   value: passwordValidationRegex,
                //   message: "Password should be strong ",
                // },
              })}
              errorMessage={errors.password?.message}
            />
          </div>
          <div className="control">
            <button
              className="px-10 w-full py-4 bg-primary text-white rounded disabled:opacity-40 disabled:pointer-events-none"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
          <div className="control hidden">
            <p>
              Don't have account?{" "}
              <Link to="/sign-up" className="text-primary underline">
                create
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
