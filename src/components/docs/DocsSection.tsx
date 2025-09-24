interface DocsSectionProps {
  title?: string;
  children: React.ReactNode;
}

const DocsSection = ({ title, children }: DocsSectionProps) => {
  return (
    <section className="text-sm leading-6">
      {title ? <h2 className="text-lg font-medium">{title}</h2> : null}

      {children}
    </section>
  );
};

export default DocsSection;
