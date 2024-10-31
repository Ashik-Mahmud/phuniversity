import {
  useGetAllSemesterRegistrationQuery,
  useUpdateSemesterRegistrationStatusMutation,
} from "@/redux/features/admin/courseManagementApi";
import { AcademicSemesterRegistrationItem } from "@/types/academic.types";
import {
  Badge,
  Button,
  LoadingOverlay,
  Popover,
  Select,
  Table,
  Title,
} from "@mantine/core";
import dayjs from "dayjs";
import { toast } from "sonner";

type statusType = "UPCOMING" | "ENDED" | "ONGOING";

const SemesterRegistration = () => {
  const { data, isLoading } = useGetAllSemesterRegistrationQuery({});

  const [updateStatus, { isLoading: updating }] =
    useUpdateSemesterRegistrationStatusMutation();

  // get status color
  const getStatusColor = (status: statusType) => {
    switch (status) {
      case "UPCOMING":
        return "teal";
      case "ONGOING":
        return "lime";
      case "ENDED":
        return "red";
    }
  };

  // handle update status
  const handleUpdateStatus = async (
    item: AcademicSemesterRegistrationItem,
    status: string | null
  ) => {
    try {
      const sendingData = {
        id: item._id,
        body: {
          status: status,
        },
      };

      const result = await updateStatus(sendingData).unwrap();

      if (result?.success) {
        toast.success(result?.message);
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const rows = data?.data?.map((element: AcademicSemesterRegistrationItem) => (
    <Table.Tr key={element._id}>
      <Table.Td>{element.academicSemester?.name}</Table.Td>
      <Table.Td>{dayjs(element.startDate).format("ddd, MMMM YYYY")}</Table.Td>
      <Table.Td>{dayjs(element.endDate).format("ddd, MMMM YYYY")}</Table.Td>
      <Table.Td>
        <Badge
          variant="dot"
          color={getStatusColor(element.status as statusType)}
        >
          {element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Button>Update</Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Select
              label="Status"
              placeholder="Pick semester status"
              data={[
                { label: "Upcoming", value: "UPCOMING" },
                { label: "Ongoing", value: "ONGOING" },
                { label: "Ended", value: "ENDED" },
              ]}
              defaultValue={element.status}
              clearable
              onChange={(value) => handleUpdateStatus(element, value)}
              withAsterisk
            />
          </Popover.Dropdown>
        </Popover>
      </Table.Td>
    </Table.Tr>
  ));
  if (isLoading) {
    return (
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    );
  }
  return (
    <div className="p-10">
      <Title order={2} size={30} mb={30}>
        Academic Semester Registration list
      </Title>

      <Table stickyHeader stickyHeaderOffset={0}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Semester name</Table.Th>
            <Table.Th>Start date</Table.Th>
            <Table.Th>End date</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default SemesterRegistration;
