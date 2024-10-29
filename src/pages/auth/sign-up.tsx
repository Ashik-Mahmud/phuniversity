import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../components/ui/TextInput";
import {
  emailValidationRegex,
  passwordValidationRegex,
} from "../../config/additional.config";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/store";

type Props = {};

const SignUpPage = (props: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard/overview");
    }
    return () => {};
  }, [token]);
  return (
    <div className="max-w-lg p-10 shadow mx-auto my-40">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-wrapper">
        <h2 className="text-2xl font-semibold mb-5">Register your account</h2>
        <div className="space-y-5">
          <div className="control">
            <TextInput
              type="text"
              label="Name"
              required
              placeholder="Your name"
              register={register("name", {
                required: {
                  value: true,
                  message: "Please enter your name",
                },
              })}
              errorMessage={errors.name?.message}
            />
          </div>
          <div className="control">
            <TextInput
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
                pattern: {
                  value: passwordValidationRegex,
                  message: "Password should be strong ",
                },
              })}
              errorMessage={errors.password?.message}
            />
          </div>
          <div className="control">
            <button className="px-10 w-full py-4 bg-primary text-white rounded">
              Register
            </button>
          </div>
          <div className="control">
            <p>
              Already have account?{" "}
              <Link to="/sign-in" className="text-primary underline">
                login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
