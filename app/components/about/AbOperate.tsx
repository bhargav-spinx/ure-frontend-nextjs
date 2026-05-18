import type { AboutAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  select_image: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/about-facility.webp",
  title: "Where we operate",
  description:
    "We are not a mining company. We are not producing end products. We operate in the middle of the supply chain, at the most technically complex and strategically important stage: processing. We take in raw materials and recycled feedstock, and we output high-purity rare earth elements that manufacturers can use.",
};

export default function AbOperate({ data }: { data?: AboutAcf["operate_section"] }) {
  const image       = data?.select_image?.url ?? FALLBACK.select_image;
  const title       = data?.title             ?? FALLBACK.title;
  const description = data?.description       ?? FALLBACK.description;
  return (
    <div className="operate-hero" data-aos="fade-in">
      <div className="operate-hero__image">
        <img src={image} alt="" width={760} height={522} />
      </div>
      <div className="operate-hero__card">
        <h2 className="operate-hero__title">{title}</h2>
        <p className="operate-hero__body">{description}</p>
      </div>
    </div>
  );
}
