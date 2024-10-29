import { useGetAllAcademicDepartmentsQuery } from "@/redux/features/admin/academicApi";
import { AcademicDepartmentItem } from "@/types/academic.types";
import { LoadingOverlay, Table, Title } from "@mantine/core";

type Props = {};

const AcademicDepartment = (props: Props) => {
  const { data, isLoading } = useGetAllAcademicDepartmentsQuery({});

  const rows = data?.data?.map((element: AcademicDepartmentItem) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element._id}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.academicFaculty?.name}</Table.Td>
      <Table.Td>{element.createdAt}</Table.Td>
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
        Academic department list
      </Title>

      <Table stickyHeader stickyHeaderOffset={0}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Department ID</Table.Th>
            <Table.Th>Department name</Table.Th>
            <Table.Th>Faculty Name</Table.Th>
            <Table.Th>Creation of date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default AcademicDepartment;
