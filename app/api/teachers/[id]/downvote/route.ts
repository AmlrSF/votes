import { NextResponse } from "next/server";
import Teacher from "@/modal/dbTeacher";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = await request.json(); // Get the user ID from the request
    const teacher = await Teacher.findById(params.id);
    console.log(userId);
    if (!teacher) {
      return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
    }

    // Check if the user has already downvoted
    const downvoted = teacher.upvotes.includes(userId);
    
    if (downvoted) {
      // Remove the user ID from upvotes if already downvoted
      teacher.upvotes = teacher.upvotes.filter((id:string) => id !== userId);
    } else {
      // Optionally, you can implement a separate logic for downvotes, 
      // or just treat downvotes as negative votes.
      // For now, we'll keep it simple and treat downvoting similarly to upvoting.
      teacher.upvotes.push(userId); // Use your logic for downvote
    }

    await teacher.save(); // Save the updated teacher
    return NextResponse.json({ success: true, upvotes: teacher.upvotes.length }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating downvotes", error }, { status: 500 });
  }
}
