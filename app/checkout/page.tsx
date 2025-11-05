import Link from "next/link";
import CheckoutForm from "../components/checkout/CheckoutForm";
import SummaryCard from "../components/checkout/SummaryCard";
import Navbar from "../components/Navbar";

export default function CheckoutPage() {
  return (
    <main className='bg-ink-50'>
      <div className='bg-black text-white'>
        <Navbar />
      </div>
      <div className='container px-6 lg:px-8 pt-6'>
        <Link href={`/`} className='text-black/60 hover:text-primary text-sm'>
          Go Back
        </Link>
      </div>
      <div className='container px-6 lg:px-8 py-16 grid lg:grid-cols-[2fr_1fr] gap-8'>
        <CheckoutForm />
        <SummaryCard />
      </div>
    </main>
  );
}
