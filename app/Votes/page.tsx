"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Teacher from "../../components/Teacher";
import toast from "react-hot-toast";
import Image from 'next/image';

interface Teacher {
  firstName: string;
  lastName: string;
  etablissement: string;
  image?: string; // Optional
  tags: string[];
  upvotes: string[]; // Changed to an array of user IDs
  shares: number;
  comments: {
    user: string; // User ID or name, adjust according to your needs
    commentText: string;
    createdAt: Date;
  }[];
  _id: string;
}

const Votes = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    etablissement: "",
    tags: "",
    image: "",
  });

  const [teachers, setteachers] = useState<Teacher[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // To preview image

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Fetch teachers from the API
  const fetchTeachers = async () => {
    try {
      const response = await fetch(`api/teachers`); // Adjust the URL if necessary

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch teachers: ${errorData.message}`);
      }

      const teachers = await response.json();
      setteachers(teachers);
      setPreviewImage(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fetch teachers when the component mounts
  useEffect(() => {
    fetchTeachers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the teacher object for submission
    const teacher: {
      firstName: string;
      lastName: string;
      etablissement: string;
      tags: string[];
      image: string;
    } = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      etablissement: formData.etablissement,
      tags: formData.tags.split(",").map((tag) => tag.trim()), // Split and trim tags
      image: formData.image,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/teachers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacher),
      });

      if (!response.ok) {
        toast.error("something went wrong!");
      }

      const newTeacher = await response.json();
      console.log("Teacher created:", newTeacher);
      toast.success("Email sent successfully!");
      // Refresh teacher list after submission
      fetchTeachers();

      // Reset the form
      setFormData({
        firstName: "",
        lastName: "",
        etablissement: "",
        tags: "",
        image: "",
      });

      // Close the dialog
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  // Handle image file selection and convert to base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert image to base64
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result as string, // Set base64 string
        }));
        setPreviewImage(reader.result as string); // Preview the image
      };
    }
  };

  // Handle opening and closing the dialog
  const handleOpenDialog = () => setIsDialogOpen(true);

  return (
    <section className="container min-h-[90vh]">
      <div
        className="flex justify-between w-full items-center 
      border-b pb-5 border-gray-900 dark:border-white"
      >
        <div className="text-left">
          <h1 className="font-bold text-3xl dark:text-white">Votes</h1>
          <p className="text-sm dark:text-white ">
            Upvote your favorite teacher and help highlight the best educators
            in the community!
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="group bg-gray-900 text-white px-7 
              py-3 flex items-center gap-2 rounded-full hover:text-white 
              outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 
              active:scale-105 transition"
              onClick={handleOpenDialog}
            >
              New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
                <DialogDescription>
                  Fill in the details of the teacher. Click save when you are
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-6">
                  <Label htmlFor="firstName" className="text-right">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-6">
                  <Label htmlFor="lastName" className="text-right">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-6">
                  <Label htmlFor="etablissement" className="text-right">
                    Establishment
                  </Label>
                  <Input
                    id="etablissement"
                    value={formData.etablissement}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-6">
                  <Label htmlFor="tags" className="text-right">
                    Tags (comma separated)
                  </Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="e.g., Web Development, Big Data"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-6">
                  <Label htmlFor="image" className="text-right">
                    Select Image
                  </Label>
                  <Input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="col-span-3"
                  />
                </div>
                {previewImage && (
                  <div className="grid grid-cols-4 items-center gap-6">
                    <Label className="text-right">Preview</Label>
                    <div className="col-span-3">
                      <Image
                        src={previewImage}
                        alt="Preview"
                        width={500} // Specify the desired width
                        height={300} // Specify the desired height
                        className="rounded"
                      />
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="group bg-gray-900 text-white 
                  px-7 py-3 flex items-center gap-2 rounded-full outline-none 
                  focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className=" card-container">
        {teachers.length > 0 ? (
          teachers.map((teacher:Teacher, index) => (
            <React.Fragment key={index}>
              <Teacher {...teacher} />
            </React.Fragment>
          ))
        ) : (
          <p>No teachers found.</p>
        )}
      </div>
    </section>
  );
};

export default Votes;
