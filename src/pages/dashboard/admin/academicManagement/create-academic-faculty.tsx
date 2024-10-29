import { useCreateAcademicFacultyMutation } from "@/redux/features/admin/academicApi";
import { Autocomplete, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { toast } from "sonner";

type Props = {};

const CreateAcademicFaculty = (props: Props) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => (!value ? "Name field is required" : null),
    },
  });

  const [createAcademicFaculty, { isLoading }] =
    useCreateAcademicFacultyMutation();

  /* on Submit form */
  const onSubmitForm = form.onSubmit(async (values) => {
    try {
      const result = await createAcademicFaculty({
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

  return (
    <div className="p-10 max-w-5xl mx-auto font-poppins">
      <h2 className="text-2xl font-semibold mb-10">Create academic faculty</h2>
      <form onSubmit={onSubmitForm} className="space-y-5">
        <Autocomplete
          label="Faculty name"
          withAsterisk
          placeholder="Faculty name"
          key={form.key("name")}
          {...form.getInputProps("name")}
          data={[
            "Faculty of programming",
            "Faculty of research ",
            "Faculty of teaching-focused",
            "Faculty of Interdisciplinary ",
            "Faculty of Advising or Mentoring",
          ]}
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

export default CreateAcademicFaculty;
