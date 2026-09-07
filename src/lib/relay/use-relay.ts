import { useQuery } from "@tanstack/react-query";
import { getSnapshot } from "./actions";
import type { Snapshot } from "./types";

export function useRelay(initial?: Snapshot) {
  return useQuery({
    queryKey: ["relay"],
    queryFn: () => getSnapshot(),
    initialData: initial,
    refetchInterval: 2500,
  });
}
