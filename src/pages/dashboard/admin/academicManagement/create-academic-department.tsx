import {
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicFacultiesQuery,
} from "@/redux/features/admin/academicApi";
import { AcademicFacultyItem } from "@/types/academic.types";
import { Button, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { toast } from "sonner";

type Props = {};

const CreateAcademicDepartment = (props: Props) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      academicFaculty: "",
    },
    validate: {
      academicFaculty: (value) =>
        !value ? "Academic Faculty field is required" : null,
      name: (value) => (!value ? "Name field is required" : null),
    },
  });

  const [createAcademicDepartment, { isLoading }] =
    useCreateAcademicDepartmentMutation();

  /* on Submit form */
  const onSubmitForm = form.onSubmit(async (values) => {
    try {
      const result = await createAcademicDepartment({
        ...values,
      }).unwrap();

      if (result?.success) {
        toast.success(result?.message);
        form.reset();
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.log(error);
    }
  });

  const { data: facultyData } = useGetAllAcademicFacultiesQuery({});

  const facultiesOptions = facultyData?.data?.map(
    (faculty: AcademicFacultyItem) => ({
      value: faculty?._id,
      label: faculty.name,
    })
  );

  return (
    <div className="p-10 max-w-5xl mx-auto font-poppins w-full">
      <h2 className="text-2xl font-semibold mb-10">
        Create academic department
      </h2>
      <form onSubmit={onSubmitForm} className="space-y-5">
        <TextInput
          label="Name"
          withAsterisk
          placeholder="Pick department name"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <Select
          label="Academic Faculty"
          placeholder="Pick academic faculty"
          data={facultiesOptions || []}
          defaultValue=""
          clearable
          key={form.key("academicFaculty")}
          {...form.getInputProps("academicFaculty")}
          withAsterisk
          allowDeselect
          searchable
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit" loading={isLoading} disabled={isLoading}>
            Submit
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default CreateAcademicDepartment;
