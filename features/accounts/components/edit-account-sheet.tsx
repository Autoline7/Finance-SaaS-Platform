import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { insertAccountsSchema } from "@/db/schema";
import { z } from "zod";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "@/features/accounts/api/use-edit-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { useConfirm } from "@/hooks/use-confirm";



const formSchema = insertAccountsSchema.pick({
    name:true,
});
type FormValues = z.input<typeof formSchema>;



export const EditAccountSheet = () => {
    const {isOpen, onClose, id} = useOpenAccount();
    const [ConfirmDialogg, confirm] = useConfirm("Are you sure", "You are about to delete this account.")

    const accountQuery = useGetAccount(id);
    const editMutation = useEditAccount(id);
    const deleteMutation = useDeleteAccount(id);

    const isLoading = accountQuery.isLoading;

    const isPending = 
        editMutation.isPending ||
        deleteMutation.isPending;

    const onSubmit = (values: FormValues) =>{
        editMutation.mutate(values,{
            onSuccess: () =>{
                onClose();
            }
        });
    }

    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name,
    } : {
        name: "",
    }

    const onDelete = async () =>{
        const ok = await confirm();

        if(ok){
            deleteMutation.mutate(undefined, {
                onSuccess: () =>{
                    onClose();
                }
            })
        }
    }


    return (
        <>
        <ConfirmDialogg />
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Edit Account
                    </SheetTitle>
                    <SheetDescription>
                        Edit an existing account
                    </SheetDescription>
                </SheetHeader>
                {isLoading
                    ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>
                    ) : (
                        <AccountForm id={id} defaultValues={defaultValues} onSubmit={onSubmit} disabled={isPending} onDelete={onDelete}/>
                    )
                }
                </SheetContent>
        </Sheet>
        </>
    );
};