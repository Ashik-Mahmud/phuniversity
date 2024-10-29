type Props = {};
import { useGetAllAcademicSemestersQuery } from "@/redux/features/admin/academicApi";
import { AcademicSemesterItem } from "@/types/academic.types";
import { LoadingOverlay, Table, Title } from "@mantine/core";

const AcademicSemester = () => {
  const { data, isLoading } = useGetAllAcademicSemestersQuery({});

  const rows = data?.data?.map((element: AcademicSemesterItem) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.code}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.year}</Table.Td>
      <Table.Td>{element.startMonth}</Table.Td>
      <Table.Td>{element.endMonth}</Table.Td>
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
        Academic Semester list
      </Title>

      <Table stickyHeader stickyHeaderOffset={0}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Code</Table.Th>
            <Table.Th>Semester name</Table.Th>
            <Table.Th>Year</Table.Th>
            <Table.Th>Start Month</Table.Th>
            <Table.Th>End Month</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default AcademicSemester;
