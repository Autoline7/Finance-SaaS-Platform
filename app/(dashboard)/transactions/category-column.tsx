import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";

type Props = {
    id: string;
    category: string | null;
    categoryId: string | null;
}

export const CategoryColumn = ({
    id,
    category,
    categoryId
}: Props) =>{
    const { onOpen: onOpenCategory } = useOpenCategory();
    const { onOpen: onOpenTransaction } = useOpenTransaction()

    const onClick = () =>{
        if(categoryId) {
            onOpenCategory(categoryId);
        } else {
            onOpenTransaction(id);
        }
    }

    return (
        <div
        onClick={onClick}
            className="flex items-center cursor-pointer hover:underline"
        >
            {!category && <TriangleAlert className={cn("mr-2 size-4 shrink-0", !category && "text-rose-500")}/>}
            {category || "Uncategorized"}
        </div>
    )

}