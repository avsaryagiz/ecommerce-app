export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
  }>;
}) {
  const { query } = await searchParams;
  return <div>Search page for {query}</div>;
}
