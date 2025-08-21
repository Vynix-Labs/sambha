"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@sambha/ui/input";
import { Button } from "@sambha/ui/button";
import { Card as CardIcon } from "@sambha/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sambha/ui/select";
import { useSetAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { getCardsAtom } from "../../../store/paymentCardAtom";
import { modalAtom } from "../../../store/modalAtom";
import { paymentCardSchema } from "schemas/paymentCardSchema";

const cardNames = [
  "Zenith Gold",
  "Sambha Credit",
  "Visa Classic",
  "Master Platinum",
  "FlexPay Virtual",
];

const billingAddresses = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "United Kingdom",
  "United States",
];

export const PaymentCard = () => {
  const setCards = useSetAtom(getCardsAtom);
  const setModal = useSetAtom(modalAtom);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(paymentCardSchema),
    defaultValues: {
      number: "",
      expiry: "",
      cvv: "",
      country: "Nigeria",
    },
  });

  const onSubmit = (data: any) => {
    const randomName =
      cardNames[Math.floor(Math.random() * cardNames.length)] || "Default Card";

    const newCard = {
      id: uuidv4(),
      name: randomName,
      userName: "Brooklyn Simmons",
      ...data,
    };

    setCards((prev) => [...prev, newCard]);
    reset();
    setModal({ isOpen: false });
  };

  const formatCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const digitsOnly = value.replace(/\D/g, "");
    const formatted = digitsOnly.match(/.{1,4}/g)?.join(" ") ?? "";
    setValue("number", formatted);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <label className="block text-sm mb-1">Card number</label>
        <Input
          {...register("number")}
          maxLength={19}
          placeholder="0000 0000 0000 0000"
          onChange={formatCardNumber}
          className="flex-1 bg-white pr-12 rounded-md outline-none"
        />
        <div className="absolute top-8 right-4">
          <CardIcon />
        </div>
        {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number.message}</p>}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm mb-1">Expires</label>
          <Input
            {...register("expiry")}
            placeholder="MM/YY"
            className="w-full border rounded-md px-3 py-2 bg-white"
          />
          {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry.message}</p>}
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-1">CVV</label>
          <Input
            {...register("cvv")}
            placeholder="123"
            className="w-full border rounded-md px-3 py-2 bg-white"
          />
          {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">Billing address</label>
        <Select
          defaultValue="Nigeria"
          onValueChange={(val) => setValue("country", val)}
        >
          <SelectTrigger className="w-full py-5">
            <SelectValue placeholder="Billing Address" />
          </SelectTrigger>
          <SelectContent className="bg-white-main">
            {billingAddresses.map((address) => (
              <SelectItem key={address} value={address}>
                {address}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
      </div>

      <Button type="submit" className="text-sm w-full mt-4">
       {isSubmitting?'Creating': 'Add card'} 
      </Button>
    </form>
  );
};
