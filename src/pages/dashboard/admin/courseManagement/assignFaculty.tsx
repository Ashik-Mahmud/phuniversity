import {
  useAssignFacultyMutation,
  useGetAllFacultyQuery,
} from "@/redux/features/admin/courseManagementApi";
import { IFaculty } from "@/types/faculty.type";
import { Button, Group, Modal, MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "sonner";

const AssignFaculty = ({ courseId }: { courseId: string }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [assignFaculty, { isLoading }] = useAssignFacultyMutation();

  const { data: faculties } = useGetAllFacultyQuery({});

  const facultiesOption = faculties?.data?.map((faculty: IFaculty) => {
    return {
      value: faculty?._id,
      label: `${faculty.fullName} (${faculty.id})`,
    };
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      faculties: [],
    },
    validate: {
      faculties: (value) => (!value ? "Faculties field is required" : null),
    },
  });
  /* on Submit form */
  const onSubmitForm = form.onSubmit(async (values) => {
    try {
      const sendingData = {
        courseId,
        body: {
          ...values,
        },
      };
      const result = await assignFaculty(sendingData).unwrap();
      if (result?.success) {
        toast.success(result?.message);
        form.reset();
        close();
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  });

  return (
    <div>
      <Modal opened={opened} onClose={close} title="Add Faculties">
        <form onSubmit={onSubmitForm} className="space-y-6">
          <MultiSelect
            label="Register faculties"
            placeholder="Pick faculty"
            data={facultiesOption || []}
            clearable
            key={form.key("faculties")}
            {...form.getInputProps("faculties")}
          />

          <Group justify="flex-end" mt="md">
            <Button
              type="submit"
              variant="light"
              loading={isLoading}
              disabled={isLoading}
            >
              Add faculties
            </Button>
          </Group>
        </form>
      </Modal>
      <Button onClick={open} variant="light" size="xs">
        Add Faculty
      </Button>
    </div>
  );
};

export default AssignFaculty;
