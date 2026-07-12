"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Circle,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import {
  supabase,
  type Parcel,
  type ParcelHistory,
  type ParcelStatus,
} from "@/lib/supabase";

function StatusTimeline({
  steps,
  currentStatusId,
}: {
  steps: ParcelStatus[];
  currentStatusId: number;
}) {
  if (steps.length === 0) return null;

  const currentIndex = steps.findIndex((s) => s.id === currentStatusId);
  const total = steps.length - 1;

  return (
    <div className="mt-6">
      <div className="flex items-start justify-between relative">
        {/* background track */}
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-border" />
        {/* filled progress */}
        <div
          className="absolute left-0 top-4 h-0.5 bg-primary transition-all duration-500"
          style={{ width: total > 0 ? `${(currentIndex / total) * 100}%` : "0%" }}
        />

        {steps.map((step, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <div key={step.id} className="flex flex-col items-center gap-1.5 relative z-10">
              <div
                className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center border-2 transition-colors ${
                  done
                    ? "bg-primary border-primary"
                    : active
                    ? "bg-background border-primary"
                    : "bg-background border-border"
                }`}
              >
                {done ? (
                  <CheckCircle className="h-4 w-4 text-primary-foreground" />
                ) : active ? (
                  <Circle className="h-4 w-4 text-primary fill-primary" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <span
                className={`text-xs text-center w-16 min-h-[2.5rem] leading-tight ${
                  active
                    ? "text-primary font-semibold"
                    : done
                    ? "text-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                {step.lable}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HistoryList({ rows }: { rows: ParcelHistory[] }) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-foreground/50 py-4 text-center">
        No history recorded yet.
      </p>
    );
  }
  return (
    <ol className="relative border-l border-border ml-2 space-y-5">
      {rows.map((h, i) => (
        <li key={h.id} className="pl-5 relative">
          <span
            className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${
              i === 0 ? "bg-primary" : "bg-border"
            }`}
          />
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
            <p className={`font-medium text-sm ${i === 0 ? "text-primary" : ""}`}>
              {h.parcel_status?.lable ?? "—"}
            </p>
            <p className="text-xs text-foreground/50 shrink-0">
              {new Date(h.event_time).toLocaleString("en-PK", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          {h.location && (
            <p className="flex items-center gap-1.5 text-sm text-foreground/70 mt-0.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {h.location}
            </p>
          )}
          {h.note && <p className="text-sm text-foreground/70 mt-0.5">{h.note}</p>}
        </li>
      ))}
    </ol>
  );
}

function ParcelCard({
  parcel,
  statusSteps,
}: {
  parcel: Parcel;
  statusSteps: ParcelStatus[];
}) {
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<ParcelHistory[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const statusLabel = parcel.parcel_status?.lable ?? String(parcel.status_id);
  const freightLabel = parcel.feight_type?.lable ?? String(parcel.freight_type_id);

  const toggleHistory = async () => {
    const next = !showHistory;
    setShowHistory(next);
    if (next && !historyLoaded) {
      setHistoryLoading(true);
      const { data } = await supabase
        .from("parcel_history")
        .select("*, parcel_status(*)")
        .eq("parcel_id", parcel.id)
        .order("event_time", { ascending: false });
      setHistory((data ?? []) as ParcelHistory[]);
      setHistoryLoaded(true);
      setHistoryLoading(false);
    }
  };

  return (
    <div className="border border-border rounded-2xl bg-card overflow-hidden">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <Package className="h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="text-xs text-foreground/60">Tracking ID</p>
            <p className="font-mono text-sm font-medium">{parcel.id}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 self-start sm:self-auto">
          <Truck className="h-3.5 w-3.5" />
          {statusLabel}
        </span>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-5">
        {/* Sender / Receiver */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-muted/50 px-4 py-3">
            <p className="text-xs text-foreground/50 mb-1">Sender</p>
            <p className="font-medium">{parcel.sender_name}</p>
            <p className="text-sm text-foreground/70">{parcel.sender_number}</p>
          </div>
          <div className="rounded-xl bg-muted/50 px-4 py-3">
            <p className="text-xs text-foreground/50 mb-1">Receiver</p>
            <p className="font-medium">{parcel.receiver_name}</p>
            <p className="text-sm text-foreground/70">{parcel.receiver_number}</p>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div>
            <p className="text-xs text-foreground/50">Weight</p>
            <p className="font-medium mt-0.5">{parcel.weight}</p>
          </div>
          <div>
            <p className="text-xs text-foreground/50">Freight Type</p>
            <p className="font-medium mt-0.5">{freightLabel}</p>
          </div>
          <div>
            <p className="text-xs text-foreground/50">Duty</p>
            <p className="font-medium mt-0.5">{parcel.duty_added ? "Added" : "Not Added"}</p>
          </div>
          <div>
            <p className="text-xs text-foreground/50">Booked On</p>
            <p className="font-medium mt-0.5">
              {new Date(parcel.created_at).toLocaleDateString("en-PK", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Estimated delivery */}
        {parcel.estimated_delivery && (
          <div className="flex items-center gap-2 text-sm rounded-xl border border-border px-4 py-3">
            <Clock className="h-4 w-4 text-primary shrink-0" />
            <span className="text-foreground/70">Estimated delivery:</span>
            <span className="font-semibold">
              {new Date(parcel.estimated_delivery).toLocaleString("en-PK", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        )}

        {/* Status timeline using DB labels */}
        <StatusTimeline steps={statusSteps} currentStatusId={parcel.status_id} />

        {/* Package history toggle */}
        <button
          type="button"
          onClick={() => void toggleHistory()}
          className="w-full flex items-center justify-center gap-2 border border-border hover:border-primary/40 hover:text-primary transition-colors rounded-xl py-2.5 text-sm font-medium text-foreground/70"
        >
          {showHistory ? "Hide history" : "Show history"}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${showHistory ? "rotate-180" : ""}`}
          />
        </button>

        {showHistory && (
          <div>
            <p className="text-xs text-foreground/50 mb-4">Package history</p>
            {historyLoading ? (
              <p className="text-sm text-foreground/50 py-4 text-center">
                Loading history…
              </p>
            ) : (
              <HistoryList rows={history} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const isUUID = (s: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s.trim());

export default function TrackPage() {
  const [query, setQuery] = useState("");
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [statusSteps, setStatusSteps] = useState<ParcelStatus[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load status steps once on mount
  useEffect(() => {
    supabase
      .from("parcel_status")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setStatusSteps(data as ParcelStatus[]);
      });
  }, []);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    setLoading(true);
    setError("");
    setParcels([]);
    setSearched(false);

    try {
      let queryBuilder = supabase
        .from("parcel")
        .select("*, parcel_status(*), feight_type(*)");

      if (isUUID(q)) {
        queryBuilder = queryBuilder.eq("id", q);
      } else {
        queryBuilder = queryBuilder.or(
          `sender_number.ilike.%${q}%,receiver_number.ilike.%${q}%`,
        );
      }

      const { data, error: err } = await queryBuilder.order("created_at", { ascending: false });
      if (err) throw new Error(err.message);
      setParcels((data ?? []) as Parcel[]);
      setSearched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Parcel</h1>
            <p className="text-lg opacity-90 mb-10">
              Enter your tracking ID or phone number to see your shipment status.
            </p>

            <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tracking ID or phone number…"
                className="flex-1 h-12 rounded-xl px-4 text-foreground bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="h-12 px-6 rounded-xl bg-background text-primary font-semibold flex items-center gap-2 hover:bg-background/90 transition-colors disabled:opacity-60 shrink-0"
              >
                <Search className="h-4 w-4" />
                {loading ? "Searching…" : "Track"}
              </button>
            </form>
          </div>
        </section>

        {/* Results */}
        <section className="py-12 md:py-16 bg-background min-h-[40vh]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {error && (
              <p className="text-center text-destructive text-sm">{error}</p>
            )}

            {searched && !loading && parcels.length === 0 && (
              <div className="text-center py-16">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-40" />
                <p className="text-foreground/60">No parcels found for that tracking ID or phone number.</p>
                <p className="text-sm text-foreground/40 mt-1">
                  Please check the details and try again.
                </p>
              </div>
            )}

            {parcels.length > 0 && (
              <div className="space-y-6">
                {parcels.length > 1 && (
                  <p className="text-sm text-foreground/60">
                    {parcels.length} parcels found
                  </p>
                )}
                {parcels.map((p) => (
                  <ParcelCard key={p.id} parcel={p} statusSteps={statusSteps} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
