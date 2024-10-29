import { useGetAllAcademicFacultiesQuery } from "@/redux/features/admin/academicApi";
import { AcademicFacultyItem } from "@/types/academic.types";
import { LoadingOverlay, Table, Title } from "@mantine/core";
import dayjs from "dayjs";

type Props = {};

const AcademicFaculty = (props: Props) => {
  const { data, isLoading } = useGetAllAcademicFacultiesQuery({});

  const rows = data?.data?.map((element: AcademicFacultyItem) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element._id}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{dayjs(element.createdAt).format("ddd-MMM-YYYY")}</Table.Td>
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
        Academic faculty list
      </Title>

      <Table stickyHeader stickyHeaderOffset={0}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Faculty Id</Table.Th>
            <Table.Th>Faculty name</Table.Th>
            <Table.Th>Creation date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default AcademicFaculty;
