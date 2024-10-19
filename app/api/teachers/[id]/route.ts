import { NextResponse } from 'next/server';
import Teacher from "@/modal/dbTeacher";

// GET: Fetch a teacher by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    
    const teacher = await Teacher.findById(params.id); // Fetch teacher by ID
    if (!teacher) {
      return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
    }
    return NextResponse.json(teacher);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching teacher", error }, { status: 500 });
  }
}

// PUT: Update a teacher by ID (used for upvotes or edits)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    
    const data = await request.json(); // Get data to update

    const updatedTeacher = await Teacher.findByIdAndUpdate(params.id, data, { new: true }); // Update teacher
    if (!updatedTeacher) {
      return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTeacher, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating teacher", error }, { status: 500 });
  }
}

// DELETE: Delete a teacher by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    
    const deletedTeacher = await Teacher.findByIdAndDelete(params.id); // Delete teacher
    if (!deletedTeacher) {
      return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Teacher deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting teacher", error }, { status: 500 });
  }
}
