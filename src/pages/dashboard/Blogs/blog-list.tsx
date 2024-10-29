type Props = {};

const BlogListPage = (props: Props) => {
  return (
    <div>
      <div className="p-5 md:p-10 w-full h-[calc(100dvh-50px)] overflow-auto">
        <table className="w-full border-collapse table-auto">
          <thead className="sticky top-0 border-b border-t bg-slate-50">
            <tr>
              <th className="  text-left p-2 whitespace-nowrap truncate">
                Date
              </th>
              <th className=" text-left p-2 whitespace-nowrap truncate">
                Image
              </th>
              <th className=" text-left p-2 whitespace-nowrap truncate">
                Title
              </th>
              <th className=" text-left p-2 whitespace-nowrap truncate">
                Category
              </th>
              <th className=" text-left p-2 whitespace-nowrap truncate">
                Author
              </th>
              <th className=" text-left p-2 whitespace-nowrap truncate">
                Views
              </th>
              <th className=" text-left p-2 whitespace-nowrap truncate">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9].map((_, index) => (
              <tr key={index}>
                <td className="border-b p-3 whitespace-nowrap truncate">
                  20-10-2024
                </td>
                <td className="border-b p-3 whitespace-nowrap truncate">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg"></div>
                </td>
                <td className="border-b p-3 whitespace-nowrap truncate">
                  How to be a placeholder
                </td>
                <td className="border-b p-3 whitespace-nowrap truncate">
                  Unknown
                </td>
                <td className="border-b p-3 whitespace-nowrap truncate">
                  Ashik Mahmud
                </td>
                <td className="border-b p-3 whitespace-nowrap truncate">15k</td>
                <td className="border-b p-3 whitespace-nowrap truncate">
                  <div className="flex items-center gap-2">
                    <button className="bg-slate-300 text-black px-2 py-1 text-xs rounded">
                      Edit
                    </button>
                    <button className="bg-slate-300 text-black px-2 py-1 text-xs rounded">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogListPage;
