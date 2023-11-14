export function TwitterName({ handle }: { handle: string }) {
  return <span className="text-base text-[#5B6A78]">{`@ ${handle}`}</span>;
}
