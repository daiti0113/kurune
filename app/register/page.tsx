import { RegisterForm } from "@/components/organisms/RegisterForm";
import { LIMIT } from "@/constants";
import { getTagList } from "@/libs/microcms";

export default async function Register() {
    const { contents } = await getTagList({
        limit: LIMIT,
    });

    return <RegisterForm tags={contents} />
}
