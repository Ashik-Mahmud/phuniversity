import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicApi";

type Props = {};

const AdminDashboardOverview = (props: Props) => {
  const { data, error } = useGetAllAcademicDepartmentsQuery({});

  return <div>AdminDashboardOverview</div>;
};

export default AdminDashboardOverview;
