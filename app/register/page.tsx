import { RegisterForm } from "@/components/organisms/RegisterForm";
import { LIMIT } from "@/constants";
import { getCategoryList } from "@/libs/microcms";

export default async function Register() {
    const { contents } = await getCategoryList({
        limit: LIMIT,
    });

    return <RegisterForm categories={contents} />
}
