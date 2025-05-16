import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { insertAccountsSchema } from "@/db/schema";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { z } from "zod";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";



const formSchema = insertAccountsSchema.pick({
    name:true,
});
type FormValues = z.input<typeof formSchema>;



export const NewAccountSheet = () => {

    const {isOpen, onClose} = useNewAccount();
    const mutation = useCreateAccount();

    const onSubmit = (values: FormValues) =>{
        mutation.mutate(values,{
            onSuccess: () =>{
                onClose();
            }
        });
    }


    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        New Account
                    </SheetTitle>
                    <SheetDescription>
                        Create a new account to track your transactions.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm defaultValues={{name:""}} onSubmit={onSubmit} disabled={mutation.isPending}/>
            </SheetContent>
        </Sheet>
    );
};