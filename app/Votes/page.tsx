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

const Votes = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    etablissement: "",
    tags: "",
    image: "",

  });

  const [teachers, setteachers] = useState([]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const fetchTeachers = async () => {
    try {
      const response = await fetch('/api/teachers'); // Adjust the URL if necessary
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch teachers: ${errorData.message}`);
      }
  
      const teachers = await response.json();
      setteachers(teachers);
      console.log('Fetched teachers:', teachers); // Handle the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Call the function, for example in a useEffect hook
  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let teacher:any = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      etablissement: formData.etablissement,
      tags: formData.tags.split(",").map(tag => tag.trim()), 
      image: formData.image,
    }
    console.log(teacher);
    
    try {
      const response = await fetch('/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacher),
      });

      if (!response.ok) {
        throw new Error('Error creating teacher');
      }

      const newTeacher = await response.json();
      console.log('Teacher created:', newTeacher);

     
      setFormData({
        firstName: "",
        lastName: "",
        etablissement: "",
        tags: "",
        image: "",
      });

    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <section className="container">
      <div className="flex justify-between w-full items-center border-b pb-5 border-gray-900">
        <div className="text-left">
          <h1 className="font-bold text-3xl">Votes</h1>
          <p className="text-sm">
            Upvote your favorite teacher and help highlight the best educators in the community!
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full hover:text-white outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
            >
              New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
                <DialogDescription>
                  Fill in the details of the teacher. Click save when you're done.
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
                    etablissement
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
                    Image URL
                  </Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="min-h-[50vh] card-container">
      <>
        {teachers.map((project :any, index) => (
          <React.Fragment key={index}>
            <Teacher {...project} />
          </React.Fragment>
        ))}
      </>
      </div>
    </section>
  );
};

export default Votes;
