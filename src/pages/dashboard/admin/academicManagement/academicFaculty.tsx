import { useGetAllAcademicFacultiesQuery } from "@/redux/features/admin/academicApi";
import { AcademicFacultyItem } from "@/types/academic.types";
import {
  LoadingOverlay,
  NativeSelect,
  Pagination,
  Table,
  Title,
} from "@mantine/core";
import dayjs from "dayjs";
import { useState } from "react";

type Props = {};

const AcademicFaculty = (props: Props) => {
  const [page, setPage] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(5);
  const { data, isLoading } = useGetAllAcademicFacultiesQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
  ]);
  const rows = data?.data?.map((element: AcademicFacultyItem) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element._id}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{dayjs(element.createdAt).format("ddd-MMM-YYYY")}</Table.Td>
    </Table.Tr>
  ));

  /* handle pagination */
  const handlePagination = (page: number) => setPage(+page);

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

      <div className="text-right flex items-end justify-end mt-10 gap-2">
        <Pagination
          total={data?.meta?.totalPage!}
          siblings={2}
          value={data?.meta?.page}
          defaultValue={2}
          onChange={handlePagination}
          disabled={isLoading}
          color="red"
          autoContrast
        />
        <NativeSelect
          className="border"
          variant="default"
          value={limit + ""}
          onChange={(event) => setLimit(+event.currentTarget.value)}
          data={["5", "10", "15", "20"]}
        />
      </div>
    </div>
  );
};

export default AcademicFaculty;
