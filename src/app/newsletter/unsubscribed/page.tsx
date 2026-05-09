import Link from 'next/link';

export default function NewsletterUnsubscribedPage() {
  return (
    <main className="min-h-screen bg-[#f7f4f0] px-6 py-24">
      <div className="mx-auto max-w-xl border border-[#e8e4df] bg-white p-10 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#8d6f58]">
          Newsletter
        </p>
        <h1 className="mb-4 font-serif text-3xl text-[#241f1b]">You are unsubscribed</h1>
        <p className="mb-8 text-[#3a3430]">
          Your email has been removed from Silk Beauty Salon newsletter updates.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-md border border-[#d9cec1] bg-[#f7f2eb] px-6 py-3 text-xs uppercase tracking-widest text-[#241f1b] transition-colors hover:bg-[#241f1b] hover:text-white"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
