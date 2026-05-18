import type { MarketAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  description:
    "<span>The United States was once a significant player in rare earth production.</span> Over time, processing capability shifted overseas, driven by lower costs, established expertise, and sustained investment in capacity abroad. This has created a <span>dependency</span> that persists regardless of how much raw material the U.S. can source.",
  about_icon: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/market-supply-shift.svg",
};

export default function MktSupplyShift({ data }: { data?: MarketAcf["supply_shift_section"] }) {
  const description = data?.description ?? FALLBACK.description;
  const icon        = data?.about_icon?.url ?? FALLBACK.about_icon;
  return (
    <section className="market-page__section">
      <div className="container">
        <div className="market-supply-shift" data-aos="custom-fade-up">
          <div className="market-supply-shift__icon" aria-hidden="true">
            <img src={icon} alt="" width={120} height={120} />
          </div>
          <p
            className="market-supply-shift__copy"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </section>
  );
}
