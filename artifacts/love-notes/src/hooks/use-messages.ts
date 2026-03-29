import { useQueryClient } from "@tanstack/react-query";
import { 
  useGetMessages, 
  useCreateMessage as useCreateMessageOriginal, 
  useDeleteMessage as useDeleteMessageOriginal,
  getGetMessagesQueryKey
} from "@workspace/api-client-react";

export function useMessages() {
  return useGetMessages({
    query: {
      // Poll every 5 seconds for real-time feel
      refetchInterval: 5000,
      select: (data) => {
        // Sort messages newest first
        return [...data].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    }
  });
}

export function useCreateMessage() {
  const queryClient = useQueryClient();
  const queryKey = getGetMessagesQueryKey();

  return useCreateMessageOriginal({
    mutation: {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey });
      },
    }
  });
}

export function useDeleteMessage() {
  const queryClient = useQueryClient();
  const queryKey = getGetMessagesQueryKey();

  return useDeleteMessageOriginal({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      }
    }
  });
}
