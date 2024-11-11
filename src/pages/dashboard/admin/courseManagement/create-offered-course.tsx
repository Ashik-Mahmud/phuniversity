import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllAcademicFacultiesQuery,
} from "@/redux/features/admin/academicApi";
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllFacultyQuery,
  useGetAllSemesterRegistrationQuery,
} from "@/redux/features/admin/courseManagementApi";
import {
  AcademicDepartmentItem,
  AcademicFacultyItem,
  AcademicSemesterRegistrationItem,
} from "@/types/academic.types";
import { ICourseItem } from "@/types/courses.types";
import { IFaculty } from "@/types/faculty.type";
import {
  ActionIcon,
  Button,
  Group,
  MultiSelect,
  Select,
  TextInput,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useRef } from "react";
import { BsClock } from "react-icons/bs";
import { toast } from "sonner";

type Props = {};

const CreateOfferedCourse = (_props: Props) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      semesterRegistration: "",
      academicFaculty: "",
      academicDepartment: "",
      course: "",
      faculty: "",
      section: "",
      maxCapacity: "",
      days: [],
      startTime: "",
      endTime: "",
    },
    validate: {
      semesterRegistration: (value) =>
        !value ? "Semester registration field is required" : null,
      academicFaculty: (value) =>
        !value ? "Academic faculty field is required" : null,
      academicDepartment: (value) =>
        !value ? "Academic department field is required" : null,
      course: (value) => (!value ? "Course field is required" : null),
      faculty: (value) => (!value ? "Faculty field is required" : null),
      section: (value) => (!value ? "Section field is required" : null),
      maxCapacity: (value) =>
        !value ? "Max capacity field is required" : null,
      days: (value) => (!value ? "Days field is required" : null),
      startTime: (value) => (!value ? "Start time field is required" : null),
      endTime: (value) => (!value ? "End time field is required" : null),
    },
  });

  const { data: courses, isLoading: courseLoading } = useGetAllCoursesQuery({});

  const [createOfferedCourse, { isLoading }] = useCreateOfferedCourseMutation();

  /* on Submit form */
  const onSubmitForm = form.onSubmit(async (values) => {
    try {
      const sendingData = {
        ...values,
        maxCapacity: +values?.maxCapacity,
        section: +values?.section,
      };

      const result = await createOfferedCourse(sendingData).unwrap();
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

  /* GENERATE FACULTY OPTIONS */
  const { data: AcademicFacultyData } = useGetAllAcademicFacultiesQuery({});
  const academicFacultiesOptions = AcademicFacultyData?.data?.map(
    (faculty: AcademicFacultyItem) => ({
      value: faculty?._id,
      label: faculty?.name,
    })
  );

  /* GENERATE SEMESTER REGISTRATION */
  const { data: semesterRegistrationData } = useGetAllSemesterRegistrationQuery(
    [{ name: "status", value: "ONGOING" }]
  );
  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (semester: AcademicSemesterRegistrationItem) => ({
      value: semester?._id,
      label: semester?.academicSemester?.name + " - " + semester?.status,
    })
  );

  /* GENERATE ACADEMIC DEPARTMENT OPTIONS */
  const { data: academicDepartmentData } = useGetAllAcademicDepartmentsQuery(
    {}
  );
  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (department: AcademicDepartmentItem) => ({
      value: department?._id,
      label: department?.name,
    })
  );

  /* GENERATE Faculty OPTIONS */
  const { data: facultyData } = useGetAllFacultyQuery({});
  const facultiesOptions = facultyData?.data?.map((faculty: IFaculty) => ({
    value: faculty?._id,
    label:
      `${faculty?.id} : ` + faculty?.fullName + `(${faculty?.designation})`,
  }));

  /* Time picker */
  const ref = useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <BsClock />
    </ActionIcon>
  );

  return (
    <div className="p-10 max-w-5xl w-full mx-auto font-poppins">
      <h2 className="text-2xl font-semibold mb-10">Create Offer Course</h2>
      <form onSubmit={onSubmitForm} className="space-y-5">
        <Select
          label="Semester Registration"
          placeholder="Pick semester registration"
          data={semesterRegistrationOptions || []}
          defaultValue=""
          clearable
          key={form.key("semesterRegistration")}
          {...form.getInputProps("semesterRegistration")}
          withAsterisk
          allowDeselect
          searchable
        />
        <Select
          label="Academic Faculty"
          placeholder="Pick academic faculty"
          data={academicFacultiesOptions || []}
          defaultValue=""
          clearable
          key={form.key("academicFaculty")}
          {...form.getInputProps("academicFaculty")}
          withAsterisk
          allowDeselect
          searchable
        />

        <Select
          label="Academic Department"
          placeholder="Pick academic department"
          data={academicDepartmentOptions || []}
          defaultValue=""
          clearable
          key={form.key("academicDepartment")}
          {...form.getInputProps("academicDepartment")}
          withAsterisk
          allowDeselect
          searchable
        />

        <Select
          label="Courses"
          placeholder="Pick pick course"
          data={coursesOptions || []}
          defaultValue=""
          clearable
          disabled={courseLoading}
          key={form.key("course")}
          {...form.getInputProps("course")}
          withAsterisk
          allowDeselect
          searchable
        />

        <Select
          label="Faculty"
          placeholder="Pick pick faculty"
          data={facultiesOptions || []}
          defaultValue=""
          clearable
          key={form.key("faculty")}
          {...form.getInputProps("faculty")}
          withAsterisk
          allowDeselect
          searchable
        />

        <TextInput
          label="Section"
          withAsterisk
          placeholder="Write section"
          key={form.key("section")}
          {...form.getInputProps("section")}
        />
        <TextInput
          label="Maximum Capacity"
          withAsterisk
          placeholder="Maximum Capacity"
          key={form.key("maxCapacity")}
          {...form.getInputProps("maxCapacity")}
        />

        <MultiSelect
          label="Pick days"
          placeholder="Pick days"
          data={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          searchable
          key={form.key("days")}
          {...form.getInputProps("days")}
          multiple
          clearable
        />

        <TimeInput
          label="Start time"
          key={form.key("startTime")}
          {...form.getInputProps("startTime")}
        />

        <TimeInput
          label="End time"
          key={form.key("endTime")}
          {...form.getInputProps("endTime")}
          ref={ref}
          rightSection={pickerControl}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit" disabled={isLoading} loading={isLoading}>
            Submit
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default CreateOfferedCourse;
