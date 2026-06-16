export type SlotAvailability = "Available" | "Booked" | "Cancelled";
export type ClassStatus = "Completed" | "Not Completed";
export type UserRole = "mentor" | "admin";

export interface Slot {
  id: number;
  mentorName: string;
  subject: string;
  date: string;
  time: string;
  availability: SlotAvailability;
  classStatus: ClassStatus;
  studentName?: string;
  meetingLink: string;
}

interface SlotTableProps {
  data: Slot[];
  role: UserRole;
  onUpdateMeetingLink?: (id: number, link: string) => void;
  onDeleteSlot?: (id: number) => void; // ✅ NEW
}

const SlotTable: React.FC<SlotTableProps> = ({
  data,
  role,
  onUpdateMeetingLink,
  onDeleteSlot,
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-[rgb(var(--edvora-primary))] text-white">
          <tr>
            <th className="p-3 text-left">Student</th>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Date & Time</th>
            <th className="p-3 text-left">Availability</th>
            <th className="p-3 text-left">Class Status</th>
            <th className="p-3 text-left">Meeting Link</th>
            {role === "mentor" && (
              <th className="p-3 text-left">Action</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((slot) => (
            <tr key={slot.id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                {slot.studentName ?? (
                  <span className="text-xs text-gray-400">
                    Not booked
                  </span>
                )}
              </td>

              <td className="p-3">{slot.subject}</td>

              <td className="p-3">
                <div>{slot.date}</div>
                <div className="text-xs text-gray-500">{slot.time}</div>
              </td>

              <td className="p-3">
                <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                  {slot.availability}
                </span>
              </td>

              <td className="p-3">
                <span className="px-3 py-1 rounded-full text-xs bg-gray-200 text-gray-600">
                  {slot.classStatus}
                </span>
              </td>

              {/* Meeting link */}
              <td className="p-3">
                {role === "mentor" ? (
                  <input
                    type="url"
                    value={slot.meetingLink}
                    onChange={(e) =>
                      onUpdateMeetingLink?.(
                        slot.id,
                        e.target.value
                      )
                    }
                    className="border px-2 py-1 rounded text-xs w-48"
                  />
                ) : (
                  <a
                    href={slot.meetingLink}
                    target="_blank"
                    className="text-blue-600 text-xs underline"
                  >
                    Open link
                  </a>
                )}
              </td>

              {/* DELETE BUTTON (MENTOR ONLY) */}
              {role === "mentor" && (
                <td className="p-3">
                  <button
                    onClick={() => onDeleteSlot?.(slot.id)}
                    className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Remove
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SlotTable;
