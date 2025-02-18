import { Link, Outlet, redirect, useSearchParams } from "react-router";
import type { Route } from "./+types/sidebar";
import { cn } from "~/lib/utils";

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  console.log(url);
  const hasId = /\/invoices\/\d/.test(url.pathname);

  const year = url.searchParams.get("year");
  const month = url.searchParams.get("month");

  if (!hasId && (!year || !month)) {
    const defaultYear = `${new Date().getFullYear()}`;
    const defaultMonth = new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format();
    return redirect(`invoices?year=${defaultYear}&month=${defaultMonth}`);
  }

  return {
    dates: [
      { year: "2025", months: ["Feb", "Jan"] },
      {
        year: "2024",
        months: [
          "Dec",
          "Nov",
          "Oct",
          "Sep",
          "Aug",
          "Jul",
          "Jun",
          "May",
          "Apr",
          "Mar",
          "Feb",
          "Jan",
        ],
      },
    ],
    invoices: [{ id: 1, receiver: "Ale", total: 100.3 }],
  };
}

export default function Invoices({ loaderData }: Route.ComponentProps) {
  const { dates } = loaderData;
  const [searchParams] = useSearchParams();
  const selectedYear = searchParams.get("year");
  const selectedMonth = searchParams.get("month");

  return (
    <div className="flex">
      <aside className="basis-1/5 p-4">
        <ul>
          {dates.map((date: (typeof dates)[number]) => (
            <li>
              <span className="border border-amber-500 py-1 p-2 rounded-lg">
                {date.year}
              </span>
              <ul>
                {date.months.map((month) => (
                  <li>
                    <Link to={`?year=${date.year}&month=${month}`}>
                      <span
                        className={cn("py-1 p-1 rounded-lg bg-slate-200", {
                          "bg-slate-400":
                            month === selectedMonth &&
                            date.year === selectedYear,
                        })}
                      >
                        {month}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </aside>
      <br />
      <Outlet />
    </div>
  );
}
