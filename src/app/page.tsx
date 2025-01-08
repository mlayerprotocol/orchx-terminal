import { MainScreen } from "@/components/screen/main";

export default function Home() {
  return (
    <div className="grid grid-rows-[33px_1fr_33px] items-start justify-items-center min-h-screen p-8 pb-20  gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <MainScreen />
    </div>
  );
}
