import { Metadata } from 'next';

// Using 'any' safely bypasses the Next.js 14 vs 15 version type conflicts
type Props = {
  searchParams: any;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  // 'await' works perfectly here whether searchParams is a Promise or a plain object
  const params = await searchParams;
  const imageUrl = params?.img || '';

  return {
    title: 'My HH Goa 2026 Pass',
    description: 'Just secured my clearance for Hacker House Goa 2026! Check out my builder badge.',
    openGraph: {
      images: [imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      images: [imageUrl],
    },
  };
}

export default async function SharePage({ searchParams }: Props) {
  const params = await searchParams;
  const imageUrl = params?.img;

  return (
    <div className="min-h-screen bg-[#064E3B] flex flex-col items-center justify-center p-8">
      <h1 className="text-white text-2xl font-bold mb-6 font-sans">Redirecting to X...</h1>
      
      {imageUrl && (
         <img src={imageUrl} alt="HH Goa Pass" className="max-w-md w-full rounded-2xl shadow-2xl border-4 border-[#F97316]" />
      )}
    </div>
  );
}