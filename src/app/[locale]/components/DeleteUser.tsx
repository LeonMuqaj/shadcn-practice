"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface DeleteUserProps {
  username: string;
}

export default function DeleteUser({ username }: DeleteUserProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    console.log(`Deleting user: ${username}`);
    setIsModalOpen(false);
    router.push("/users");
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsModalOpen(true)}
        className="h-10 w-10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Delete User"
        description="This action cannot be undone."
      >
        <div className="space-y-4">
          <p className="text-sm">Do you want to delete this user?</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
