type Props = {
  /** Used to add `news-detail--<slug>` modifier class. */
  slug: string;
  label?: string;
  title: string;
  description: string;
};

export default function StaticArticle({ slug, label = "URE", title, description }: Props) {
  return (
    <article className={`news-detail news-detail--${slug}`}>
      <div className="container">
        <div className="news-detail__layout">
          <aside className="news-detail__meta">
            <span className="news-detail__label">{label}</span>
          </aside>
          <div className="news-detail__body">
            <h1 className="news-detail__title">{title}</h1>
            <div
              className="news-detail__rich"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
