
interface StudentDashboardUIProps {
    student: {
        name: string;
        email: string;
        onboarding?: {
            syllabus: string;
            classLevel: string;
            courseType: string;
            subjects: string[];
        };
    };
}

export default function StudentDashboardUI({ student }: StudentDashboardUIProps) {
    return (
        <div className="bg-white p-6 rounded shadow">
            <h1 className="text-xl font-bold mb-4">
                Welcome, {student.name}
            </h1>

            <p><b>Email:</b> {student.email}</p>
            <p><b>Syllabus:</b> {student.onboarding?.syllabus}</p>
            <p><b>Class:</b> {student.onboarding?.classLevel}</p>
            <p><b>Course:</b> {student.onboarding?.courseType}</p>

            <div className="mt-4">
                <b>Subjects:</b>
                <ul className="list-disc ml-6">
                    {student.onboarding?.subjects?.map((sub: string) => (
                        <li key={sub}>{sub}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
