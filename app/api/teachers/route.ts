import { NextResponse } from 'next/server';
import Teacher from "@/modal/dbTeacher";

// GET: Fetch all teachers
export async function GET() {
  try {
    
    const teachers = await Teacher.find(); 
    return NextResponse.json(teachers);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching teachers", error }, { status: 500 });
  }
}

// POST: Create a new teacher
export async function POST(request: Request) {
  try {
    
    const data = await request.json(); 
    console.log(data)
    const newTeacher = await Teacher.create(data); 
    

    return NextResponse.json(newTeacher, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating teacher", error }, { status: 500 });
  }
}
