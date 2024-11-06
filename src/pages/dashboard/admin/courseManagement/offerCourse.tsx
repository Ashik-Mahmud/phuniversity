import { useGetAllCoursesQuery } from "@/redux/features/admin/courseManagementApi";
import { ICourseItem } from "@/types/courses.types";
import { LoadingOverlay, Table, Title } from "@mantine/core";
import { BsTrash2 } from "react-icons/bs";

const OfferCourses = () => {
  const { data, isLoading } = useGetAllCoursesQuery({});

  const rows = data?.data?.map((element: ICourseItem) => (
    <Table.Tr key={element._id}>
      <Table.Td>{element.title}</Table.Td>
      <Table.Td>{element.code}</Table.Td>
      <Table.Td>{element.credits}</Table.Td>
      <Table.Td>{element.prefix}</Table.Td>
      <Table.Td>
        <BsTrash2 />
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
        Courses list
      </Title>

      <Table stickyHeader stickyHeaderOffset={0}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Course Name</Table.Th>
            <Table.Th>Code</Table.Th>
            <Table.Th> Credits</Table.Th>
            <Table.Th>Prefix</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default OfferCourses;
