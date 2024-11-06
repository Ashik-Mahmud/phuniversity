import {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/admin/courseManagementApi";
import { ICourseItem } from "@/types/courses.types";
import { Button, Group, MultiSelect, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { toast } from "sonner";

type Props = {};

const CreateCourse = (props: Props) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      prefix: "",
      code: "",
      credits: "",
      preRequisiteCourses: [],
    },
    validate: {
      title: (value) => (!value ? "Title field is required" : null),
      prefix: (value) => (!value ? "Prefix field is required" : null),
      code: (value) => (!value ? "Code field is required" : null),
      credits: (value) => (!value ? "Credits field is required" : null),
    },
  });
  const [createCourse, { isLoading }] = useCreateCourseMutation();
  const { data: courses, isLoading: courseLoading } = useGetAllCoursesQuery({});

  /* on Submit form */
  const onSubmitForm = form.onSubmit(async (values) => {
    try {
      const sendingData = {
        ...values,
        code: +values?.code,
        credits: +values?.credits,
        preRequisiteCourses:
          values?.preRequisiteCourses?.map((item) => ({
            course: item,
            isDeleted: false,
          })) || [],
      };
      const result = await createCourse(sendingData).unwrap();
      if (result?.success) {
        toast.success(result?.message);
        form.reset();
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  });

  const coursesOptions = courses?.data?.map((item: ICourseItem) => ({
    label: item?.title + "-" + item?.prefix,
    value: item?._id,
  }));

  return (
    <div className="p-10 max-w-5xl mx-auto font-poppins">
      <h2 className="text-2xl font-semibold mb-10">Create Course</h2>
      <form onSubmit={onSubmitForm} className="space-y-5">
        <TextInput
          label="Course Title"
          withAsterisk
          placeholder="Write course title"
          key={form.key("title")}
          {...form.getInputProps("title")}
        />
        <TextInput
          label="Prefix"
          withAsterisk
          placeholder="Write prefix"
          key={form.key("prefix")}
          {...form.getInputProps("prefix")}
        />
        <TextInput
          label="Code"
          withAsterisk
          placeholder="Code"
          key={form.key("code")}
          {...form.getInputProps("code")}
        />
        <TextInput
          label="Credits"
          withAsterisk
          placeholder="Credits"
          key={form.key("credits")}
          {...form.getInputProps("credits")}
        />

        <MultiSelect
          label="Prerequisite Courses"
          placeholder="Pick semester status"
          data={coursesOptions || []}
          defaultValue=""
          clearable
          disabled={courseLoading}
          key={form.key("preRequisiteCourses")}
          {...form.getInputProps("preRequisiteCourses")}
          multiple
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

export default CreateCourse;
