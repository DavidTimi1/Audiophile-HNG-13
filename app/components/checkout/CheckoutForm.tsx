"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getSessionID } from "../../lib/sessionID";
import { calcTotals } from "../../lib/utils";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import Image from "next/image";

const Schema = z
  .object({
    name: z.string().min(2, "Wrong format"),
    email: z.string().email("Wrong format"),
    phone: z.string().min(5, "Wrong format"),
    address: z.string().min(3, "Wrong format"),
    zip: z.string().min(3, "Wrong format"),
    city: z.string().min(2, "Wrong format"),
    country: z.string().min(2, "Wrong format"),
    method: z.enum(["emoney", "cod"]),
    emoneyNumber: z.string().optional(),
    emoneyPin: z.string().optional(),
  })
  .refine((d) => d.method === "cod" || (d.emoneyNumber && d.emoneyPin), {
    message: "e-Money details required",
    path: ["emoneyNumber"],
  });

type FormValues = z.infer<typeof Schema>;

type ModalItem = {
  name: string;
  quantity: number;
  price: number;
  image: string;
};

export default function CheckoutForm() {
  const [showConfirm, setShowConfirm] = useState<{
    grandTotal: number;
    items: ModalItem[];
  } | null>(null);

  const sessionID = getSessionID();
  const cart = useQuery(api.cart.get, { sessionID });
  const createOrder = useMutation(api.orders.create);
  const clear = useMutation(api.cart.clear);
  const sendEmail = useAction(api.actions.sendOrderEmail);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { method: "emoney" },
  });

  if (!cart) return null;
  const totals = calcTotals(cart.items);

  const onSubmit = async (data: FormValues) => {
    const {
      name,
      email,
      phone,
      address,
      zip,
      city,
      country,
      method,
      emoneyNumber,
      emoneyPin,
    } = data;

    const itemsForModal: ModalItem[] = cart.items.map((i: any) => ({
      name: i.name,
      quantity: i.quantity,
      price: i.price,
      image: i.image,
    }));

    await createOrder({
      sessionID,
      items: cart.items,
      totals,
      customer: { name, email, phone },
      shipping: { address, zip, city, country },
      payment: { method, emoneyNumber, emoneyPin },
    });

    sendEmail({
      to: email,
      orderId: "",
      name,
      items: cart.items.map((i: any) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
      grandTotal: totals.grandTotal,
    });

    await clear({ sessionID });
    setShowConfirm({ grandTotal: totals.grandTotal, items: itemsForModal });
  };

  const method = watch("method");

  return (
    <>
      <form
        id='checkout-form'
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white rounded-xl p-6 md:p-8'
      >
        <input type='submit' hidden disabled={isSubmitting} />
        <h1 className='heading-4 mb-8'>CHECKOUT</h1>

        <section>
          <p className='overline text-primary'>BILLING DETAILS</p>
          <div className='grid md:grid-cols-2 gap-6 mt-4'>
            <Field label='Name' error={errors.name?.message}>
              <input
                className={tf(errors.name)}
                {...register("name")}
                placeholder='Alexei Ward'
              />
            </Field>
            <Field label='Email Address' error={errors.email?.message}>
              <input
                className={tf(errors.email)}
                {...register("email")}
                placeholder='alexei@mail.com'
              />
            </Field>
            <Field label='Phone Number' error={errors.phone?.message}>
              <input
                className={tf(errors.phone)}
                {...register("phone")}
                placeholder='+1 202-555-0136'
              />
            </Field>
          </div>
        </section>

        <section className='mt-8'>
          <p className='overline text-primary'>SHIPPING INFO</p>
          <div className='grid md:grid-cols-2 gap-6 mt-4'>
            <Field
              label='Address'
              className='md:col-span-2'
              error={errors.address?.message}
            >
              <input
                className={tf(errors.address)}
                {...register("address")}
                placeholder='1137 Williams Avenue'
              />
            </Field>
            <Field label='ZIP Code' error={errors.zip?.message}>
              <input
                className={tf(errors.zip)}
                {...register("zip")}
                placeholder='10001'
              />
            </Field>
            <Field label='City' error={errors.city?.message}>
              <input
                className={tf(errors.city)}
                {...register("city")}
                placeholder='New York'
              />
            </Field>
            <Field label='Country' error={errors.country?.message}>
              <input
                className={tf(errors.country)}
                {...register("country")}
                placeholder='United States'
              />
            </Field>
          </div>
        </section>

        <section className='mt-8'>
          <p className='overline text-primary'>PAYMENT DETAILS</p>
          <div className='grid grid-cols-1 md:grid-cols-2 mt-4'>
            <p className='font-semibold'>Payment Method</p>
            <div className='grid md:grid-cols-[1fr_1fr] gap-6 mt-4'>
              <div className=' w-full flex flex-col gap-4 md:col-span-2'>
                <label className='radio'>
                  <input
                    type='radio'
                    value='emoney'
                    {...register("method")}
                    className='accent-primary'
                  />
                  <span>e-Money</span>
                </label>
                <label className='radio'>
                  <input
                    type='radio'
                    value='cod'
                    {...register("method")}
                    className='accent-primary'
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>
            {method === "emoney" ? (
              <div className='grid md:grid-cols-2 gap-6 mt-4 md:col-span-2'>
                <Field
                  label='e-Money Number'
                  error={errors.emoneyNumber?.message}
                >
                  <input
                    className={tf(errors.emoneyNumber)}
                    {...register("emoneyNumber", { required: true })}
                    placeholder='238521993'
                  />
                </Field>
                <Field label='e-Money PIN' error={errors.emoneyPin?.message}>
                  <input
                    className={tf(errors.emoneyPin)}
                    {...register("emoneyPin", { required: true })}
                    placeholder='6891'
                  />
                </Field>
              </div>
            ) : (
              <div className='flex items-center gap-5 md:col-span-2 p-4 text-sm text-black/70 mt-4 col-span-1'>
                <Image
                  src={"/assets/checkout/icon-cash-on-delivery.svg"}
                  alt='Icon cash on delivery'
                  width={300}
                  height={300}
                  className='w-10'
                />
                <p>
                  The ‘Cash on Delivery’ option enables you to pay in cash when
                  our delivery courier arrives at your residence. Just make sure
                  your address is correct so that your order will not be
                  cancelled.
                </p>
              </div>
            )}
          </div>
        </section>

        <input type='submit' hidden disabled={isSubmitting} />
      </form>
      {showConfirm && (
        <ConfirmationModal
          items={showConfirm.items}
          grandTotal={showConfirm.grandTotal}
          onClose={() => setShowConfirm(null)}
        />
      )}
    </>
  );
}

function Field(props: {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${props.className ?? ""}`}>
      <span className='text-sm font-semibold flex items-center justify-between'>
        {props.label}
        {props.error && (
          <span className='text-xs text-red-600'>Wrong format</span>
        )}
      </span>
      {props.children}
    </label>
  );
}

function tf(hasError?: unknown) {
  const err = Boolean(hasError);
  return [
    "tf",
    "h-12 rounded-md px-4 border",
    err
      ? "border-red-600 focus:ring-red-500"
      : "border-ink-200 focus:ring-ink-300",
    "focus:outline-none focus:ring-1",
  ].join(" ");
}
