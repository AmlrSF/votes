import { NextResponse } from 'next/server';
import Teacher from "@/modal/dbTeacher";
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({ 
  cloud_name: 'dwm5fb9l0', 
  api_key: '613126155286866', 
  api_secret: process.env.API_CLOUDINARY_SECRET // Click 'View API Keys' above to copy your API secret
});


// GET: Fetch all teachers
export async function GET() {
  try {
    
    //const teachers = await Teacher.find(); 

    //return NextResponse.json(teachers);
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ message: "Error fetching teachers", error }, { status: 500 });
  }
}

// POST: Create a new teacher
export async function POST(request: Request) {
  try {
    
    
    const data = await request.json(); 
    console.log(data)
    const photoUrl = await cloudinary.uploader.upload(data.image);

    const newTeacher = await Teacher.create({
      ...data,
      image:photoUrl.url
    }); 
    

    return NextResponse.json(newTeacher, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating teacher", error }, { status: 500 });
  }
}
