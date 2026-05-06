import { TappyEditor } from "@/components/editor/TappyEditor";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mb-12 text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Tappy
        </h1>
      </div>

      <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <TappyEditor />
      </div>
    </main>
  );
}
