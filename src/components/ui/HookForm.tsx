import { FormProvider, useForm } from "react-hook-form";

type Props = {
  children: React.ReactNode;
};

const HookForm = ({ children }: Props) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default HookForm;
