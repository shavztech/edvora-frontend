"use client";

type Booking = {
  _id: string;
  studentName: string;
  subject: string;
  amount: number;
  status: "paid" | "pending" | "failed";
};

const dummyBookings: Booking[] = [
  {
    _id: "1",
    studentName: "Student One",
    subject: "Maths",
    amount: 1500,
    status: "paid",
  },
  {
    _id: "2",
    studentName: "Student Two",
    subject: "Physics",
    amount: 2000,
    status: "pending",
  },
];

export default function BookingTable({
  bookings = dummyBookings,
}: {
  bookings?: Booking[];
}) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow-sm">
      <table className="w-full text-sm">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left">Student</th>
            <th className="px-4 py-3 text-left">Subject</th>
            <th className="px-4 py-3 text-center">Amount</th>
            <th className="px-4 py-3 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="border-b last:border-0">
              <td className="px-4 py-3">{b.studentName}</td>
              <td className="px-4 py-3">{b.subject}</td>
              <td className="px-4 py-3 text-center">₹{b.amount}</td>

              <td className="px-4 py-3 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs
                    ${
                      b.status === "paid"
                        ? "bg-green-100 text-green-600"
                        : b.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-600"
                    }
                  `}
                >
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
