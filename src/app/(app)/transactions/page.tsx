"use client";

import * as React from "react";
import { useNewTransactionModal } from "@/providers";
import AddTransactionModal from "./transaction-modal-headless/components/transactions/AddTransactionModal";
import { Display, Text } from "@/components/Typography";
import { NewTransactionInput } from "./types";
import type { TransactionRow } from "./types";
import { useTransactions } from "./useTransactions";
import BuyersTableCard from "@/components/transantions/BuyersTableCard";
import ListingsTableCard from "@/components/transantions/ListingTableCard";

const tabs = ["All", "Active", "Pending", "Closed"] as const;
type Tab = (typeof tabs)[number];

export default function TransactionsPage() {
  const [active, setActive] = React.useState<Tab>("All");
  const { isOpen, close } = useNewTransactionModal();
  const { rows, loading, add, remove } = useTransactions();

  const filteredRows =
    active === "All"
      ? rows
      : rows.filter((r) => r.status.toLowerCase() === active.toLowerCase());

  const toListingRow = (r: TransactionRow) => ({
    // pass through entire row for edit modal initialData
    ...r,
    listing: r.property_address ?? r.client_name ?? null,
    location: [r.city, r.state].filter(Boolean).join(", ") || null,
    list_date: r.listing_date ?? null,
  });

  const toBuyerRow = (r: TransactionRow) => ({
    ...r,
    // 1st line (title) can be empty/placeholder for now
    buyer: r.property_address ?? null,
  
    // 2nd line (muted): prefer name saved in details, else any older columns
    name_for_second_line:
      (r.details?.buyer_full_name as string | undefined) ??
      (r.details?.owner_full_name as string | undefined) ??
      r.client_name ??
      null,
  
    location: [r.city, r.state].filter(Boolean).join(', ') || null,
    start_date: r.agreement_start_date ?? r.listing_date ?? null,
  });

  return (
    <div className="min-h-full">
      {/* ---------- Page Header ---------- */}
      <section className="px-6 pb-0 pt-8 bg-[#F7F8FA]">
        <Display
          as="h1"
          size="xs"
          weight="bold"
          color="heading"
          className="tracking-[0.24px]"
        >
          Transactions
        </Display>

        {/* Tabs */}
        <div className="mt-5 mb-8 border-b border-gray-200">
          <div
            role="tablist"
            aria-label="Transaction filters"
            className="flex items-center gap-2 h-9"
          >
            {tabs.map((t) => {
              const isActive = t === active;
              return (
                <button
                  key={t}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(t)}
                  className={[
                    "relative h-9 px-3 outline-none",
                    isActive
                      ? "text-primary-700"
                      : "text-gray-500 hover:text-gray-600",
                    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-700 rounded-md",
                  ].join(" ")}
                >
                  <Text as="span" size="md" weight="bold" color="inherit">
                    {t}
                  </Text>
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute left-0 bottom-[-1px] h-[2px] w-full bg-primary-700 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Main Content ---------- */}
      <main className="px-6 pt-0 pb-8 space-y-6">
        {loading ? (
          <div className="py-10 text-center">
            <Text size="md" color="muted">
              Loading…
            </Text>
          </div>
        ) : (
          <>
            <ListingsTableCard
              rows={filteredRows.filter((r) => r.type === "seller").map(toListingRow)}
              onDelete={async (row) => {
                await remove(row.id);
              }}
              onRefresh={() => console.log("Refresh Listings")}
            />

            <BuyersTableCard
              rows={filteredRows.filter((r) => r.type === "buyer").map(toBuyerRow)}
              onDelete={async (row) => {
                await remove(row.id);
              }}
              onRefresh={() => console.log("Refresh Buyers")}
            />
          </>
        )}
      </main>

      {/* ---------- Add Transaction Modal ---------- */}
      <AddTransactionModal
        isOpen={isOpen}
        onClose={close}
        onSave={async (payload: NewTransactionInput) => {
          await add(payload);
          close();
        }}
      />
    </div>
  );
}
