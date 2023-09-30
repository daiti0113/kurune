import { RegisterForm } from "@/components/organisms/RegisterForm";
import { getCategoryList, getDetail } from "@/libs/microcms";
import { Metadata } from "next";

type Props = {
    params: {
      slug: string;
    };
};

export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const data = await getDetail(params.slug);

    return {
        title: data.title,
        description: data.description,
        openGraph: {
        title: data.title,
        description: data.description,
        images: [data?.image || ''],
        },
    };
}

export default async function Edit({ params }: Props) {
    const { contents } = await getCategoryList({
        limit: 100,
    });
    const data = await getDetail(params.slug);

    return (
        <div className="flex justify-center">
            <RegisterForm categories={contents} defaultValue={data} />
        </div>
    )
}
