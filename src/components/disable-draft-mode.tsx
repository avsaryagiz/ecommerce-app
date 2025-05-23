"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { disableDraftMode } from "../../actions/disable-draft-mode";
import { Button } from "./ui";

export function DisableDraftMode() {
  const router = useRouter();

  // useTransition to handle UI state during async update
  const [pending, startTransition] = useTransition();

  // Check if current window is an iframe or popup; don't render button in that case
  const isIframeOrPopup =
    typeof window !== "undefined" &&
    (window !== window.parent || !!window.opener);
  if (isIframeOrPopup) {
    return null;
  }

  // Function to disable draft mode and refresh page
  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <div className="ml-auto w-fit px-4">
      {/* Show loading text while disabling draft mode */}
      {pending ? (
        "Disabling draft mode..."
      ) : (
        <Button
          type="button"
          variant="destructive"
          onClick={disable}
          className="cursor-pointer"
        >
          Disable draft mode
        </Button>
      )}
    </div>
  );
}
