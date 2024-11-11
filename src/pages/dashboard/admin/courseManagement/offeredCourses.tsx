import { useGetAllOfferedCoursesQuery } from "@/redux/features/admin/courseManagementApi";
import { IOfferedCourseItem } from "@/types/courses.types";
import { LoadingOverlay, Table, Title } from "@mantine/core";

type Props = {};

const OfferedCourses = (props: Props) => {
  const { data, isLoading } = useGetAllOfferedCoursesQuery({});

  const rows = data?.data?.map((element: IOfferedCourseItem) => (
    <Table.Tr key={element._id}>
      <Table.Td>{element.days.join(",")}</Table.Td>
      <Table.Td>{element.maxCapacity}</Table.Td>
      <Table.Td>{element.startTime}</Table.Td>
      <Table.Td>{element.endTime}</Table.Td>
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
        Offered courses list
      </Title>

      <Table stickyHeader stickyHeaderOffset={0}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Days</Table.Th>
            <Table.Th>Maximum sits</Table.Th>
            <Table.Th> Start time</Table.Th>
            <Table.Th>End time</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default OfferedCourses;
