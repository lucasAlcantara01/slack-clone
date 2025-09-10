'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { useCreateWorkspace } from '../api/use-create-workspace';
import { useCreateWorkspaceModal } from '../store/use-create-workspace-modal';

export function CreateWorkspaceModal() {
  const router = useRouter();

  const [open, setOpen] = useCreateWorkspaceModal();
  const [name, setName] = useState('');

  const { mutate, isPending } = useCreateWorkspace();

  function handleClose() {
    setOpen(false);
    setName('');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    mutate(
      { name },
      {
        onSuccess(id) {
          router.push(`/workspace/${id}`);
          handleClose();
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Add a Workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace name e.g. 'Work', 'personal', 'Home'"
          />
          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
