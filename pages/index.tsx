import dynamic from "next/dynamic";

const FixedLayout = dynamic(() => import("../layouts/FixedLayout"), {
  ssr: false,
});

export default function Home() {
  return (
    <FixedLayout>
      <div>コンテンツ</div>
    </FixedLayout>
  );
}
