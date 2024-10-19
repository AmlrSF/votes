import { NextResponse } from "next/server";
import Teacher from "@/modal/dbTeacher";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = await request.json(); // Get the user ID from the request
    const teacher = await Teacher.findById(params.id);
    console.log(userId, teacher);
    if (!teacher) {
      return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
    }

    // Check if the user has already upvoted
    const upvoted = teacher.upvotes.includes(userId);
    
    if (upvoted) {
      // Remove the user ID from upvotes if already upvoted
      teacher.upvotes = teacher.upvotes.filter((id:string) => id !== userId);
    } else {
      // Add the user ID to upvotes
      teacher.upvotes.push(userId);
    }

    await teacher.save(); // Save the updated teacher
    return NextResponse.json({ success: true, upvotes: teacher.upvotes.length }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating upvotes", error }, { status: 500 });
  }
}
