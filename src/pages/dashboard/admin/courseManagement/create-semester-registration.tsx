import { useGetAllAcademicSemestersQuery } from "@/redux/features/admin/academicApi";
import { useCreateSemesterRegistrationMutation } from "@/redux/features/admin/courseManagementApi";
import { Button, Group, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { toast } from "sonner";

const CreateSemesterRegistration = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      academicSemester: "",
      status: "",
      startDate: null,
      endDate: null,
      minCredit: "",
      maxCredit: "",
    },
    validate: {
      academicSemester: (value) =>
        !value ? "Academic Semester field is required" : null,
      status: (value) => (!value ? "Status field is required" : null),
      startDate: (value) => (!value ? "Start date field is required" : null),
      endDate: (value) => (!value ? "End date field is required" : null),
      minCredit: (value) => (!value ? "Min credit field is required" : null),
      maxCredit: (value) => (!value ? "Max credit field is required" : null),
    },
  });

  const [createSemesterRegistration, { isLoading }] =
    useCreateSemesterRegistrationMutation();

  /* on Submit form */
  const onSubmitForm = form.onSubmit(async (values) => {
    try {
      const result = await createSemesterRegistration({
        ...values,
        minCredit: Number(values.minCredit),
        maxCredit: Number(values.maxCredit),
      }).unwrap();

      if (result?.success) {
        toast.success(result?.message);
        form.reset();
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  });

  const { data, isLoading: srIsLoading } = useGetAllAcademicSemestersQuery({});
  const semesterOptions = data?.data?.map((item) => {
    return {
      label: item.name,
      value: item?._id,
    };
  });

  return (
    <div className="p-10 max-w-5xl mx-auto font-poppins">
      <h2 className="text-2xl font-semibold mb-10">
        Create semester registration
      </h2>
      <form onSubmit={onSubmitForm} className="space-y-5">
        <Select
          label="Academic Semester"
          placeholder="Pick academic semester"
          data={semesterOptions || []}
          defaultValue=""
          clearable
          key={form.key("academicSemester")}
          {...form.getInputProps("academicSemester")}
          withAsterisk
          allowDeselect
          searchable
          disabled={srIsLoading}
        />

        <Select
          label="Status"
          placeholder="Pick semester status"
          data={[
            { label: "Upcoming", value: "UPCOMING" },
            { label: "Ongoing", value: "ONGOING" },
            { label: "Ended", value: "ENDED" },
          ]}
          defaultValue=""
          clearable
          key={form.key("status")}
          {...form.getInputProps("status")}
          withAsterisk
        />
        <DatePickerInput
          label="Start Date"
          placeholder="Pick start date"
          key={form.key("startDate")}
          {...form.getInputProps("startDate")}
          clearable
          withAsterisk
        />
        <DatePickerInput
          label="End Date"
          withAsterisk
          placeholder="Pick end date"
          key={form.key("endDate")}
          {...form.getInputProps("endDate")}
          clearable
        />

        <TextInput
          label="Min Credit"
          withAsterisk
          placeholder="Pick Min credit"
          key={form.key("minCredit")}
          {...form.getInputProps("minCredit")}
        />
        <TextInput
          label="Max Credit"
          withAsterisk
          placeholder="Pick Max credit"
          key={form.key("maxCredit")}
          {...form.getInputProps("maxCredit")}
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

export default CreateSemesterRegistration;
