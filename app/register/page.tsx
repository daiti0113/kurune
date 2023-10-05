import { RegisterForm } from "@/components/organisms/RegisterForm";
import { getCategoryList } from "@/libs/microcms";

export const revalidate = 0;

export default async function Register() {
    const { contents } = await getCategoryList({
        limit: 100,
    });

    return (
        <div className="flex justify-center">
            <RegisterForm categories={contents} />
        </div>
    )
}
