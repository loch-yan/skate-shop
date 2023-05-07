import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { AddProductForm } from "@/components/forms/add-product-form"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Add Product",
  description: "Add a new product.",
}

interface AddProductPageProps {
  params: {
    storeId: string
  }
}

export default async function AddProductPage({ params }: AddProductPageProps) {
  const { storeId } = params

  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages?.signIn || "/api/auth/signin")
  }

  const store = await prisma.store.findUnique({
    where: {
      id: storeId,
    },
    select: {
      id: true,
    },
  })

  if (!store) {
    notFound()
  }

  return (
    <section className="container grid w-full items-center gap-10 pb-10 pt-6 md:py-10">
      <Header title="Add Product" description="Add a new product." />
      <AddProductForm storeId={storeId} />
    </section>
  )
}
