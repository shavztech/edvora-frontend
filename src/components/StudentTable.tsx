"use client";

type Student = {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
};

const dummyStudents: Student[] = [
  {
    _id: "1",
    name: "Student One",
    email: "student1@test.com",
    isBlocked: false,
  },
  {
    _id: "2",
    name: "Student Two",
    email: "student2@test.com",
    isBlocked: true,
  },
];

export default function StudentTable({
  students = dummyStudents,
}: {
  students?: Student[];
}) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow-sm">
      <table className="w-full text-sm">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s._id} className="border-b last:border-0">
              <td className="px-4 py-3">{s.name}</td>
              <td className="px-4 py-3">{s.email}</td>

              <td className="px-4 py-3 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs
                    ${
                      s.isBlocked
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }
                  `}
                >
                  {s.isBlocked ? "Blocked" : "Active"}
                </span>
              </td>

              <td className="px-4 py-3 text-center">
                <button
                  className={`text-xs px-3 py-1 rounded text-white
                    ${
                      s.isBlocked
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }
                  `}
                >
                  {s.isBlocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
