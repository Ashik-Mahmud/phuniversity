import { useGetMyOfferedCoursesQuery } from "@/redux/features/student/studentManagement";

type Props = {};

const MyOfferedCourses = (props: Props) => {
  const { data, isLoading } = useGetMyOfferedCoursesQuery({});

  const offeredCourses = data?.data?.reduce((acc, item) => {
    const key = item?.course?.title;

    acc[key] = acc[key] || { title: key, sections: [] };

    acc[key].sections.push({
      section: item?.section,
      _id: item?._id,
    });

    return acc;
  }, {});
  const modifiedData = Object.values(offeredCourses ? offeredCourses : {});

  console.log(modifiedData, "Modified data");

  return <div>MyOfferedCourses</div>;
};

export default MyOfferedCourses;
