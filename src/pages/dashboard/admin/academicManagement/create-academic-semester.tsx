type Props = {};
import { useCreateAcademicSemesterMutation } from "@/redux/features/admin/academicApi";
import { Button, Group, Select, TextInput } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { toast } from "sonner";

const CreateAcademicSemester = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      code: "",
      name: "",
      year: "",
      startMonth: null,
      endMonth: null,
    },
    validate: {
      code: (value) => (!value ? "Code field is required" : null),
      name: (value) => (!value ? "Name field is required" : null),
      year: (value) => (!value ? "year field is required" : null),
      startMonth: (value) => (!value ? "Start Month field is required" : null),
      endMonth: (value) => (!value ? "End Month field is required" : null),
    },
  });

  const year = new Date().getFullYear();
  const yearsOptions = Array.from([1, 2, 3, 4]).map(
    (number) => year + number + ""
  );

  const [createAcademicSemester, { isLoading }] =
    useCreateAcademicSemesterMutation();

  /* on Submit form */
  const onSubmitForm = form.onSubmit(async (values) => {
    try {
      const result = await createAcademicSemester({
        ...values,
        startMonth: dayjs(values.startMonth).format("MMMM"),
        endMonth: dayjs(values.endMonth).format("MMMM"),
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
      <h2 className="text-2xl font-semibold mb-10">Create academic semester</h2>
      <form onSubmit={onSubmitForm} className="space-y-5">
        <TextInput
          label="Code"
          withAsterisk
          placeholder="Code"
          key={form.key("code")}
          {...form.getInputProps("code")}
        />
        <Select
          label="Name"
          placeholder="Pick semester name"
          data={["Summer", "Autumn", "Fall"]}
          defaultValue=""
          clearable
          key={form.key("name")}
          {...form.getInputProps("name")}
          withAsterisk
        />

        <Select
          label="Year"
          placeholder="Pick semester year"
          data={yearsOptions || []}
          defaultValue=""
          clearable
          key={form.key("year")}
          {...form.getInputProps("year")}
          withAsterisk
        />

        <MonthPickerInput
          label="Start Month"
          placeholder="Pick start month"
          key={form.key("startMonth")}
          {...form.getInputProps("startMonth")}
          clearable
          valueFormat="MMM"
        />

        <MonthPickerInput
          label="End Month"
          placeholder="Pick end month"
          key={form.key("endMonth")}
          {...form.getInputProps("endMonth")}
          clearable
          valueFormat="MMM"
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

export default CreateAcademicSemester;
