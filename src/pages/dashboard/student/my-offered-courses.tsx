import {
  useEnrollOfferCourseMutation,
  useGetMyOfferedCoursesQuery,
} from "@/redux/features/student/studentManagement";
import { IOfferedCourseItem } from "@/types/courses.types";
import {
  Accordion,
  Button,
  Group,
  LoadingOverlay,
  Popover,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { toast } from "sonner";

type Props = {};

interface ISectionItem {
  section: number;
  _id: string;
  days: string[];
  startTime: string;
  endTime: string;
}
interface ICourseItem {
  title: string;
  sections: ISectionItem[];
}

const MyOfferedCourses = (props: Props) => {
  const { data, isLoading } = useGetMyOfferedCoursesQuery({});

  const offeredCourses = data?.data?.reduce(
    (acc: any, item: IOfferedCourseItem | any) => {
      const key = item?.course?.title;

      acc[key] = acc[key] || { title: key, sections: [] };

      acc[key].sections.push({
        section: item?.section,
        days: item.days,
        startTime: item.startTime,
        endTime: item.endTime,
        _id: item?._id,
      });

      return acc;
    },
    {}
  );
  const modifiedData = Object.values(
    offeredCourses ? offeredCourses : {}
  ) as ICourseItem[];

  const items = modifiedData.map((item: ICourseItem) => {
    return (
      <Accordion.Item key={item.title} value={item.title}>
        <Accordion.Control className="text-xl font-medium">
          {item.title}
        </Accordion.Control>
        <Accordion.Panel>
          <ul className="space-y-0">
            {item?.sections?.map((section) => (
              <CourseItem key={section._id} section={section} />
            ))}
          </ul>
        </Accordion.Panel>
      </Accordion.Item>
    );
  });

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
    <div>
      <Title order={2} mb={30}>
        My Offered courses
      </Title>
      <Accordion defaultValue="Apples">{items}</Accordion>
    </div>
  );
};

export default MyOfferedCourses;

const CourseItem = ({ section }: { section: ISectionItem }) => {
  const [opened, setOpened] = useState(false);

  const [enrollCourse, { isLoading: enrollIsLoading }] =
    useEnrollOfferCourseMutation();

  /* handle courses */
  const handleCourse = async (courseId: string) => {
    try {
      const sendingData = {
        offeredCourse: courseId,
      };
      const result = await enrollCourse(sendingData).unwrap();
      if (result?.success) {
        toast.success(result?.message);
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <li
      className="p-2 border-t flex items-center justify-between"
      key={section.section}
    >
      <div>
        Section: <span className="font-medium">{section?.section}</span>
      </div>
      <div>
        Days: <span className="font-medium">{section?.days.join(", ")}</span>
      </div>
      <div>
        Start Time: <span className="font-medium">{section?.startTime}</span>
      </div>
      <div>
        End time: <span className="font-medium">{section?.endTime}</span>
      </div>
      <div>
        <Popover
          trapFocus
          position="bottom"
          withArrow
          shadow="md"
          opened={opened}
          onChange={setOpened}
        >
          <Popover.Target>
            <Button
              variant="light"
              size="sm"
              onClick={() => setOpened((o) => !o)}
            >
              Enroll
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <p className="mb-3 font-poppins">Do you agree?</p>
            <Group>
              <Button
                variant="filled"
                onClick={() => handleCourse(section?._id)}
                loading={enrollIsLoading}
              >
                Yes
              </Button>

              <Button variant="light" onClick={() => setOpened((o) => !o)}>
                No
              </Button>
            </Group>
          </Popover.Dropdown>
        </Popover>
      </div>
    </li>
  );
};
