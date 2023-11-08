export function TwitterName({ handle }: { handle: string }) {
  return (
    <>
      <span className="text-sm text-[#5B6A78]">{`@${handle}`}</span>
    </>
  );
}
