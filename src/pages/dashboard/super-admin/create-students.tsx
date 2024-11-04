import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllAcademicSemestersQuery,
} from "@/redux/features/admin/academicApi";
import { useCreateStudentMutation } from "@/redux/features/users/usersApi";
import {
  Button,
  Code,
  Fieldset,
  Group,
  Select,
  Stepper,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { toast } from "sonner";

type Props = {};

const CreateStudentsUser = (props: Props) => {
  const [active, setActive] = useState(0);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: {
        firstName: "",
        lastName: "",
        middleName: "",
      },
      gender: "",
      dateOfBirth: null,
      email: "",
      contactNo: "",
      emergencyContactNo: "",
      bloogGroup: "",
      presentAddress: "Masterpara, Gobindaganj, Gaibandha",
      permanentAddress: "Masterpara, Gobindaganj, Gaibandha",
      guardian: {
        fatherName: "Elias Uddin",
        fatherOccupation: "Farmer",
        fatherContactNo: "015487444",
        motherName: "Afroza Begum",
        motherOccupation: "Housewife",
        motherContactNo: "01547874587",
      },
      localGuardian: {
        name: "Alice Johnson",
        occupation: "Doctor",
        contactNo: "777-888-9999",
        address: "789 Pine St, Villageton",
      },
      admissionSemester: "",
      academicDepartment: "",
    },
    validate: {
      name: (value) => (!value ? "Name field is required" : null),
      dateOfBirth: (value) => (!value ? "Date of birth is required" : null),
    },
  });

  const [createStudent, { isLoading }] = useCreateStudentMutation();

  const nextStep = () => {
    // setActive((current) => (current < 3 ? current + 1 : current));
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const { data: academicSemester, isLoading: asIsLoading } =
    useGetAllAcademicSemestersQuery({});

  const { data: academicDepartment, isLoading: adIsLoading } =
    useGetAllAcademicDepartmentsQuery({});

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    label: item.name,
    value: item?._id,
  }));

  const academicDepartmentOptions = academicDepartment?.data?.map((item) => ({
    label: item.name,
    value: item?._id,
  }));

  /* on Submit form */
  const onSubmitForm = form.onSubmit(async (values) => {
    try {
      setActive((current) => (current < 3 ? current + 1 : current));
      if (active === 3) {
        const data = new FormData();
        data.append(
          "data",
          JSON.stringify({
            password: "student123",
            student: values,
          })
        );
        const result = await createStudent(data).unwrap();
        if (result?.success) {
          toast.success(result?.message);
          form.reset();
          setActive(0);
        }
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.log(error);
    }
  });

  return (
    <form
      className="p-10 max-w-5xl mx-auto font-poppins"
      onSubmit={onSubmitForm}
    >
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step
          label="Student Info"
          description="Put students basic information"
        >
          <div className="p-10 space-y-4">
            <div className="group flex gap-5 w-full">
              <TextInput
                label="First Name"
                withAsterisk
                placeholder="First name"
                key={form.key("name.firstName")}
                {...form.getInputProps("name.firstName")}
                className="w-full"
                required
              />
              <TextInput
                label="Middle name"
                withAsterisk
                placeholder="Middle name"
                key={form.key("name.middleName")}
                {...form.getInputProps("name.middleName")}
                className="w-full"
                required
              />
              <TextInput
                label="Last Name"
                withAsterisk
                placeholder="Last Name"
                key={form.key("name.lastName")}
                {...form.getInputProps("name.lastName")}
                className="w-full"
                required
              />
            </div>
            <div className="group   flex gap-5 w-full">
              <Select
                label="Gender"
                placeholder="Pick gender"
                data={["male", "female", "other"]}
                defaultValue=""
                clearable
                key={form.key("gender")}
                {...form.getInputProps("gender")}
                withAsterisk
                className="w-full"
                required
                searchable
              />

              <DatePickerInput
                label="Date Of Birth"
                placeholder="Pick date of Birth"
                key={form.key("dateOfBirth")}
                {...form.getInputProps("dateOfBirth")}
                clearable
                valueFormat="DD-MMM-YYYY"
                className="w-full"
                required
              />

              <TextInput
                label="Email"
                withAsterisk
                placeholder="Email"
                key={form.key("email")}
                inputMode="email"
                {...form.getInputProps("email")}
                className="w-full"
                required
              />
            </div>

            <div className="group   flex gap-5 w-full">
              <Select
                label="Blood Group"
                placeholder="Pick Blood Group"
                data={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                defaultValue=""
                clearable
                key={form.key("bloogGroup")}
                {...form.getInputProps("bloogGroup")}
                withAsterisk
                className="w-full"
                required
                allowDeselect
                searchable
              />

              <TextInput
                label="Contact No"
                withAsterisk
                placeholder="Contact No"
                key={form.key("contactNo")}
                inputMode="text"
                {...form.getInputProps("contactNo")}
                className="w-full"
                required
              />
              <TextInput
                label="Emergency Contact No"
                placeholder="Emergency Contact No"
                key={form.key("emergencyContactNo")}
                inputMode="text"
                {...form.getInputProps("emergencyContactNo")}
                className="w-full"
                required
              />
            </div>

            <div className="group   flex gap-5 w-full">
              <Textarea
                label="Present Address"
                withAsterisk
                placeholder="Present Address"
                key={form.key("presentAddress")}
                inputMode="text"
                {...form.getInputProps("presentAddress")}
                className="w-full"
              />
              <Textarea
                label="Permanent Address"
                placeholder="Permanent Address"
                key={form.key("permanentAddress")}
                inputMode="text"
                {...form.getInputProps("permanentAddress")}
                className="w-full"
              />
            </div>
          </div>
        </Stepper.Step>
        <Stepper.Step
          label="Guardian Info"
          description="Put guardian valid information"
        >
          <div className="space-y-4">
            <Fieldset
              legend={<p className="text-lg">Guardian information</p>}
              className="p-10"
            >
              <div className=" space-y-4">
                <div className="group flex gap-5 w-full">
                  <TextInput
                    label="Father Name"
                    withAsterisk
                    placeholder="Father name"
                    key={form.key("guardian.fatherName")}
                    {...form.getInputProps("guardian.fatherName")}
                    className="w-full"
                  />
                  <TextInput
                    label="Father Occupation"
                    withAsterisk
                    placeholder="Father Occupation"
                    key={form.key("guardian.fatherOccupation")}
                    {...form.getInputProps("guardian.fatherOccupation")}
                    className="w-full"
                  />
                  <TextInput
                    label="Father Contact No"
                    withAsterisk
                    placeholder="Father Contact No"
                    key={form.key("guardian.fatherContactNo")}
                    {...form.getInputProps("guardian.fatherContactNo")}
                    className="w-full"
                  />
                </div>

                <div className="group flex gap-5 w-full">
                  <TextInput
                    label="Mother Name"
                    withAsterisk
                    placeholder="Mother name"
                    key={form.key("guardian.motherName")}
                    {...form.getInputProps("guardian.motherName")}
                    className="w-full"
                  />
                  <TextInput
                    label="Mother Occupation"
                    withAsterisk
                    placeholder="Mother Occupation"
                    key={form.key("guardian.motherOccupation")}
                    {...form.getInputProps("guardian.motherOccupation")}
                    className="w-full"
                  />
                  <TextInput
                    label="Mother Contact No"
                    withAsterisk
                    placeholder="Mother Contact No"
                    key={form.key("guardian.motherContactNo")}
                    {...form.getInputProps("guardian.motherContactNo")}
                    className="w-full"
                  />
                </div>
              </div>
            </Fieldset>

            <Fieldset
              legend={<p className="text-lg">Local Guardian information</p>}
              className="p-10"
            >
              <div className=" space-y-4">
                <div className="group flex gap-5 w-full">
                  <TextInput
                    label="Name"
                    withAsterisk
                    placeholder="Name "
                    key={form.key("localGuardian.name")}
                    {...form.getInputProps("localGuardian.name")}
                    className="w-full"
                  />
                  <TextInput
                    label="Occupation"
                    withAsterisk
                    placeholder=" Occupation"
                    key={form.key("localGuardian.occupation")}
                    {...form.getInputProps("localGuardian.occupation")}
                    className="w-full"
                  />
                  <TextInput
                    label="Contact No"
                    withAsterisk
                    placeholder="Contact No"
                    key={form.key("localGuardian.contactNo")}
                    {...form.getInputProps("localGuardian.contactNo")}
                    className="w-full"
                  />
                  <TextInput
                    label="Address "
                    withAsterisk
                    placeholder="Address"
                    key={form.key("localGuardian.address")}
                    {...form.getInputProps("localGuardian.address")}
                    className="w-full"
                  />
                </div>
              </div>
            </Fieldset>
          </div>
        </Stepper.Step>
        <Stepper.Step
          label="Choose Education "
          description="Choose Semester and department"
        >
          <div className="space-y-5">
            <Select
              label="Academic semester"
              placeholder="Pick academic semester"
              data={academicSemesterOptions || []}
              defaultValue=""
              clearable
              key={form.key("admissionSemester")}
              {...form.getInputProps("admissionSemester")}
              withAsterisk
              allowDeselect
              searchable
              required
            />

            <Select
              label="Academic Department"
              placeholder="Pick academic Department"
              data={academicDepartmentOptions || []}
              defaultValue=""
              clearable
              withAsterisk
              allowDeselect
              searchable
              required
              key={form.key("academicDepartment")}
              {...form.getInputProps("academicDepartment")}
            />
          </div>
          {/*  "admissionSemester": "67157a5c92bf1880da20f179",
        "academicDepartment": "67157aaa92bf1880da20f184" */}
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step if you need any
          changes <br />
          <Code>{JSON.stringify(form.getValues())}</Code>;
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button type={"submit"} onClick={nextStep} loading={isLoading}>
          {active === 3 ? "Submit" : " Next step"}
        </Button>
      </Group>
    </form>
  );
};

export default CreateStudentsUser;
