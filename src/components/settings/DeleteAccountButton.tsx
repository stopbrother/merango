'use client';
import { deleteAccount } from '@/app/(site)/settings/account/action';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button, buttonVariants } from '../ui/button';

const DeleteAccountButton = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">회원탈퇴</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <form action={deleteAccount}>
          <AlertDialogHeader>
            <AlertDialogTitle>정말 탈퇴하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              계정 및 관련 데이터가 삭제되며 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel type="button">취소</AlertDialogCancel>
            <Button
              type="submit"
              className={buttonVariants({ variant: 'destructive' })}
            >
              회원탈퇴
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountButton;
